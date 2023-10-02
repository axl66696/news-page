/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, inject, signal } from '@angular/core';
import { Subject, mergeMap } from 'rxjs';
import { JSONCodec, JetstreamWsService, SubscribeType } from '@his-base/jetstream-ws';
import * as i0 from "@angular/core";
export class NewsService {
    constructor() {
        this.#url = 'ws://localhost:8080';
        /** 使用Signal變數儲存UserProfile型別的使用者資訊
         * @memberof NewsService
         */
        this.userProfile = signal({});
        this.news = signal({});
        this.normalNews = signal({});
        this.toDoListNews = signal({});
        /** 使用Subject變數自nats拿取包含最新消息的使用者資訊
         * @memberof NewsService
         */
        this.#userNews = new Subject();
        this.#jetStreamWsService = inject(JetstreamWsService);
    }
    #url;
    /** 使用Subject變數自nats拿取包含最新消息的使用者資訊
     * @memberof NewsService
     */
    #userNews;
    /** 使用ConsumerMessages訂閱最新消息
     * @memberof NewsService
     */
    #consumerMessages$;
    #jetStreamWsService;
    async connect() {
        await this.#jetStreamWsService.connect(this.#url);
        console.log("nats啟動");
    }
    async disconnect() {
        // 連線關閉前，會先將目前訂閱給排空
        await this.#jetStreamWsService.drain();
    }
    /** 更新最新消息
     * @param {News[]} news
     * @memberof NewsService
     */
    getNewsFromNats(news) {
        this.news.set(news);
    }
    setNews() {
        this.news.set(mockNews);
        this.normalNews.set(this.getFilterNews("10"));
        this.toDoListNews.set(this.getFilterNews("60"));
    }
    /** 依‘一般消息’、’待辦工作’分類最新消息
     * @param {Coding} type
     * @return {News[]}
     * @memberof NewsService
     */
    getFilterNews(code) {
        const newsList = this.news();
        if (code) {
            return this.news().filter(m => m.type['code'] == code);
        }
        else {
            return newsList;
        }
    }
    /** 訂閱最新消息
     * @memberof NewsService
     */
    async subNews() {
        this.#userNews = new Subject();
        const jsonCodec = JSONCodec();
        // 'news.getNews.dashboard'
        this.#consumerMessages$ = this.#jetStreamWsService.subscribe(SubscribeType.Push, 'news.getNews.dashboard');
        console.log("ready to subscribe");
        this.#consumerMessages$
            .pipe(mergeMap(async (messages) => {
            for await (const message of messages) {
                console.log('正在聽的subject： ', message.subject);
                this.#userNews.next(jsonCodec.decode(message.data));
                message.ack();
            }
        }))
            .subscribe(() => { });
        this.#userNews.subscribe((news) => {
            console.log("news", news);
            this.news.set(news);
            this.normalNews.set(this.getFilterNews("10"));
            this.toDoListNews.set(this.getFilterNews("60"));
            console.log("this.news()", this.news());
            console.log("this.normalNews()", this.normalNews());
            console.log("this.toDoListNews()", this.toDoListNews());
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
export const mockNews = [
    {
        "_id": "64f1968af80caa4450a1d218",
        "appId": "001-app_id",
        "userCode": {
            "code": "Neo",
            "display": "Neo"
        },
        "subject": "員工健康檢查通知",
        "url": "https://www.hpc.tw",
        "sharedData": {},
        "period": {
            "start": new Date("1990-06-15T00:00"),
            "end": new Date("2229-12-31T23:59")
        },
        "type": {
            "code": "10",
            "display": "一般消息"
        },
        "execTime": new Date("2023-09-27T14:00"),
        "execStatus": {
            "code": "60",
            "display": "已讀/已完成"
        },
        "updatedBy": {
            "code": "alphaTeam",
            "display": "alphaTeam"
        },
        "updatedAt": new Date("1990-06-15T00:00")
    },
    {
        "_id": "64f1968af80caa4450a1d219",
        "appId": "002-app_id",
        "userCode": {
            "code": "Neo",
            "display": "Neo"
        },
        "subject": "您有1筆公文待簽核",
        "url": "https://www.hpc.tw",
        "sharedData": {},
        "period": {
            "start": new Date("1990-06-15T00:00"),
            "end": new Date("2229-12-31T23:59")
        },
        "type": {
            "code": "60",
            "display": "待辦工作"
        },
        "execTime": new Date("2023-09-27T14:00"),
        "execStatus": {
            "code": "60",
            "display": "已讀/已完成"
        },
        "updatedBy": {
            "code": "alphaTeam",
            "display": "alphaTeam"
        },
        "updatedAt": new Date("1990-06-15T00:00")
    },
    {
        "_id": "64f1968af80caa4450a1d21a",
        "appId": "001-app_id",
        "userCode": {
            "code": "Tommy",
            "display": "Tommy"
        },
        "subject": "員工健康檢查通知",
        "url": "https://www.hpc.tw",
        "sharedData": {},
        "period": {
            "start": new Date("1990-06-15T00:00"),
            "end": new Date("2229-12-31T23:59")
        },
        "type": {
            "code": "10",
            "display": "一般消息"
        },
        "execTime": new Date("2023-09-27T14:00"),
        "execStatus": {
            "code": "60",
            "display": "已讀/已完成"
        },
        "updatedBy": {
            "code": "alphaTeam",
            "display": "alphaTeam"
        },
        "updatedAt": new Date("1990-06-15T00:00")
    },
    {
        "_id": "64f1968af80caa4450a1d21b",
        "appId": "002-app_id",
        "userCode": {
            "code": "Tommy",
            "display": "Tommy"
        },
        "subject": "您有2筆公文待簽核",
        "url": "https://www.hpc.tw",
        "sharedData": {},
        "period": {
            "start": new Date("1990-06-15T00:00"),
            "end": new Date("2229-12-31T23:59")
        },
        "type": {
            "code": "60",
            "display": "待辦工作"
        },
        "execTime": new Date("2023-09-27T14:00"),
        "execStatus": {
            "code": "60",
            "display": "已讀/已完成"
        },
        "updatedBy": {
            "code": "alphaTeam",
            "display": "alphaTeam"
        },
        "updatedAt": new Date("1990-06-15T00:00")
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmV3cy1pbmZvL3NyYy9saWIvbmV3cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHlEQUF5RDtBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0QsT0FBTyxFQUFjLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckQsT0FBTyxFQUFvQixTQUFTLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0FBT3hHLE1BQU0sT0FBTyxXQUFXO0lBSHhCO1FBS0UsU0FBSSxHQUFHLHFCQUFxQixDQUFDO1FBRTdCOztXQUVHO1FBQ0gsZ0JBQVcsR0FBRyxNQUFNLENBQWMsRUFBaUIsQ0FBQyxDQUFBO1FBRXBELFNBQUksR0FBRyxNQUFNLENBQVMsRUFBWSxDQUFDLENBQUE7UUFDbkMsZUFBVSxHQUFHLE1BQU0sQ0FBUyxFQUFZLENBQUMsQ0FBQTtRQUN6QyxpQkFBWSxHQUFHLE1BQU0sQ0FBUyxFQUFZLENBQUMsQ0FBQTtRQUUzQzs7V0FFRztRQUNILGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBTTFCLHdCQUFtQixHQUFHLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0tBZ0ZsRDtJQXBHQyxJQUFJLENBQXlCO0lBVzdCOztPQUVHO0lBQ0gsU0FBUyxDQUFpQjtJQUUxQjs7T0FFRztJQUNILGtCQUFrQixDQUFnQztJQUNsRCxtQkFBbUIsQ0FBOEI7SUFFakQsS0FBSyxDQUFDLE9BQU87UUFDWCxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVELEtB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RUFBRSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztLQUMxQztJQUNEO1FBQ0UsS0FBSyxFQUFFLDBCQUEwQjtRQUNqQyxPQUFPLEVBQUUsWUFBWTtRQUNyQixVQUFVLEVBQUU7WUFDVixNQUFNLEVBQUcsT0FBTztZQUNoQixTQUFTLEVBQUcsT0FBTztTQUNwQjtRQUNELFNBQVMsRUFBRSxXQUFXO1FBQ3RCLEtBQUssRUFBRSxvQkFBb0I7UUFDM0IsWUFBWSxFQUFFLEVBQUU7UUFDaEIsUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBQ3JDLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztTQUNwQztRQUNELE1BQU0sRUFBRTtZQUNOLE1BQU0sRUFBQyxJQUFJO1lBQ1gsU0FBUyxFQUFDLE1BQU07U0FDakI7UUFDRCxVQUFVLEVBQUUsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDeEMsWUFBWSxFQUFFO1lBQ1osTUFBTSxFQUFHLElBQUk7WUFDYixTQUFTLEVBQUcsUUFBUTtTQUNyQjtRQUVELFdBQVcsRUFBRTtZQUNYLE1BQU0sRUFBRyxXQUFXO1lBQ3BCLFNBQVMsRUFBRyxXQUFXO1NBQ3hCO1FBQ0QsV0FBVyxFQUFFLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDO0tBQzFDO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0LCBzaWduYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVzZXJQcm9maWxlIH0gZnJvbSAnLi4vcHVibGljLWFwaSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBtZXJnZU1hcCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29uc3VtZXJNZXNzYWdlcywgSlNPTkNvZGVjLCBKZXRzdHJlYW1Xc1NlcnZpY2UsIFN1YnNjcmliZVR5cGUgfSBmcm9tICdAaGlzLWJhc2UvamV0c3RyZWFtLXdzJztcbmltcG9ydCB7IE5ld3MgfSBmcm9tICdAaGlzLXZpZXdtb2RlbC9hcHBwb3J0YWwvZGlzdCc7XG5pbXBvcnQgeyBDb2RpbmcgfSBmcm9tICdAaGlzLWJhc2UvZGF0YXR5cGVzL2Rpc3QnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZXdzU2VydmljZSB7XG5cbiAgI3VybCA9ICd3czovL2xvY2FsaG9zdDo4MDgwJztcblxuICAvKiog5L2/55SoU2lnbmFs6K6K5pW45YSy5a2YVXNlclByb2ZpbGXlnovliKXnmoTkvb/nlKjogIXos4foqIpcbiAgICogQG1lbWJlcm9mIE5ld3NTZXJ2aWNlXG4gICAqL1xuICB1c2VyUHJvZmlsZSA9IHNpZ25hbDxVc2VyUHJvZmlsZT4oe30gYXMgVXNlclByb2ZpbGUpXG5cbiAgbmV3cyA9IHNpZ25hbDxOZXdzW10+KHt9IGFzIE5ld3NbXSlcbiAgbm9ybWFsTmV3cyA9IHNpZ25hbDxOZXdzW10+KHt9IGFzIE5ld3NbXSlcbiAgdG9Eb0xpc3ROZXdzID0gc2lnbmFsPE5ld3NbXT4oe30gYXMgTmV3c1tdKVxuXG4gIC8qKiDkvb/nlKhTdWJqZWN06K6K5pW46IeqbmF0c+aLv+WPluWMheWQq+acgOaWsOa2iOaBr+eahOS9v+eUqOiAheizh+ioilxuICAgKiBAbWVtYmVyb2YgTmV3c1NlcnZpY2VcbiAgICovXG4gICN1c2VyTmV3cyA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgLyoqIOS9v+eUqENvbnN1bWVyTWVzc2FnZXPoqILplrHmnIDmlrDmtojmga9cbiAgICogQG1lbWJlcm9mIE5ld3NTZXJ2aWNlXG4gICAqL1xuICAjY29uc3VtZXJNZXNzYWdlcyQhOiBPYnNlcnZhYmxlPENvbnN1bWVyTWVzc2FnZXM+O1xuICAjamV0U3RyZWFtV3NTZXJ2aWNlID0gaW5qZWN0KEpldHN0cmVhbVdzU2VydmljZSk7XG5cbiAgYXN5bmMgY29ubmVjdCgpIHtcbiAgICBhd2FpdCB0aGlzLiNqZXRTdHJlYW1Xc1NlcnZpY2UuY29ubmVjdCh0aGlzLiN1cmwpO1xuICAgIGNvbnNvbGUubG9nKFwibmF0c+WVn+WLlVwiKVxuICB9XG5cbiAgYXN5bmMgZGlzY29ubmVjdCgpIHtcbiAgICAvLyDpgKPnt5rpl5zplonliY3vvIzmnIPlhYjlsIfnm67liY3oqILplrHntabmjpLnqbpcbiAgICBhd2FpdCB0aGlzLiNqZXRTdHJlYW1Xc1NlcnZpY2UuZHJhaW4oKTtcbiAgfVxuXG4gIC8qKiDmm7TmlrDmnIDmlrDmtojmga9cbiAgICogQHBhcmFtIHtOZXdzW119IG5ld3NcbiAgICogQG1lbWJlcm9mIE5ld3NTZXJ2aWNlXG4gICAqL1xuICBnZXROZXdzRnJvbU5hdHMobmV3czpOZXdzW10pOiB2b2lkIHtcbiAgICB0aGlzLm5ld3Muc2V0KG5ld3MpXG4gIH1cblxuICBzZXROZXdzKCl7XG4gICAgdGhpcy5uZXdzLnNldChtb2NrTmV3cylcbiAgICB0aGlzLm5vcm1hbE5ld3Muc2V0KHRoaXMuZ2V0RmlsdGVyTmV3cyhcIjEwXCIpKVxuICAgIHRoaXMudG9Eb0xpc3ROZXdzLnNldCh0aGlzLmdldEZpbHRlck5ld3MoXCI2MFwiKSlcbiAgfVxuXG4gIC8qKiDkvp3igJjkuIDoiKzmtojmga/igJnjgIHigJnlvoXovqblt6XkvZzigJnliIbpoZ7mnIDmlrDmtojmga9cbiAgICogQHBhcmFtIHtDb2Rpbmd9IHR5cGVcbiAgICogQHJldHVybiB7TmV3c1tdfVxuICAgKiBAbWVtYmVyb2YgTmV3c1NlcnZpY2VcbiAgICovXG4gIGdldEZpbHRlck5ld3MoY29kZT86Q29kaW5nWydjb2RlJ10pOiBOZXdzW117XG4gICAgY29uc3QgbmV3c0xpc3Q9dGhpcy5uZXdzKClcbiAgICBpZihjb2RlKXtcbiAgICAgIHJldHVybiB0aGlzLm5ld3MoKS5maWx0ZXIobT0+bS50eXBlWydjb2RlJ109PWNvZGUpXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICByZXR1cm4gbmV3c0xpc3RcbiAgICB9XG4gIH1cblxuICAvKiog6KiC6Zax5pyA5paw5raI5oGvXG4gICAqIEBtZW1iZXJvZiBOZXdzU2VydmljZVxuICAgKi9cbiAgYXN5bmMgc3ViTmV3cygpIHtcbiAgICB0aGlzLiN1c2VyTmV3cyA9IG5ldyBTdWJqZWN0KCk7XG4gICAgY29uc3QganNvbkNvZGVjID0gSlNPTkNvZGVjKCk7XG4gICAgLy8gJ25ld3MuZ2V0TmV3cy5kYXNoYm9hcmQnXG4gICAgdGhpcy4jY29uc3VtZXJNZXNzYWdlcyQgPSB0aGlzLiNqZXRTdHJlYW1Xc1NlcnZpY2Uuc3Vic2NyaWJlKFxuICAgICAgU3Vic2NyaWJlVHlwZS5QdXNoLFxuICAgICAgJ25ld3MuZ2V0TmV3cy5kYXNoYm9hcmQnXG4gICAgKTtcbiAgICBjb25zb2xlLmxvZyhcInJlYWR5IHRvIHN1YnNjcmliZVwiKVxuXG4gICAgdGhpcy4jY29uc3VtZXJNZXNzYWdlcyRcbiAgICAgIC5waXBlKFxuICAgICAgICBtZXJnZU1hcChhc3luYyAobWVzc2FnZXMpID0+IHtcbiAgICAgICAgICBmb3IgYXdhaXQgKGNvbnN0IG1lc3NhZ2Ugb2YgbWVzc2FnZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmraPlnKjogb3nmoRzdWJqZWN077yaICcsIG1lc3NhZ2Uuc3ViamVjdCk7XG4gICAgICAgICAgICB0aGlzLiN1c2VyTmV3cy5uZXh0KGpzb25Db2RlYy5kZWNvZGUobWVzc2FnZS5kYXRhKSk7XG4gICAgICAgICAgICBtZXNzYWdlLmFjaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge30pO1xuXG5cbiAgICAgIHRoaXMuI3VzZXJOZXdzLnN1YnNjcmliZSgobmV3czogYW55KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibmV3c1wiLCBuZXdzKVxuICAgICAgICB0aGlzLm5ld3Muc2V0KG5ld3MpO1xuICAgICAgICB0aGlzLm5vcm1hbE5ld3Muc2V0KHRoaXMuZ2V0RmlsdGVyTmV3cyhcIjEwXCIpKVxuICAgICAgICB0aGlzLnRvRG9MaXN0TmV3cy5zZXQodGhpcy5nZXRGaWx0ZXJOZXdzKFwiNjBcIikpXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhpcy5uZXdzKClcIiwgdGhpcy5uZXdzKCkpXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhpcy5ub3JtYWxOZXdzKClcIiwgdGhpcy5ub3JtYWxOZXdzKCkpXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhpcy50b0RvTGlzdE5ld3MoKVwiLCB0aGlzLnRvRG9MaXN0TmV3cygpKVxuXG4gICAgfSk7XG5cbiAgfVxuXG59XG5cbmV4cG9ydCBjb25zdCBtb2NrTmV3czpOZXdzW10gPVtcbiAge1xuICAgIFwiX2lkXCI6IFwiNjRmMTk2OGFmODBjYWE0NDUwYTFkMjE4XCIsXG4gICAgXCJhcHBJZFwiOiBcIjAwMS1hcHBfaWRcIixcbiAgICBcInVzZXJDb2RlXCI6IHtcbiAgICAgIFwiY29kZVwiIDogXCJOZW9cIixcbiAgICAgIFwiZGlzcGxheVwiIDogXCJOZW9cIlxuICAgIH0sXG4gICAgXCJzdWJqZWN0XCI6IFwi5ZOh5bel5YGl5bq35qqi5p+l6YCa55+lXCIsXG4gICAgXCJ1cmxcIjogXCJodHRwczovL3d3dy5ocGMudHdcIixcbiAgICBcInNoYXJlZERhdGFcIjoge30sXG4gICAgXCJwZXJpb2RcIjoge1xuICAgICAgXCJzdGFydFwiOiBuZXcgRGF0ZShcIjE5OTAtMDYtMTVUMDA6MDBcIiksXG4gICAgICBcImVuZFwiOiBuZXcgRGF0ZShcIjIyMjktMTItMzFUMjM6NTlcIilcbiAgICB9LFxuICAgIFwidHlwZVwiOiB7XG4gICAgICBcImNvZGVcIjpcIjEwXCIsXG4gICAgICBcImRpc3BsYXlcIjpcIuS4gOiIrOa2iOaBr1wiXG4gICAgfSxcbiAgICBcImV4ZWNUaW1lXCI6IG5ldyBEYXRlKFwiMjAyMy0wOS0yN1QxNDowMFwiKSxcbiAgICBcImV4ZWNTdGF0dXNcIjoge1xuICAgICAgXCJjb2RlXCIgOiBcIjYwXCIsXG4gICAgICBcImRpc3BsYXlcIiA6IFwi5bey6K6AL+W3suWujOaIkFwiXG4gICAgfVxuICAgICxcbiAgICBcInVwZGF0ZWRCeVwiOiB7XG4gICAgICBcImNvZGVcIiA6IFwiYWxwaGFUZWFtXCIsXG4gICAgICBcImRpc3BsYXlcIiA6IFwiYWxwaGFUZWFtXCJcbiAgICB9LFxuICAgIFwidXBkYXRlZEF0XCI6IG5ldyBEYXRlKFwiMTk5MC0wNi0xNVQwMDowMFwiKVxuICB9LFxuICB7XG4gICAgXCJfaWRcIjogXCI2NGYxOTY4YWY4MGNhYTQ0NTBhMWQyMTlcIixcbiAgICBcImFwcElkXCI6IFwiMDAyLWFwcF9pZFwiLFxuICAgIFwidXNlckNvZGVcIjoge1xuICAgICAgXCJjb2RlXCIgOiBcIk5lb1wiLFxuICAgICAgXCJkaXNwbGF5XCIgOiBcIk5lb1wiXG4gICAgfSxcbiAgICBcInN1YmplY3RcIjogXCLmgqjmnIkx562G5YWs5paH5b6F57C95qC4XCIsXG4gICAgXCJ1cmxcIjogXCJodHRwczovL3d3dy5ocGMudHdcIixcbiAgICBcInNoYXJlZERhdGFcIjoge30sXG4gICAgXCJwZXJpb2RcIjoge1xuICAgICAgXCJzdGFydFwiOiBuZXcgRGF0ZShcIjE5OTAtMDYtMTVUMDA6MDBcIiksXG4gICAgICBcImVuZFwiOiBuZXcgRGF0ZShcIjIyMjktMTItMzFUMjM6NTlcIilcbiAgICB9LFxuICAgIFwidHlwZVwiOiB7XG4gICAgICBcImNvZGVcIjpcIjYwXCIsXG4gICAgICBcImRpc3BsYXlcIjpcIuW+hei+puW3peS9nFwiXG4gICAgfSxcbiAgICBcImV4ZWNUaW1lXCI6IG5ldyBEYXRlKFwiMjAyMy0wOS0yN1QxNDowMFwiKSxcbiAgICBcImV4ZWNTdGF0dXNcIjoge1xuICAgICAgXCJjb2RlXCIgOiBcIjYwXCIsXG4gICAgICBcImRpc3BsYXlcIiA6IFwi5bey6K6AL+W3suWujOaIkFwiXG4gICAgfVxuICAgICxcbiAgICBcInVwZGF0ZWRCeVwiOiB7XG4gICAgICBcImNvZGVcIiA6IFwiYWxwaGFUZWFtXCIsXG4gICAgICBcImRpc3BsYXlcIiA6IFwiYWxwaGFUZWFtXCJcbiAgICB9LFxuICAgIFwidXBkYXRlZEF0XCI6IG5ldyBEYXRlKFwiMTk5MC0wNi0xNVQwMDowMFwiKVxuICB9LFxuICB7XG4gICAgXCJfaWRcIjogXCI2NGYxOTY4YWY4MGNhYTQ0NTBhMWQyMWFcIixcbiAgICBcImFwcElkXCI6IFwiMDAxLWFwcF9pZFwiLFxuICAgIFwidXNlckNvZGVcIjoge1xuICAgICAgXCJjb2RlXCIgOiBcIlRvbW15XCIsXG4gICAgICBcImRpc3BsYXlcIiA6IFwiVG9tbXlcIlxuICAgIH0sXG4gICAgXCJzdWJqZWN0XCI6IFwi5ZOh5bel5YGl5bq35qqi5p+l6YCa55+lXCIsXG4gICAgXCJ1cmxcIjogXCJodHRwczovL3d3dy5ocGMudHdcIixcbiAgICBcInNoYXJlZERhdGFcIjoge30sXG4gICAgXCJwZXJpb2RcIjoge1xuICAgICAgXCJzdGFydFwiOiBuZXcgRGF0ZShcIjE5OTAtMDYtMTVUMDA6MDBcIiksXG4gICAgICBcImVuZFwiOiBuZXcgRGF0ZShcIjIyMjktMTItMzFUMjM6NTlcIilcbiAgICB9LFxuICAgIFwidHlwZVwiOiB7XG4gICAgICBcImNvZGVcIjpcIjEwXCIsXG4gICAgICBcImRpc3BsYXlcIjpcIuS4gOiIrOa2iOaBr1wiXG4gICAgfSxcbiAgICBcImV4ZWNUaW1lXCI6IG5ldyBEYXRlKFwiMjAyMy0wOS0yN1QxNDowMFwiKSxcbiAgICBcImV4ZWNTdGF0dXNcIjoge1xuICAgICAgXCJjb2RlXCIgOiBcIjYwXCIsXG4gICAgICBcImRpc3BsYXlcIiA6IFwi5bey6K6AL+W3suWujOaIkFwiXG4gICAgfVxuICAgICxcbiAgICBcInVwZGF0ZWRCeVwiOiB7XG4gICAgICBcImNvZGVcIiA6IFwiYWxwaGFUZWFtXCIsXG4gICAgICBcImRpc3BsYXlcIiA6IFwiYWxwaGFUZWFtXCJcbiAgICB9LFxuICAgIFwidXBkYXRlZEF0XCI6IG5ldyBEYXRlKFwiMTk5MC0wNi0xNVQwMDowMFwiKVxuICB9LFxuICB7XG4gICAgXCJfaWRcIjogXCI2NGYxOTY4YWY4MGNhYTQ0NTBhMWQyMWJcIixcbiAgICBcImFwcElkXCI6IFwiMDAyLWFwcF9pZFwiLFxuICAgIFwidXNlckNvZGVcIjoge1xuICAgICAgXCJjb2RlXCIgOiBcIlRvbW15XCIsXG4gICAgICBcImRpc3BsYXlcIiA6IFwiVG9tbXlcIlxuICAgIH0sXG4gICAgXCJzdWJqZWN0XCI6IFwi5oKo5pyJMuethuWFrOaWh+W+heewveaguFwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly93d3cuaHBjLnR3XCIsXG4gICAgXCJzaGFyZWREYXRhXCI6IHt9LFxuICAgIFwicGVyaW9kXCI6IHtcbiAgICAgIFwic3RhcnRcIjogbmV3IERhdGUoXCIxOTkwLTA2LTE1VDAwOjAwXCIpLFxuICAgICAgXCJlbmRcIjogbmV3IERhdGUoXCIyMjI5LTEyLTMxVDIzOjU5XCIpXG4gICAgfSxcbiAgICBcInR5cGVcIjoge1xuICAgICAgXCJjb2RlXCI6XCI2MFwiLFxuICAgICAgXCJkaXNwbGF5XCI6XCLlvoXovqblt6XkvZxcIlxuICAgIH0sXG4gICAgXCJleGVjVGltZVwiOiBuZXcgRGF0ZShcIjIwMjMtMDktMjdUMTQ6MDBcIiksXG4gICAgXCJleGVjU3RhdHVzXCI6IHtcbiAgICAgIFwiY29kZVwiIDogXCI2MFwiLFxuICAgICAgXCJkaXNwbGF5XCIgOiBcIuW3suiugC/lt7LlrozmiJBcIlxuICAgIH1cbiAgICAsXG4gICAgXCJ1cGRhdGVkQnlcIjoge1xuICAgICAgXCJjb2RlXCIgOiBcImFscGhhVGVhbVwiLFxuICAgICAgXCJkaXNwbGF5XCIgOiBcImFscGhhVGVhbVwiXG4gICAgfSxcbiAgICBcInVwZGF0ZWRBdFwiOiBuZXcgRGF0ZShcIjE5OTAtMDYtMTVUMDA6MDBcIilcbiAgfVxuXTtcbiJdfQ==