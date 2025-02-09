import { render, screen,fireEvent } from "@testing-library/react"
import {Button} from "."
import userEvent from "@testing-library/user-event"
describe('<Button>',()=>{

    it('should render the button with the text "Load more" ',() => {
        render(<Button text = "Load more" onClick={()=> console.log("hello")} />)
        const button = screen.getByRole('button',{name:/load more/i});
        expect(button).toBeInTheDocument()
        expect(button).toHaveAttribute('class',"button")
    })

    it('should call function on buttonclick',()=>{
        const fn = jest.fn()
        render(<Button text="Load more" onClick={fn}/>)

        const button = screen.getByRole('button',{name:/load more/i});

        //Evento do usuario
        userEvent.click(button)

        expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should be disabled when disabled is true',()=>{
        const disabled = true
        render(<Button text="Load more" disabled = {disabled} onClick={()=> console.log("hello")}/>)
        const button = screen.getByRole('button',{name:/load more/i});

        expect(button).toBeDisabled()

    })

    it('should be Enabled when disabled is false',()=>{
        const disabled = false
        render(<Button text="Load more" disabled = {disabled} onClick={()=> console.log("hello")}/>)
        const button = screen.getByRole('button',{name:/load more/i});

        expect(button).not.toBeDisabled()

    })
})