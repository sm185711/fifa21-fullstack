import {screen} from '@testing-library/react'
import {render} from '../../utils/customRender'
import Home from './../Home'

describe('ConfirmationDialog component', () => {
    test('it displays text', async () => {
        render(<Home />)

        const textElement = screen.getByText('DATABASE')
        expect(textElement).toBeInTheDocument()
    })
})
