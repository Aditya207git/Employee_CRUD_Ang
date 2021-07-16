import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-removeempdata',
  templateUrl: './removeempdata.component.html',
  styleUrls: ['./removeempdata.component.css']
})
export class RemoveempdataComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
