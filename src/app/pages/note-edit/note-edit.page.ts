import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DbService } from './../../services/db.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-note-edit',
    templateUrl: './note-edit.page.html',
    styleUrls: [ './note-edit.page.scss' ]
})
export class NoteEditPage implements OnInit {
    content = '';
    id = '';
    constructor(private db: DbService, private activatedRoute: ActivatedRoute, private nav: NavController) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            if (params.id) {
                this.content = this.db.searchNoteById(params.id).name;
                this.id = params.id;
            }
        });
    }

    async createNote() {
        if (this.id) {
            console.log('llamamos a nueva nota');
            await this.db.editNote(this.id, this.content);
            this.nav.back();
            return;
        }
        await this.db.addNote(this.content);
        this.nav.back();
        return;
    }
}
