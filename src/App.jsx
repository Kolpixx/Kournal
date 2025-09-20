import './App.css'
import { useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Dashboard from './components/Dashboard/Dashboard';
import Creation from './components/Dashboard/Creation/Creation'
import Welcome from './components/Welcome/Welcome';

function App() {
  const [showingCreationPage, showCreationPage] = useState(false);
  const [editingMode, toggleEditingMode] = useState(false);
  let currentEntryKey = useRef(null);

  return (
    <>
      <ToastContainer newestOnTop={true} />
      {localStorage.getItem("visited") !== "1" && <Welcome />}
      {localStorage.getItem("visited") !== "1" ? null : showingCreationPage ? <Creation showCreationPage={showCreationPage} currentEntryKey={currentEntryKey.current} editingMode={editingMode} toggleEditingMode={toggleEditingMode} /> : <Dashboard showingCreationPage={showingCreationPage} showCreationPage={showCreationPage} currentEntryKey={currentEntryKey} toggleEditingMode={toggleEditingMode} />}
    </>
  )
}

export default App