# Add Storybook Stories

Add focused, high-quality Storybook stories for the component: $ARGUMENTS

## Guidelines

- **Less is more.** Write only the stories that show meaningful, distinct states. Skip near-duplicate variants.
- **Quality over quantity.** Each story should demonstrate a visually or functionally different state worth documenting.
- **Prioritize what designers and developers actually need to see:** defaults, key variants, edge cases (empty, overflow, error), and interactive states.

## Conventions

- Use `import type { Meta, StoryObj } from "@storybook/react-vite";`
- Use `fn()` from `"storybook/test"` for callback props
- Place stories in a `__stories__/` directory adjacent to the component (e.g., `Components/UI/__stories__/Foo.stories.ts`)
- File naming: `{ComponentName}.stories.ts` (or `.stories.tsx` if JSX is needed in a `render` function)
- Always include `tags: ["autodocs"]` in meta
- Use `satisfies Meta<typeof Component>` for type safety
- Story names should describe the *state*, not the prop (e.g., `Disabled` not `WithDisabledTrue`)
- Use `argTypes` with appropriate controls for props that benefit from playground interaction

## Process

1. Read the target component to understand its props, variants, and edge cases
2. Identify the 3-6 most meaningful visual states to capture
3. Write clean stories — aim for 3-6 stories per component, never pad with filler
4. Run `npm run storybook` from the `Client/` directory and visually verify the stories render correctly
