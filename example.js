$( document ).ready( function() {

  $.simplerWeather( {
    location: '40.785091,73.96828',
    units: 'f',
    apikey: 'YOUR_API_KEY',
    success: function( weather ) {
      currentWeather = '<h2> <i class="icon ' + weather.icon +
        '"></i> ' +
        Math.round( weather.temp ) + '&deg;' + weather.unit.toUpperCase();

      currentWeather += '<p> Currently: ' + weather.currently +
        '</p>';

      $( "#weather" ).html( currentWeather );
      //return forcast to unordered list.
      forecast = '<ul>';
      // the first value in the array is the current date so set i to 1 to get future weather
      for( var i = 1; i < 4; i++ ) {
        forecast += '<li><i class="icon ' + weather.forecast[ i ].icon +
          '"></i>';
        forecast += weather.forecast[ i ].summary; + '</li>';
      }
      forecast += '</ul>';

      $( "#forecast" ).html( forecast );
    },
    error: function( error ) {
      $( "#weather" ).html( '<p>' + error + '</p>' );
    }
  } ); //end main weather display
} );
