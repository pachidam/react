import React from 'react';
// import logo from './logo.svg';
import './App.css';
import DataTable from './component/DataTable';
import NavigationBar from './component/navbar';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Model from './component/Model';

function App() {
  return (
    <div className="container">
       <Router>
      <NavigationBar/>
     
        <Switch>
          <Route exact path='/' component={DataTable}/>
          <Route path="/model/:id" component={Model}/>
          <Route path="/model/new" component={Model}/>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
