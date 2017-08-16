import pokemons from 'gamemaster/pokemonData.json'

function Pokemons() {
  return pokemons
}

export default {
  name: 'Pokemons',
  service: Pokemons
}