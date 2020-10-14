import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Home } from '../views/home/Home';
import { Menu } from '../views/menu/Menu';
import './App.css';

export const App = () => {
  return (
    <div className="app">
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
        </ul>
      </div>
      <Route
        path="/"
        exact
        component={Home}
      />
      <Route
        path="/menu"
        exact
        component={Menu}
      />
    </div>
  );
};

export default App;
