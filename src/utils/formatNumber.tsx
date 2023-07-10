export const FormatNumber = (number:any):any=>{
    if(!number){
        return NaN;
    }
    let num:Number = parseFloat(number);
    return num.toFixed(2);
}