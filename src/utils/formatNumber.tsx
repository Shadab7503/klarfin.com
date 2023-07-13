export const FormatNumber =(input: any): string => {
    const num: number = Number(input);
    if (Number.isNaN(num)) {
      return "N/A";
    }
    return num.toFixed(2);
  }