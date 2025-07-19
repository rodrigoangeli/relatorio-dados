export function formatPercent(value, decimals = 2) {
  return (
    value.toLocaleString("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + "%"
  );
}

export function formatCurrencyBRL(value, decimals = 2) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function numFmt(value) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/* 
// Uso:
const diffPercent = (1520.8 / 1501.62 - 1) * 100;

console.log(formatPercent(diffPercent)); // "1,26%"

console.log(formatCurrencyBRL(1520.8)); // "R$ 1.520,80"
console.log(formatCurrencyBRL(1000)); // "R$ 1.000,00"
 */
