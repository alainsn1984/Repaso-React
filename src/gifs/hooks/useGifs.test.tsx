import { describe, test, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useGifs } from './useGifs'
import * as gifActions from '../actions/get-gifs-by-query.actions'



describe('useGifs', () => {
    test('Initial previous terms is empty', () => {
        const { result } = renderHook(() => useGifs() )
        
        expect( result.current.previousTerms ).toEqual([])
        expect( result.current.gifsResponse.length ).toBe(0)
        expect( result.current.handleSearch ).toBeDefined()
        expect( result.current.handleTermClicked ).toBeDefined()
    })

    test('Should return a list of gifs', async() => {

        const { result } = renderHook(() => useGifs())

        await act( async () => 
            await result.current.handleSearch('goku')
        )

        expect(result.current.gifsResponse.length).toBe(10)
    })

    test('should return a list of gifs when handleTermClicked is called', async () => {
    
        const { result } = renderHook(() => useGifs())
        
        await act( async() => 
            await result.current.handleTermClicked('goku')
        )
        expect( result.current.gifsResponse.length).toBe(10)
    })

    test('should return a list of gifs from cache', async () => {
    
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleTermClicked('goku');
        });
        console.log(result.current.gifsResponse)
        expect(result.current.gifsResponse.length).toBe(10);

        vi.spyOn(gifActions, 'getGifByQuery').mockRejectedValue(
           new Error('This is my custom error')
        );

        await act(async () => {
            await result.current.handleTermClicked('goku');
        });
        expect(result.current.gifsResponse.length).toBe(10);
    })

    test('should return no more than 8 previous terms', async() => {
        
        const { result } = renderHook(() => useGifs())

        vi.spyOn(gifActions, 'getGifByQuery').mockResolvedValue([]);

        await act(async() => {
            await result.current.handleSearch('goku1') 
        })
        await act(async() => {
            await result.current.handleSearch('goku2') 
        })
        await act(async() => {
            await result.current.handleSearch('goku3') 
        })
        await act(async() => {
            await result.current.handleSearch('goku4') 
        })
        await act(async() => {
            await result.current.handleSearch('goku5') 
        })
        await act(async() => {
            await result.current.handleSearch('goku6') 
        })
        await act(async() => {
            await result.current.handleSearch('goku7') 
        })
        await act(async() => {
            await result.current.handleSearch('goku8') 
        })
        await act(async() => {
            await result.current.handleSearch('goku9') 
        })
        // console.log(result.current.previousTerms)
        expect(result.current.previousTerms.length).toBe(8)
        expect(result.current.previousTerms).toStrictEqual(
            [
                'goku9', 'goku8',
                'goku7', 'goku6',
                'goku5', 'goku4',
                'goku3', 'goku2'
            ]
        )
    })
    
})
