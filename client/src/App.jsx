import { Outlet } from "react-router-dom";
import "./main.scss";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <Header />
        <Outlet />
      </AuthProvider>
    </div>
  );
}

export default App;
