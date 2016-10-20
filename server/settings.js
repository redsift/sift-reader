/**
 * Sift TLDR. DAG's 'Settings' node implementation
 */
'use strict';

module.exports = function(got) {
  const inData = got['in'];
  console.log('SETTINGS: running...');
  var results = inData.data.map(function(datum) {
    var val = datum.value.toString();
    console.log('SETTINGS: inData: key', datum.key);
    return { name: 'settings', key: datum.key, value: val };
  });
  console.log('SETTINGS: will return: ', results);
  return results;
};

