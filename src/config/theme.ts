import { extendTheme } from "@chakra-ui/react";

const blue = {
  900: "#1A365D",
  800: "#2A4365",
  700: "#2C5282",
  600: "#2B6CB0",
  500: "#3182CE",
  400: "#4299E1",
  300: "#63B3ED",
  200: "#90CDF4",
  100: "#BEE3F8",
  50: "#EBF8FF",
};

const colors = {
  brand: {
    900: `#152c4d`,
    800: blue[`900`],
    700: blue[`800`],
    600: blue[`700`],
    500: blue[`600`],
    400: blue[`500`],
    300: blue[`400`],
    200: blue[`300`],
    100: blue[`200`],
    50: blue[`100`],
    10: blue[`50`],
  },
};

const theme = extendTheme({
  components: {
    Button: {
      defaultProps: {
        colorScheme: `brand[800]`,
      },
    },
  },
  colors,
  fonts: {
    body: `"Source Sans Pro", "Inter", "Mulish", "Inter", "Lobster" ,"Lexend Deca", "Source Sans Pro", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
    heading: `"Lexend Deca", "Mulish", "Inter", "Lexend Deca", "Source Sans Pro", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
  },
  styles: {
    global: (props: any) => ({
      body: {
        // mode ("color for light mode (string)", "color for dark mode (string)")
        backgroundColor: `#F1F5F9`,
        color: `gray.600`,
        // bg: mode(`gray.50`, `gray.50`)(props),
        // fontFamily: `"Lexend Deca", "Source Sans Pro", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
      },
      a: {
        color: colors.brand[`500`],
        _hover: {
          textDecoration: `underline`,
        },
      },
      button: {
        fontWeight: `normal !important`,
      },
    }),
  },
});

export default theme;
