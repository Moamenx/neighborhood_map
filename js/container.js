var InitModel = function () {
    "use strict";
    var self = this;
        this.placeList = ko.observableArray([]);
    placesLocation.forEach(function (placeItem) {
        self.placeList.push(new LocationData(placeItem));
    });

    var infowindow = new google.maps.InfoWindow({
        maxWidth: 200,
    });
    var marker;
    self.placeList().forEach(function (placeItem) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(placeItem.lat(), placeItem.lng()),
            map: map,
            animation: google.maps.Animation.DROP
        });
        placeItem.marker = marker;
        // API
        var client_id= "FQGCAXHF5ZIGFLD21D3NBZ1NUQB2VBJ3L4QHE2R2A4ZC2NDQ";
        var client_secret = "AVTTONCFWF2OCZUOOWBTF0BCMXI4XROP1Q1HTFRGV2KH1BVI";
        $.ajax({
          url: 'https://api.foursquare.com/v2/venues/' + placeItem.id() +
            '?client_id='+ client_id+'&client_secret='+client_secret+'&v=20180104',
            dataType: "json",
            success: function (data) {
                var result = data.response.venue;
                    var contact = result.hasOwnProperty('contact') ? result.contact : '';
                if (contact.hasOwnProperty('formattedPhone')) {
                    placeItem.phone(contact.formattedPhone || '');
                }

                var location = result.hasOwnProperty('location') ? result.location : '';
                if (location.hasOwnProperty('address')) {
                    placeItem.address(location.address || '');
                }

                var url = result.hasOwnProperty('url') ? result.url : '';
                placeItem.url(url || '');

                placeItem.canonicalUrl(result.canonicalUrl);
                var content =
                  '<div id="iWindow"><h4>' + placeItem.name() + '</h4><p>' +
                        placeItem.phone() + '</p><p>' + placeItem.address() +
                        '</p><p><a target="_blank" href=' + placeItem.canonicalUrl() +
                        '>Foursquare Page</a></p><p><a target="_blank" href=https://www.google.com/maps/dir/Current+Location/' +
                        placeItem.lat() + ',' + placeItem.lng() + '>Directions</a></p></div>';
                google.maps.event.addListener(placeItem.marker, 'click', function () {
                infowindow.open(map, this);            
                placeItem.marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function () {
                        placeItem.marker.setAnimation(null);
                    });
                    infowindow.setContent(content);
                    map.setCenter(placeItem.marker.getPosition());
                });
            },
             error: function (e) {
                alert("Foursquare data is unavailable. Please try refreshing later.")
            }
        });
		
    self.showInfo = function (placeItem) {
        google.maps.event.trigger(placeItem.marker, 'click');
        self.hideElements();
    };
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, this);
            placeItem.marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                placeItem.marker.setAnimation(null);
            });
        });
    });


    self.toggleNav = ko.observable(false);
    this.navStatus = ko.pureComputed (function () {
        return self.toggleNav() === false ? 'nav' : 'navClosed';
        }, this);

    self.hideElements = function (toggleNav) {
        self.toggleNav(true);
        // Allow default action
        return true;
    };

    self.showElements = function (toggleNav) {
        self.toggleNav(false);
        return true;
    };


    self.visible = ko.observableArray();

    self.placeList().forEach(function (place) {
        self.visible.push(place);
    });

    self.userInput = ko.observable('');

    self.Selection = function () {
        
        var searchInput = self.userInput().toLowerCase();
        self.visible.removeAll();
        self.placeList().forEach(function (place) {
           // place.marker.insert(false);	   
		   place.marker.setVisible(false);
           
            if (place.name().toLowerCase().indexOf(searchInput) !== 0) {
                self.visible.push(place);
            }
        });
        self.visible().forEach(function (place) {
           // place.marker.insert(true);
		   place.marker.setVisible(true);
        });
    };

};