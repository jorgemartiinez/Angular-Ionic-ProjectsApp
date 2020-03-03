import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-listas',
    templateUrl: './listas.component.html',
    styleUrls: [ './listas.component.scss' ]
})
export class ListasComponent implements OnInit {
    @Input() lists;
    @Output() listSize = new EventEmitter<number>();

    constructor() {}

    ngOnInit() {
        if (this.lists) {
            this.listSize.emit(this.lists.length);
        }
    }
}
