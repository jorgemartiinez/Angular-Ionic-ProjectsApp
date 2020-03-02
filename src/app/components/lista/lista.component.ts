import { List } from './../../interfaces/interfaces';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
    numCompleted = 0;
    @ViewChild('IonCard', {static: false}) ionCard: HTMLElement;

    constructor(private eb: EventBusService, private router: Router) {}

    ngOnInit() {
        this.numCompleted = this.list.tasks.filter(task => task.state == 0).length;
        // tslint:disable-next-line: quotemark
    }

    showOptions(event, id) {
        event.stopPropagation();
        event.preventDefault();
        this.eb.showListOptions(id);
    }

    goToTasks() {
        this.router.navigateByUrl('tabs/lists/' + this.list.id + '/tasks');
    }
}
