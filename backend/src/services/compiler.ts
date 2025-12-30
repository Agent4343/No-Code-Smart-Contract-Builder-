import solc from 'solc';

interface CompileInput {
  sourceCode: string;
  contractName: string;
  optimizerRuns?: number;
}

interface CompileOutput {
  success: boolean;
  abi?: object[];
  bytecode?: string;
  errors?: string[];
  warnings?: string[];
  gasEstimates?: {
    creation: { codeDepositCost: string; executionCost: string; totalCost: string };
    external: Record<string, string>;
  };
}

// OpenZeppelin imports mock (in production, use actual installed packages)
const OPENZEPPELIN_SOURCES: Record<string, string> = {
  '@openzeppelin/contracts/token/ERC20/ERC20.sol': `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./IERC20.sol";
import "./extensions/IERC20Metadata.sol";
import "../../utils/Context.sol";
abstract contract ERC20 is Context, IERC20, IERC20Metadata {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;
    constructor(string memory name_, string memory symbol_) { _name = name_; _symbol = symbol_; }
    function name() public view virtual override returns (string memory) { return _name; }
    function symbol() public view virtual override returns (string memory) { return _symbol; }
    function decimals() public view virtual override returns (uint8) { return 18; }
    function totalSupply() public view virtual override returns (uint256) { return _totalSupply; }
    function balanceOf(address account) public view virtual override returns (uint256) { return _balances[account]; }
    function transfer(address to, uint256 amount) public virtual override returns (bool) { _transfer(_msgSender(), to, amount); return true; }
    function allowance(address owner, address spender) public view virtual override returns (uint256) { return _allowances[owner][spender]; }
    function approve(address spender, uint256 amount) public virtual override returns (bool) { _approve(_msgSender(), spender, amount); return true; }
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) { _spendAllowance(from, _msgSender(), amount); _transfer(from, to, amount); return true; }
    function _transfer(address from, address to, uint256 amount) internal virtual { require(from != address(0)); require(to != address(0)); _beforeTokenTransfer(from, to, amount); uint256 fromBalance = _balances[from]; require(fromBalance >= amount); unchecked { _balances[from] = fromBalance - amount; _balances[to] += amount; } emit Transfer(from, to, amount); _afterTokenTransfer(from, to, amount); }
    function _mint(address account, uint256 amount) internal virtual { require(account != address(0)); _beforeTokenTransfer(address(0), account, amount); _totalSupply += amount; unchecked { _balances[account] += amount; } emit Transfer(address(0), account, amount); _afterTokenTransfer(address(0), account, amount); }
    function _burn(address account, uint256 amount) internal virtual { require(account != address(0)); _beforeTokenTransfer(account, address(0), amount); uint256 accountBalance = _balances[account]; require(accountBalance >= amount); unchecked { _balances[account] = accountBalance - amount; _totalSupply -= amount; } emit Transfer(account, address(0), amount); _afterTokenTransfer(account, address(0), amount); }
    function _approve(address owner, address spender, uint256 amount) internal virtual { require(owner != address(0)); require(spender != address(0)); _allowances[owner][spender] = amount; emit Approval(owner, spender, amount); }
    function _spendAllowance(address owner, address spender, uint256 amount) internal virtual { uint256 currentAllowance = allowance(owner, spender); if (currentAllowance != type(uint256).max) { require(currentAllowance >= amount); unchecked { _approve(owner, spender, currentAllowance - amount); } } }
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual {}
    function _afterTokenTransfer(address from, address to, uint256 amount) internal virtual {}
}`,
  '@openzeppelin/contracts/token/ERC20/IERC20.sol': `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}`,
  '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol': `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "../IERC20.sol";
interface IERC20Metadata is IERC20 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
}`,
  '@openzeppelin/contracts/utils/Context.sol': `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
abstract contract Context {
    function _msgSender() internal view virtual returns (address) { return msg.sender; }
    function _msgData() internal view virtual returns (bytes calldata) { return msg.data; }
}`,
  '@openzeppelin/contracts/access/Ownable.sol': `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "../utils/Context.sol";
abstract contract Ownable is Context {
    address private _owner;
    error OwnableUnauthorizedAccount(address account);
    error OwnableInvalidOwner(address owner);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    constructor(address initialOwner) { if (initialOwner == address(0)) { revert OwnableInvalidOwner(address(0)); } _transferOwnership(initialOwner); }
    modifier onlyOwner() { _checkOwner(); _; }
    function owner() public view virtual returns (address) { return _owner; }
    function _checkOwner() internal view virtual { if (owner() != _msgSender()) { revert OwnableUnauthorizedAccount(_msgSender()); } }
    function renounceOwnership() public virtual onlyOwner { _transferOwnership(address(0)); }
    function transferOwnership(address newOwner) public virtual onlyOwner { if (newOwner == address(0)) { revert OwnableInvalidOwner(address(0)); } _transferOwnership(newOwner); }
    function _transferOwnership(address newOwner) internal virtual { address oldOwner = _owner; _owner = newOwner; emit OwnershipTransferred(oldOwner, newOwner); }
}`,
  '@openzeppelin/contracts/security/ReentrancyGuard.sol': `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
abstract contract ReentrancyGuard {
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    uint256 private _status;
    error ReentrancyGuardReentrantCall();
    constructor() { _status = _NOT_ENTERED; }
    modifier nonReentrant() { _nonReentrantBefore(); _; _nonReentrantAfter(); }
    function _nonReentrantBefore() private { if (_status == _ENTERED) { revert ReentrancyGuardReentrantCall(); } _status = _ENTERED; }
    function _nonReentrantAfter() private { _status = _NOT_ENTERED; }
}`,
};

