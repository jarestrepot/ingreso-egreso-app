import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'shared-basic-graph',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent {

  icome = signal<number>(0);
  egress = signal<number>(0)

  @Input({ required: true }) set dataGraph({icome, egress}:{icome:number, egress:number}){
    this.icome.set(icome);
    this.egress.set(egress);
  }
}
