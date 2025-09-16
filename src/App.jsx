import './App.css'
import { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Creation from './components/Dashboard/Creation/Creation'

export const name = "Felix";
export const funfact = "Fun fact: Due to their low-calorie diet, red pandas do little more than eat and sleep.";

function App() {
  const [showingCreationPage, showCreationPage] = useState(false);

  return (
    <>
      {showingCreationPage ? <Creation setShowing={showCreationPage} /> : <Dashboard showing={showingCreationPage} setShowing={showCreationPage} />}
    </>
  )
}

export default App