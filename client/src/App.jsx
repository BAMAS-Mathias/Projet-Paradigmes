import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./layout/Layout";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
