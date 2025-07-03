import type { Node, Edge } from 'reactflow';

interface Validation {
    isValid: boolean;
   
}

interface StatsViewProps  {
    nodes: Node<unknown>[];
    edges: Edge[];
    validation: Validation;
}

export const StatsView = ({nodes, edges, validation}: StatsViewProps) => {
    return (
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
    )
}