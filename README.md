# KoinX - Tax Loss Harvesting Module

This project implements a React application demonstrating a Tax Loss Harvesting feature for a crypto portfolio.

## 🚀 Features

- **Pre-Harvesting Analytics**: Displays initial short-term and long-term capital gains, detailing both profits and losses.
- **Dynamic Post-Harvesting Analytics**: A side-by-side card dynamically updates to show projected capital gains and estimated tax savings as you interact with the holdings table.
- **Interactive Holdings Table**:
  - Displays asset details including total holdings, buy price, current price, and individual capital gains.
  - Checkboxes allow selecting specific assets to simulate tax loss harvesting.
  - Automatically calculates the "Amount to Sell" based on your total holdings for selected assets.
  - "Select All" functionality available in the table header.
- **Real-Time Tax Savings Indicator**: When a simulated sale of a depreciated asset reduces the total realised capital gains, a savings message automatically highlights your potential tax benefit.

## 📁 Folder Structure

```text
/src
  /components
    GainCard.jsx          # Reusable analytics card (used for both Pre and Post harvesting)
    HoldingsTable.jsx     # Main table component with selection logic
    TableRow.jsx          # Individual row component for table items
  /context
    HarvestContext.jsx    # React Context managing selection state and derived calculations
  /services
    capitalGainsService.js # Returns initial API payload for capital gains
    holdingsService.js     # Returns initial API payload for user holdings
  /utils
    calculateGains.js      # Utility functions (if needed)
  App.jsx                 # Main layout structure wiring components together
  App.css                 # Application styling
```

## 💻 Setup Instructions

1. Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
2. Clone this repository to your local machine.
3. Open your terminal and navigate to the root directory of the project.
4. Install the necessary dependencies by running:
   ```bash
   npm install
   ```
5. Start the development server by running:
   ```bash
   npm run dev
   ```
6. Open your browser and navigate to the local URL provided in the terminal (usually `http://localhost:5173/` or `http://localhost:5174/`).

## 📸 Screenshots

*(In a real GitHub environment, screenshots of the Pre/Post cards and interactive table would be placed here)*

![App Screenshot](./src/assets/screenshot.png)

## 💡 Assumptions

1. **Calculations**:
   - Total Realised Gains = `(Short-term Profits - Short-term Losses) + (Long-term Profits - Long-term Losses)`.
   - When a user selects a holding with a positive gain, it's strictly added to the `profits` tally of the corresponding term.
   - When a user selects a holding with a negative gain, its absolute value is added to the `losses` tally of the corresponding term.
2. **Data Structure**:
   - The application relies on a static JSON structure mirroring a standard API response for both Holdings and Capital Gains.
   - Currency is formatted in Indian Rupees (₹) according to the provided requirements.
3. **Savings Calculation**:
   - The savings amount is simply the absolute mathematical difference between the Pre-Harvesting Realised Gains and Post-Harvesting Realised Gains. It assumes a 1:1 correlation for demonstration purposes, without applying specific tax bracket percentages.
