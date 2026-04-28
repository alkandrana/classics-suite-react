import { useState } from 'react';
import {Outlet} from 'react-router-dom';

function App() {
  return (
      <div id="main">
        <h1 className="text-xl font-bold">Classics Suite</h1>
        <Outlet />
      </div>
  )
}

export default App
