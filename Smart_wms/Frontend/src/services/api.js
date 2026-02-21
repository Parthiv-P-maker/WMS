import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ====================
// PREDICTION SERVICES
// ====================

export const predictionService = {
  // Single product prediction
  predictDemand: (productId, currentStock, forecastDays = 14) =>
    apiClient.post('/predict', {
      product_id: productId,
      current_stock: currentStock,
      forecast_days: forecastDays,
    }),

  // Batch predictions
  predictBatch: (products) =>
    apiClient.post('/predict-batch', { products }),

  // Get all active recommendations
  getRecommendations: (filters = {}) =>
    apiClient.get('/recommendations', { params: filters }),

  // Get prediction history for a product
  getPredictionHistory: (productId, days = 90) =>
    apiClient.get(`/predictions/${productId}`, { params: { days } }),
};

// ====================
// INVENTORY SERVICES
// ====================

export const inventoryService = {
  // Get all inventory items
  getInventory: (page = 1, pageSize = 50, filters = {}) =>
    apiClient.get('/inventory', { params: { page, pageSize, ...filters } }),

  // Get specific product inventory
  getProductInventory: (productId) =>
    apiClient.get(`/inventory/${productId}`),

  // Get low stock items
  getLowStockItems: (threshold = 0.2) =>
    apiClient.get('/inventory/low-stock', { params: { threshold } }),

  // Get overstock items
  getOverstockItems: () =>
    apiClient.get('/inventory/overstock'),

  // Get items near expiry
  getExpiringItems: (daysThreshold = 30) =>
    apiClient.get('/inventory/expiring', { params: { daysThreshold } }),

  // Update inventory
  updateInventory: (productId, quantity, reason = 'MANUAL_UPDATE') =>
    apiClient.put(`/inventory/${productId}`, { quantity, reason }),
};

// ====================
// PRODUCT SERVICES
// ====================

export const productService = {
  // Get all products
  getProducts: (page = 1, pageSize = 50) =>
    apiClient.get('/products', { params: { page, pageSize } }),

  // Get product details
  getProductDetails: (productId) =>
    apiClient.get(`/products/${productId}`),

  // Search products
  searchProducts: (query) =>
    apiClient.get('/products/search', { params: { q: query } }),

  // Get product categories
  getCategories: () =>
    apiClient.get('/products/categories'),
};

// ====================
// ALERT SERVICES
// ====================

export const alertService = {
  // Get all alerts
  getAlerts: (status = 'ACTIVE', page = 1, pageSize = 20) =>
    apiClient.get('/alerts', { params: { status, page, pageSize } }),

  // Get alert by ID
  getAlertById: (alertId) =>
    apiClient.get(`/alerts/${alertId}`),

  // Dismiss alert
  dismissAlert: (alertId, reason = '') =>
    apiClient.put(`/alerts/${alertId}/dismiss`, { reason }),

  // Snooze alert
  snoozeAlert: (alertId, minutes = 60) =>
    apiClient.put(`/alerts/${alertId}/snooze`, { minutes }),

  // Get alerts by category
  getAlertsByCategory: (category) =>
    apiClient.get(`/alerts/category/${category}`),
};

// ====================
// DASHBOARD SERVICES
// ====================

export const dashboardService = {
  // Get dashboard summary
  getSummary: () =>
    apiClient.get('/dashboard/summary'),

  // Get KPI metrics
  getMetrics: (timeRange = '7d') =>
    apiClient.get('/dashboard/metrics', { params: { timeRange } }),

  // Get demand forecast chart data
  getDemandChartData: (productId, days = 30) =>
    apiClient.get(`/dashboard/demand-chart/${productId}`, { params: { days } }),

  // Get inventory trends
  getInventoryTrends: (timeRange = '30d') =>
    apiClient.get('/dashboard/inventory-trends', { params: { timeRange } }),

  // Get recommendation statistics
  getRecommendationStats: () =>
    apiClient.get('/dashboard/recommendation-stats'),
};

// ====================
// SUPPLIER SERVICES
// ====================

export const supplierService = {
  // Get all suppliers
  getSuppliers: () =>
    apiClient.get('/suppliers'),

  // Get supplier details
  getSupplierDetails: (supplierId) =>
    apiClient.get(`/suppliers/${supplierId}`),

  // Get supplier performance
  getSupplierPerformance: (supplierId, days = 90) =>
    apiClient.get(`/suppliers/${supplierId}/performance`, { params: { days } }),

  // Get recommended suppliers for product
  getRecommendedSuppliers: (productId) =>
    apiClient.get(`/suppliers/product/${productId}`),
};

// ====================
// REPORTING SERVICES
// ====================

export const reportService = {
  // Generate inventory report
  generateInventoryReport: (filters = {}) =>
    apiClient.post('/reports/inventory', filters),

  // Generate demand report
  generateDemandReport: (dateRange) =>
    apiClient.post('/reports/demand', dateRange),

  // Export data to CSV
  exportToCSV: (reportType, filters = {}) =>
    apiClient.post(`/reports/export/${reportType}`, { format: 'csv', ...filters }),

  // Get report history
  getReportHistory: () =>
    apiClient.get('/reports/history'),
};

export default apiClient;
