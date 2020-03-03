import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { DbService } from './services/db.service';
import { Component, ViewChild } from '@angular/core';

import { Platform, NavController, IonMenu } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: [ 'app.component.scss' ]
})
export class AppComponent {
    modeCheck: boolean;
    @ViewChild(IonMenu, { static: true })
    ionMenu;
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public db: DbService,
        private localNoti: LocalNotifications,
        public navCtrl: NavController
    ) {
        this.initializeApp();
        this.initializeNotifications();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    initializeNotifications() {
        const fecha = new Date(2019, 1, 27, 12, 28);
        this.localNoti.schedule({
            title: 'Design team meeting',
            text: '3:00 - 4:00 PM',
            foreground: true,
            trigger: { at: fecha }
        });
    }

    changeMode() {
        console.log('we have to change the mode ', this.modeCheck);
        if (this.modeCheck) {
            document.body.classList.toggle('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }

    moveToCategories() {
        this.ionMenu.close();
        this.navCtrl.navigateRoot('tabs/categories');
    }
    moveToCategory(id: string) {
        this.ionMenu.close();
        this.navCtrl.navigateRoot(`tabs/lists/category/${id}`);
    }
}
