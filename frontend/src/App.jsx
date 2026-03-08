import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'
import ProtectedRoute from './components/UI/ProtectedRoute'

const HomePage = lazy(() => import('./pages/HomePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const EventDetailPage = lazy(() => import('./pages/EventDetailPage'))
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'))
const MissionPage = lazy(() => import('./pages/MissionPage'))

function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/users/:id" element={<ProfilePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
