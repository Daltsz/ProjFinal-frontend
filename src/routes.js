import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Home from "./pages/Home/index";
import Cadastro from "./pages/Cadastro/index";
import Login from "./pages/Login/index";

const Routes = () => {


  return (
    <div>
      
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/cadastro" component={Cadastro}></Route>
            <Route exact path="/login" component={Login}></Route>
          </Switch>
        </HashRouter>

    </div>
  );
}

export default Routes;
