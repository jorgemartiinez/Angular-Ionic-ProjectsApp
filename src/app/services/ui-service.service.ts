import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UiServiceService {
    constructor(private toastCtrl: ToastController) {}

    async presentSimpleToast(message: string) {
        const toast = await this.toastCtrl.create({
            message,
            color: '',
            duration: 2000
        });
        toast.present();
    }

    async presentSimpleToastWithColor(message: string, color: string) {
        const toast = await this.toastCtrl.create({
            message,
            color,
            duration: 2000
        });
        toast.present();
    }
}
