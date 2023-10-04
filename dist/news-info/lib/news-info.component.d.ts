import { OnInit, OnDestroy } from '@angular/core';
import { NewsService } from './news.service';
import { Coding } from '@his-base/datatypes';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export declare class NewsInfoComponent implements OnInit, OnDestroy {
    #private;
    private http;
    /** 使用computed變數儲存各最新消息的資訊
     *  @memberof NewsInfoComponent
     */
    news: import("@angular/core").Signal<import("@his-viewmodel/appportal/dist").News[]>;
    normalNews: import("@angular/core").Signal<import("@his-viewmodel/appportal/dist").News[]>;
    toDoList: import("@angular/core").Signal<import("@his-viewmodel/appportal/dist").News[]>;
    checkedNormalNews: import("@angular/core").Signal<import("@his-viewmodel/appportal/dist").News[]>;
    checkedToDoList: import("@angular/core").Signal<import("@his-viewmodel/appportal/dist").News[]>;
    /** userCode假資料
     *  @memberof NewsInfoComponent
     */
    mockUserCode: Coding;
    newsService: NewsService;
    /** HttpClient引入假userCode
     *  @memberof NewsInfoComponent
     */
    constructor(http: HttpClient);
    /** 建立連線、訂閱最新消息、初始化最新消息
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
    /** 清除連線
     *  @memberof NewsInfoCoponent
     */
    ngOnDestroy(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NewsInfoComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NewsInfoComponent, "his-news-info", never, {}, {}, never, never, true, never>;
}
