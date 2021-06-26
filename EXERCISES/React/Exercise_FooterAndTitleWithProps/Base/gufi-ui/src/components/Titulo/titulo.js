import React, {Component} from 'react';

class Titulo extends Component{
    render(){
        return(
            <h2 className="conteudoPrincipal-cadastro-titulo">{this.props.tituloseccao}</h2>
        )
    }
}

export default Titulo;