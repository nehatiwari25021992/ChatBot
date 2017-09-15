var citymap = {
//    chicago: {
//        center: {
//            lat: 41.878, 
//            lng: -87.629
//        },
//        population: 2714856
//    }
/*,
    newyork: {
        center: {
            lat: 40.714, 
            lng: -74.005
        },
        population: 8405837
    }*/
};

var drawingManager;
var all_overlays = [];

var selectedShape;
var colors = ['#1E90FF', '#FF1493', '#32CD32', '#FF8C00', '#4B0082'];
var selectedColor;
var colorButtons = {};

function clearSelection() {
    if (selectedShape) {
        
        selectedShape.setEditable(false);
        selectedShape = null;
    }
}

function setSelection(shape) {
    
    calDivLatlang()
    clearSelection();
    selectedShape = shape;
    shape.setEditable(true);
    selectColor(shape.get('fillColor') || shape.get('strokeColor'));
}

function deleteSelectedShape() {
   
    if (selectedShape) {
        selectedShape.setMap(null);
			
        for (var i = 0; i < all_overlays.length; i++)
        {
            if(all_overlays[i].overlay != undefined){
                if (all_overlays[i].overlay === selectedShape) {
                    all_overlays.splice(i, 1);
                    found = true;
                }
            }else{
                if (all_overlays[i] === selectedShape) {
                    all_overlays.splice(i, 1);
                    found = true;
                }
            }
				
        }
        calDivLatlang()
    }
        
}

function deleteAllShape() {

    for (var i = 0; i < all_overlays.length; i++)
    {
        if(all_overlays[i].overlay != undefined){
            all_overlays[i].overlay.setMap(null);
        }else{
            all_overlays[i].setMap(null);
        }
            
    }
    
    all_overlays = [];
    calDivLatlang();
}

function selectColor(color) {

    selectedColor = color;
    for (var i = 0; i < colors.length; ++i) {
        var currColor = colors[i];
        colorButtons[currColor].style.border = currColor == color ? '2px solid #789' : '2px solid #fff';
    }
    // Retrieves the current options from the drawing manager and replaces the
    // stroke or fill color as appropriate.
    var circleOptions = drawingManager.get('circleOptions');
    circleOptions.fillColor = color;
    drawingManager.set('circleOptions', circleOptions);

}

function setSelectedShapeColor(color) {

    if (selectedShape) {
        if (selectedShape.type == google.maps.drawing.OverlayType.POLYLINE) {
            selectedShape.set('strokeColor', color);
        } else {
            selectedShape.set('fillColor', color);
        }
    }
}

function makeColorButton(color) {

    var button = document.createElement('span');
    button.className = 'color-button';
    button.style.backgroundColor = color;
    google.maps.event.addDomListener(button, 'click', function () {
        selectColor(color);
        setSelectedShapeColor(color);
    });

    return button;
}

function buildColorPalette() {
    var colorPalette = document.getElementById('color-palette');
    for (var i = 0; i < colors.length; ++i) {
        var currColor = colors[i];
        var colorButton = makeColorButton(currColor);
        colorPalette.appendChild(colorButton);
        colorButtons[currColor] = colorButton;
    }
    selectColor(colors[0]);
}
	
function locFind(searchBox,map){
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        console.log("insiiiiiiiiiiiiiiloc find")
        console.log(all_overlays)
        var places = searchBox.getPlaces();

        /*for (var i = 0, marker; marker = markers[i]; i++) {
			  marker.setMap(null);
			}*/

        // For each place, get the icon, place name, and location.
        markers = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
            var image = {
                url: "/images/map-marker.png",
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            /*var marker = new google.maps.Marker({
					map: map,
					icon: image,
					title: place.name,
					position: place.geometry.location
				  });*/

            //markers.push(marker);
				 
            bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);
        map.setZoom(15);
        var cityCircle = new google.maps.Circle({
            strokeColor: '#1E90FF',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#1E90FF',
            fillOpacity: 0.35,
            map: map,
            center: map.getCenter(),
            radius: 500,
            editable: true,
            draggable: true
        });
        addNewCircles(cityCircle);
        setSelection(cityCircle);
        console.log(all_overlays)
       
    });
}


function addNewCircles(newCircle) {
    all_overlays.push(newCircle);
    google.maps.event.addListener(newCircle, 'click', function() {
        setSelection(newCircle);
        newCircle.setVisible(true)
        newCircle.setEditable(true)
    });
    
    google.maps.event.addListener(newCircle,'radius_changed', function (e) {
        console.log("radius change      ",newCircle)
        setSelection(newCircle);
    });
    
    google.maps.event.addListener(newCircle, 'center_changed', function (e) {
         console.log("center_changed    ",newCircle)
        setSelection(newCircle);
    });
// setSelection(newCircle);
}

function addDefaultLocations(map){

    for (var city in citymap) {
        // Add the circle for this city to the map.
        var cityCircle = new google.maps.Circle({
            strokeColor: '#1E90FF',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#1E90FF',
            fillOpacity: 0.35,
            map: map,
            center: citymap[city].center,
            radius: 0.5*1000,
            editable: true,
            draggable: true
        });
       
        addNewCircles(cityCircle);
    }
}


