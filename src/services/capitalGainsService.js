// capitalGainsService.js
// Provides static capital gains data

const GAINS_DATA = {
  "capitalGains": {
    "stcg": {
      "profits": 70200.88,
      "losses": 1548.53
    },
    "ltcg": {
      "profits": 5020,
      "losses": 3050
    }
  }
};

/**
 * Returns capital gains summary data.
 * @returns {{ shortTerm: number, longTerm: number, total: number, raw: object }}
 */
export const getCapitalGains = () => {
  const stcgNet = GAINS_DATA.capitalGains.stcg.profits - GAINS_DATA.capitalGains.stcg.losses;
  const ltcgNet = GAINS_DATA.capitalGains.ltcg.profits - GAINS_DATA.capitalGains.ltcg.losses;

  return {
    raw: GAINS_DATA,
    shortTerm: stcgNet,
    longTerm: ltcgNet,
    total: stcgNet + ltcgNet
  };
};
