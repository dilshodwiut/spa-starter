/* eslint-disable @typescript-eslint/no-unused-vars */

interface URLSearchParams {
  parse: () => Record<string, string>;
}

URLSearchParams.prototype.parse = function parse() {
  const parsedParams: Record<string, string> = {};

  this.forEach((value, key) => {
    parsedParams[key] = value;
  });

  return parsedParams;
};
