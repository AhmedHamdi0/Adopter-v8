import { useQuery } from '@tanstack/react-query'
import fetchBreedList from './fetchBreedList'

const useBreedList = animal => {
    const results = useQuery(['animal', animal], fetchBreedList)

    return [results?.data?.breeds ?? [], results.status]
}

export default useBreedList
