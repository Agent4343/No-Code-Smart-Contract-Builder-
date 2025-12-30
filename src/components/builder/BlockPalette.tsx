import { useState } from 'react';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { ALL_BLOCKS, BLOCK_CATEGORIES } from '../../types/blocks';
import { ContractBlock } from '../../types';

interface BlockPaletteProps {
  onAddBlock: (block: ContractBlock) => void;
}

export default function BlockPalette({ onAddBlock }: BlockPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'token',
    'access',
  ]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredBlocks = ALL_BLOCKS.filter(
    (block) =>
      block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getBlocksByCategory = (categoryId: string) => {
    return filteredBlocks.filter((block) => block.category === categoryId);
  };

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
  };

  const getSecurityBadge = (level: string) => {
    switch (level) {
      case 'safe':
        return (
          <span className="px-1.5 py-0.5 bg-green-500/10 text-green-400 text-xs rounded">
            Safe
          </span>
        );
      case 'caution':
        return (
          <span className="px-1.5 py-0.5 bg-yellow-500/10 text-yellow-400 text-xs rounded">
            Caution
          </span>
        );
      case 'dangerous':
        return (
          <span className="px-1.5 py-0.5 bg-red-500/10 text-red-400 text-xs rounded">
            Risky
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-72 bg-slate-800/50 rounded-xl border border-slate-700 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-lg font-semibold text-white mb-3">Blocks</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Block Categories */}
      <div className="flex-1 overflow-y-auto p-2">
        {BLOCK_CATEGORIES.map((category) => {
          const blocks = getBlocksByCategory(category.id);
          const isExpanded = expandedCategories.includes(category.id);

          return (
            <div key={category.id} className="mb-2">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {getIcon(category.icon)}
                  <span className="text-sm font-medium text-white">
                    {category.name}
                  </span>
                  <span className="text-xs text-slate-400">({blocks.length})</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {isExpanded && (
                <div className="mt-1 space-y-1 ml-2">
                  {blocks.map((block) => (
                    <button
                      key={block.id}
                      onClick={() => onAddBlock(block)}
                      className="w-full text-left p-3 bg-slate-700/30 hover:bg-slate-700/60 rounded-lg transition-all duration-200 group border border-transparent hover:border-primary-500/30"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-primary-500/10 rounded-lg text-primary-400">
                            {getIcon(block.icon)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white group-hover:text-primary-400 transition-colors">
                              {block.name}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                              {block.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {getSecurityBadge(block.securityLevel)}
                        {block.gasEstimate && (
                          <span className="text-xs text-slate-500">
                            ~{(block.gasEstimate / 1000).toFixed(0)}k gas
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700">
        <p className="text-xs text-slate-400 text-center">
          Drag blocks to canvas or click to add
        </p>
      </div>
    </div>
  );
}
