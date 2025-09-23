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

    // Create Database
    const request = indexedDB.open("journalEntries", 1);

    // Handle error
    request.onerror = () => {
        console.log('Error occured while trying to create/open "journalEntries" IndexedDB database');
    }

    // Setup basic database structure
    request.onupgradeneeded = () => {
        const db = request.result;
        db.createObjectStore("entries", { keyPath: "id" });
    }

  return (
    <>
      <ToastContainer newestOnTop={true} />
      {localStorage.getItem("visited") !== "1" && <Welcome />}
      {localStorage.getItem("visited") !== "1" ? null : showingCreationPage ? <Creation showCreationPage={showCreationPage} currentEntryKey={currentEntryKey.current} editingMode={editingMode} toggleEditingMode={toggleEditingMode} /> : <Dashboard showingCreationPage={showingCreationPage} showCreationPage={showCreationPage} currentEntryKey={currentEntryKey} toggleEditingMode={toggleEditingMode} />}
    </>
  )
}

export default App