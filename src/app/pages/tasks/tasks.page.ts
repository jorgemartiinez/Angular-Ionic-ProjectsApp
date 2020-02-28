import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DbService } from './../../services/db.service';
import { Task } from './../../interfaces/interfaces';
@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.page.html',
    styleUrls: [ './tasks.page.scss' ]
})
export class TasksPage implements OnInit {
    listId: string;
    listName: string;
    actualPage: number;
    constructor(private activated: ActivatedRoute, public db: DbService, private router: Router) {

    }

    async ngOnInit() {
        this.activated.params.subscribe(async (params) => {
            if (this.listId !== params.listId) {
                console.log('nuevo id');
                this.listId = params.listId;
                const listaValida = await this.db.getTasksByList(this.listId) || {};
                this.listName = listaValida.name;
                if (Object.keys(listaValida).length === 0) {
                    alert('id of list not valid!');
                    this.router.navigateByUrl('tabs/lists');
                }
            } else {
                console.log('mismo id');
            }
            console.log(this.db.tasks);
            console.log('Nuestro id guardado es', this.listId);
        });
    }

    createTask(){
        console.log('lets create a new task!');
    }
}
