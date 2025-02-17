import {Component, EventEmitter, Input, Output} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Output() selectedPage = new EventEmitter<string>();
  @Output() onCloseSidenav = new EventEmitter<boolean>();
  @Input() currentPage!: string;
  @Input() loggedIn!: boolean;
  @Input() isAdmin!: boolean;

  constructor(private translate: TranslateService){


    }

  menuSwitch() {
    this.selectedPage.emit(this.currentPage);
  }

  close() {
    this.onCloseSidenav.emit(true);
  }
}
