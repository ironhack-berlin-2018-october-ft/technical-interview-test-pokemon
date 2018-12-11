import React, { Component } from 'react'
import { Table, Row, Col, Container } from 'reactstrap';
import axios from 'axios'
import { capitalize } from '../utils.js'

export default class PokeDetail extends Component {
  constructor(props) {
    super(props)
    // Inital values for the state
    this.state = {
      selectedPokemon: null,
    }
  }
  render() {
    return (
      <div>
        {this.state.selectedPokemon && (
          <div className="text-center">
            <img src={`https://pokemon-fight.surge.sh/images/pokemons/${this.state.selectedPokemon.id}.png`} />
            <Table hover className="m-auto">
              <tbody>
                <tr >
                  <th>Name</th>
                  <td>{capitalize(this.state.selectedPokemon.name)}</td>
                </tr>
                <tr>
                  <th>Height</th>
                  <td>{this.state.selectedPokemon.height * 10} cm</td>
                </tr>
                <tr>
                  <th>Weight</th>
                  <td>{this.state.selectedPokemon.weight / 10} kg</td>
                </tr>
                <tr>
                  <th>Types</th>
                  <td>{this.state.selectedPokemon.types.map(type => (
                    <div key={type.type.name}>{type.type.name}</div>
                  ))}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}
      </div>
    )
  }
  loadPokemon(id) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(response => {
      console.log(response.data)
      this.setState({
        selectedPokemon: response.data
      })
    })
  }
  componentDidMount() {
    this.loadPokemon(this.props.match.params.id)
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.loadPokemon(this.props.match.params.id)
    }
  }
}
