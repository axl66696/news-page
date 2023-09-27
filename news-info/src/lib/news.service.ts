/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, inject, signal } from '@angular/core';
import { UserProfile } from '../public-api';
import { Observable, Subject, mergeMap } from 'rxjs';
import { ConsumerMessages, JSONCodec, JetstreamWsService, SubscribeType } from '@his-base/jetstream-ws';
import { News } from '@his-viewmodel/appportal/dist';
import { Coding } from '@his-base/datatypes/dist';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  #url = 'ws://localhost:8080';

  /** 使用Signal變數儲存UserProfile型別的使用者資訊
   * @memberof NewsService
   */
  userProfile = signal<UserProfile>({} as UserProfile)

  news = signal<News[]>({} as News[])

  /** 使用Subject變數自nats拿取包含最新消息的使用者資訊
   * @memberof NewsService
   */
  #userNews = new Subject();

  /** 使用ConsumerMessages訂閱最新消息
   * @memberof NewsService
   */
  #consumerMessages$!: Observable<ConsumerMessages>;
  #jetStreamWsService = inject(JetstreamWsService);

  async connect() {
    await this.#jetStreamWsService.connect(this.#url);
    console.log("nats啟動")
  }

  async disconnect() {
    // 連線關閉前，會先將目前訂閱給排空
    await this.#jetStreamWsService.drain();
  }

  /** 更新最新消息
   * @param {News[]} news
   * @memberof NewsService
   */
  getNewsFromNats(news:News[]): void {
    this.news.set(news)
  }

  setNews(){
    this.news.set(mockNews)
  }

  /** 依‘一般消息’、’待辦工作’分類最新消息
   * @param {Coding} type
   * @return {News[]}
   * @memberof NewsService
   */
  getFilterNews(code?:Coding['code']): News[]{
    const newsList=this.news()
    if(code){
      return this.news().filter(m=>m.type['code']==code)
    }
    else{
      return newsList
    }
  }

  /** 訂閱最新消息
   * @memberof NewsService
   */
  async subNews() {
    this.#userNews = new Subject();
    const jsonCodec = JSONCodec();

    this.#consumerMessages$ = this.#jetStreamWsService.subscribe(
      SubscribeType.Pull,
      'news.getNews.dashboard'
    );

    this.#consumerMessages$
      .pipe(
        mergeMap(async (messages) => {
          for await (const message of messages) {
            this.#userNews.next(jsonCodec.decode(message.data));
            message.ack();
          }
        })
      )
      .subscribe(() => {});

    this.#userNews.subscribe((user: any) => {
      this.userProfile.set(user[0]);
    });

  }

}

export const mockNews:News[] =[
  {
    "_id": "64f1968af80caa4450a1d218",
    "appId": "001-app_id",
    "userCode": {
      "code" : "Neo",
      "display" : "Neo"
    },
    "subject": "員工健康檢查通知",
    "url": "https://www.hpc.tw",
    "sharedData": {},
    "period": {
      "start": new Date("1990-06-15T00:00"),
      "end": new Date("2229-12-31T23:59")
    },
    "type": {
      "code":"10",
      "display":"一般消息"
    },
    "execTime": new Date("2023-09-27T14:00"),
    "execStatus": {
      "code" : "60",
      "display" : "已讀/已完成"
    }
    ,
    "updatedBy": {
      "code" : "alphaTeam",
      "display" : "alphaTeam"
    },
    "updatedAt": new Date("1990-06-15T00:00")
  },
  {
    "_id": "64f1968af80caa4450a1d219",
    "appId": "002-app_id",
    "userCode": {
      "code" : "Neo",
      "display" : "Neo"
    },
    "subject": "您有1筆公文待簽核",
    "url": "https://www.hpc.tw",
    "sharedData": {},
    "period": {
      "start": new Date("1990-06-15T00:00"),
      "end": new Date("2229-12-31T23:59")
    },
    "type": {
      "code":"60",
      "display":"待辦工作"
    },
    "execTime": new Date("2023-09-27T14:00"),
    "execStatus": {
      "code" : "60",
      "display" : "已讀/已完成"
    }
    ,
    "updatedBy": {
      "code" : "alphaTeam",
      "display" : "alphaTeam"
    },
    "updatedAt": new Date("1990-06-15T00:00")
  },
  {
    "_id": "64f1968af80caa4450a1d21a",
    "appId": "001-app_id",
    "userCode": {
      "code" : "Tommy",
      "display" : "Tommy"
    },
    "subject": "員工健康檢查通知",
    "url": "https://www.hpc.tw",
    "sharedData": {},
    "period": {
      "start": new Date("1990-06-15T00:00"),
      "end": new Date("2229-12-31T23:59")
    },
    "type": {
      "code":"10",
      "display":"一般消息"
    },
    "execTime": new Date("2023-09-27T14:00"),
    "execStatus": {
      "code" : "60",
      "display" : "已讀/已完成"
    }
    ,
    "updatedBy": {
      "code" : "alphaTeam",
      "display" : "alphaTeam"
    },
    "updatedAt": new Date("1990-06-15T00:00")
  },
  {
    "_id": "64f1968af80caa4450a1d21b",
    "appId": "002-app_id",
    "userCode": {
      "code" : "Tommy",
      "display" : "Tommy"
    },
    "subject": "您有2筆公文待簽核",
    "url": "https://www.hpc.tw",
    "sharedData": {},
    "period": {
      "start": new Date("1990-06-15T00:00"),
      "end": new Date("2229-12-31T23:59")
    },
    "type": {
      "code":"60",
      "display":"待辦工作"
    },
    "execTime": new Date("2023-09-27T14:00"),
    "execStatus": {
      "code" : "60",
      "display" : "已讀/已完成"
    }
    ,
    "updatedBy": {
      "code" : "alphaTeam",
      "display" : "alphaTeam"
    },
    "updatedAt": new Date("1990-06-15T00:00")
  }
];
