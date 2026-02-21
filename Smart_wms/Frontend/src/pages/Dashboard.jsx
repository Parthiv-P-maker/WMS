import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart
} from 'recharts';
import { AlertCircle, TrendingUp, Package, AlertTriangle, CheckCircle } from 'lucide-react';
import { useDashboardStore } from '../stores';
import { dashboardService } from '../services/api';

export default function Dashboard() {
  const [summaryData, setSummaryData] = useState(null);
  const [demandChart, setDemandChart] = useState([]);
  const [inventoryTrends, setInventoryTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use mock data for now (no backend needed)
    const mockSummary = {
      total_items: 1250,
      active_alerts: 8,
      low_stock_count: 23,
      prediction_accuracy: 87.5,
    };

    const mockDemandChart = [
      { date: 'Feb 1', actual: 120, forecast: 125, confidence_upper: 145 },
      { date: 'Feb 2', actual: 135, forecast: 128, confidence_upper: 148 },
      { date: 'Feb 3', actual: 142, forecast: 140, confidence_upper: 160 },
      { date: 'Feb 4', actual: 155, forecast: 150, confidence_upper: 170 },
      { date: 'Feb 5', actual: 148, forecast: 152, confidence_upper: 172 },
      { date: 'Feb 6', actual: 165, forecast: 160, confidence_upper: 180 },
      { date: 'Feb 7', actual: 175, forecast: 170, confidence_upper: 190 },
      { date: 'Feb 8', actual: 168, forecast: 165, confidence_upper: 185 },
      { date: 'Feb 9', actual: 180, forecast: 175, confidence_upper: 195 },
      { date: 'Feb 10', actual: 190, forecast: 185, confidence_upper: 205 },
    ];

    const mockInventoryTrends = [
      { date: 'Feb 1', total_stock: 5200 },
      { date: 'Feb 2', total_stock: 5150 },
      { date: 'Feb 3', total_stock: 5100 },
      { date: 'Feb 4', total_stock: 5050 },
      { date: 'Feb 5', total_stock: 5200 },
      { date: 'Feb 6', total_stock: 5300 },
      { date: 'Feb 7', total_stock: 5250 },
      { date: 'Feb 8', total_stock: 5400 },
      { date: 'Feb 9', total_stock: 5350 },
      { date: 'Feb 10', total_stock: 5450 },
    ];

    setSummaryData(mockSummary);
    setDemandChart(mockDemandChart);
    setInventoryTrends(mockInventoryTrends);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
          Generate Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Inventory"
          value={summaryData?.total_items || 0}
          change="+12%"
          icon={<Package className="w-6 h-6" />}
          color="blue"
        />
        <KPICard
          title="Active Alerts"
          value={summaryData?.active_alerts || 0}
          change="-5%"
          icon={<AlertCircle className="w-6 h-6" />}
          color="red"
        />
        <KPICard
          title="Low Stock Items"
          value={summaryData?.low_stock_count || 0}
          change="+3%"
          icon={<AlertTriangle className="w-6 h-6" />}
          color="yellow"
        />
        <KPICard
          title="Accurate Predictions"
          value={`${summaryData?.prediction_accuracy || 0}%`}
          change="+2.5%"
          icon={<TrendingUp className="w-6 h-6" />}
          color="green"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demand Forecast */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">30-Day Demand Forecast</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={demandChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="actual" fill="#0284c7" name="Actual Demand" />
              <Line type="monotone" dataKey="forecast" stroke="#22c55e" name="Forecast" strokeWidth={2} />
              <Area type="monotone" dataKey="confidence_upper" fill="#d1fae5" name="Confidence Range" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory Trends */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Inventory Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={inventoryTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="total_stock" fill="#0ea5e9" stroke="#0284c7" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommendation Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recommendation Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Restock', value: 45 },
                  { name: 'Slow Moving', value: 25 },
                  { name: 'Optimized', value: 20 },
                  { name: 'Alert', value: 10 },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
              >
                <Cell fill="#0284c7" />
                <Cell fill="#22c55e" />
                <Cell fill="#eab308" />
                <Cell fill="#ef4444" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Alerts */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Top Active Alerts</h2>
          <div className="space-y-3">
            {[
              { id: 1, product: 'PROD-001', alert: 'Stockout Risk', severity: 'HIGH' },
              { id: 2, product: 'PROD-045', alert: 'Overstock Detected', severity: 'MEDIUM' },
              { id: 3, product: 'PROD-078', alert: 'Expiry Soon', severity: 'HIGH' },
              { id: 4, product: 'PROD-102', alert: 'Supplier Delay', severity: 'MEDIUM' },
            ].map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-gray-900">{alert.product}</p>
                  <p className="text-sm text-gray-600">{alert.alert}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    alert.severity === 'HIGH'
                      ? 'bg-danger-50 text-danger-600'
                      : 'bg-warning-50 text-warning-600'
                  }`}
                >
                  {alert.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ====================
// KPI Card Component
// ====================
const KPICard = ({ title, value, change, icon, color }) => {
  const colorSchemes = {
    blue: 'bg-blue-50 text-blue-700',
    red: 'bg-red-50 text-red-700',
    yellow: 'bg-yellow-50 text-yellow-700',
    green: 'bg-green-50 text-green-700',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <p className="text-sm text-green-600 mt-1">{change} from last month</p>
        </div>
        <div className={`p-3 rounded-full ${colorSchemes[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
