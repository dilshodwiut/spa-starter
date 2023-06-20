import { QueryProvider, RouteProvider as Routes } from "./providers";

export default function App(): React.ReactElement {
  return (
    <QueryProvider>
      <Routes />
    </QueryProvider>
  );
}
