import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Project from "./pages/project";
import CreateProjectPage from "./pages/createProject";
import Member from "./pages/members";
import Layout from "./layout/layout";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Project />} />
          <Route path="/apps-projects-list" element={<Project />} />
          <Route path="/apps-projects-create" element={<CreateProjectPage />} />
          <Route path="/pages-members" element={<Member />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
