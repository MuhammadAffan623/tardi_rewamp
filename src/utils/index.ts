// export function formatNumber(number: number): string {
//   const absNumber = Math.abs(number);
//   let formatted = "";

//   if (absNumber >= 1e9) {
//     formatted = (number / 1e9).toFixed(2) + "B";
//   } else if (absNumber >= 1e6) {
//     formatted = (number / 1e6).toFixed(2) + "M";
//   } else if (absNumber >= 1e3) {
//     formatted = (number / 1e3).toFixed(2) + "K";
//   } else {
//     formatted = number.toFixed(2);
//   }

//   // Remove unnecessary ".00"
//   return parseFloat(formatted).toString();
// }

export function formatNumber(number: number) {
  if (number >= 1e9) {
    return (number / 1e9).toFixed(2) + "B";
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(2) + "M";
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(2) + "K";
  } else {
    return number.toFixed(2).toString();
  }
}