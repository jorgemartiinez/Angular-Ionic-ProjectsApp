import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: [ './search-bar.component.scss' ]
})
export class SearchBarComponent {
    triggerSearch = false;
    termino = '';
    @Input() title: string;
    @Input() showSocial: boolean;

    @Output() search = new EventEmitter<string>();
    @Output() socialShare = new EventEmitter<boolean>();

    constructor() {}

    searchBar(event) {
        this.termino = event.detail.value;
        this.search.emit(this.termino);
    }

    socialShareF(event) {
        console.log('emitimos el evento del componente');
        this.socialShare.emit(true);
    }
}
