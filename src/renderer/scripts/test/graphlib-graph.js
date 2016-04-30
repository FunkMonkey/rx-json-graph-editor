import graphlib from 'graphlib';

const graph = new graphlib.Graph();
graph.setNode( 'A', ['Observable.interval', 500] );
graph.setNode( 'B', ['Observable.interval', 1000] );
graph.setNode( 'A_map', ['map', x => 'A' + x] );
graph.setNode( 'A_take5', ['take', 5] );
graph.setNode( 'B_map', ['map', x => 'B' + x] );
graph.setNode( 'AB_concat', ['Observable.concat'] );
graph.setNode( 'subscribe', ['subscribeOnNext', function(x) { console.log(x) } ] );

graph.setEdge( 'A', 'A_map' );
graph.setEdge( 'A_map', 'A_take5' );
graph.setEdge( 'B', 'B_map' );

// setting index
graph.setEdge( 'A_take5', 'AB_concat', 0 );
graph.setEdge( 'B_map', 'AB_concat', 1 );
graph.setEdge( 'AB_concat', 'subscribe' );

export default graph;
