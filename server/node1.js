/**
 * Counter Sift. DAG's 'Node1' node implementation
 */
 let textUtils = require('@redsift/text-utilities');
'use strict';

module.exports = function (got) {
  // got.in contains the key/value pairs that match the given query
  const inData = got.in;
  
  console.log('counter: node1.js: running...', inData.data);

  const json = inData.data.map(d => JSON.parse(d.value));

  const others = json.filter(j => j.user !== j['from'].email);

  let counts = others.map(value => {
    let text = value.textBody || value.strippedHtmlBody || '';
    let count = textUtils.splitWords(textUtils.trimEmailThreads(text)).length;

    return {
      key: `${value.threadId}/${value.id}`, // instead of 'value.id
      value: {
        count: count,
        date: value.date
      }
    }
  });
  console.log('will output', counts);
  return counts;
};

