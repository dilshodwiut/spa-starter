import { App as AntAppContextProvider } from "antd";
import {
  QueryProvider,
  AuthProvider,
  RouteProvider as Routes,
  ThemeProvider,
  LangProvider,
} from "./providers";
import ErrorBoundary from "./views/error-boundary";

export default function App(): React.ReactElement {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <LangProvider>
          <ThemeProvider>
            <AntAppContextProvider>
              <AuthProvider>
                <Routes />
              </AuthProvider>
            </AntAppContextProvider>
          </ThemeProvider>
        </LangProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}
