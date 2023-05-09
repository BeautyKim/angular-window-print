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
  // 기본 프린트(새로고침 필요)
  public printMe1(): void {
    this.printContent = document.getElementById('print1');
    window.print();
  }
  // 새 창 프린트(새로고침 필요x)
  public printMe2() {
    //팝업 사이즈
    const popupWidth = 900;
    const popupHeight = 700;
    // 현재 창 사이즈
    const winWidth = document.body.clientWidth;
    const winHeight = document.body.clientHeight;
    const winX = window.screenX || window.screenLeft; // screenX, screenY -> Firefox
    const winY = window.screenY || window.screenTop;
    // console.log(w, h)

    const w = winX + (winWidth - popupWidth) / 2 - 50; // left
    const h = winY + (winHeight - popupHeight) / 2 - 50; // top

    const option = `width=${popupWidth}, height=${popupHeight},left=${w}, top=${h}, status=no, menubar=no`;
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
  //css 프린트(이 코드에서는 HostListener 때문에 인쇄 후 자동으로 reload 적용됨. css 확인을 위해서 HostListener 주석 필요)
  public printMe3(): void {
    window.print();
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
