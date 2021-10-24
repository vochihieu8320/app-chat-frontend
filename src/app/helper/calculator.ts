

export function roundTo(amount: number, digits: number): number {
  let negative = false;
  if (digits === undefined) {
    digits = 0;
  }
  if (amount < 0) {
    negative = true;
    amount = amount * -1;
  }
  const multiplicator = Math.pow(10, digits);
  amount = parseFloat((amount * multiplicator).toFixed(11));
  amount = Number((Math.round(amount) / multiplicator).toFixed(digits));
  if (negative) {
    amount = Number((amount * -1).toFixed(digits));
  }
  return amount;
};