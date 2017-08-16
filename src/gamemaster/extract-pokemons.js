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

const moveTemplates = gamemaster.itemTemplates.filter(i => i.moveSettings)
const moveData = {}
for(let moveTemplate of moveTemplates) {
  const moveSettings = moveTemplate.moveSettings
  const move = {
    id: moveSettings.movementId,
    type: moveSettings.pokemonType,
    power: moveSettings.power,
    durationMs: moveSettings.durationMs
  }

  moveData[move.id] = move
}

const typeEffectiveTemplates = gamemaster.itemTemplates.filter(i => i.typeEffective)
const effectivenessData = {}
const types = [
  'POKEMON_TYPE_NORMAL',
  'POKEMON_TYPE_FIGHTING',
  'POKEMON_TYPE_FLYING',
  'POKEMON_TYPE_POISON',
  'POKEMON_TYPE_GROUND',
  'POKEMON_TYPE_ROCK',
  'POKEMON_TYPE_BUG',
  'POKEMON_TYPE_GHOST',
  'POKEMON_TYPE_STEEL',
  'POKEMON_TYPE_FIRE',
  'POKEMON_TYPE_WATER',
  'POKEMON_TYPE_GRASS',
  'POKEMON_TYPE_ELECTRIC',
  'POKEMON_TYPE_PSYCHIC',
  'POKEMON_TYPE_ICE',
  'POKEMON_TYPE_DRAGON',
  'POKEMON_TYPE_DARK',
  'POKEMON_TYPE_FAIRY'
]
for (let typeEffectiveTemplate of typeEffectiveTemplates) {
  const typeEffective = typeEffectiveTemplate.typeEffective
  const attackScalar = typeEffective.attackScalar
  const typeEffectiveness = {
    id: typeEffective.attackType
  }
  attackScalar.forEach((s, i) => typeEffectiveness[types[i]] = attackScalar[i])
  console.log(typeEffectiveness)
  effectivenessData[typeEffectiveness.id] = typeEffectiveness
}
