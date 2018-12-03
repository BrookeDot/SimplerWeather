$( document ).ready( function() {

  /*
   * Does the browser support geolocation?
   * Wrap any geolocation link/feature in this function
   */
  function supportGeolocation() {
    if( "geolocation" in navigator ) {
      console.log( 'Browser supports geoLocation ' );
      return true;
    } else {
      console.log( 'Browser does no support geoLocation ' );
      return false;
    }
  }

  /*
   * Returns on successfully getting location
   */
  function navigatorSuccess( position ) {
    loadWeather( position.coords.latitude + ',' + position.coords.longitude );
  }
  /*
   * Returns on error getting location
   * See all Error codes at: https://developer.mozilla.org/en-US/docs/Web/API/PositionError
   */
  function navigatorFail( error ) {
    if( error.code == 2 ) {
      console.log( 'Browser failed to provide location.' );
    } else {
      //timeout or permission error
      console.log( 'Error getting location.' );

    }
  }

  /*
   * Load weather based on location data provided
   */
  function loadWeather( location ) {
    $.simplerWeather( {
      location: location,
      apikey: 'YOUR_API_KEY',
      success: function( weather ) {
        geoLocationWeather = '<h2> <i class="icon ' + weather.icon +
          '"></i> ' + Math.round( weather.temp ) + '&deg;';
        geoLocationWeather +=
          '<p> Currently: </span>' + weather.currently + '</p>';

        $( "#local_weather" ).html( geoLocationWeather );

      },
      error: function( error ) {
        $( "#local_weather" ).html( '<p>' + error + '</p>' );
      }
    } );
  }
} );
