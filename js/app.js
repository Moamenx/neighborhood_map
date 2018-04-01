var placesLocation = [
    {
        name: "Cafe Supreme",
        lat: 30.085703, 
        lng: 31.355899,
        id: "56ba68c8498e706b12584e99"
    },
	 {
		  
        name: "Mori Sushi",
        lat: 30.086656, 
        lng:  31.348087,
        id: "4c9a3cfa292a6dcb0b35cd76"
    },
	{
        name: "Dukes",
        lat: 30.087640, 
        lng: 31.343462,
        id: "5548f5da498ebc81ec971c92"
    },
	{
        name: "Domi Tivoli",
        lat: 30.086220, 
        lng:  31.347582,
        id: "4b79a19bf964a520d5062fe3"
    },
	{
        name: "Boulevard",
        lat: 30.088169, 
        lng: 31.345705,
        id: "53ac4904498e43f7bdd29127"
    },
	{
        name: "L'Aubergine",
        lat: 30.084010, 
        lng: 31.347346,
        id: "4ebc3507dab41f33bf0da68a"
    },
	{
        name: "Alle Botti",
        lat: 30.091994, 
        lng: 31.344235,
        id: "4cd47a5c76ab721efb59676a"
    },
    
];

// Initialize the map
var map;
function LoadApp() {
    "use strict";
    map = new google.maps.Map(document.getElementById('map'), {
        disableDefaultUI: false,
        zoom: 14,
       center: {lat: 30.060446, lng: 31.337120},     
        
    });
    // Goole Maps has to load first, so the InitModel will not init before it.
    ko.applyBindings(new InitModel());
}

// Alert user when Google Maps ain't loading
function manageErrors() {
    "use strict";
    alert("Google Maps is not loading properly. Please try again.")
    
}

// Place constructor
var LocationData = function (data) {
    "use strict";
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.id = ko.observable(data.id);
    this.marker = ko.observable();
    this.phone = ko.observable('');
    this.address = ko.observable('');
    this.url = ko.observable('');
    this.canonicalUrl = ko.observable('');
};


