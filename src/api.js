import axios from 'axios'

const service = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/'
})

export default {
  service: service,

  getPokemons() {
    // If there localStorage.getItem('pokemons'), we fetch the infromation
    if (localStorage.getItem('pokemons')) {
      return new Promise((resolve,reject) => {
        resolve(JSON.parse(localStorage.getItem('pokemons')))
      })
    }
    else {
      return service.get('/')
        .then(res => {
          let pokemons = res.data.results
          localStorage.setItem('pokemons', JSON.stringify(pokemons))
          return pokemons
        })
    }
  },

  getPokemonDetail(id) {
    return service.get(`/${id}/`)
      .then(res => res.data)
  },
}