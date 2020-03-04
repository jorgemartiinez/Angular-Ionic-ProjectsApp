import { Component, OnInit } from '@angular/core';
import { DbService } from './../../services/db.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.page.html',
    styleUrls: [ './categories.page.scss' ]
})
export class CategoriesPage {
    termino = '';
    constructor(public db: DbService, private router: Router) {}
    search(term: string) {
        this.termino = term;
    }
}
