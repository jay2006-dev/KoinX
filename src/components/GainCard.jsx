const GainCard = ({ title, isAfter, data, savings }) => {
  const cardStyle = {
    padding: '16px',
    borderRadius: '8px',
    flex: 1,
    minWidth: '400px',
    color: isAfter ? '#fff' : 'var(--text-main)',
    backgroundColor: isAfter ? '#2b6aff' : 'var(--card-dark-bg)',
    fontFamily: 'system-ui, sans-serif'
  };

  const formatCurrency = (val) => {
    const isNegative = val < 0;
    const absVal = Math.abs(val || 0);
    const formatted = `$${absVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return isNegative ? `-${formatted}` : formatted;
  };

  const colStyle = { width: '33%', textAlign: 'right' };
  const firstColStyle = { width: '33%', textAlign: 'left', color: isAfter ? 'rgba(255,255,255,0.8)' : 'var(--secondary-text)' };

  return (
    <div className="gain-card" style={cardStyle}>
      <h2 style={{ fontSize: '15px', marginBottom: '16px', marginTop: 0 }}>{title}</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr>
            <th style={{ ...firstColStyle, paddingBottom: '10px' }}></th>
            <th style={{ ...colStyle, paddingBottom: '10px', fontWeight: 'normal', color: isAfter ? '#fff' : 'var(--secondary-text)', fontSize: '12px' }}>Short-term</th>
            <th style={{ ...colStyle, paddingBottom: '10px', fontWeight: 'normal', color: isAfter ? '#fff' : 'var(--secondary-text)', fontSize: '12px' }}>Long-term</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: '13.5px' }}>
          <tr>
            <td style={{ ...firstColStyle, paddingBottom: '8px' }}>Profits</td>
            <td style={{ ...colStyle, paddingBottom: '8px' }}>{formatCurrency(data.stcg.profits)}</td>
            <td style={{ ...colStyle, paddingBottom: '8px' }}>{formatCurrency(data.ltcg.profits)}</td>
          </tr>
          <tr>
            <td style={{ ...firstColStyle, paddingBottom: '8px' }}>Losses</td>
            <td style={{ ...colStyle, paddingBottom: '8px' }}>{formatCurrency(data.stcg.losses)}</td>
            <td style={{ ...colStyle, paddingBottom: '8px' }}>{formatCurrency(data.ltcg.losses)}</td>
          </tr>
          <tr>
            <td style={{ ...firstColStyle, paddingBottom: '10px', fontWeight: '500', color: isAfter ? '#fff' : 'var(--text-main)' }}>Net Capital Gains</td>
            <td style={{ ...colStyle, paddingBottom: '10px', fontWeight: '500' }}>{formatCurrency(data.stcgNet)}</td>
            <td style={{ ...colStyle, paddingBottom: '10px', fontWeight: '500' }}>{formatCurrency(data.ltcgNet)}</td>
          </tr>
        </tbody>
      </table>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: isAfter ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.1)',
        paddingTop: '12px',
        fontWeight: 'bold',
        fontSize: '15px'
      }}>
        <span>{isAfter ? 'Effective Capital Gains:' : 'Realised Capital Gains:'}</span>
        <span>{formatCurrency(data.realised)}</span>
      </div>
    </div>
  );
};

export default GainCard;
