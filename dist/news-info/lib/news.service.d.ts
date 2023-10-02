import { UserProfile } from '../public-api';
import { News } from '@his-viewmodel/appportal/dist';
import { Coding } from '@his-base/datatypes';
import * as i0 from "@angular/core";
export declare class NewsService {
    #private;
    /** 使用Signal變數儲存UserProfile型別的使用者資訊
     * @memberof NewsService
     */
    userProfile: import("@angular/core").WritableSignal<UserProfile>;
    news: import("@angular/core").WritableSignal<News[]>;
    allNormalNews: import("@angular/core").WritableSignal<News[]>;
    allTodoList: import("@angular/core").WritableSignal<News[]>;
    normalNews: import("@angular/core").WritableSignal<News[]>;
    toDoList: import("@angular/core").WritableSignal<News[]>;
    checkedNormalNews: import("@angular/core").WritableSignal<News[]>;
    checkedToDoList: import("@angular/core").WritableSignal<News[]>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    /** 更新最新消息
     * @param {News[]} news
     * @memberof NewsService
     */
    getNewsFromNats(): void;
    setNews(): void;
    /** 依‘一般消息’、’待辦工作’分類最新消息
     * @param {Coding} type
     * @return {News[]}
     * @memberof NewsService
     */
    getFilterNews(code?: Coding['code']): News[];
    filterStatus(news: News[], code?: Coding['code']): News[];
    filterOverdue(news: News[]): News[];
    /** 訂閱最新消息
     * @memberof NewsService
     */
    subNews(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NewsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NewsService>;
}
export declare const mockNews: News[];
