
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

export default {
  json: {
    toCytoscape: graphlibJSONtoCytoscapeJSON
  }
}
