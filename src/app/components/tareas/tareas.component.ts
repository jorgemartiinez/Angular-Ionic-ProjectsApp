import { SharedListService } from './../../services/shared-list.service';
import { AlertController } from '@ionic/angular';
import { DbService } from './../../services/db.service';
import { Task } from './../../interfaces/interfaces';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-tareas',
    templateUrl: './tareas.component.html',
    styleUrls: [ './tareas.component.scss' ]
})
export class TareasComponent implements OnInit {
    // Inputs
    @Input() tasks: Task[] = [];
    @Input() listId: string;

    constructor(public db: DbService, private alertController: AlertController, private shared: SharedListService) {}

    ngOnInit() {
        console.log('id lista desde el componente', this.listId);
    }

    async reorder(event) {
        const itemMover = this.db.tasks.splice(event.detail.from, 1)[0];
        // eliminamos el elemento del array ya que tenemos su from y lo obtenemos

        this.db.tasks.splice(event.detail.to, 0, itemMover);
        // añadimos el elemento borrado anteriormente a su to, en este no queremos borrar ninguno

        event.detail.complete();
        await this.db.saveTasks(this.listId);
    }

    async toggleChange(event, task: Task) {
        task.state = !task.state;
        await this.db.saveTasks(this.listId);
        this.shared.numCompletedTrigger();
    }

    async editTask(idTask: string, it) {
        it.close();
        const searchTask = this.db.tasks.find(task => task.id == idTask);
        const alert = await this.alertController.create({
            header: 'Edit your task',
            inputs: [
                {
                    name: 'name',
                    type: 'text',
                    value: searchTask.name,
                    placeholder: 'Task name...'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                },
                {
                    text: 'Ok',
                    handler: async (data: any) => {
                        await this.db.editTask(this.listId, idTask, data.name);
                    }
                }
            ]
        });

        await alert.present();
    }

    async delTask(idTask: string, it) {
        const alert = await this.alertController.create({
            header: 'Are you sure you want to delete this task?',
            message: 'This operation will be irreversible.',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                },
                {
                    text: 'Okay',
                    handler: async () => {
                        await this.db.delTask(this.listId, idTask);
                        it.close();
                    }
                }
            ]
        });

        await alert.present();
    }
    async favTask(id: string, it) {
        await this.db.favTask(this.listId, id);
        it.close();
    }
}
