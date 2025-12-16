# 📋 Template Configuration Guide

## Overview

The `template_1_config.json` file is a powerful configuration system that allows you to customize every aspect of your template without writing code. Changes are applied **in real-time** (within ~2 seconds) while the development server is running.

**Config File Location:**
```
/Users/jianzhang/eaCreator/template_1/public/template_1_config.json
```

---

## 🎯 Configuration Structure

The config file has 4 main sections:

1. **Header** - Company branding and navigation
2. **Theme** - Colors and visual styling
3. **Dashboard** - Dashboard layout and modules
4. **Default Modules** - System-wide feature toggles

---

## 1. Header Configuration

Controls the top navigation bar, company branding, and logo.

### 1.1 Company Name

```json
{
  "header": {
    "companyName": "Demo"
  }
}
```

**Property:** `header.companyName`  
**Type:** `string`  
**Description:** Company name displayed in the header next to the logo  
**Example Values:**
- `"Demo"`
- `"Acme Corporation"`
- `"My Business"`

**Effect:** Updates the text in the header immediately

---

### 1.2 Logo Configuration

```json
{
  "header": {
    "logo": {
      "url": "/logo.png",
      "show": false
    }
  }
}
```

#### 1.2.1 Logo URL

**Property:** `header.logo.url`  
**Type:** `string`  
**Description:** Path to the logo image file  
**Example Values:**
- `"/logo.png"` - File in public folder
- `"/assets/logo.svg"` - SVG logo
- `"https://example.com/logo.png"` - External URL

**Note:** Currently not implemented in rendering, but reserved for future use.

#### 1.2.2 Logo Visibility

**Property:** `header.logo.show`  
**Type:** `boolean`  
**Description:** Controls whether the logo icon is displayed  
**Values:**
- `true` - Show logo icon + company name
- `false` - Show company name only

**Effect:**
- `true`: Displays gradient square icon + company name
- `false`: Hides icon, shows only company name

---

### 1.3 Header Navigation Links

```json
{
  "header": {
    "headerLinks": [
      {
        "name": "Dashboard",
        "path": "/dashboard",
        "show": true
      }
    ]
  }
}
```

**Property:** `header.headerLinks`  
**Type:** `array` of navigation items  
**Description:** Navigation menu items in the header

#### Navigation Item Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `name` | string | Display text for the nav item | `"Dashboard"` |
| `path` | string | URL path (for future routing) | `"/dashboard"` |
| `show` | boolean | Whether to display this item | `true` |

#### Default Navigation Items

```json
{
  "headerLinks": [
    { "name": "Dashboard", "path": "/dashboard", "show": true },
    { "name": "HR", "path": "/hr", "show": true },
    { "name": "Accounting", "path": "/accounting", "show": true },
    { "name": "IT", "path": "/it", "show": true },
    { "name": "Corporate Legal", "path": "/corporate-legal", "show": true }
  ]
}
```

#### How to Modify Navigation

**Add a new navigation item:**
```json
{
  "name": "Sales",
  "path": "/sales",
  "show": true
}
```

**Hide a navigation item:**
```json
{
  "name": "IT",
  "path": "/it",
  "show": false  // This will hide the IT tab
}
```

**Rename a navigation item:**
```json
{
  "name": "Human Resources",  // Changed from "HR"
  "path": "/hr",
  "show": true
}
```

**Reorder navigation items:** Simply rearrange the array items in the order you want them to appear.

---

## 2. Theme Configuration

Controls all colors, borders, and visual styling. All changes apply in real-time using CSS variables.

```json
{
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
  }
}
```

### 2.1 Primary Colors

#### Primary Color

**Property:** `theme.primaryColor`  
**Type:** `string` (hex color)  
**Description:** Main brand color used for active states, buttons, and key UI elements  
**Default:** `"#8b5cf6"` (Purple)  
**Used For:**
- Active navigation tab background
- Button primary color
- Logo gradient (start color)
- Focus states
- Progress indicators

**Example Values:**
```json
"primaryColor": "#3b82f6"  // Blue
"primaryColor": "#10b981"  // Green
"primaryColor": "#ef4444"  // Red
"primaryColor": "#f59e0b"  // Orange
```

#### Secondary Color

