import { EventBusService } from './../../services/event-bus.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-listas',
    templateUrl: './listas.component.html',
    styleUrls: [ './listas.component.scss' ]
})
export class ListasComponent implements OnInit {
    @Input() lists;

    constructor(private eb: EventBusService) {}

    ngOnInit() {}

}
