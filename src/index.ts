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
export function toMs(str: `${number}` | `${number}${Unit}` | `${number} ${Unit}`): number {
  /* eslint-disable */
  const parts = (/^(-?(?:\d+)?\.?\d+) *(m(?:illiseconds?|s(?:ecs?)?))?(s(?:ec(?:onds?|s)?)?)?(m(?:in(?:utes?|s)?)?)?(h(?:ours?|rs?)?)?(d(?:ays?)?)?(w(?:eeks?|ks?)?)?(y(?:ears?|rs?)?)?$/).exec(str.toLowerCase());

  return parts === null
    ? NaN
    : parts[3] === undefined
      ?
      parts[4] === undefined
        ?
        parts[5] === undefined
          ?
          parts[6] === undefined
            ?
            parts[7] === undefined
              ?
              parts[8] === undefined ? +parts[1] : +parts[1] * 31557600000
              : +parts[1] * 604800000
            : +parts[1] * 86400000
          : +parts[1] * 3600000
        : +parts[1] * 60000
      : +parts[1] * 1000;
}

export function formatMs(value: number): string {
  const absValue = Math.abs(value);

  return absValue < 1000

    ? value + 'ms'
    : absValue < 60000

      ? Math.round(value / 1000) + 's'
      : absValue < 3600000

        ? Math.round(value / 60000) + 'm'
        : absValue < 86400000

          ? Math.round(value / 3600000) + 'h'

          : Math.round(value / 86400000) + 'd';
}

export function formatMsShort(value: number): string {
  const absValue = Math.abs(value);

  return absValue < 1000

    ? value + ' ms'
    : absValue < 60000

      ? Math.round(value / 1000) + ' sec'
      : absValue < 3600000

        ? Math.round(value / 60000) + ' min'
        : absValue < 86400000

          ? Math.round(value / 3600000) + (absValue < 5400000 ? ' hr' : ' hrs')
          : Math.round(value / 86400000) + (absValue < 129600000 ? ' day' : ' days');
}

export function formatMsLong(value: number): string {
  const absValue = Math.abs(value);

  return absValue < 1000

    ? value + ' ms'
    : absValue < 60000

      ? Math.round(value / 1000) + (absValue < 1500 ? ' second' : ' seconds')
      : absValue < 3600000

        ? Math.round(value / 60000) + (absValue < 90000 ? ' minute' : ' minutes')
        : absValue < 86400000

          ? Math.round(value / 3600000) + (absValue < 5400000 ? ' hour' : ' hours')
          : Math.round(value / 86400000) + (absValue < 129600000 ? ' day' : ' days');
}
