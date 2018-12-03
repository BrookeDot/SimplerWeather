# SimplerWeather

This is Simple weather plugin for jQuery which is based on [jQuery.simpleWeather](https://github.com/monkeecreate/jquery.simpleWeather) by [James Fleeting](https://twitter.com/fleetingftw). It updates the original library from using Yahoo's Weather API to instead use the [Dark Sky API](https://darksky.net/dev).

Here are a few differences to note before using this library:
- Dark Sky requires an API key (see Usage for how to get a key).
- Dark Sky includes less weather codes/icons than Yahoo Weather but may expand in the future.
- Longitude and longitude are required instead of location names or IDs.   
- In general, a lot more data is provided by the Dark Sky API.

## Usage:

[Sign up over at Dark Sky](https://darksky.net/dev/register) is required to generate a Dark Sky API key. If more than 1000 requests per 24 hours are needed a payment method must also be entered. Once an API key has been obtained then the library can be used like:

```
$.simplerWeather( {
  location: '40.785091,73.96828',
  apikey: 'YOUR_API_KEY',
  success: function( weather ) { ... },
  error: function( error ) { ... }
```

See `example.js` for a full example. Please also note that when using this method your API key will be public. It is recommended that you use the proxy to hide your API key (see Proxy Example below)

### Dark Sky Attribution

Dark Sky requires a `powered by Dark Sky` link when using their data ([#](https://darksky.net/dev/docs/faq#attribution)). To help with this the `weather.attributionlink` key has been added to the data. 

### Proxy Example:
As Dark Sky requires an API key a `proxy.php` file is found in this repository which allows the API key to be hidden. To use the proxy set `authmethod` to `proxy` and then set `proxyurl` to the location of the `JSON` data.

```
$.simplerWeather( {
  location: '40.785091,73.96828',
  authmethod: 'proxy',
  proxyurl: 'proxy.php',
  success: function( weather ) { ... },
  error: function( error ) { ... }
```

By default `units` and `exclude` attributes are added to the Dark Sky request. When using the proxy the default GET request will look something like this: `https://example.com/proxy.php?lat=40.785091&lon=-73.968285&units=us`. To hide the latitude and longitude, modify the query in `simplerweather.js` and then set the location directly the proxy file.

While the example using `PHP` the JavaScript should support any URL which returns `JSON` output.

### GeoLocation

A `geolocation-example.js` is also included which can be used as a template to get site visitors weather location based the location provided by their browser. Note this isn't a full example but can be used as a starting place.

### Extending and Modifying the Script

Dark Sky has [API documentation](https://darksky.net/dev/docs) which can be used to modify this script. It was created for a simple use-case so does not include all weather data one may want to use.

## Getting Help:
For the sake of transparency the script is provided here as-is in hopes that others find it useful. Currently, I have no plans to maintain (outside of security vulnerabilities ). I will try to help point people in the right direction where I can.

## Contributing:

Feel free to open a PR to contribute to this project!
