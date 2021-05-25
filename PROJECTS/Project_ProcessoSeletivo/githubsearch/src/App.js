import { Component } from 'react';
import './App.css';


class SearchGithub extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repositoryList : [],
      repositoryName : ''
    }
  }

  searchRepositories = (element) =>
  {
    element.preventDefault();
  
    console.log('Está buscando!')
  
    // aqui buscará o repositório do usuário
    fetch('https://api.github.com/users/' + this.state.repositoryName + '/repos')
  
    .then(response => response.json())
  
    .then(list => this.setState({repositoryList : list}))
  
    .catch(error => console.log(error))
  }

  updateUserName = async (name) => 
  {
    await this.setState({repositoryName : name.target.value})
    console.log(this.state.repositoryName)
  }

  cleanFields = () => {
    this.setState({
        repositoryList : [],
        repositoryName : ''
    })

    console.log('Os states foram resetados!')
  }

  render(){
    return(
      <div className = "App">
        <main>
  
          <section>
            <h2>GitHub Finder</h2>
            <form onSubmit = {this.searchRepositories}>
              <div>
                <input
                type = "text"
                value = {this.state.repositoryName}
                onChange = {this.updateUserName}
                placeholder = "Username"
                />
                {
                  <button onClick={this.searchRepositories} type="submit" disabled={this.state.repositoryName === '' ? 'none' : ''}>Buscar</button>
                }
                <button style={{color: "white", fontWeight:"600", height: "43px", backgroundColor: "red"}} type="button" onClick={this.cleanFields}>Cancelar</button>
              </div>
            </form>
          </section>

          <section>
            <table>
              <thead>
                <tr>
                  <th>ID:</th>
                  <th>NOME DO REPOSITÓRIO:</th>
                  <th>DESCRIÇÃO:</th>
                  <th>DATA DE CRIAÇÃO:</th>
                  <th>TAMANHO:</th>
                </tr>
              </thead>
              <tbody>
                {  this.state.repositoryList.map((repository) => {           
                    return(
                      <tr key={repository.id}>
                        <td >{repository.id}</td>
                        <td>{repository.name}</td>
                        <td>{repository.description}</td>
                        <td>{repository.created_at}</td>
                        <td>{repository.size}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>        
          </section>
  
        </main>
      </div>
      )
  }

}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <SearchGithub />

        </p>
      </header>
    </div>
  );
}

export default App;