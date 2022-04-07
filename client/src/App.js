import React from 'react';

import Header from './components/header/header.component';

function App() {
  const login = true;

  return (
    <div className="App">
      {
        login ? <Header /> : null
      }
    </div>
  );
}

export default App;
