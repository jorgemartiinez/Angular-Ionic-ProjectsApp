import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: [ './search-bar.component.scss' ]
})
export class SearchBarComponent implements OnInit {
    triggerSearch = false;
    termino = '';
    @Input() title: string;

    @Output() search = new EventEmitter<string>();

    constructor() {}

    ngOnInit() {
      console.log('titulo recibido', this.title);
    }

    searchBar(event) {
        this.termino = event.detail.value;
        this.search.emit(this.termino);
    }
}
