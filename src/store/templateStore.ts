import { create } from 'zustand';
import { ContractTemplate } from '../types';

// Predefined templates
const PREDEFINED_TEMPLATES: ContractTemplate[] = [
  {
    id: 'erc20-standard',
    name: 'Standard ERC-20 Token',
    description:
      'A complete ERC-20 token with minting, burning, and pause capabilities. Perfect for utility tokens, governance tokens, or reward tokens.',
    category: 'Token',
    icon: 'Coins',
    blocks: [],
    metadata: {
      author: 'No-Code Builder',
      version: '1.0.0',
      license: 'MIT',
      audited: true,
      tags: ['token', 'erc20', 'fungible', 'mintable'],
    },
    estimatedGas: 1500000,
    popularity: 9850,
    rating: 4.9,
  },
  {
    id: 'erc721-nft',
    name: 'NFT Collection',
    description:
      'Launch your own NFT collection with customizable metadata, royalties, and whitelist minting. Includes EIP-2981 royalty support.',
    category: 'NFT',
    icon: 'Image',
    blocks: [],
    metadata: {
      author: 'No-Code Builder',
      version: '1.0.0',
      license: 'MIT',
      audited: true,
      tags: ['nft', 'erc721', 'art', 'collectible'],
    },
    estimatedGas: 3000000,
    popularity: 7520,
    rating: 4.8,
  },
  {
    id: 'erc1155-multitoken',
    name: 'Multi-Token (ERC-1155)',
    description:
      'Create a versatile multi-token contract supporting both fungible and non-fungible tokens in a single contract.',
    category: 'Token',
    icon: 'Layers',
    blocks: [],
    metadata: {
      author: 'No-Code Builder',
      version: '1.0.0',
      license: 'MIT',
      audited: true,
      tags: ['token', 'erc1155', 'multi-token', 'gaming'],
    },
    estimatedGas: 2500000,
    popularity: 4320,
    rating: 4.7,
  },
  {
    id: 'staking-pool',
    name: 'Staking Pool',
    description:
      'Allow users to stake tokens and earn rewards over time. Includes configurable reward rates and emergency withdraw functions.',
    category: 'DeFi',
    icon: 'TrendingUp',
    blocks: [],
    metadata: {
      author: 'No-Code Builder',
      version: '1.0.0',
      license: 'MIT',
      audited: true,
      tags: ['defi', 'staking', 'rewards', 'yield'],
    },
    estimatedGas: 3500000,
    popularity: 5680,
    rating: 4.6,
  },
  {
    id: 'vesting-contract',
    name: 'Token Vesting',
    description:
      'Time-locked token release for team members, advisors, or investors. Supports cliff periods and linear vesting schedules.',
    category: 'DeFi',
    icon: 'Clock',
    blocks: [],
    metadata: {
      author: 'No-Code Builder',
      version: '1.0.0',
      license: 'MIT',
      audited: true,
      tags: ['vesting', 'team', 'investors', 'timelock'],
    },
    estimatedGas: 1800000,
    popularity: 3240,
    rating: 4.8,
  },
  {
    id: 'escrow',
    name: 'Escrow Service',
    description:
      'Secure escrow contract with optional arbiter for dispute resolution. Perfect for P2P transactions and marketplace payments.',
    category: 'DeFi',
    icon: 'Lock',
    blocks: [],
    metadata: {
      author: 'No-Code Builder',
      version: '1.0.0',
      license: 'MIT',
      audited: true,
      tags: ['escrow', 'payments', 'p2p', 'secure'],
    },
    estimatedGas: 2200000,
    popularity: 2890,
    rating: 4.7,
  },
  {
    id: 'dao-governance',
    name: 'DAO Governance',
    description:
      'Complete governance system with proposals, voting, and timelock execution. Build a decentralized organization.',
    category: 'Governance',
    icon: 'Vote',
    blocks: [],
    metadata: {
      author: 'No-Code Builder',
      version: '1.0.0',
      license: 'MIT',
      audited: true,
      tags: ['dao', 'governance', 'voting', 'proposals'],
    },
    estimatedGas: 4500000,
    popularity: 4120,
    rating: 4.5,
  },
  {
    id: 'airdrop',
    name: 'Token Airdrop',
    description:
      'Distribute tokens to multiple addresses efficiently using Merkle proofs. Ideal for community rewards and marketing campaigns.',
    category: 'Utility',
    icon: 'Gift',
    blocks: [],
    metadata: {
      author: 'No-Code Builder',
      version: '1.0.0',
      license: 'MIT',
      audited: true,
      tags: ['airdrop', 'merkle', 'distribution', 'rewards'],
    },
    estimatedGas: 2000000,
    popularity: 3560,
    rating: 4.6,
  },
];

interface TemplateState {
  templates: ContractTemplate[];
  userTemplates: ContractTemplate[];
  selectedTemplate: ContractTemplate | null;
  searchQuery: string;
  selectedCategory: string | null;

  setSelectedTemplate: (template: ContractTemplate | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  addUserTemplate: (template: ContractTemplate) => void;
  removeUserTemplate: (id: string) => void;
  getFilteredTemplates: () => ContractTemplate[];
}

export const useTemplateStore = create<TemplateState>((set, get) => ({
  templates: PREDEFINED_TEMPLATES,
  userTemplates: [],
  selectedTemplate: null,
  searchQuery: '',
  selectedCategory: null,

  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  addUserTemplate: (template) =>
    set((state) => ({
      userTemplates: [...state.userTemplates, template],
    })),

  removeUserTemplate: (id) =>
    set((state) => ({
      userTemplates: state.userTemplates.filter((t) => t.id !== id),
    })),

  getFilteredTemplates: () => {
    const { templates, userTemplates, searchQuery, selectedCategory } = get();
    const allTemplates = [...templates, ...userTemplates];

    return allTemplates.filter((template) => {
      const matchesSearch =
        !searchQuery ||
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.metadata.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        !selectedCategory || template.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  },
}));
