import { ContractBlock } from './index';

// ERC-20 Token Blocks
export const ERC20_BLOCKS: ContractBlock[] = [
  {
    id: 'erc20-base',
    type: 'erc20-base',
    category: 'token',
    name: 'ERC-20 Token',
    description: 'Create a standard ERC-20 fungible token with customizable name, symbol, and initial supply',
    icon: 'Coins',
    parameters: [
      {
        name: 'name',
        type: 'string',
        label: 'Token Name',
        description: 'The full name of your token (e.g., "My Token")',
        required: true,
      },
      {
        name: 'symbol',
        type: 'string',
        label: 'Token Symbol',
        description: 'The ticker symbol (e.g., "MTK")',
        required: true,
        validation: { pattern: '^[A-Z]{2,6}$' },
      },
      {
        name: 'initialSupply',
        type: 'uint256',
        label: 'Initial Supply',
        description: 'The initial token supply (will be minted to deployer)',
        required: true,
        defaultValue: '1000000',
      },
      {
        name: 'decimals',
        type: 'number',
        label: 'Decimals',
        description: 'Number of decimal places (standard is 18)',
        required: true,
        defaultValue: 18,
        validation: { min: 0, max: 18 },
      },
    ],
    codeTemplate: `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract {{name}} is ERC20 {
    constructor() ERC20("{{name}}", "{{symbol}}") {
        _mint(msg.sender, {{initialSupply}} * 10 ** {{decimals}});
    }
}`,
    gasEstimate: 1200000,
    securityLevel: 'safe',
  },
  {
    id: 'erc20-mintable',
    type: 'erc20-mintable',
    category: 'token',
    name: 'Mintable Token',
    description: 'Add minting capability to create new tokens after deployment',
    icon: 'Plus',
    parameters: [
      {
        name: 'maxSupply',
        type: 'uint256',
        label: 'Maximum Supply',
        description: 'The maximum number of tokens that can ever exist (0 for unlimited)',
        required: false,
        defaultValue: '0',
      },
    ],
    codeTemplate: `
    uint256 public maxSupply = {{maxSupply}};

    function mint(address to, uint256 amount) public onlyOwner {
        require(maxSupply == 0 || totalSupply() + amount <= maxSupply, "Max supply exceeded");
        _mint(to, amount);
    }`,
    dependencies: ['access-ownable'],
    gasEstimate: 50000,
    securityLevel: 'caution',
  },
  {
    id: 'erc20-burnable',
    type: 'erc20-burnable',
    category: 'token',
    name: 'Burnable Token',
    description: 'Allow token holders to destroy their tokens',
    icon: 'Flame',
    parameters: [],
    codeTemplate: `
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

// Add ERC20Burnable to contract inheritance`,
    gasEstimate: 30000,
    securityLevel: 'safe',
  },
  {
    id: 'erc20-pausable',
    type: 'erc20-pausable',
    category: 'token',
    name: 'Pausable Token',
    description: 'Add ability to pause all token transfers in emergencies',
    icon: 'Pause',
    parameters: [],
    codeTemplate: `
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";

function pause() public onlyOwner {
    _pause();
}

function unpause() public onlyOwner {
    _unpause();
}`,
    dependencies: ['access-ownable'],
    gasEstimate: 40000,
    securityLevel: 'safe',
  },
];

