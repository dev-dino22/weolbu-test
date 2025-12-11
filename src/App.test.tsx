import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  it("버튼 클릭 시 카운트가 증가한다", async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByRole("button", { name: /count is/i });

    expect(button).toHaveTextContent("count is 0");

    await user.click(button);
    expect(button).toHaveTextContent("count is 1");
  });
});
