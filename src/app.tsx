import Navbar from "./components/Navbar";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import UsagePage from "./pages/Usage";

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <div className="min-h-full">
        <Navbar />
        <div className="mt-4 container mx-auto px-2">
          <UsagePage />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