**Property:** `theme.secondaryColor`  
**Type:** `string` (hex color)  
**Description:** Secondary brand color for accents and hover states  
**Default:** `"#06b6d4"` (Cyan)  
**Used For:**
- Logo gradient (end color)
- Secondary buttons
- Accent elements
- Link hover states

---

### 2.2 Background Colors

#### Main Background

**Property:** `theme.backgroundColor`  
**Type:** `string` (hex color)  
**Description:** Main page background color  
**Default:** `"#0a0a0a"` (Nearly Black)  
**Used For:**
- Page background
- Header background
- Main container background

**Example Values:**
```json
"backgroundColor": "#000000"  // Pure black
"backgroundColor": "#0f172a"  // Dark blue-gray
"backgroundColor": "#1a1a1a"  // Dark gray
```

#### Card Background

**Property:** `theme.cardBackground`  
**Type:** `string` (hex color)  
**Description:** Background color for cards, panels, and containers  
**Default:** `"#1a1a1a"` (Dark Gray)  
**Used For:**
- Stat cards
- Management cards
- Calendar widget
- Modal backgrounds
- Panel backgrounds

**Best Practice:** Should be lighter than `backgroundColor` for visual hierarchy.

---

### 2.3 Text Colors

#### Primary Text

**Property:** `theme.textColor`  
**Type:** `string` (hex color)  
**Description:** Main text color for headings, titles, and primary content  
**Default:** `"#ffffff"` (White)  
**Used For:**
- Headings
- Card titles
- Navigation text (active)
- Button text
- Primary labels

#### Secondary Text

**Property:** `theme.textSecondary`  
**Type:** `string` (hex color)  
**Description:** Muted text color for secondary content and descriptions  
**Default:** `"#9ca3af"` (Light Gray)  
**Used For:**
- Descriptions
- Helper text
- Inactive navigation items
- Timestamps
- Metadata

**Best Practice:** Should have lower contrast than `textColor` for visual hierarchy.

---

### 2.4 Border & Layout

#### Border Color

**Property:** `theme.borderColor`  
**Type:** `string` (hex color)  
**Description:** Color for borders, dividers, and separators  
**Default:** `"#2a2a2a"` (Dark Border)  
**Used For:**
- Card borders
- Divider lines
- Input borders
- Panel separators

#### Border Radius

**Property:** `theme.borderRadius`  
**Type:** `string` (CSS length)  
**Description:** Roundness of corners for cards and buttons  
**Default:** `"12px"`  
**Example Values:**
```json
"borderRadius": "0px"     // Square corners
"borderRadius": "8px"     // Slightly rounded
"borderRadius": "16px"    // Very rounded
"borderRadius": "24px"    // Pill-shaped
```

#### Border Width

**Property:** `theme.borderWidth`  
**Type:** `string` (CSS length)  
**Description:** Thickness of borders  
**Default:** `"1px"`  
**Example Values:**
```json
"borderWidth": "0px"      // No borders
"borderWidth": "2px"      // Thicker borders
"borderWidth": "3px"      // Bold borders
```

---

### 2.5 Accent Colors (Charts & Indicators)

These colors are used for data visualization, charts, and status indicators.

#### Accent Purple

**Property:** `theme.accentPurple`  
**Type:** `string` (hex color)  
**Default:** `"#8b5cf6"`  
**Used For:** Analytics, KPIs, performance metrics

#### Accent Cyan

**Property:** `theme.accentCyan`  
**Type:** `string` (hex color)  
**Default:** `"#06b6d4"`  
**Used For:** Departments, secondary metrics

#### Accent Green

**Property:** `theme.accentGreen`  
**Type:** `string` (hex color)  
**Default:** `"#10b981"`  
**Used For:** Success states, positive metrics, online status

#### Accent Orange

**Property:** `theme.accentOrange`  
**Type:** `string` (hex color)  
**Default:** `"#f59e0b"`  
**Used For:** Warnings, pending states, performance indicators

#### Accent Pink

**Property:** `theme.accentPink`  
**Type:** `string` (hex color)  
**Default:** `"#ec4899"`  
**Used For:** Special metrics, highlights

**Best Practice:** Keep these colors distinct for clear data differentiation.

---

### 2.6 Light/Dark Mode Toggle

