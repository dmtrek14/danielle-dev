export function getYearsBetweenDates(startDate: Date, endDate?: Date): string {
    let timeBetweenDates: string;
    let start = new Date(startDate);
    let end = new Date(endDate);
    let now = new Date(Date.now());
    
    if(endDate == null){
        timeBetweenDates = getYearDiffDecimal(start, now);
    }
    else {
        timeBetweenDates = getYearDiffDecimal(start, end)
    }

    return timeBetweenDates;
}


function getYearDiffDecimal(startDate: Date, endDate: Date): string { 
  const msInYear = 365 * 24 * 60 * 60 * 1000;
  return Math.round((Number(endDate) - Number(startDate)) / msInYear).toString();
}