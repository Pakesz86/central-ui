import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContentRoutingModule} from './content-routing.module';
import {ContentComponent} from './content.component';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatTableModule} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {RoleFormatPipe} from "../../shared/pipes/role-format.pipe";
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatProgressBar} from "@angular/material/progress-bar";
import {ReusableTableModule} from "../../shared/reusable-table/reusable-table.module";
import {ConfirmDialogModule} from "../../shared/confirm-dialog/confirm-dialog.module";
import {DayFormatPipe} from "../../shared/pipes/day-format.pipe";


@NgModule({
  declarations: [
    ContentComponent,
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatPaginator,
    MatSort,
    MatSortHeader,
    MatTableModule,
    RoleFormatPipe,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatProgressBar,
    MatDialogActions,
    MatButton,
    ReusableTableModule,
    ConfirmDialogModule,
    DayFormatPipe,
  ]
})
export class ContentModule { }
