import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SearchParams from './SearchParams'
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom'
import Details from './Details'
import { useState } from 'react'
import AdoptedPetContext from './AdoptedPetContext'

const App = () => {
    const adoptedPet = useState(null)

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: Infinity,
                cacheTime: Infinity,
            },
        },
    })

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AdoptedPetContext.Provider value={adoptedPet}>
                    <header>
                        <Link to="/">Adopt Me!</Link>
                    </header>
                    <Routes>
                        <Route path="/" element={<SearchParams />} />
                        <Route path="/details/:id" element={<Details />} />
                    </Routes>
                </AdoptedPetContext.Provider>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
