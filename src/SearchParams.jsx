import { useState, useContext } from 'react'
import useBreedList from './useBreedList'
import PetsList from './PetsList'
import { useQuery } from '@tanstack/react-query'
import fetchSearch from './fetchSearch'
import AdoptedPetContext from './AdoptedPetContext'

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile']

const SearchParams = () => {
    const [animal, setAnimal] = useState('')
    const [breeds] = useBreedList(animal)
    const [adoptedPet] = useContext(AdoptedPetContext)

    const [rquestParams, setRquestParams] = useState({
        location: '',
        animal: '',
        breed: '',
    })

    const results = useQuery(['search', rquestParams], fetchSearch)
    const pets = results?.data?.pets ?? []

    return (
        <div className="search-params">
            <form
                onSubmit={e => {
                    e.preventDefault()
                    const formData = new FormData(e.target)
                    const paramsObj = {
                        animal: formData.get('animal') ?? '',
                        breed: formData.get('breed') ?? '',
                        location: formData.get('location') ?? '',
                    }
                    setRquestParams(paramsObj)
                }}
            >
                {adoptedPet ? (
                    <div className="pet image-container">
                        <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
                    </div>
                ) : null}
                <label htmlFor="location">
                    Location
                    <input
                        id="location"
                        name="location"
                        placeholder="Location"
                    />
                </label>

                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        placeholder="Location"
                        onChange={e => {
                            setAnimal(e.target.value)
                        }}
                    >
                        <option />
                        {ANIMALS.map(animal => (
                            <option key={animal}>{animal}</option>
                        ))}
                    </select>
                </label>

                <label htmlFor="breed">
                    Breed
                    <select
                        id="breed"
                        name="breed"
                        placeholder="breed"
                        disabled={breeds.length === 0}
                    >
                        <option />
                        {breeds.map(breed => (
                            <option key={breed}>{breed}</option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>
            <PetsList pets={pets} />
        </div>
    )
}

export default SearchParams