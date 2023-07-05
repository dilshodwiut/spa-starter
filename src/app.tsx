import {
  QueryProvider,
  AuthProvider,
  RouteProvider as Routes,
  ThemeProvider,
} from "./providers";

export default function App(): React.ReactElement {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
