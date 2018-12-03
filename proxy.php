<?php
// File Name: proxy.php

function get_http_response_code($url) {
    $headers = get_headers($url);
    return substr($headers[0], 9, 3);
}


$api_key = 'YOUR_API_KEY';
$api_endpoint = 'https://api.darksky.net/forecast';

$lat = ( isset( $_GET[ 'lat' ] ) && is_numeric( $_GET[ 'lat' ] ) ? ( float )( $_GET[ 'lat' ] ) : null );
$lon = ( isset( $_GET[ 'lon' ] ) && is_numeric( $_GET[ 'lon' ] ) ? ( float )( $_GET[ 'lon' ] ) : null );
$units = ( isset( $_GET[ 'units' ] ) && strtolower( $_GET[ 'units' ] ) == 'si'  ? 'si' : 'us' );

$api_url = $api_endpoint . '/' . $api_key . '/' . $lat . ',' . $lon . '/?units=' . $units . '&exclude=minutely,hourly,alerts,flags';
if( ! isset ( $api_url ) ) { die( 'no api URL found' ); }
if( get_http_response_code( $api_url ) !== '200' ){ die( 'URL format invalid' ); }

$api_data = file_get_contents( $api_url );

header('Content-type:application/json;charset=utf-8');
echo ( $api_data ) ;
