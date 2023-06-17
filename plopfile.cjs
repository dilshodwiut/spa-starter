module.exports = (plop) => {
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
};
