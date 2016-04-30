import rxJSONGraph from 'rx-json-graph';
import renderGraph from './render-graph';
import GraphlibCytoscapeConverter from './graphlib-cytoscape-converter';
import TestGraphlibGraph from './test/graphlib-graph';
import testRunInContext from './test/run-in-context';

import SimpleJSONGraph from './test/simple-json-graph';
import PipegroupsJSONGraph from './test/pipegroups-json-graph';
import ComponentsJSONGraph from './test/components-json-graph';
import ComponentsMacrosJSONGraph from './test/components-macros-json-graph';

const { transformers } = rxJSONGraph;

export default function entry () {
  // const glibGraph = rxJSONGraph.convertToGraph( SimpleJSONGraph,
  //   [transformers.graph.nodesFromDict],
  //   [transformers.node.valueFromArray] );

  // const glibGraph = rxJSONGraph.convertToGraph( PipegroupsJSONGraph,
  //   [transformers.graph.pipegroups],
  //   [transformers.node.valueFromArray,
  //    transformers.node.appendOperatorToID,
  //    transformers.node.pipegroups] );

  // const glibGraph = rxJSONGraph.convertToGraph( ComponentsJSONGraph,
  //   [transformers.graph.components,
  //    transformers.graph.pipegroups],
  //   [transformers.node.valueFromArray,
  //    transformers.node.appendOperatorToID,
  //    transformers.node.components,
  //    transformers.node.pipegroups] );

  const glibGraph = rxJSONGraph.convertToGraph( ComponentsMacrosJSONGraph,
    [transformers.graph.components,
     transformers.graph.componentMacros,
     transformers.graph.pipegroups],
    [transformers.node.valueFromArray,
     transformers.node.appendOperatorToID,
     transformers.node.components,
     transformers.node.pipegroups] );


  // CALLING
  // testRunInContext( glibGraph );

  // RENDERING
  // const graphlibJSON = graphlib.json.write( TestGraphlibGraph );
  // const cytoJSON = GraphlibCytoscapeConverter.toCytoscape( TestGraphlibGraph );
  const cytoJSON = GraphlibCytoscapeConverter.toCytoscape( glibGraph );
  console.log( glibGraph, cytoJSON );
  // const cytoElementsWithCompounds = addCompoundInfo( cytoJSON );
  renderGraph( document.getElementById( 'graph' ), cytoJSON );
  //
  // // Testing
  // const context = new ExampleContext();
  // const rxGraph = rxGraphlibGraph.create( glibGraph, context.insertOperator.bind( context ) );
  // console.log( rxGraph );
}

// function addCompoundInfo( elements ) {
//
//   const compounds = {};
//
//   elements.forEach( el => {
//     if( el.group !== 'nodes' )
//       return;
//
//     const parent = el.data.value.parent.name;
//     el.data.parent = parent;
//     compounds[ parent ] = parent;
//   } );
//
//   const groupNodes = Object.getOwnPropertyNames( compounds ).map( groupName => ({
//     group: 'nodes',
//     data: {
//       id: groupName,
//       name: groupName
//     }
//   }) );
//
//   return elements.concat( groupNodes );
// }


// class ExampleContext {
//   constructor( opMap ) {
//     this.operators = opMap;
//   }
//
//   getOperatorByConfig( opConfig ) {
//     return this.opMap[ opConfig.name ].operator;
//   }
//
//   getOperatorAndArguments( opConfig, extraSources ) {
//     return {
//       operator: this.getOperatorByConfig( opConfig ),
//       args: [ extraSources ]
//     };
//   }
//
//   insertOperator( opConfig, sources ) {
//     return rxGraphlibGraph.insertUsingLet(
//       ( conf, xSources ) => this.getOperatorAndArguments( conf, xSources ),
//       opConfig, sources );
//   }
// }
