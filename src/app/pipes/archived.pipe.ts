import { List } from './../interfaces/interfaces';
import { DbService } from './../services/db.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'archived',
    pure: true
})
export class ArchivedPipe implements PipeTransform {
    constructor(private db: DbService) {}
    transform(lists: List[], archived: boolean): any {
        if (archived) {
            return (lists.filter((list) => list.archived === true));
        }
        return (lists.filter((list) => list.archived === false));
    }
}
