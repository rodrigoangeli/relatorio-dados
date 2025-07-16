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
  initialFilters,
  initialCompare,
  children,
}) {
  const [primaryFilters, setPrimaryFilters] = useState(initialFilters);
  const [compareFilters, setCompareFilters] = useState(initialCompare);

  const [data, setData] = useState({
    vendas: null,
    analytics: null,
    vendasCompare: null,
    analyticsCompare: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    console.log(primaryFilters);
    if (primaryFilters) {
      setLoading(true);
      setError(null);
      try {
        const [vendasRes, analyticsRes, vendasCmpRes, analyticsCmpRes] =
          await Promise.all([
            api.get("/report/vendas", { params: primaryFilters }),
            api.get("/report/analytics", { params: primaryFilters }),
            api.get("/report/vendas", { params: compareFilters }),
            api.get("/report/analytics", { params: compareFilters }),
          ]);
        setData({
          vendas: vendasRes.data,
          analytics: analyticsRes.data,
          vendasCompare: vendasCmpRes.data,
          analyticsCompare: analyticsCmpRes.data,
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  }, [primaryFilters, compareFilters]);

  // fetch on filters change
  useEffect(() => {
    fetchAll();
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
