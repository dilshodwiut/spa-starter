# Frontend Template

_Before running locally, make sure you have `volta` installed on your system_

---

## Tech Stack

- Documentation:TypeScript, jsdoc
- Style guide: Airbnb
- Linter: ESLint, Stylelint for css files
- Build tool: Vite that uses Rollup module bundler and ESBuild for minification and transpilation
- IDE/Text editor: VS Code. In case someone using a different one we need to configure settings in `.editorconfig` file. If using VS Code in javascript project, `jsconfig.json` file need to be configured to enable path aliases.
- VS Code extension: `pretty-ts-errors`
- Package manager: Yarn
- CSS framework: TailwindCSS, Sass (css extension)
- Testing framework: Vitest, React testing library
- Utility library: Ramda, Radash
- Component library: Ant design or Chakra ui or Mantine
- Date manipulation library: Date-fns or Dayjs
- Forms: React hook form
- Schema validation: Zod
- State management: React query, Context + Reducers, Zustand, Xstate
- Extra libraries: Immer, Immutable, React window, Prop types, Prettier, Husky, Query-string, Axios, Tanstack table
- Browser extensions: Web vitals, React dev tools
- JavaScript tool manager: Volta
- Commit message convention: [read here](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages)
- Git workflow: [version control best practices](https://www.git-tower.com/blog/version-control-best-practices), [trunk based development](https://trunkbaseddevelopment.com)

---

By all means, you can tweak the eslint rules in `eslintrc.json` to fit your or your team's coding conventions but don't overdo it 😉

---

## Current limitations or bugs of this template

1. You need to install `jsdoc` globally on your machine and remove from local dependencies list to use it. Because of new approach of yarn (plug'n'play) locally installed jsdoc binary couldn't be found.
2. The script `stylelint-check` in `package.json` throws an error.
3. Depending on the requirements or project, you need to choose and install a suitable component library on your own.
4. The plopfile.cjs is not configured correctly to only have node environment in IDE, e.g. you can type `window` and the editor shows some type data
