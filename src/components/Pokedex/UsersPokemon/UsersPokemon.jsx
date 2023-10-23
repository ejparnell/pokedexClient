import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deletePokemon, getUserPokemon, updateNickname } from '../../../../utilities/pokemon-api'
import PokemonForm from '../PokemonForm/PokemonForm'

export default function UsersPokemon({ user }) {
    const [pokemon, setPokemon] = useState([])
    const [nickname, setNickname] = useState('')

    useEffect(() => {
        async function getPokemon() {
            const pokemon = await getUserPokemon(user)
            setPokemon(pokemon)
        }
        getPokemon()
    }, [])

    function handleChange(event) {
        setNickname(event.target.value)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const updateData = { nickname }
        const updatedPokemon = await updateNickname(event.target.id, updateData)
        const updatedPokemonList = pokemon.map(pokemon => pokemon._id === updatedPokemon._id ? updatedPokemon : pokemon)
        setPokemon(updatedPokemonList)
    }

    async function handleDelete(event) {
        const deletedPokemon = await deletePokemon(event.target.id)
        const updatedPokemon = pokemon.filter(pokemon => pokemon._id !== deletedPokemon._id)
        setPokemon(updatedPokemon)
    }

    return (
        <>
            <h1>UsersPokemon</h1>
            {pokemon.map(pokemon => (
                <div key={pokemon._id}>
                    <Link to={`/${pokemon.name}`}>{pokemon.name}</Link>
                    {pokemon.nickname && <p>{pokemon.nickname}</p>}
                    <PokemonForm 
                        pokemon={pokemon} 
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                    <button id={pokemon._id} onClick={handleDelete}>Release Pokemon to the wild</button>
                </div>
            ))}
        </>
    )
}