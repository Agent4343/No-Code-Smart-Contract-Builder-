import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  NodeTypes,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  Play,
  Save,
  Download,
  Trash2,
  Eye,
  Shield,
  Fuel,
  Code,
  Blocks,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import BlockPalette from '../components/builder/BlockPalette';
import PropertiesPanel from '../components/builder/PropertiesPanel';
import CodePreview from '../components/builder/CodePreview';
import ContractBlockNode from '../components/builder/ContractBlockNode';
import { useContractStore } from '../store/contractStore';
import { useTemplateStore } from '../store/templateStore';
import { generateContract } from '../lib/codeGenerator';
import toast from 'react-hot-toast';

const nodeTypes: NodeTypes = {
  contractBlock: ContractBlockNode,
};

export default function ContractBuilder() {
  const { templateId } = useParams();
  const { templates } = useTemplateStore();
  const {
    projectName,
    setProjectName,
    selectedNodeId,
    setSelectedNode,
    generatedContract,
    setGeneratedContract,
    isGenerating,
    setIsGenerating,
  } = useContractStore();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showCodePreview, setShowCodePreview] = useState(false);
  const [showSecurityPanel, setShowSecurityPanel] = useState(false);

  // Load template if specified
  useState(() => {
    if (templateId) {
      const template = templates.find((t) => t.id === templateId);
      if (template) {
        setProjectName(template.name);
      }
    }
  });

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: { id: string }) => {
      setSelectedNode(node.id);
    },
    [setSelectedNode]
  );

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const contract = await generateContract(nodes as Node[], projectName);
      setGeneratedContract(contract);
      setShowCodePreview(true);
      toast.success('Contract generated successfully!');
    } catch (error) {
      toast.error('Failed to generate contract');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    const projectData = {
      name: projectName,
      nodes,
      edges,
      generatedContract,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem('contract-project', JSON.stringify(projectData));
    toast.success('Project saved!');
  };

  const handleExport = () => {
    if (!generatedContract) {
      toast.error('Generate the contract first');
      return;
    }

    const blob = new Blob([generatedContract.sourceCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, '')}.sol`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Contract exported!');
  };

  const handleClear = () => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setGeneratedContract(null);
    toast.success('Canvas cleared');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      {/* Block Palette */}
      <BlockPalette
        onAddBlock={(block) => {
          const newNode = {
            id: `${block.type}-${Date.now()}`,
            type: 'contractBlock',
            position: { x: 250 + Math.random() * 100, y: 100 + nodes.length * 120 },
            data: {
              ...block,
              instanceId: `${block.type}-${Date.now()}`,
              parameterValues: {},
              connections: { inputs: [], outputs: [] },
            },
          };
          setNodes((nds) => [...nds, newNode]);
          toast.success(`Added ${block.name}`);
        }}
      />

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50 bg-slate-800/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Blocks className="w-4 h-4 text-primary-400" />
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="bg-transparent border-b border-transparent focus:border-primary-500 outline-none text-white font-semibold text-base px-1 py-0.5 transition-colors"
              />
            </div>
            <span className="badge-primary text-[11px]">
              {nodes.length} {nodes.length === 1 ? 'block' : 'blocks'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowSecurityPanel(!showSecurityPanel)}
              className="btn-ghost py-1.5 px-2.5 text-sm"
              title="Security Scan"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowCodePreview(!showCodePreview)}
              className="btn-ghost py-1.5 px-2.5 text-sm"
              title="Preview Code"
            >
              <Code className="w-4 h-4" />
            </button>
            <div className="w-px h-5 bg-slate-700 mx-1" />
            <button onClick={handleSave} className="btn-secondary py-1.5 px-3 text-sm">
              <Save className="w-3.5 h-3.5" />
              Save
            </button>
            <button onClick={handleExport} className="btn-secondary py-1.5 px-3 text-sm">
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
            <button onClick={handleClear} className="btn-ghost py-1.5 px-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-5 bg-slate-700 mx-1" />
            <button
              onClick={handleGenerate}
              disabled={nodes.length === 0 || isGenerating}
              className="btn-primary py-1.5 px-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  Generate
                </>
              )}
            </button>
          </div>
        </div>

        {/* Flow Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-slate-900"
          >
            <Background color="#1e293b" gap={20} size={1} />
            <Controls className="!bg-slate-800 !border-slate-700 !shadow-xl !rounded-lg" />
            <MiniMap
              className="!bg-slate-800 !border-slate-700 !rounded-lg"
              nodeColor="#0ea5e9"
              maskColor="rgba(15, 23, 42, 0.8)"
            />
          </ReactFlow>

          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center max-w-sm">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-primary-500/20">
                  <Sparkles className="w-9 h-9 text-primary-400 float" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Start Building Your Contract
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Click blocks from the palette on the left to add them to the canvas. Connect blocks to define your contract's logic.
                </p>
                <div className="flex items-center justify-center gap-2 mt-5 text-primary-400 text-sm font-medium">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Select blocks from the palette
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gas Estimate Bar */}
        {nodes.length > 0 && (
          <div className="px-4 py-2.5 border-t border-slate-700/50 flex items-center justify-between bg-slate-800/60">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Fuel className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-slate-500">Est. Gas:</span>
                <span className="text-xs font-medium text-white font-mono">
                  {(nodes.length * 500000).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Cost:</span>
                <span className="text-xs font-medium text-white font-mono">
                  ~${((nodes.length * 500000 * 30) / 1e9 * 2500).toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-600">@ 30 gwei</span>
              </div>
            </div>
            <button
              onClick={() => setShowCodePreview(true)}
              className="flex items-center gap-1.5 text-xs text-primary-400 hover:text-primary-300 font-medium transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              Preview Solidity
            </button>
          </div>
        )}
      </div>

      {/* Properties Panel */}
      <PropertiesPanel
        selectedNodeId={selectedNodeId}
        nodes={nodes as Node[]}
        onUpdateNode={(id, data) => {
          setNodes((nds) =>
            nds.map((node) =>
              node.id === id ? { ...node, data: { ...node.data, ...data } } : node
            )
          );
        }}
        onDeleteNode={(id) => {
          setNodes((nds) => nds.filter((node) => node.id !== id));
          setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
          setSelectedNode(null);
        }}
      />

      {/* Code Preview Modal */}
      {showCodePreview && generatedContract && (
        <CodePreview
          contract={generatedContract}
          onClose={() => setShowCodePreview(false)}
        />
      )}
    </div>
  );
}
