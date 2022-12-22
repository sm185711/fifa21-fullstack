import {screen, render} from '@testing-library/react'
import '@testing-library/jest-dom'
import Toaster from '../Toaster'

describe('Toaster Component', () => {
    it('Displays success message', async () => {
        render(
            <Toaster
                toasterOpen={{
                    success: true,
                    error: false,
                }}
                handleToasterClose={() => {}}
            />
        )

        const textElement = screen.getByText(/successfully/i)
        expect(textElement).toBeInTheDocument()
    })
})
