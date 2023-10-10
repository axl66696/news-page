/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, inject, signal } from '@angular/core';
import { Subject, mergeMap } from 'rxjs';
import { JSONCodec, JetstreamWsService, SubscribeType } from '@his-base/jetstream-ws';
import * as i0 from "@angular/core";
export class NewsService {
    constructor() {
        /** 使用Signal變數儲存各類型最新消息的資訊
         *  @memberof NewsService
         */
        this.news = signal({});
        this.allNormalNews = signal({});
        this.allTodoList = signal({});
        this.normalNews = signal({});
        this.toDoList = signal({});
        this.checkedNormalNews = signal({});
        this.checkedToDoList = signal({});
        /** nats連線位址
         *  @memberof NewsService
         */
        this.#url = 'ws://localhost:8080';
        /** 使用Subject變數自nats拿取最新消息
         *  @memberof NewsService
         */
        this.#userNews = new Subject();
        this.#jetStreamWsService = inject(JetstreamWsService);
    }
    /** nats連線位址
     *  @memberof NewsService
     */
    #url;
    /** 使用Subject變數自nats拿取最新消息
     *  @memberof NewsService
     */
    #userNews;
    /** 使用ConsumerMessages訂閱最新消息
     *  @memberof NewsService
     */
    #consumerMessages$;
    #jetStreamWsService;
    /** 建立nats連線
     *  @memberof NewsService
     */
    async connect() {
        await this.#jetStreamWsService.connect(this.#url);
    }
    /** 中斷nats連線
     *  @memberof NewsService
     */
    async disconnect() {
        await this.#jetStreamWsService.drain();
    }
    /** publish userCode到nats
     *  @memberof NewsService
     */
    publishUserCode(userCode) {
        this.#jetStreamWsService.publish("news.wantNews", userCode);
    }
    /** 發送`最新消息狀態改為已讀/已完成`到nats
     *  @memberof NewsService
     */
    changeStatus(userCode, newsId) {
        const date = new Date();
        this.#jetStreamWsService.publish("news.updateStatus", { userCode, newsId, date });
    }
    /** 依‘一般消息’、’待辦工作’分類最新消息
     *  @memberof NewsService
     */
    filterType(code) {
        const newsList = this.news();
        if (code) {
            return this.news().filter(newsData => newsData.type['code'] == code);
        }
        else {
            return newsList;
        }
    }
    /** 依`已讀/已完成`、`未讀/未完成`分類最新消息
     *  @memberof NewsService
     */
    filterStatus(newsList, code) {
        if (code) {
            return newsList.filter(newsData => newsData.execStatus['code'] == code);
        }
        else {
            return newsList;
        }
    }
    /** 僅顯示未超過24小時的已讀一般消息/待辦工作
     *  @memberof NewsService
     */
    filterOverdue(newsList) {
        const date = new Date;
        const aDay = 24 * 60 * 60 * 1000;
        return newsList.filter(newsData => date.valueOf() - newsData.execTime.valueOf() < aDay);
    }
    /** 最新消息更新時設定所有Signal
     *  @memberof NewsService
     */
    setNews(news) {
        this.news.set(news);
        this.allNormalNews.set(this.filterType("10"));
        this.allTodoList.set(this.filterType("60"));
        this.normalNews.set(this.filterStatus(this.allNormalNews(), "10"));
        this.toDoList.set(this.filterStatus(this.allTodoList(), "10"));
        this.checkedNormalNews.set(this.filterOverdue(this.filterStatus(this.allNormalNews(), "60")));
        this.checkedToDoList.set(this.filterOverdue(this.filterStatus(this.allTodoList(), "60")));
    }
    /** 規格化從nats取得的最新消息
     *  @memberof NewsService
     */
    formatNews(newsList) {
        const formatNewsList = [];
        newsList.forEach((news) => {
            const formatNewsData = {
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
            };
            formatNewsList.push(formatNewsData);
        });
        return formatNewsList;
    }
    /** 訂閱最新消息
     * @memberof NewsService
     */
    async subNews() {
        this.#userNews = new Subject();
        const jsonCodec = JSONCodec();
        this.#consumerMessages$ = this.#jetStreamWsService.subscribe(SubscribeType.Push, 'news.getNews.dashboard');
        this.#consumerMessages$
            .pipe(mergeMap(async (messages) => {
            for await (const message of messages) {
                this.#userNews.next(jsonCodec.decode(message.data));
                message.ack();
            }
        }))
            .subscribe(() => { });
        this.#userNews.subscribe((newsList) => {
            this.setNews(this.formatNews(newsList));
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.6", ngImport: i0, type: NewsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.6", ngImport: i0, type: NewsService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.6", ngImport: i0, type: NewsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmV3cy1pbmZvL3NyYy9saWIvbmV3cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHlEQUF5RDtBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFjLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckQsT0FBTyxFQUFvQixTQUFTLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0FBT3hHLE1BQU0sT0FBTyxXQUFXO0lBSHhCO1FBS0U7O1dBRUc7UUFDSCxTQUFJLEdBQUcsTUFBTSxDQUFTLEVBQVksQ0FBQyxDQUFDO1FBQ3BDLGtCQUFhLEdBQUcsTUFBTSxDQUFTLEVBQVksQ0FBQyxDQUFDO1FBQzdDLGdCQUFXLEdBQUcsTUFBTSxDQUFTLEVBQVksQ0FBQyxDQUFDO1FBQzNDLGVBQVUsR0FBRyxNQUFNLENBQVMsRUFBWSxDQUFDLENBQUM7UUFDMUMsYUFBUSxHQUFHLE1BQU0sQ0FBUyxFQUFZLENBQUMsQ0FBQztRQUN4QyxzQkFBaUIsR0FBRyxNQUFNLENBQVMsRUFBWSxDQUFDLENBQUM7UUFDakQsb0JBQWUsR0FBRyxNQUFNLENBQVMsRUFBWSxDQUFDLENBQUM7UUFFL0M7O1dBRUc7UUFDSCxTQUFJLEdBQUcscUJBQXFCLENBQUM7UUFFN0I7O1dBRUc7UUFDSCxjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQU8xQix3QkFBbUIsR0FBRyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztLQXFJbEQ7SUFwSkM7O09BRUc7SUFDSCxJQUFJLENBQXlCO0lBRTdCOztPQUVHO0lBQ0gsU0FBUyxDQUFpQjtJQUUxQjs7T0FFRztJQUNILGtCQUFrQixDQUFnQztJQUVsRCxtQkFBbUIsQ0FBOEI7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RUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsT0FBTztRQUNYLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUMvQixNQUFNLFNBQVMsR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FDMUQsYUFBYSxDQUFDLElBQUksRUFDbEIsd0JBQXdCLENBQ3pCLENBQUM7UUFFRixJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLElBQUksQ0FDSCxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQzFCLElBQUksS0FBSyxFQUFFLE1BQU0sT0FBTyxJQUFJLFFBQVEsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDcEQsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ2Y7UUFDSCxDQUFDLENBQUMsQ0FDSDthQUNBLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQztRQUV2QixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVksRUFBRSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs4R0EvSlUsV0FBVztrSEFBWCxXQUFXLGNBRlYsTUFBTTs7MkZBRVAsV0FBVztrQkFIdkIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb24gKi9cbmltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCwgc2lnbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBtZXJnZU1hcCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29uc3VtZXJNZXNzYWdlcywgSlNPTkNvZGVjLCBKZXRzdHJlYW1Xc1NlcnZpY2UsIFN1YnNjcmliZVR5cGUgfSBmcm9tICdAaGlzLWJhc2UvamV0c3RyZWFtLXdzJztcbmltcG9ydCB7IE5ld3MgfSBmcm9tICdAaGlzLXZpZXdtb2RlbC9hcHBwb3J0YWwvZGlzdCc7XG5pbXBvcnQgeyBDb2RpbmcgfSBmcm9tICdAaGlzLWJhc2UvZGF0YXR5cGVzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmV3c1NlcnZpY2Uge1xuXG4gIC8qKiDkvb/nlKhTaWduYWzorormlbjlhLLlrZjlkITpoZ7lnovmnIDmlrDmtojmga/nmoTos4foqIpcbiAgICogIEBtZW1iZXJvZiBOZXdzU2VydmljZVxuICAgKi9cbiAgbmV3cyA9IHNpZ25hbDxOZXdzW10+KHt9IGFzIE5ld3NbXSk7XG4gIGFsbE5vcm1hbE5ld3MgPSBzaWduYWw8TmV3c1tdPih7fSBhcyBOZXdzW10pO1xuICBhbGxUb2RvTGlzdCA9IHNpZ25hbDxOZXdzW10+KHt9IGFzIE5ld3NbXSk7XG4gIG5vcm1hbE5ld3MgPSBzaWduYWw8TmV3c1tdPih7fSBhcyBOZXdzW10pO1xuICB0b0RvTGlzdCA9IHNpZ25hbDxOZXdzW10+KHt9IGFzIE5ld3NbXSk7XG4gIGNoZWNrZWROb3JtYWxOZXdzID0gc2lnbmFsPE5ld3NbXT4oe30gYXMgTmV3c1tdKTtcbiAgY2hlY2tlZFRvRG9MaXN0ID0gc2lnbmFsPE5ld3NbXT4oe30gYXMgTmV3c1tdKTtcblxuICAvKiogbmF0c+mAo+e3muS9jeWdgFxuICAgKiAgQG1lbWJlcm9mIE5ld3NTZXJ2aWNlXG4gICAqL1xuICAjdXJsID0gJ3dzOi8vbG9jYWxob3N0OjgwODAnO1xuXG4gIC8qKiDkvb/nlKhTdWJqZWN06K6K5pW46IeqbmF0c+aLv+WPluacgOaWsOa2iOaBr1xuICAgKiAgQG1lbWJlcm9mIE5ld3NTZXJ2aWNlXG4gICAqL1xuICAjdXNlck5ld3MgPSBuZXcgU3ViamVjdCgpO1xuXG4gIC8qKiDkvb/nlKhDb25zdW1lck1lc3NhZ2Vz6KiC6Zax5pyA5paw5raI5oGvXG4gICAqICBAbWVtYmVyb2YgTmV3c1NlcnZpY2VcbiAgICovXG4gICNjb25zdW1lck1lc3NhZ2VzJCE6IE9ic2VydmFibGU8Q29uc3VtZXJNZXNzYWdlcz47XG5cbiAgI2pldFN0cmVhbVdzU2VydmljZSA9IGluamVjdChKZXRzdHJlYW1Xc1NlcnZpY2UpO1xuXG4gIC8qKiDlu7rnq4tuYXRz6YCj57eaXG4gICAqICBAbWVtYmVyb2YgTmV3c1NlcnZpY2VcbiAgICovXG4gIGFzeW5jIGNvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy4jamV0U3RyZWFtV3NTZXJ2aWNlLmNvbm5lY3QodGhpcy4jdXJsKTtcbiAgfVxuXG4gIC8qKiDkuK3mlrduYXRz6YCj57eaXG4gICAqICBAbWVtYmVyb2YgTmV3c1NlcnZpY2VcbiAgICovXG4gIGFzeW5jIGRpc2Nvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy4jamV0U3RyZWFtV3NTZXJ2aWNlLmRyYWluKCk7XG4gIH1cblxuICAvKiogcHVibGlzaCB1c2VyQ29kZeWIsG5hdHNcbiAgICogIEBtZW1iZXJvZiBOZXdzU2VydmljZVxuICAgKi9cbiAgcHVibGlzaFVzZXJDb2RlKHVzZXJDb2RlOkNvZGluZyk6IHZvaWQge1xuICAgIHRoaXMuI2pldFN0cmVhbVdzU2VydmljZS5wdWJsaXNoKFwibmV3cy53YW50TmV3c1wiLCB1c2VyQ29kZSk7XG4gIH1cblxuICAvKiog55m86YCBYOacgOaWsOa2iOaBr+eLgOaFi+aUueeCuuW3suiugC/lt7LlrozmiJBg5YiwbmF0c1xuICAgKiAgQG1lbWJlcm9mIE5ld3NTZXJ2aWNlXG4gICAqL1xuICBjaGFuZ2VTdGF0dXModXNlckNvZGU6Q29kaW5nLCBuZXdzSWQ6c3RyaW5nKXtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICB0aGlzLiNqZXRTdHJlYW1Xc1NlcnZpY2UucHVibGlzaChcIm5ld3MudXBkYXRlU3RhdHVzXCIsIHt1c2VyQ29kZSwgbmV3c0lkLCBkYXRlfSk7XG4gIH1cblxuICAvKiog5L6d4oCY5LiA6Iis5raI5oGv4oCZ44CB4oCZ5b6F6L6m5bel5L2c4oCZ5YiG6aGe5pyA5paw5raI5oGvXG4gICAqICBAbWVtYmVyb2YgTmV3c1NlcnZpY2VcbiAgICovXG4gIGZpbHRlclR5cGUoY29kZTpDb2RpbmdbJ2NvZGUnXSk6IE5ld3NbXXtcbiAgICBjb25zdCBuZXdzTGlzdD10aGlzLm5ld3MoKTtcbiAgICBpZihjb2RlKXtcbiAgICAgIHJldHVybiB0aGlzLm5ld3MoKS5maWx0ZXIobmV3c0RhdGE9Pm5ld3NEYXRhLnR5cGVbJ2NvZGUnXT09Y29kZSk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICByZXR1cm4gbmV3c0xpc3Q7XG4gICAgfVxuICB9XG5cbiAgLyoqIOS+nWDlt7LoroAv5bey5a6M5oiQYOOAgWDmnKroroAv5pyq5a6M5oiQYOWIhumhnuacgOaWsOa2iOaBr1xuICAgKiAgQG1lbWJlcm9mIE5ld3NTZXJ2aWNlXG4gICAqL1xuICBmaWx0ZXJTdGF0dXMobmV3c0xpc3Q6TmV3c1tdLCBjb2RlOkNvZGluZ1snY29kZSddKTogTmV3c1tde1xuICAgIGlmKGNvZGUpe1xuICAgICAgcmV0dXJuIG5ld3NMaXN0LmZpbHRlcihuZXdzRGF0YT0+bmV3c0RhdGEuZXhlY1N0YXR1c1snY29kZSddPT1jb2RlKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIHJldHVybiBuZXdzTGlzdDtcbiAgICB9XG4gIH1cblxuICAvKiog5YOF6aGv56S65pyq6LaF6YGOMjTlsI/mmYLnmoTlt7LoroDkuIDoiKzmtojmga8v5b6F6L6m5bel5L2cXG4gICAqICBAbWVtYmVyb2YgTmV3c1NlcnZpY2VcbiAgICovXG4gIGZpbHRlck92ZXJkdWUobmV3c0xpc3Q6TmV3c1tdKTogTmV3c1tde1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZTtcbiAgICBjb25zdCBhRGF5ID0gMjQqNjAqNjAqMTAwMDtcbiAgICByZXR1cm4gbmV3c0xpc3QuZmlsdGVyKG5ld3NEYXRhPT5kYXRlLnZhbHVlT2YoKSAtIG5ld3NEYXRhLmV4ZWNUaW1lLnZhbHVlT2YoKSA8IGFEYXkpO1xuICB9XG5cbiAgLyoqIOacgOaWsOa2iOaBr+abtOaWsOaZguioreWumuaJgOaciVNpZ25hbFxuICAgKiAgQG1lbWJlcm9mIE5ld3NTZXJ2aWNlXG4gICAqL1xuICBzZXROZXdzKG5ld3M6TmV3c1tdKTogdm9pZHtcbiAgICB0aGlzLm5ld3Muc2V0KG5ld3MgYXMgTmV3c1tdKTtcbiAgICB0aGlzLmFsbE5vcm1hbE5ld3Muc2V0KHRoaXMuZmlsdGVyVHlwZShcIjEwXCIpKTtcbiAgICB0aGlzLmFsbFRvZG9MaXN0LnNldCh0aGlzLmZpbHRlclR5cGUoXCI2MFwiKSk7XG4gICAgdGhpcy5ub3JtYWxOZXdzLnNldCh0aGlzLmZpbHRlclN0YXR1cyh0aGlzLmFsbE5vcm1hbE5ld3MoKSwgXCIxMFwiKSk7XG4gICAgdGhpcy50b0RvTGlzdC5zZXQodGhpcy5maWx0ZXJTdGF0dXModGhpcy5hbGxUb2RvTGlzdCgpLFwiMTBcIikpO1xuICAgIHRoaXMuY2hlY2tlZE5vcm1hbE5ld3Muc2V0KHRoaXMuZmlsdGVyT3ZlcmR1ZSh0aGlzLmZpbHRlclN0YXR1cyh0aGlzLmFsbE5vcm1hbE5ld3MoKSwgXCI2MFwiKSkpO1xuICAgIHRoaXMuY2hlY2tlZFRvRG9MaXN0LnNldCh0aGlzLmZpbHRlck92ZXJkdWUodGhpcy5maWx0ZXJTdGF0dXModGhpcy5hbGxUb2RvTGlzdCgpLCBcIjYwXCIpKSk7XG4gIH1cblxuICAvKiog6KaP5qC85YyW5b6ebmF0c+WPluW+l+eahOacgOaWsOa2iOaBr1xuICAgKiAgQG1lbWJlcm9mIE5ld3NTZXJ2aWNlXG4gICAqL1xuICBmb3JtYXROZXdzKG5ld3NMaXN0OiBOZXdzW10pOiBOZXdzW117XG4gICAgY29uc3QgZm9ybWF0TmV3c0xpc3Q6IE5ld3NbXSA9IFtdO1xuICAgICAgbmV3c0xpc3QuZm9yRWFjaCgobmV3czogTmV3cykgPT4ge1xuICAgICAgICBjb25zdCBmb3JtYXROZXdzRGF0YTpOZXdzID0ge1xuICAgICAgICAgIFwiX2lkXCI6IG5ld3MuX2lkLFxuICAgICAgICAgIFwiYXBwSWRcIjogbmV3cy5hcHBJZCxcbiAgICAgICAgICBcInVzZXJDb2RlXCI6IG5ld3MudXNlckNvZGUsXG4gICAgICAgICAgXCJzdWJqZWN0XCI6IG5ld3Muc3ViamVjdCxcbiAgICAgICAgICBcInVybFwiOiBuZXdzLnVybCxcbiAgICAgICAgICBcInNoYXJlZERhdGFcIjogbmV3cy5zaGFyZWREYXRhLFxuICAgICAgICAgIFwicGVyaW9kXCI6IHtcbiAgICAgICAgICAgIFwic3RhcnRcIjogbmV3IERhdGUobmV3cy5wZXJpb2Quc3RhcnQpLFxuICAgICAgICAgICAgXCJlbmRcIjogbmV3IERhdGUobmV3cy5wZXJpb2QuZW5kKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ0eXBlXCI6IG5ld3MudHlwZSxcbiAgICAgICAgICBcImV4ZWNUaW1lXCI6IG5ldyBEYXRlKG5ld3MuZXhlY1RpbWUpLFxuICAgICAgICAgIFwiZXhlY1N0YXR1c1wiOiBuZXdzLmV4ZWNTdGF0dXMsXG4gICAgICAgICAgXCJ1cGRhdGVkQnlcIjogbmV3cy51cGRhdGVkQnksXG4gICAgICAgICAgXCJ1cGRhdGVkQXRcIjogbmV3IERhdGUobmV3cy51cGRhdGVkQXQpXG4gICAgICAgIH07XG4gICAgICAgIGZvcm1hdE5ld3NMaXN0LnB1c2goZm9ybWF0TmV3c0RhdGEpO1xuICAgICAgfSk7XG4gICAgcmV0dXJuIGZvcm1hdE5ld3NMaXN0O1xuICB9XG5cbiAgLyoqIOiogumWseacgOaWsOa2iOaBr1xuICAgKiBAbWVtYmVyb2YgTmV3c1NlcnZpY2VcbiAgICovXG4gIGFzeW5jIHN1Yk5ld3MoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy4jdXNlck5ld3MgPSBuZXcgU3ViamVjdCgpO1xuICAgIGNvbnN0IGpzb25Db2RlYyA9IEpTT05Db2RlYygpO1xuICAgIHRoaXMuI2NvbnN1bWVyTWVzc2FnZXMkID0gdGhpcy4jamV0U3RyZWFtV3NTZXJ2aWNlLnN1YnNjcmliZShcbiAgICAgIFN1YnNjcmliZVR5cGUuUHVzaCxcbiAgICAgICduZXdzLmdldE5ld3MuZGFzaGJvYXJkJ1xuICAgICk7XG5cbiAgICB0aGlzLiNjb25zdW1lck1lc3NhZ2VzJFxuICAgICAgLnBpcGUoXG4gICAgICAgIG1lcmdlTWFwKGFzeW5jIChtZXNzYWdlcykgPT4ge1xuICAgICAgICAgIGZvciBhd2FpdCAoY29uc3QgbWVzc2FnZSBvZiBtZXNzYWdlcykge1xuICAgICAgICAgICAgdGhpcy4jdXNlck5ld3MubmV4dChqc29uQ29kZWMuZGVjb2RlKG1lc3NhZ2UuZGF0YSkpO1xuICAgICAgICAgICAgbWVzc2FnZS5hY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHt9KTtcblxuICAgIHRoaXMuI3VzZXJOZXdzLnN1YnNjcmliZSgobmV3c0xpc3Q6YW55KSA9PiB7XG4gICAgICB0aGlzLnNldE5ld3ModGhpcy5mb3JtYXROZXdzKG5ld3NMaXN0KSk7XG4gICAgfSk7XG4gIH1cblxufVxuXG4iXX0=