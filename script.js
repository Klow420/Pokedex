const pokedex = document.getElementById("pokedex")
const list = document.querySelector("li")
const getPokemon = () => {
  const promises = []
  for (let i = 1; i <= 12; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`
    promises.push(fetch(url).then(res => res.json()))
  }
  Promise.all(promises).then(result => {
    const pokemon = result.map(data => ({
      id: data.id,
      name: data.name,
      image: data.sprites["front_default"],
      type: data.types[0].type.name,
    }))
    displayPokemon(pokemon)
  })
}
const displayPokemon = pokemon => {
  const pokemonString = pokemon
    .map(
      singlePokemon => `
    <li>
      <img src="${singlePokemon.image}" />
      <h3>#0${singlePokemon.id}</h3>
      <h2>${singlePokemon.name}</h2>
      <p>${singlePokemon.type}</p>
    </li>`
    )
    .join("")
  pokedex.innerHTML = pokemonString
}
getPokemon()
