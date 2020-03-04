import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NavController, AlertController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { Note } from './../../interfaces/interfaces';
import { DbService } from './../../services/db.service';

@Component({
    selector: 'app-notes-component',
    templateUrl: './notes.component.html',
    styleUrls: [ './notes.component.scss' ]
})
export class NotesComponent implements OnInit {
    @Input() notes: Note[];

    constructor(
        private nav: NavController,
        private db: DbService,
        private alertController: AlertController,
        private social: SocialSharing
    ) {}

    ngOnInit() {}

    moveToNote(id: string) {
        this.nav.navigateRoot('tabs/notes/edit/' + id);
    }

    async delete(idNote: string, sl) {
        const alert = await this.alertController.create({
            header: 'Are you sure you want to delete this note?',
            message: 'This operation will be irreversible.',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                },
                {
                    text: 'Okay',
                    handler: async () => {
                        await this.db.delNote(idNote);
                        sl.close();
                    }
                }
            ]
        });

        await alert.present();
    }
    async favorite(id: string, sl) {
        await this.db.favNote(id);
        sl.close();
    }

    async share(id: string, sl) {
        const searchedNote = this.db.notes.find((note) => note.id == id);
        let msg = `*${searchedNote.name}*`;
        this.social.shareViaWhatsApp(msg);
        sl.close();
    }

    async reorder(event) {
        const itemMover = this.db.notes.splice(event.detail.from, 1)[0];
        // eliminamos el elemento del array ya que tenemos su from y lo obtenemos

        this.db.notes.splice(event.detail.to, 0, itemMover);
        // añadimos el elemento borrado anteriormente a su to, en este no queremos borrar ninguno

        event.detail.complete();
        await this.db.saveNotes();
    }
}
