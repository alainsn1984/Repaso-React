
import { describe, test, expect } from "vitest";
import { render, screen } from '@testing-library/react'
import { CustomHeader } from "./CustomHeader";




describe('CustomHeader', () => {


    test('should render the title correctly', () => {
        const title = 'This is my title'

        render(<CustomHeader title={title}/>);
        
        expect(screen.getByText(title)).toBeDefined();
    })

    test('should render the description when is provided', () => {
        const title = 'This is my second title'
        const description1 = 'This is my description'

        render(<CustomHeader title={title} description={description1} />);
        // screen.debug();
        expect(screen.getByText(description1)).toBeDefined()
        expect(screen.getByRole('paragraph')).toBeDefined()
        expect(screen.getByRole('paragraph').innerHTML).toBe(description1)
    })

    test('should not render the description when is not provided', () => {
        const title = 'Title test'
        
        const { container } = render(<CustomHeader title={title} />)
        const divElement = container.querySelector('.content-center')
        const h1 = divElement?.querySelector('h1')

        expect(h1?.innerHTML).toBe(title)

        const p = divElement?.querySelector('p')
        expect(p).toBeNull()
    

    })
})