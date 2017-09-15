function gmap_default_init() {
    var position = new google.maps.LatLng(40.6743890, -73.9455)
    var mapOptions = {
        zoom: 12,
        center: position
    };
    var map = new google.maps.Map(document.getElementById('gmap-default'), mapOptions);
    // Create a marker for each place.
    
    var marker = new google.maps.Marker({
        map: map,
        draggable:true,
        animation: google.maps.Animation.DROP,
        position: position
    });
    geocodePosition(position);
    google.maps.event.addListener(marker, 'dragend', function() 
    {
        geocodePosition(marker.getPosition());
    });
}
function gmap_default_initForPoint() {
    var position = new google.maps.LatLng(40.6743890, -73.9455)
    var mapOptions = {
        zoom: 12,
        center: position
    };
    var map = new google.maps.Map(document.getElementById('gmap-default_Point'), mapOptions);
    // Create a marker for each place.
    
    var marker = new google.maps.Marker({
        map: map,
        draggable:true,
        animation: google.maps.Animation.DROP,
        position: position
    });
    geocodePositionForPoint(position);
    google.maps.event.addListener(marker, 'dragend', function() 
    {
        geocodePositionForPoint(marker.getPosition());
    });
}

function geocodePositionForPoint(pos) 
{
    var scopePoint = angular.element($("#addGeoPointWidget")).scope()
    scopePoint.setGeoLocationForPoint(pos);
}
function geocodePosition(pos) 
{
    var scope = angular.element($("#geoStorageWidget")).scope()
    scope.setGeoLocation(pos);
}

function gmap_red_init () {
    var map;
    var brooklyn = new google.maps.LatLng(40.6743890, -73.9455);
    var MY_MAPTYPE_ID = 'custom_style';
    var featureOpts = [
    {
        stylers: [
        {
            hue: '#890000'
        },
        {
            visibility: 'simplified'
        },
        {
            gamma: 0.5
        },
        {
            weight: 0.5
        }
        ]
    },
    {
        elementType: 'labels',
        stylers: [
        {
            visibility: 'off'
        }
        ]
    },
    {
        featureType: 'water',
        stylers: [
        {
            color: '#890000'
        }
        ]
    }
    ];

    var mapOptions = {
        zoom: 12,
        center: brooklyn,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
        },
        mapTypeId: MY_MAPTYPE_ID
    };

    map = new google.maps.Map(document.getElementById('gmap-red'),
        mapOptions);

    var styledMapOptions = {
        name: 'Custom Style'
    };

    var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

    map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
}

function gmap_weather_init () {
    var mapOptions = {
        zoom: 6,
        center: new google.maps.LatLng(49.265984,-123.127491)
    };

    var map = new google.maps.Map(document.getElementById('gmap-weather'),
        mapOptions);

    var weatherLayer = new google.maps.weather.WeatherLayer({
        temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
    });
    weatherLayer.setMap(map);

    var cloudLayer = new google.maps.weather.CloudLayer();
    cloudLayer.setMap(map);
}

function gmap_initialize() {
    gmap_default_init();
    gmap_red_init();
    gmap_weather_init();
}

function gmap_initializeForPoint() {
    gmap_default_initForPoint();
    gmap_red_init();
    gmap_weather_init();
}

function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=weather&sensor=false&' + 'callback=gmap_initialize';
    document.body.appendChild(script);
}
// This for add Another Geo Points
function loadScriptForAddPoints() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=weather&sensor=false&' + 'callback=gmap_initializeForPoint';
    document.body.appendChild(script);
}

//$(function() {
//  // GOOGLE MAPS
//  if($('#gmap-default').length){
//    loadScript();
//  }
//});