import React, { useState, useEffect } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Clock, X } from 'lucide-react';
import { alertService } from '../services/api';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [filters, setFilters] = useState('ACTIVE');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, [filters]);

  const fetchAlerts = () => {
    // Mock alerts data
    const mockAlerts = [
      {
        id: 1,
        type: 'STOCKOUT_RISK',
        product_id: 'PROD-001',
        severity: 'HIGH',
        message: 'Stock may deplete in 8 days based on predicted demand',
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 2,
        type: 'OVERSTOCK_DETECTED',
        product_id: 'PROD-003',
        severity: 'MEDIUM',
        message: 'Inventory level 3x higher than average. Consider promotions.',
        created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 3,
        type: 'EXPIRY_SOON',
        product_id: 'PROD-015',
        severity: 'HIGH',
        message: 'Product expires in 14 days. Reduce stock or clear inventory.',
        created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 4,
        type: 'SUPPLIER_DELAY',
        product_id: 'PROD-002',
        severity: 'MEDIUM',
        message: 'Supplier SUP-002 expected delivery delayed by 3 days.',
        created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 5,
        type: 'LOW_STOCK',
        product_id: 'PROD-005',
        severity: 'HIGH',
        message: 'Current stock below reorder point. Immediate action recommended.',
        created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      },
    ];

    if (filters === 'ACTIVE') {
      setAlerts(mockAlerts);
    } else if (filters === 'DISMISSED') {
      setAlerts([]);
    } else {
      setAlerts([]);
    }
    setLoading(false);
  };

  const handleDismiss = async (alertId) => {
    try {
      await alertService.dismissAlert(alertId, 'User dismissed');
      setAlerts(alerts.filter((a) => a.id !== alertId));
    } catch (error) {
      console.error('Failed to dismiss alert:', error);
    }
  };

  const handleSnooze = async (alertId, minutes = 60) => {
    try {
      await alertService.snoozeAlert(alertId, minutes);
      setAlerts(alerts.filter((a) => a.id !== alertId));
    } catch (error) {
      console.error('Failed to snooze alert:', error);
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'HIGH':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'MEDIUM':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-50 border-l-4 border-red-600';
      case 'HIGH':
        return 'bg-orange-50 border-l-4 border-orange-600';
      case 'MEDIUM':
        return 'bg-yellow-50 border-l-4 border-yellow-600';
      default:
        return 'bg-blue-50 border-l-4 border-blue-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Alerts & Notifications</h1>
        <div className="text-sm text-gray-600">
          {alerts.length} {filters === 'ACTIVE' ? 'active' : 'dismissed'} alert
          {alerts.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['ACTIVE', 'DISMISSED', 'SNOOZED'].map((filter) => (
          <button
            key={filter}
            onClick={() => setFilters(filter)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filters === filter
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      {loading ? (
        <div className="text-center py-8">Loading alerts...</div>
      ) : alerts.length === 0 ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-2" />
          <p className="text-green-900 font-medium">No alerts</p>
          <p className="text-green-700 text-sm">Your warehouse is running smoothly!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg shadow-sm ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4 flex-1">
                  <div className="pt-1">{getSeverityIcon(alert.severity)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{alert.type}</h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          alert.severity === 'CRITICAL'
                            ? 'bg-red-200 text-red-800'
                            : alert.severity === 'HIGH'
                            ? 'bg-orange-200 text-orange-800'
                            : alert.severity === 'MEDIUM'
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-blue-200 text-blue-800'
                        }`}
                      >
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-1">{alert.message}</p>
                    <div className="flex gap-4 mt-3 text-sm text-gray-600">
                      <span>Product: {alert.product_id}</span>
                      <span>•</span>
                      <span>{new Date(alert.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  {filters === 'ACTIVE' && (
                    <>
                      <button
                        onClick={() => handleSnooze(alert.id, 60)}
                        className="p-2 hover:bg-white rounded-lg transition tooltip"
                        title="Snooze for 1 hour"
                      >
                        <Clock className="w-5 h-5 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDismiss(alert.id)}
                        className="p-2 hover:bg-white rounded-lg transition tooltip"
                        title="Dismiss"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
