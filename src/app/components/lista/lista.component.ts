import { List } from './../../interfaces/interfaces';
import { Component, OnInit, Input } from '@angular/core';
import { EventBusService } from './../../services/event-bus.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrls: [ './lista.component.scss' ]
})
export class ListaComponent implements OnInit {
    @Input() list: List;
    @Input() index: number;
    icon = 'options';

    constructor(private eb: EventBusService, private router: Router) {}

    ngOnInit() {}

    showOptions(id) {
        this.eb.showListOptions(id);
    }

    goToTasks() {
        this.router.navigateByUrl('tabs/lists/' + this.list.id + '/tasks');
    }
}
