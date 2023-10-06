/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, inject, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from './news.service';
import { NewsListComponent } from './news-list/news-list.component'
import { TableModule } from 'primeng/table';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { Router, RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { Coding } from '@his-base/datatypes';
import { JetstreamWsService } from '@his-base/jetstream-ws';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '@his-base/shared';


@Component({
  selector: 'his-news-info',
  standalone: true,
  imports: [CommonModule, NewsListComponent, TableModule, FieldsetModule, ButtonModule, AvatarModule, RouterOutlet,TranslateModule],
  templateUrl: './news-info.component2.html',
  styleUrls: ['./news-info.component.scss']
})
export class NewsInfoComponent implements OnInit, OnDestroy{


  /** 使用computed變數儲存各最新消息的資訊
   *  @memberof NewsInfoComponent
   */
  news = computed(() => this.newsService.news());
  normalNews = computed(() => this.newsService.normalNews());
  toDoList = computed(() => this.newsService.toDoList());
  checkedNormalNews = computed(() => this.newsService.checkedNormalNews());
  checkedToDoList = computed(()=>this.newsService.checkedToDoList());

  /** userCode假資料
   *  @memberof NewsInfoComponent
   */
  mockUserCode!:Coding

  newsService = inject(NewsService);
  sharedService = inject(SharedService);
  #jetStreamWsService = inject(JetstreamWsService);
  #router = inject(Router);

  /** HttpClient引入假userCode
   *  @memberof NewsInfoComponent
   */
  constructor(private http:HttpClient){
    http.get('http://localhost:4321/assets/mockUserCode/mockUserCode.json')
        .subscribe(userCode => {
          this.mockUserCode = userCode as Coding;
        })
  }

  /** 建立連線、訂閱最新消息、初始化最新消息
   *  @memberof NewsInfoComponent
   */
  async ngOnInit(): Promise<void> {
    await this.newsService.connect();
    await this.newsService.subNews();
    this.newsService.publishUserCode(this.mockUserCode);
  }

  /** 跳轉到上一頁
   *  @memberof NewsInfoComponent
   */
  onBackClick():void {
    window.history.back();
  }

  /** 跳轉到appUrl路徑的位置，並使用sharedService傳送資訊
   *  @memberof NewsInfoComponent
   */
  onNavNewsClick(appUrl:string, sharedData:object):void{
    const key = this.sharedService.setValue(sharedData)
    this.#router.navigate([appUrl],{state:{token:key}});
  }

  /** 發送`最新消息狀態改為已讀/已完成`到nats
   *  @memberof NewsInfoComponent
   */
  async onChangeStatus(userCode:Coding, newsId:string):Promise<void>{
    this.newsService.changeStatus(userCode, newsId);
  }

  /** 清除連線
   *  @memberof NewsInfoCoponent
   */
  async ngOnDestroy(): Promise<void> {
    await this.newsService.disconnect();
  }

}
