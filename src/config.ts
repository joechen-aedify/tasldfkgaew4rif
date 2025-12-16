/**
 * Template configuration loader
 * Loads configuration from template_1_config.json
 */

export interface HeaderConfig {
    companyName: string
    logo: {
        url: string
        show: boolean
    }
    headerLinks: Array<{
        name: string
        path: string
        show: boolean
    }>
}

export interface AnalyticsItem {
    id: string
    name: string
    title: string
    type: 'bar' | 'line' | 'curve' | 'pie' | 'area'
    enabled: boolean
    width: number
    height: number
    order: string | number // Format: "row-column" (e.g., "1-0", "1-1", "2-0") or number for backward compatibility
    color?: string
    purpose?: string
}

export interface DepartmentItem {
    id: string
    name: string
    displayName: string
    enabled: boolean
    icon?: string
    path?: string
    description?: string
}

export interface DashboardConfig {
    layout?: {
        selected: string
    }
    calendar: {
        show: boolean
        showUpcomingEvents: boolean
    }
    analytics: {
        show: boolean
        showAddAnalytics: boolean
        items?: AnalyticsItem[]
    }
    departments: {
        show: boolean
        showAddDepartments: boolean
        items?: DepartmentItem[]
    }
}

export interface ThemeConfig {
    primaryColor: string
    secondaryColor: string
    backgroundColor: string
    cardBackground: string
    textColor: string
    textSecondary: string
    borderColor: string
    accentPurple: string
    accentCyan: string
    accentGreen: string
    accentOrange: string
    accentPink: string
    borderRadius: string
    borderWidth: string
    lightDarkModeToggle: boolean
}

export interface ModuleConfig {
    name: string
    enabled?: boolean
    // Auth base URL (new key basicUrl; keep basicUser for backward compatibility)
    basicUrl?: string
    basicUser?: string
    company_id?: string | number
    testingAccount?: {
        email: string
        password: string
    }
}

export interface TemplateConfig {
    header: HeaderConfig
    theme: ThemeConfig
    dashboard: DashboardConfig
    defaultModules: ModuleConfig[]
}

/**
 * Load configuration with real-time updates
 */
/**
 * Template configuration - Hardcoded for deployment
 * This config was embedded during deployment process at 2025-12-16T20:54:49.771Z
 */
export const loadConfig = async (): Promise<TemplateConfig> => {
    // Return hardcoded config (no file loading in deployment)
    return {
    "header": {
        "companyName": "h1h1",
        "logo": {
            "url": "/logo.png",
            "show": false
        },
        "headerLinks": [
            {
                "name": "Dashboard",
                "path": "/dashboard",
                "show": true
            },
            {
                "name": "HR",
                "path": "/hr",
                "show": true
            },
            {
                "name": "Accounting",
                "path": "/accounting",
                "show": false
            },
            {
                "name": "IT",
                "path": "/it",
                "show": true
            },
            {
                "name": "Corporate Legal",
                "path": "/corporate-legal",
                "show": false
            }
        ]
    },
    "theme": {
        "primaryColor": "#8b5cf6",
        "secondaryColor": "#06b6d4",
        "backgroundColor": "#0a0a0a",
        "cardBackground": "#1a1a1a",
        "textColor": "#ffffff",
        "textSecondary": "#9ca3af",
        "borderColor": "#2a2a2a",
        "accentPurple": "#8b5cf6",
        "accentCyan": "#06b6d4",
        "accentGreen": "#10b981",
        "accentOrange": "#f59e0b",
        "accentPink": "#ec4899",
        "borderRadius": "12px",
        "borderWidth": "1px",
        "lightDarkModeToggle": false
    },
    "dashboard": {
        "layout": {
            "selected": "m1"
        },
        "calendar": {
            "show": true,
            "showUpcomingEvents": true
        },
        "analytics": {
            "show": true,
            "showAddAnalytics": true,
            "items": [
                {
                    "id": "chart_1",
                    "name": "chart_1",
                    "title": "Product Sales",
                    "type": "bar",
                    "enabled": true,
                    "width": 300,
                    "height": 300,
                    "order": "1-0",
                    "color": "#8b5cf6",
                    "purpose": "kpi"
                },
                {
                    "id": "chart_2",
                    "name": "chart_2",
                    "title": "Performance",
                    "type": "line",
                    "enabled": true,
                    "width": 300,
                    "height": 300,
                    "order": "1-1",
                    "color": "#06b6d4",
                    "purpose": "analytics"
                }
            ]
        },
        "departments": {
            "show": true,
            "showAddDepartments": true,
            "items": [
                {
                    "id": "shipping",
                    "name": "shipping",
                    "displayName": "Shipping Management",
                    "enabled": true,
                    "icon": "Package",
                    "path": "/shipping-module",
                    "description": "Manage shipping operations and logistics"
                },
                {
                    "id": "marketing",
                    "name": "marketing",
                    "displayName": "Marketing",
                    "enabled": false,
                    "icon": "Store",
                    "path": "/marketing",
                    "description": "Marketing campaigns and analytics"
                },
                {
                    "id": "sales",
                    "name": "sales",
                    "displayName": "Sales",
                    "enabled": false,
                    "icon": "TrendingUp",
                    "path": "/sales",
                    "description": "Sales management and tracking"
                }
            ]
        }
    },
    "defaultModules": [
        {
            "name": "authentication",
            "basicUrl": "https://authbackend.aedify.ai",
            "company_id": "36",
            "testingAccount": {
                "email": "demo@test.com",
                "password": "PassWord123"
            },
            "basicUser": "https://authbackend.aedify.ai"
        },
        {
            "name": "dashboard"
        }
    ],
    "modulesBackend": [
        {
            "name": "auth",
            "enabled": true
        },
        {
            "name": "hr",
            "enabled": true
        },
        {
            "name": "accounting",
            "enabled": false
        },
        {
            "name": "it",
            "enabled": true
        }
    ],
    "campany_database": {
        "name": "test_1234",
        "enabled": true
    }
} as TemplateConfig
}

