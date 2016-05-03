import reactiveGraph from 'reactive-graph';
import Rx from 'rx';


// Simple inserter that will be called for every operator.
// Expects an array with the operator's name as the first element.
function insertOperator( id, operatorConfig, sources ) {
  // let operatorName = operatorConfig[0];
  // const args = operatorConfig.splice( 1 );

  let operatorName = operatorConfig.operator;
  const args = operatorConfig.args;

  // differentiate between static and instance operators
  if ( operatorName.startsWith( 'Observable.' ) ) {
    operatorName = operatorName.substr( 11 );

    // passing the sources (for 'merge', 'concat', etc.)
    return Rx.Observable[ operatorName ]( ...sources, ...args );
  } else {
    const source = sources[0];
    const restSources = sources.splice( 1 );
    return source[ operatorName ]( ...restSources, ...args );
  }
}

export default function ( graph ) {
  // const topsortedNodes = reactiveGraph.getTopsortedNodes( graph );
  // reactiveGraph.connectRxOperators( topsortedNodes, insertOperator );

  reactiveGraph.run( graph, insertOperator );
}
