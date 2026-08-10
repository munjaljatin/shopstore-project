import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { user } = useAuth();
  console.log(user?.id);
  return <RouterProvider router={router} />;
};

export default App;
