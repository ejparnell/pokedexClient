import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import sendRequest from '../../../../utilities/send-request'
import { createPokemon } from '../../../../utilities/pokemon-api'

export default function ShowPage({ user }) {
    const [pokemon, setPokemon] = useState({})
    const { pokemonName } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function getPokemon() {
            const pokemon = await sendRequest(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            setPokemon(pokemon)
        }
        getPokemon()
    }, [])

    async function capturePokemon() {
        const pokemonToAdd = {name: pokemon.name, owner: user._id}
        await createPokemon(pokemonToAdd)
        navigate('/usersPokemon')
    }

    return (
        <>
            <h1>ShowPage</h1>
            <h2>{pokemon.name}</h2>
            <button onClick={capturePokemon}>Capture Pokemon</button>
        </>
    )
}