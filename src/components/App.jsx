import React, { Component } from 'react';
import axios from 'axios'
import { Table, Row, Col, Container } from 'reactstrap';
import PokeNavbar from './PokeNavbar';


class App extends Component {
  constructor(props) {
    super(props)
    // Inital values for the state
    this.state = {
      pokemons: null,
      selectedPokemon: null,
    }
  }
  extractIdFromUrl(pokeUrl) {
    return pokeUrl.substring(34, pokeUrl.length - 1)
    // OR
    // return pokeUrl.split('/')[6]
  }
  handlePokemonSelection(id) {
    console.log(id);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(response => {
        console.log(response.data)
        this.setState({
          selectedPokemon: response.data
        })
      })
  }
  render() {
    return (
      <div className="App text-center">
        <PokeNavbar />
        <Container>
          {!this.state.pokemons && <div>Loading...</div>}
          {this.state.pokemons && (
            <Row>
              <Col sm="4" lg="3">
                <Table hover className="poke-table">
                  <tbody>
                    {this.state.pokemons.map(pokemon => (
                      <tr key={pokemon.url} onClick={() => this.handlePokemonSelection(this.extractIdFromUrl(pokemon.url))}>
                        <td>
                          <img src={`https://pokemon-fight.surge.sh/images/pokemons/${this.extractIdFromUrl(pokemon.url)}.png`} />
                        </td>
                        <td className="align-middle">
                          {pokemon.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
              <Col sm="6" lg="9">
                {this.state.selectedPokemon && (
                  <div className="text-center">
                    {/* <pre>{JSON.stringify(this.state.selectedPokemon, null, 2)}</pre> */}
                    <img src={`https://pokemon-fight.surge.sh/images/pokemons/${this.state.selectedPokemon.id}.png`} />
                    <Table hover>
                      <tbody>
                        <tr>
                          <th>Name</th>
                          <td>{this.state.selectedPokemon.name}</td>
                        </tr>
                        <tr>
                          <th>Height</th>
                          <td>{this.state.selectedPokemon.height*10} cm</td>
                        </tr>
                        <tr>
                          <th>Weight</th>
                          <td>{this.state.selectedPokemon.weight/10} kg</td>
                        </tr>
                        <tr>
                          <th>Types</th>
                          <td>{this.state.selectedPokemon.types.map(type => (
                            <div>{type.type.name}</div>
                            ))}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                )}
              </Col>
            </Row>
          )}

        </Container>
      </div>
    );
  }
  componentDidMount() {
    axios.get('https://pokeapi.co/api/v2/pokemon/')
      .then(response => {
        console.log(response.data)
        this.setState({
          pokemons: response.data.results
        })
        // this.setState({
        //   pokemons: response.data.results.map(pokemon => ({
        //     ...pokemon,
        //     id: this.extractIdFromUrl(pokemon.url)
        //   }))
        // })
      })
  }
}

export default App;
