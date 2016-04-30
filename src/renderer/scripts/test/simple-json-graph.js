

export default {
  nodes: {
    'A': [ null,
           'Observable.interval', 500],
    'B': [ null,
           'Observable.interval', 1000],
    'A_map': [ ['A'],
                'map', x => 'A' + x],
    'A_take5': [ ['A_map'],
                  'take', 5],
    'B_map': [ ['B'],
                'map', x => 'B' + x],
    'AB_concat': [ ['A_take5', 'B_map'],
                    'Observable.concat'],
    'subscribe': [ ['AB_concat'],
                    'subscribeOnNext', function(x) { console.log(x) } ]
  }

}

// export default {
//   macros: {
//     // normal nodes without source
//   },
//
//   nodes: [
//     {
//       name: "A_take5",
//       operators: [
//         [ 'Observable.interval', null, [500] ],
//         [ 'map', null, [ x => 'A' + x ] ],
//         [ 'take', null, 5 ]
//       ]
//     },
//
//     {
//       name: "B_map",
//       operators: [
//         [ 'Observable.interval', null, [1000] ],
//         [ 'map', null, [ x => 'B' + x ] ]
//       ]
//     },
//
//     {
//       name: "subscribe",
//       operators: [
//         [ 'Observable.concat', [ 'A_take5', 'B_map' ] ],
//         [ 'subscribeOnNext', null, [ x => console.log( x ) ] ]
//       ]
//     }
//   ]
// }

// const V2 =  {
//   macros: {
//     // normal nodes without source
//   },
//
//   nodes: {
//     "A_take5": {
//       operators: [
//         [ 'Observable.interval', null, [500] ],
//         [ 'map', null, [ x => 'A' + x ] ],
//         [ 'take', null, 5 ]
//       ]
//     },
//
//     "B_map": {
//       operators: [
//         [ 'Observable.interval', null, [1000] ],
//         [ 'map', null, [ x => 'B' + x ] ]
//       ]
//     },
//
//     "subscribe": {
//       operators: [
//         [ 'Observable.concat', [ 'A_take5', 'B_map' ] ],
//         [ 'subscribeOnNext', null, [ x => console.log( x ) ] ]
//       ]
//     }
//   }
// }


//
//
// export default {
//   macros: {
//     // normal nodes without source
//   },
//
//   nodes: [
//     {
//       name: "launcher-init",
//       operators: [
//         { operator: "Launcher.init", context: "Launcher" }
//        ]
//     },
//     {
//       name: "launcher-input-transformed",
//       operators: [
//         { operator: "Launcher.input", context: "Launcher" },
//         { operator: "Test.transform_1" }
//        ]
//     },
//     {
//       name: "interval-source-transformed",
//       operators: [
//         { operator: "Test.interval", context: "Test" },
//         { operator: "Test.transform_2" }
//        ]
//     },
//     {
//       name: "input",
//       source: "launcher-input-transformed",
//       operators: [
//         { operator: "Rx.merge", extraSources: [ "interval-source-transformed" ] },
//         { operator: "Launcher.transform" }
//       ]
//     },
//     {
//       name: "output",
//       source: "launcher-init",
//       operators: [
//         { operator: "Rx.ignoreElements" },
//         { operator: "Rx.concat", extraSources: [ "input" ] },
//         { operator: "Launcher.output", context: "Launcher" }
//       ]
//     }
//   ]
// }
