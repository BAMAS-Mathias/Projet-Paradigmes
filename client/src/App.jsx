import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Layout from "./layout/Layout";
import CreateEmployee from "./pages/createEmployee/CreateEmployee";
import Dashboard from "./pages/dashboard2/Dashboard";
import EmployeeEdit from "./pages/dashboard2/EmployeeEdit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          ></Route>
          <Route
            path="/employee/create"
            element={
              <Layout>
                <CreateEmployee />
              </Layout>
            }
          ></Route>
          <Route
           path="/employee/edit"
           element={
             <Layout>
               <EmployeeEdit/>
             </Layout>
           }
         ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