// ERC-721 NFT Blocks
export const ERC721_BLOCKS: ContractBlock[] = [
  {
    id: 'erc721-base',
    type: 'erc721-base',
    category: 'token',
    name: 'ERC-721 NFT',
    description: 'Create a standard ERC-721 non-fungible token collection',
    icon: 'Image',
    parameters: [
      {
        name: 'name',
        type: 'string',
        label: 'Collection Name',
        description: 'The name of your NFT collection',
        required: true,
      },
      {
        name: 'symbol',
        type: 'string',
        label: 'Symbol',
        description: 'The collection symbol',
        required: true,
      },
      {
        name: 'baseURI',
        type: 'string',
        label: 'Base URI',
        description: 'The base URI for token metadata (e.g., ipfs://...)',
        required: true,
      },
      {
        name: 'maxSupply',
        type: 'uint256',
        label: 'Max Supply',
        description: 'Maximum number of NFTs that can be minted',
        required: true,
        defaultValue: '10000',
      },
    ],
    codeTemplate: `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract {{name}} is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    uint256 public maxSupply = {{maxSupply}};
    string private _baseTokenURI = "{{baseURI}}";

    constructor() ERC721("{{name}}", "{{symbol}}") Ownable(msg.sender) {}

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function safeMint(address to) public onlyOwner {
        require(_nextTokenId < maxSupply, "Max supply reached");
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}`,
    gasEstimate: 2500000,
    securityLevel: 'safe',
  },
  {
    id: 'erc721-royalty',
    type: 'erc721-royalty',
    category: 'token',
    name: 'NFT Royalties',
    description: 'Add EIP-2981 royalty support for secondary sales',
    icon: 'Percent',
    parameters: [
      {
        name: 'royaltyPercentage',
        type: 'number',
        label: 'Royalty Percentage',
        description: 'Percentage of sales for royalties (e.g., 5 for 5%)',
        required: true,
        defaultValue: 5,
        validation: { min: 0, max: 100 },
      },
      {
        name: 'royaltyReceiver',
        type: 'address',
        label: 'Royalty Receiver',
        description: 'Address to receive royalty payments',
        required: true,
      },
    ],
    codeTemplate: `
import "@openzeppelin/contracts/token/common/ERC2981.sol";

// Add ERC2981 to inheritance and set default royalty in constructor
_setDefaultRoyalty({{royaltyReceiver}}, {{royaltyPercentage}} * 100);`,
    gasEstimate: 60000,
    securityLevel: 'safe',
  },
];

// ERC-1155 Multi-Token Blocks
export const ERC1155_BLOCKS: ContractBlock[] = [
  {
    id: 'erc1155-base',
    type: 'erc1155-base',
    category: 'token',
    name: 'ERC-1155 Multi-Token',
    description: 'Create a multi-token contract supporting both fungible and non-fungible tokens',
    icon: 'Layers',
    parameters: [
      {
        name: 'uri',
        type: 'string',
        label: 'Metadata URI',
        description: 'URI pattern for token metadata (use {id} placeholder)',
        required: true,
        defaultValue: 'https://api.example.com/token/{id}.json',
      },
    ],
    codeTemplate: `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MultiToken is ERC1155, Ownable {
    constructor() ERC1155("{{uri}}") Ownable(msg.sender) {}

    function mint(address account, uint256 id, uint256 amount, bytes memory data) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
}`,
    gasEstimate: 2000000,
    securityLevel: 'safe',
  },
];

// Access Control Blocks
export const ACCESS_BLOCKS: ContractBlock[] = [
  {
    id: 'access-ownable',
    type: 'access-ownable',
    category: 'access',
    name: 'Ownable',
    description: 'Single owner access control with ownership transfer capability',
    icon: 'User',
    parameters: [],
    codeTemplate: `
import "@openzeppelin/contracts/access/Ownable.sol";

// Add Ownable(msg.sender) to constructor`,
    gasEstimate: 25000,
    securityLevel: 'safe',
  },
  {
    id: 'access-roles',
    type: 'access-roles',
    category: 'access',
    name: 'Role-Based Access',
    description: 'Flexible role-based access control with multiple roles',
    icon: 'Users',
    parameters: [
      {
        name: 'roles',
        type: 'array',
        label: 'Roles',
        description: 'Define custom roles (e.g., MINTER_ROLE, ADMIN_ROLE)',
        required: true,
        defaultValue: 'ADMIN_ROLE,MINTER_ROLE',
      },
    ],
    codeTemplate: `
import "@openzeppelin/contracts/access/AccessControl.sol";

bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

// In constructor:
_grantRole(DEFAULT_ADMIN_ROLE, msg.sender);`,
    gasEstimate: 50000,
    securityLevel: 'safe',
  },
  {
    id: 'access-multisig',
    type: 'access-multisig',
    category: 'access',
    name: 'Multi-Signature',
    description: 'Require multiple signatures for critical operations',
    icon: 'Shield',
    parameters: [
      {
        name: 'requiredSignatures',
        type: 'number',
        label: 'Required Signatures',
        description: 'Number of signatures required to execute transactions',
        required: true,
        defaultValue: 2,
        validation: { min: 1, max: 10 },
      },
    ],
    codeTemplate: `
uint256 public requiredSignatures = {{requiredSignatures}};
mapping(bytes32 => uint256) public confirmations;
mapping(bytes32 => mapping(address => bool)) public isConfirmed;

function confirmTransaction(bytes32 txHash) public onlyOwner {
    require(!isConfirmed[txHash][msg.sender], "Already confirmed");
    isConfirmed[txHash][msg.sender] = true;
    confirmations[txHash]++;
}`,
    gasEstimate: 80000,
    securityLevel: 'safe',
  },
];

