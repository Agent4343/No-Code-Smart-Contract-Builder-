import { Trash2, Info, AlertTriangle } from 'lucide-react';
import { PlacedBlock } from '../../types';

interface PropertiesPanelProps {
  selectedNodeId: string | null;
  nodes: { id: string; data: PlacedBlock }[];
  onUpdateNode: (id: string, data: Partial<PlacedBlock>) => void;
  onDeleteNode: (id: string) => void;
}

export default function PropertiesPanel({
  selectedNodeId,
  nodes,
  onUpdateNode,
  onDeleteNode,
}: PropertiesPanelProps) {
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  if (!selectedNode) {
    return (
      <div className="w-80 bg-slate-800/50 rounded-xl border border-slate-700 p-6 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
          <Info className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-400">No Block Selected</h3>
        <p className="text-sm text-slate-500 mt-2">
          Click on a block in the canvas to configure its properties
        </p>
      </div>
    );
  }

  const block = selectedNode.data;

  const handleParameterChange = (paramName: string, value: string | number | boolean) => {
    onUpdateNode(selectedNodeId!, {
      parameterValues: {
        ...block.parameterValues,
        [paramName]: value,
      },
    });
  };

  return (
    <div className="w-80 bg-slate-800/50 rounded-xl border border-slate-700 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{block.name}</h2>
          <button
            onClick={() => onDeleteNode(selectedNodeId!)}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            title="Delete Block"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-slate-400 mt-1">{block.description}</p>
        <div className="flex items-center gap-2 mt-3">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              block.securityLevel === 'safe'
                ? 'bg-green-500/10 text-green-400'
                : block.securityLevel === 'caution'
                ? 'bg-yellow-500/10 text-yellow-400'
                : 'bg-red-500/10 text-red-400'
            }`}
          >
            {block.securityLevel === 'safe'
              ? 'Safe'
              : block.securityLevel === 'caution'
              ? 'Use with caution'
              : 'Review carefully'}
          </span>
          {block.gasEstimate && (
            <span className="text-xs text-slate-400">
              ~{(block.gasEstimate / 1000).toFixed(0)}k gas
            </span>
          )}
        </div>
      </div>

      {/* Parameters */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider">
          Parameters
        </h3>

        {block.parameters.length === 0 ? (
          <p className="text-sm text-slate-500 italic">
            This block has no configurable parameters
          </p>
        ) : (
          block.parameters.map((param) => (
            <div key={param.name}>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-1.5">
                {param.label}
                {param.required && <span className="text-red-400">*</span>}
              </label>
              <p className="text-xs text-slate-500 mb-2">{param.description}</p>

              {param.type === 'boolean' ? (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(block.parameterValues?.[param.name] ?? param.defaultValue)}
                    onChange={(e) => handleParameterChange(param.name, e.target.checked)}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-primary-500 focus:ring-primary-500 focus:ring-offset-0"
                  />
                  <span className="text-sm text-slate-400">Enable</span>
                </label>
              ) : param.type === 'number' ? (
                <input
                  type="number"
                  value={String(block.parameterValues?.[param.name] ?? param.defaultValue ?? '')}
                  onChange={(e) => handleParameterChange(param.name, Number(e.target.value))}
                  min={param.validation?.min}
                  max={param.validation?.max}
                  className="input-field"
                  placeholder={`Enter ${param.label.toLowerCase()}`}
                />
              ) : (
                <input
                  type="text"
                  value={String(block.parameterValues?.[param.name] ?? param.defaultValue ?? '')}
                  onChange={(e) => handleParameterChange(param.name, e.target.value)}
                  pattern={param.validation?.pattern}
                  className="input-field"
                  placeholder={
                    param.type === 'address'
                      ? '0x...'
                      : `Enter ${param.label.toLowerCase()}`
                  }
                />
              )}

              {param.validation?.pattern && (
                <p className="text-xs text-slate-500 mt-1">
                  Pattern: {param.validation.pattern}
                </p>
              )}
            </div>
          ))
        )}

        {/* Dependencies Warning */}
        {block.dependencies && block.dependencies.length > 0 && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-400">Dependencies</p>
                <p className="text-xs text-slate-400 mt-1">
                  This block requires:{' '}
                  {block.dependencies.map((dep) => dep.replace('-', ' ')).join(', ')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Code Preview */}
      <div className="p-4 border-t border-slate-700">
        <details className="group">
          <summary className="text-sm font-medium text-slate-300 cursor-pointer hover:text-white">
            View Code Template
          </summary>
          <pre className="mt-3 p-3 bg-slate-900 rounded-lg text-xs text-slate-400 overflow-x-auto max-h-48">
            <code>{block.codeTemplate.trim()}</code>
          </pre>
        </details>
      </div>
    </div>
  );
}
