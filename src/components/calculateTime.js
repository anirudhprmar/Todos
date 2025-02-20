function cleanNumber(numberString) {
    // Remove all colons and convert to number
    return numberString.split(':').map(num => parseInt(num,10))
  }

function convertToMin(timeString) {
let [time, period] = timeString.split(" ");
let [hour,min] = cleanNumber(time);

if (period === "AM") {
    hour = (hour === 12 ? 0 : hour); // 12 AM -> 0, other AM times stay the same
} else {
    hour = (hour === 12 ? 12 : hour + 12); // 12 PM stays 12, other PM times add 12
}

return hour*60+min;
}


function calculateTimeReq(timeFrom,timeTo){
const fromMinutes = convertToMin(timeFrom)
const toMinutes = convertToMin(timeTo)
// updatedTo - updatedFrom = time req 
let timeReq = (toMinutes - fromMinutes)

if (timeReq < 0) {
    timeReq += 1440;
}
//return time
return ` ${Math.floor(timeReq/60)} hours and ${timeReq %60} minutes`

}

export {calculateTimeReq}