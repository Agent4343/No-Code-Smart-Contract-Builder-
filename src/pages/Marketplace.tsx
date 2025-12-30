import { useState } from 'react';
import {
  Search,
  Filter,
  Star,
  Download,
  Shield,
  ShoppingCart,
  Tag,
  User,
  CheckCircle,
} from 'lucide-react';
import { MarketplaceItem } from '../types';

// Mock marketplace data
const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: 'mp-1',
    type: 'template',
    name: 'Advanced NFT Marketplace',
    description:
      'Complete NFT marketplace with auctions, offers, and royalty distribution. Includes frontend integration.',
    author: {
      address: '0x1234...5678',
      name: 'BlockchainDev',
      verified: true,
    },
    price: 49.99,
    currency: 'USD',
    downloads: 1234,
    rating: 4.9,
    reviews: 89,
    tags: ['nft', 'marketplace', 'auction', 'defi'],
    preview: '',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    id: 'mp-2',
    type: 'template',
    name: 'DeFi Lending Protocol',
    description:
      'Compound-style lending protocol with interest rate models, liquidations, and governance.',
    author: {
      address: '0xabcd...efgh',
      name: 'DeFiBuilder',
      verified: true,
    },
    price: 199.99,
    currency: 'USD',
    downloads: 567,
    rating: 4.8,
    reviews: 45,
    tags: ['defi', 'lending', 'compound', 'protocol'],
    preview: '',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-15'),
  },
  {
    id: 'mp-3',
    type: 'block',
    name: 'Flash Loan Module',
    description:
      'Add flash loan capability to any DeFi protocol. Aave-compatible implementation.',
    author: {
      address: '0x9999...8888',
      name: 'FlashDev',
      verified: false,
    },
    price: 29.99,
    currency: 'USD',
    downloads: 2341,
    rating: 4.7,
    reviews: 156,
    tags: ['defi', 'flash-loan', 'aave', 'module'],
    preview: '',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-03-10'),
  },
  {
    id: 'mp-4',
    type: 'template',
    name: 'DAO Treasury Manager',
    description:
      'Multi-sig treasury with spending proposals, budget allocation, and automated payments.',
    author: {
      address: '0x5555...6666',
      name: 'DAOTools',
      verified: true,
    },
    price: 79.99,
    currency: 'USD',
    downloads: 892,
    rating: 4.6,
    reviews: 67,
    tags: ['dao', 'treasury', 'multisig', 'governance'],
    preview: '',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-03-25'),
  },
  {
    id: 'mp-5',
    type: 'integration',
    name: 'Chainlink Oracle Integration',
    description:
      'Pre-built integration for Chainlink price feeds, VRF, and automation services.',
    author: {
      address: '0x7777...4444',
      name: 'OracleConnect',
      verified: true,
    },
    price: 0,
    currency: 'USD',
    downloads: 5678,
    rating: 4.9,
    reviews: 234,
    tags: ['oracle', 'chainlink', 'price-feed', 'integration'],
    preview: '',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-03-28'),
  },
  {
    id: 'mp-6',
    type: 'template',
    name: 'Fractional NFT Vault',
    description:
      'Fractionalize high-value NFTs into ERC-20 tokens with buyout mechanisms.',
    author: {
      address: '0x2222...3333',
      name: 'NFTFinance',
      verified: true,
    },
    price: 149.99,
    currency: 'USD',
    downloads: 432,
    rating: 4.5,
    reviews: 28,
    tags: ['nft', 'fractional', 'defi', 'vault'],
    preview: '',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-30'),
  },
];

const CATEGORIES = ['All', 'Templates', 'Blocks', 'Integrations'];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'price'>('popular');

  const filteredItems = MARKETPLACE_ITEMS.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'Templates' && item.type === 'template') ||
      (selectedCategory === 'Blocks' && item.type === 'block') ||
      (selectedCategory === 'Integrations' && item.type === 'integration');
    const matchesPrice =
      priceFilter === 'all' ||
      (priceFilter === 'free' && item.price === 0) ||
      (priceFilter === 'paid' && item.price > 0);
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'price':
        return a.price - b.price;
      default:
        return b.downloads - a.downloads;
    }
  });

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Marketplace</h1>
          <p className="text-slate-400 mt-1">
            Discover templates, blocks, and integrations from the community
          </p>
        </div>
        <button className="btn-primary">
          <Tag className="w-4 h-4" />
          Sell Your Template
        </button>
      </div>

      {/* Featured Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-600/20 to-purple-600/20 border border-primary-500/30 p-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <span className="px-3 py-1 bg-primary-500/20 rounded-full text-primary-400 text-sm font-medium">
            Featured
          </span>
          <h2 className="text-2xl font-bold text-white mt-3">
            Premium DeFi Templates
          </h2>
          <p className="text-slate-300 mt-2 max-w-xl">
            Production-ready smart contracts audited by top security firms. Save months of
            development time.
          </p>
          <button className="mt-4 btn-primary">Explore Premium</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search marketplace..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-1">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Price Filter */}
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value as 'all' | 'free' | 'paid')}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white"
          >
            <option value="all">All Prices</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as 'popular' | 'rating' | 'newest' | 'price')
          }
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white"
        >
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest</option>
          <option value="price">Lowest Price</option>
        </select>
      </div>

      {/* Marketplace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="card group hover:border-primary-500/50 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  item.type === 'template'
                    ? 'bg-blue-500/10 text-blue-400'
                    : item.type === 'block'
                    ? 'bg-purple-500/10 text-purple-400'
                    : 'bg-green-500/10 text-green-400'
                }`}
              >
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </span>
              {item.price === 0 ? (
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded font-medium">
                  Free
                </span>
              ) : (
                <span className="text-white font-bold">${item.price}</span>
              )}
            </div>

            {/* Content */}
            <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
              {item.name}
            </h3>
            <p className="text-sm text-slate-400 mt-2 line-clamp-2">
              {item.description}
            </p>

            {/* Author */}
            <div className="flex items-center gap-2 mt-4">
              <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 text-slate-400" />
              </div>
              <span className="text-sm text-slate-400">{item.author.name}</span>
              {item.author.verified && (
                <CheckCircle className="w-4 h-4 text-primary-400" />
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-3">
              {item.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-slate-700/50 rounded text-xs text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats & Action */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{item.rating}</span>
                  <span className="text-slate-500">({item.reviews})</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  <span>{item.downloads.toLocaleString()}</span>
                </div>
              </div>
              <button className="btn-primary py-1.5 px-3 text-sm">
                {item.price === 0 ? 'Get Free' : 'Purchase'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-400">No Items Found</h3>
          <p className="text-sm text-slate-500 mt-2">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </div>
  );
}
