/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, inject, signal } from '@angular/core';
import { Subject, mergeMap } from 'rxjs';
import { JSONCodec, JetstreamWsService, SubscribeType } from '@his-base/jetstream-ws';
import * as i0 from "@angular/core";
export class NewsService {
    constructor() {
        /** nats連線位址
         *  @memberof NewsService
         */
        this.#url = 'ws://localhost:8080';
        /** 使用Signal變數儲存各最新消息的資訊
         *  @memberof NewsService
         */
        this.news = signal({});
        this.allNormalNews = signal({});
        this.allTodoList = signal({});
        this.normalNews = signal({});
        this.toDoList = signal({});
        this.checkedNormalNews = signal({});
        this.checkedToDoList = signal({});
        /** 使用Subject變數自nats拿取包含最新消息的使用者資訊
         *  @memberof NewsService
         */
        this.#userNews = new Subject();
        this.#jetStreamWsService = inject(JetstreamWsService);
    }
    /** nats連線位址
     *  @memberof NewsService
     */
    #url;
    /** 使用Subject變數自nats拿取包含最新消息的使用者資訊
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
    /** 依userCode初始化最新消息
     *  @memberof NewsService
     */
    getInitNews(userCode) {
        this.#jetStreamWsService.publish("news.wantNews", userCode);
    }
    /** 發送`最新消息狀態改為已讀/已完成`到nats
     *  @memberof NewsService
     */
    changeStatus(userCode, newsId) {
        const date = new Date();
        this.#jetStreamWsService.publish("news.updateStatus", { userCode, newsId, date });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmV3cy1pbmZvL3NyYy9saWIvbmV3cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHlEQUF5RDtBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFjLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckQsT0FBTyxFQUFvQixTQUFTLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0FBT3hHLE1BQU0sT0FBTyxXQUFXO0lBSHhCO1FBS0U7O1dBRUc7UUFDSCxTQUFJLEdBQUcscUJBQXFCLENBQUM7UUFFN0I7O1dBRUc7UUFDSCxTQUFJLEdBQUcsTUFBTSxDQUFTLEVBQVksQ0FBQyxDQUFBO1FBQ25DLGtCQUFhLEdBQUcsTUFBTSxDQUFTLEVBQVksQ0FBQyxDQUFBO1FBQzVDLGdCQUFXLEdBQUcsTUFBTSxDQUFTLEVBQVksQ0FBQyxDQUFBO1FBQzFDLGVBQVUsR0FBRyxNQUFNLENBQVMsRUFBWSxDQUFDLENBQUE7UUFDekMsYUFBUSxHQUFHLE1BQU0sQ0FBUyxFQUFZLENBQUMsQ0FBQTtRQUN2QyxzQkFBaUIsR0FBRyxNQUFNLENBQVMsRUFBWSxDQUFDLENBQUE7UUFDaEQsb0JBQWUsR0FBRyxNQUFNLENBQVMsRUFBWSxDQUFDLENBQUE7UUFFOUM7O1dBRUc7UUFDSCxjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQU8xQix3QkFBbUIsR0FBRyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztLQXNJbEQ7SUFoS0M7O09BRUc7SUFDSCxJQUFJLENBQXlCO0lBYTdCOztPQUVHO0lBQ0gsU0FBUyxDQUFpQjtJQUUxQjs7T0FFRztJQUNILGtCQUFrQixDQUFnQztJQUVsRCxtQkFBbUIsQ0FBOEI7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RUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsT0FBTztRQUNYLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUMvQixNQUFNLFNBQVMsR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FDMUQsYUFBYSxDQUFDLElBQUksRUFDbEIsd0JBQXdCLENBQ3pCLENBQUM7UUFFRixJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLElBQUksQ0FDSCxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQzFCLElBQUksS0FBSyxFQUFFLE1BQU0sT0FBTyxJQUFJLFFBQVEsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDcEQsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ2Y7UUFDSCxDQUFDLENBQUMsQ0FDSDthQUNBLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQztRQUV2QixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVksRUFBRSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs4R0FoS1UsV0FBVztrSEFBWCxXQUFXLGNBRlYsTUFBTTs7MkZBRVAsV0FBVztrQkFIdkIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb24gKi9cbmltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCwgc2lnbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBtZXJnZU1hcCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29uc3VtZXJNZXNzYWdlcywgSlNPTkNvZGVjLCBKZXRzdHJlYW1Xc1NlcnZpY2UsIFN1YnNjcmliZVR5cGUgfSBmcm9tICdAaGlzLWJhc2UvamV0c3RyZWFtLXdzJztcbmltcG9ydCB7IE5ld3MgfSBmcm9tICdAaGlzLXZpZXdtb2RlbC9hcHBwb3J0YWwvZGlzdCc7XG5pbXBvcnQgeyBDb2RpbmcgfSBmcm9tICdAaGlzLWJhc2UvZGF0YXR5cGVzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmV3c1NlcnZpY2Uge1xuXG4gIC8qKiBuYXRz6YCj57ea5L2N5Z2AXG4gICAqICBAbWVtYmVyb2YgTmV3c1NlcnZpY2VcbiAgICovXG4gICN1cmwgPSAnd3M6Ly9sb2NhbGhvc3Q6ODA4MCc7XG5cbiAgLyoqIOS9v+eUqFNpZ25hbOiuiuaVuOWEsuWtmOWQhOacgOaWsOa2iOaBr+eahOizh+ioilxuICAgKiAgQG1lbWJlcm9mIE5ld3NTZXJ2aWNlXG4gICAqL1xuICBuZXdzID0gc2lnbmFsPE5ld3NbXT4oe30gYXMgTmV3c1tdKVxuICBhbGxOb3JtYWxOZXdzID0gc2lnbmFsPE5ld3NbXT4oe30gYXMgTmV3c1tdKVxuICBhbGxUb2RvTGlzdCA9IHNpZ25hbDxOZXdzW10+KHt9IGFzIE5ld3NbXSlcbiAgbm9ybWFsTmV3cyA9IHNpZ25hbDxOZXdzW10+KHt9IGFzIE5ld3NbXSlcbiAgdG9Eb0xpc3QgPSBzaWduYWw8TmV3c1tdPih7fSBhcyBOZXdzW10pXG4gIGNoZWNrZWROb3JtYWxOZXdzID0gc2lnbmFsPE5ld3NbXT4oe30gYXMgTmV3c1tdKVxuICBjaGVja2VkVG9Eb0xpc3QgPSBzaWduYWw8TmV3c1tdPih7fSBhcyBOZXdzW10pXG5cbiAgLyoqIOS9v+eUqFN1YmplY3Torormlbjoh6puYXRz5ou/5Y+W5YyF5ZCr5pyA5paw5raI5oGv55qE5L2/55So6ICF6LOH6KiKXG4gICAqICBAbWVtYmVyb2YgTmV3c1NlcnZpY2VcbiAgICovXG4gICN1c2VyTmV3cyA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgLyoqIOS9v+eUqENvbnN1bWVyTWVzc2FnZXPoqILplrHmnIDmlrDmtojmga9cbiAgICogIEBtZW1iZXJvZiBOZXdzU2VydmljZVxuICAgKi9cbiAgI2NvbnN1bWVyTWVzc2FnZXMkITogT2JzZXJ2YWJsZTxDb25zdW1lck1lc3NhZ2VzPjtcblxuICAjamV0U3RyZWFtV3NTZXJ2aWNlID0gaW5qZWN0KEpldHN0cmVhbVdzU2VydmljZSk7XG5cbiAgLyoqIOW7uueri25hdHPpgKPnt5pcbiAgICogIEBtZW1iZXJvZiBOZXdzU2VydmljZVxuICAgKi9cbiAgYXN5bmMgY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLiNqZXRTdHJlYW1Xc1NlcnZpY2UuY29ubmVjdCh0aGlzLiN1cmwpO1xuICB9XG5cbiAgLyoqIOS4reaWt25hdHPpgKPnt5pcbiAgICogIEBtZW1iZXJvZiBOZXdzU2VydmljZVxuICAgKi9cbiAgYXN5bmMgZGlzY29ubmVjdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLiNqZXRTdHJlYW1Xc1NlcnZpY2UuZHJhaW4oKTtcbiAgfVxuXG4gIC8qKiDkvp11c2VyQ29kZeWIneWni+WMluacgOaWsOa2iOaBr1xuICAgKiAgQG1lbWJlcm9mIE5ld3NTZXJ2aWNlXG4gICAqL1xuICBnZXRJbml0TmV3cyh1c2VyQ29kZTpDb2RpbmcpOiB2b2lkIHtcbiAgICB0aGlzLiNqZXRTdHJlYW1Xc1NlcnZpY2UucHVibGlzaChcIm5ld3Mud2FudE5ld3NcIiwgdXNlckNvZGUpO1xuICB9XG5cbiAgLyoqIOeZvOmAgWDmnIDmlrDmtojmga/ni4DmhYvmlLnngrrlt7LoroAv5bey5a6M5oiQYOWIsG5hdHNcbiAgICogIEBtZW1iZXJvZiBOZXdzU2VydmljZVxuICAgKi9cbiAgY2hhbmdlU3RhdHVzKHVzZXJDb2RlOkNvZGluZywgbmV3c0lkOnN0cmluZyl7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICB0aGlzLiNqZXRTdHJlYW1Xc1NlcnZpY2UucHVibGlzaChcIm5ld3MudXBkYXRlU3RhdHVzXCIsIHt1c2VyQ29kZSwgbmV3c0lkLCBkYXRlfSlcbiAgfVxuXG4gIC8qKiDmnIDmlrDmtojmga/mm7TmlrDmmYLoqK3lrprmiYDmnIlTaWduYWxcbiAgICogIEBtZW1iZXJvZiBOZXdzU2VydmljZVxuICAgKi9cbiAgc2V0TmV3cyhuZXdzOk5ld3NbXSk6IHZvaWR7XG4gICAgdGhpcy5uZXdzLnNldChuZXdzIGFzIE5ld3NbXSk7XG4gICAgdGhpcy5hbGxOb3JtYWxOZXdzLnNldCh0aGlzLmZpbHRlclR5cGUoXCIxMFwiKSlcbiAgICB0aGlzLmFsbFRvZG9MaXN0LnNldCh0aGlzLmZpbHRlclR5cGUoXCI2MFwiKSlcbiAgICB0aGlzLm5vcm1hbE5ld3Muc2V0KHRoaXMuZmlsdGVyU3RhdHVzKHRoaXMuYWxsTm9ybWFsTmV3cygpLCBcIjEwXCIpKVxuICAgIHRoaXMudG9Eb0xpc3Quc2V0KHRoaXMuZmlsdGVyU3RhdHVzKHRoaXMuYWxsVG9kb0xpc3QoKSxcIjEwXCIpKVxuICAgIHRoaXMuY2hlY2tlZE5vcm1hbE5ld3Muc2V0KHRoaXMuZmlsdGVyT3ZlcmR1ZSh0aGlzLmZpbHRlclN0YXR1cyh0aGlzLmFsbE5vcm1hbE5ld3MoKSwgXCI2MFwiKSkpXG4gICAgdGhpcy5jaGVja2VkVG9Eb0xpc3Quc2V0KHRoaXMuZmlsdGVyT3ZlcmR1ZSh0aGlzLmZpbHRlclN0YXR1cyh0aGlzLmFsbFRvZG9MaXN0KCksIFwiNjBcIikpKVxuXG4gIH1cblxuICAvKiog5L6d4oCY5LiA6Iis5raI5oGv4oCZ44CB4oCZ5b6F6L6m5bel5L2c4oCZ5YiG6aGe5pyA5paw5raI5oGvXG4gICAqICBAbWVtYmVyb2YgTmV3c1NlcnZpY2VcbiAgICovXG4gIGZpbHRlclR5cGUoY29kZT86Q29kaW5nWydjb2RlJ10pOiBOZXdzW117XG4gICAgY29uc3QgbmV3c0xpc3Q9dGhpcy5uZXdzKClcbiAgICBpZihjb2RlKXtcbiAgICAgIHJldHVybiB0aGlzLm5ld3MoKS5maWx0ZXIobmV3c0RhdGE9Pm5ld3NEYXRhLnR5cGVbJ2NvZGUnXT09Y29kZSlcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIHJldHVybiBuZXdzTGlzdFxuICAgIH1cbiAgfVxuXG4gIC8qKiDkvp1g5bey6K6AL+W3suWujOaIkGDjgIFg5pyq6K6AL+acquWujOaIkGDliIbpoZ7mnIDmlrDmtojmga9cbiAgICogIEBtZW1iZXJvZiBOZXdzU2VydmljZVxuICAgKi9cbiAgZmlsdGVyU3RhdHVzKG5ld3NMaXN0Ok5ld3NbXSwgY29kZT86Q29kaW5nWydjb2RlJ10pOiBOZXdzW117XG4gICAgaWYoY29kZSl7XG4gICAgICByZXR1cm4gbmV3c0xpc3QuZmlsdGVyKG5ld3NEYXRhPT5uZXdzRGF0YS5leGVjU3RhdHVzWydjb2RlJ109PWNvZGUpXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICByZXR1cm4gbmV3c0xpc3RcbiAgICB9XG4gIH1cblxuICAvKiog5YOF6aGv56S65pyq6LaF6YGOMjTlsI/mmYLnmoTlt7LoroDkuIDoiKzmtojmga8v5b6F6L6m5bel5L2cXG4gICAqICBAbWVtYmVyb2YgTmV3c1NlcnZpY2VcbiAgICovXG4gIGZpbHRlck92ZXJkdWUobmV3c0xpc3Q6TmV3c1tdKTogTmV3c1tde1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZVxuICAgIGNvbnN0IGFEYXkgPSAyNCo2MCo2MCoxMDAwXG4gICAgcmV0dXJuIG5ld3NMaXN0LmZpbHRlcihuZXdzRGF0YT0+ZGF0ZS52YWx1ZU9mKCkgLSBuZXdzRGF0YS5leGVjVGltZS52YWx1ZU9mKCkgPCBhRGF5KVxuICB9XG5cbiAgLyoqIOimj+agvOWMluW+nm5hdHPlj5blvpfnmoTmnIDmlrDmtojmga9cbiAgICogIEBtZW1iZXJvZiBOZXdzU2VydmljZVxuICAgKi9cbiAgZm9ybWF0TmV3cyhuZXdzTGlzdDogTmV3c1tdKTogTmV3c1tde1xuICAgIGNvbnN0IGZvcm1hdE5ld3NMaXN0OiBOZXdzW10gPSBbXTtcbiAgICAgIG5ld3NMaXN0LmZvckVhY2goKG5ld3M6IE5ld3MpID0+IHtcbiAgICAgICAgY29uc3QgZm9ybWF0TmV3c0RhdGE6TmV3cyA9IHtcbiAgICAgICAgICBcIl9pZFwiOiBuZXdzLl9pZCxcbiAgICAgICAgICBcImFwcElkXCI6IG5ld3MuYXBwSWQsXG4gICAgICAgICAgXCJ1c2VyQ29kZVwiOiBuZXdzLnVzZXJDb2RlLFxuICAgICAgICAgIFwic3ViamVjdFwiOiBuZXdzLnN1YmplY3QsXG4gICAgICAgICAgXCJ1cmxcIjogbmV3cy51cmwsXG4gICAgICAgICAgXCJzaGFyZWREYXRhXCI6IG5ld3Muc2hhcmVkRGF0YSxcbiAgICAgICAgICBcInBlcmlvZFwiOiB7XG4gICAgICAgICAgICBcInN0YXJ0XCI6IG5ldyBEYXRlKG5ld3MucGVyaW9kLnN0YXJ0KSxcbiAgICAgICAgICAgIFwiZW5kXCI6IG5ldyBEYXRlKG5ld3MucGVyaW9kLmVuZClcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidHlwZVwiOiBuZXdzLnR5cGUsXG4gICAgICAgICAgXCJleGVjVGltZVwiOiBuZXcgRGF0ZShuZXdzLmV4ZWNUaW1lKSxcbiAgICAgICAgICBcImV4ZWNTdGF0dXNcIjogbmV3cy5leGVjU3RhdHVzLFxuICAgICAgICAgIFwidXBkYXRlZEJ5XCI6IG5ld3MudXBkYXRlZEJ5LFxuICAgICAgICAgIFwidXBkYXRlZEF0XCI6IG5ldyBEYXRlKG5ld3MudXBkYXRlZEF0KVxuICAgICAgICB9XG4gICAgICAgIGZvcm1hdE5ld3NMaXN0LnB1c2goZm9ybWF0TmV3c0RhdGEpO1xuICAgICAgfSk7XG4gICAgcmV0dXJuIGZvcm1hdE5ld3NMaXN0XG4gIH1cblxuICAvKiog6KiC6Zax5pyA5paw5raI5oGvXG4gICAqIEBtZW1iZXJvZiBOZXdzU2VydmljZVxuICAgKi9cbiAgYXN5bmMgc3ViTmV3cygpIHtcbiAgICB0aGlzLiN1c2VyTmV3cyA9IG5ldyBTdWJqZWN0KCk7XG4gICAgY29uc3QganNvbkNvZGVjID0gSlNPTkNvZGVjKCk7XG4gICAgdGhpcy4jY29uc3VtZXJNZXNzYWdlcyQgPSB0aGlzLiNqZXRTdHJlYW1Xc1NlcnZpY2Uuc3Vic2NyaWJlKFxuICAgICAgU3Vic2NyaWJlVHlwZS5QdXNoLFxuICAgICAgJ25ld3MuZ2V0TmV3cy5kYXNoYm9hcmQnXG4gICAgKTtcblxuICAgIHRoaXMuI2NvbnN1bWVyTWVzc2FnZXMkXG4gICAgICAucGlwZShcbiAgICAgICAgbWVyZ2VNYXAoYXN5bmMgKG1lc3NhZ2VzKSA9PiB7XG4gICAgICAgICAgZm9yIGF3YWl0IChjb25zdCBtZXNzYWdlIG9mIG1lc3NhZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLiN1c2VyTmV3cy5uZXh0KGpzb25Db2RlYy5kZWNvZGUobWVzc2FnZS5kYXRhKSk7XG4gICAgICAgICAgICBtZXNzYWdlLmFjaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge30pO1xuXG4gICAgdGhpcy4jdXNlck5ld3Muc3Vic2NyaWJlKChuZXdzTGlzdDphbnkpID0+IHtcbiAgICAgIHRoaXMuc2V0TmV3cyh0aGlzLmZvcm1hdE5ld3MobmV3c0xpc3QpKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbiJdfQ==