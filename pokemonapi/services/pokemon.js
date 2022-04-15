const superagent = require('superagent')
const Pokemon = async (req, res, next) => {
  const arr = req.body.ids
  const demo = await Promise.all(arr.map(async index => {
    try {
      const pokemonRes = await superagent.get(`https://pokeapi.co/api/v2/pokemon/${index}/`)
      const pokemon = JSON.parse(pokemonRes.text)
      const types = pokemon.types.map(type => {
        return type.type.name
      })
      return {
        name: pokemon.name,
        type: types,
        sprites: pokemon.sprites.front_default,
      }
    }
    catch (e) {
      return {
        name: "notfound"
      }
    }
  }
  ))
  res.status(200).send(demo)
  next()
}

module.exports = Pokemon