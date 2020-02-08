import * as L from 'leaflet';
import {inject} from 'aurelia-framework';
import {ReportCard} from 'utility/report-card';
import {EventAggregator} from 'aurelia-event-aggregator';
import { LocationUtility } from 'utility/location-utility';

//start-aurelia-decorators
@inject(EventAggregator, ReportCard, LocationUtility)
//end-aurelia-decorators
export class Location {
  constructor(EventAggregator, ReportCard, LocationUtility) {
    this.ea = EventAggregator;
    this.reportcard = ReportCard;
    this.config = ReportCard.config;
    this.locaiton_util = LocationUtility;
  }

  getCitiesList() {
    const cities = Object.keys(this.config.supported_cities);
    this.cityCenter = [];

    for (const city of cities) {
      this.cityCenter.push({
        name: city,
        center: this.config.supported_cities[city].center
      });
    }
  }

  drawGpsMarkers(center, accuracy, map) {
    L.circle(center, {
      weight: 0,
      fillColor: '#31aade',
      fillOpacity: 0.15,
      radius: accuracy / 2
    }).addTo(map);
    L.circleMarker(center, {
      color: 'white',
      weight: 1,
      fillColor: '#31aade',
      fillOpacity: 1,
      radius: 8
    }).addTo(map);
  }

  attached() {
    var self = this;

    this.getCitiesList();

    //Add leaflet map
    self.map = L.map('mapWrapper', {
      attributionControl: false,
      center: self.config.map.start_city_center,
      zoom: 15
    });
    L.tileLayer(self.config.tile_layer, {
      detectRetina: true,
      ext: 'png'
    }).addTo(self.map);

    //Add custom leaflet control, to navigate back to browser located user location
    L.Control.GeoLocate = L.Control.extend({
      onAdd: function(map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.innerHTML = '<i class="icon-geolocate"></i>';
        container.style.fontSize = '21px';
        container.style.textAlign = 'center';
        container.style.lineHeight = '30px';
        container.style.color = 'black';
        container.style.backgroundColor = 'white';
        container.style.width = '30px';
        container.style.height = '30px';
        container.onclick = function() {
          if (self.reportcard.location.gpsLocation) {
            self.map.flyTo(self.reportcard.location.gpsLocation, 16);
          }
        };
        return container;
      }
    });
    L.control.geoLocate = function(opts) {
      return new L.Control.GeoLocate(opts);
    };

    //If previous inputs available, setView to user selected location
    if (self.reportcard.location.markerLocation) {
      self.map.setView(self.reportcard.location.markerLocation, 15);
      //If previous geolocation inputs available, add circle markers at gps location
      if (self.reportcard.location.gpsLocation) {
        L.control.geoLocate({position: 'topleft'}).addTo(self.map);
        self.drawGpsMarkers(self.reportcard.location.gpsLocation, self.reportcard.location.accuracy, self.map);
      }
    } else if (!!navigator.geolocation) {
      //If previous inputs unavailable, i.e. at session start; try geolocation if supported by browser
      self.map.locate({
        setView: true
      });
      self.map.on('locationfound', (e) => {
        L.control.geoLocate({position: 'topleft'}).addTo(self.map);
        self.drawGpsMarkers(e.latlng, e.accuracy, self.map);
        self.reportcard.location = {markerLocation: e.latlng, gpsLocation: e.latlng, accuracy: e.accuracy};
      });
      //If geolocation unavailable, go to default city center;
      self.map.on('locationerror', () => {
        self.reportcard.location.markerLocation = self.map.getCenter();
        self.ea.publish('geolocate', 'error');
        this.showCitySelector = true;
      });
    } else {
      //Go to default city center if geolocation not supported by browser
      //TODO select delpoyment and go to deployment center if geolocation not supported
      self.reportcard.location.markerLocation = self.map.getCenter();
    }

    //Get map center (corresponding to overlaid marker image) if user pans map
    self.map.on('moveend', () => {
      if (self.map) {
        self.reportcard.location.markerLocation = self.map.getCenter();
      }
    });
  }

  switchRegion(region) {
    let self = this;
    const cityCenter = self.locaiton_util.getCityCenter(region);
    console.log(cityCenter);
    this.setMapCenter(cityCenter);
    // $('#screen').css('display', 'none');
  }
  // center format:  [lat, lng]
  setMapCenter(center) {
    // hide cityPopup
    this.showCitySelector = false;
    // use leaflet function to set map center
    console.log(center);
    this.map.setView(new L.LatLng(center[0], center[1]), 10);
  }
}
