/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, inject, signal, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from './news.service';
import { NewsListComponent } from './news-list/news-list.component'
import { TableModule } from 'primeng/table';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { Router, RouterOutlet } from '@angular/router';
import { UserProfileService } from './user-profile.service';
import { AvatarModule } from 'primeng/avatar';
import { UserProfile } from '../public-api';
import { Coding } from '@his-base/datatypes';
import { News } from '@his-viewmodel/appportal/dist'
import { JetstreamWsService } from '@his-base/jetstream-ws';

@Component({
  selector: 'his-news-info',
  standalone: true,
  imports: [CommonModule, NewsListComponent, TableModule, FieldsetModule, ButtonModule, AvatarModule, RouterOutlet],
  templateUrl: './news-info.component.html',
  styleUrls: ['./news-info.component.scss']
})
export class NewsInfoComponent implements OnInit{

  /** 使用Signal變數儲存UserProfile型別的使用者資訊
   * @memberof NewsInfoComponent
   */

  news = computed(() => this.newsService.news());
  normalNews = computed(() => this.newsService.normalNews());
  toDoList = computed(() => this.newsService.toDoList());
  checkedNormalNews = computed(() => this.newsService.checkedNormalNews());
  checkedToDoList = computed(()=>this.newsService.checkedToDoList())

  newsService = inject(NewsService)
  #jetStreamWsService = inject(JetstreamWsService);
  #router = inject(Router)


  /** 初始化使用者資訊
   * @memberof NewsInfoComponent
   */
  async ngOnInit() {

    this.newsService.setNews();
    await this.newsService.connect();
    await this.newsService.subNews()
    await this.newsService.getNewsFromNats();
    console.log("newsService userNews", this.newsService.news)
    console.log("newsInfo news", this.news())
    console.log("公告消息", this.normalNews)
    console.log("待辦工作", this.toDoList)
    console.log("現在時間", new Date)
  }

  /** 跳轉到上一頁
   * @memberof NewsInfoComponent
   */
  onBackClick() {
    window.history.back()
  }

  /** 跳轉到appUrl路徑的位置，並附帶傳送的資訊
   * @param {string} appUrl
   * @param {object} sharedData
   * @memberof NewsInfoComponent
   */
  onNavNewsClick(appUrl:string, sharedData:object){
    alert(`導向到 -------> ${appUrl}token值：${sharedData}`)
    this.#router.navigate([appUrl],{state:sharedData})
  }

  async onChangeStatus(userCode:Coding, newsId:string){
    const date = new Date
    await this.#jetStreamWsService.publish("news.updateStatus", {userCode, newsId, date})
  }

}

// export const mockNews:News[] =[
//   {
//     "_id": "64f1968af80caa4450a1d218",
//     "appId": "001-app_id",
//     "userCode": {
//       "code" : "001-app_id",
//       "display" : "001-app_id"
//     },
//     "subject": "員工健康檢查通知",
//     "url": "https://www.hpc.tw",
//     "sharedData": {},
//     "period": {
//       "start": new Date("1990-06-15T00:00"),
//       "end": new Date("2229-12-31T23:59")
//     },
//     "type": {
//       "code":"10",
//       "display":"一般消息"
//     },
//     "execTime": new Date("2023-09-27T14:00"),
//     "execStatus": {
//       "code" : "60",
//       "display" : "已讀/已完成"
//     }
//     ,
//     "updatedBy": {
//       "code" : "alphaTeam",
//       "display" : "alphaTeam"
//     },
//     "updatedAt": new Date("1990-06-15T00:00")
//   },
//   {
//     "_id": "64f1968af80caa4450a1d219",
//     "appId": "002-app_id",
//     "userCode": {
//       "code" : "001-app_id",
//       "display" : "001-app_id"
//     },
//     "subject": "您有1筆公文待簽核",
//     "url": "https://www.hpc.tw",
//     "sharedData": {},
//     "period": {
//       "start": new Date("1990-06-15T00:00"),
//       "end": new Date("2229-12-31T23:59")
//     },
//     "type": {
//       "code":"60",
//       "display":"待辦工作"
//     },
//     "execTime": new Date("2023-09-27T14:00"),
//     "execStatus": {
//       "code" : "60",
//       "display" : "已讀/已完成"
//     }
//     ,
//     "updatedBy": {
//       "code" : "alphaTeam",
//       "display" : "alphaTeam"
//     },
//     "updatedAt": new Date("1990-06-15T00:00")
//   },
//   {
//     "_id": "64f1968af80caa4450a1d21a",
//     "appId": "001-app_id",
//     "userCode": {
//       "code" : "002-userCode",
//       "display" : "002-userCode"
//     },
//     "subject": "員工健康檢查通知",
//     "url": "https://www.hpc.tw",
//     "sharedData": {},
//     "period": {
//       "start": new Date("1990-06-15T00:00"),
//       "end": new Date("2229-12-31T23:59")
//     },
//     "type": {
//       "code":"10",
//       "display":"一般消息"
//     },
//     "execTime": new Date("2023-09-27T14:00"),
//     "execStatus": {
//       "code" : "60",
//       "display" : "已讀/已完成"
//     }
//     ,
//     "updatedBy": {
//       "code" : "alphaTeam",
//       "display" : "alphaTeam"
//     },
//     "updatedAt": new Date("1990-06-15T00:00")
//   },
//   {
//     "_id": "64f1968af80caa4450a1d21b",
//     "appId": "002-app_id",
//     "userCode": {
//       "code" : "002-userCode",
//       "display" : "002-userCode"
//     },
//     "subject": "您有2筆公文待簽核",
//     "url": "https://www.hpc.tw",
//     "sharedData": {},
//     "period": {
//       "start": new Date("1990-06-15T00:00"),
//       "end": new Date("2229-12-31T23:59")
//     },
//     "type": {
//       "code":"60",
//       "display":"待辦工作"
//     },
//     "execTime": new Date("2023-09-27T14:00"),
//     "execStatus": {
//       "code" : "60",
//       "display" : "已讀/已完成"
//     }
//     ,
//     "updatedBy": {
//       "code" : "alphaTeam",
//       "display" : "alphaTeam"
//     },
//     "updatedAt": new Date("1990-06-15T00:00")
//   }
// ];


