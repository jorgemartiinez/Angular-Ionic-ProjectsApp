// Angular
import { FormsModule } from '@angular/forms';
import { UiServiceService } from './services/ui-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// App Level Routes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventBusService } from './services/event-bus.service';

// Plugins
import { IonicGestureConfig } from '../utils/IonicGestureConfig';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

// Cordova - Ionic
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

// Services
import { DbService } from './services/db.service';

@NgModule({
    declarations: [ AppComponent ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        IonicStorageModule.forRoot(),
        SuperTabsModule.forRoot(),
        FormsModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        DbService,
        EventBusService,
        UiServiceService,
        LocalNotifications,
        { provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
