import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit {
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat = 41.0248555;
  lng = -91.9622701;


  //Coordinates to set the center of the map
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 12
  };

  //Default Marker
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
    title: "I Live Here"
  });

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    //Adding Click event to default marker
    this.marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.marker.getTitle()
      });
      infoWindow.open(this.marker.getMap(), this.marker);
    });

    //Adding default marker to map
    this.marker.setMap(this.map);


  }

}
