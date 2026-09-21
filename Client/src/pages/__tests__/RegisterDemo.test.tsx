import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterDemo from "../RegisterDemo";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("react-router", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("../../components", () => ({
  FormRow: ({ name }: { name: string }) => <input name={name} readOnly />,
  Logo: () => <img alt="logo" />,
}));

const mutate = vi.fn();
let isError = false;

// useMutation hands back a fresh result object on every render; only `mutate`
// is stable. The mock mirrors that, so a component that keys an effect on the
// object rather than on `mutate` re-fires here exactly as it did in production.
vi.mock("../../queries/auth", () => ({
  useSetupUserMutation: () => ({ mutate, isError }),
}));

describe("RegisterDemo", () => {
  beforeEach(() => {
    mutate.mockClear();
    isError = false;
  });

  it("requests a demo account once on mount", () => {
    render(<RegisterDemo />);
    expect(mutate).toHaveBeenCalledTimes(1);
  });

  it("does not request again when the component re-renders", () => {
    const { rerender } = render(<RegisterDemo />);
    rerender(<RegisterDemo />);
    rerender(<RegisterDemo />);

    // The bug this guards: each re-render produced a new mutation object, a new
    // callback identity and another registration request, which exhausted the
    // /register rate limit and spammed error toasts.
    expect(mutate).toHaveBeenCalledTimes(1);
  });

  it("keeps the submit button disabled while the request is in flight", () => {
    render(<RegisterDemo />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("offers a manual retry once the request has failed", async () => {
    isError = true;
    render(<RegisterDemo />);
    expect(mutate).toHaveBeenCalledTimes(1);

    const retry = screen.getByRole("button");
    expect(retry).toBeEnabled();

    await userEvent.click(retry);
    expect(mutate).toHaveBeenCalledTimes(2);
  });
});
