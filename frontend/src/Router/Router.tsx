import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../Layout";
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import LibraryPage from "../Pages/LibraryPage";
import PersonalPage from "../Pages/PersonalPage";
import CustomersPage from "../Pages/CustomersPage";
import PublishersPage from "../Pages/PublishersPage";
import ProtectedRoute from "./ProtectedRoute";
import RegisterPage from "../Pages/RegisterPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/app" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="personal" element={<PersonalPage />} />

          <Route element={<ProtectedRoute allowedRoles={["employee"]} />}>
            <Route path="customers" element={<CustomersPage />} />
            <Route path="publishers" element={<PublishersPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}