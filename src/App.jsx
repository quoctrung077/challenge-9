import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProjectPage from "./pages/project";
import CreateProjectPage from "./pages/createProject";
import MemberPage from "./pages/members";
import Layout from "./layouts/MainLayout";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ProjectPage />} />
          <Route path="/apps-projects-list" element={<ProjectPage />} />
          <Route path="/apps-projects-create" element={<CreateProjectPage />} />
          <Route path="/pages-members" element={<MemberPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
