import './App.css'
import { useRef, useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Creation from './components/Dashboard/Creation/Creation'

export const name = "Felix";
export const funfact = "Fun fact: Due to their low-calorie diet, red pandas do little more than eat and sleep.";

function App() {
  const [showingCreationPage, showCreationPage] = useState(false);
  const [editingMode, toggleEditingMode] = useState(false);
  let currentEntryKey = useRef(null);

  return (
    <>
      {showingCreationPage ? <Creation showCreationPage={showCreationPage} currentEntryKey={currentEntryKey.current} editingMode={editingMode} toggleEditingMode={toggleEditingMode} /> : <Dashboard showingCreationPage={showingCreationPage} showCreationPage={showCreationPage} currentEntryKey={currentEntryKey} toggleEditingMode={toggleEditingMode} />}
    </>
  )
}

export default App