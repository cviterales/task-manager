import { render, screen } from "@testing-library/react";
import Button from "./index";

const rendered  = render(<Button onClick={() => {}} children={""} />);

test("Render Button", () => {
  expect(rendered.getByRole("button")).toBeVisible();
  rendered.debug();
});
