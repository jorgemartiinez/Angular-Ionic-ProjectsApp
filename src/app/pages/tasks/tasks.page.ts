import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertController } from '@ionic/angular';
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
    termino = '';
    constructor(
        private activated: ActivatedRoute,
        public db: DbService,
        private router: Router,
        private alertController: AlertController,
        private social: SocialSharing
    ) {}

    async ngOnInit() {
        this.activated.params.subscribe(async (params) => {
            if (this.listId !== params.listId) {
                this.listId = params.listId;
                const listaValida = (await this.db.getTasksByList(this.listId)) || {};
                this.listName = listaValida.name;
                if (Object.keys(listaValida).length === 0) {
                    this.router.navigateByUrl('tabs/lists');
                }
            } else {
                console.log('mismo id');
            }
            console.log(this.db.tasks);
        });
    }

    async createTask() {
        const alert = await this.alertController.create({
            header: 'New task',
            subHeader: 'Name for your new task',
            inputs: [
                {
                    name: 'name',
                    type: 'text',
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
                        await this.db.addTask(this.listId, data.name);
                    }
                }
            ]
        });

        await alert.present();
    }

    search(termino: string) {
        this.termino = termino;
    }

    socialSharing(event) {
        console.log('llega el evento del social share!');
        let msg = `*${this.listName}* \n`;

        for (let task of this.db.tasks) {
            if (task.state) {
                msg += `~_${task.name}_~\n`;
            } else {
                msg += `_${task.name}_\n`;
            }
        }

        this.social.shareViaWhatsApp(msg);
    }
}