**Property:** `theme.lightDarkModeToggle`  
**Type:** `boolean`  
**Description:** Enable/disable light/dark mode switching  
**Default:** `false`  
**Values:**
- `true` - Show light/dark mode toggle (not yet implemented)
- `false` - Hide toggle, use theme colors as-is

**Status:** Reserved for future implementation

---

### 2.7 Theme Presets

Here are some ready-to-use theme combinations:

#### Dark Purple (Default)
```json
{
  "primaryColor": "#8b5cf6",
  "secondaryColor": "#06b6d4",
  "backgroundColor": "#0a0a0a",
  "cardBackground": "#1a1a1a",
  "textColor": "#ffffff",
  "textSecondary": "#9ca3af"
}
```

#### Professional Blue
```json
{
  "primaryColor": "#3b82f6",
  "secondaryColor": "#06b6d4",
  "backgroundColor": "#0f172a",
  "cardBackground": "#1e293b",
  "textColor": "#f1f5f9",
  "textSecondary": "#94a3b8"
}
```

#### Modern Green
```json
{
  "primaryColor": "#10b981",
  "secondaryColor": "#3b82f6",
  "backgroundColor": "#0a0a0a",
  "cardBackground": "#1a1a1a",
  "textColor": "#ffffff",
  "textSecondary": "#9ca3af"
}
```

#### Vibrant Red
```json
{
  "primaryColor": "#ef4444",
  "secondaryColor": "#f59e0b",
  "backgroundColor": "#1a1a1a",
  "cardBackground": "#2a2a2a",
  "textColor": "#ffffff",
  "textSecondary": "#9ca3af"
}
```

#### Light Mode (Experimental)
```json
{
  "primaryColor": "#6366f1",
  "secondaryColor": "#06b6d4",
  "backgroundColor": "#ffffff",
  "cardBackground": "#f9fafb",
  "textColor": "#111827",
  "textSecondary": "#6b7280",
  "borderColor": "#e5e7eb"
}
```

---

## 3. Dashboard Configuration

Controls the layout and visibility of dashboard sections and features.

```json
{
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
      "showAddAnalytics": true
    },
    "departments": {
      "show": true,
      "showAddDepartments": true
    }
  }
}
```

### 3.1 Layout Selection

**Property:** `dashboard.layout.selected`  
**Type:** `string`  
**Description:** Selects which layout template to use for the dashboard  
**Default:** `"m1"`  
**Available Layouts:**
- `"m1"` - Default 3-column layout (Analytics | Departments | Calendar)
- `"m2"` to `"m10"` - Reserved for future layout templates

**Effect:** Changes the overall dashboard structure and module positioning.

---

### 3.2 Calendar Module

Controls the calendar widget in the right sidebar.

```json
{
  "calendar": {
    "show": true,
    "showUpcomingEvents": true
  }
}
```

#### Show Calendar

**Property:** `dashboard.calendar.show`  
**Type:** `boolean`  
**Description:** Controls visibility of the calendar widget  
**Values:**
- `true` - Show calendar in right sidebar
- `false` - Hide entire calendar widget

#### Show Upcoming Events

**Property:** `dashboard.calendar.showUpcomingEvents`  
**Type:** `boolean`  
**Description:** Controls visibility of the upcoming events list below calendar  
**Values:**
- `true` - Show "Upcoming Events" section
- `false` - Hide upcoming events list

**Note:** If `calendar.show` is `false`, this setting has no effect.

---

### 3.3 Analytics Module

Controls the "Analytics & Statistics" section.

```json
{
  "analytics": {
    "show": true,
    "showAddAnalytics": true
  }
}
```

#### Show Analytics Section

**Property:** `dashboard.analytics.show`  
**Type:** `boolean`  
**Description:** Controls visibility of the entire Analytics section  
**Values:**
- `true` - Show "Analytics & Statistics" section
- `false` - Hide entire analytics section

#### Show Add Analytics Button

**Property:** `dashboard.analytics.showAddAnalytics`  
**Type:** `boolean`  
**Description:** Controls visibility of the "+ Add Analytics" button  
**Values:**
- `true` - Show button to add new analytics cards
- `false` - Hide the add button (view-only mode)

**Note:** If `analytics.show` is `false`, this setting has no effect.

