import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import * as Icons from 'lucide-react';
import { PlacedBlock } from '../../types';

interface ContractBlockNodeProps extends NodeProps {
  data: PlacedBlock;
}

function ContractBlockNode({ data, selected }: ContractBlockNodeProps) {
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[data.icon];

  const getSecurityColor = (level: string) => {
    switch (level) {
      case 'safe':
        return 'border-green-500/50 bg-green-500/5';
      case 'caution':
        return 'border-yellow-500/50 bg-yellow-500/5';
      case 'dangerous':
        return 'border-red-500/50 bg-red-500/5';
      default:
        return 'border-slate-600';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'token':
        return 'from-blue-500 to-blue-600';
      case 'access':
        return 'from-purple-500 to-purple-600';
      case 'defi':
        return 'from-green-500 to-green-600';
      case 'governance':
        return 'from-orange-500 to-orange-600';
      case 'utility':
        return 'from-slate-500 to-slate-600';
      default:
        return 'from-primary-500 to-primary-600';
    }
  };

  return (
    <div
      className={`min-w-[200px] bg-slate-800 rounded-xl border-2 transition-all duration-200 ${
        selected
          ? 'border-primary-500 shadow-lg shadow-primary-500/20'
          : getSecurityColor(data.securityLevel)
      }`}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-primary-500 !border-2 !border-slate-800"
      />

      {/* Header */}
      <div
        className={`px-4 py-2 rounded-t-lg bg-gradient-to-r ${getCategoryColor(
          data.category
        )}`}
      >
        <div className="flex items-center gap-2">
          {IconComponent && <IconComponent className="w-4 h-4 text-white" />}
          <span className="text-sm font-semibold text-white">{data.name}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-xs text-slate-400 line-clamp-2">{data.description}</p>

        {/* Parameter Preview */}
        {data.parameters.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {data.parameters.slice(0, 3).map((param) => (
              <div
                key={param.name}
                className="flex items-center justify-between text-xs"
              >
                <span className="text-slate-500">{param.label}:</span>
                <span className="text-slate-300 font-mono truncate max-w-[100px]">
                  {String(data.parameterValues?.[param.name] ?? param.defaultValue ?? '...')}
                </span>
              </div>
            ))}
            {data.parameters.length > 3 && (
              <p className="text-xs text-slate-500 italic">
                +{data.parameters.length - 3} more
              </p>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-700">
          <span
            className={`px-1.5 py-0.5 rounded text-xs ${
              data.securityLevel === 'safe'
                ? 'bg-green-500/10 text-green-400'
                : data.securityLevel === 'caution'
                ? 'bg-yellow-500/10 text-yellow-400'
                : 'bg-red-500/10 text-red-400'
            }`}
          >
            {data.securityLevel}
          </span>
          <span className="text-xs text-slate-500">
            {data.gasEstimate ? `~${(data.gasEstimate / 1000).toFixed(0)}k gas` : ''}
          </span>
        </div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-primary-500 !border-2 !border-slate-800"
      />
    </div>
  );
}

export default memo(ContractBlockNode);
