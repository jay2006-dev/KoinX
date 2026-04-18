// GainCard.jsx
// Displays a detailed summary card for pre/post tax loss harvesting

const GainCard = ({ title, isAfter, data, savings }) => {
  const cardStyle = {
    padding: '20px',
    borderRadius: '8px',
    flex: 1,
    minWidth: '400px',
    color: '#fff',
    backgroundColor: isAfter ? '#2b6aff' : '#1a1b23',
    fontFamily: 'system-ui, sans-serif'
  };

  const formatCurrency = (val) => {
    const isNegative = val < 0;
    const absVal = Math.abs(val || 0);
    const formatted = `$${absVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return isNegative ? `-${formatted}` : formatted;
  };

  const colStyle = { width: '33%', textAlign: 'right' };
  const firstColStyle = { width: '33%', textAlign: 'left', color: '#e2e8f0' };

  return (
    <div className="gain-card" style={cardStyle}>
      <h2 style={{ fontSize: '16px', marginBottom: '24px', marginTop: 0 }}>{title}</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
        <thead>
          <tr>
            <th style={{ ...firstColStyle, paddingBottom: '16px' }}></th>
            <th style={{ ...colStyle, paddingBottom: '16px', fontWeight: 'normal', color: isAfter ? '#fff' : '#a0aab8', fontSize: '13px' }}>Short-term</th>
            <th style={{ ...colStyle, paddingBottom: '16px', fontWeight: 'normal', color: isAfter ? '#fff' : '#a0aab8', fontSize: '13px' }}>Long-term</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: '14px' }}>
          <tr>
            <td style={{ ...firstColStyle, paddingBottom: '12px' }}>Profits</td>
            <td style={{ ...colStyle, paddingBottom: '12px' }}>{formatCurrency(data.stcg.profits)}</td>
            <td style={{ ...colStyle, paddingBottom: '12px' }}>{formatCurrency(data.ltcg.profits)}</td>
          </tr>
          <tr>
            <td style={{ ...firstColStyle, paddingBottom: '12px' }}>Losses</td>
            <td style={{ ...colStyle, paddingBottom: '12px' }}>{formatCurrency(data.stcg.losses)}</td>
            <td style={{ ...colStyle, paddingBottom: '12px' }}>{formatCurrency(data.ltcg.losses)}</td>
          </tr>
          <tr>
            <td style={{ ...firstColStyle, paddingBottom: '16px', fontWeight: '500', color: '#fff' }}>Net Capital Gains</td>
            <td style={{ ...colStyle, paddingBottom: '16px', fontWeight: '500' }}>{formatCurrency(data.stcgNet)}</td>
            <td style={{ ...colStyle, paddingBottom: '16px', fontWeight: '500' }}>{formatCurrency(data.ltcgNet)}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderTop: isAfter ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.1)', 
        paddingTop: '16px',
        fontWeight: 'bold', 
        fontSize: '16px' 
      }}>
        <span>{isAfter ? 'Effective Capital Gains:' : 'Realised Capital Gains:'}</span>
        <span>{formatCurrency(data.realised)}</span>
      </div>
    </div>
  );
};

export default GainCard;
