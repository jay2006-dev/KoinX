// HoldingsTable.jsx
// Renders the full holdings table with selection capabilities

import { useState } from "react";
import TableRow from "./TableRow";
import { useHarvest } from "../context/HarvestContext";

const HoldingsTable = () => {
  const { holdings, selectedIndices, toggleAll } = useHarvest();
  const [showAll, setShowAll] = useState(false);
  const [isSortedDesc, setIsSortedDesc] = useState(false);
  const [isLongSortedDesc, setIsLongSortedDesc] = useState(false);

  const isAllSelected = selectedIndices.size === holdings.length && holdings.length > 0;
  
  // Attach original index before sorting so we can safely select items even when order changes
  let processedHoldings = holdings.map((h, i) => ({ ...h, _origIdx: i }));

  if (isSortedDesc) {
    processedHoldings.sort((a, b) => {
      const gainA = a.stcg?.gain ?? 0;
      const gainB = b.stcg?.gain ?? 0;
      return gainB - gainA; // descending
    });
  } else if (isLongSortedDesc) {
    processedHoldings.sort((a, b) => {
      const gainA = a.ltcg?.gain ?? 0;
      const gainB = b.ltcg?.gain ?? 0;
      return gainB - gainA; // descending
    });
  }

  const handleShortSort = () => {
    setIsLongSortedDesc(false);
    setIsSortedDesc(!isSortedDesc);
  };

  const handleLongSort = () => {
    setIsSortedDesc(false);
    setIsLongSortedDesc(!isLongSortedDesc);
  };

  const displayHoldings = showAll ? processedHoldings : processedHoldings.slice(0, 5);

  return (
    <div className="holdings-table" style={{ overflowX: 'auto', paddingBottom: '16px' }}>
      <table style={{ minWidth: '800px' }}>
        <thead>
          <tr>
            <th style={{ width: '40px', textAlign: 'center' }}>
              <input 
                type="checkbox" 
                checked={isAllSelected}
                onChange={toggleAll}
                style={{ cursor: 'pointer' }}
              />
            </th>
            <th style={{ textAlign: 'left' }}>Asset</th>
            <th style={{ textAlign: 'right' }}>
              <div>Holdings</div>
              <div style={{ fontSize: '11px', fontWeight: 'normal', marginTop: '2px' }}>Avg Buy Price</div>
            </th>
            <th style={{ textAlign: 'right' }}>Current Price</th>
            <th 
              style={{ textAlign: 'right', cursor: 'pointer', userSelect: 'none' }}
              onClick={handleShortSort}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                Short-Term
                <svg 
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: isSortedDesc ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
            </th>
            <th 
              style={{ textAlign: 'right', cursor: 'pointer', userSelect: 'none' }}
              onClick={handleLongSort}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                Long-Term
                <svg 
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: isLongSortedDesc ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
            </th>
            <th style={{ textAlign: 'right' }}>Amount to Sell</th>
          </tr>
        </thead>
        <tbody>
          {displayHoldings && displayHoldings.map((holding) => (
            <TableRow key={holding._origIdx} index={holding._origIdx} holding={holding} />
          ))}
        </tbody>
      </table>
      
      {holdings.length > 5 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <button 
            onClick={() => setShowAll(!showAll)}
            style={{
              backgroundColor: '#16203d',
              border: '1px solid #2b4594',
              color: '#6081fa',
              padding: '8px 24px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px'
            }}
          >
            {showAll ? 'View Less' : 'View More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;
