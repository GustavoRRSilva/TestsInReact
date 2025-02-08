import { render, screen } from "@testing-library/react"
import {Button} from "."
describe('<Button>',()=>{
    it('should render the button with the text "Load more" ',() => {
        render(<Button text = "Load more" onClick={()=>console.log("hello")}/>);

        const button = screen.getByRole('button',{name:/load more/i});
        expect(button).toBeInTheDocument()
    })
})