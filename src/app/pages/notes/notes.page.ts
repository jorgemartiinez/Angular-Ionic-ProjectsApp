import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DbService } from './../../services/db.service';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.page.html',
  styleUrls: ['notes.page.scss']
})
export class NotesPage {
  termino = '';
  constructor(private db: DbService, public navCtrl: NavController) {}
  search(term: string) {
    this.termino = term;
}
}
