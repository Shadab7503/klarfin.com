export const FormatNumber =(input: any): string => {
    const num: number = Number(input);
    if (Number.isNaN(num)) {
      return "N/A";
    }
    return num.toFixed(2);
  }


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