// DeFi Blocks
export const DEFI_BLOCKS: ContractBlock[] = [
  {
    id: 'defi-staking',
    type: 'defi-staking',
    category: 'defi',
    name: 'Staking Pool',
    description: 'Allow users to stake tokens and earn rewards',
    icon: 'TrendingUp',
    parameters: [
      {
        name: 'stakingToken',
        type: 'address',
        label: 'Staking Token',
        description: 'Address of the token to be staked',
        required: true,
      },
      {
        name: 'rewardToken',
        type: 'address',
        label: 'Reward Token',
        description: 'Address of the reward token',
        required: true,
      },
      {
        name: 'rewardRate',
        type: 'uint256',
        label: 'Reward Rate',
        description: 'Rewards per second distributed',
        required: true,
        defaultValue: '100000000000000',
      },
    ],
    codeTemplate: `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingPool is ReentrancyGuard, Ownable {
    IERC20 public stakingToken;
    IERC20 public rewardToken;

    uint256 public rewardRate = {{rewardRate}};
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;

    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;
    mapping(address => uint256) public balances;
    uint256 public totalSupply;

    constructor(address _stakingToken, address _rewardToken) Ownable(msg.sender) {
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
    }

    function stake(uint256 amount) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Cannot stake 0");
        totalSupply += amount;
        balances[msg.sender] += amount;
        stakingToken.transferFrom(msg.sender, address(this), amount);
    }

    function withdraw(uint256 amount) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Cannot withdraw 0");
        totalSupply -= amount;
        balances[msg.sender] -= amount;
        stakingToken.transfer(msg.sender, amount);
    }

    function getReward() external nonReentrant updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            rewardToken.transfer(msg.sender, reward);
        }
    }

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

    function rewardPerToken() public view returns (uint256) {
        if (totalSupply == 0) return rewardPerTokenStored;
        return rewardPerTokenStored + (((block.timestamp - lastUpdateTime) * rewardRate * 1e18) / totalSupply);
    }

    function earned(address account) public view returns (uint256) {
        return ((balances[account] * (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18) + rewards[account];
    }
}`,
    gasEstimate: 3000000,
    securityLevel: 'caution',
  },
  {
    id: 'defi-vesting',
    type: 'defi-vesting',
    category: 'defi',
    name: 'Token Vesting',
    description: 'Time-locked token release schedule for team, advisors, or investors',
    icon: 'Clock',
    parameters: [
      {
        name: 'vestingDuration',
        type: 'uint256',
        label: 'Vesting Duration (seconds)',
        description: 'Total vesting period in seconds',
        required: true,
        defaultValue: '31536000',
      },
      {
        name: 'cliffDuration',
        type: 'uint256',
        label: 'Cliff Duration (seconds)',
        description: 'Initial lock period before vesting starts',
        required: true,
        defaultValue: '7776000',
      },
    ],
    codeTemplate: `
struct VestingSchedule {
    uint256 totalAmount;
    uint256 startTime;
    uint256 cliffDuration;
    uint256 vestingDuration;
    uint256 released;
}

mapping(address => VestingSchedule) public vestingSchedules;

function createVesting(address beneficiary, uint256 amount) external onlyOwner {
    vestingSchedules[beneficiary] = VestingSchedule({
        totalAmount: amount,
        startTime: block.timestamp,
        cliffDuration: {{cliffDuration}},
        vestingDuration: {{vestingDuration}},
        released: 0
    });
}`,
    gasEstimate: 150000,
    securityLevel: 'safe',
  },
  {
    id: 'defi-escrow',
    type: 'defi-escrow',
    category: 'defi',
    name: 'Escrow',
    description: 'Hold funds until conditions are met with optional arbitration',
    icon: 'Lock',
    parameters: [
      {
        name: 'arbiter',
        type: 'address',
        label: 'Arbiter Address',
        description: 'Address authorized to resolve disputes',
        required: true,
      },
      {
        name: 'fee',
        type: 'number',
        label: 'Arbiter Fee (%)',
        description: 'Fee percentage for the arbiter',
        required: false,
        defaultValue: 1,
      },
    ],
    codeTemplate: `
address public arbiter = {{arbiter}};
uint256 public arbiterFee = {{fee}};

struct EscrowTransaction {
    address buyer;
    address seller;
    uint256 amount;
    bool completed;
    bool disputed;
}

mapping(uint256 => EscrowTransaction) public escrows;
uint256 public escrowCount;

function createEscrow(address seller) external payable returns (uint256) {
    uint256 escrowId = escrowCount++;
    escrows[escrowId] = EscrowTransaction({
        buyer: msg.sender,
        seller: seller,
        amount: msg.value,
        completed: false,
        disputed: false
    });
    return escrowId;
}

function release(uint256 escrowId) external {
    EscrowTransaction storage escrow = escrows[escrowId];
    require(msg.sender == escrow.buyer || msg.sender == arbiter, "Not authorized");
    require(!escrow.completed, "Already completed");

    escrow.completed = true;
    payable(escrow.seller).transfer(escrow.amount);
}`,
    gasEstimate: 200000,
    securityLevel: 'caution',
  },
];

