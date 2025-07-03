import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionLineType,
  Panel,
  useReactFlow,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { HelpCircle } from 'lucide-react';
import type {  Node } from 'reactflow';
  import type {  NodeData } from './types';
  
import CustomNode from './components/CustomNode';
import Toolbar from './components/Toolbar';
import StatusPanel from './components/StatusPanel';
import JSONPreview from './components/JSONPreview';
import { createNode, NodeTypes } from './types';
import { validateDAG, getDAGStructure } from './utills/dagValidation';
import { getLayoutedElements } from './utills/autoLayout';
import { type ValidationResult } from './types';
const nodeTypes = {
  custom: CustomNode,
};

const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep',
};


const initialNodes = [
  {
    id: 'sample-1',
    type: 'custom',
    position: { x: 100, y: 100 },
    data: {
      label: 'Data Source',
      nodeType: NodeTypes.INPUT,
      onDelete: null
    },
    deletable: true
  },
  {
    id: 'sample-2',
    type: 'custom',
    position: { x: 350, y: 100 },
    data: {
      label: 'Clean Data',
      nodeType: NodeTypes.PROCESS,
      onDelete: null
    },
    deletable: true
  },
  {
    id: 'sample-3',
    type: 'custom',
    position: { x: 600, y: 50 },
    data: {
      label: 'Transform',
      nodeType: NodeTypes.TRANSFORM,
      onDelete: null
    },
    deletable: true
  },
  {
    id: 'sample-4',
    type: 'custom',
    position: { x: 600, y: 200 },
    data: {
      label: 'Aggregate',
      nodeType: NodeTypes.PROCESS,
      onDelete: null
    },
    deletable: true
  },
  {
    id: 'sample-5',
    type: 'custom',
    position: { x: 850, y: 125 },
    data: {
      label: 'Export Results',
      nodeType: NodeTypes.OUTPUT,
      onDelete: null
    },
    deletable: true
  }
];


const initialEdges = [
  {
    id: 'edge-1',
    source: 'sample-1',
    target: 'sample-2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#6366f1', strokeWidth: 2 }
  },
  {
    id: 'edge-2',
    source: 'sample-2',
    target: 'sample-3',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#6366f1', strokeWidth: 2 }
  },
  {
    id: 'edge-3',
    source: 'sample-2',
    target: 'sample-4',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#6366f1', strokeWidth: 2 }
  },
  {
    id: 'edge-4',
    source: 'sample-3',
    target: 'sample-5',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#6366f1', strokeWidth: 2 }
  },
  {
    id: 'edge-5',
    source: 'sample-4',
    target: 'sample-5',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#6366f1', strokeWidth: 2 }
  }
];

