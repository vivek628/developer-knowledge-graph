import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import DeveloperPage from './pages/DeveloperPage.jsx';
import DevelopersPage from './pages/DevelopersPage.jsx';
import NetworkPage from './pages/NetworkPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import TeamBuilderPage from './pages/TeamBuilderPage.jsx';
import TeamsDashboardPage from './pages/TeamsDashboardPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="developers" element={<DevelopersPage />} />
        <Route path="developers/:developerId" element={<DeveloperPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="skills" element={<CatalogPage type="skills" />} />
        <Route path="technologies" element={<CatalogPage type="technologies" />} />
        <Route path="team-builder" element={<TeamBuilderPage />} />
        <Route path="teams" element={<TeamsDashboardPage />} />
        <Route path="network" element={<NetworkPage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
