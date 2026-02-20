import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import FormRow from "../FormRow";

const meta = {
  title: "UI/FormRow",
  component: FormRow,
  tags: ["autodocs"],
  args: {
    handleChange: fn(),
  },
} satisfies Meta<typeof FormRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextInput: Story = {
  args: {
    type: "text",
    name: "username",
    value: "",
    labelText: "Username",
  },
};

export const EmailInput: Story = {
  args: {
    type: "email",
    name: "email",
    value: "user@example.com",
    labelText: "Email Address",
  },
};

export const PasswordInput: Story = {
  args: {
    type: "password",
    name: "password",
    value: "secret123",
    labelText: "Password",
  },
};

export const Disabled: Story = {
  args: {
    type: "text",
    name: "disabled-field",
    value: "Cannot edit",
    labelText: "Disabled Field",
    disabled: true,
  },
};
