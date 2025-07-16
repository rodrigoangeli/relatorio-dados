// src/hooks/useDashboardData.js
import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

export function useDashboardData(primaryFilters, compareFilters) {
  const [vendas, setVendas] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [vendasCompare, setVendasCompare] = useState(null);
  const [analyticsCompare, setAnalyticsCompare] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [
        { data: vendasData },
        { data: analyticsData },
        { data: vendasCmpData },
        { data: analyticsCmpData },
      ] = await Promise.all([
        api.get("/report/vendas", { params: primaryFilters }),
        api.get("/report/analytics", { params: primaryFilters }),
        api.get("/report/vendas", { params: compareFilters }),
        api.get("/report/analytics", { params: compareFilters }),
      ]);

      setVendas(vendasData);
      setAnalytics(analyticsData);
      setVendasCompare(vendasCmpData);
      setAnalyticsCompare(analyticsCmpData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(primaryFilters), JSON.stringify(compareFilters)]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    vendas,
    analytics,
    vendasCompare,
    analyticsCompare,
    loading,
    error,
    refetch: fetchAll,
  };
}