// Governance Blocks
export const GOVERNANCE_BLOCKS: ContractBlock[] = [
  {
    id: 'governance-voting',
    type: 'governance-voting',
    category: 'governance',
    name: 'Voting System',
    description: 'On-chain voting mechanism for governance proposals',
    icon: 'Vote',
    parameters: [
      {
        name: 'votingPeriod',
        type: 'uint256',
        label: 'Voting Period (blocks)',
        description: 'Number of blocks the voting period lasts',
        required: true,
        defaultValue: '45818',
      },
      {
        name: 'quorum',
        type: 'number',
        label: 'Quorum (%)',
        description: 'Minimum participation required for valid vote',
        required: true,
        defaultValue: 4,
      },
    ],
    codeTemplate: `
struct Proposal {
    uint256 id;
    string description;
    uint256 forVotes;
    uint256 againstVotes;
    uint256 startBlock;
    uint256 endBlock;
    bool executed;
    mapping(address => bool) hasVoted;
}

uint256 public votingPeriod = {{votingPeriod}};
uint256 public quorumPercentage = {{quorum}};
mapping(uint256 => Proposal) public proposals;
uint256 public proposalCount;

function propose(string memory description) external returns (uint256) {
    uint256 proposalId = proposalCount++;
    Proposal storage proposal = proposals[proposalId];
    proposal.id = proposalId;
    proposal.description = description;
    proposal.startBlock = block.number;
    proposal.endBlock = block.number + votingPeriod;
    return proposalId;
}

function vote(uint256 proposalId, bool support) external {
    Proposal storage proposal = proposals[proposalId];
    require(block.number <= proposal.endBlock, "Voting ended");
    require(!proposal.hasVoted[msg.sender], "Already voted");

    proposal.hasVoted[msg.sender] = true;
    if (support) {
        proposal.forVotes++;
    } else {
        proposal.againstVotes++;
    }
}`,
    gasEstimate: 250000,
    securityLevel: 'safe',
  },
  {
    id: 'governance-timelock',
    type: 'governance-timelock',
    category: 'governance',
    name: 'Timelock',
    description: 'Delay execution of governance decisions for security',
    icon: 'Timer',
    parameters: [
      {
        name: 'delay',
        type: 'uint256',
        label: 'Minimum Delay (seconds)',
        description: 'Minimum time between proposal and execution',
        required: true,
        defaultValue: '172800',
      },
    ],
    codeTemplate: `
uint256 public constant MINIMUM_DELAY = {{delay}};

mapping(bytes32 => uint256) public queuedTransactions;

function queueTransaction(address target, uint256 value, bytes memory data) public returns (bytes32) {
    bytes32 txHash = keccak256(abi.encode(target, value, data, block.timestamp));
    queuedTransactions[txHash] = block.timestamp + MINIMUM_DELAY;
    return txHash;
}

function executeTransaction(address target, uint256 value, bytes memory data, uint256 eta) public payable {
    bytes32 txHash = keccak256(abi.encode(target, value, data, eta));
    require(queuedTransactions[txHash] != 0, "Not queued");
    require(block.timestamp >= queuedTransactions[txHash], "Not ready");

    delete queuedTransactions[txHash];
    (bool success,) = target.call{value: value}(data);
    require(success, "Execution failed");
}`,
    gasEstimate: 100000,
    securityLevel: 'safe',
  },
];

