import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Homepage from "./Pages/Homepage";
import AddPosts from "./Pages/AddPosts";
import { SupaProvider } from "./contexts/SupaContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReadPost from "./Pages/ReadPost";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "add-an-idea",
          element: <AddPosts />,
        },
        {
          path: ":id/:username/:created_at",
          element: <ReadPost/>
        }
      ],
    },
  ]);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SupaProvider>
        <RouterProvider router={router} />
      </SupaProvider>
    </QueryClientProvider>
  );
};

export default App;
