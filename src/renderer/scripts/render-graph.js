
import cytoscape from 'cytoscape';

export default function renderGraph( container, elements ) {
  return cytoscape({

    container: container,

    elements,

    style: [
      {
        selector: 'node[value]',
        style: {
          'background-color': '#666',
          'label': 'data(value.operator.operator)',
          'text-halign': 'right',
          'text-valign': 'center'
        }
      },
      {
        selector: '$node > node',
        style: {
          'padding-top': '10px',
          'padding-left': '10px',
          'padding-bottom': '10px',
          'padding-right': '10px',
          'text-valign': 'top',
          'text-halign': 'center',
          'background-color': '#eee',
          'border-width': '1px',
          'border-color': '#bbb',
          'label': 'data(name)'
        }
      },

      {
        selector: 'edge',
        style: {
          'width': 3,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'label': 'data(value.index)',
          'text-background-color': '#666',
          'text-background-shape': 'roundrectangle'
        }
      }
    ],

    layout: {
      name: 'breadthfirst',
      directed: true,
      spacingFactor: 0.5,
      fit: false
    }

  });


}
