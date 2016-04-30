import Rx from 'rx';

const info = console.info.bind( console );

// =============== GUI ===============

function datasourceCreateWindow( windowInfo ) {
  info( 'creating datasource: datasourceCreateWindow' );
  return Rx.Observable.just( windowInfo )
    .map( () => ({ windowID: 7 }) )
    .do( ( val ) => info( 'datasourceCreateWindow: emitting', val ) );
}

export default {
  // =============== RX ===============
  'Rx.merge': function ( o, opConfig ) {
    if( o )
      return o.merge( ...opConfig.extraSources );
    else
      return Rx.Observable.merge( ...opConfig.extraSources );
  },

  'Rx.concat': function ( o, opConfig ) {
    if( o )
      return o.concat( ...opConfig.extraSources );
    else
      return Rx.Observable.concat( ...opConfig.extraSources );
  },

  'Rx.ignoreElements': function ( o ) {
    return o.ignoreElements();
  },


  // =============== OTHER DATA SOURCES ===============
  'Test.interval': function datasourceInterval() {
    info( 'creating datasource: Test.interval' );
    return Rx.Observable
      .interval( 100 ).take( 5 )
      .do( ( val ) => info( 'Test.interval: emitting', val ) );
  },

  // =============== TRANSFORMS ===============

  'Test.transform_1': function transform_1( o ) {
    info( 'connecting node: Test.transform_1' );
    return o
      .do( ( val ) => info( 'Test.transform_1: transforming', val ) )
      .map( ( val ) => val + "_1" );
  },

  'Test.transform_2': function transform_2( o ) {
    info( 'connecting node: Test.transform_2' );
    return o
      .do( ( val ) => info( 'Test.transform_2: transforming', val ) )
      .map( ( val ) => val + "_2" );
  },

  // =============== LAUNCHER ===============

  'Launcher.init': function datasourceLauncherInit() {
    info( 'creating datasource: Launcher.init' );

    return datasourceCreateWindow() // accessing other component's datasource-creators
      .do( () => info( 'Launcher.init: emitting' ) );
  },

  'Launcher.input': function datasourceLauncherInput() {
    info( 'creating datasource: Launcher.input' );
    return Rx.Observable
      .fromArray( [ 'A', 'B', 'C', 'D' ] )
      .do( ( val ) => info( 'Launcher.input: emitting', val ) );
  },

  'Launcher.transform': function launcherTransform( o ) {
    info( 'connecting node: Launcher.transform' );
    return o
      .do( ( val ) => info( 'Launcher.transform: transforming', val ) );
  },

  'Launcher.output': function observerLauncherOutput( o ) {
    info( 'creating observer: Launcher.output' );

    const output = Rx.Observer.create(
      ( val ) => info( 'Launcher.output: onNext', val ),
      ( err ) => info( 'Launcher.output: onError', err, err.stack ),
      ()  => info( 'Launcher.output: onCompleted' )
    );

    o.subscribe( output );
  }

}