---

### 3.4 Departments Module

Controls the "Departments & Management" section.

```json
{
  "departments": {
    "show": true,
    "showAddDepartments": true
  }
}
```

#### Show Departments Section

**Property:** `dashboard.departments.show`  
**Type:** `boolean`  
**Description:** Controls visibility of the entire Departments section  
**Values:**
- `true` - Show "Departments & Management" section
- `false` - Hide entire departments section

#### Show Add Department Button

**Property:** `dashboard.departments.showAddDepartments`  
**Type:** `boolean`  
**Description:** Controls visibility of the "+ Add Department" button  
**Values:**
- `true` - Show button to add new departments
- `false` - Hide the add button (view-only mode)

**Note:** If `departments.show` is `false`, this setting has no effect.

---

### 3.5 Dashboard Layout Examples

#### Full Dashboard (All Modules Enabled)
```json
{
  "dashboard": {
    "layout": { "selected": "m1" },
    "calendar": { "show": true, "showUpcomingEvents": true },
    "analytics": { "show": true, "showAddAnalytics": true },
    "departments": { "show": true, "showAddDepartments": true }
  }
}
```
**Result:** Shows all sections with add buttons

#### View-Only Dashboard
```json
{
  "dashboard": {
    "layout": { "selected": "m1" },
    "calendar": { "show": true, "showUpcomingEvents": true },
    "analytics": { "show": true, "showAddAnalytics": false },
    "departments": { "show": true, "showAddDepartments": false }
  }
}
```
**Result:** Shows all sections but hides add buttons

#### Analytics-Focused Dashboard
```json
{
  "dashboard": {
    "layout": { "selected": "m1" },
    "calendar": { "show": false, "showUpcomingEvents": false },
    "analytics": { "show": true, "showAddAnalytics": true },
    "departments": { "show": false, "showAddDepartments": false }
  }
}
```
**Result:** Shows only analytics section, hides calendar and departments

#### Simple Calendar Dashboard
```json
{
  "dashboard": {
    "layout": { "selected": "m1" },
    "calendar": { "show": true, "showUpcomingEvents": false },
    "analytics": { "show": false, "showAddAnalytics": false },
    "departments": { "show": false, "showAddDepartments": false }
  }
}
```
**Result:** Shows only calendar without events list

---

## 4. Default Modules

System-wide feature toggles for major application modules.

```json
{
  "defaultModules": [
    { "name": "authentication" },
    { "name": "dashboard" }
  ]
}
```

**Property:** `defaultModules`  
**Type:** `array` of module objects  
**Description:** List of enabled application modules

### Module Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `name` | string | Module identifier | `"authentication"` |

### Available Modules

#### Authentication Module

```json
{ "name": "authentication" }
```
**Description:** User login, registration, and session management  
**Status:** Reserved for future implementation

#### Dashboard Module

```json
{ "name": "dashboard" }
```
**Description:** Main dashboard with analytics and departments  
**Status:** Currently active

### Adding New Modules

To enable additional modules in the future:

```json
{
  "defaultModules": [
    { "name": "authentication" },
    { "name": "dashboard" },
    { "name": "reports" },
    { "name": "settings" },
    { "name": "users" }
  ]
}
```

**Note:** Module implementation must exist in the codebase for this to work.

---

## 5. Common Use Cases

### Use Case 1: Rebrand the Application

**Goal:** Change company name and colors to match your brand

```json
{
  "header": {
    "companyName": "Acme Corp",
    "logo": { "url": "/logo.png", "show": true }
  },
  "theme": {
    "primaryColor": "#ff6b6b",      // Acme red
    "secondaryColor": "#4ecdc4",     // Acme teal
    "backgroundColor": "#1a1a2e",
    "cardBackground": "#16213e"
  }
}
```

---

### Use Case 2: Create a View-Only Dashboard

**Goal:** Disable all editing capabilities

```json
{
  "dashboard": {
    "analytics": { "show": true, "showAddAnalytics": false },
    "departments": { "show": true, "showAddDepartments": false }
  }
}
```

---

### Use Case 3: Minimal Analytics Dashboard

**Goal:** Show only analytics, no calendar or departments

