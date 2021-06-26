import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import {parseJwt, usuarioAutenticado} from './services/auth'

import './index.css';

import App from './pages/home/App';
import TipoEventos from './pages/tiposEventos/tiposEventos';
import Login from './pages/login/login';
import NotFound from './pages/notFound/notFound';

import reportWebVitals from './reportWebVitals';


const PermissaoAdm = ({component : Component}) => (
  <Route 
    // renderiza condicionalmente
    render = {props =>
      // verifica se o usuário está logado e se o usuário logado tem o role "1" (administrador)
      usuarioAutenticado() && parseJwt().role === "1" ?
      // se for true...
      // operador spread (...) || renderiza de acordo com a rota solicitada e trás tudo que sobra do props
      // o "resto" que tem dentro do props e é pego com o operador spread(...) é tudo que você excluiu
      <Component {...props} /> :
      // se for false
      // redireciona para o login novamente
      <Redirect to="login" />
    }
  />
)

const PermissaoComum = ({component : Component}) => (
  <Route 
    render = {props =>
      usuarioAutenticado() && parseJwt().role === "2" ?
      <Component {...props} /> :
      <Redirect to="login" />
    }
  />
)

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} /> {/* Home */}
        <PermissaoAdm path="/tipoeventos" component={TipoEventos} /> {/* Tipos de Eventos */}
        <Route path="/login" component={Login} /> {/* Login */}
        <Route exact path="/notfound" component={NotFound} /> {/* Not Found */}
        <Redirect to="/notfound" /> {/* Redireciona para NotFound caso não encontre nenhuma rota */}
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
