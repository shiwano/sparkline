/*
 * sparkline
 * https://github.com/shiwano/sparkline
 *
 * Copyright (c) 2013 Shogo Iwano
 * Licensed under the MIT license.
 */

(function(window) {
  'use strict';

  var undefined,
      sparkline,
      ticks = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

  sparkline = function(numbers) {
    var i, n, min, max, f,
        results = [];

    for (i = 0; i < numbers.length; i++) {
      n = numbers[i];
      if (min === undefined || n < min) { min = n; }
      if (max === undefined || n > max) { max = n; }
    }

    f = ~~(((max - min) << 8) / (ticks.length - 1));
    if (f < 1) { f = 1; }

    for (i = 0; i < numbers.length; i++) {
      n = numbers[i];
      results.push(ticks[~~(((n - min) << 8) / f)]);
    }

    return results.join('');
  };

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = sparkline;
  } else {
    window.sparkline = sparkline;
  }
})(this);