```json
{
  "dashboard": {
    "calendar": { "show": false },
    "analytics": { "show": true, "showAddAnalytics": true },
    "departments": { "show": false }
  }
}
```

---

### Use Case 4: Custom Navigation

**Goal:** Add industry-specific navigation items

```json
{
  "header": {
    "headerLinks": [
      { "name": "Dashboard", "path": "/dashboard", "show": true },
      { "name": "Patients", "path": "/patients", "show": true },
      { "name": "Appointments", "path": "/appointments", "show": true },
      { "name": "Billing", "path": "/billing", "show": true },
      { "name": "Reports", "path": "/reports", "show": true }
    ]
  }
}
```

---

### Use Case 5: Light Mode Theme

**Goal:** Convert to a light color scheme

```json
{
  "theme": {
    "primaryColor": "#6366f1",
    "secondaryColor": "#06b6d4",
    "backgroundColor": "#ffffff",
    "cardBackground": "#f9fafb",
    "textColor": "#111827",
    "textSecondary": "#6b7280",
    "borderColor": "#e5e7eb"
  }
}
```

---

## 6. AI Assistant Prompts

Here are example prompts you can give to an AI assistant to modify the config:

### Example 1: Change Theme Colors
```
"Change the primary color to blue (#3b82f6) and secondary color to green (#10b981) in the template_1_config.json"
```

### Example 2: Hide Sections
```
"Hide the calendar and upcoming events section from the dashboard"
```

### Example 3: Modify Navigation
```
"Add a 'Reports' navigation item between 'Accounting' and 'IT' in the header"
```

### Example 4: Rebrand
```
"Change the company name to 'TechCorp' and set the primary color to red (#ef4444)"
```

### Example 5: Layout Changes
```
"Show only the analytics section and hide both departments and calendar"
```

### Example 6: View-Only Mode
```
"Disable all 'Add' buttons in the dashboard while keeping all sections visible"
```

### Example 7: Custom Colors
```
"Apply a dark blue theme with backgroundColor #0f172a, cardBackground #1e293b, and primaryColor #3b82f6"
```

---

## 7. Technical Details

### 7.1 Real-Time Updates

The config system uses:
- **Polling Interval:** 2 seconds
- **Cache Busting:** Timestamp-based query parameters
- **CSS Variables:** For instant theme updates
- **React Hooks:** `useConfigWatcher` and `useTheme`

### 7.2 File Location

**Config File:**
```
/Users/jianzhang/eaCreator/template_1/public/template_1_config.json
```

**Must be in:** `public/` folder for Vite to serve it

### 7.3 Config Loading

```typescript
// Loaded via fetch API with cache busting
fetch(`/template_1_config.json?t=${timestamp}`, {
  cache: 'no-cache',
  headers: { 'Cache-Control': 'no-cache' }
})
```

### 7.4 Theme Application

Colors are applied via CSS variables to `:root`:

```css
:root {
  --primary-color: #8b5cf6;
  --secondary-color: #06b6d4;
  --background-color: #0a0a0a;
  /* ... etc */
}
```

Components reference these variables:

```css
.header-nav-item.active {
  background-color: var(--primary-color);
}
```

### 7.5 Validation

The config file must be valid JSON. Use a JSON validator if you encounter errors.

**Common Issues:**
- Missing commas between properties
- Trailing commas (not allowed in JSON)
- Missing quotes around strings
- Invalid color formats (must be hex: `#RRGGBB`)

---

## 8. Troubleshooting

### Changes Not Appearing?

1. **Check JSON syntax:** Use a JSON validator
2. **Hard refresh:** Press `Cmd/Ctrl + Shift + R`
3. **Check console:** Look for error messages
4. **Verify file location:** Must be in `public/` folder
5. **Wait 2 seconds:** Config polls every 2 seconds

### Console Messages

**Success:**
```
✅ Config loaded successfully: Demo | Nav: Dashboard, HR, Accounting, IT, Corporate Legal
🎨 Theme applied: { primary: "#8b5cf6", secondary: "#06b6d4", background: "#0a0a0a" }
```

**Error:**
```
❌ Config file not found, using defaults
⚠️ Could not load config from parent, using defaults
```

### Color Not Changing?

Some colors are hardcoded in components and haven't been converted to use CSS variables yet. Check the implementation files:
- `src/components/Dashboard.css`
- `src/components/Header.css`
- `src/components/Calendar.css`

