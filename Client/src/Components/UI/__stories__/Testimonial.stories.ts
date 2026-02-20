import type { Meta, StoryObj } from "@storybook/react-vite";
import Testimonial from "../Testimonial";

const meta = {
  title: "UI/Testimonial",
  component: Testimonial,
  tags: ["autodocs"],
} satisfies Meta<typeof Testimonial>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Naruto Uzumaki",
    img: "https://cdn.myanimelist.net/images/characters/2/284121.jpg",
    text: "This app helped me track all my favorite anime! Believe it!",
  },
};

export const LongText: Story = {
  args: {
    name: "Light Yagami",
    img: "https://cdn.myanimelist.net/images/characters/2/63600.jpg",
    text: "I've been using My Anime Collection to meticulously catalog every series I've watched. The organization features are exactly what I needed to keep everything in perfect order.",
  },
};
