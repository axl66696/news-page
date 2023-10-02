import { EventEmitter, TemplateRef } from '@angular/core';
import { News } from '@his-viewmodel/appportal/dist';
import * as i0 from "@angular/core";
export declare class NewsListComponent {
    /** 接收自父component收到的最新消息
     * @type {News[]}
     * @memberof NewsListComponent
     */
    news?: News[];
    /** ng-template模板
     * @type {TemplateRef<any>}
     * @memberof NewsListComponent
     */
    customTemplate?: TemplateRef<any>;
    /** 宣告’請點選進入’eventEmitter
     * @memberof NewsListComponent
     */
    navigationData: EventEmitter<any>;
    /** 發送‘請點選進入’事件，並傳送一個包含appUrl路徑與sharedData資料的物件
     * @param {string} appUrl
     * @param {object} sharedData
     * @memberof NewsListComponent
     */
    directTo(appUrl: string, sharedData: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NewsListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NewsListComponent, "his-news-list", never, { "news": { "alias": "news"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, { "navigationData": "navigationData"; }, never, never, true, never>;
}
