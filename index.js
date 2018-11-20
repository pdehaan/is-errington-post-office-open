const DAYS = {SUN:0, MON:1, TUE: 2, WED:3, THU:4, FRI:5, SAT:6};
const HOURS = new Map();
HOURS.set(DAYS.SUN, []); // closed
HOURS.set(DAYS.MON, [["8:30", "12:00"], ["12:30", "16:00" /* 4pm */]]);
HOURS.set(DAYS.TUE, [["8:30", "12:00"], ["12:30", "19:00" /* 7pm */]]);
HOURS.set(DAYS.WED, [["8:30", "12:30"]]);
HOURS.set(DAYS.THU, [["8:30", "12:00"], ["12:30", "19:00" /* 7pm */]]);
HOURS.set(DAYS.FRI, [["8:30", "12:00"], ["12:30", "16:00" /* 4pm */]]);
HOURS.set(DAYS.SAT, [["8:30", "14:30" /* 2:30pm */]]);

module.exports = {
  DAYS,
  HOURS,
  isOpen,
  schedule
};

function isOpen(date) {
  const currentTime = `${date.getHours()}:${date.getMinutes()}`;
  return HOURS.get(date.getDay())
    .some(([open, close]) => isTimeBetween(open, close, currentTime));
}

function timeInMins(hhmm) {
  const [hh, mm=0] = hhmm.split(":", 2);
  return (parseInt(hh, 10) * 60) + parseInt(mm, 10);
}

function isTimeBetween(startTime, endTime, currentTime) {
  const _startTime = timeInMins(startTime);
  const _endTime = timeInMins(endTime);
  const _currentTime = timeInMins(currentTime);

  return _currentTime >= _startTime && _currentTime <= _endTime;
}

function schedule(date) {
  const open = isOpen(date);
  const hours = HOURS.get(date.getDay())
    .map(([open, close]) => `${prettyTime(open)} -- ${prettyTime(close)}`)
    .join(", ");
  return {date, open, hours};
}

function prettyTime(hhmm) {
  const [hh, mm=0] = hhmm.split(":", 2);
  return new Date(0, 0, 0, hh, mm)
    .toLocaleTimeString()
    .replace(/:00\s/, "")
    .toLowerCase();
}
