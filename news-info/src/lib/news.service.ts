/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, inject, signal } from '@angular/core';
import { UserProfile } from '../public-api';
import { Observable, Subject, mergeMap } from 'rxjs';
import { ConsumerMessages, JSONCodec, JetstreamWsService, SubscribeType } from '@his-base/jetstream-ws';
import { News } from '@his-viewmodel/appportal/dist';
import { Coding } from '@his-base/datatypes';

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
  allNormalNews = signal<News[]>({} as News[])
  allTodoList = signal<News[]>({} as News[])
  normalNews = signal<News[]>({} as News[])
  toDoList = signal<News[]>({} as News[])
  checkedNormalNews = signal<News[]>({} as News[])
  checkedToDoList = signal<News[]>({} as News[])

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
  getNewsFromNats(): void {
    this.#jetStreamWsService.publish("news.wantNews", {code:"Neo",display:"Neo"});
  }

  setNews(): void{
    this.allNormalNews.set(this.filterType("10"))
    this.allTodoList.set(this.filterType("60"))

    this.normalNews.set(this.filterStatus(this.allNormalNews(),"10"))
    this.toDoList.set(this.filterStatus(this.allTodoList(), "10"))
    this.checkedNormalNews.set(this.filterStatus(this.allNormalNews(),"60"))
    this.checkedToDoList.set(this.filterStatus(this.allTodoList(),"60"))

  }

  /** 依‘一般消息’、’待辦工作’分類最新消息
   * @param {Coding} type
   * @return {News[]}
   * @memberof NewsService
   */
  filterType(code?:Coding['code']): News[]{
    const newsList=this.news()
    if(code){
      return this.news().filter(m=>m.type['code']==code)
    }
    else{
      return newsList
    }
  }

  filterStatus(news:News[], code?:Coding['code']): News[]{
    if(code){
      return news.filter(m=>m.execStatus['code']==code)
    }
    else{
      return news
    }
  }


  filterOverdue(news:News[]): News[]{
    const date = new Date
    const aDay = 24*60*60*1000
    return news.filter(newsData=>date.valueOf() - newsData.execTime.valueOf() < aDay)
  }

  showDate(){
    const nowDate = new Date()
    console.log("現在時間", nowDate)
    console.log("最新消息0",this.news())
    console.log("最新消息0time", this.news()[0].execTime)
    console.log("最新消息4timetype", typeof this.news()[4].execTime)
    console.log(nowDate.valueOf())
    console.log(this.news()[0].execTime.valueOf())
    console.log("相減", (nowDate.valueOf() - this.news()[0].execTime.valueOf())/(1000*60*60*24))
  }


  /** 訂閱最新消息
   * @memberof NewsService
   */
  async subNews() {
    this.#userNews = new Subject();
    const jsonCodec = JSONCodec();
    // 'news.getNews.dashboard'
    this.#consumerMessages$ = this.#jetStreamWsService.subscribe(
      SubscribeType.Push,
      'news.getNews.dashboard'
    );
    console.log("ready to subscribe")

    this.#consumerMessages$
      .pipe(
        mergeMap(async (messages) => {
          for await (const message of messages) {
            console.log('正在聽的subject： ', message.subject);
            this.#userNews.next(jsonCodec.decode(message.data));
            message.ack();
          }
        })
      )
      .subscribe(() => {});


      this.#userNews.subscribe((newsList:any) => {
        const tmpNews:News[] = []
        newsList.forEach((news: News) => {
          const tmp:News = {
            "_id": news._id,
            "appId": news.appId,
            "userCode": news.userCode,
            "subject": news.subject,
            "url": news.url,
            "sharedData": news.sharedData,
            "period": {
              "start": new Date(news.period.start),
              "end": new Date(news.period.end)
            },
            "type": news.type,
            "execTime": new Date(news.execTime),
            "execStatus": news.execStatus,
            "updatedBy": news.updatedBy,
            "updatedAt": new Date(news.updatedAt)
          }
          tmpNews.push(tmp)
        });


        console.log("news", tmpNews)
        this.news.set(tmpNews as News[]);
        // this.normalNews.set(this.getFilterNews("10"))
        // this.toDoList.set(this.getFilterNews("60"))
        console.log("execTime", this.news()[0].execTime)
        console.log("execTime type", typeof this.news()[0].execTime)


        this.allNormalNews.set(this.filterType("10"))
        this.allTodoList.set(this.filterType("60"))

        this.normalNews.set(this.filterStatus(this.allNormalNews(), "10"))
        this.toDoList.set(this.filterStatus(this.allTodoList(),"10"))
        this.checkedNormalNews.set(this.filterOverdue(this.filterStatus(this.allNormalNews(), "60")))
        this.checkedToDoList.set(this.filterOverdue(this.filterStatus(this.allTodoList(), "60")))
        console.log("this.news()", this.news())
        console.log("this.normalNews()", this.normalNews())
        console.log("this.toDoListNews()", this.toDoList())
        console.log("this.checkedNormalNews()", this.checkedNormalNews())
        console.log("this.checkedToDoList()",this.checkedToDoList())
        this.showDate()

    });

  }

}
