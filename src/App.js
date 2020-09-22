import React from 'react';
import logo from './logo.svg';
import './App.css';
import Admin from './components/admin/wrapper/admin';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import HomePage from './components/main/container/home';

function App() {
  return (
    <div className="App">
      <HomePage/>    
    </div>
  );
}

export default App;
