# MS

Optimized conversion from and to milliseconds.

To convert milliseconds to string:

```ts
// 172800000
toMs("2 days");

// 86400000
toMs("1d");

// 36000000
toMs("10h");

// 9000000
toMs("2.5 hrs");

// 7200000
toMs("2h");

// 60000
toMs("1m");

// 5000
toMs("5s");

// 31557600000
toMs("1y");

// 100
toMs("100");

// -259200000
toMs("-3 days");

// -3600000
toMs("-1h");

// -200
toMs("-200");
```

And convert from milliseconds to string:

```ts
// "1m"
formatMs(60000);

// "1 minute"
formatMsLong(60000);
```
