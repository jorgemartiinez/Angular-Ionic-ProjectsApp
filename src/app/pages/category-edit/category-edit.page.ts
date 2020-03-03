import { NgForm } from '@angular/forms';
import { Category } from './../../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { DbService } from './../../services/db.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.page.html',
    styleUrls: [ './category-edit.page.scss' ]
})
export class CategoryEditPage implements OnInit {
    id: string;

    category: Category = {};

    constructor(private activatedRoute: ActivatedRoute, public db: DbService, private navCtrl: NavController) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            if (params.id) {
                this.id = params.id;
                this.category = this.db.searchCategoryById(this.id);
            } else {
                console.log('no tenemos id');
                this.category.icon = 'albums';
            }
        });
    }

    update(value: string) {
        console.log('value before button click' + this.category.icon);
        this.category.icon = value;
        console.log('value after button click' + this.category.icon);
    }

    checkColor(icon) {
        if (this.category.icon == icon) {
            return 'primary';
        }
    }

    async editCategory(form: NgForm){
        console.log(form);
        console.log(this.category);
        if (form.invalid) {
            return;
        }

        if (!this.id) {
            console.log('no tenemos id, queremos añadir una lista nueva');
            await this.db.addCategory(this.category);
            this.navCtrl.back();
            return;
        }
        console.log('tenemos id, queremos editar una lista');

        await this.db.editCategory(this.category);
        this.navCtrl.back();
    }
}
