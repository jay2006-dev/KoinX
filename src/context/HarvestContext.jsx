// HarvestContext.jsx
// Provides global state for tax-loss harvesting data across the app

import { createContext, useContext, useState } from "react";
import { getHoldings } from "../services/holdingsService";
import { getCapitalGains } from "../services/capitalGainsService";

const HarvestContext = createContext(null);

export const HarvestProvider = ({ children }) => {
  const [holdings] = useState(() => getHoldings());
  const [capitalGains] = useState(() => getCapitalGains().raw.capitalGains);

  const [selectedIndices, setSelectedIndices] = useState(new Set());

  const toggleSelection = (index) => {
    setSelectedIndices(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIndices.size === holdings.length) {
      setSelectedIndices(new Set());
    } else {
      setSelectedIndices(new Set(holdings.map((_, i) => i)));
    }
  };

  // Derive initial net gains
  const initialStcgNet = capitalGains.stcg.profits - capitalGains.stcg.losses;
  const initialLtcgNet = capitalGains.ltcg.profits - capitalGains.ltcg.losses;
  const initialRealised = initialStcgNet + initialLtcgNet;

  // Calculate after-harvest gains
  let afterStcgProfits = capitalGains.stcg.profits;
  let afterStcgLosses = capitalGains.stcg.losses;
  let afterLtcgProfits = capitalGains.ltcg.profits;
  let afterLtcgLosses = capitalGains.ltcg.losses;

  holdings.forEach((h, index) => {
    if (selectedIndices.has(index)) {
      const stcgGain = h.stcg?.gain ?? 0;
      if (stcgGain > 0) afterStcgProfits += stcgGain;
      else if (stcgGain < 0) afterStcgLosses += Math.abs(stcgGain);

      const ltcgGain = h.ltcg?.gain ?? 0;
      if (ltcgGain > 0) afterLtcgProfits += ltcgGain;
      else if (ltcgGain < 0) afterLtcgLosses += Math.abs(ltcgGain);
    }
  });

  const afterStcgNet = afterStcgProfits - afterStcgLosses;
  const afterLtcgNet = afterLtcgProfits - afterLtcgLosses;
  const afterRealised = afterStcgNet + afterLtcgNet;

  return (
    <HarvestContext.Provider value={{
      holdings,
      selectedIndices,
      toggleSelection,
      toggleAll,
      preHarvest: {
        stcg: capitalGains.stcg,
        ltcg: capitalGains.ltcg,
        stcgNet: initialStcgNet,
        ltcgNet: initialLtcgNet,
        realised: initialRealised
      },
      afterHarvest: {
        stcg: { profits: afterStcgProfits, losses: afterStcgLosses },
        ltcg: { profits: afterLtcgProfits, losses: afterLtcgLosses },
        stcgNet: afterStcgNet,
        ltcgNet: afterLtcgNet,
        realised: afterRealised
      }
    }}>
      {children}
    </HarvestContext.Provider>
  );
};

// Custom hook for consuming context
export const useHarvest = () => {
  const context = useContext(HarvestContext);
  if (!context) {
    throw new Error("useHarvest must be used inside <HarvestProvider>");
  }
  return context;
};

export default HarvestContext;
