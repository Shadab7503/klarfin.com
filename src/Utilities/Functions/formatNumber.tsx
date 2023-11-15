export const FormatNumber = (input: any): string => {
  const num: number = Number(input);
  if (Number.isNaN(num)) {
    return "N/A";
  }

  const numParts = num.toFixed(2).split(".");
  const integerPart = numParts[0];
  const decimalPart = numParts[1] || "00";
  const formattedValue = Number(integerPart).toLocaleString("en-IN");
  const finalValue = formattedValue
  return finalValue;
}

export const FormatDecimal = (input: any): string => {
  const num: number = Number(input);
  if (Number.isNaN(num)) {
    return "N/A";
  }
  const numParts = num.toFixed(2).split(".");
  const integerPart = numParts[0];
  const decimalPart = numParts[1] || "00";
  const finalValue = integerPart + "." + decimalPart;
  return finalValue;
}

export const parseNumber = (indianNumber:any) => {
  const sanitizedNumber = indianNumber.replace(/,/g, '');
  return parseFloat(sanitizedNumber);
}

export const ConvertToPercentage = (numerator: number | string, denominator: number | string): any => {
  const num = Number(numerator);
  const denom = Number(denominator);
  if (num == 0) {
    return 0;
  }
  if (isNaN(num) || isNaN(denom)) {
    return 'N/A';
  }
  return (num / denom) * 100;
}

export const dateConverter = (str:any) => {
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  var date = new Date(str);
  var mnth = (date.getMonth());
  var day = ("0" + date.getDate()).slice(-2);
  var year = date.getFullYear();
  return `${day}-${month[mnth]}-${year}`;
}