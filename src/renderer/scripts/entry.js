import rxJSONGraph from 'rx-json-graph';
import renderGraph from './render-graph';
import GraphlibCytoscapeConverter from './graphlib-cytoscape-converter';
import graphlib from 'graphlib';

function addCompoundInfo( elements ) {

  const compounds = {};

  elements.forEach( el => {
    if( el.group !== 'nodes' )
      return;

    const parent = el.data.value.parent.name;
    el.data.parent = parent;
    compounds[ parent ] = parent;
  } );

  const groupNodes = Object.getOwnPropertyNames( compounds ).map( groupName => ({
    group: 'nodes',
    data: {
      id: groupName,
      name: groupName
    }
  }) );

  return elements.concat( groupNodes );
}

export default function entry () {
  const glibGraph = rxJSONGraph.convertToGraph( rxJSONGraph.TestGraph );

  const graphlibJSON = graphlib.json.write( glibGraph );

  const cytoJSON = GraphlibCytoscapeConverter.json.toCytoscape( graphlibJSON );

  const cytoElementsWithCompounds = addCompoundInfo( cytoJSON );

  renderGraph( document.getElementById( 'graph' ), cytoElementsWithCompounds );
  console.log( cytoElementsWithCompounds );
}
