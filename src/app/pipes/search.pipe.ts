import { DbService } from './../services/db.service';
import { List } from './../interfaces/interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search',
    pure: true
})
export class SearchPipe implements PipeTransform {
    constructor(private db: DbService) {}
    transform(lists: List[], termino: string): List[] {
        console.log('llamen al pipe', termino);
        if (/\S/.test(termino)) {
            return lists.filter((list) => list.name.toUpperCase().includes(termino.toUpperCase()));
        }
        return this.db.lists;
    }
}
