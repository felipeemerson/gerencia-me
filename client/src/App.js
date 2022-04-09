import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Header from './components/header/header.component';

import TypesPage from './pages/types/types.component';
import TasksPage from './pages/tasks/tasks.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

function App() {
  const login = !true;

  return (
    <Router>
      {
        login ? <Header /> : null
      }

      <Routes>
        <Route path='/types' element={login ? <TypesPage /> : <Navigate to ="/login" />} />
        <Route path='/' element={login ? <TasksPage /> : <Navigate to ="/login" />} />
        <Route path='/login' element={login ? <Navigate to ="/" /> : <SignInAndSignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
