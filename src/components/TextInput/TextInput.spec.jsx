import { render,screen } from "@testing-library/react"
import {TextInput} from "."

describe('<TextInput>',()=>{
    
    it('Should have a value of searchvalue',()=>{
        const fn = jest.fn()
        render(<TextInput handleChange={fn} searchValue={'testando'}/>)
    })

    it('Should call handlechange function on each key pressed',()=>{
        const fn = jest.fn()
        render(<TextInput handleChange={fn} searchValue={'testando'}/>)

        const input = screen.getAllByPlaceholderText(/type your search/i)[0];
        expect(input).toBeInTheDocument()

        expect(input.value).toBe('testando')
    })
})