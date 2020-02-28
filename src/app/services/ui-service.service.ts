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
            duration: 2000
        });
        toast.present();
    }
}
