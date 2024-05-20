import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-is-loading-button',
  templateUrl: './is-loading-button.component.html',
  styleUrls: ['./is-loading-button.component.css']
})
export class IsLoadingButtonComponent {

  @Input({ required: true }) text:string = '';
  @Input({ required: false }) classBtn: string = 'btn btn-primary submit-btn btn-block';
}
