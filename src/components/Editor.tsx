import { useState, useEffect, useCallback } from 'react';
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
import type {  NodeData } from '../types';  
import CustomNode from '../components/CustomNode';
import Toolbar from './Toolbar';
import  { createNode, NodeTypes, type ConnectParams } from '../types';
import { validateDAG} from '../utills/dagValidation';
import { getLayoutedElements } from '../utills/autoLayout';
import { type ValidationResult } from '../types';
import { initialNodes , initialEdges} from '../utills/nodesData';

const nodeTypes = {
  custom: CustomNode,
};

const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep',
};





export const  Editor = () => {
  
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeCounter, setNodeCounter] = useState(6);
  
  const [validation, setValidation] = useState<ValidationResult>({ isValid: false, errors: [], status: 'empty' });
  const { fitView } = useReactFlow();

  
  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  }, [setNodes, setEdges]);

  useEffect(() => {
    setNodes((nds) => nds.map(node => ({
      ...node,
      data: {
        ...node.data,
        onDelete: () => deleteNode(node.id)
      }
    })));
  }, [setNodes, deleteNode]);


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
    (params: ConnectParams) => {
      if (params.source === params.target) {
        return;
      }

      setEdges((eds) => {
        const safeParams = {
          ...params,
          sourceHandle: params.sourceHandle ?? null,
          targetHandle: params.targetHandle ?? null,
        };
        const newEdges = addEdge(safeParams, eds);

        if (newEdges.length > eds.length) {
          const lastEdge = newEdges[newEdges.length - 1];
          newEdges[newEdges.length - 1] = {
            ...lastEdge,
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#6366f1', strokeWidth: 2 },
          };
        }
        return newEdges;
      });
    },
    [setEdges]
  );

  const addNode = (type: string) => {
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
    if (confirm('are you want clear ?')) {
      setNodes([]);
      setEdges([]);
      setNodeCounter(1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        const selectedNodes = nodes.filter(node => node.selected);
        const selectedEdges = edges.filter(edge => edge.selected);
        
        selectedNodes.forEach(node => deleteNode(node.id));
        selectedEdges.forEach(edge => {
          setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown as EventListener);
    return () => document.removeEventListener('keydown', handleKeyDown as EventListener);
  }, [nodes, edges, setEdges, deleteNode]);

 

  return (
  <div className="flex items-center h-screen w-screen bg-black p-2 gap-2 overflow-hidden">
    
    
    <div className="w-[70%] h-full bg-black border shadow-lg rounded-lg border-slate-200 overflow-hidden">
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
        <Controls position="bottom-right" showInteractive={false} />
        <MiniMap
          nodeColor={(node) => {
            switch (node.data.nodeType) {
              case NodeTypes.INPUT:
                return '#10b981';
              case NodeTypes.PROCESS:
                return '#3b82f6';
              case NodeTypes.TRANSFORM:
                return '#f59e0b';
              case NodeTypes.OUTPUT:
                return '#8b5cf6';
              default:
                return '#6b7280';
            }
          }}
          className="!bg-white !border-gray-200"
          position="bottom-left"
          pannable
          zoomable
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

   
    <div className="w-[30%] h-full flex flex-col items-center justify-between  gap-4">
      
      
      <div className="w-full border-1 p-5 border-slate-200 rounded-lg">
        <Toolbar
          onAddNode={addNode}
          onAutoLayout={handleAutoLayout}
          onClearAll={handleClearAll}
          disabled={false}
        />
      </div>
     <div className = "border-1 p-5 border-slate-200 rounded-lg">
      <div className="w-full flex flex-wrap gap-4 justify-evenly">
        <div className="bg-white rounded-lg text-center shadow-md px-4 py-2 w-24">
          <p className="text-xl font-bold text-blue-600">{nodes.length}</p>
          <p className="text-sm text-gray-600">Nodes</p>
        </div>

        <div className="bg-white rounded-lg text-center shadow-md px-4 py-2 w-24">
          <p className="text-xl font-bold text-green-600">{edges.length}</p>
          <p className="text-sm text-gray-600">Edges</p>
        </div>

        <div className="bg-white rounded-lg text-center shadow-md px-4 py-2 w-24">
          <p className="text-xl font-bold text-purple-600">
            {nodes.filter(n => n.selected).length + edges.filter(e => e.selected).length}
          </p>
          <p className="text-sm text-gray-600">Selected</p>
        </div>

        <div className="bg-white rounded-lg text-center shadow-md px-4 py-2 w-24">
          <p className={`text-xl font-bold ${validation.isValid ? 'text-green-600' : 'text-red-600'}`}>
            {validation.isValid ? 'Yes' : 'No'}
          </p>
          <p className="text-sm text-gray-600">Valid</p>
        </div>
      </div>
      </div>
    </div>
  </div>
);

}
