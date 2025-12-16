import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Bell, Cloudy } from 'lucide-react'
import { type HeaderConfig } from '../config'
import { useConfigWatcher } from '../hooks/useConfigWatcher'
import { useTheme } from '../hooks/useTheme'
import { useAuth } from '../contexts/AuthContext'
import './Header.css'

/**
 * Header component with navigation, notifications, and profile menu
 * Uses Lucide React icons for notification bell and cloud storage
 * Renders based on template_1_config.json with real-time updates
 */
const Header = () => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
    const profileDropdownRef = useRef<HTMLDivElement>(null)
    const { config } = useConfigWatcher()
    const theme = useTheme()
    const { logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const headerConfig: HeaderConfig | null = config?.header || null
    
    // Determine active tab based on current route
    const getActiveTab = () => {
        const path = location.pathname
        const navItem = headerConfig?.headerLinks.find(link => link.path === path)
        return navItem?.name || 'Dashboard'
    }
    const activeTab = getActiveTab()

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen)
    }

    /**
     * Handle logout - clears auth state and navigates to login page
     */
    const handleLogout = () => {
        logout()
        setIsProfileMenuOpen(false)
        navigate('/login', { replace: true })
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleNavClick = (item: string) => {
        // Find the path from config
        const navItem = headerConfig?.headerLinks.find(link => link.name === item)
        if (navItem?.path) {
            navigate(navItem.path)
        } else {
            // Fallback navigation based on item name
            const pathMap: Record<string, string> = {
                'Dashboard': '/dashboard',
                'HR': '/hr',
                'Accounting': '/accounting',
                'R&D': '/rd',
                'IT': '/it',
                'Corporate Legal': '/corporate-legal'
            }
            const path = pathMap[item] || '/dashboard'
            navigate(path)
        }
    }

    // Don't render until config is loaded
    if (!headerConfig) {
        return null
    }

    // Filter visible nav items
    const visibleNavItems = headerConfig.headerLinks.filter(link => link.show)

    return (
        <header className="header-component">
            <div className="header-container">
                {/* Logo and Company Name */}
                <div className="header-logo">
                    {headerConfig.logo.show && (
                    <span className="header-logo-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="6" fill="url(#gradient)" />
                            <rect x="4" y="4" width="16" height="16" rx="4" fill="#fff" opacity="0.2" />
                            <defs>
                                <linearGradient id="gradient" x1="0" y1="0" x2="24" y2="24">
                                    <stop offset="0%" stopColor={theme?.primaryColor || "#6366f1"} />
                                    <stop offset="100%" stopColor={theme?.secondaryColor || "#8b5cf6"} />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                    )}
                    <span className="header-company-name">{headerConfig.companyName}</span>
                </div>

                {/* Right Side */}
                <div className="header-right">
                    {/* Navigation */}
                    <nav className="header-nav">
                        {visibleNavItems.map((link) => (
                            <button
                                key={link.name}
                                className={`header-nav-item ${activeTab === link.name ? 'header-active' : ''}`}
                                onClick={() => handleNavClick(link.name)}
                            >
                                {link.name}
                            </button>
                        ))}
                    </nav>

                    {/* Notification Icons */}
                    <button className="header-icon-button" title="Notifications">
                        <Bell size={20} strokeWidth={2} />
                    </button>

                    <button
                        className="header-icon-button"
                        title="Cloud Storage"
                    >
                        <Cloudy size={20} strokeWidth={2} />
                    </button>

                    {/* Profile Avatar with Dropdown */}
                    <div className="header-profile-dropdown" ref={profileDropdownRef}>
                        <div className="header-profile-avatar" onClick={toggleProfileMenu}>
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                                alt="Profile"
                                className="header-avatar-image"
                            />
                        </div>

                        {isProfileMenuOpen && (
                            <div className="header-profile-menu">
                                <button className="header-menu-item" onClick={() => console.log('Profile')}>
                                    Profile
                                </button>
                                <button className="header-menu-item" onClick={() => console.log('Settings')}>
                                    Settings
                                </button>
                                <hr className="header-menu-divider" />
                                <button className="header-menu-item" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header

