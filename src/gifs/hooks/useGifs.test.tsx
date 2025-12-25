import { describe, test, expect } from 'vitest'
import { screen, render, renderHook } from '@testing-library/react'
import { useGifs } from './useGifs'


describe('useGifs', () => {
    test('Initial previous terms is empty', () => {
        const { result } = renderHook(() => useGifs() )
        
        expect( result.current.previousTerms).toEqual([])
    })
})