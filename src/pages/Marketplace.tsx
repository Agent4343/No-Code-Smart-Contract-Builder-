import { useState } from 'react';
import {
  Search,
  Star,
  Download,
  Filter,
  BadgeCheck,
  ArrowRight,
  Store,
  TrendingUp,
  Crown,
} from 'lucide-react';

const MARKETPLACE_ITEMS = [
  {
    id: '1',
    name: 'Advanced Token Suite',
    author: 'OpenForge Labs',
    authorVerified: true,
    description: 'Complete ERC-20 token with advanced tokenomics, auto-liquidity, and reflection rewards.',
    category: 'Token',
    rating: 4.9,
    downloads: 12340,
    price: 'Free',
    tags: ['ERC-20', 'DeFi', 'Tokenomics'],
    featured: true,
  },
  {
    id: '2',
    name: 'NFT Launchpad',
    author: 'CryptoCanvas',
    authorVerified: true,
    description: 'Full-featured NFT collection with whitelist, reveal mechanics, and royalty management.',
    category: 'NFT',
    rating: 4.8,
    downloads: 8920,
    price: '$9.99',
    tags: ['ERC-721', 'Mint', 'Reveal'],
    featured: true,
  },
  {
    id: '3',
    name: 'Yield Farm Protocol',
    author: 'DeFi Forge',
    authorVerified: true,
    description: 'Multi-pool yield farming with configurable reward distribution and time-locking.',
    category: 'DeFi',
    rating: 4.7,
    downloads: 5620,
    price: '$19.99',
    tags: ['Staking', 'Farming', 'Rewards'],
    featured: false,
  },
  {
    id: '4',
    name: 'DAO Governance Kit',
    author: 'GovBlock',
    authorVerified: false,
    description: 'Complete governance with proposal creation, voting, and timelock execution.',
    category: 'Governance',
    rating: 4.6,
    downloads: 3210,
    price: 'Free',
    tags: ['DAO', 'Voting', 'Timelock'],
    featured: false,
  },
  {
    id: '5',
    name: 'Multi-Sig Treasury',
    author: 'SafeForge',
    authorVerified: true,
    description: 'Multi-signature wallet with configurable thresholds and transaction batching.',
    category: 'Utility',
    rating: 4.8,
    downloads: 4560,
    price: '$14.99',
    tags: ['MultiSig', 'Treasury', 'Security'],
    featured: false,
  },
  {
    id: '6',
    name: 'Token Vesting Pro',
    author: 'VestLab',
    authorVerified: false,
    description: 'Configurable vesting schedules with cliff periods, revocability, and beneficiary management.',
    category: 'DeFi',
    rating: 4.5,
    downloads: 2890,
    price: 'Free',
    tags: ['Vesting', 'Cliff', 'Token'],
    featured: false,
  },
];

const CATEGORIES = ['All', 'Token', 'NFT', 'DeFi', 'Governance', 'Utility'];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');

  const filteredItems = MARKETPLACE_ITEMS
    .filter((item) => {
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        default:
          return b.downloads - a.downloads;
      }
    });

  const featuredItems = MARKETPLACE_ITEMS.filter((item) => item.featured);

  return (
    <div className="space-y-8 animate-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Template Marketplace</h1>
          <p className="text-slate-400 mt-1">
            Discover community-built templates from verified developers
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400">
            {MARKETPLACE_ITEMS.length} templates available
          </span>
        </div>
      </div>

      {/* Featured Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-yellow-400" />
          <h2 className="text-lg font-bold text-white">Trending</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="relative card group hover:border-primary-500/30 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/5 rounded-full blur-xl" />
              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <span className="badge-warning">
                    <Crown className="w-3 h-3" />
                    Featured
                  </span>
                  <span className={`text-sm font-bold ${
                    item.price === 'Free' ? 'text-green-400' : 'text-white'
                  }`}>
                    {item.price}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-slate-400">{item.author}</span>
                  {item.authorVerified && (
                    <BadgeCheck className="w-4 h-4 text-primary-400" />
                  )}
                </div>
                <p className="text-sm text-slate-400 mt-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      {item.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {item.downloads.toLocaleString()}
                    </span>
                  </div>
                  <button className="flex items-center gap-1 text-primary-400 hover:text-primary-300 text-sm font-medium">
                    Use Template <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search marketplace..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <div className="flex gap-1">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'popular' | 'rating' | 'newest')}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/40"
        >
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* All Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-in">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="card group hover:border-primary-500/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  item.category === 'Token'
                    ? 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20'
                    : item.category === 'NFT'
                    ? 'bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20'
                    : item.category === 'DeFi'
                    ? 'bg-green-500/10 text-green-400 ring-1 ring-green-500/20'
                    : item.category === 'Governance'
                    ? 'bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20'
                    : 'bg-slate-500/10 text-slate-400 ring-1 ring-slate-500/20'
                }`}
              >
                {item.category}
              </span>
              <span className={`text-sm font-bold ${
                item.price === 'Free' ? 'text-green-400' : 'text-white'
              }`}>
                {item.price}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
              {item.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-slate-400">{item.author}</span>
              {item.authorVerified && (
                <BadgeCheck className="w-4 h-4 text-primary-400" />
              )}
            </div>
            <p className="text-sm text-slate-400 mt-2 line-clamp-2">{item.description}</p>

            <div className="flex flex-wrap gap-1 mt-3">
              {item.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-slate-700/50 rounded text-xs text-slate-400">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  {item.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  {item.downloads.toLocaleString()}
                </span>
              </div>
              <button className="flex items-center gap-1 text-primary-400 hover:text-primary-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Use <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-700/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Store className="w-8 h-8 text-slate-600" />
          </div>
          <p className="text-slate-400 font-medium">No templates found</p>
          <p className="text-sm text-slate-500 mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
