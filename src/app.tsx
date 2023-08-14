import { App as AntAppContextProvider } from "antd";
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
          <AntAppContextProvider>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </AntAppContextProvider>
        </ThemeProvider>
      </LangProvider>
    </QueryProvider>
  );
}
