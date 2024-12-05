import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProjectPage from "./pages/Project.jsx";
import CreateProjectPage from "./pages/CreateProject.jsx";
import MemberPage from "./pages/Members.jsx";
import Layout from "./layouts/MainLayout.jsx";

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
