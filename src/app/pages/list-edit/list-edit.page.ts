import { List, Category } from './../../interfaces/interfaces';
import { DbService } from './../../services/db.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-list-edit',
    templateUrl: './list-edit.page.html',
    styleUrls: [ './list-edit.page.scss' ]
})
export class ListEditPage implements OnInit {
    id: string;
    list: List = {
        name: '',
        category_id: 'nulled'
    };

    category: Category = {};

    constructor(private activatedRoute: ActivatedRoute, public db: DbService, private navCtrl: NavController) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            if (params.id) {
                this.id = params.id;
                this.list = this.db.searchListById(this.id);
                if (this.list.category_id == null) {
                    this.list.category_id = 'nulled';
                }
            } else {
                console.log('no tenemos id');
            }
        });
    }

    async editList(editListForm: NgForm) {
        console.log(editListForm);
        console.log(this.list);
        if (editListForm.invalid) {
            return;
        }

        if (!this.id) {
            console.log('no tenemos id, queremos añadir una lista nueva');
            await this.db.addList(this.list);
            this.navCtrl.back();
            return;
        }
        console.log('tenemos id, queremos editar una lista');

        await this.db.editList(this.list);
        this.navCtrl.back();
    }
}
