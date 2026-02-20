import type { Preview } from "@storybook/react-vite";
import "../src/tailwind.css";
import "../src/assets/scss/index.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "todo",
    },
  },
};

export default preview;
