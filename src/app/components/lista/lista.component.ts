import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SharedListService } from './../../services/shared-list.service';
import { DbService } from './../../services/db.service';
import { List } from './../../interfaces/interfaces';

@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrls: [ './lista.component.scss' ]
})
export class ListaComponent implements OnInit {
    @Input() list: List = {category_id: ''};
    @Input() index: number;
    icon = 'options';
    numCompleted = 0;

    constructor(private sharedService: SharedListService, private router: Router, private db: DbService) {}

    ngOnInit() {

        this.sharedService.numCompletedEvent$.subscribe((changed) => {
            if (changed) {
                this.numCompleted = this.list.tasks.filter((task) => task.state == true).length;
            }
        });
        // tslint:disable-next-line: quotemark
    }

    ionViewWillEnter() {
        console.log('willenter');
        this.numCompleted = this.list.tasks.filter((task) => task.state == true).length;
    }
    async showOptions(event, id) {
        event.stopPropagation();
        event.preventDefault();
        await this.sharedService.showOptions(id);
    }

    goToTasks() {
        this.router.navigateByUrl('tabs/lists/' + this.list.id + '/tasks');
    }

    getCategoryName(id: string) {
        return this.db.getCategoryName(id);
    }
}
