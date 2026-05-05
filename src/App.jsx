import { Navigate, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./components/SiteLayout";
import { CareerOpeningPage } from "./pages/CareerOpeningPage";
import { CareerPage } from "./pages/CareerPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { ImprintPage } from "./pages/ImprintPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PrivacyPage } from "./pages/PrivacyPage";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="index.html" element={<Navigate to="/" replace />} />
        <Route path="leistungen" element={<Navigate to="/#leistungen" replace />} />
        <Route path="unser-4g-prinzip" element={<Navigate to="/#prinzip" replace />} />
        <Route path="kontakt" element={<ContactPage />} />
        <Route path="kontakt.html" element={<Navigate to="/kontakt" replace />} />
        <Route path="karriere" element={<CareerPage />} />
        <Route path="karriere/:openingId" element={<CareerOpeningPage />} />
        <Route path="karriere.html" element={<Navigate to="/karriere" replace />} />
        <Route path="impressum" element={<ImprintPage />} />
        <Route path="impressum.html" element={<Navigate to="/impressum" replace />} />
        <Route path="datenschutz" element={<PrivacyPage />} />
        <Route path="datenschutz.html" element={<Navigate to="/datenschutz" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
