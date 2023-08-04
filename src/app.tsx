import {
  QueryProvider,
  AuthProvider,
  RouteProvider as Routes,
  ThemeProvider,
  LangProvider,
} from "./providers";

export default function App(): React.ReactElement {
  return (
    <QueryProvider>
      <LangProvider>
        <ThemeProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </ThemeProvider>
      </LangProvider>
    </QueryProvider>
  );
}
