export const FormatNumber =(input: any): string => {
    const num: number = Number(input);
    if (Number.isNaN(num)) {
      return "N/A";
    }

    const numParts = num.toFixed(2).split(".");
    const integerPart = numParts[0];
    const decimalPart = numParts[1] || "00";
    const formattedValue = Number(integerPart).toLocaleString("en-IN");
    const finalValue = formattedValue+"."+decimalPart;
    return finalValue;
  }

// export const FormatNumber=(input:any)=> {
//   const number: number = Number(input);
//     if (typeof number!== "number" || isNaN(number)) {
//       return "N/A"; // Return "N/A" for invalid inputs
//     }
//     const numParts = number.toFixed(2).split(".");
//     const integerPart = numParts[0];
//     const decimalPart = numParts[1] || "00";
//     // Format the integer part with commas for thousands separation
//     const formattedIntegerPart = integerPart.replace(/(\d)(?=(\d{2})+\d$)/g, "$1,");
//     return formattedIntegerPart + "." + decimalPart;
//   }
  
export const ConvertToPercentage = (numerator: number | string, denominator: number | string): any => {
  const num = Number(numerator);
  const denom = Number(denominator);
  if(num==0){
    return 0;
  }
  if (isNaN(num) || isNaN(denom)) {
    return 'N/A';
  }
  return (num / denom) * 100;
}