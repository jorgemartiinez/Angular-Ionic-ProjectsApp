import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EventBusService {
    @Output() showListOptions$: EventEmitter<number> = new EventEmitter();

    constructor() {}

    showListOptions(id: number) {
        this.showListOptions$.emit(id);
    }
}
