import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useAuth } from './contexts/auth.context';

import Header from './components/header/header.component';
import TypesPage from './pages/types/types.component';
import TasksPage from './pages/tasks/tasks.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

function App() {
  const auth = useAuth();
  const { isLoggedIn } = auth;

  return (
    <Router>
      {
        isLoggedIn ? <Header /> : null
      }

      <Routes>
        <Route exact path='/' element={isLoggedIn ? <TasksPage /> : <Navigate to ="/login" />} />
        <Route exact path='/types' element={isLoggedIn ? <TypesPage /> : <Navigate to ="/login" />} />
        <Route exact path='/login' element={isLoggedIn ? <Navigate to ="/" /> : <SignInAndSignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
