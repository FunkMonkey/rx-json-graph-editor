
function graphlibJSONtoCytoscapeJSON( graphlibJSON ) {

  const cytoNodes = graphlibJSON.nodes.map( node => ({
    group: 'nodes',
    data: {
      id: node.v,
      value: node.value
    }
  }) );

  const cytoEdges = graphlibJSON.edges.map( edge => ({
    group: 'edges',
    data: {
      source: edge.v,
      target: edge.w,
      value: edge.value
    }
  }) );

  return cytoNodes.concat( cytoEdges );
}

function graphlibtoCytoscapeJSON( graph ) {

  const cytoNodes = graph.nodes().map( id => ({
    group: 'nodes',
    data: {
      id,
      value: graph.node( id )
    }
  }) );

  const cytoEdges = graph.edges().map( edge => ({
    group: 'edges',
    data: {
      source: edge.v,
      target: edge.w,
      value: graph.edge( edge )
    }
  }) );

  return cytoNodes.concat( cytoEdges );
}

export default {
  toCytoscape: graphlibtoCytoscapeJSON,
  json: {
    toCytoscape: graphlibJSONtoCytoscapeJSON
  }
}
