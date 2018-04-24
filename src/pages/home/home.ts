import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import { ActivePage } from "../active/active";
import { Geofence } from "@ionic-native/geofence";
import { Geolocation } from "@ionic-native/geolocation";
import { SMS } from "@ionic-native/sms";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  radius: number = 100; //in meters
  error: any;
  success: any;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    private geofence: Geofence,
    private sms: SMS,
    private geolocation: Geolocation
  ) {
    this.platform.ready().then(() => {
      this.geofence
        .initialize()
        .then(
          () => console.log("Geofence Plugin Ready"),
          err => console.log(err)
        );
    });
  }

  setGeofence(value: number){
    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true
    }).then((resp)=>{
      var longitude = resp.coords.longitude;
      var latitude = resp.coords.latitude;
      var radius = value;

      let fence = {
        id: "myGeofenceID1",
        latitude: latitude,
        longitude: longitude,
        radius: radius,
        transitionType: 2,
      }

      this.geofence.addOrUpdate(fence).then(
        () => this.success,
        (err) => this.error = "Failed to add or update the fence."
      );

      this.geofence.onTransitionReceived().subscribe(resp => {
        this.sms.send('6085042226', 'She left the place!');
      });

      this.navCtrl.push(ActivePage);
    }).catch((error)=>{
      this.error = error;
    })
  }
}
