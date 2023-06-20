module.exports = (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) => {
  plop.setGenerator("component", {
    description: "Creating new react component",
    prompts: [
      {
        type: "input",
        name: "name",
      },
    ],
    actions: () => [
      {
        type: "add",
        templateFile: "src/templates/components/component.hbs",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
      },
      {
        type: "add",
        templateFile: "src/templates/components/style.hbs",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.module.scss",
      },
    ],
  });

  plop.setGenerator("view", {
    description: "Creating new pages",
    prompts: [
      {
        type: "input",
        name: "name",
      },
      {
        type: "list",
        name: "feature",
        choices: [
          {
            name: "auth",
            value: "auth",
            description: "auth feature",
          },
          {
            name: "jobs",
            value: "jobs",
            description: "jobs feature",
          },
        ],
      },
    ],
    actions: () => [
      {
        type: "add",
        templateFile: "src/templates/views/view.hbs",
        path: "src/features/{{kebabCase feature}}/views/{{kebabCase name}}/{{kebabCase name}}.tsx",
      },
      {
        type: "add",
        templateFile: "src/templates/views/state.hbs",
        path: "src/features/{{kebabCase feature}}/views/{{kebabCase name}}/{{kebabCase name}}-state.ts",
      },
      {
        type: "append",
        templateFile: "src/templates/views/route.hbs",
        path: "src/features/{{kebabCase feature}}/routes.tsx",
        pattern: /(\/\/ ROUTES)/g,
      },
      {
        type: "append",
        templateFile: "src/templates/views/import.hbs",
        path: "src/features/{{kebabCase feature}}/routes.tsx",
        pattern: /(\/\/ VIEW IMPORTS)/g,
      },
    ],
  });
};
