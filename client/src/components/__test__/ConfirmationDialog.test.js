import {screen} from '@testing-library/react'
import {render} from '../../utils/customRender'
import ConfirmationDialog from '../ConfirmationDialog'

describe('ConfirmationDialog component', () => {
    test('it displays text', async () => {
        render(<ConfirmationDialog />)

        const textElement = screen.getByText('Delete Player')
        expect(textElement).toBeInTheDocument()
    })
})
