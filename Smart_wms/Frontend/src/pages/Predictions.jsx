import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertCircle, TrendingUp, BarChart3 } from 'lucide-react';
import { predictionService, dashboardService } from '../services/api';

export default function Predictions() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      fetchPrediction(selectedProduct);
    }
  }, [selectedProduct]);

  const fetchPrediction = (productId) => {
    setLoading(true);
    
    // Mock forecast data
    const mockForecastData = [
      { date: '02-22', quantity: 145, lower: 120, upper: 170 },
      { date: '02-23', quantity: 152, lower: 125, upper: 180 },
      { date: '02-24', quantity: 148, lower: 120, upper: 175 },
      { date: '02-25', quantity: 165, lower: 140, upper: 190 },
      { date: '02-26', quantity: 172, lower: 145, upper: 200 },
      { date: '02-27', quantity: 168, lower: 140, upper: 195 },
      { date: '02-28', quantity: 180, lower: 155, upper: 210 },
      { date: '03-01', quantity: 175, lower: 150, upper: 205 },
      { date: '03-02', quantity: 182, lower: 155, upper: 210 },
      { date: '03-03', quantity: 188, lower: 160, upper: 215 },
      { date: '03-04', quantity: 185, lower: 160, upper: 210 },
      { date: '03-05', quantity: 192, lower: 165, upper: 220 },
      { date: '03-06', quantity: 198, lower: 170, upper: 225 },
      { date: '03-07', quantity: 195, lower: 170, upper: 220 },
    ];

    const mockRecommendation = {
      action: 'RESTOCK',
      suggested_quantity: 1000,
      urgency: 'HIGH',
      reason: 'Predicted demand spike in 7 days. Inventory will deplete in 8 days at current rates.',
      confidence_score: 0.88,
      supplier_recommendation: {
        supplier_id: 'SUP-001',
        lead_time_days: 5,
        cost_per_unit: 12.50,
        reliability_score: 0.95,
      },
    };

    setForecastData(mockForecastData);
    setRecommendation(mockRecommendation);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Demand Prediction</h1>
        <BarChart3 className="w-8 h-8 text-blue-600" />
      </div>

      {/* Product Selection */}
      <div className="bg-white p-6 rounded-lg shadow">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Product</label>
        <select
          value={selectedProduct || ''}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose a product...</option>
          <option value="PROD-001">PROD-001 - Widget A</option>
          <option value="PROD-002">PROD-002 - Widget B</option>
          <option value="PROD-003">PROD-003 - Widget C</option>
        </select>
      </div>

      {selectedProduct && loading && (
        <div className="text-center py-8">Loading prediction data...</div>
      )}

      {selectedProduct && !loading && forecastData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Forecast Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">14-Day Forecast</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="quantity"
                  stroke="#0284c7"
                  strokeWidth={2}
                  name="Predicted Demand"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="upper"
                  stroke="#90caf9"
                  strokeDasharray="5 5"
                  name="Upper Bound"
                />
                <Line
                  type="monotone"
                  dataKey="lower"
                  stroke="#90caf9"
                  strokeDasharray="5 5"
                  name="Lower Bound"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recommendation Card */}
          {recommendation && (
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Recommendation</h3>

                {/* Action */}
                <div className="mb-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <p className="text-sm text-gray-600">Suggested Action</p>
                  <p className="text-lg font-bold text-blue-900">{recommendation.action}</p>
                </div>

                {/* Suggested Quantity */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Restock Quantity</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {recommendation.suggested_quantity} units
                  </p>
                </div>

                {/* Urgency */}
                <div className="mb-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                  <p className="text-sm text-gray-600">Urgency</p>
                  <p
                    className={`text-lg font-bold ${
                      recommendation.urgency === 'HIGH' ? 'text-red-600' : 'text-yellow-600'
                    }`}
                  >
                    {recommendation.urgency}
                  </p>
                </div>

                {/* Confidence */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Confidence Score</p>
                  <div className="bg-gray-200 rounded-full h-3 mt-1">
                    <div
                      className="bg-green-500 h-3 rounded-full"
                      style={{
                        width: `${(recommendation.confidence_score || 0.85) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {((recommendation.confidence_score || 0.85) * 100).toFixed(1)}%
                  </p>
                </div>

                {/* Reason */}
                <div className="p-3 bg-gray-50 rounded border-l-2 border-gray-400">
                  <p className="text-sm text-gray-700">
                    <strong>Reason:</strong> {recommendation.reason}
                  </p>
                </div>
              </div>

              {/* Supplier Info */}
              {recommendation.supplier_recommendation && (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">Recommended Supplier</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600">Supplier ID</p>
                      <p className="font-medium">{recommendation.supplier_recommendation.supplier_id}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Lead Time</p>
                      <p className="font-medium">
                        {recommendation.supplier_recommendation.lead_time_days} days
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Cost per Unit</p>
                      <p className="font-medium">
                        ${recommendation.supplier_recommendation.cost_per_unit.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Reliability</p>
                      <p className="font-medium">
                        {(recommendation.supplier_recommendation.reliability_score * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {!selectedProduct && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-blue-900">Select a product to view predictions</p>
        </div>
      )}
    </div>
  );
}