function App() {
  
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeCounter, setNodeCounter] = useState(6);
  
  const [validation, setValidation] = useState<ValidationResult>({ isValid: false, errors: [], status: 'empty' });
  const { fitView } = useReactFlow();

  
  useEffect(() => {
    setNodes((nds) => nds.map(node => ({
      ...node,
      data: {
        ...node.data,
        onDelete: () => deleteNode(node.id)
      }
    })));
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      fitView({ 
        padding: 0.1, 
        includeHiddenNodes: false,
        minZoom: 0.5,
        maxZoom: 1.2
      });
    }, 200);
    
    return () => clearTimeout(timer);
  }, [fitView]);

  
  useEffect(() => {
    const validationResult = validateDAG(nodes, edges);
    setValidation(validationResult);
  }, [nodes, edges]);

  const onConnect = useCallback(
    (params) => {
    
      if (params.source === params.target) {
        return;
      }
      
      setEdges((eds) => addEdge({
        ...params,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#6366f1', strokeWidth: 2 }
      }, eds));
    },
    [setEdges]
  );

  const addNode = (type) => {
    const label = prompt(`Enter ${type} node name:`) || `${type}-${nodeCounter}`;
    
  
    const canvasWidth = 1000;
    const canvasHeight = 500;
    const nodeWidth = 180;
    const nodeHeight = 80;
    
    const position = {
      x: Math.random() * (canvasWidth - nodeWidth - 100) + 50,
      y: Math.random() * (canvasHeight - nodeHeight - 100) + 50
    };
    
    const newNode = createNode(
      `node-${nodeCounter}`,
      label,
      type,
      position
    );
    
 
    newNode.data.onDelete = () => deleteNode(newNode.id);
    
    setNodes((nds) => nds.concat(newNode));
    setNodeCounter((prev) => prev + 1);
  };

  const deleteNode = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  };

  const handleAutoLayout = () => {
    if (nodes.length === 0) return;
    
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges,
      'TB'
    );
    
    setNodes(layoutedNodes.map(node => ({
      ...node,
      sourcePosition: node.sourcePosition as import('reactflow').Position,
      targetPosition: node.targetPosition as import('reactflow').Position,
    })));
    setEdges([...layoutedEdges]);
    
    
    setTimeout(() => {
      fitView({ 
        padding: 0.15, 
        includeHiddenNodes: false,
        minZoom: 0.5,
        maxZoom: 1.2,
        duration: 800
      });
    }, 100);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all nodes and edges?')) {
      setNodes([]);
      setEdges([]);
      setNodeCounter(1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && !e.target.matches('input, textarea')) {
        e.preventDefault();
        const selectedNodes = nodes.filter(node => node.selected);
        const selectedEdges = edges.filter(edge => edge.selected);
        
        selectedNodes.forEach(node => deleteNode(node.id));
        selectedEdges.forEach(edge => {
          setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nodes, edges, setEdges]);

  const dagStructure = getDAGStructure(nodes, edges);

  return (
        
        
       
        <div className="flex flex-col bg-black h-screen">

          
       
           
          <div className = "flex">


          
            <div className="h-[500px] w-[800px] bg-black rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                connectionLineType={ConnectionLineType.SmoothStep}
                attributionPosition="bottom-left"
                minZoom={0.3}
                maxZoom={1.5}
                defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
                fitView={false}
                nodesDraggable={true}
                nodesConnectable={true}
                elementsSelectable={true}
                selectNodesOnDrag={false}
                panOnDrag={true}
                zoomOnScroll={true}
                zoomOnPinch={true}
                panOnScroll={false}
                  preventScrolling={true}
                >
                  <Background 
                    color="#e2e8f0" 
                    gap={20} 
                    size={1}
                    variant={BackgroundVariant.Dots}
                  />
                  <Controls 
                    position="bottom-right"
                    showInteractive={false}
                  />
                <MiniMap 
                  nodeColor={(node) => {
                    switch (node.data.nodeType) {
                      case NodeTypes.INPUT: return '#10b981';
                      case NodeTypes.PROCESS: return '#3b82f6';
                      case NodeTypes.TRANSFORM: return '#f59e0b';
                      case NodeTypes.OUTPUT: return '#8b5cf6';
                      default: return '#6b7280';
                    }
                  }}
                  className="!bg-white !border-gray-200"
                  position="bottom-left"
                  pannable={true}
                  zoomable={true}
                />
              
               
                {nodes.length === 0 && (
                  <Panel position="top-left">
                    <div className="text-center text-gray-500 bg-white bg-opacity-95 p-8 rounded-lg border border-gray-200 shadow-lg max-w-md">
                      <h3 className="text-lg font-semibold mb-3">Welcome to Pipeline Editor</h3>
                      <p className="text-sm mb-2">Click the node type buttons above to add nodes</p>
                      <p className="text-sm">Drag from green output to blue input to connect nodes</p>
                    </div>
                  </Panel>
                )}
              </ReactFlow>
            </div>
               <Toolbar
              onAddNode={addNode}
              onAutoLayout={handleAutoLayout}
              onClearAll={handleClearAll}
              disabled={false}
            />
          </div>
        
            
          

       
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 text-center shadow-md">
                <div className="text-2xl font-bold text-blue-600">{nodes.length}</div>
                <div className="text-sm text-gray-600">Nodes</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md">
                <div className="text-2xl font-bold text-green-600">{edges.length}</div>
                <div className="text-sm text-gray-600">Edges</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md">
                <div className="text-2xl font-bold text-purple-600">
                  {nodes.filter(n => n.selected).length + edges.filter(e => e.selected).length}
                </div>
                <div className="text-sm text-gray-600">Selected</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md">
                <div className={`text-2xl font-bold ${validation.isValid ? 'text-green-600' : 'text-red-600'}`}>
                  {validation.isValid ? 'Yes' : 'No'}
                </div>
                <div className="text-sm text-gray-600">Valid</div>
              </div>
            </div>
        </div>
    
    
  );
}


import { ReactFlowProvider } from 'reactflow';

function AppWithProvider() {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
}

export default AppWithProvider;