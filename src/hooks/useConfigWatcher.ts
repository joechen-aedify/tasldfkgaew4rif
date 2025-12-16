import { type TemplateConfig } from '../config'

// Hardcoded config for deployment (no file watching)
const HARDCODED_CONFIG: TemplateConfig = {
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

/**
 * Hook to return hardcoded config (deployment version)
 * No file watching in deployed version
 */
export const useConfigWatcher = () => {
    // Return hardcoded config immediately (no file watching in deployment)
    return {
        config: HARDCODED_CONFIG,
        lastUpdate: Date.now(),
        reloadConfig: async () => HARDCODED_CONFIG
    }
}
