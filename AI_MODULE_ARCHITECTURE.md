# Smart WMS - AI Module Architecture & Production Guide

## Part 1: AI Module Overview

### 1.1 System Components

```
[Historical Data] → [Preprocessing] → [Feature Engineering] → [ML Model] → [Predictions]
                                                                    ↓
                                                    [Decision Engine] → [API Recommendations]
                                                                    ↓
                                                    [Frontend Dashboard]
```

### 1.2 Three Core Engines

1. **Demand Prediction Engine** - LSTM/Prophet for demand forecasting
2. **Decision & Recommendation Engine** - Rule-based + ML for actionable insights
3. **Autonomous Slotting Optimization** - Low-priority feature (phase 2)

---

## Part 2: Dataset Selection

### 2.1 Required Data (Primary Sources)

```
1. Historical Sales Data
   - product_id, quantity_sold, sale_date, price
   - Time range: Minimum 12 months (24 months recommended)
   - Granularity: Daily or hourly

2. Inventory Levels
   - product_id, quantity_in_stock, warehouse_location, stock_date
   - Current and historical snapshots

3. Product Master Data
   - product_id, category, supplier_id, lead_time, cost
   - Seasonal indicators, shelf_life

4. Supplier Information
   - supplier_id, delivery_time, reliability_score, cost_factor
   - Min/max order quantities

5. Market Trends (Optional but Valuable)
   - Market sentiment scores (0-100)
   - Competitor pricing
   - Seasonal indices
```

### 2.2 Dataset Size Recommendations

```
- Minimum: 500 products × 12 months = 6,000 records
- Optimal: 1000+ products × 24 months = 24,000+ records
- Consider: ~80% training, 10% validation, 10% test split
```

### 2.3 Real-World Dataset Sources

- **Kaggle**: Retail/Warehouse datasets
- **UCI ML Repository**: Time series data
- **Your company database**: Historical logs
- **Synthetic data** (for development): Generate using numpy/pandas

---

## Part 3: Data Preprocessing Pipeline

### 3.1 Preprocessing Steps

```python
PIPELINE: Raw Data → Validation → Cleaning → Transformation → Feature Engineering

1. Data Validation
   - Remove duplicates
   - Handle missing values (forward fill for time series)
   - Validate data types and ranges
   - Check for outliers

2. Data Cleaning
   - Remove zero/negative quantities (keep valid negatives for returns)
   - Filter date anomalies
   - Handle seasonal spikes vs. outliers
   - Normalize product categories

3. Transformation
   - Time aggregation (daily/weekly summaries)
   - Logarithmic scaling for skewed distributions
   - Rolling averages (7-day, 30-day)
   - Year-over-year growth calculation

4. Feature Engineering
   - Lag features: demand[t], demand[t-1], ..., demand[t-7]
   - Rolling statistics: 7-day MA, 30-day MA, std dev
   - Seasonal decomposition: trend, seasonal, residual
   - Time features: day_of_week, month, quarter, is_holiday
   - Product features: price_category, seasonality_index
   - Supplier features: delivery_reliability, cost_factor
```

### 3.2 Quality Checks

```
- Check data distribution (histogram)
- Verify time series continuity
- Validate no data leakage
- Ensure train/test splits don't overlap
```

---

## Part 4: Model Selection

### 4.1 Recommended Models by Use Case

#### **For Demand Prediction (Primary)**

```
1. LSTM (Long Short-Term Memory) - Neural Network
   ✓ Pros: Captures long-term dependencies, handles seasonality well
   ✓ Cons: Needs large datasets (1000+ products), slower inference
   ✓ Best for: High-volume SKUs with clear patterns

2. Prophet (Facebook's Forecasting Tool)
   ✓ Pros: Fast, handles missing data, robust to outliers, easy to tune
   ✓ Cons: Less accurate for complex patterns
   ✓ Best for: Quick deployment, small-med datasets

3. ARIMA/SARIMA - Statistical
   ✓ Pros: Interpretable, lightweight, proven
   ✓ Cons: Assumes stationarity, struggles with multiple seasonalities
   ✓ Best for: Stable, simple demand patterns

4. Gradient Boosting (XGBoost/LightGBM)
   ✓ Pros: Fast training, good with features, handles non-linearity
   ✓ Cons: Requires more tuning
   ✓ Best for: Hybrid approach with multiple features

RECOMMENDED STACK FOR PRODUCTION:
→ Primary: LSTM for complex products + Prophet for simple products
→ Fallback: XGBoost for hybrid features
```

