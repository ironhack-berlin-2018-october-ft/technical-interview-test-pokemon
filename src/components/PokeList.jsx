import React, { Component } from 'react'
import { Table, Row, Col, Container } from 'reactstrap';
import { Route } from 'react-router-dom'
import PokeDetail from './PokeDetail'
import { capitalize } from '../utils'
import api from '../api'


export default class PokeList extends Component {
  constructor(props) {
    super(props)
    // Inital values for the state
    this.state = {
      pokemons: null,
      search: "",
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }
  extractIdFromUrl(pokeUrl) {
    return pokeUrl.substring(34, pokeUrl.length - 1)
    // OR
    // return pokeUrl.split('/')[6]
  }
  handlePokemonSelection(id) {
    // On click, redirects to '/pokemons/'+id
    this.props.history.push('/pokemons/' + id)
  }
  handleSearchChange(e) {
    this.setState({
      search: e.target.value
    })
  }
  render() {
    return (
      <div className="PokeList">
        <input 
          type="text" 
          className="form-control my-3" 
          placeholder="Search"
          value={this.state.search}
          onChange={this.handleSearchChange}
          />
        {!this.state.pokemons && <div>Loading...</div>}
        {this.state.pokemons && (
          <Row>
            <Col md="4">
              <div className="list-scroll">
                <Table hover className="poke-table">
                  <tbody>
                    {this.state.pokemons.filter(pokemon => pokemon.name.includes(this.state.search.toLowerCase())).map(pokemon => (
                      <tr key={pokemon.url} onClick={() => this.handlePokemonSelection(pokemon.id)}>
                        <td>
                          <img src={`https://pokemon-fight.surge.sh/images/pokemons/${pokemon.id}.png`} />
                        </td>
                        <td className="align-middle">
                          {capitalize(pokemon.name)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
            <Col md="8">
              <Route path="/pokemons/:id" component={PokeDetail} />
            </Col>
          </Row>
        )}

      </div>
    );
  }
  componentDidMount() {
    api.getPokemons()
      .then(pokemons => {
        this.setState({
          pokemons: pokemons.map(pokemon => ({
            ...pokemon,
            id: this.extractIdFromUrl(pokemon.url)
          }))
        })
      })
  }
}
