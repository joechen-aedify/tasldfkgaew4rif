# 🎨 Dynamic Theme System

## ✅ Real-Time Theme Updates!

Your template now supports **real-time theme customization**! Change colors in the config and see them update instantly.

## 📍 Config Location

Edit theme colors in:
```
template_1/public/template_1_config.json
```

## 🎨 Available Theme Colors

### Primary & Secondary
```json
{
  "theme": {
    "primaryColor": "#8b5cf6",      // Main brand color (purple)
    "secondaryColor": "#06b6d4"     // Secondary brand (cyan)
  }
}
```
**Used for:**
- Active navigation tabs
- Buttons and CTAs
- Logo gradient
- Focus states

### Background Colors
```json
{
  "backgroundColor": "#0a0a0a",     // Main page background
  "cardBackground": "#1a1a1a"       // Cards, panels, modals
}
```
**Used for:**
- Page background
- Dashboard cards
- Stat cards
- Management cards

### Text Colors
```json
{
  "textColor": "#ffffff",           // Primary text
  "textSecondary": "#9ca3af"        // Secondary/muted text
}
```
**Used for:**
- Headings, titles
- Body text
- Labels, descriptions
- Inactive states

### Accent Colors (Charts & Indicators)
```json
{
  "accentPurple": "#8b5cf6",        // Analytics, KPIs
  "accentCyan": "#06b6d4",          // Departments
  "accentGreen": "#10b981",         // Success states
  "accentOrange": "#f59e0b",        // Performance
  "accentPink": "#ec4899"           // Variations
}
```
**Used for:**
- Chart colors
- Data visualization
- Status indicators
- Section dividers

### Layout & Borders
```json
{
  "borderColor": "#2a2a2a",         // Card borders
  "borderRadius": "12px",           // Corner rounding
  "borderWidth": "1px"              // Border thickness
}
```

## 🧪 Try It Now!

### Test 1: Change Primary Color
Edit line 9 in config:
```json
"primaryColor": "#ff6b6b"
```
**Result:** Navigation active tab turns red! 🔴

### Test 2: Change Background
Edit line 11:
```json
"backgroundColor": "#1a1a2e"
```
**Result:** Page background becomes dark blue! 🌊

### Test 3: Change Text Color
Edit line 13:
```json
"textColor": "#e0e0e0"
```
**Result:** All text becomes lighter gray! 💡

## 🔄 How It Works

1. **CSS Variables**: All colors use CSS custom properties
2. **Theme Hook**: `useTheme()` watches config changes
3. **Real-Time Update**: Changes apply to `:root` element
4. **Auto-Propagate**: All components use these variables

### Technical Implementation

**CSS Variables (Applied to `:root`):**
```css
--primary-color: #8b5cf6;
--secondary-color: #06b6d4;
--background-color: #0a0a0a;
/* ... and more */
```

**Usage in Styles:**
```css
.header-nav-item.header-active {
  background-color: var(--primary-color);
  color: var(--text-color);
}
```

## 🎯 What Gets Themed

### ✅ Fully Themed
- Header navigation
- Background colors
- Text colors
- Borders & layout
- Active states
- Logo gradient
- Dashboard cards

### 🔄 Partially Themed
- Charts (using accent colors)
- Buttons (primary/secondary)
- Hover states

### ⚠️ Not Yet Themed
- Chart internal colors (Recharts)
- Some gradients
- Modal backgrounds (TODO)

## 📊 Theme Presets

Try these color combinations:

### 🌙 Dark Purple (Default)
```json
{
  "primaryColor": "#8b5cf6",
  "secondaryColor": "#06b6d4",
  "backgroundColor": "#0a0a0a"
}
```

### 🔵 Blue Professional
```json
{
  "primaryColor": "#3b82f6",
  "secondaryColor": "#06b6d4",
  "backgroundColor": "#0a0a0a"
}
```

### 🟢 Green Energy
```json
{
  "primaryColor": "#10b981",
  "secondaryColor": "#06b6d4",
  "backgroundColor": "#0f172a"
}
```

### 🔴 Red Vibrant
```json
{
  "primaryColor": "#ef4444",
  "secondaryColor": "#f59e0b",
  "backgroundColor": "#1a1a1a"
}
```

### 🟣 Purple Gradient
```json
{
  "primaryColor": "#a855f7",
  "secondaryColor": "#ec4899",
  "backgroundColor": "#0a0a0a"
}
```

## 💡 Pro Tips

### 1. Maintain Contrast
Ensure text is readable on backgrounds:
- Dark background → Light text
- Light background → Dark text

### 2. Consistent Accent Colors
Keep accent colors distinct for charts:
- Purple, Cyan, Green, Orange, Pink

### 3. Test Accessibility
Use tools to check color contrast ratios:
- WCAG AA: 4.5:1 for normal text
- WCAG AAA: 7:1 for normal text

### 4. Brand Colors
Use your company's brand colors:
```json
{
  "primaryColor": "#your-brand-color",
  "secondaryColor": "#your-accent-color"
}
```

## 🔍 Console Logging

Watch the console to see theme updates:
```
🎨 Theme applied: {
  primary: "#8b5cf6",
  secondary: "#06b6d4",
  background: "#0a0a0a"
}
```

## 📁 Files Updated

**New Files:**
- `src/hooks/useTheme.ts` - Theme application hook

**Updated Files:**
- `src/App.tsx` - Uses theme hook
- `src/index.css` - CSS variables
- `src/App.css` - Theme variables
- `src/components/Header.tsx` - Dynamic logo gradient
- `src/components/Header.css` - Theme variables
- `src/components/Dashboard.css` - Theme variables

## 🚀 Next Steps

### Extend Theme Support
Add more themeable properties:
- Font family
- Font sizes
- Spacing units
- Animation speeds

### Dark/Light Mode
Implement `lightDarkModeToggle`:
```json
{
  "lightDarkModeToggle": true
}
```

### Save Preferences
Store user's theme choice in localStorage

---

## 🎉 **Success!**

Your template now has **real-time dynamic theming**!

Edit colors in `/template_1/public/template_1_config.json` and watch the magic! ✨

