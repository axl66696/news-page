import { OnInit } from '@angular/core';
import { NewsService } from './news.service';
import { Coding } from '@his-base/datatypes';
import { News } from '@his-viewmodel/appportal/dist';
import { MockUserService } from './mock-user.service';
import * as i0 from "@angular/core";
export declare class NewsInfoComponent implements OnInit {
    #private;
    /** 使用Signal變數儲存各最新消息的資訊
     *  @memberof NewsInfoComponent
     */
    news: import("@angular/core").Signal<News[]>;
    normalNews: import("@angular/core").Signal<News[]>;
    toDoList: import("@angular/core").Signal<News[]>;
    checkedNormalNews: import("@angular/core").Signal<News[]>;
    checkedToDoList: import("@angular/core").Signal<News[]>;
    newsService: NewsService;
    mockUserService: MockUserService;
    /** 初始化使用者資訊
     *  @memberof NewsInfoComponent
     */
    ngOnInit(): Promise<void>;
    /** 跳轉到上一頁
     *  @memberof NewsInfoComponent
     */
    onBackClick(): void;
    /** 跳轉到appUrl路徑的位置，並附帶傳送的資訊
     *  @memberof NewsInfoComponent
     */
    onNavNewsClick(appUrl: string, sharedData: object): void;
    /** 發送`最新消息狀態改為已讀/已完成`到nats
     *  @memberof NewsInfoComponent
     */
    onChangeStatus(userCode: Coding, newsId: string): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NewsInfoComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NewsInfoComponent, "his-news-info", never, {}, {}, never, never, true, never>;
}
