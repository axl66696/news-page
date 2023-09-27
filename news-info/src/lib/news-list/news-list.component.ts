/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, Output, TemplateRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { News } from '@his-viewmodel/appportal/dist'
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'his-news-list',
  standalone: true,
  imports: [CommonModule,TableModule,ButtonModule],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent {

  /** 接收自父component收到的最新消息
   * @type {News[]}
   * @memberof NewsListComponent
   */
  @Input() news?: News[];

  /** ng-template模板
   * @type {TemplateRef<any>}
   * @memberof NewsListComponent
   */
  @Input() customTemplate?: TemplateRef<any> ;

  /** 宣告’請點選進入’eventEmitter
   * @memberof NewsListComponent
   */
  @Output() navigationData = new EventEmitter<any>;

  /** 發送‘請點選進入’事件，並傳送一個包含appUrl路徑與sharedData資料的物件
   * @param {string} appUrl
   * @param {object} sharedData
   * @memberof NewsListComponent
   */
  directTo(appUrl:string, sharedData:string){
    alert(`導向到 -------> ${appUrl}sharedData：${sharedData}`)
    this.navigationData.emit({appUrl:appUrl, sharedData:sharedData});
  }

}
