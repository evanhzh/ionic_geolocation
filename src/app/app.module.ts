import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { Geofence } from "@ionic-native/geofence";
import { Geolocation } from "@ionic-native/geolocation";
import { SMS } from "@ionic-native/sms";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { ActivePage } from "../pages/active/active";

@NgModule({
  declarations: [MyApp, HomePage, ActivePage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, ActivePage],
  providers: [
    StatusBar,
    SplashScreen,
    Geofence,
    Geolocation,
    SMS,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
