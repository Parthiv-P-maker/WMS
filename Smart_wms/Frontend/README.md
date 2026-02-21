# Smart WMS Frontend - React Dashboard

## Overview

Production-ready React dashboard for the AI-powered Warehouse Management System.

## Features

### 📊 Dashboard

- **KPI Overview**: Total inventory, active alerts, low stock, prediction accuracy
- **30-Day Demand Forecast**: Visual prediction chart with confidence intervals
- **Inventory Trends**: Real-time inventory level tracking
- **Recommendation Distribution**: Pie chart of action types
- **Top Active Alerts**: Quick access to critical issues

### 📦 Inventory Management

- **Real-time Inventory View**: Complete product listing with status indicators
- **Advanced Filtering**: Filter by status (low stock, overstock, expiring, optimal)
- **Product Search**: Quick product lookup
- **Stock Status Indicators**:
  - 🟢 OPTIMAL - Normal levels
  - 🔴 LOW_STOCK - Reorder needed
  - 🟡 OVERSTOCK - Excess inventory
  - 🟠 EXPIRING - Expiry alerts
- **Batch Actions**: Update multiple items, bulk operations

### 🔮 Demand Predictions

- **14-Day Forecast**: ML-powered demand predictions
- **Confidence Intervals**: Prediction ranges with upper/lower bounds
- **Actionable Recommendations**:
  - Suggested restock quantities
  - Urgency levels (LOW, MEDIUM, HIGH, CRITICAL)
  - Supplier recommendations
  - Predicted demand spikes
- **Confidence Scoring**: Model reliability metrics

### 🚨 Alerts & Notifications

- **Alert Categories**:
  - Stockout Risk
  - Overstock Detected
  - Expiry Soon
  - Supplier Delays
  - Quality Issues
- **Severity Levels**: CRITICAL, HIGH, MEDIUM, LOW
- **Alert Management**: Dismiss, snooze (1h, 4h, 24h), escalate
- **Alert History**: Track dismissed and acknowledged alerts

### 📈 Additional Pages (Structure included)

- **Suppliers**: Manage supplier information, performance metrics
- **Reports**: Generate custom reports, export data
- **Settings**: User preferences, system configuration

## Project Structure

```
Frontend/
├── src/
│   ├── components/
│   │   └── Layout.jsx              # Main layout with sidebar
│   ├── pages/
│   │   ├── Dashboard.jsx           # Dashboard overview
│   │   ├── Inventory.jsx           # Inventory management
│   │   ├── Predictions.jsx         # Demand predictions
│   │   └── Alerts.jsx              # Alert management
│   ├── services/
│   │   └── api.js                  # API integration
│   ├── stores/
│   │   └── index.js                # Zustand state management
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # React entry point
│   ├── index.css                  # Global styles
│   └── .env.example               # Environment variables
├── index.html                      # HTML entry point
├── vite.config.js                  # Vite configuration
├── tailwind.config.js             # Tailwind CSS config
├── postcss.config.js              # PostCSS config
├── package.json                    # Dependencies
└── README.md                       # This file
```

## Tech Stack

### Core

- **React 18**: UI framework
- **Vite**: Build tool (fast, modern)
- **React Router v6**: Client-side routing

### State Management

- **Zustand**: Lightweight state management

### API & HTTP

- **Axios**: HTTP client with interceptors

### Visualization

- **Recharts**: React charting library
- **Lucide React**: Icon library

### Styling

- **Tailwind CSS**: Utility-first CSS
- **PostCSS**: CSS processor

### Data Tables

- **TanStack React Table**: Headless table library
- **date-fns**: Date utilities

## Installation & Setup

### Prerequisites

- Node.js 16+ and npm/yarn
- Backend API running on `http://localhost:5000`

### Installation Steps

```bash
cd Smart_wms/Frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update environment variables in .env
REACT_APP_API_URL=http://localhost:5000/api/v1
```

## Running the Application

### Development Mode

```bash
npm run dev
```

- Opens on `http://localhost:3000`
- Hot module reloading enabled
- Source maps for debugging

### Production Build

```bash
npm run build
npm run preview
```

### Linting & Formatting

```bash
npm run lint
npm run format
```

## API Integration

### Key Endpoints Used

**Predictions**

```
POST /api/v1/predict
POST /api/v1/predict-batch
GET /api/v1/recommendations
```

**Inventory**

```
GET /api/v1/inventory
GET /api/v1/inventory/{productId}
GET /api/v1/inventory/low-stock
GET /api/v1/inventory/overstock
```

