import React, { useState, useEffect } from 'react';
import { AlertCircle, TrendingDown, TrendingUp, AlertTriangle, Zap } from 'lucide-react';

export default function Inventory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock inventory data
    const mockData = [
      { product_id: 'PROD-001', product_name: 'Widget A', current_stock: 450, reorder_point: 100, status: 'OPTIMAL', predicted_demand: 125, next_supplier: 'SUP-001' },
      { product_id: 'PROD-002', product_name: 'Widget B', current_stock: 45, reorder_point: 100, status: 'LOW_STOCK', predicted_demand: 85, next_supplier: 'SUP-002' },
      { product_id: 'PROD-003', product_name: 'Gadget X', current_stock: 890, reorder_point: 200, status: 'OVERSTOCK', predicted_demand: 120, next_supplier: 'SUP-001' },
      { product_id: 'PROD-004', product_name: 'Gadget Y', current_stock: 200, reorder_point: 50, status: 'OPTIMAL', predicted_demand: 95, next_supplier: 'SUP-003' },
      { product_id: 'PROD-005', product_name: 'Component Z', current_stock: 15, reorder_point: 100, status: 'LOW_STOCK', predicted_demand: 75, next_supplier: 'SUP-002' },
      { product_id: 'PROD-006', product_name: 'Part ABC', current_stock: 560, reorder_point: 150, status: 'OPTIMAL', predicted_demand: 145, next_supplier: 'SUP-001' },
      { product_id: 'PROD-007', product_name: 'Part DEF', current_stock: 1200, reorder_point: 300, status: 'OVERSTOCK', predicted_demand: 180, next_supplier: 'SUP-003' },
    ];
    
    setData(mockData);
    setLoading(false);
  }, []);


  const getStatusConfig = (status) => {
    const config = {
      OPTIMAL: { bg: 'bg-green-50', text: 'text-green-700', icon: TrendingUp },
      LOW_STOCK: { bg: 'bg-red-50', text: 'text-red-700', icon: AlertCircle },
      OVERSTOCK: { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: TrendingDown },
      EXPIRING: { bg: 'bg-orange-50', text: 'text-orange-700', icon: AlertTriangle },
    };
    return config[status] || config.OPTIMAL;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading inventory...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Zap className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['ALL', 'LOW_STOCK', 'OVERSTOCK', 'OPTIMAL'].map((filter) => (
          <button
            key={filter}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm font-medium"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Product ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Current Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Reorder Point</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">7-Day Forecast</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Supplier</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((product) => {
              const config = getStatusConfig(product.status);
              const Icon = config.icon;
              return (
                <tr key={product.product_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.product_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.product_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.current_stock.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.reorder_point}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded ${config.bg} w-fit`}>
                      <Icon className="w-4 h-4" />
                      <span className={`text-sm font-medium ${config.text}`}>{product.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.predicted_demand}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.next_supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                    <button className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100">View</button>
                    <button className="px-3 py-1 text-sm bg-gray-50 text-gray-700 rounded hover:bg-gray-100">Predict</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