// Utility Blocks
export const UTILITY_BLOCKS: ContractBlock[] = [
  {
    id: 'utility-reentrancy',
    type: 'utility-reentrancy',
    category: 'utility',
    name: 'Reentrancy Guard',
    description: 'Protect functions from reentrancy attacks',
    icon: 'ShieldCheck',
    parameters: [],
    codeTemplate: `
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// Add ReentrancyGuard to contract inheritance
// Use nonReentrant modifier on vulnerable functions`,
    gasEstimate: 2500,
    securityLevel: 'safe',
  },
  {
    id: 'utility-withdraw',
    type: 'utility-withdraw',
    category: 'utility',
    name: 'Withdraw Function',
    description: 'Allow contract owner to withdraw ETH or tokens',
    icon: 'ArrowDownToLine',
    parameters: [],
    codeTemplate: `
function withdraw() external onlyOwner {
    uint256 balance = address(this).balance;
    require(balance > 0, "No balance");
    payable(owner()).transfer(balance);
}

function withdrawToken(address token) external onlyOwner {
    uint256 balance = IERC20(token).balanceOf(address(this));
    require(balance > 0, "No balance");
    IERC20(token).transfer(owner(), balance);
}`,
    dependencies: ['access-ownable'],
    gasEstimate: 30000,
    securityLevel: 'safe',
  },
  {
    id: 'utility-whitelist',
    type: 'utility-whitelist',
    category: 'utility',
    name: 'Whitelist',
    description: 'Restrict access to whitelisted addresses',
    icon: 'ListCheck',
    parameters: [],
    codeTemplate: `
mapping(address => bool) public whitelist;

modifier onlyWhitelisted() {
    require(whitelist[msg.sender], "Not whitelisted");
    _;
}

function addToWhitelist(address account) external onlyOwner {
    whitelist[account] = true;
}

function removeFromWhitelist(address account) external onlyOwner {
    whitelist[account] = false;
}

function addBatchToWhitelist(address[] calldata accounts) external onlyOwner {
    for (uint256 i = 0; i < accounts.length; i++) {
        whitelist[accounts[i]] = true;
    }
}`,
    dependencies: ['access-ownable'],
    gasEstimate: 50000,
    securityLevel: 'safe',
  },
];

// All blocks combined
export const ALL_BLOCKS: ContractBlock[] = [
  ...ERC20_BLOCKS,
  ...ERC721_BLOCKS,
  ...ERC1155_BLOCKS,
  ...ACCESS_BLOCKS,
  ...DEFI_BLOCKS,
  ...GOVERNANCE_BLOCKS,
  ...UTILITY_BLOCKS,
];

export const BLOCK_CATEGORIES = [
  { id: 'token', name: 'Tokens', icon: 'Coins', description: 'ERC-20, ERC-721, ERC-1155 tokens' },
  { id: 'access', name: 'Access Control', icon: 'Shield', description: 'Ownership and permissions' },
  { id: 'defi', name: 'DeFi', icon: 'TrendingUp', description: 'Staking, vesting, escrow' },
  { id: 'governance', name: 'Governance', icon: 'Vote', description: 'Voting and proposals' },
  { id: 'utility', name: 'Utilities', icon: 'Wrench', description: 'Security and helper functions' },
];
