import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
    @Input() list: List;
    @Input() index: number;
    icon = 'options';
    numCompleted = 0;
    @ViewChild('IonCard', { static: false })
    ionCard: HTMLElement;

    constructor(private sharedService: SharedListService, private router: Router, private db: DbService) {}

    ngOnInit() {
        this.numCompleted = this.list.tasks.filter((task) => task.state == 0).length;
        // tslint:disable-next-line: quotemark
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
