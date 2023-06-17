declare global {
  interface String {
    toCapitalCase: (separator: string) => string;
  }
}