#### **For Decision Engine (Rule + ML Hybrid)**

```
Decision Logic:
IF predicted_demand[t+7] > 1.2 × avg_demand THEN "RESTOCK_URGENT"
IF predicted_demand < current_stock × 0.8 THEN "SLOW_MOVING_ALERT"
IF supplier_reliability < 0.7 AND lead_time > 14 THEN "CHANGE_SUPPLIER"
```

### 4.2 Architecture Diagram

```
┌─────────────────────────────────┐
│   Raw Sales History             │
├─────────────────────────────────┤
│ Preprocessing Pipeline          │
├─────────────────────────────────┤
│ LSTM Model Branch    │ Prophet   │
│ (Complex SKUs)       │ (Simple)  │
├──────────────────────┴───────────┤
│ Ensemble Prediction             │
├─────────────────────────────────┤
│ Decision Rules Engine           │
│ - Generate recommendations      │
│ - Alert thresholds              │
├─────────────────────────────────┤
│ API Response (JSON)             │
│ - Demand forecast               │
│ - Restock quantity              │
│ - Supplier recommendation       │
│ - Confidence score              │
└─────────────────────────────────┘
```

---

## Part 5: Training Pipeline

### 5.1 Production Training Architecture

```
BATCH TRAINING (Weekly)
├─ Schedule: Every Sunday 02:00 AM (off-peak)
├─ Data: Last 24 months + this week's transactions
├─ Steps:
│  1. Fetch data from warehouse DB
│  2. Validate & clean (skip bad records)
│  3. Feature engineering
│  4. Train/validate/test split
│  5. Train all models in parallel
│  6. Evaluate on test set
│  7. Compare with previous model
│  8. A/B test new model (5% traffic first)
│  9. If better: deploy, else: rollback
│  10. Log metrics to monitoring system
└─ Output: models/version_YYYYMMDD/ (pkl/h5 files)

REAL-TIME INFERENCE
├─ Input: API request with product_id, current_stock
├─ Model selection: Load latest model version
├─ Inference time: <100ms per product
├─ Cache predictions: 1-hour TTL
└─ Return: JSON with forecast + metadata
```

### 5.2 Model Versioning Strategy

```
Directory Structure:
models/
├── v1_YYYY-MM-DD/
│   ├── lstm_model.h5
│   ├── prophet_model.pkl
│   ├── scaler.pkl
│   ├── features_config.json
│   ├── performance_metrics.json
│   └── training_log.txt
├── v2_YYYY-MM-DD/
└── v_current/ → symlink to best version
```

### 5.3 Hyperparameter Tuning

```
LSTM Configuration:
- layers: 2-3
- units: 64-128 per layer
- dropout: 0.2
- batch_size: 32-64
- epochs: 50-100
- learning_rate: 0.001

Prophet Configuration:
- seasonality_mode: 'additive' or 'multiplicative'
- changepoint_prior_scale: 0.05
- seasonality_prior_scale: 10

XGBoost Parameters:
- max_depth: 5-8
- learning_rate: 0.05-0.1
- n_estimators: 100-300
```

---

## Part 6: API Output Format

### 6.1 API Endpoint Specification

#### **Endpoint: POST /api/v1/predict**

```json
REQUEST:
{
  "product_id": "PROD-12345",
  "current_stock": 500,
  "lookback_days": 90,
  "forecast_days": 14
}

RESPONSE (200 OK):
{
  "status": "success",
  "timestamp": "2026-02-21T14:30:00Z",
  "product_id": "PROD-12345",
  "prediction": {
    "forecast": [
      {
        "date": "2026-02-22",
        "quantity": 145,
        "confidence_lower": 120,
        "confidence_upper": 170,
        "confidence_level": 0.95
      },
      {
        "date": "2026-02-23",
        "quantity": 152,
        "confidence_lower": 125,
        "confidence_upper": 180,
        "confidence_level": 0.95
      }
    ],
    "model_type": "LSTM",
    "avg_predicted_demand": 150,
    "seasonality_factor": 1.05
  },
  "recommendation": {
    "action": "RESTOCK",
    "suggested_quantity": 1000,
    "urgency": "HIGH",
    "reason": "Predicted demand spike in 7 days",
    "confidence_score": 0.88
  },
  "supplier_recommendation": {
    "supplier_id": "SUP-789",
    "lead_time_days": 5,
    "cost_per_unit": 12.50,
    "reliability_score": 0.95
  },
  "alerts": [
    {
      "type": "STOCKOUT_RISK",
      "severity": "MEDIUM",
      "message": "Stock may deplete in 8 days"
    }
  ]
}

ERROR (400 Bad Request):
{
  "status": "error",
  "error_code": "INVALID_INPUT",
  "message": "product_id is required"
}
```

