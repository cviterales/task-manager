import { render, screen } from "@testing-library/react";
import TaskStateModal from "./TaskStateModal";

test("Contain Guardar and Cancelar Buttons", () => {
  render(<TaskStateModal onClose={() => {}} task={{}}/>);
  expect(screen.getByText(/Guardar/)).toBeInTheDocument();
  expect(screen.getByText(/Cancelar/)).toBeInTheDocument();
});

test("Contain Select", async () => {
  render(<TaskStateModal onClose={() => {}} task={{}} />);
  expect(screen.getByText(/Seleccione.../)).toBeInTheDocument();
});
