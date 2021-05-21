import { Component } from 'react'

class TipoEventos extends Component{
    constructor(props){
        super(props);
        this.state = {
            // nomeState : valorInicial
            listaTipoEventos: [ { tipoEventoId: 1, titulo: 'C#' }, { tipoEventoId: 2, titulo: 'ReactJs' } ],
            titulo: ''
        }
    }

    componentDidMount(){

    }

    render(){
        return(
            <div>
                <main>
                    <section>
                        {/* Lista de tipo de eventos */}
                        <h2>Lista de tipo de eventos</h2>
                        <table>
                            <thread>
                                <tr>
                                    {/* Coluna para os IDs */}
                                    <th>#</th>
                                    {/* Coluna para os títulos */}
                                    <th>Título</th>
                                </tr>
                            </thread>

                            <tbody>
                                {
                                    this.state.listaTipoEventos.map((tipoEvento) => {
                                        return(
                                            <tr key={tipoEvento.tipoEventoId}>
                                                <td>{tipoEvento.tipoEventoId}</td>
                                                <td>{tipoEvento.titulo}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>
        );
    }

}

export default TipoEventos;