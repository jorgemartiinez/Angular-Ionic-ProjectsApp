import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-list-button',
  templateUrl: './add-list-button.component.html',
  styleUrls: ['./add-list-button.component.scss'],
})
export class AddListButtonComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}
  goToAddList() {
    this.router.navigateByUrl('tabs/lists/edit');
}

}
