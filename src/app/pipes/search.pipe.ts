import { Pipe, PipeTransform } from '@angular/core';
import { DbService } from './../services/db.service';
import { List, Category } from './../interfaces/interfaces';

@Pipe({
    name: 'search',
    pure: true
})
export class SearchPipe implements PipeTransform {
    constructor(private db: DbService) {}
    transform(items , termino: string ) {
        if (/\S/.test(termino)) {
            if (items) {
                return items.filter((item) => item.name.toUpperCase().includes(termino.toUpperCase()));
            }
        }
        return items;
    }
}
