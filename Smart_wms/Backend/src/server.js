import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ==================
// Health Check
// ==================
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Smart WMS Backend',
    version: '1.0.0',
  });
});

// ==================
// Dashboard Endpoints
// ==================
app.get('/api/v1/dashboard/summary', (req, res) => {
  res.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    total_items: 1250,
    active_alerts: 8,
    low_stock_count: 23,
    prediction_accuracy: 87.5,
  });
});

app.get('/api/v1/dashboard/metrics', (req, res) => {
  res.json({
    status: 'success',
    metrics: {
      accuracy: 87.5,
      predictions_last_7d: 156,
      recommendations_accepted: 142,
      stockouts_prevented: 12,
    },
  });
});

// ==================
// Inventory Endpoints
// ==================
app.get('/api/v1/inventory', (req, res) => {
  const mockInventory = [
    { product_id: 'PROD-001', product_name: 'Widget A', current_stock: 450, reorder_point: 100, status: 'OPTIMAL' },
    { product_id: 'PROD-002', product_name: 'Widget B', current_stock: 45, reorder_point: 100, status: 'LOW_STOCK' },
    { product_id: 'PROD-003', product_name: 'Gadget X', current_stock: 890, reorder_point: 200, status: 'OVERSTOCK' },
  ];
  res.json({ status: 'success', items: mockInventory, total: 3 });
});

app.get('/api/v1/inventory/:productId', (req, res) => {
  res.json({
    status: 'success',
    product_id: req.params.productId,
    current_stock: 450,
    reorder_point: 100,
    status: 'OPTIMAL',
  });
});

// ==================
// Prediction Endpoints
// ==================
app.post('/api/v1/predict', (req, res) => {
  res.json({
    status: 'success',
    product_id: req.body.product_id,
    prediction: {
      forecast: [
        { date: '2026-02-22', quantity: 145, confidence_lower: 120, confidence_upper: 170 },
      ],
      model_type: 'LSTM',
      avg_predicted_demand: 150,
    },
    recommendation: {
      action: 'RESTOCK',
      suggested_quantity: 1000,
      urgency: 'HIGH',
    },
  });
});

// ==================
// Alert Endpoints
// ==================
app.get('/api/v1/alerts', (req, res) => {
  const mockAlerts = [
    {
      id: 1,
      type: 'STOCKOUT_RISK',
      product_id: 'PROD-001',
      severity: 'HIGH',
      message: 'Stock may deplete in 8 days',
      created_at: new Date().toISOString(),
    },
  ];
  res.json({ status: 'success', alerts: mockAlerts });
});

// ==================
// Error Handler
// ==================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    error_code: 'INTERNAL_ERROR',
    message: err.message,
  });
});

// ==================
// Start Server
// ==================
app.listen(PORT, () => {
  console.log(`✅ Smart WMS Backend running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/health`);
  console.log(`🔌 API Base: http://localhost:${PORT}/api/v1`);
});
