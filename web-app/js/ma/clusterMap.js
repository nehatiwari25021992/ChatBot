
var script = '<script type="text/javascript" src="../js/ma/markerclusterer';
if (document.location.search.indexOf('packed') !== -1) {
    script += '_packed';
}
if (document.location.search.indexOf('compiled') !== -1) {
    script += '_compiled';
}
script += '.js"><' + '/script>';
document.write(script);
//google.setOnLoadCallback(initializeClusterMap); 

//var styles1 = [
//  {
//    "featureType": "administrative",
//    "stylers": [
//      { "visibility": "off" }
//    ]
//  },{
//    "featureType": "poi",
//    "stylers": [
//      { "visibility": "off" }
//    ]
//  },{
//    "featureType": "transit",
//    "stylers": [
//      { "visibility": "off" }
//    ]
//  },{
//    "featureType": "road",
//    "stylers": [
//      { "visibility": "off" }
//    ]
//  },{
//    "featureType": "landscape",
//    "stylers": [
//      { "color": "#FFE200" }
//    ]
//  },{
//    "featureType": "water",
//    "stylers": [
//      { "visibility": "on" },
//      { "color": "#4f92c6" }
//    ]
//  }
//];
var styles1 = [


//{
//    featureType: "road",
//    elementType: "geometry",
//    stylers: [
//    {
//        lightness: 100
//    },
//    {
//        visibility: "simplified"
//    }
//    ]
//},

{
    featureType: "landscape",
    stylers: [
    {
        color: "#F5F5F5" 
    }
    ]
}
,{
    featureType: "water",
    stylers: [
    {
        color: "#C7ECED"
    }
       

    ]
},
{
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
    {
        hue: '#ff0000'
    }
    ]
}

];

var styles = [[{
    url: '../images/people35.png',
    height: 35,
    width: 35,
    opt_anchor: [16, 0],
    opt_textColor: '#ff00ff',
    opt_textSize: 10
}]];
var cordList = []
var markerClusterer = null;
var map = null;
function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
        fillColor: color,
        fillOpacity: 0.7,
        strokeColor: '#fff',
        strokeWeight: 2,
        scale: 2
    };
}
function refreshMap() {
    if (markerClusterer) {
        markerClusterer.clearMarkers();
    }

    var markers1 = [];
     
    var markerImage1 
    var imageUrl
    
    
    jQuery.each(cordList, function(obj,data) {
       
        var latLng = new google.maps.LatLng(data.lat, data.lng)
        
        var count = 0
        // data.count=44444444;
        if(data.count  < 1000 ){
            count = data.count 
        }
        if(data.count  > 10000000 ){
            var convertInK = parseInt(data.count)/10000000
            var roundVal = convertInK.toFixed(2)
            count = roundVal+" M"
        }
        else if(data.count  >= 1000) {
            var convertInK = parseInt(data.count)/1000
            var roundVal = convertInK.toFixed(2)
            count = roundVal+" K"
        }
       
        var str =count.toString(); 
        var len = str.length;
        var p1,p2
        if(len  == 1 ){
            p1 = 5
            p2 = 65
        }
        else if(len  < 4 ){
            p1 = 10
            p2 = 65
        }
        else if(len>4){
            p1 = 18
            p2 = 65 
        }
        console.log("#################################### loop...........")
        if(count != 0){
            var marker = new MarkerWithLabel({
                position: latLng,
                map: map,
                labelContent:count,
                labelAnchor: new google.maps.Point(p1,p2),
                labelClass: "map_marker_label ", // the CSS class for the label
           
                icon: pinSymbol('lightgreen')
            });
       
        
      
       
            var infowindow = new google.maps.InfoWindow({
                content:  'latitude : '+data.lat +  ',   longitude : '+data.lng 
            });
       
            marker.addListener('mouseover', function() {
            
                infowindow.open(map, this);
            });

            // assuming you also want to hide the infowindow when user mouses-out
            marker.addListener('mouseout', function() {
                infowindow.close();
            });
        
            markers1.push(marker);
        }
    });
    
    var zoom = parseInt(document.getElementById('zoom').value, 10);
    var size = parseInt(document.getElementById('size').value, 10);
    var style = parseInt(document.getElementById('style').value, 10);
    zoom = zoom == -1 ? null : zoom;
    size = size == -1 ? null : size;
    style = style == -1 ? null: style;
  
}

function initializeClusterMap(list) {
    cordList = list;
    var styledMap = new google.maps.StyledMapType(styles1,
    {
        name: "Styled Map"
    });
    var lat = 20.5937
    var lng  = 78.9629
    if(cordList.length>0){
        lat = cordList[0].lat
        lng = cordList[0].lng
    }
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(lat,lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false ,
        mapTypeControl: false

    });
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    var refresh = document.getElementById('refresh');
    google.maps.event.addDomListener(refresh, 'click', refreshMap);

    var clear = document.getElementById('clear');
    google.maps.event.addDomListener(clear, 'click', clearClusters);

    refreshMap();
}

function clearClusters(e) {
    e.preventDefault();
    e.stopPropagation();
    markerClusterer.clearMarkers();
}

   