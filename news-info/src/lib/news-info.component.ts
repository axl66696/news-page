/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, inject, signal, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from './news.service';
import { NewsListComponent } from './news-list/news-list.component'
import { TableModule } from 'primeng/table';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { Router, RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { UserProfile } from '../public-api';
import { Coding } from '@his-base/datatypes';
import { News } from '@his-viewmodel/appportal/dist'
import { JetstreamWsService } from '@his-base/jetstream-ws';
import { MockUserService } from './mock-user.service';

@Component({
  selector: 'his-news-info',
  standalone: true,
  imports: [CommonModule, NewsListComponent, TableModule, FieldsetModule, ButtonModule, AvatarModule, RouterOutlet],
  templateUrl: './news-info.component.html',
  styleUrls: ['./news-info.component.scss']
})
export class NewsInfoComponent implements OnInit{


  /** 使用Signal變數儲存各最新消息的資訊
   *  @memberof NewsInfoComponent
   */
  news = computed(() => this.newsService.news());
  normalNews = computed(() => this.newsService.normalNews());
  toDoList = computed(() => this.newsService.toDoList());
  checkedNormalNews = computed(() => this.newsService.checkedNormalNews());
  checkedToDoList = computed(()=>this.newsService.checkedToDoList())

  newsService = inject(NewsService)
  mockUserService = inject(MockUserService)
  #jetStreamWsService = inject(JetstreamWsService);
  #router = inject(Router)


  /** 初始化使用者資訊
   *  @memberof NewsInfoComponent
   */
  async ngOnInit() {
    await this.newsService.connect();
    await this.newsService.subNews()
    this.newsService.getInitNews(this.mockUserService.mockUserCode);
  }

  /** 跳轉到上一頁
   *  @memberof NewsInfoComponent
   */
  onBackClick() {
    window.history.back()
  }

  /** 跳轉到appUrl路徑的位置，並附帶傳送的資訊
   *  @memberof NewsInfoComponent
   */
  onNavNewsClick(appUrl:string, sharedData:object){
    this.#router.navigate([appUrl],{state:sharedData})
  }

  /** 發送`最新消息狀態改為已讀/已完成`到nats
   *  @memberof NewsInfoComponent
   */
  async onChangeStatus(userCode:Coding, newsId:string){
    this.newsService.changeStatus(userCode, newsId)
  }

}
