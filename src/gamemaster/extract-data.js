// Only config needed is gamemasters path
const gamemasters = [
  require('./0.105.0-GAME_MASTER.json'),
  require('./0.85.2-2-GAME_MASTER.json'),
  require('./0793-GAME_MASTER.json'),
  require('./0692-GAME_MASTER.json'),
  require('./0691-GAME_MASTER.json'),
  require('./LEGACY-GAME_MASTER.json')
]

const fs = require('fs')

/**
 * Pokemon data parsing
 */
const gameMastersItemTemplates =
  gamemasters.map(g => g.itemTemplates)
const itemTemplates = [].concat.apply([], gameMastersItemTemplates)
const pokemonTemplates = itemTemplates.filter(i => i.pokemonSettings).map(i => {
  return {...i.pokemonSettings, templateId: i.templateId}
})
// Adding legacy moves to pokemons
const pokemonTemplatesAllMovesets = {}
pokemonTemplates.forEach(p => {
  let allMovesets = pokemonTemplatesAllMovesets[p.templateId]
  if (!allMovesets) {
    pokemonTemplatesAllMovesets[p.templateId] = p
    allMovesets = p
    return
  }

  allMovesets.quickMoves = allMovesets.quickMoves.concat(p.quickMoves.filter(m => !allMovesets.quickMoves.includes(m)))
  allMovesets.cinematicMoves = allMovesets.cinematicMoves.concat(p.cinematicMoves.filter(m => !allMovesets.cinematicMoves.includes(m)))
})

const pokemonData = {}
for (let pokemonId in pokemonTemplatesAllMovesets) {
  const pokemonSettings = pokemonTemplatesAllMovesets[pokemonId]
  const pokemon = {
    id: pokemonSettings.templateId,
    name: pokemonSettings.pokemonId.charAt(0) + pokemonSettings.pokemonId.slice(1).toLowerCase(),
    stats: pokemonSettings.stats,
    type: pokemonSettings.type,
    type2: pokemonSettings.type2,
    quickMoves: pokemonSettings.quickMoves,
    cinematicMoves: pokemonSettings.cinematicMoves
  }
  pokemon.name = pokemon.name.replace('_', '-') // Ho-oh
  pokemon.name = pokemon.name.replace('-female', ' ♀')
  pokemon.name  = pokemon.name.replace('-male', '	♂') 
  
  pokemonData[pokemon.id] = pokemon
}

/**
 * Move data parsing
 */
const moveTemplates = gamemasters[0].itemTemplates.filter(i => i.moveSettings)
const moveData = {}
for(let moveTemplate of moveTemplates) {
  const moveSettings = moveTemplate.moveSettings
  const id = moveSettings.movementId
  const name =
    id
      .replace('_FAST', '')
      .split('_')
      .reduce((n, w) => n + w.charAt(0) + w.slice(1).toLowerCase() + ' ', '')
      .trim()
  const move = {
    id: id,
    name: name,
    type: moveSettings.pokemonType,
    power: moveSettings.power,
    durationMs: moveSettings.durationMs,
    energyDelta: moveSettings.energyDelta
  }

  moveData[move.id] = move
}

/**
 * Type effectiveness data parsing
 */
const typeEffectiveTemplates = gamemasters[0].itemTemplates.filter(i => i.typeEffective)
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
  effectivenessData[typeEffectiveness.id] = typeEffectiveness
}

const playerLevelTemplate = gamemasters[0].itemTemplates.filter(i => i.playerLevel)
const cpMultiplier = playerLevelTemplate[0].playerLevel.cpMultiplier
const bossCpMultiplier = [0.59740001, 0.67, 0.73, 0.79, 0.79]
const cpMultiplierData = {
  cpMultiplier: cpMultiplier,
  bossCpMultiplier: bossCpMultiplier
}

fs.writeFileSync('pokemonData.json', JSON.stringify(pokemonData))
fs.writeFileSync('moveData.json', JSON.stringify(moveData))
fs.writeFileSync('effectivenessData.json', JSON.stringify(effectivenessData))
fs.writeFileSync('cpMultiplierData.json', JSON.stringify(cpMultiplierData))
