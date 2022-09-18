
export function workingOutPostTime(postTime) {
  const currentTime = +new Date();
  const compareStamps = currentTime - postTime;
  const stampToDateCurr = new Date(currentTime);
  const StampToDatePost = new Date(postTime);

  // Formula
  const formulaForYears = stampToDateCurr.getFullYear() - StampToDatePost.getFullYear();
  const formulaForMonths =
    stampToDateCurr.getMonth() -
    StampToDatePost.getMonth() +
    12 * (stampToDateCurr.getFullYear() - StampToDatePost.getFullYear());
  const formulaForDays = Math.floor(compareStamps / (1000 * 60 * 60 * 24));
  const formulaForHours = Math.floor(compareStamps / (1000 * 60 * 60));
  const formulaForMins = Math.floor(compareStamps / (1000 * 60));

  // Mins
  if (formulaForMins === 0 && formulaForDays < 1) {
    return "less than a minute ago";
  }
  if (formulaForMins === 1 && formulaForDays < 1) {
    return "1 minute ago";
  }
  if (formulaForMins > 1 && formulaForMins < 60 && formulaForHours < 1) {
    return `${formulaForMins} minute ago`;
  }

  //HOURS
  if (formulaForHours === 1 && formulaForDays < 1) {
    return "1 Hour ago";
  }
  if (formulaForHours > 1 && formulaForDays < 1) {
    return `${formulaForHours} Hours ago`;
  }

  // DAYS
  if (formulaForDays === 1) {
    return `${formulaForDays} day ago`;
  }
  if (formulaForDays > 1 && formulaForDays < 7) {
    return `${formulaForDays} days ago`;
  }

  // WEEKS
  if (formulaForDays >= 7 && formulaForDays < 14) {
    return "1 Week Ago";
  }
  if (formulaForDays >= 14 && formulaForDays < 21) {
    return "2 Weeks Ago";
  }
  if (formulaForDays >= 21 && formulaForDays < 28) {
    return "3 Weeks Ago";
  }
  
  // MONTHS
  if (formulaForDays >= 28 && formulaForDays < 35) {
    return "1 Month Ago";
  }
  if (formulaForMonths > 1 && formulaForMonths < 12) {
    return `${formulaForMonths} Months ago`;
  }

  // YEARS
  if (formulaForMonths >= 12 && formulaForYears === 1){
    return "1 Year ago"
  }
  if (formulaForYears > 1){
    return `${formulaForYears} Years ago`
  }

  return "temp return";
}
