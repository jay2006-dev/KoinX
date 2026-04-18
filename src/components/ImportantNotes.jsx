import { useState } from "react";

const ImportantNotes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  const notesText = `• Price Source Disclaimer: Please note that the current price of your coins may differ from the prices listed on specific exchanges. This is because we use CoinGecko as our default price source for certain exchanges, rather than fetching prices directly from the exchange.

• Country-specific Availability: Tax loss harvesting may not be supported in all countries. We strongly recommend consulting with your local tax advisor or accountant before performing any related actions on your exchange.

• Utilization of Losses: Tax loss harvesting typically allows you to offset capital gains. However, if you have zero or no applicable crypto capital gains, the usability of these harvested losses may be limited. Kindly confirm with your tax advisor how such losses can be applied in your situation.`;

  const toggleNotes = () => {
    if (isOpen) {
      setContent("");
      setIsOpen(false);
    } else {
      setContent(notesText);
      setIsOpen(true);
    }
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <button 
        onClick={toggleNotes}
        style={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backgroundColor: '#16203d',
          border: '1px solid #2b4594',
          color: '#e2e8f0',
          padding: '12px 16px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6081fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          Important Notes And Disclaimers
        </div>
        <svg 
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      {isOpen && (
        <div style={{ 
          backgroundColor: '#16203d', 
          border: '1px solid #2b4594', 
          borderTop: 'none',
          padding: '20px', 
          borderBottomLeftRadius: '8px', 
          borderBottomRightRadius: '8px',
          color: '#e2e8f0',
          fontSize: '14px',
          lineHeight: '1.6'
        }}>
          <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {content.split('\n\n').map((paragraph, index) => {
              const parts = paragraph.split(': ');
              return (
                <span key={index} style={{ display: 'block', marginBottom: index !== 2 ? '12px' : '0' }}>
                  <strong>{parts[0]}: </strong>{parts[1]}
                </span>
              );
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImportantNotes;
