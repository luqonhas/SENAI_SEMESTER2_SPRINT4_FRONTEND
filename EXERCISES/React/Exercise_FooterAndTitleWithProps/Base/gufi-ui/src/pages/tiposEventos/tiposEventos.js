import { Component } from 'react';
import '../../assets/css/flexbox.css';
import '../../assets/css/reset.css';
import '../../assets/css/style.css';
import logo from '../../assets/img/logo.png';
import Rodape from '../../components/Rodape/rodape';
import Titulo from '../../components/Titulo/titulo';

class TipoEventos extends Component{
    constructor(props){
        super(props);
        this.state = {
            // nomeEstado : valorInicial
            listaTipoEventos : [],
            titulo : '',
            idTipoEventoAlterado : 0,
            tituloseccao : 'Lista Tipos Eventos'
        }
    }

    buscarTipoEventos = () => {
        console.log('agora vamos fazer a chamada para a API')

        // Faz a chamada para a API usando o fetch
        fetch('http://localhost:5000/api/tipoeventos', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

        // Fetch retorna uma Promise que se resolve em uma resposta ( Response )
        // .then(resposta => console.log(resposta))

        // O método .json() retorna um objeto JavaScript
        // .then(resposta => console.log(resposta.json()))

        // Em outras palavras, define o tipo do dado do retorno da requisição (JSON)
        .then(resposta => resposta.json())
        
        // e atualiza o state listaTiposEventos com os dados obtidos
        // .then(data => console.log(data))
        .then(data => this.setState({ listaTipoEventos : data }))

        // Caso ocorra algum erro, mostra no console do navegador
        .catch( erro => console.log(erro) )
    }

    // Atualiza o state titulo com o valor do input
    atualizaEstadoTitulo = async (evento) => {
                        //  NomeState     Valor do input
        await this.setState({ titulo : evento.target.value })
        console.log(this.state.titulo)
    };

    // Função responsável por cadastrar um Tipo de Evento
    cadastrarTipoEvento = (event) => {
        // Ignora o comportamento padrão do navegador
        event.preventDefault();

        // Caso algum Tipo de Evento seja selecionado para edição,
        if (this.state.idTipoEventoAlterado !== 0) {
            // faz a chamada para a API usando fetch e passando o ID do Tipo de Evento que será atualizado na URL da requisição
            fetch('http://localhost:5000/api/tipoeventos/' + this.state.idTipoEventoAlterado,
            {
                // Define o método da requisição ( PUT )
                method : 'PUT',

                // Define o corpo da requisição especificando o tipo ( JSON )
                // em outras palavras, converte o state para uma string JSON
                body : JSON.stringify({ tituloTipoEvento : this.state.titulo }),

                // Define o cabeçalho da requisição
                headers : {
                    "Content-Type" : "application/json"
                }
            })

            .then(resposta => {
                // Caso a requisição retorne um status code 204,
                if (resposta.status === 204 ) {
                    console.log(
                        // exibe no console do navegador a mensagem 'Tipo de Evento x atualizado!,
                        // onde x é o ID do Tipo de Evento atualizado
                        'Tipo de Evento ' + this.state.idTipoEventoAlterado + ' atualizado!',
                        // e informa qual é seu novo título
                        'Seu novo título agora é: ' + this.state.titulo
                    )
                }
            })
            
            // Então, atualiza a lista de Tipos de Eventos
            // sem o usuário precisar exexcutar qualquer ação
            .then(this.buscarTipoEventos)

            // Faz a chamada para a função limparCampos()
            .then(this.limparCampos)
        } 
        else 
        {
            // Caso nenhum Tipo de Evento tenha sido selecionado para edição, realiza o cadastro com a requisição abaixo

            // Faz a chamada para a API usando Fetch
            fetch('http://localhost:5000/api/tipoeventos', {
            // Define o método (verbo) da requisição (POST)
            method : 'POST',

            // Define o corpo da requisição especificando o tipo (JSON)
            // em outras palavras, converte o state para uma string JSON
            body : JSON.stringify( { tituloTipoEvento : this.state.titulo } ),

            // Define o cabeçalho da requisição
            headers : {
                "Content-Type" : "application/json"
            }
        })

        // Exibe no console do navegador a mensagem "Tipo de Evento cadastrado!"
        .then(console.log("Tipo de Evento cadastrado!"))

        // Caso ocorra algum erro, 
        // exibe este erro no console do navegador
        .catch(error => console.log(error))

        // Então, atualiza a lista de Tipos de Eventos
        // sem o usuário precisar exexcutar qualquer ação
        .then(this.buscarTipoEventos)

        // Faz a chamada para a função limparCampos()
        .then(this.limparCampos)
        }
    }

    // Chama a função buscarTiposEventos assim que o componente é renderizado
    componentDidMount(){
        this.buscarTipoEventos();
    }

    // Recebe um tipo de evento da lista
    buscarTipoEventoPorId = (tipoEvento) => {
        this.setState({
            // Atualiza o state idTipoEventoAlterado com o valor do ID do Tipo de Evento recebido
            idTipoEventoAlterado : tipoEvento.idTipoEvento,
            // e o state titulo com o valor do título do Tipo de Evento recebido
            titulo : tipoEvento.tituloTipoEvento
        }, () => {
            console.log(
                // Exibe no console do navegador o valor do ID do Tipo de Evento recebido
                'O Tipo de Evento ' + tipoEvento.idTipoEvento + ' foi selecionado,',
                // o valor do state idTipoEventoAlterado
                'agora o valor do state idTipoEventoAlterado é: ' + this.state.idTipoEventoAlterado,
                // e o valor do state titulo
                'e o valor do state titulo é: ' + this.state.titulo
            )
        } )
    }

    // Função responsável por excluir um Tipo de Evento
    excluirTipoEvento = (tipoEvento) => {
        // Exibe no console do navegador o ID do Tipo de Evento recebido
        console.log('O Tipo de Evento ' + tipoEvento.idTipoEvento + ' foi selecionado!')

        // Faz a chamada para a API usando fetch passando o ID do Tipo de Evento recebido na URL da requisição
        fetch('http://localhost:5000/api/tipoeventos/' + tipoEvento.idTipoEvento, {
            // Define o método da requisição ( DELETE )
            method : 'DELETE'
        })

        .then(resposta => {
            // Caso a requisição retorne um status code 204,
            if (resposta.status === 204 ) {
                console.log(
                    // exibe no console do navegador a mensagem 'Tipo de Evento x deletado!,
                    // onde x é o ID do Tipo de Evento atualizado
                    'Tipo de Evento ' + tipoEvento.idTipoEvento + ' deletado!'
                )
            }
        })

        // Caso ocorra algum erro, exibe este erro no console do navegador
        .catch(erro => console.log(erro))

        // Então, atualiza a lista de Tipos de Eventos
        // sem o usuário precisar exexcutar qualquer ação
        .then(this.buscarTipoEventos)
    }

    // Reseta os states titulo e idTipoEventoAlterado
    limparCampos = () => {
        this.setState({
            titulo : '',
            idTipoEventoAlterado : 0
        })

        // Exibe no console do navegador a mensagem 'Os states foram resetados!'
        console.log('Os states foram resetados!')
    }

    render(){
        return(
            <div>
                <header className="cabecalhoPrincipal">
                    <div className="container">
                    <img src={logo} alt="Logo da Gufi" />

                    <nav className="cabecalhoPrincipal-nav">
                        Administrador
                    </nav>
                    </div>
                </header>
                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        {/* Lista de tipos eventos */}
                        {/* <h2 className="conteudoPrincipal-cadastro-titulo">Lista de tipo eventos</h2> */}
                        <Titulo tituloseccao={this.state.tituloseccao} />
                        <div className="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>{/* IDs */}
                                        <th>Título</th>{/* Títulos */}
                                        <th>Ações</th>{/* Ações */}
                                    </tr>
                                </thead>
                                    
                                <tbody id="tabela-lista-corpo">
                                    {
                                        //          Array
                                        this.state.listaTipoEventos.map( (tipoEvento) => {
                                            return (
                                                <tr key={tipoEvento.idTipoEvento}>
                                                    <td>{tipoEvento.idTipoEvento}</td>
                                                    <td>{tipoEvento.tituloTipoEvento}</td>

                                                    {/* Faz a chamada da função buscarTipoEventoPorId passando o Tipo de Evento selecionado */}
                                                    <td><button onClick={() => this.buscarTipoEventoPorId(tipoEvento)}>Editar</button>

                                                    {/* Faz a chamada da função excluirTipoEvento passando o Tipo de Evento selecionado */}
                                                    <button onClick={() => this.excluirTipoEvento(tipoEvento)}>Excluir</button></td>
                                                </tr>
                                            )
                                        } )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="container" id="conteudoPrincipal-cadastro">
                        {/* Cadastro de Tipos de Eventos */}
                        {/* <h2 className="conteudoPrincipal-cadastro-titulo">Cadastro de Tipo de Evento</h2> */}
                        <Titulo tituloseccao="Cadastro Tipo de Evento" />
                        
                        {/* Formulário de cadastro de Tipo de Evento */}
                        <form onSubmit={this.cadastrarTipoEvento}>
                            <div className="container">
                                <input
                                    type="text"
                                    value={this.state.titulo}
                                    onChange={this.atualizaEstadoTitulo}
                                    placeholder="Título do Tipo de Evento"
                                />

                                {/* Botão de cadastro apenas com a funcionalidade de cadastro */}
                                {/* <button type="submit">Cadastrar</button> */}

                                {/* Altera o botão de acordo com a operação ( edição ou cadastro ) usando IF Ternário */}

                                {/* Estrutura do IF Ternário */}
                                {/* condição ? faço algo caso verdadeiro : faço algo caso falso */}
                                {/* {
                                    this.state.idTipoEventoAlterado === 0 ?
                                    <button type="submit">Cadastrar</button> : 
                                    <button type="submit">Atualizar</button>
                                } */}

                                {/* Uma outra forma, com IF Ternário e disabled ao mesmo tempo */}

                                <button className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro" type="submit" disabled={this.state.titulo === '' ? 'none' : ''}>
                                    {
                                        this.state.idTipoEventoAlterado === 0 ? 'Cadastrar' : 'Atualizar'
                                    }
                                </button>

                                {/* Faz a chamada da função limparCampos */}
                                <button type="button" onClick={this.limparCampos}>
                                    Cancelar
                                </button>
                            </div>
                        </form>

                        {/* Caso algum Tipo de Evento tenha sido selecionado para edição,
                            exibe a mensagem de feedback ao usuário final
                        */}

                        {
                            this.state.idTipoEventoAlterado !== 0 &&
                            <div>
                                <p>O tipo de evento {this.state.idTipoEventoAlterado} está sendo editado!</p>
                                <p>Clique em Cancelar caso queira cancelar a operação antes de cadastrar um novo tipo de evento.</p>
                            </div>
                        }
                    </section>
                </main>

                <Rodape />
            </div>
        );
    }
}

export default TipoEventos;