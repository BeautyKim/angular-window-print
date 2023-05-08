import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public printContent;
  public initBody;

  constructor() {}
  // 새로고침 필요
  public printMe1(): void {
    this.printContent = document.getElementById('print1');
    window.print();
  }
  // 새로고침 필요x
  public printMe2(): void {
    const option = '';
    const popupPrintContent = document.getElementById('print2').innerHTML;
    const popupPrint = window.open('', '_blank', 'width=722,height=480');
    popupPrint.document.write(`
      <html>
        <head>
          <title>popup print</title>
        </head>
        <body onload="window.print();">
          ${popupPrintContent}
        </body>
      </html>
    `);
    popupPrint.document.close();
  }

  @HostListener('window:beforeprint', ['$event'])
  onBeforePrint() {
    console.log('인쇄 전');
    this.initBody = document.body.innerHTML;
    document.body.innerHTML = this.printContent.innerHTML;
  }
  @HostListener('window:afterprint', ['$event'])
  onAfterPrint() {
    console.log('인쇄 후');
    document.body.innerHTML = this.initBody;
    window.location.reload();
  }
}
