import { Component, OnInit } from '@angular/core';
import { DbService } from './../../services/db.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.page.html',
    styleUrls: [ './categories.page.scss' ]
})
export class CategoriesPage {
    constructor(public db: DbService) {}
}
