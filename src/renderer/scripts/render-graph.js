
import cytoscape from 'cytoscape';
import cydagre from 'cytoscape-dagre';
import dagre from 'dagre';
import beautify from 'js-beautify';
cydagre( cytoscape, dagre ); // register extension

export default function renderGraph( container, elements ) {
  return cytoscape({

    container: container,

    elements,

    style: [
      {
        selector: 'node[value]',
        style: {
          'background-color': '#666',
          'label': ( el ) => {
            const value = el.data().value;
            const opName = value.operator;
            const args = value.args;

            return beautify( `${opName}( ${args} )` )
          },
          'text-halign': 'right',
          'text-valign': 'center',
          'border-width': '5px',
          'border-color': '#fff'
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
          'label': 'data(value)',
          'text-background-opacity': '1',
          'text-background-color': '#ccc',
          'text-background-shape': 'roundrectangle'
        }
      }
    ],

    layout: {
      name: 'dagre',
      fit: false
    }

  });


}
