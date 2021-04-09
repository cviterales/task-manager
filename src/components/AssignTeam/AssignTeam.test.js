
import {render, screen, fireEvent } from '@testing-library/react'
import AssignTeam from './index';

test("render AssignTeam", async () => {
  const handleOnSave= jest.fn()
  const handleOnClose = jest.fn()
  
  render(<AssignTeam data={{priority: false}} onClose={handleOnClose} operators={[]} onSave={handleOnSave}/>)
  
  expect(screen.getByTestId('form')).toBeInTheDocument();
  
  expect(screen.getByLabelText('Cuadrilla')).toBeInTheDocument();
  expect(screen.getByTestId('cuadrilla')).toBeInTheDocument();
  
  expect(screen.getByLabelText('Fecha')).toBeInTheDocument();
  expect(screen.getByTestId('prioridad')).toBeInTheDocument();

  expect(screen.getByText(/Guardar/)).toBeInTheDocument();
  expect(screen.getByText(/Cancelar/)).toBeInTheDocument();


  fireEvent.click(screen.getByText(/Guardar/))
  expect(handleOnSave).toHaveBeenCalledTimes(1)
  fireEvent.click(screen.getByText(/Cancelar/))
  expect(handleOnClose).toHaveBeenCalledTimes(1)


  screen.debug();
})
