import { Component, OnInit  } from '@angular/core';
import { DbService } from './../../services/db.service';
import { SharedListService } from './../../services/shared-list.service';

@Component({
    selector: 'app-lists',
    templateUrl: 'lists.page.html',
    styleUrls: [ 'lists.page.scss' ]
})
export class ListsPage implements OnInit{
    termino = '';
    showList = true;

    constructor(
        public db: DbService,
        private sharedService: SharedListService
    ) {}

    async ngOnInit() {
        await this.db.getLists();
    }

    async showOptions(id: string) {
        await this.sharedService.showOptions(id);
    }

    search(term: string) {
        this.termino = term;
    }

    getListSize(size: number) {
        if (size === 0) {
            this.showList = false;
        }
    }

}
