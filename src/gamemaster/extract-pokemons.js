const gamemaster = require('./0691-GAME_MASTER.json')

const pokemonTemplates = gamemaster.itemTemplates.filter(i => i.pokemonSettings)
const pokemonData = {}
let ndex = 0
for (let pokemonTemplate of pokemonTemplates) {
  ndex += 1
  const pokemonSettings = pokemonTemplate.pokemonSettings
  const pokemon = {
    id: pokemonSettings.pokemonId,
    ndex: ndex,
    name: pokemonSettings.pokemonId.charAt(0) + pokemonSettings.pokemonId.slice(1).toLowerCase(),
    stats: pokemonSettings.stats,
    type: pokemonSettings.type,
    type2: pokemonSettings.type2,
    quickMoves: pokemonSettings.quickMoves,
    cinematicMoves: pokemonSettings.cinematicMoves
  }
  pokemon.name.replace('_', '-') // Ho-oh
  pokemon.name.replace('-female', '♀')
  pokemon.name.replace('-male', '	♂')

  pokemonData[pokemon.id] = pokemon
}
