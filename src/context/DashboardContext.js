import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import api from "../services/api";

// Context to provide dashboard data
const DashboardContext = createContext(null);

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context)
    throw new Error("useDashboard must be used within DashboardProvider");
  return context;
}

export function DashboardProvider({
  isDisabled,
  initialFilters,
  initialCompare,
  children,
}) {
  const [primaryFilters, setPrimaryFilters] = useState(initialFilters);
  const [compareFilters, setCompareFilters] = useState(initialCompare);

  const [data, setData] = useState({
    vendas: null,
    analytics: null,
    leads: null,
    metaAds: null,
    vendasCompare: null,
    analyticsCompare: null,
    leadsCompare: null,
    metaAdsCompare: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [
        vendasRes,
        analyticsRes,
        leadsRes,
        metaAdsRes,
        vendasCmpRes,
        analyticsCmpRes,
        leadsCmpRes,
        metaAdsCmpRes,
      ] = await Promise.all([
        api.get("/report/vendas", { params: primaryFilters }),
        api.get("/report/analytics", { params: primaryFilters }),
        api.get("/report/leads", { params: primaryFilters }),
        api.get("/report/meta-ads", { params: primaryFilters }),
        api.get("/report/vendas", { params: compareFilters }),
        api.get("/report/analytics", { params: compareFilters }),
        api.get("/report/leads", { params: compareFilters }),
        api.get("/report/meta-ads", { params: compareFilters }),
      ]);
      setData({
        vendas: vendasRes.data,
        analytics: analyticsRes.data,
        leads: leadsRes.data,
        metaAds: metaAdsRes.data,
        vendasCompare: vendasCmpRes.data,
        analyticsCompare: analyticsCmpRes.data,
        leadsCompare: leadsCmpRes.data,
        metaAdsCompare: metaAdsCmpRes.data,
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [primaryFilters, compareFilters]);

  // fetch on filters change
  useEffect(() => {
    if (!isDisabled) {
      fetchAll();
    }
  }, [fetchAll]);

  return (
    <DashboardContext.Provider
      value={{
        data,
        loading,
        error,
        primaryFilters,
        compareFilters,
        setPrimaryFilters,
        setCompareFilters,
        refetch: fetchAll,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
