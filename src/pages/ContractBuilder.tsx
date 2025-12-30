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
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  Play,
  Save,
  Download,
  Upload,
  Trash2,
  Eye,
  Shield,
  Fuel,
  Code,
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
        // Template blocks would be loaded here
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
      const contract = await generateContract(nodes, projectName);
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
      <div className="flex-1 flex flex-col bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="bg-transparent border-b border-slate-600 focus:border-primary-500 outline-none text-white font-semibold text-lg px-2 py-1"
            />
            <span className="text-slate-400 text-sm">
              {nodes.length} blocks
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSecurityPanel(!showSecurityPanel)}
              className="btn-secondary"
              title="Security Scan"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowCodePreview(!showCodePreview)}
              className="btn-secondary"
              title="Preview Code"
            >
              <Code className="w-4 h-4" />
            </button>
            <button onClick={handleSave} className="btn-secondary">
              <Save className="w-4 h-4" />
              Save
            </button>
            <button onClick={handleExport} className="btn-secondary">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button onClick={handleClear} className="btn-secondary text-red-400 hover:text-red-300">
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleGenerate}
              disabled={nodes.length === 0 || isGenerating}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Generate
                </>
              )}
            </button>
          </div>
        </div>

        {/* Flow Canvas */}
        <div className="flex-1">
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
            <Background color="#334155" gap={20} />
            <Controls className="!bg-slate-800 !border-slate-700 !shadow-xl" />
            <MiniMap
              className="!bg-slate-800 !border-slate-700"
              nodeColor="#0ea5e9"
              maskColor="rgba(15, 23, 42, 0.8)"
            />
          </ReactFlow>

          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-10 h-10 text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-400">
                  Drag blocks here to start building
                </h3>
                <p className="text-slate-500 mt-2">
                  Select blocks from the palette on the left
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Gas Estimate Bar */}
        {nodes.length > 0 && (
          <div className="p-3 border-t border-slate-700 flex items-center justify-between bg-slate-800/80">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Fuel className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-slate-400">Est. Deployment Gas:</span>
                <span className="text-sm font-medium text-white">
                  ~{(nodes.length * 500000).toLocaleString()} units
                </span>
              </div>
              <div className="text-sm text-slate-400">
                ~${((nodes.length * 500000 * 30) / 1e9 * 2500).toFixed(2)} @ 30 gwei
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-400">Preview:</span>
              <button
                onClick={() => setShowCodePreview(true)}
                className="text-sm text-primary-400 hover:text-primary-300"
              >
                View Solidity Code
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Properties Panel */}
      <PropertiesPanel
        selectedNodeId={selectedNodeId}
        nodes={nodes}
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
