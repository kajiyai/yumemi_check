import { render, fireEvent } from "@testing-library/react";
import CheckBox from "./index";

test("renders CheckBox and handles click", () => {
  const handleChange = jest.fn();
  const { getByLabelText } = render(
    <CheckBox
      id="test"
      value={1}
      label="Test"
      handleCheckboxChange={handleChange}
    />,
  );

  const checkbox = getByLabelText("Test");
  fireEvent.click(checkbox);

  expect(handleChange).toHaveBeenCalled();
});
