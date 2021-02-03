import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Browse from './components/browse/Browse';
import Favorite from './components/favorite/Favorite';
import Navbar from './components/navbar/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/browse">
          <Browse />
        </Route>
        <Route path="/favorite">
          <Favorite />
        </Route>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <Redirect to="/browse" />
            )
          }}
        />
      </Switch>

    </Router>
  );
}

export default App;
