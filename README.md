# Dashboard Template

A modern, responsive dashboard template built with React, TypeScript, and Vite.

## Features

- **Analytics & Statistics Cards**: Dynamic chart cards with multiple chart types (Bar, Line, Area, Pie)
- **Chart Wizard**: Multi-step wizard for creating custom charts
- **Department Management**: Manage different departments with custom cards
- **Calendar Widget**: Interactive calendar component
- **Resizable Cards**: Drag-to-resize functionality for chart cards
- **Local Storage**: Persistent state across sessions
- **Modern UI**: Dark theme with smooth animations and transitions

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Recharts** - Chart library
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
template_1/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx       # Main dashboard component
│   │   ├── Dashboard.css       # Dashboard styles
│   │   ├── Calendar.tsx        # Calendar widget
│   │   ├── Calendar.css        # Calendar styles
│   │   ├── ChartWizard.tsx     # Chart creation wizard
│   │   ├── ChartWizard.css     # Wizard styles
│   │   ├── ChartDisplay.tsx    # Chart rendering component
│   ├── App.tsx                 # Root component
│   ├── App.css                 # App styles
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
└── vite.config.ts              # Vite config
```

## Features in Detail

### Analytics Cards

- Multiple chart types: Bar, Line, Area, Pie
- Resizable cards with drag handles
- Persistent sizing via localStorage
- Edit and delete functionality
- Server status monitoring

### Chart Wizard

- 4-step wizard for chart creation
- Chart type selection (Bar, Line, Pie, Area)
- Purpose selection (KPI, Sales, Traffic, etc.)
- Data source configuration (Sample data or API)
- Preview before creation

### Department Management

- Add department cards
- Edit and delete departments
- Click to navigate to department details
- Persistent via sessionStorage

### Calendar

- Month view calendar
- Current day highlighting
- Navigation controls
- Clean, minimal design

## Customization

### Adding New Chart Types

1. Add chart type to `ChartDisplay.tsx`
2. Update `ChartWizard.tsx` chart type options
3. Add sample data generator in `generateData()`

### Styling

All components use modular CSS files:
- Modify `Dashboard.css` for main dashboard styles
- Modify `ChartWizard.css` for wizard styles
- Modify `Calendar.css` for calendar styles
- Global styles in `index.css` and `App.css`

### Color Scheme

The template uses a dark theme with purple accents:
- Primary: `#8b5cf6` (Purple)
- Secondary: `#06b6d4` (Cyan)
- Background: `#0a0a0a` (Near Black)
- Cards: `#1a1a1a` - `#252525` (Dark Gray)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
