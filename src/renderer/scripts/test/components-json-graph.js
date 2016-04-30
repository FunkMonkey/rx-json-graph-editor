export default {
  components: {
    'A': {
      pipegroups: {
        'take5': [
          [ null, 'Observable.interval', 500],
          [ null, 'map', x => 'A' + x ],
          [ null, 'take', 5]
        ]
      }
    },
    'B_and_result': {
      pipegroups: {
        'B_map': [
          [ null, 'Observable.interval', 1000 ],
          [ null, 'map', x => 'B' + x]
        ],
        'result': [
          [ ['A::take5', 'B_map'], 'Observable.concat'],
          [ null, 'subscribeOnNext', function(x) { console.log(x) } ]
        ]
      }
    }
  }
}