function editDefaultLocations(map,data){
   
  var obj = data;
   var i=0
    for (var city in obj) {
       
        // Add the circle for this city to the map.
        var cityCircle = new google.maps.Circle({
            strokeColor: '#1E90FF',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#1E90FF',
            fillOpacity: 0.35,
            map: map,
            center: {lat: obj[city].lat, lng: obj[city].lng},
            radius: obj[city].radius*1000,
            editable: false,
            draggable: true
        });
        i++
        addNewCircles(cityCircle);
    }
}

var __multiMap;
function initializeMap(Data) {
    
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {
            lat: 41.878, 
            lng: -87.629
        },
        scaleControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });
		
                
    var input = document.getElementById('pac-input');
    $("#pac-input").show();
    if(input!=null){
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var searchBox = new google.maps.places.SearchBox(
        /** @type {HTMLInputElement} */(input));
    __multiMap = map
    locFind(searchBox,map)
    }
    if(Data == undefined){
        addDefaultLocations(map)
    }
    else
    {
        editDefaultLocations(map,Data)
    }
   
    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the population.
    	
		 

    var polyOptions = {
        strokeWeight: 0,
        fillOpacity: 0.45,
        editable: true
    };
    // Creates a drawing manager attached to the map that allows the user to draw
    // markers, lines, and shapes.
    drawingManager = new google.maps.drawing.DrawingManager({
      
        // drawingMode: google.maps.drawing.OverlayType.CIRCLE,
        circleOptions: polyOptions,
        drawingControlOptions : {
            //position : google.maps.ControlPosition.LEFT_CENTER,
            drawingModes : [google.maps.drawing.OverlayType.CIRCLE]
        },
        map: map
    });

    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (e) {
        all_overlays.push(e);
        if (e.type != google.maps.drawing.OverlayType.MARKER) {
            // Switch back to non-drawing mode after drawing a shape.
            drawingManager.setDrawingMode(null);

            // Add an event listener that selects the newly-drawn shape when the user
            // mouses down on it.
            var newShape = e.overlay;
            newShape.type = e.type;
            google.maps.event.addListener(newShape, 'click', function () {
                setSelection(newShape);
            });
            setSelection(newShape);
        }
    });

    google.maps.event.addListener(drawingManager, 'circlecomplete', function(circle) {
        
        var radius = circle.getRadius();
        google.maps.event.addListener(circle,'radius_changed', function (e) {
            setSelection(circle);
        });
        google.maps.event.addListener(circle, 'center_changed', function (e) {
            setSelection(circle);
        });
    });

    // Clear the current selection when the drawing mode is changed, or when the
    // map is clicked.
    google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
    google.maps.event.addListener(map, 'click', clearSelection);
    //  google.maps.event.addDomListener(document.getElementById('delete-button'), 'click', deleteSelectedShape);
    google.maps.event.addDomListener(document.getElementById('delete-all-button'), 'click', deleteAllShape);

    buildColorPalette();
    calDivLatlang()
    return map;
    
}

function calDivLatlang(){

    $("#addLangLat").html("")
    var counter = 0;
    $.each(all_overlays, function( key, value ) {
        var id = counter + "cir";
        var delID = counter + "del";
        if(value.center == undefined){
            var overlayR =(value.overlay.radius)/1000
            var lagLatAndRad =  "<div class='locPush' style='cursor: pointer;' id="+id+"><div class='pull-right' ><a href='javascript:;' id="+delID+" >X</a ></div><b>Latitude :</b> <span class='pdlr5'> "+value.overlay.center.lat().toFixed(6)+"</span><b class='pdlt20'>Longitude :</b><span class='pdlr5'>"+value.overlay.center.lng().toFixed(6)+"</span><b class='pdlt20'>Radius :</b><span class='pdlr5'>"+overlayR+" KM</span></div><br>"
            $("#addLangLat").append(lagLatAndRad)
            $("#" + delID).bind('click', value.overlay, function(event) {
                var data = event.data;
                setSelection(data)
                deleteSelectedShape()
            });
            
            $("#" + id).bind('click', value.overlay, function(event) {
                console.log("hhhhhhhhhhhhhhhqwqewqeqwe")
                var data = event.data;
                setSelection(data)
                changeLocBySelect(data)
            });
            
        }
        else
        {
            var valueR =(value.radius)/1000
            var lagLatAndRad = "<div class='locPush' style='cursor: pointer;' id="+id+" ><div class='pull-right' ><a href='javascript:;' id="+delID+">X</a></div><b>Latitude :</b> <span class='pdlr5'> "+value.center.lat().toFixed(6)+"</span><b class='pdlt20'>Longitude :</b><span class='pdlr5'>"+value.center.lng().toFixed(6)+"</span><b class='pdlt20'>Radius :</b><span class='pdlr5'>"+valueR+" KM</span></div><br>"
            $("#addLangLat").append(lagLatAndRad)
            $("#" + delID).bind('click', value, function(event) {
                var data = event.data;
                setSelection(data)
                deleteSelectedShape()
            });
            
            $("#" + id).bind('click', value, function(event) {
                     console.log("222222222222222222eeeeeeeeeeeeeeeeeee")
                var data = event.data;
                 setSelection(data)
                changeLocBySelect(data)
            });
        }
        counter++;
    });
//$("#addLangLat").html(lagLatAndRad)
}

function changeLocBySelect(e){

    google.maps.event.trigger(__multiMap, "resize");
    __multiMap.setZoom(15);
    __multiMap.setCenter(new google.maps.LatLng(e.center.lat(), e.center.lng()));
	
}

//google.maps.event.addDomListener(window, 'load', initializeMap);
	
function cl(){
    console.log(all_overlays)
}