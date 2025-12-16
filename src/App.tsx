import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { useTheme } from './hooks/useTheme'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'
import HR from './components/HR'
import IT from './components/IT'
import ProtectedRoute from './components/ProtectedRoute'
import { useEffect } from 'react'
import './App.css'

/**
 * Theme wrapper component to apply theme
 */
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  useTheme()
  return <>{children}</>
}

/**
 * Auto-navigate to dashboard when authenticated
 */
const AutoNavigate = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // If authenticated and on login/signup page, navigate to dashboard
    if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/dashboard', { replace: true })
    }
    // If not authenticated and on dashboard, navigate to login
    else if (!isAuthenticated && location.pathname === '/dashboard') {
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, location.pathname, navigate])

  return null
}

function App() {
  return (
    <AuthProvider>
      <ThemeWrapper>
        <BrowserRouter>
          <AutoNavigate />
          <div className="app">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hr"
                element={
                  <ProtectedRoute>
                    <HR />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/it"
                element={
                  <ProtectedRoute>
                    <IT />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeWrapper>
    </AuthProvider>
  )
}

export default App
