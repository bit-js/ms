type UnitPascalCase =
  | 'Years'
  | 'Year'
  | 'Yrs'
  | 'Yr'
  | 'Y'
  | 'Weeks'
  | 'Week'
  | 'W'
  | 'Days'
  | 'Day'
  | 'D'
  | 'Hours'
  | 'Hour'
  | 'Hrs'
  | 'Hr'
  | 'H'
  | 'Minutes'
  | 'Minute'
  | 'Mins'
  | 'Min'
  | 'M'
  | 'Seconds'
  | 'Second'
  | 'Secs'
  | 'Sec'
  | 's'
  | 'Milliseconds'
  | 'Millisecond'
  | 'Msecs'
  | 'Msec'
  | 'Ms';

type Unit = UnitPascalCase | Uppercase<UnitPascalCase> | Lowercase<UnitPascalCase>;

// Map every single possible suffix
const suffixMap = { '': 1, Milliseconds: 1, Millisecond: 1, Msecs: 1, Msec: 1, Ms: 1, Seconds: 1000, Second: 1000, Secs: 1000, Sec: 1000, s: 1000, Minutes: 60000, Minute: 60000, Mins: 60000, Min: 60000, M: 60000, Hours: 3600000, Hour: 3600000, Hrs: 3600000, Hr: 3600000, H: 3600000, Days: 86400000, Day: 86400000, D: 86400000, Weeks: 604800000, Week: 604800000, W: 604800000, Years: 31557600000, Year: 31557600000, Yrs: 31557600000, Yr: 31557600000, Y: 31557600000, milliseconds: 1, MILLISECONDS: 1, millisecond: 1, MILLISECOND: 1, msecs: 1, MSECS: 1, msec: 1, MSEC: 1, ms: 1, MS: 1, seconds: 1000, SECONDS: 1000, second: 1000, SECOND: 1000, secs: 1000, SECS: 1000, sec: 1000, SEC: 1000, S: 1000, minutes: 60000, MINUTES: 60000, minute: 60000, MINUTE: 60000, mins: 60000, MINS: 60000, min: 60000, MIN: 60000, m: 60000, hours: 3600000, HOURS: 3600000, hour: 3600000, HOUR: 3600000, hrs: 3600000, HRS: 3600000, hr: 3600000, HR: 3600000, h: 3600000, days: 86400000, DAYS: 86400000, day: 86400000, DAY: 86400000, d: 86400000, weeks: 604800000, WEEKS: 604800000, week: 604800000, WEEK: 604800000, w: 604800000, years: 31557600000, YEARS: 31557600000, year: 31557600000, YEAR: 31557600000, yrs: 31557600000, YRS: 31557600000, yr: 31557600000, YR: 31557600000, y: 31557600000 };

export function toMs(str: `${number}` | `${number}${Unit}` | `${number} ${Unit}`) {
  const endNumberIdx = str.search(/[^0-9.-]/);
  if (endNumberIdx === -1) return +str;
  if (endNumberIdx === 0) return NaN;

  const num = +str.substring(0, endNumberIdx);
  if (isNaN(num)) return num;

  const spaceIdx = str.lastIndexOf(' ');
  return num * suffixMap[str.substring(spaceIdx === -1 ? endNumberIdx : spaceIdx + 1) as Unit];
}

export function formatMs(value: number) {
  const absValue = Math.abs(value);

  return absValue < 1000 ? value + 'ms'
    : absValue < 60000 ? Math.round(value / 1000) + 's'
      : absValue < 3600000 ? Math.round(value / 60000) + 'm'
        : absValue < 86400000 ? Math.round(value / 3600000) + 'h'
          : Math.round(value / 86400000) + 'd';
}

export function formatMsLong(value: number) {
  const absValue = Math.abs(value);

  return absValue < 1000 ? value + (absValue > 1.5 ? ' milliseconds' : ' millisecond')
    : absValue < 60000 ? Math.round(value / 1000) + (absValue > 1500 ? ' seconds' : ' second')
      : absValue < 3600000 ? Math.round(value / 60000) + (absValue > 90000 ? ' minutes' : ' minute')
        : absValue < 86400000 ? Math.round(value / 3600000) + (absValue > 5400000 ? ' hours' : ' hour')
          : Math.round(value / 86400000) + (absValue > 129600000 ? ' days' : ' day');
}
