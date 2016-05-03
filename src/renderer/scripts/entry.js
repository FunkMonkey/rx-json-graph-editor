import Rx from 'rx';
import CopalCore from '@copal/core';

import renderGraph from './render-graph';
import GraphlibCytoscapeConverter from './graphlib-cytoscape-converter';

import ComponentsMacrosJSONGraph from './test/components-macros-json-graph';

function addCompoundInfo( elements ) {
  const componentCompounds = {};
  const pgCompounds = {};

  elements.forEach( el => {
    if ( el.group !== 'nodes' )
      return;

    const component = el.data.value.component;
    const pipegroup = el.data.value.pipegroup;
    const pgID = el.data.value.pipegroupID;
    componentCompounds[ component ] = component;
    pgCompounds[ pgID ] = { pipegroupID: pgID, pipegroup, component };
    el.data.parent = pgID;
  } );

  const componentNodes = Object.getOwnPropertyNames( componentCompounds ).map( groupName => ( {
    group: 'nodes',
    data: {
      id: groupName,
      name: groupName
    }
  } ) );

  const pgNodes = Object.getOwnPropertyNames( pgCompounds ).map( prop => ( {
    group: 'nodes',
    data: {
      id: pgCompounds[prop].pipegroupID,
      name: pgCompounds[prop].pipegroup,
      parent: pgCompounds[prop].component
    }
  } ) );

  return elements.concat( pgNodes, componentNodes );
}

const drivers = {
  profileSettings: {
    get( ) {
      return Rx.Observable.just( {
        extensions: {
          enabled: []
        }
      } );
    }
  },
  extensions: {
    get() {
      return Rx.Observable.just( () => {} );
    }
  }
};

export default function entry() {
  const core = new CopalCore( drivers );
  const init$ = core.init()
    .concat( Rx.Observable.just( 1 ) )
    .do( () => {
      const exec = core.executeCommandConfig( ComponentsMacrosJSONGraph );

      const cytoJSON = GraphlibCytoscapeConverter.toCytoscape( exec.graph );
      console.log( exec.graph, cytoJSON );
      const cytoElementsWithCompounds = addCompoundInfo( cytoJSON );
      renderGraph( document.getElementById( 'graph' ), cytoElementsWithCompounds );
    } );

  init$.subscribe();
}
