import { DbService } from './../services/db.service';
import { List } from './../interfaces/interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'category',
    pure: true
})
export class CategoryPipe implements PipeTransform {
    constructor(private db: DbService) {}
    transform(lists: List[], categoryId: string, termino: string): any {
        console.log('llamen al pipe de categoria cabrones', categoryId);
        return lists.filter((list) => list.category_id === categoryId);
    }
}
