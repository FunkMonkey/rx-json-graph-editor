export default {
  components: {
    'A': {
      macros: {
        'testMacro': [
          [ null, 'tap' ],
          [ null, 'do', x => 'A' + x ]
        ]
      },
      pipegroups: {
        'take5': [
          [ null, 'Observable.interval', 500],
          [ null, 'map', x => 'A' + x ],
          { macro: 'testMacro' },
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
          { macro: 'A::testMacro' },
          [ null, 'subscribeOnNext', function(x) { console.log(x) } ]
        ]
      }
    }
  }
}
