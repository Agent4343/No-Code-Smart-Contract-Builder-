import { Router, Response } from 'express';
import { z } from 'zod';
import prisma from '../utils/prisma.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { compileContract, analyzeSecurityIssues } from '../services/compiler.js';

const router = Router();

router.use(authenticate);

const compileSchema = z.object({
  projectId: z.string().uuid(),
  sourceCode: z.string().min(1),
  contractName: z.string().min(1),
  optimizerRuns: z.number().default(200),
});

// Compile contract
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { projectId, sourceCode, contractName, optimizerRuns } = compileSchema.parse(req.body);

    // Verify project ownership
    const project = await prisma.project.findFirst({
      where: { id: projectId, userId: req.userId },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Compile
    const compileResult = await compileContract({
      sourceCode,
      contractName,
      optimizerRuns,
    });

    if (!compileResult.success) {
      return res.status(400).json({
        error: 'Compilation failed',
        errors: compileResult.errors,
        warnings: compileResult.warnings,
      });
    }

    // Security analysis
    const securityReport = analyzeSecurityIssues(sourceCode);

    // Update project with compiled code
    await prisma.project.update({
      where: { id: projectId },
      data: {
        sourceCode,
        abi: compileResult.abi,
        bytecode: compileResult.bytecode,
        securityScore: securityReport.score,
        securityReport: securityReport,
        estimatedGas: parseInt(compileResult.gasEstimates?.creation?.totalCost || '0') || null,
      },
    });

    res.json({
      success: true,
      abi: compileResult.abi,
      bytecode: compileResult.bytecode,
      gasEstimates: compileResult.gasEstimates,
      securityReport,
      warnings: compileResult.warnings,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Compile error:', error);
    res.status(500).json({ error: 'Compilation failed' });
  }
});

// Security scan only (without full compilation)
router.post('/security-scan', async (req: AuthRequest, res: Response) => {
  try {
    const { sourceCode } = req.body;

    if (!sourceCode) {
      return res.status(400).json({ error: 'Source code required' });
    }

    const securityReport = analyzeSecurityIssues(sourceCode);

    res.json({ securityReport });
  } catch (error) {
    console.error('Security scan error:', error);
    res.status(500).json({ error: 'Security scan failed' });
  }
});

// Validate source code syntax
router.post('/validate', async (req: AuthRequest, res: Response) => {
  try {
    const { sourceCode, contractName } = req.body;

    if (!sourceCode || !contractName) {
      return res.status(400).json({ error: 'Source code and contract name required' });
    }

    const result = await compileContract({
      sourceCode,
      contractName,
      optimizerRuns: 1, // Fast validation
    });

    res.json({
      valid: result.success,
      errors: result.errors,
      warnings: result.warnings,
    });
  } catch (error) {
    console.error('Validate error:', error);
    res.status(500).json({ error: 'Validation failed' });
  }
});

export default router;
