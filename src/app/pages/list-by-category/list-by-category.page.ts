import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from './../../services/db.service';

@Component({
    selector: 'app-list-by-category',
    templateUrl: './list-by-category.page.html',
    styleUrls: [ './list-by-category.page.scss' ]
})
export class ListByCategoryPage implements OnInit {
    id = '';
    categoryName: string;
    termino = '';
    showList = true;

    constructor(public db: DbService, private actRoute: ActivatedRoute) {}

    ngOnInit() {
        const paramId = this.actRoute.snapshot.params.id;
        if (paramId) {
            this.id = paramId;
            this.categoryName = this.db.getCategoryName(this.id);
        }
        return;
    }

    getListSize(size: number) {
        if (size === 0) {
            this.showList = false;
        }
    }

    search(term: string) {
        this.termino = term;
    }
}
