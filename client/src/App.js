import { Route, Routes } from "react-router-dom";
import { Header, Login, Home } from "./Containers/Public";
import { path } from "./Ultils/constant";
function App() {
  return (
    <div className="h-screen w-screen bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home></Home>}>
          <Route path={path.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
