


import { ReactFlowProvider } from 'reactflow';
import { Editor } from './components/Editor';
function AppWithProvider() {
  return (
    <ReactFlowProvider>
      <Editor/>
    </ReactFlowProvider>
  );
}

export default AppWithProvider;