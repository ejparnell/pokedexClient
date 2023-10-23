import sendRequest from './send-request'
const BASE_URL = 'http://localhost:4741/pokemon'

export async function createPokemon(pokemonData) {
    return sendRequest(BASE_URL, 'POST', pokemonData)
}

export async function getUserPokemon(user) {
    return sendRequest(`${BASE_URL}/${user._id}`)
}

export async function updateNickname(pokemonData, updateData) {
    return sendRequest(`${BASE_URL}/${pokemonData}`, 'PATCH', updateData)
}

export async function deletePokemon(pokemonData) {
    return sendRequest(`${BASE_URL}/${pokemonData}`, 'DELETE')
}