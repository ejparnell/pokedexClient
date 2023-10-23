import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import sendRequest from '../../../../utilities/send-request'
import { createPokemon } from '../../../../utilities/pokemon-api'

export default function ShowPage({ user }) {
    const [pokemon, setPokemon] = useState({})
    const { pokemonName } = useParams()

    useEffect(() => {
        async function getPokemon() {
            const pokemon = await sendRequest(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            setPokemon(pokemon)
        }
        getPokemon()
    }, [])

    async function addPokemon() {
        const pokemonToAdd = {name: pokemon.name, owner: user._id}
        const addedPokemon = await createPokemon(pokemonToAdd)
    }

    return (
        <>
            <h1>ShowPage</h1>
            <button onClick={addPokemon}>{pokemon.name}</button>
        </>
    )
}