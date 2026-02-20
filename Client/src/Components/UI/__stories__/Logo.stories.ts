import type { Meta, StoryObj } from "@storybook/react-vite";
import Logo from "../Logo";

const meta = {
  title: "UI/Logo",
  component: Logo,
  tags: ["autodocs"],
  argTypes: {
    width: { control: "text" },
    height: { control: "text" },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = {
  args: {
    width: "200px",
  },
};

export const Small: Story = {
  args: {
    width: "50px",
  },
};

export const Clickable: Story = {
  args: {
    onClick: () => alert("Logo clicked!"),
  },
};
