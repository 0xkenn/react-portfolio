import { createHashRouter ,RouterProvider } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import AboutPage from "./Pages/AboutPage";
import ProjectsPage from "./Pages/ProjectsPage";
import ContactPage from "./Pages/ContactPage";
import LayoutPage from "./Pages/LayoutPage";
import HomePage from "./Pages/HomePage";

const queryClient = new QueryClient();
const router = createHashRouter([
  {
    path: "/",
    element: <LayoutPage/>,
    children: [
      {   
        index: true,
        element: <HomePage/>,
        errorElement: <ErrorPage/>
      },
      {   
        path: "/about",
        element: <AboutPage/>,
        errorElement: <ErrorPage/>
      },
      {
        path: "/projects",
        element: <ProjectsPage/>,
        errorElement: <ErrorPage/>
      },
      {
        path: "/contact",
        element: <ContactPage/>,
        errorElement: <ErrorPage/>
      }
    ]
  }
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
    </QueryClientProvider>
  )
}

export default App;
