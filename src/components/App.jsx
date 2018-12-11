import React, { Component } from 'react';
import axios from 'axios'
import { Table, Row, Col, Container } from 'reactstrap';
import PokeNavbar from './PokeNavbar';
import {Switch, Route, Link} from 'react-router-dom'
import About from './About'
import PokeList from './PokeList'

class App extends Component {
  constructor(props) {
    super(props)
    // Inital values for the state
    this.state = {
      pokemons: null,
      selectedPokemon: null,
    }
  }
  render() {
    return (
      <div className="App text-center">
        <PokeNavbar />
        <Container>
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/" component={PokeList} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
