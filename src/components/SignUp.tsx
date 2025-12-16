import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../hooks/useTheme'
import './Login.css'

/**
 * SignUp component for creating new accounts
 * Validates input and handles account creation flow
 */
const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { signup, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    useTheme() // Apply theme

    // Redirect to dashboard if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true })
        }
    }, [isAuthenticated, navigate])

    /**
     * Handle form submission
     * Validates credentials and creates account, then navigates to dashboard
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        // Validate password match
        if (password !== confirmPassword) {
            setError('Passwords do not match. Please try again.')
            return
        }

        // Validate password requirements: minimum 8 characters, uppercase, lowercase, number
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.')
            return
        }

        const hasUpperCase = /[A-Z]/.test(password)
        const hasLowerCase = /[a-z]/.test(password)
        const hasNumber = /[0-9]/.test(password)

        if (!hasUpperCase || !hasLowerCase || !hasNumber) {
            setError('Password must contain at least one uppercase letter, one lowercase letter, and one number.')
            return
        }

        setIsLoading(true)

        try {
            const success = await signup(email, password)

            if (success) {
                navigate('/dashboard', { replace: true })
            } else {
                setError('Failed to create account. Please try again.')
            }
        } catch (err) {
            setError('An error occurred during sign up. Please try again.')
            console.error('Signup error:', err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-title">Create Account</h1>
                    <p className="login-subtitle">Sign up to get started</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="login-error" role="alert">
                            {error}
                        </div>
                    )}

                    <div className="login-field">
                        <label htmlFor="signup-email" className="login-label">
                            Email Address
                        </label>
                        <input
                            id="signup-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="login-input"
                            placeholder="Enter your email"
                            required
                            autoComplete="email"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="signup-password" className="login-label">
                            Password
                        </label>
                        <input
                            id="signup-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                            placeholder="Enter your password (min. 8 characters)"
                            required
                            autoComplete="new-password"
                            disabled={isLoading}
                            minLength={8}
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="confirm-password" className="login-label">
                            Confirm Password
                        </label>
                        <input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="login-input"
                            placeholder="Confirm your password"
                            required
                            autoComplete="new-password"
                            disabled={isLoading}
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={isLoading || !email || !password || !confirmPassword}
                    >
                        {isLoading ? 'Creating account...' : 'Create Account'}
                    </button>

                    <div className="login-footer">
                        <p className="login-footer-text">
                            Already have an account?{' '}
                            <Link to="/login" className="login-link">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp

