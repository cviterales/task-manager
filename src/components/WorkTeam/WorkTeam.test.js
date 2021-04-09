import WorkTeam from ".";
import { render, screen } from "../../test-utils";

const selectedTeam = {
  amount_task: 0,
  id_team: 3,
  id_vehicle: 1,
  operators: [
    {
      id: 1,
      id_team: 3,
      name: "Leandro Pezo",
      photo_src: "/images/employees/img1.png",
    },
    {
      id: 2,
      id_team: 3,
      name: "Mauro Brito",
      photo_src: "/images/employees/img2.png",
    },
  ],
};

const data = {
  operators: [
    {
      id: 1,
      name: "Leandro Pezo",
    },
    {
      id: 2,
      name: "Mauro Brito",
    },
  ],
  vehicles: [
    {
      id: 1,
      name: "Toyota",
    },
    {
      id: 2,
      name: "Ford",
    },
  ],
};

const component = (
  <WorkTeam
    selectedTeam={selectedTeam}
    teamData={data}
    onClose={() => {}}
    sendData={() => {}}
    deleteData={() => {}}
  />
);

describe("WorkTeam", () => {
  test("render Buttons", async () => {
    render(component);
    expect(screen.getByText(/Eliminar/)).toBeInTheDocument();
    expect(screen.getByText(/Guardar/)).toBeInTheDocument();
    expect(screen.getByText(/Cancelar/)).toBeInTheDocument();
  });

  test("Render if button not contain disabled attribute", () => {
    render(component);
    expect(screen.getByTestId("deleteOperartor0")).not.toHaveAttribute(
      "disabled"
    );
  });

  test("Render if button contain disabled attribute", () => {
    selectedTeam.amount_task = 1;
    render(
      <WorkTeam
        selectedTeam={selectedTeam}
        teamData={data}
        onClose={() => {}}
        sendData={() => {}}
        deleteData={() => {}}
      />
    );
    expect(screen.getByTestId("deleteOperartor0")).toHaveAttribute("disabled");
  });
});
