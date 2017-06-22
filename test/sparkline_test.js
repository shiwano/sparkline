'use strict';

var sparkline = require('../lib/sparkline.js'),
    exec = require('child_process').exec;

exports['sparkline'] = {
  'default': function(test) {
    var arg = [1, 5, 22, 13, 5];
    test.equal(sparkline(arg), '▁▂█▅▂');
    test.done();
  },

  'decimal': function(test) {
    var arg = [5.5, 20];
    test.equal(sparkline(arg), '▁█');
    test.done();
  },

  '100 lt 300': function(test) {
    var arg = [1, 2, 3, 4, 100, 5, 10, 20, 50, 300];
    test.equal(sparkline(arg), '▁▁▁▁▃▁▁▁▂█');
    test.done();
  },

  '50 lt 100': function(test) {
    var arg = [1, 50, 100];
    test.equal(sparkline(arg), '▁▄█');
    test.done();
  },

  '4 lt 8': function(test) {
    var arg = [2, 4, 8];
    test.equal(sparkline(arg), '▁▃█');
    test.done();
  },

  'no tier 0': function(test) {
    var arg = [1, 2, 3, 4, 5];
    test.equal(sparkline(arg), '▁▂▄▆█');
    test.done();
  },

  'with specified min/max': function(test){
    var arg = [1, 2, 3, 4, 5];
    test.equal(sparkline(arg, {min:0, max:10}), '▁▂▃▃▄');
    test.done();
  },

  'with html option': function(test) {
    var arg = [1, 2, 3, 4, 5];
    test.equal(sparkline(arg, {html: true}), '<span title="1">▁</span><span title="2">▂</span><span title="3">▄</span><span title="4">▆</span><span title="5">█</span>');
    test.done();
  },

  'default on bin': function(test) {
    var child = exec('./bin/sparkline 1,5,22,13,5', {timeout: 3000}, function(err, stdout, stderr) {
      test.equal(stdout.replace(/\n$/, ''), '▁▂█▅▂');
      test.done();
    });
  },

  'pipe data on bin': function(test) {
    var child = exec('echo 0,30,55,80,33,150 | ./bin/sparkline', {timeout: 3000}, function(err, stdout, stderr) {
      test.equal(stdout.replace(/\n$/, ''), '▁▂▃▄▂█');
      test.done();
    });
  },

  'spaced data on bin': function(test) {
    var child = exec('./bin/sparkline 0 30 55 80 33 150', {timeout: 3000}, function(err, stdout, stderr) {
      test.equal(stdout.replace(/\n$/, ''), '▁▂▃▄▂█');
      test.done();
    });
  },

  'way spaced data on bin': function(test) {
    var child = exec('./bin/sparkline 0 30               55 80 33     150', {timeout: 3000}, function(err, stdout, stderr) {
      test.equal(stdout.replace(/\n$/, ''), '▁▂▃▄▂█');
      test.done();
    });
  },

  'do not overflow': function(test) {
    var arg = [764612.6875, 705419.9375, 1542929.125, 1188870.875, 826327.0625, 593933.625, 876544, 777557.3125, 1029475, 1480014.5, 730282.6875, 955979.0625, 899932.1875, 904396.8125, 1222970, 1281843.25, 875649.6875, 913141.75, 555765.75, 732132.6875, 1044323, 572648.125, 1291031.875, 1942828.375, 1156655.75, 1481093.125, 1225755.25, 665784.3125, 1408389.125, 1055218.375, 638983.875, 823773.875, 1096795.375, 831556.25, 653557.75, 1001308.1875, 652451.8125, 164795.734375, 1461432.375, 927211.5, 1084151.625, 1101910.875, 705454.0625, 615452.3125, 946508.9375, 748625.9375, 609846.625, 946947.4375, 714622.3125, 616360.25, 956573, 1208802.625, 1151489.875, 1724761.25, 850773.3125, 864556.375, 1299271.625, 878407.6875, 807444.5, 1050712.75, 49311764, 101003032, 105960536, 109664921];
    test.equal(sparkline(arg), '▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▄▇▇█');
    test.done();
  }
};