function findImports(importPath: string) {
  if (OPENZEPPELIN_SOURCES[importPath]) {
    return { contents: OPENZEPPELIN_SOURCES[importPath] };
  }
  return { error: `File not found: ${importPath}` };
}

export async function compileContract(input: CompileInput): Promise<CompileOutput> {
  const { sourceCode, contractName, optimizerRuns = 200 } = input;

  const compilerInput = {
    language: 'Solidity',
    sources: {
      [`${contractName}.sol`]: {
        content: sourceCode,
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: optimizerRuns,
      },
      outputSelection: {
        '*': {
          '*': ['abi', 'evm.bytecode', 'evm.gasEstimates'],
        },
      },
    },
  };

  try {
    const output = JSON.parse(
      solc.compile(JSON.stringify(compilerInput), { import: findImports })
    );

    const errors: string[] = [];
    const warnings: string[] = [];

    if (output.errors) {
      output.errors.forEach((error: { severity: string; formattedMessage: string }) => {
        if (error.severity === 'error') {
          errors.push(error.formattedMessage);
        } else {
          warnings.push(error.formattedMessage);
        }
      });
    }

    if (errors.length > 0) {
      return { success: false, errors, warnings };
    }

    const contractOutput = output.contracts[`${contractName}.sol`][contractName];

    if (!contractOutput) {
      return {
        success: false,
        errors: [`Contract ${contractName} not found in compiled output`],
      };
    }

    return {
      success: true,
      abi: contractOutput.abi,
      bytecode: '0x' + contractOutput.evm.bytecode.object,
      gasEstimates: contractOutput.evm.gasEstimates,
      warnings,
    };
  } catch (error) {
    return {
      success: false,
      errors: [(error as Error).message],
    };
  }
}

export function analyzeSecurityIssues(sourceCode: string): {
  score: number;
  issues: Array<{
    severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
    title: string;
    description: string;
    recommendation: string;
  }>;
  passedChecks: string[];
} {
  const issues: Array<{
    severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
    title: string;
    description: string;
    recommendation: string;
  }> = [];
  const passedChecks: string[] = [];

  // Check for common vulnerabilities
  if (sourceCode.includes('tx.origin')) {
    issues.push({
      severity: 'high',
      title: 'tx.origin Usage',
      description: 'Using tx.origin for authorization is vulnerable to phishing attacks',
      recommendation: 'Use msg.sender instead of tx.origin',
    });
  } else {
    passedChecks.push('No tx.origin usage detected');
  }

  if (sourceCode.includes('.call{value:') && !sourceCode.includes('ReentrancyGuard')) {
    issues.push({
      severity: 'high',
      title: 'Potential Reentrancy',
      description: 'External calls with value transfer without reentrancy protection',
      recommendation: 'Use ReentrancyGuard or checks-effects-interactions pattern',
    });
  } else {
    passedChecks.push('Reentrancy protection checked');
  }

  if (sourceCode.includes('selfdestruct')) {
    issues.push({
      severity: 'medium',
      title: 'Selfdestruct Usage',
      description: 'Contract can be destroyed, potentially locking funds',
      recommendation: 'Consider removing selfdestruct or adding strong access controls',
    });
  }

  // Check for good practices
  if (sourceCode.includes('pragma solidity ^0.8')) {
    passedChecks.push('Using Solidity 0.8+ with overflow protection');
  }

  if (sourceCode.includes('SPDX-License-Identifier')) {
    passedChecks.push('SPDX license identifier present');
  }

  if (sourceCode.includes('@openzeppelin')) {
    passedChecks.push('Using OpenZeppelin audited contracts');
  }

  if (sourceCode.includes('onlyOwner') || sourceCode.includes('AccessControl')) {
    passedChecks.push('Access control implemented');
  } else {
    issues.push({
      severity: 'medium',
      title: 'No Access Control',
      description: 'Contract lacks access control mechanisms',
      recommendation: 'Add Ownable or AccessControl for privileged functions',
    });
  }

  // Calculate score
  let score = 100;
  issues.forEach((issue) => {
    switch (issue.severity) {
      case 'critical': score -= 30; break;
      case 'high': score -= 20; break;
      case 'medium': score -= 10; break;
      case 'low': score -= 5; break;
    }
  });

  return { score: Math.max(0, score), issues, passedChecks };
}
