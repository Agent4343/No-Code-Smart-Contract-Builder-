import { Router, Response } from 'express';
import { z } from 'zod';
import prisma from '../utils/prisma.js';
import { authenticate, AuthRequest, checkDeploymentLimit } from '../middleware/auth.js';
import { deployContract, estimateDeploymentGas, getNetworkConfig, getAllNetworks, verifyContract } from '../services/deployer.js';

const router = Router();

router.use(authenticate);

// Get available networks
router.get('/networks', async (req: AuthRequest, res: Response) => {
  const networks = getAllNetworks();
  res.json({ networks });
});

// Estimate gas
router.post('/estimate-gas', async (req: AuthRequest, res: Response) => {
  try {
    const { networkId, bytecode, abi, constructorArgs } = req.body;

    if (!networkId || !bytecode || !abi) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const estimate = await estimateDeploymentGas({
      networkId,
      bytecode,
      abi,
      constructorArgs,
    });

    if ('error' in estimate) {
      return res.status(400).json({ error: estimate.error });
    }

    res.json({
      gasEstimate: estimate.gasEstimate.toString(),
      gasCostWei: estimate.gasCostWei.toString(),
      gasCostEth: estimate.gasCostEth,
    });
  } catch (error) {
    console.error('Gas estimate error:', error);
    res.status(500).json({ error: 'Failed to estimate gas' });
  }
});

const deploySchema = z.object({
  projectId: z.string().uuid(),
  networkId: z.string(),
  constructorArgs: z.array(z.any()).default([]),
});

// Deploy contract (user signs transaction on frontend)
router.post('/', checkDeploymentLimit, async (req: AuthRequest, res: Response) => {
  try {
    const { projectId, networkId, constructorArgs } = deploySchema.parse(req.body);

    // Get project
    const project = await prisma.project.findFirst({
      where: { id: projectId, userId: req.userId },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (!project.bytecode || !project.abi) {
      return res.status(400).json({ error: 'Project must be compiled first' });
    }

    const network = getNetworkConfig(networkId);
    if (!network) {
      return res.status(400).json({ error: 'Invalid network' });
    }

    // Create pending deployment record
    const deployment = await prisma.deployment.create({
      data: {
        userId: req.userId!,
        projectId,
        networkId,
        networkName: network.name,
        chainId: network.chainId,
        contractName: project.name,
        status: 'PENDING',
      },
    });

    // Increment deployment count
    await prisma.user.update({
      where: { id: req.userId },
      data: { deploymentsThisMonth: { increment: 1 } },
    });

    // Return deployment info for frontend to handle signing
    res.json({
      deployment,
      bytecode: project.bytecode,
      abi: project.abi,
      constructorArgs,
      network: {
        chainId: network.chainId,
        name: network.name,
        rpcUrl: network.rpcUrl,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Deploy error:', error);
    res.status(500).json({ error: 'Deployment failed' });
  }
});

// Update deployment after frontend completes transaction
router.put('/:id/confirm', async (req: AuthRequest, res: Response) => {
  try {
    const { contractAddress, transactionHash, gasUsed } = req.body;

    const deployment = await prisma.deployment.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!deployment) {
      return res.status(404).json({ error: 'Deployment not found' });
    }

    const network = getNetworkConfig(deployment.networkId);

    const updated = await prisma.deployment.update({
      where: { id: req.params.id },
      data: {
        contractAddress,
        transactionHash,
        gasUsed,
        status: 'CONFIRMED',
        explorerUrl: network ? `${network.explorerUrl}/address/${contractAddress}` : null,
      },
    });

    res.json({ deployment: updated });
  } catch (error) {
    console.error('Confirm deployment error:', error);
    res.status(500).json({ error: 'Failed to confirm deployment' });
  }
});

// Mark deployment as failed
router.put('/:id/fail', async (req: AuthRequest, res: Response) => {
  try {
    const { error: errorMessage } = req.body;

    const deployment = await prisma.deployment.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!deployment) {
      return res.status(404).json({ error: 'Deployment not found' });
    }

    const updated = await prisma.deployment.update({
      where: { id: req.params.id },
      data: {
        status: 'FAILED',
        error: errorMessage,
      },
    });

    res.json({ deployment: updated });
  } catch (error) {
    console.error('Fail deployment error:', error);
    res.status(500).json({ error: 'Failed to update deployment' });
  }
});

// List deployments
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const deployments = await prisma.deployment.findMany({
      where: { userId: req.userId },
      orderBy: { deployedAt: 'desc' },
      include: {
        project: {
          select: { name: true },
        },
      },
    });

    res.json({ deployments });
  } catch (error) {
    console.error('List deployments error:', error);
    res.status(500).json({ error: 'Failed to list deployments' });
  }
});

// Get single deployment
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const deployment = await prisma.deployment.findFirst({
      where: { id: req.params.id, userId: req.userId },
      include: {
        project: true,
      },
    });

    if (!deployment) {
      return res.status(404).json({ error: 'Deployment not found' });
    }

    res.json({ deployment });
  } catch (error) {
    console.error('Get deployment error:', error);
    res.status(500).json({ error: 'Failed to get deployment' });
  }
});

// Verify contract on explorer
router.post('/:id/verify', async (req: AuthRequest, res: Response) => {
  try {
    const deployment = await prisma.deployment.findFirst({
      where: { id: req.params.id, userId: req.userId },
      include: { project: true },
    });

    if (!deployment) {
      return res.status(404).json({ error: 'Deployment not found' });
    }

    if (!deployment.contractAddress || !deployment.project.sourceCode) {
      return res.status(400).json({ error: 'Contract not deployed or source code missing' });
    }

    const result = await verifyContract(
      deployment.networkId,
      deployment.contractAddress,
      deployment.project.sourceCode,
      deployment.contractName
    );

    if (result.success) {
      await prisma.deployment.update({
        where: { id: deployment.id },
        data: { verified: true, verifiedAt: new Date() },
      });
    }

    res.json(result);
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

export default router;
