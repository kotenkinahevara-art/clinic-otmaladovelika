import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './pages/SiteLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import ReviewsPage from './pages/ReviewsPage.jsx'
import ArticlesPage from './pages/ArticlesPage.jsx'
import AppointmentPage from './pages/AppointmentPage.jsx'
import ContactsPage from './pages/ContactsPage.jsx'
import DalneeKonstantinovoPage from './pages/DalneeKonstantinovoPage.jsx'

function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/o-klinike" element={<AboutPage />} />
        <Route path="/uslugi" element={<ServicesPage />} />
        <Route path="/otzyvy" element={<ReviewsPage />} />
        <Route path="/stati" element={<ArticlesPage />} />
        <Route path="/zapis" element={<AppointmentPage />} />
        <Route path="/kontakty" element={<ContactsPage />} />
        <Route path="/vetklinika-v-dalnem-konstantinove" element={<DalneeKonstantinovoPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteLayout>
  )
}

export default App
