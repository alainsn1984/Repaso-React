
import { useRef, useState } from 'react'
import type { Gif } from '../interface/gif.interface'
import { getGifByQuery } from '../actions/get-gifs-by-query.actions'


export const useGifs = () => {

    const [previousTerms, setPreviousTerms] = useState<string[]>([])
    const [gifsResponse, setGifsResponse] = useState<Gif[]>([])
    
    const gifsCache = useRef<Record<string, Gif[]>>({})

    const handleTermClicked = async(term: string) => {
        if (gifsCache.current[term]) {
            setGifsResponse(gifsCache.current[term])
            return;
        }

        const gifs = await getGifByQuery(term)
        setGifsResponse(gifs)
        gifsCache.current[term] = gifs

    }
    
    const handleSearch = async(query: string) => {

        query = query.trim().toLowerCase()

        if ( query.trim().length === 0){
            return
        }
        
        
        if(previousTerms.includes(query) ) return;
            
        setPreviousTerms(state => [query, ...state].slice(0, 8))

        const gifs = await getGifByQuery(query)
        setGifsResponse(gifs)
        
        gifsCache.current[query] = gifs
    }

    return {
        previousTerms,
        gifsResponse,

        handleTermClicked,
        handleSearch
    }
}
