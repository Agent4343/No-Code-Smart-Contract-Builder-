import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  PlacedBlock,
  ContractNode,
  ContractEdge,
  GeneratedContract,
  Deployment,
  Network,
  SecurityReport,
} from '../types';

interface ContractState {
  // Current project
  projectName: string;
  projectDescription: string;

  // Builder state
  nodes: ContractNode[];
  edges: ContractEdge[];
  selectedNodeId: string | null;

  // Generated contract
  generatedContract: GeneratedContract | null;
  isGenerating: boolean;
  generationError: string | null;

  // Deployment state
  selectedNetwork: Network | null;
  deployments: Deployment[];
  isDeploying: boolean;
  deploymentError: string | null;

  // Security
  securityReport: SecurityReport | null;
  isScanning: boolean;

  // Actions
  setProjectName: (name: string) => void;
  setProjectDescription: (description: string) => void;

  addNode: (node: ContractNode) => void;
  updateNode: (id: string, data: Partial<PlacedBlock>) => void;
  removeNode: (id: string) => void;
  setNodes: (nodes: ContractNode[]) => void;

  addEdge: (edge: ContractEdge) => void;
  removeEdge: (id: string) => void;
  setEdges: (edges: ContractEdge[]) => void;

  setSelectedNode: (id: string | null) => void;

  setGeneratedContract: (contract: GeneratedContract | null) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setGenerationError: (error: string | null) => void;

  setSelectedNetwork: (network: Network | null) => void;
  addDeployment: (deployment: Deployment) => void;
  updateDeployment: (id: string, updates: Partial<Deployment>) => void;
  setIsDeploying: (isDeploying: boolean) => void;
  setDeploymentError: (error: string | null) => void;

  setSecurityReport: (report: SecurityReport | null) => void;
  setIsScanning: (isScanning: boolean) => void;

  resetBuilder: () => void;
  loadProject: (project: {
    name: string;
    description: string;
    nodes: ContractNode[];
    edges: ContractEdge[];
  }) => void;
}

const initialState = {
  projectName: 'My Smart Contract',
  projectDescription: '',
  nodes: [],
  edges: [],
  selectedNodeId: null,
  generatedContract: null,
  isGenerating: false,
  generationError: null,
  selectedNetwork: null,
  deployments: [],
  isDeploying: false,
  deploymentError: null,
  securityReport: null,
  isScanning: false,
};

export const useContractStore = create<ContractState>()(
  persist(
    (set) => ({
      ...initialState,

      setProjectName: (name) => set({ projectName: name }),
      setProjectDescription: (description) => set({ projectDescription: description }),

      addNode: (node) =>
        set((state) => ({
          nodes: [...state.nodes, node],
        })),

      updateNode: (id, data) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === id
              ? { ...node, data: { ...node.data, ...data } }
              : node
          ),
        })),

      removeNode: (id) =>
        set((state) => ({
          nodes: state.nodes.filter((node) => node.id !== id),
          edges: state.edges.filter(
            (edge) => edge.source !== id && edge.target !== id
          ),
          selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
        })),

      setNodes: (nodes) => set({ nodes }),

      addEdge: (edge) =>
        set((state) => ({
          edges: [...state.edges, edge],
        })),

      removeEdge: (id) =>
        set((state) => ({
          edges: state.edges.filter((edge) => edge.id !== id),
        })),

      setEdges: (edges) => set({ edges }),

      setSelectedNode: (id) => set({ selectedNodeId: id }),

      setGeneratedContract: (contract) => set({ generatedContract: contract }),
      setIsGenerating: (isGenerating) => set({ isGenerating }),
      setGenerationError: (error) => set({ generationError: error }),

      setSelectedNetwork: (network) => set({ selectedNetwork: network }),
      addDeployment: (deployment) =>
        set((state) => ({
          deployments: [...state.deployments, deployment],
        })),
      updateDeployment: (id, updates) =>
        set((state) => ({
          deployments: state.deployments.map((d) =>
            d.id === id ? { ...d, ...updates } : d
          ),
        })),
      setIsDeploying: (isDeploying) => set({ isDeploying }),
      setDeploymentError: (error) => set({ deploymentError: error }),

      setSecurityReport: (report) => set({ securityReport: report }),
      setIsScanning: (isScanning) => set({ isScanning }),

      resetBuilder: () => set(initialState),

      loadProject: (project) =>
        set({
          projectName: project.name,
          projectDescription: project.description,
          nodes: project.nodes,
          edges: project.edges,
          generatedContract: null,
          generationError: null,
        }),
    }),
    {
      name: 'contract-builder-storage',
      partialize: (state) => ({
        projectName: state.projectName,
        projectDescription: state.projectDescription,
        nodes: state.nodes,
        edges: state.edges,
        deployments: state.deployments,
      }),
    }
  )
);
