import {
  QueryProvider,
  AuthProvider,
  RouteProvider as Routes,
  ThemeProvider,
  LangProvider,
} from "./providers";

export default function App(): React.ReactElement {
  return (
    <ThemeProvider>
      <LangProvider>
        <QueryProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </QueryProvider>
      </LangProvider>
    </ThemeProvider>
  );
}
