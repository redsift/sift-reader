var userWPM = 250;
module.exports = function (got) {
  const json = got.in.data.map(d => JSON.parse(d.value));

  const query = got.query;
  const threadId = query[0];
  let newestCount = json
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .shift().count;

  const lookupData = got.lookup;
  try {
    const datum = lookupData[0].data;
    userWPM = datum.key === 'wpm' && typeof datum.value === 'number' ? parseInt(datum.value) : userWPM
  }catch(e){
    console.log('no lookup data for userWPM using default', e)
  }

  const mins = newestCount / userWPM;

  return [{
      name: 'threads',
      key: threadId,
      value: {
        list: mins.toFixed(4),
        detail: mins.toFixed(4)
      }
    }
  ]
}
