import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  message: string;
  btnOkText: string;
  btnCancelText: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { message: string, btnOkText: string, btnCancelText: string }) {
    this.message = data.message;
    this.btnOkText = data.btnOkText;
    this.btnCancelText = data.btnCancelText;
  }

  public decline() {
    this.dialogRef.close(false);
  }

  public accept() {
    this.dialogRef.close(true);
  }
}
