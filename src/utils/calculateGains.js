// calculateGains.js
// Pure utility functions for computing short-term and long-term capital gains

/**
 * Calculates short-term and long-term gains from a holdings array.
 * @param {Array} holdings
 * @returns {{ shortTerm: number, longTerm: number, total: number }}
 */
export const calculateGains = (holdings = []) => {
  let shortTerm = 0;
  let longTerm = 0;

  holdings.forEach((holding) => {
    shortTerm += holding?.stcg?.gain ?? 0;
    longTerm += holding?.ltcg?.gain ?? 0;
  });

  return {
    shortTerm,
    longTerm,
    total: shortTerm + longTerm,
  };
};
