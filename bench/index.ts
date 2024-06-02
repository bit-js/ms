import * as lukeedMs from '@lukeed/ms';
import * as bitMs from '../src';
import vercelMs from 'ms';
import assert from 'assert';
import { group, run, bench } from 'mitata';

for (let i = 0; i < 15; ++i) bench('noop', () => { });

group('parse', () => {
  const inputs = [
    ['100', '100', 100],
    ['1m', '1 minute', 60000],
    ['1m', '1min', 60000],
    ['1h', '1hr', 3600000],
    ['1h', '1 hr', 3600000],
    ['1h', '1 hour', 3600000],
    ['2d', '2 days', 172800000],
    ['3w', '3 week', 1814400000],
    ['3w', '3 weeks', 1814400000],
    ['1s', '1 sec', 1000],
    ['1s', '1 second', 1000],
    ['100ms', '100 milliseconds', 100],
    ['1.5h', '1.5 hours', 5400000],
    ['1   s', '1 secs', 1000],

    ['1.5H', '1.5 HOURS', 5400000],
    ['.5ms', '0.5 millisecond', 0.5],
    ['-100ms', '-100 ms', -100],
    ['-1.5h', '-1.5 hour', -5400000],
    ['-10.5h', '-10.5 hours', -37800000],
    ['-.5h', '-.5 hour', -1800000],
  ] as const;

  function wrap(parser: any) {
    return (input: (typeof inputs)[number]) => [parser(input[0]), parser(input[1])];
  }

  const parsers = {
    '@lukeed/ms': wrap(lukeedMs.parse),
    '@bit-js/ms': wrap(bitMs.toMs),
    '@vercel/ms': wrap(vercelMs)
  };

  for (const key in parsers) {
    const parser = parsers[key];

    for (let i = 0, { length } = inputs; i < length; ++i) {
      const input = inputs[i];
      const res = parser(input);

      console.log(input, res[0], res[1]);
      assert.strictEqual(res[0], res[1]);
      assert.strictEqual(res[1], input[2]);
    }

    bench(key, () => inputs.map(parser));
  }
});

group('format', () => {
  const inputs = [
    [500, '500ms', '500 ms'],
    [-500, '-500ms', '-500 ms'],

    [1000, '1s', '1 second'],
    [10000, '10s', '10 seconds'],
    [-1000, '-1s', '-1 second'],
    [-10000, '-10s', '-10 seconds'],

    [60 * 1000, '1m', '1 minute'],
    [60 * 10000, '10m', '10 minutes'],
    [-1 * 60 * 1000, '-1m', '-1 minute'],
    [-1 * 60 * 10000, '-10m', '-10 minutes'],

    [60 * 60 * 1000, '1h', '1 hour'],
    [60 * 60 * 10000, '10h', '10 hours'],
    [-1 * 60 * 60 * 1000, '-1h', '-1 hour'],
    [-1 * 60 * 60 * 10000, '-10h', '-10 hours'],

    [24 * 60 * 60 * 1000, '1d', '1 day'],
    [24 * 60 * 60 * 10000, '10d', '10 days'],
    [-1 * 24 * 60 * 60 * 1000, '-1d', '-1 day'],
    [-1 * 24 * 60 * 60 * 10000, '-10d', '-10 days'],

    [234234234, '3d', '3 days'],
    [-234234234, '-3d', '-3 days'],
  ] as const;

  function wrap(formatter: (x: number, long: boolean) => string) {
    return (input: (typeof inputs)[number]) => [formatter(input[0], false), formatter(input[0], true)] as const;
  }

  const formatters = {
    '@lukeed/ms': wrap(lukeedMs.format),
    '@bit-js/ms': wrap((x, long) => long === true ? bitMs.formatMsLong(x) : bitMs.formatMs(x)),
    '@vercel/ms': wrap((x, long) => vercelMs(x, { long }))
  };

  for (const key in formatters) {
    const format = formatters[key];

    for (let i = 0, { length } = inputs; i < length; ++i) {
      const input = inputs[i];
      const res = format(input);

      console.log(input);

      assert.strictEqual(res[0], input[1]);
      assert.strictEqual(res[1], input[2]);
    }

    bench(key, () => inputs.map(format));
  }
})

await run();
