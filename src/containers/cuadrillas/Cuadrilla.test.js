//import {screen} from '@testing-library/react'
import Cuadrillas from './Cuadrillas'
import {render, screen} from '../../test-utils'

test("Render Component Cuadrilla", () => {
  render(<Cuadrillas />)
  expect(screen.getByText(/Crear/)).toBeInTheDocument();
})