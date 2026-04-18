// TableRow.jsx
// Renders a single row in the HoldingsTable for one asset

import { useHarvest } from "../context/HarvestContext";

const TableRow = ({ holding, index }) => {
  const { selectedIndices, toggleSelection } = useHarvest();

  const isSelected = selectedIndices.has(index);

  const formatCurrency = (val) => val != null ? `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "-";

  return (
    <tr style={{ backgroundColor: isSelected ? 'rgba(43, 106, 255, 0.1)' : 'transparent', transition: 'background-color 0.2s' }}>
      <td style={{ textAlign: 'center', width: '40px' }}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleSelection(index)}
          style={{ cursor: 'pointer', backgroundColor: 'transparent', accentColor: 'transparent' }}
        />
      </td>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {holding?.logo && <img src={holding.logo} alt={holding.coin} width="28" height="28" style={{ borderRadius: '50%' }} />}
          <div>
            <div style={{ fontWeight: '500', color: '#fff' }}>{holding?.coinName ?? holding?.coin}</div>
            <div style={{ fontSize: '12px', color: '#a0aab8' }}>{holding?.coin}</div>
          </div>
        </div>
      </td>
      <td style={{ textAlign: 'right' }}>
        <div style={{ fontWeight: '500', color: '#fff' }} tooltip={holding?.totalHolding?.toLocaleString('en-US', { maximumFractionDigits: 6 })}>{holding?.totalHolding?.toLocaleString('en-US', { maximumFractionDigits: 6 }) + " " + holding?.coin ?? "-"}</div>
        <div style={{ fontSize: '12px', color: '#a0aab8' }}>{formatCurrency(holding?.averageBuyPrice)}/{holding?.coin}</div>
      </td>
      <td style={{ textAlign: 'right', color: '#fff' }} tooltip={formatCurrency(holding?.currentPrice)}>{formatCurrency(holding?.currentPrice)}</td>
      <td style={{ textAlign: 'right' }}>
        <div style={{ color: (holding?.stcg?.gain ?? 0) >= 0 ? '#10b981' : '#ef4444', fontWeight: '500' }} tooltip={formatCurrency(holding?.stcg?.gain)}>
          {formatCurrency(holding?.stcg?.gain)}
        </div>
      </td>
      <td style={{ textAlign: 'right' }}>
        <div style={{ color: (holding?.ltcg?.gain ?? 0) >= 0 ? '#10b981' : '#ef4444', fontWeight: '500' }} tooltip={formatCurrency(holding?.ltcg?.gain)}>
          {formatCurrency(holding?.ltcg?.gain)}
        </div>
      </td>
      <td style={{ textAlign: 'right', color: '#fff' }} tooltip={isSelected ? holding?.totalHolding?.toLocaleString('en-US', { maximumFractionDigits: 6 }) + " " + holding?.coin : "-"}>
        {isSelected ? holding?.totalHolding?.toLocaleString('en-US', { maximumFractionDigits: 6 }) + " " + holding?.coin : "-"}
      </td>
    </tr>
  );
};

export default TableRow;
