import { Toaster } from 'react-hot-toast';
import RouterContiner from './routes/RouterContiner';

function App() {
  return (
    <div className='h-full w-full'>
      <RouterContiner />

      <div id="taost-wrapper">
        <Toaster position="top-center" />
      </div>
    </div>
  );
}

export default App;
