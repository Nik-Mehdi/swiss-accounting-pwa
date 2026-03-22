// src/utils/ledgerMath.js
export const calculateDynamicLedgers = (baseLedgers = [], transactions = []) => {
  if (!Array.isArray(baseLedgers)) return [];
  
  return baseLedgers.map(ledger => {
    let totalIncome = 0;
    let totalExpense = 0;
    let totalTransferIn = 0;
    let totalTransferOut = 0;

    (transactions || []).forEach(tx => {
      if (tx.ledger === ledger.name) {
        if (tx.type === "income") totalIncome += Number(tx.amount);
        if (tx.type === "expense") totalExpense += Math.abs(Number(tx.amount));
        if (tx.type === "transfer") totalTransferOut += Math.abs(Number(tx.amount));
      }
      if (tx.type === "transfer" && tx.toLedger === ledger.name) {
        totalTransferIn += Math.abs(Number(tx.amount));
      }
    });

    const currentBalance = (ledger.openingBalance || 0) + totalIncome + totalTransferIn - totalExpense - totalTransferOut;
    const relatedTxs = (transactions || []).filter(tx => tx.ledger === ledger.name || (tx.type === "transfer" && tx.toLedger === ledger.name));

    return {
      ...ledger,
      balance: currentBalance, 
      txCount: relatedTxs.length 
    };
  });
};