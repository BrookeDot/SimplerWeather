/*! simplerWeather v1.0.0
Author: Brooke.
URL: https://github.com/BrookeDot/SimplerWeather
License: MIT
Based on SimpleWeather -- https://github.com/monkeecreate/jquery.simpleWeather

Simple Weather Java Switches to DarkSky */

( function( $ ) {
  'use strict';

  function getAltTemp( unit, temp ) {
    if( unit === 'f' ) {
      return Math.round( ( 5.0 / 9.0 ) * ( temp - 32.0 ) );
    } else {
      return Math.round( ( 9.0 / 5.0 ) * temp + 32.0 );
    }
  }

  $.extend( {
    simplerWeather: function( options ) {
      options = $.extend( {
        location: '',
        units: 'f',
        authmethod: 'apikey',
        apikey: '',
        proxyurl: '',
        forecast: 'true',
        forecastdays: '4',
        success: function( weather ) {},
        error: function( message ) {}
      }, options );

      let location = '';

      //Sets the units based on https://darksky.net/dev/docs
      if( options.units.toLowerCase() === 'c' ) {
        var units = 'si'
      } else {
        var units = 'us'
      }

      //Check that the latitude and longitude has been set and generate the API URL based on authentication method
      function getWeatherURL( authmethod ) {
        if( /^\-?\d+(\.\d+)?,\s*\-?\d+(\.\d+)$/.test( options.location ) ) {

          let geoLocation = options.location.split( ',' );
          var lat = geoLocation[ 0 ];
          var lon = geoLocation[ 1 ];
        } else {
          options.error(
            'Could not retrieve weather due to an invalid location. Must enter location as latitude,longitude'
          );
        }
        if( authmethod === "apikey" && options.apikey !== '' ) {
          let apiKey = encodeURIComponent( options.apikey );
          return 'https://api.darksky.net/forecast/' + apiKey + '/' +
            lat + ',' + lon + '/?units=' + units +
            '&exclude=minutely,hourly,alerts,flags';
        } else if( authmethod === "proxy" && options.proxyurl !== '' ) {
          return encodeURI( options.proxyurl + '?lat=' + lat + '&lon=' +
            lon + '&units=' + units );
        } else {
          options.error(
            'Could not retrieve weather due to an invalid api key or proxy setting.'
          );
        }
      }

      $.ajax({
        url: encodeURI(getWeatherURL(options.authmethod)),
        dataType: 'jsonp',
        success: function(data) {
          if( data !== null ) {
            var result = data,
              weather = {};

            weather.temp = result.currently.temperature;
            weather.currently = result.currently.summary;
            weather.icon = result.currently.icon;
            weather.pressure = result.currently.pressure;
            weather.humidity = result.currently.humidity;
            weather.visibility = result.currently.visibility;
            weather.updated = result.currently.time;

            weather.high = result.daily.data[ 0 ].temperatureHigh;
            weather.low = result.daily.data[ 0 ].temperatureLow;
            weather.sunrise = result.daily.data[ 0 ].sunriseTime;
            weather.sunset = result.daily.data[ 0 ].sunsetTime;
            weather.description = result.daily.data[ 0 ].summary;

            weather.attributionlink = "https://darksky.net/";
            weather.unit = options.units.toLowerCase();

            if( weather.unit === 'f' ) {
              weather.altunit = 'c';
            } else {
              weather.altunit = 'f';
            }

            weather.alt = {
              temp: getAltTemp( options.units, weather.temp ),
              high: getAltTemp( options.unit, weather.high ),
              low: getAltTemp( options.unit, weather.low )
            };

            if( options.forecast &&
              parseInt( options.forecastdays ) !== "NaN" ) {

              weather.forecast = [];

              for( var i = 0; i < options.forecastdays; i++ ) {
                var forecast = result.daily.data[ i ];
                forecast.date = forecast.time;
                forecast.summary = forecast.summary;
                forecast.high = forecast.temperatureHigh;
                forecast.low = forecast.temperatureLow;
                forecast.icon = forecast.icon;


                forecast.alt = {
                  high: getAltTemp( options.units, forecast.temperatureHigh ),
                  low: getAltTemp( options.units, forecast.temperatureLow )
                };

                weather.forecast.push( forecast );
              }
            }
            options.success( weather );
          } else {
            options.error(
              'There was a problem retrieving the latest weather information.'
            );
          }
        }
    });
      return this;
    }
  } );
} )( jQuery );
