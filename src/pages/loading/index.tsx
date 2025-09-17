import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function LoadingOverlay() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-700"></div>
    </div>
  );
}
