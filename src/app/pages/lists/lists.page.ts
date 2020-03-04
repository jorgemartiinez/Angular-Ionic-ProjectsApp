import { Component, OnInit } from '@angular/core';
import { DbService } from './../../services/db.service';
import { SharedListService } from './../../services/shared-list.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-lists',
    templateUrl: 'lists.page.html',
    styleUrls: [ 'lists.page.scss' ]
})
export class ListsPage implements OnInit {
    termino = '';
    showList = true;

    constructor(public db: DbService, private sharedService: SharedListService, private social: SocialSharing, private nav: NavController) {}

    async ngOnInit() {
        await this.db.getLists();
    }

    async showOptions(id: string) {
        await this.sharedService.showOptions(id);
    }

    search(term: string) {
        this.termino = term;
    }
    socialSharing(event) {
        console.log('llega el evento del social share!');
        let msg = '*Lists that I\'ve created using SimplyList* \n';

        for (let list of this.db.lists) {
            if (list.archived === false) {
                msg += `_${list.name}_\n`;
            }
        }

        this.social.shareViaWhatsApp(msg);
    }
    getListSize(size: number) {
        if (size === 0) {
            this.showList = false;
        }
    }
}