### Navigation Not Routing?

The navigation is currently display-only. Routing implementation is planned for future releases.

---

## 9. Future Enhancements

Features planned for future releases:

- [ ] Light/dark mode toggle functionality
- [ ] More layout templates (m2-m10)
- [ ] Custom logo image rendering
- [ ] Active routing for navigation
- [ ] Module system implementation
- [ ] Per-module configuration
- [ ] Export/import config presets
- [ ] Config validation UI
- [ ] Real-time preview without server restart

---

## 10. JSON Schema

For IDE autocomplete and validation, here's the JSON schema:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["header", "theme", "dashboard", "defaultModules"],
  "properties": {
    "header": {
      "type": "object",
      "properties": {
        "companyName": { "type": "string" },
        "logo": {
          "type": "object",
          "properties": {
            "url": { "type": "string" },
            "show": { "type": "boolean" }
          }
        },
        "headerLinks": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": { "type": "string" },
              "path": { "type": "string" },
              "show": { "type": "boolean" }
            }
          }
        }
      }
    },
    "theme": {
      "type": "object",
      "properties": {
        "primaryColor": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" },
        "secondaryColor": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" },
        "backgroundColor": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" },
        "cardBackground": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" },
        "textColor": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" },
        "textSecondary": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" },
        "borderColor": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" },
        "accentPurple": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" },
        "accentCyan": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" },
        "accentGreen": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" },
        "accentOrange": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" },
        "accentPink": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" },
        "borderRadius": { "type": "string" },
        "borderWidth": { "type": "string" },
        "lightDarkModeToggle": { "type": "boolean" }
      }
    },
    "dashboard": {
      "type": "object",
      "properties": {
        "layout": {
          "type": "object",
          "properties": {
            "selected": { "type": "string", "enum": ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "m10"] }
          }
        },
        "calendar": {
          "type": "object",
          "properties": {
            "show": { "type": "boolean" },
            "showUpcomingEvents": { "type": "boolean" }
          }
        },
        "analytics": {
          "type": "object",
          "properties": {
            "show": { "type": "boolean" },
            "showAddAnalytics": { "type": "boolean" }
          }
        },
        "departments": {
          "type": "object",
          "properties": {
            "show": { "type": "boolean" },
            "showAddDepartments": { "type": "boolean" }
          }
        }
      }
    },
    "defaultModules": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" }
        }
      }
    }
  }
}
```

---

## 11. Quick Reference

### Config Properties Cheat Sheet

| Property | Type | Default | Effect |
|----------|------|---------|--------|
| `header.companyName` | string | "Demo" | Company name in header |
| `header.logo.show` | boolean | false | Show/hide logo icon |
| `theme.primaryColor` | color | #8b5cf6 | Main brand color |
| `theme.backgroundColor` | color | #0a0a0a | Page background |
| `theme.textColor` | color | #ffffff | Main text color |
| `dashboard.layout.selected` | string | "m1" | Layout template |
| `dashboard.calendar.show` | boolean | true | Show calendar |
| `dashboard.analytics.show` | boolean | true | Show analytics |
| `dashboard.departments.show` | boolean | true | Show departments |

---

## 12. Support

### Getting Help

If you encounter issues:

1. Check JSON syntax with a validator
2. Review console messages in browser DevTools
3. Verify file is in `public/` folder
4. Hard refresh browser (Cmd/Ctrl + Shift + R)
5. Check this documentation for examples

### File Issues

**Config file must be:**
- Named: `template_1_config.json`
- Location: `template_1/public/`
- Format: Valid JSON
- Encoding: UTF-8

---

## 🎉 Summary

This configuration system allows you to customize your template without writing any code:

✅ **Real-time updates** - Changes appear within 2 seconds  
✅ **Full theme control** - Colors, borders, spacing  
✅ **Module toggling** - Show/hide dashboard sections  
✅ **Navigation customization** - Add/remove/rename nav items  
✅ **Layout selection** - Choose different dashboard layouts  
✅ **AI-friendly** - Easy for AI assistants to modify  

Edit `/Users/jianzhang/eaCreator/template_1/public/template_1_config.json` and watch your template transform! 🚀


