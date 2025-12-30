import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Download, Shield, ArrowRight } from 'lucide-react';
import { useTemplateStore } from '../store/templateStore';

const CATEGORIES = ['All', 'Token', 'NFT', 'DeFi', 'Governance', 'Utility'];

export default function Templates() {
  const { templates, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } =
    useTemplateStore();
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');

  const filteredTemplates = templates
    .filter((t) => {
      const matchesSearch =
        !searchQuery ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory || selectedCategory === 'All' || t.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return 0; // Would sort by date if available
        default:
          return b.popularity - a.popularity;
      }
    });

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Contract Templates</h1>
        <p className="text-slate-400 mt-1">
          Pre-built, audited templates to jumpstart your smart contract development
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <div className="flex gap-1">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === 'All' ? null : category)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    (category === 'All' && !selectedCategory) || selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'popular' | 'rating' | 'newest')}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="card group hover:border-primary-500/50 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    template.category === 'Token'
                      ? 'bg-blue-500/10 text-blue-400'
                      : template.category === 'NFT'
                      ? 'bg-purple-500/10 text-purple-400'
                      : template.category === 'DeFi'
                      ? 'bg-green-500/10 text-green-400'
                      : template.category === 'Governance'
                      ? 'bg-orange-500/10 text-orange-400'
                      : 'bg-slate-500/10 text-slate-400'
                  }`}
                >
                  {template.category}
                </span>
              </div>
              {template.metadata.audited && (
                <div className="flex items-center gap-1 px-2 py-1 bg-green-500/10 rounded text-xs text-green-400">
                  <Shield className="w-3 h-3" />
                  Audited
                </div>
              )}
            </div>

            {/* Content */}
            <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
              {template.name}
            </h3>
            <p className="text-sm text-slate-400 mt-2 line-clamp-2">
              {template.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-4">
              {template.metadata.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-slate-700/50 rounded text-xs text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{template.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  <span>{template.popularity.toLocaleString()}</span>
                </div>
              </div>
              <Link
                to={`/builder/${template.id}`}
                className="flex items-center gap-1 text-primary-400 hover:text-primary-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Use Template <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No templates found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
