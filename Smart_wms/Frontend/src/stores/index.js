import { create }  from 'zustand';

// ====================
// Dashboard State
// ====================
export const useDashboardStore = create((set) => ({
  summary: null,
  metrics: null,
  loading: false,
  error: null,

  setSummary: (summary) => set({ summary }),
  setMetrics: (metrics) => set({ metrics }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

// ====================
// Inventory State
// ====================
export const useInventoryStore = create((set) => ({
  items: [],
  totalItems: 0,
  currentPage: 1,
  pageSize: 50,
  filters: {},
  loading: false,
  error: null,

  setItems: (items) => set({ items }),
  setTotalItems: (totalItems) => set({ totalItems }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setFilters: (filters) => set({ filters }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

// ====================
// Predictions State
// ====================
export const usePredictionsStore = create((set) => ({
  activeProduct: null,
  forecast: null,
  recommendations: [],
  history: [],
  loading: false,
  error: null,

  setActiveProduct: (product) => set({ activeProduct: product }),
  setForecast: (forecast) => set({ forecast }),
  setRecommendations: (recommendations) => set({ recommendations }),
  setHistory: (history) => set({ history }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

// ====================
// Alerts State
// ====================
export const useAlertsStore = create((set) => ({
  alerts: [],
  activeAlerts: 0,
  dismissedAlerts: 0,
  filters: { status: 'ACTIVE' },
  loading: false,
  error: null,

  setAlerts: (alerts) => set({ alerts }),
  setActiveAlerts: (count) => set({ activeAlerts: count }),
  setDismissedAlerts: (count) => set({ dismissedAlerts: count }),
  setFilters: (filters) => set({ filters }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

// ====================
// UI State
// ====================
export const useUIStore = create((set) => ({
  sidebarOpen: true,
  theme: 'light',
  selectedTimeRange: '7d',
  notifications: [],

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setTheme: (theme) => set({ theme }),
  setTimeRange: (range) => set({ selectedTimeRange: range }),
  addNotification: (notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));

// ====================
// Auth State
// ====================
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLoading: (loading) => set({ loading }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
