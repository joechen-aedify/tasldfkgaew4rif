import { useState, useEffect } from 'react'
import { BarChart3, DollarSign, Scale, MonitorDot, Zap, TrendingUp, Store, Headphones, Package, RotateCcw, FolderKanban, Building2, Users, Pencil, Trash2 } from 'lucide-react'
import Header from './Header'
import Calendar from './Calendar'
import ChartWizard from './ChartWizard'
import ChartDisplay from './ChartDisplay'
import { type DashboardConfig } from '../config'
import { useConfigWatcher } from '../hooks/useConfigWatcher'
import './Dashboard.css'

interface StatCard {
    id: string
    type: 'status' | 'finance' | 'balance' | 'server' | 'performance' | 'analytics'
    title: string
    subtitle: string
    value: string
    chartType?: 'bar' | 'line' | 'curve' | 'pie' | 'area'
    color?: string
    servers?: { name: string; status: string }[]
    purpose?: string
    gridColumn?: number
    gridRow?: number
    order?: string | number // Format: "row-column" (e.g., "1-0", "1-1", "2-0") or number
    orderRow?: number // Parsed row number for sorting
    orderCol?: number // Parsed column number for sorting
}

/**
 * Main Dashboard component displaying stats, management cards, calendar and events
 */
const Dashboard = () => {
    const [showCardTypeModal, setShowCardTypeModal] = useState(false)
    const [showChartWizard, setShowChartWizard] = useState(false)
    const [editingCardId, setEditingCardId] = useState<string | null>(null)
    const [showDepartmentModal, setShowDepartmentModal] = useState(false)
    const [statCards, setStatCards] = useState<StatCard[]>(() => {
        // Load stat cards from localStorage, but filter out default Performance chart
        const savedStatCards = localStorage.getItem('dashboard-stat-cards')
        if (!savedStatCards) return []
        const cards: StatCard[] = JSON.parse(savedStatCards)
        // Remove default Performance chart if it exists
        return cards.filter(card => 
            !(card.type === 'performance' && card.title === 'Performance' && card.subtitle === 'System performance')
        )
    })
    const [managementCards, setManagementCards] = useState<string[]>(() => {
        // First, try to load from config file (dashboard.departments.items)
        // Then merge with sessionStorage for backward compatibility
        const sessionCards = sessionStorage.getItem('dashboard-session-cards')
        const sessionCardList = sessionCards ? JSON.parse(sessionCards) : []

        // Get enabled departments from config (will be set after config loads)
        return sessionCardList
    })
    const [resizingCard, setResizingCard] = useState<string | null>(null)
    const [cardSizes, setCardSizes] = useState<Record<string, { width: number; height: number }>>(() => {
        // Load card sizes from localStorage
        const savedCardSizes = localStorage.getItem('dashboard-card-sizes')
        return savedCardSizes ? JSON.parse(savedCardSizes) : {}
    })
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [activeMenu, setActiveMenu] = useState<string | null>(null)
    const [isRightSectionHidden, setIsRightSectionHidden] = useState(false)
    const { config } = useConfigWatcher()
    const dashboardConfig: DashboardConfig | null = config?.dashboard || null


    // Helper function to parse order string "row-column" to numbers
    const parseOrder = (order: string | number): { row: number; col: number } => {
        if (typeof order === 'number') {
            // Backward compatibility: treat as single number
            return { row: order, col: 0 }
        }
        const parts = order.split('-')
        if (parts.length === 2) {
            const row = parseInt(parts[0], 10) || 0
            const col = parseInt(parts[1], 10) || 0
            return { row, col }
        }
        return { row: 0, col: 0 }
    }

    // Load enabled analytics charts from config file and merge with localStorage
    useEffect(() => {
        if (!dashboardConfig?.analytics?.items) return

        // Get enabled analytics items from config and convert to StatCard format
        const configAnalyticsCards: StatCard[] = dashboardConfig.analytics.items
            .filter(item => item.enabled)
            .map(item => {
                const { row, col } = parseOrder(item.order)
                return {
                    id: item.id,
                    type: item.type === 'bar' || item.type === 'line' || item.type === 'curve' || item.type === 'pie' || item.type === 'area'
                        ? (item.purpose === 'analytics' ? 'analytics' : 'status') as StatCard['type']
                        : 'status',
                    title: item.title,
                    subtitle: item.purpose || 'Analytics',
                    value: '', // Will be populated by chart display
                    chartType: item.type,
                    color: item.color,
                    purpose: item.purpose,
                    order: item.order,
                    orderRow: row,
                    orderCol: col
                }
            })
            // Sort by row first, then by column
            .sort((a, b) => {
                if (a.orderRow !== undefined && b.orderRow !== undefined) {
                    if (a.orderRow !== b.orderRow) {
                        return a.orderRow - b.orderRow
                    }
                    if (a.orderCol !== undefined && b.orderCol !== undefined) {
                        return a.orderCol - b.orderCol
                    }
                }
                return 0
            })

        // Update card sizes for config-based cards
        const configCardSizes: Record<string, { width: number; height: number }> = {}
        dashboardConfig.analytics.items
            .filter(item => item.enabled)
            .forEach(item => {
                configCardSizes[item.id] = {
                    width: item.width,
                    height: item.height
                }
            })

        // Merge card sizes: config sizes + existing sizes
        setCardSizes(prev => {
            const merged = { ...prev, ...configCardSizes }
            return merged
        })

        // Get existing stat cards from localStorage (for dynamically added ones)
        const savedStatCards = localStorage.getItem('dashboard-stat-cards')
        const localStorageCards: StatCard[] = savedStatCards ? JSON.parse(savedStatCards) : []

        // Filter out the default Performance chart if it exists
        const filteredLocalStorageCards = localStorageCards.filter(card => 
            !(card.type === 'performance' && card.title === 'Performance' && card.subtitle === 'System performance')
        )

        // Merge: config analytics (always take precedence) + localStorage cards (only if not in config)
        const configCardIds = new Set(configAnalyticsCards.map(card => card.id))
        const localStorageCardsNotInConfig = filteredLocalStorageCards.filter(card => !configCardIds.has(card.id))
        const merged = [...configAnalyticsCards, ...localStorageCardsNotInConfig]

        // Always update to ensure config changes are reflected (config cards override localStorage)
        setStatCards(prev => {
            // Check if config cards have changed (by comparing titles and other properties)
            const configChanged = configAnalyticsCards.some(configCard => {
                const prevCard = prev.find(p => p.id === configCard.id)
                return !prevCard || 
                    prevCard.title !== configCard.title ||
                    prevCard.chartType !== configCard.chartType ||
                    prevCard.color !== configCard.color ||
                    prevCard.purpose !== configCard.purpose
            })
            
            // Also check if cards were added/removed
            const prevIds = new Set(prev.map(c => c.id))
            const mergedIds = new Set(merged.map(c => c.id))
            const idsChanged = prevIds.size !== mergedIds.size || ![...prevIds].every(id => mergedIds.has(id))
            
            if (configChanged || idsChanged) {
                return merged
            }
            return prev
        })
    }, [dashboardConfig?.analytics?.items])

    // Clean up default Performance chart and config-based cards from localStorage
    // Config-based cards should always come from config file, not localStorage
    useEffect(() => {
        if (!dashboardConfig?.analytics?.items) return

        const savedStatCards = localStorage.getItem('dashboard-stat-cards')
        if (savedStatCards) {
            const cards: StatCard[] = JSON.parse(savedStatCards)
            const configCardIds = new Set(dashboardConfig.analytics.items.map(item => item.id))
            
            // Remove: 1) default Performance chart, 2) any cards that exist in config (config always wins)
            const filteredCards = cards.filter(card => {
                // Remove default Performance chart
                if (card.type === 'performance' && card.title === 'Performance' && card.subtitle === 'System performance') {
                    return false
                }
                // Remove cards that exist in config (config file is source of truth)
                if (configCardIds.has(card.id)) {
                    return false
                }
                return true
            })
            
            // Update localStorage if we removed any cards
            if (filteredCards.length !== cards.length) {
                localStorage.setItem('dashboard-stat-cards', JSON.stringify(filteredCards))
            }
        }
    }, [dashboardConfig?.analytics?.items])

    // Load enabled departments from config file and merge with sessionStorage
    useEffect(() => {
        if (!dashboardConfig?.departments?.items) return

        // Get enabled departments from config
        const configDepartments = dashboardConfig.departments.items
            .filter(item => item.enabled)
            .map(item => item.displayName || item.name)

        // Get departments from sessionStorage (for dynamically added ones)
        const sessionCards = sessionStorage.getItem('dashboard-session-cards')
        const sessionCardList = sessionCards ? JSON.parse(sessionCards) : []

        // Merge: config departments + sessionStorage departments (avoid duplicates)
        const merged = [...new Set([...configDepartments, ...sessionCardList])]

        // Only update if different to avoid infinite loops
        setManagementCards(prev => {
            if (JSON.stringify(merged) !== JSON.stringify(prev)) {
                return merged
            }
            return prev
        })
    }, [dashboardConfig?.departments?.items])

    // Update sessionStorage whenever managementCards changes
    useEffect(() => {
        if (managementCards.length > 0) {
            sessionStorage.setItem('dashboard-session-cards', JSON.stringify(managementCards))
        }
    }, [managementCards])

    // Update localStorage whenever statCards changes
    useEffect(() => {
        localStorage.setItem('dashboard-stat-cards', JSON.stringify(statCards))
    }, [statCards])

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            if (activeMenu) {
                setActiveMenu(null)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [activeMenu])

    const toggleDropdown = (cardId: string) => {
        setActiveDropdown(activeDropdown === cardId ? null : cardId)
    }

    const handleEditCard = (cardId: string) => {
        setEditingCardId(cardId)
        setShowChartWizard(true)
        setActiveDropdown(null)
    }

    const handleDeleteCard = (cardId: string) => {
        const updatedCards = statCards.filter(card => card.id !== cardId)
        const updatedSizes = { ...cardSizes }
        delete updatedSizes[cardId]
        setStatCards(updatedCards)
        setCardSizes(updatedSizes)
        localStorage.setItem('dashboard-stat-cards', JSON.stringify(updatedCards))
        localStorage.setItem('dashboard-card-sizes', JSON.stringify(updatedSizes))
        setActiveDropdown(null)
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (activeDropdown && !target.closest('.dashboard-menu-wrapper')) {
                setActiveDropdown(null)
            }
        }

        if (activeDropdown) {
            document.addEventListener('click', handleClickOutside)
        }

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [activeDropdown])

    const handleResizeStart = (cardId: string, e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setResizingCard(cardId)

        const card = e.currentTarget.parentElement as HTMLElement
        const startX = e.clientX
        const startY = e.clientY
        const startWidth = card.offsetWidth
        const startHeight = card.offsetHeight

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.clientX - startX
            const deltaY = moveEvent.clientY - startY

            // Free-form resize - no grid constraints
            const newWidth = Math.max(250, Math.min(startWidth + deltaX, 1400))
            const newHeight = Math.max(200, Math.min(startHeight + deltaY, 800))

            setCardSizes(prev => {
                const updated = {
                    ...prev,
                    [cardId]: { width: newWidth, height: newHeight }
                }
                // Save to localStorage
                localStorage.setItem('dashboard-card-sizes', JSON.stringify(updated))
                return updated
            })
        }

        const handleMouseUp = () => {
            setResizingCard(null)
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    /**
     * Handle department selection - directly navigate to builder
     */
    const handleAddDepartment = (departmentName: string) => {
        setShowDepartmentModal(false)
        // Add the department card to the management grid
        setManagementCards(prev => {
            if (prev.includes(departmentName)) return prev
            return [...prev, departmentName]
        })
    }

    /**
     * Navigate to configured department module
     */
    const handleDepartmentClick = (departmentName: string) => {
        console.log('Navigate to:', departmentName)
        // Add navigation logic here
    }

    /**
     * Handle edit department - navigate to reconfigure
     */
    const handleEditDepartment = (departmentName: string) => {
        setActiveMenu(null)
        console.log('Edit department:', departmentName)
    }

    /**
     * Handle delete department - remove card
     */
    const handleDeleteDepartment = (departmentName: string) => {
        setActiveMenu(null)
        setManagementCards(prev => {
            const updated = prev.filter(card => card !== departmentName)
            sessionStorage.setItem('dashboard-session-cards', JSON.stringify(updated))
            return updated
        })
    }

    /**
     * Toggle menu for a card
     */
    const toggleMenu = (e: React.MouseEvent, title: string) => {
        e.stopPropagation()
        setActiveMenu(activeMenu === title ? null : title)
    }

    const handleAddStatCard = (type: StatCard['type']) => {
        // When clicking "Status Chart", open the wizard instead
        if (type === 'status') {
            setShowChartWizard(true)
            setShowCardTypeModal(false)
            return
        }

        const cardTemplates: Record<StatCard['type'], Omit<StatCard, 'id'>> = {
            status: {
                type: 'status',
                title: 'Status Chart',
                subtitle: 'System status overview',
                value: '47%',
                chartType: 'bar',
                color: '#8b5cf6',
            },
            finance: {
                type: 'finance',
                title: 'Finance Chart',
                subtitle: 'Financial metrics',
                value: '$73K',
                chartType: 'line',
                color: '#10b981',
            },
            balance: {
                type: 'balance',
                title: 'Balance Chart',
                subtitle: 'Account balance',
                value: '$125K',
                chartType: 'curve',
                color: '#06b6d4',
            },
            server: {
                type: 'server',
                title: 'Server Status',
                subtitle: 'Server monitoring',
                value: '',
                servers: [
                    { name: 'Server 1', status: 'Online' },
                    { name: 'Server 2', status: 'Online' },
                    { name: 'Server 3', status: 'Online' },
                    { name: 'Server 4', status: 'Offline' },
                ],
            },
            performance: {
                type: 'performance',
                title: 'Performance',
                subtitle: 'System performance',
                value: '89%',
                chartType: 'bar',
                color: '#f59e0b',
            },
            analytics: {
                type: 'analytics',
                title: 'Analytics',
                subtitle: 'User analytics',
                value: '1.2K',
                chartType: 'line',
                color: '#ec4899',
            },
        }

        const newCard: StatCard = {
            id: `card-${Date.now()}`,
            ...cardTemplates[type],
        }

        setStatCards([...statCards, newCard])
        setShowCardTypeModal(false)
    }

    const handleChartWizardComplete = (config: any) => {
        console.log('Chart Wizard Complete - Config:', config)

        // Generate sample data based on purpose
        const sampleData: Record<string, any> = {
            kpi: { value: '94.5%', color: '#8b5cf6' },
            checkin: { value: '1,234', color: '#06b6d4' },
            sales: { value: '$54.2K', color: '#10b981' },
            traffic: { value: '12.5K', color: '#f59e0b' },
            revenue: { value: '$125K', color: '#ec4899' },
            performance: { value: '89%', color: '#f59e0b' },
        }

        const data = sampleData[config.purpose] || { value: '100', color: '#8b5cf6' }

        if (editingCardId) {
            // Update existing card - preserve all existing properties
            setStatCards(prev => prev.map(card => 
                card.id === editingCardId
                    ? {
                        ...card,
                        title: config.title,
                        subtitle: config.subtitle,
                        chartType: config.chartType as 'bar' | 'line' | 'curve' | 'pie' | 'area',
                        color: config.color || card.color || data.color,
                        purpose: config.purpose,
                        // Preserve order, orderRow, orderCol if they exist
                    }
                    : card
            ))
            setEditingCardId(null)
        } else {
            // Create new card
            const newCard: StatCard = {
                id: `card-${Date.now()}`,
                type: 'status',
                title: config.title,
                subtitle: config.subtitle,
                value: data.value,
                chartType: config.chartType as 'bar' | 'line' | 'curve' | 'pie' | 'area',
                color: data.color,
                purpose: config.purpose,
            }
            setStatCards([...statCards, newCard])
        }

        setShowChartWizard(false)
    }

    const departmentOptions = [
        { name: 'Marketing & Sales', icon: <Store size={32} /> },
        { name: 'Customer Care', icon: <Headphones size={32} /> },
        { name: 'Shipping Management', icon: <Package size={32} /> },
        { name: 'Return Service', icon: <RotateCcw size={32} /> },
        { name: 'Project Management', icon: <FolderKanban size={32} /> },
        { name: 'Data Center', icon: <Building2 size={32} /> },
        { name: 'HR Department', icon: <Users size={32} /> },
        { name: 'Finance', icon: <DollarSign size={32} /> },
    ]

    const toggleRightSection = () => {
        setIsRightSectionHidden(!isRightSectionHidden)
    }

    const upcomingEvents = [
        { id: 1, title: 'Team Meeting', time: '10:00 AM', date: 'Today' },
        { id: 2, title: 'Project Review', time: '2:00 PM', date: 'Today' },
        { id: 3, title: 'Client Call', time: '9:00 AM', date: 'Tomorrow' },
    ]

    // Don't render until config is loaded
    if (!dashboardConfig) {
        return null
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--background-color)' }}>
            {/* Header */}
            <Header />

            <div className="dashboard-container">
                <div className="dashboard-main">
                    {/* Stats Cards Section - only show if enabled in config */}
                    {dashboardConfig.analytics.show && (
                        <div className="dashboard-section">
                            <h2 className="dashboard-section-title">Analytics & Statistics</h2>
                            <div className="dashboard-stats-grid">
                                {statCards
                                    .sort((a, b) => {
                                        // Sort by orderRow and orderCol if available
                                        if (a.orderRow !== undefined && b.orderRow !== undefined) {
                                            if (a.orderRow !== b.orderRow) {
                                                return a.orderRow - b.orderRow
                                            }
                                            if (a.orderCol !== undefined && b.orderCol !== undefined) {
                                                return a.orderCol - b.orderCol
                                            }
                                        }
                                        // Fallback: maintain original order for cards without order
                                        return 0
                                    })
                                    .map((card) => {
                                        const customSize = cardSizes[card.id]
                                        const cardStyle: React.CSSProperties = customSize ? {
                                            width: `${customSize.width}px`,
                                            height: `${customSize.height}px`,
                                        } : {
                                            height: '280px', // Default height for new cards
                                        }

                                        return (
                                            <div
                                                key={card.id}
                                                className={`dashboard-stat-card ${resizingCard === card.id ? 'resizing' : ''}`}
                                                style={cardStyle}
                                            >
                                                <div className="dashboard-card-header">
                                                    <h3 className="dashboard-card-title">{card.title}</h3>
                                                    <div className="dashboard-menu-wrapper">
                                                        <button
                                                            className="dashboard-menu-btn"
                                                            onClick={() => toggleDropdown(card.id)}
                                                        >
                                                            ⋮
                                                        </button>
                                                        {activeDropdown === card.id && (
                                                            <div className="dashboard-dropdown-menu">
                                                                <button
                                                                    className="dashboard-dropdown-item"
                                                                    onClick={() => handleEditCard(card.id)}
                                                                >
                                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                                        <path d="M10.5 1.5L12.5 3.5L4.5 11.5H2.5V9.5L10.5 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="dashboard-dropdown-item dashboard-dropdown-item-danger"
                                                                    onClick={() => handleDeleteCard(card.id)}
                                                                >
                                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                                        <path d="M1.5 3.5H12.5M5.5 6.5V10.5M8.5 6.5V10.5M2.5 3.5L3.5 12.5H10.5L11.5 3.5M5.5 3.5V1.5H8.5V3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {card.servers ? (
                                                    <div className="dashboard-server-list">
                                                        {card.servers.map((server, idx) => (
                                                            <div key={idx} className="dashboard-server-item">
                                                                <div className="dashboard-server-info">
                                                                    <div
                                                                        className={`dashboard-status-dot ${server.status.toLowerCase()}`}
                                                                    ></div>
                                                                    <span className="dashboard-server-name">{server.name}</span>
                                                                </div>
                                                                <span
                                                                    className={`dashboard-server-status ${server.status.toLowerCase()}`}
                                                                >
                                                                    {server.status}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="dashboard-chart">
                                                        <ChartDisplay
                                                            type={card.chartType || 'bar'}
                                                            color={card.color || '#8b5cf6'}
                                                            purpose={card.purpose}
                                                        />
                                                    </div>
                                                )}

                                                {/* Resize Handle */}
                                                <div
                                                    className="dashboard-resize-handle"
                                                    onMouseDown={(e) => handleResizeStart(card.id, e)}
                                                    title="Drag to resize"
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M14 2L2 14M10 2L2 10M14 6L6 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )
                                    })}

                                {/* Add Stat Card Button - only show if enabled in config */}
                                {dashboardConfig.analytics.showAddAnalytics && (
                                    <div
                                        className="dashboard-add-stat-card"
                                        onClick={() => setShowCardTypeModal(true)}
                                    >
                                        <span className="dashboard-plus-icon">+</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Management Cards Section - only show if enabled in config */}
                    {dashboardConfig.departments.show && (
                        <div className="dashboard-section">
                            <h2 className="dashboard-section-title">Departments & Management</h2>
                            <div className="dashboard-management-grid">
                                {managementCards.map((title, index) => (
                                    <div
                                        key={index}
                                        className="dashboard-management-card"
                                        onClick={() => handleDepartmentClick(title)}
                                    >
                                        <button
                                            className="dashboard-card-menu-btn"
                                            onClick={(e) => toggleMenu(e, title)}
                                        >
                                            ⋮
                                        </button>
                                        {activeMenu === title && (
                                            <div className="dashboard-card-menu">
                                                <button
                                                    className="dashboard-card-menu-item"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleEditDepartment(title)
                                                    }}
                                                >
                                                    <Pencil size={16} />
                                                    Edit
                                                </button>
                                                <button
                                                    className="dashboard-card-menu-item delete"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleDeleteDepartment(title)
                                                    }}
                                                >
                                                    <Trash2 size={16} />
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                        <h3 className="dashboard-management-title">
                                            {title}
                                            <span className="dashboard-arrow">→</span>
                                        </h3>
                                    </div>
                                ))}
                                {/* Add Department Card Button - only show if enabled in config */}
                                {dashboardConfig.departments.showAddDepartments && (
                                    <div
                                        className="dashboard-add-card"
                                        onClick={() => setShowDepartmentModal(true)}
                                    >
                                        <span className="dashboard-plus-icon">+</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>

                {/* Right Sidebar - only show if calendar is enabled in config */}
                {dashboardConfig.calendar.show && !isRightSectionHidden && (
                    <div className="dashboard-sidebar">
                        <button
                            className="dashboard-toggle-btn"
                            onClick={toggleRightSection}
                            title="Hide calendar"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                        <Calendar />
                        {/* Upcoming Events - only show if enabled in config */}
                        {dashboardConfig.calendar.showUpcomingEvents && (
                            <div className="dashboard-events">
                                <h3 className="dashboard-events-title">📅 Upcoming Events</h3>
                                <div className="dashboard-events-list">
                                    {upcomingEvents.map((event) => (
                                        <div key={event.id} className="dashboard-event-item">
                                            <h4 className="dashboard-event-title">{event.title}</h4>
                                            <p className="dashboard-event-time">
                                                🕐 {event.time} • {event.date}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Toggle button when hidden */}
                {dashboardConfig.calendar.show && isRightSectionHidden && (
                    <button
                        className="dashboard-toggle-btn dashboard-toggle-btn-fixed"
                        onClick={toggleRightSection}
                        title="Show calendar"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                    </button>
                )}
            </div>

            {/* Chart Wizard */}
            {showChartWizard && (
                <ChartWizard
                    onComplete={handleChartWizardComplete}
                    onCancel={() => {
                        setShowChartWizard(false)
                        setEditingCardId(null)
                    }}
                    initialConfig={editingCardId ? (() => {
                        const card = statCards.find(c => c.id === editingCardId)
                        return card ? {
                            title: card.title,
                            subtitle: card.subtitle,
                            chartType: card.chartType,
                            purpose: card.purpose,
                            color: card.color
                        } : undefined
                    })() : undefined}
                />
            )}

            {/* Card Type Selection Modal */}
            {showCardTypeModal && (
                <div className="dashboard-modal-overlay" onClick={() => setShowCardTypeModal(false)}>
                    <div className="dashboard-modal dashboard-card-type-modal" onClick={(e) => e.stopPropagation()}>
                        <h2 className="dashboard-modal-title">Select Type</h2>
                        <div className="dashboard-card-types">
                            <button
                                className="dashboard-card-type-option"
                                onClick={() => handleAddStatCard('status')}
                            >
                                <span className="dashboard-card-type-icon"><BarChart3 size={32} /></span>
                                <span className="dashboard-card-type-name">Status Charts</span>
                                <span className="dashboard-card-type-desc">System status overview</span>
                            </button>
                            <button
                                className="dashboard-card-type-option"
                                onClick={() => handleAddStatCard('finance')}
                            >
                                <span className="dashboard-card-type-icon"><DollarSign size={32} /></span>
                                <span className="dashboard-card-type-name">Finance</span>
                                <span className="dashboard-card-type-desc">Financial metrics</span>
                            </button>
                            <button
                                className="dashboard-card-type-option"
                                onClick={() => handleAddStatCard('balance')}
                            >
                                <span className="dashboard-card-type-icon"><Scale size={32} /></span>
                                <span className="dashboard-card-type-name">Balance Chart</span>
                                <span className="dashboard-card-type-desc">Account balance</span>
                            </button>
                            <button
                                className="dashboard-card-type-option"
                                onClick={() => handleAddStatCard('server')}
                            >
                                <span className="dashboard-card-type-icon"><MonitorDot size={32} /></span>
                                <span className="dashboard-card-type-name">Server Status</span>
                                <span className="dashboard-card-type-desc">Server monitoring</span>
                            </button>
                            <button
                                className="dashboard-card-type-option"
                                onClick={() => handleAddStatCard('performance')}
                            >
                                <span className="dashboard-card-type-icon"><Zap size={32} /></span>
                                <span className="dashboard-card-type-name">Performance</span>
                                <span className="dashboard-card-type-desc">System performance</span>
                            </button>
                            <button
                                className="dashboard-card-type-option"
                                onClick={() => handleAddStatCard('analytics')}
                            >
                                <span className="dashboard-card-type-icon"><TrendingUp size={32} /></span>
                                <span className="dashboard-card-type-name">Analytics</span>
                                <span className="dashboard-card-type-desc">User analytics</span>
                            </button>
                        </div>
                        <button
                            className="dashboard-modal-cancel dashboard-modal-cancel-full"
                            onClick={() => setShowCardTypeModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Department Selection Modal */}
            {showDepartmentModal && (
                <div className="dashboard-modal-overlay" onClick={() => setShowDepartmentModal(false)}>
                    <div className="dashboard-modal dashboard-card-type-modal" onClick={(e) => e.stopPropagation()}>
                        <h2 className="dashboard-modal-title">Select Department</h2>
                        <div className="dashboard-card-types">
                            {departmentOptions.map((dept) => (
                                <button
                                    key={dept.name}
                                    className="dashboard-card-type-option"
                                    onClick={() => handleAddDepartment(dept.name)}
                                >
                                    <span className="dashboard-card-type-icon">{dept.icon}</span>
                                    <span className="dashboard-card-type-name">{dept.name}</span>
                                </button>
                            ))}
                        </div>
                        <button
                            className="dashboard-modal-cancel dashboard-modal-cancel-full"
                            onClick={() => setShowDepartmentModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard

