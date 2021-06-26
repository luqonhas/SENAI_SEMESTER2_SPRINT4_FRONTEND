import React, { Component } from "react";
import axios from "axios";
import "../../assets/css/login.css";
import logo from '../../assets/img/logo.png';
import {parseJwt, usuarioAutenticado} from '../../services/auth'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      senha: "",
      erroMensagem: "",
      isLoading: false,
    };
  }

  // função que faz a chamada para a API
  efetuaLogin = (event) => {
    // ignora o comportamento padrão do navegador (recarregar a página, por exemplo)
    event.preventDefault();

    // remove a frase de erro do state "erroMensagem" e define que a requisição está em andamento
    this.setState({ erroMensagem: "", isLoading: true });

    // define a URL e o corpo da requisição
    axios
      .post("http://localhost:5000/api/login", {
        email: this.state.email,
        senha: this.state.senha,
      })

      .then((resposta) => {
        if (resposta.status === 200) {
          // salva o valor do token do localStorage
          localStorage.setItem("usuario-login", resposta.data.token);

          // exibe o valor do token no console do navegador
          console.log("Meu token é: " + resposta.data.token);

          // e define que a requisição terminou
          this.setState({ isLoading: false });

          // define a variável "base64" que vai receber o payload do token
          let base64 = localStorage.getItem("usuario-login").split(".")[1];

          /*
          // exibe no console o valor que tem dentro da variável "base64"
          console.log(base64);
          // exibe no console o valor convertido/decodificado de "base64" para string
          console.log(window.atob(base64));
          // exibe o valor no console convertido da string para JSON
          console.log(JSON.parse(window.atob(base64)));
          // exibe no console apenas o valor do tipo usuário convertido da string para JSON
          console.log(JSON.parse(window.atob(base64)).role);
          */
          
          // exibe no console os dados do token convertido para o objeto
          console.log(parseJwt());
          // exibe no console apenas o tipo de usuário logado
          console.log(parseJwt().role);

          // verifica se o tipo usuário logado é administrador
          // se for, redireciona para a página tipo eventos
          if (parseJwt().role === "1") {
              // manda para a página tipo eventos
              // console.log(this.props)
              // exibe no console do navegador um bool informando se o usuário está logado ou não
              console.log(usuarioAutenticado());
              this.props.history.push('/tipoeventos');
          }
          // se não, redireciona para a página home
          else{
              // manda para a página home
              this.props.history.push('/');
          }

        }
      })

      // caso haja um erro...
      .catch(() => {
        // define o valor do state "erroMensagem" com uma mensagem personalizada e definindo que a requisição terminou
        this.setState({
          erroMensagem: "E-mail ou senha inválidos! Tente novamente.",
          isLoading: false,
        });
      });
  };

  // função genérica que atualiza de acordo com o input
  // pode ser reutilizada em vários inputs diferentes
  atualizaStateCampo = (campo) => {
    this.setState({ [campo.target.name]: campo.target.value });

    // console.log({[campo.target.name] : campo.target.value})
  };

  render() {
    return (
      <div>
        <main>
          <section className="container-login flex">
            <div className="img__login">
              <div className="img__overlay"></div>
            </div>

            <div className="item__login">
                <div className="row">
                    <div className="item">
                        <img
                            src={logo}
                            className="icone__login"
                            alt="logo da Gufi"
                        />
                    </div>

                    <div className="item" id="item__title">
                        <p className="text__login" id="item__description">
                            Bem-vindo! Faça login para acessar sua conta.
                        </p>
                    </div>

                    {/* faz a chamada para a função de login quando o botão é pressionado */}
                    <form onSubmit={this.efetuaLogin}>
                        <div className="item">
                            <input
                                className="input__login"
                                id="login__email"
                                // email
                                type="text"
                                name="email"
                                // define que o input email recebe o valor do state "email"
                                value={this.state.email}
                                // faz a chamada para a função que atualiza o state, conforme o usuário altera o valor do input
                                onChange={this.atualizaStateCampo}
                                placeholder="username"
                            />
                        </div>

                        <div className="item">
                            <input
                                className="input__login"
                                id="login__password"
                                // email
                                type="password"
                                name="senha"
                                // define que o input email recebe o valor do state "email"
                                value={this.state.senha}
                                // faz a chamada para a função que atualiza o state, conforme o usuário altera o valor do input
                                onChange={this.atualizaStateCampo}
                                placeholder="password"
                            />
                        </div>

                        <div className="item">
                            {/* exibe a mensagem de erro ao entrar com as credenciais erradas */}
                            <p style={{ color: "red" }}>{this.state.erroMensagem}</p>

                            {/* verifica se a requisição está em andamento, se estiver, o botão será desabilitado */}
                            {
                                // caso "isLoading" seja true, renderiza o botão desabilitado com o texto "Loading..."
                                this.state.isLoading === true && (<button className="btn btn__login" id="btn__login" type="submit" disabled>Loading...</button>)
                            }

                            {
                                // caso "isLoading" seja false, renderiza o botão habilitado com o texto "Login"
                                this.state.isLoading === false && (<button type="submit" className="btn btn__login" id="btn__login" disabled={this.state.email === "" || this.state.senha === "" ? "none" : ""}>Login</button>)
                            }

                            {/* <button type="submit">
                                Login
                            </button> */}
                        </div>
                    </form>
                    
                </div>
            </div>

          </section>
        </main>
      </div>
    );
  }
}

export default Login;
