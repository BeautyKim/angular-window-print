import {
  Component,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public prtContent;
  public initBody;

  constructor() {}

  public printMe(): void {
    this.prtContent = document.getElementById('print');
    window.print();
  }

  @HostListener('window:beforeprint', ['$event'])
  onBeforePrint() {
    console.log('인쇄 전');
    this.initBody = document.body.innerHTML;
    document.body.innerHTML = this.prtContent.innerHTML;
  }
  @HostListener('window:afterprint', ['$event'])
  onAfterPrint() {
    console.log('인쇄 후');
    document.body.innerHTML = this.initBody;
    window.location.reload();
  }
}
