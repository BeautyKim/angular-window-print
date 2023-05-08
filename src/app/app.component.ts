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
    const option = 'width=600, height=300, scrollbars=no, resizable=0';
    const popupPrintContent = document.getElementById('print2').innerHTML;
    const popupPrint = window.open('', '팝업 프린트 화면', option); //_blank is default
    popupPrint.document.write(`
      <html>
        <head>
          <title>팝업 프린트 화면</title>
        </head>
        <body onload="window.print();">
          ${popupPrintContent}
        </body>
      </html>
    `);
    popupPrint.document.close(); // 더 이상 document.write() 못하게 막아주는 코드
    popupPrint.close(); // 새 창 닫기
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
