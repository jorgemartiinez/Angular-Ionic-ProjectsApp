import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DbService } from './../../services/db.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-lists-archived',
    templateUrl: './lists-archived.page.html',
    styleUrls: [ './lists-archived.page.scss' ]
})
export class ListsArchivedPage implements OnInit {
    id = '';
    termino = '';
    showList = true;

    constructor(public db: DbService, private social: SocialSharing) {}

    ngOnInit() {}

    getListSize(size: number) {
        if (size === 0) {
            this.showList = false;
        }
    }
    search(term: string) {
        this.termino = term;
    }

    socialSharing(event) {
        let msg = '*Lists that I\'ve archived on SimplyList* \n';

        for (let list of this.db.lists) {
            if (list.archived) {
                msg += `_${list.name}_\n`;
            }
        }

        this.social.shareViaWhatsApp(msg);
    }
}
