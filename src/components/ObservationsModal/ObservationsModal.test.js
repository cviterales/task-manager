import ObservationsModal from './ObservationsModal'
import {screen, render, fireEvent} from '../../test-utils'


describe('Test Observation Modal', () => {
  test("render Component", () => {
    const onCloseHandler = jest.fn();
    const onSaveHandler = jest.fn();
    render(<ObservationsModal onClose={onCloseHandler} onSave={onSaveHandler}/>)
    
    expect(screen.getByText("Guardar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("textbox"), { target: { value: 'Descripcion' } });
    fireEvent.click(screen.getByText("Cancelar"))
    fireEvent.submit(screen.getByTestId("form"))
    expect(onCloseHandler).toHaveBeenCalledTimes(1);
    expect(onSaveHandler).toHaveBeenCalled();
    
    screen.debug();
  })
})