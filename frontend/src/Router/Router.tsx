import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../Layout";
import HomePage from "../Pages/HomePage";
import LibraryPage from "../Pages/LibraryPage";
import PersonalPage from "../Pages/PersonalPage";
import CustomersPage from "../Pages/CustomersPage";
import PublishersPage from "../Pages/PublishersPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/personal" element={<PersonalPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/publishers" element={<PublishersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}