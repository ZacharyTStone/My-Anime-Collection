import type { Meta, StoryObj } from "@storybook/react-vite";
import CardActions from "../CardActions";

const meta = {
  title: "UI/CardActions",
  component: CardActions,
  parameters: { layout: "centered" },
  args: {
    title: "Frieren",
    isCurrentlyLoading: false,
    onSynopsisOpen: () => {},
    onAiOpen: () => {},
    onSubmit: () => {},
    onDelete: () => {},
  },
} satisfies Meta<typeof CardActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddType: Story = { args: { type: "add" } };
export const DeleteType: Story = { args: { type: "delete" } };
