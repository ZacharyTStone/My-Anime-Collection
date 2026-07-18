import type { Meta, StoryObj } from "@storybook/react-vite";
import SkeletonLoadingBlock from "../SkeletonLoadingBlock";

const meta = {
  title: "UI/SkeletonLoadingBlock",
  component: SkeletonLoadingBlock,
  tags: ["autodocs"],
  argTypes: {
    width: { control: "text" },
    height: { control: "text" },
    borderRadius: { control: "text" },
  },
} satisfies Meta<typeof SkeletonLoadingBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardSkeleton: Story = {
  args: {
    width: 300,
    height: 400,
    borderRadius: 8,
  },
};

export const AvatarSkeleton: Story = {
  args: {
    width: 60,
    height: 60,
    borderRadius: "50%",
  },
};

export const TextLineSkeleton: Story = {
  args: {
    width: "100%",
    height: 16,
    borderRadius: 4,
  },
};

export const WideBlock: Story = {
  args: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
};
