import type { Meta, StoryObj } from "@storybook/react-vite";
import Loading from "../Loading";

const meta = {
  title: "UI/Loading",
  component: Loading,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    center: { control: "boolean" },
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: "small" },
};

export const Medium: Story = {
  args: { size: "medium" },
};

export const Large: Story = {
  args: { size: "large" },
};

export const NotCentered: Story = {
  args: { center: false },
};