### 6.2 Batch Prediction Endpoint

```json
POST /api/v1/predict-batch

REQUEST:
{
  "products": [
    {"product_id": "PROD-123", "current_stock": 500},
    {"product_id": "PROD-456", "current_stock": 200}
  ]
}

RESPONSE:
{
  "status": "success",
  "count": 2,
  "predictions": [
    { /* same as single response */ }
  ]
}
```

---

## Part 7: Implementation Roadmap

### **Phase 1: Foundation (Weeks 1-2)**

- [ ] Set up data pipeline (ETL from DB)
- [ ] Implement preprocessing module
- [ ] Create data validation tests
- [ ] Set up model serving infrastructure

### **Phase 2: Model Development (Weeks 3-5)**

- [ ] Train Prophet model (baseline)
- [ ] Train XGBoost model
- [ ] Develop LSTM model
- [ ] Evaluate and compare models

### **Phase 3: Decision Engine (Week 6)**

- [ ] Implement rule-based decision logic
- [ ] Create recommendation engine
- [ ] Add confidence scoring

### **Phase 4: API & Integration (Week 7)**

- [ ] Build REST API with Flask/FastAPI
- [ ] Implement caching layer
- [ ] Add monitoring & logging
- [ ] Write API documentation

### **Phase 5: Production Deployment (Week 8)**

- [ ] Set up batch training scheduler
- [ ] Configure model versioning
- [ ] Add A/B testing framework
- [ ] Deploy to staging, then production

### **Phase 6: Optimization (Ongoing)**

- [ ] Monitor model performance
- [ ] Retrain based on new data
- [ ] Update decision rules
- [ ] Autonomous slotting (Phase 2)

---

## Part 8: Technology Stack Recommendation

```
Data Processing:
- Pandas, NumPy (data manipulation)
- Scikit-learn (preprocessing, utilities)

ML Models:
- Statsmodels (ARIMA/SARIMA)
- Prophet (Facebook's library)
- TensorFlow/Keras (LSTM)
- XGBoost, LightGBM (Gradient Boosting)

API & Serving:
- FastAPI (recommended) or Flask
- Uvicorn (ASGI server)
- Redis (caching)
- Docker (containerization)

Database:
- PostgreSQL (primary data warehouse)
- TimescaleDB extension (time-series optimization)

Monitoring:
- Prometheus (metrics)
- Grafana (dashboards)
- ELK Stack (logging)

Orchestration:
- Apache Airflow or Celery (scheduling)
```

---

## Part 9: Quality Assurance

### 9.1 Model Evaluation Metrics

```
For Regression Predictions:
- MAE (Mean Absolute Error): ±5 units tolerance
- RMSE: Keep <15% of avg demand
- MAPE (Mean Absolute Percentage Error): <10%
- R² Score: >0.85

For Classification (alerts):
- Precision: >0.90 (minimize false alarms)
- Recall: >0.85 (catch real issues)
- F1-Score: Balance both
```

### 9.2 A/B Testing Framework

```
- Canary deployment: 5% traffic
- Monitor for 1 week
- Compare metrics with baseline
- Gradual rollout: 25% → 50% → 100%
- Instant rollback if performance drops
```

---

## Part 10: Next Steps

**Team 3 (AI)** should:

1. ✓ Review this architecture
2. Start with **Prophet model** (faster results)
3. Build data pipeline from Database → preprocessing
4. Create API wrapper for model serving
5. Integrate with Backend team's endpoints
6. Set up monitoring & versioning

**Continue to:** [Move to AI implementation in Ai_engine/README.md]
