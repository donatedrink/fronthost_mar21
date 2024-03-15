const excludeSchFromLoan = (multiplier, totalSaving, prcntLis, prcntSch) => {
  return;
};

const includeSchToLoan = (multiplier, totalSaving, prcntLis, prcntSch) => {
  return {
    schpay: multiplier * totalSaving * (prcntLis + prcntSch) + 5,
    netcash: multiplier * totalSaving * (1 - (prcntLis + prcntSch)) - 5,
    loan: multiplier * totalSaving,
  };
};

export { includeSchToLoan, excludeSchFromLoan };