**Alerts**

```
GET /api/v1/alerts
PUT /api/v1/alerts/{alertId}/dismiss
PUT /api/v1/alerts/{alertId}/snooze
```

**Dashboard**

```
GET /api/v1/dashboard/summary
GET /api/v1/dashboard/metrics
GET /api/v1/dashboard/demand-chart/{productId}
```

## Environment Variables

Create a `.env` file:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api/v1

# App Configuration
REACT_APP_APP_NAME=Smart WMS
REACT_APP_VERSION=1.0.0

# Feature Flags
REACT_APP_ENABLE_NOTIFICATIONS=true
REACT_APP_ENABLE_AUTO_REFRESH=true
REACT_APP_AUTO_REFRESH_INTERVAL=30000

# Theme
REACT_APP_PRIMARY_COLOR=#0284c7
REACT_APP_THEME=light
```

## Component Documentation

### Dashboard

- **Page shows**: KPIs, forecast chart, inventory trends, alerts
- **Data refresh**: Automatic on mount, manual refresh button
- **Features**: Export report, time range selection

### Inventory

- **Features**: Pagination, sorting, filtering, search
- **Status indicators**: Visual status badges
- **Actions**: View details, predict demand, bulk updates

### Predictions

- **Input**: Select product from dropdown
- **Output**: 14-day forecast chart, confidence intervals
- **Recommendations**: Action, quantity, urgency, supplier
- **Metrics**: Confidence score visualization

### Alerts

- **Severity colors**: Red (critical), Orange (high), Yellow (medium), Blue (low)
- **Actions**: Dismiss, snooze for 1h/4h/24h
- **Filters**: Active, dismissed, snoozed alerts
- **Auto-clear**: Snoozed alerts reappear after timeout

## Styling Guidelines

### Color Scheme

```
Primary: #0284c7 (Blue)
Success: #22c55e (Green)
Warning: #eab308 (Yellow)
Danger: #ef4444 (Red)
Background: #f3f4f6 (Light gray)
```

### Card Layout

```jsx
<div className="bg-white p-6 rounded-lg shadow">
  <h2 className="text-lg font-semibold mb-4">Title</h2>
  {/* content */}
</div>
```

### Responsive Design

- **Mobile**: `grid-cols-1`
- **Tablet**: `md:grid-cols-2`
- **Desktop**: `lg:grid-cols-3` or `lg:grid-cols-4`

## Performance Optimization

- ✅ Code splitting with React Router
- ✅ Image optimization with lazy loading
- ✅ API caching with browser cache
- ✅ Chart optimization with ResizeObserver
- ✅ State management optimization

## Security

- ✅ Auth token stored in localStorage
- ✅ Request/response interceptors for auth
- ✅ CORS configuration in backend
- ✅ XSS prevention with React's built-in escaping
- ✅ CSRF token handling (if needed)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### API Connection Issues

```
Error: Failed to fetch from API
Solution:
1. Check backend is running on http://localhost:5000
2. Verify REACT_APP_API_URL in .env
3. Check CORS headers in backend
```

### Blank Dashboard

```
Solution:
1. Check browser console for errors
2. Verify API endpoints are responding
3. Check network tab for failed requests
```

### Charts Not Rendering

```
Solution:
1. Verify data format from API
2. Check ResponsiveContainer height
3. Ensure recharts is properly installed
```

## Next Steps for Team Integration

1. **Backend Team**: Ensure all API endpoints return correct data structure
2. **AI Team**: Update `/api/v1/predict` response format if needed
3. **Database Team**: Verify data availability for API queries
4. **DevOps**: Set up CI/CD pipeline for frontend deployment

## Future Enhancements

- [ ] Real-time notifications with WebSocket
- [ ] Dark mode support
- [ ] Mobile app with React Native
- [ ] Advanced analytics and ML model explanability
- [ ] Multi-language support (i18n)
- [ ] Offline mode with service workers
- [ ] Advanced charts and visualizations
- [ ] User role-based access control
- [ ] Historical data comparison
- [ ] Custom dashboard widgets

## Support & Documentation

- API Docs: See `AI_MODULE_ARCHITECTURE.md`
- Component Library: Storybook (to be added)
- Contributing: See `CONTRIBUTING.md`

---

**Ready to deploy?** Follow the [.azure deployment guide](../AI_MODULE_ARCHITECTURE.md) in the root project.
