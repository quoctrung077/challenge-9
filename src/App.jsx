import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import CreateProjectPage from "./pages/CreateProject";
import Member from "./pages/Members";
import Layout from "./Layout/Layout";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/apps-projects-list" element={<Project />} />
          <Route path="/apps-projects-create" element={<CreateProjectPage />} />
          <Route path="/pages-members" element={<Member />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
