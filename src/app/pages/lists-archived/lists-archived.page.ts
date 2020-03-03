import { DbService } from './../../services/db.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-lists-archived',
    templateUrl: './lists-archived.page.html',
    styleUrls: [ './lists-archived.page.scss' ]
})
export class ListsArchivedPage implements OnInit {
    id = '';
    termino = '';
    showList = true;

    constructor(public db: DbService) {}

    ngOnInit() {}

    getListSize(size: number) {
        if (size === 0) {
            this.showList = false;
        }
    }
    search(term: string) {
        this.termino = term;
    }
}
