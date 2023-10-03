/* eslint-disable @angular-eslint/component-selector */
import { NewsService } from './../../../news-info/src/lib/news.service';
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NewsInfoComponent } from 'news-info';
import { NewsListComponent } from 'news-info';
import { UserProfile } from '../../../news-info/src/public-api';
import { Coding } from '@his-base/datatypes';
import { News } from '@his-viewmodel/appportal/dist'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NewsInfoComponent, NewsListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'news-page';

  // news = signal<News[]>({} as News[])
  // normalNews = signal<News[]>({} as News[])
  // toDoListNews = signal<News[]>({} as News[])

  // newsService = inject(NewsService)



  // ngOnInit(): void {
  //   console.log("hello app")
  //   this.newsService.getNewsFromNats(mockNews);
  //   console.log("app userNews", this.newsService.news)

  //   this.news.set(this.newsService.news())
  //   console.log("app news", this.news())

  //   this.normalNews.set(this.newsService.getFilterNews("10"))
  //   this.toDoListNews.set(this.newsService.getFilterNews("60"))
  //   // this.newsService.getUserAccountFromNats(mockUser)
  //   // console.log("userNews", this.newsService.userProfile().userNews)
  // }
}



// export const mockUser:UserProfile = new UserProfile({
//   "orgNo": "竹銘醫院",
//   "userCode": "Neo",
//   "userName": "alphaTeam-001",
//   "sex": "male",
//   "birthday": new Date("1990-06-15T00:00:00.000Z"),
//   "userImage": "assets/user.png",
//   "eMail": "dirk122119@gmail.com",
//   "passwordHash": "496100d64f7408acb63cddaf13adbbbbbf2e1a4c66194f8019e20ec6bbbb201c",
//   "passwordDate": new Date("1990-06-15T00:00:00.000Z"),
//   "authHash": "001",
//   "startDate": new Date("1990-06-15T00:00:00.000Z"),
//   "endDate": new Date("2990-06-15T00:00:00.000Z"),
//   "remark": "",
//   "systemUser": "",
//   "systemTime": new Date("1990-06-15T00:00:00.000Z"),
//   "typeSetting": {},
//   "systemAuthority": [
//     "ttvfb",
//     "醫囑系統",
//     "mklaeirnikra"
//   ],
//   "userFavorite": [
//     {
//       "_id": "96ec6b55-fb85-4919-8acf-9841e94d3341",
//       "appTitle": "mklaeirnikra",
//       "versionNo": "0.1.0",
//       "appType": "",
//       "appUrl": "/fff/fewfe",
//       "appHome": {
//         "_id": '',
//         "pageTitle": '',
//         "versionNo": '',
//         "pageUrl": '',
//         "pageIcon": '',
//         "pageRouter": '',
//         "maintainer": new Coding(),
//         "moduleName": '',
//         "className": '',
//         "moduleType": 'module'
//       },
//       "appLanguage": "",
//       "appIcon": "pi-user",
//       "isAuth": false,
//       "userAuth": {
//         "code": "",
//         "display": ""
//       },
//       "appPages": [],
//       "isFavorite": true,
//       "isOpen": false
//     },
//     {
//       "_id": "78264f0a-ede0-489c-8021-1aac8396fde6",
//       "appTitle": "opd-order",
//       "versionNo": "1.1.0",
//       "appType": "行政",
//       "appUrl": "/system4/opd-order",
//       "appHome": {
//         "_id": '',
//         "pageTitle": '',
//         "versionNo": '',
//         "pageUrl": '',
//         "pageIcon": '',
//         "pageRouter": '',
//         "maintainer": new Coding(),
//         "moduleName": '',
//         "className": '',
//         "moduleType": 'module'
//       },
//       "appLanguage": "",
//       "appIcon": "assets/appImage.svg",
//       "isAuth": false,
//       "userAuth": {
//         "code": "",
//         "display": ""
//       },
//       "appPages": [],
//       "isFavorite": true,
//       "isOpen": false
//     },
//     {
//       "_id": "64f6e42e9abe2016c5e312",
//       "appTitle": "app store",
//       "versionNo": "1.1.0",
//       "appType": "行政",
//       "appUrl": "/system2/appStore",
//       "appHome": {
//         "_id": '',
//         "pageTitle": '',
//         "versionNo": '',
//         "pageUrl": '',
//         "pageIcon": '',
//         "pageRouter": '',
//         "maintainer": new Coding(),
//         "moduleName": '',
//         "className": '',
//         "moduleType": 'module'
//       },
//       "appLanguage": "",
//       "appIcon": "assets/appImage.svg",
//       "isAuth": false,
//       "userAuth": {
//         "code": "",
//         "display": ""
//       },
//       "appPages": [],
//       "isFavorite": true,
//       "isOpen": false
//     }
//   ],
//   "userNews": [
//     {
//       "_id": "001",
//       "appId": "001-app_id",
//       "userCode": "001-userCode",
//       "type": "醫囑",
//       "startTime": new Date("1990-06-15T00:00:00.000Z"),
//       "endTime": new Date("1990-06-15T00:00:00.000Z"),
//       "status": "未完成",
//       "content": "最新消息content",
//       "url": "https://www.hpc.tw",
//       "systemUser": "alphaTeam",
//       "systemTime": new Date("1990-06-15T00:00:00.000Z"),
//       "sawTime": new Date("1990-06-15T00:00:00.000Z"),
//       "shareData": {}
//     },
//     {
//       "_id": "003",
//       "appId": "003-app_id",
//       "userCode": "001-userCode",
//       "type": "掛號",
//       "startTime": new Date("1990-06-15T00:00:00.000Z"),
//       "endTime": new Date("1990-06-15T00:00:00.000Z"),
//       "status": "已完成",
//       "content": "最新消息conten222",
//       "url": "https://www.hpc.tw",
//       "systemUser": "alphaTeam",
//       "systemTime": new Date("1990-06-15T00:00:00.000Z"),
//       "sawTime": new Date("1990-06-15T00:00:00.000Z"),
//       "shareData":{}
//     },
//     {
//       "_id": "003",
//       "appId": "003-app_id",
//       "userCode": "001-userCode",
//       "type": "掛號",
//       "startTime": new Date("1990-06-15T00:00:00.000Z"),
//       "endTime": new Date("1990-06-15T00:00:00.000Z"),
//       "status": "一般消息",
//       "content": "最新消息ffweflmcontent3333",
//       "url": "https://www.hpc.tw",
//       "systemUser": "alphaTeam",
//       "systemTime": new Date("1990-06-15T00:00:00.000"),
//       "sawTime": new Date("1990-06-15T00:00:00.000Z"),
//       "shareData":{}
//     }
//   ]
// });
