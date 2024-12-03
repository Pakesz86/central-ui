import {Component, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {dialogConstants} from "../../shared/constants";
import {ColumnDefinition, ReusableTableComponent} from "../../shared/reusable-table/reusable-table.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {


  @ViewChild('reusableTable') reusableTable?: ReusableTableComponent;

  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router) {
  }


}
