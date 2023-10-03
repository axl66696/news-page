import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, signal, inject, Injectable, computed } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from 'primeng/table';
import { TableModule } from 'primeng/table';
import * as i4 from 'primeng/button';
import { ButtonModule } from 'primeng/button';
import * as i3 from 'primeng/api';
import { Subject, mergeMap } from 'rxjs';
import { JetstreamWsService, JSONCodec, SubscribeType } from '@his-base/jetstream-ws';
import * as i3$1 from 'primeng/fieldset';
import { FieldsetModule } from 'primeng/fieldset';
import { Router, RouterOutlet } from '@angular/router';
import * as i5 from 'primeng/avatar';
import { AvatarModule } from 'primeng/avatar';

class UserNews {
    constructor() {
        /**
         ** 表格名稱：NewsInfo (news info)
        ** 表格說明：最新消息通知資訊
        ** 編訂人員：陳冠守
        ** 校閱人員：孫培然
        ** 設計日期：2023.08.30
        **/
        /** 最新消息編號
           * @default crypto.randomUUID()
        */
        this._id = crypto.randomUUID();
        /** 消息來源app
          * @default ''
        */
        this.appId = '';
        /** 使用者代碼
          * @default ''
          * all代表全部使用者
        */
        this.userCode = '';
        /** 消息種類
         * @default ''
        */
        this.type = '';
        /** 最新消息開始日期
           * @default new Date()
        */
        this.startTime = new Date();
        /** 最新消息截止日期
         * @default new Date()
        */
        this.endTime = new Date();
        /** 最新消息分類
         * @default '未完成'
        */
        this.status = "未完成";
        /** 最新消息內容
         * @default '''
        */
        this.content = '';
        /** 外部連結
         * @default '''
        */
        this.url = '';
        /** 看過時間
        * @default new Date()
        */
        this.sawTime = new Date();
        /** 傳送資訊
         *
         * @default '''
         */
        this.shareData = {};
        /** 系統異動人員
          * @default '''
        */
        this.systemUser = '';
        /** 系統異動時間
          * @default new Date()
        */
        this.systemTime = new Date();
    }
}

class UserProfile {
    constructor(that) {
        /**
          ** 表格名稱：LoginInfo (login info)
          ** 表格說明：登入資訊
          ** 編訂人員：吳佩穎
          ** 校閱人員：孫培然
          ** 設計日期：2023.08.30
        **/
        /** 機構代碼
         * @default '''
        */
        this.orgNo = '';
        /** 使用者代碼
         * @default ''
        */
        this.userCode = '';
        /** 使用者姓名
         * @default ''
        */
        this.userName = '';
        /** 性別
         *  @default ''
        */
        this.sex = '';
        /** 出生日期
         * @default null
        */
        this.birthday = null;
        /** 使用者相片
         * @default null
        */
        this.userImage = null;
        /** 電子信箱
         *  @default null
        */
        this.eMail = null;
        /** 密碼雜湊
         * @default ''
        */
        this.passwordHash = '';
        /** 密碼過期日期
         * @default new Date()
        */
        this.passwordDate = new Date();
        /** 授權雜湊
         * @default ''
        */
        this.authHash = '';
        /** 開始日期
         * @default new Date()
        */
        this.startDate = new Date();
        /** 停用日期
         *  @default new Date()
        */
        this.endDate = new Date();
        /** 備註說明
         * @default null
        */
        this.remark = null;
        /** 系統異動人員
         * @default '''
        */
        this.systemUser = '';
        /** 系統異動時間
         * @default new Date()
        */
        this.systemTime = new Date();
        /** 個人風格設置
         * @default {}
        */
        this.typeSetting = {};
        /** 系統權限
         * @default []
        */
        this.systemAuthority = [];
        /** 使用者系統我的最愛
         * @default []
        */
        this.userFavorite = [];
        /** 使用者最新消息
       * @default []
      */
        this.userNews = [];
        Object.assign(this, structuredClone(that));
    }
}

/* eslint-disable @angular-eslint/component-selector */
class NewsListComponent {
    constructor() {
        /** 宣告’請點選進入’eventEmitter
         * @memberof NewsListComponent
         */
        this.navigationData = new EventEmitter;
    }
    /** 發送‘請點選進入’事件，並傳送一個包含appUrl路徑與sharedData資料的物件
     * @param {string} appUrl
     * @param {object} sharedData
     * @memberof NewsListComponent
     */
    directTo(appUrl, sharedData) {
        alert(`導向到 -------> ${appUrl}sharedData：${sharedData}`);
        this.navigationData.emit({ appUrl: appUrl, sharedData: sharedData });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.6", ngImport: i0, type: NewsListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.6", type: NewsListComponent, isStandalone: true, selector: "his-news-list", inputs: { news: "news", customTemplate: "customTemplate" }, outputs: { navigationData: "navigationData" }, ngImport: i0, template: "<ng-container *ngIf=\"news && news.length < 1; else ShowNews\">\n  <h1 class=\"p-datatable\" i18n>\u6C92\u6709\u6700\u65B0\u6D88\u606F</h1>\n</ng-container>\n\n<ng-template #ShowNews>\n  <ng-container [ngTemplateOutlet]=\"customTemplate || defaultTable\"></ng-container>\n\n</ng-template>\n\n<ng-template #defaultTable>\n  <p-table [value]=\"news!\" [tableStyle]=\"{ width: '100%' }\">\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>{{ news.period.start.toLocaleString() }}</td>\n        <td><span class=\"label-m\">{{ news.subject }}</span></td>\n        <td><p-button #navButton i18n-label=\"\u8ACB\u9EDE\u9078\u9032\u5165\" styleClass=\"p-button-link\" (click)=\"directTo(news.url,news.token)\"></p-button></td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: TableModule }, { kind: "component", type: i2.Table, selector: "p-table", inputs: ["frozenColumns", "frozenValue", "style", "styleClass", "tableStyle", "tableStyleClass", "paginator", "pageLinks", "rowsPerPageOptions", "alwaysShowPaginator", "paginatorPosition", "paginatorStyleClass", "paginatorDropdownAppendTo", "paginatorDropdownScrollHeight", "currentPageReportTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showJumpToPageInput", "showFirstLastIcon", "showPageLinks", "defaultSortOrder", "sortMode", "resetPageOnSort", "selectionMode", "selectionPageOnly", "contextMenuSelection", "contextMenuSelectionMode", "dataKey", "metaKeySelection", "rowSelectable", "rowTrackBy", "lazy", "lazyLoadOnInit", "compareSelectionBy", "csvSeparator", "exportFilename", "filters", "globalFilterFields", "filterDelay", "filterLocale", "expandedRowKeys", "editingRowKeys", "rowExpandMode", "scrollable", "scrollDirection", "rowGroupMode", "scrollHeight", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "virtualScrollDelay", "frozenWidth", "responsive", "contextMenu", "resizableColumns", "columnResizeMode", "reorderableColumns", "loading", "loadingIcon", "showLoader", "rowHover", "customSort", "showInitialSortBadge", "autoLayout", "exportFunction", "exportHeader", "stateKey", "stateStorage", "editMode", "groupRowsBy", "groupRowsByOrder", "responsiveLayout", "breakpoint", "paginatorLocale", "value", "columns", "first", "rows", "totalRecords", "sortField", "sortOrder", "multiSortMeta", "selection", "selectAll", "virtualRowHeight"], outputs: ["contextMenuSelectionChange", "selectAllChange", "selectionChange", "onRowSelect", "onRowUnselect", "onPage", "onSort", "onFilter", "onLazyLoad", "onRowExpand", "onRowCollapse", "onContextMenuSelect", "onColResize", "onColReorder", "onRowReorder", "onEditInit", "onEditComplete", "onEditCancel", "onHeaderCheckboxToggle", "sortFunction", "firstChange", "rowsChange", "onStateSave", "onStateRestore"] }, { kind: "directive", type: i3.PrimeTemplate, selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "ngmodule", type: ButtonModule }, { kind: "component", type: i4.Button, selector: "p-button", inputs: ["type", "iconPos", "icon", "badge", "label", "disabled", "loading", "loadingIcon", "style", "styleClass", "badgeClass", "ariaLabel"], outputs: ["onClick", "onFocus", "onBlur"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.6", ngImport: i0, type: NewsListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'his-news-list', standalone: true, imports: [CommonModule, TableModule, ButtonModule], template: "<ng-container *ngIf=\"news && news.length < 1; else ShowNews\">\n  <h1 class=\"p-datatable\" i18n>\u6C92\u6709\u6700\u65B0\u6D88\u606F</h1>\n</ng-container>\n\n<ng-template #ShowNews>\n  <ng-container [ngTemplateOutlet]=\"customTemplate || defaultTable\"></ng-container>\n\n</ng-template>\n\n<ng-template #defaultTable>\n  <p-table [value]=\"news!\" [tableStyle]=\"{ width: '100%' }\">\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>{{ news.period.start.toLocaleString() }}</td>\n        <td><span class=\"label-m\">{{ news.subject }}</span></td>\n        <td><p-button #navButton i18n-label=\"\u8ACB\u9EDE\u9078\u9032\u5165\" styleClass=\"p-button-link\" (click)=\"directTo(news.url,news.token)\"></p-button></td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n" }]
        }], propDecorators: { news: [{
                type: Input
            }], customTemplate: [{
                type: Input
            }], navigationData: [{
                type: Output
            }] } });

/* eslint-disable @typescript-eslint/no-empty-function */
class NewsService {
    constructor() {
        this.#url = 'ws://localhost:8080';
        /** 使用Signal變數儲存UserProfile型別的使用者資訊
         * @memberof NewsService
         */
        this.userProfile = signal({});
        this.news = signal({});
        this.allNormalNews = signal({});
        this.allTodoList = signal({});
        this.normalNews = signal({});
        this.toDoList = signal({});
        this.checkedNormalNews = signal({});
        this.checkedToDoList = signal({});
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
    getNewsFromNats() {
        this.#jetStreamWsService.publish("news.wantNews", { code: "Neo", display: "Neo" });
    }
    setNews() {
        this.news.set(mockNews);
        this.allNormalNews.set(this.getFilterNews("10"));
        this.allTodoList.set(this.getFilterNews("60"));
        this.normalNews.set(this.filterStatus(this.allNormalNews(), "10"));
        this.toDoList.set(this.filterStatus(this.allTodoList(), "10"));
        this.checkedNormalNews.set(this.filterStatus(this.allNormalNews(), "60"));
        this.checkedToDoList.set(this.filterStatus(this.allTodoList(), "60"));
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
    filterStatus(news, code) {
        if (code) {
            return news.filter(m => m.execStatus['code'] == code);
        }
        else {
            return news;
        }
    }
    filterOverdue(news) {
        const date = new Date;
        const aDay = 24 * 60 * 60 * 1000;
        return news.filter(newsData => date.valueOf() - newsData.execTime.valueOf() < aDay);
    }
    showDate() {
        const nowDate = new Date();
        console.log("現在時間", nowDate);
        console.log("最新消息0", this.news());
        console.log("最新消息0time", this.news()[0].execTime);
        console.log("最新消息4timetype", typeof this.news()[4].execTime);
        console.log(nowDate.valueOf());
        console.log(this.news()[0].execTime.valueOf());
        console.log("相減", (nowDate.valueOf() - this.news()[0].execTime.valueOf()) / (1000 * 60 * 60 * 24));
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
        this.#userNews.subscribe((newsList) => {
            const tmpNews = [];
            newsList.forEach((news) => {
                const tmp = {
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
                tmpNews.push(tmp);
            });
            console.log("news", tmpNews);
            this.news.set(tmpNews);
            // this.normalNews.set(this.getFilterNews("10"))
            // this.toDoList.set(this.getFilterNews("60"))
            console.log("execTime", this.news()[0].execTime);
            console.log("execTime type", typeof this.news()[0].execTime);
            this.allNormalNews.set(this.getFilterNews("10"));
            this.allTodoList.set(this.getFilterNews("60"));
            this.normalNews.set(this.filterStatus(this.allNormalNews(), "10"));
            this.toDoList.set(this.filterStatus(this.allTodoList(), "10"));
            this.checkedNormalNews.set(this.filterOverdue(this.filterStatus(this.allNormalNews(), "60")));
            this.checkedToDoList.set(this.filterOverdue(this.filterStatus(this.allTodoList(), "60")));
            console.log("this.news()", this.news());
            console.log("this.normalNews()", this.normalNews());
            console.log("this.toDoListNews()", this.toDoList());
            console.log("this.checkedNormalNews()", this.checkedNormalNews());
            console.log("this.checkedToDoList()", this.checkedToDoList());
            this.showDate();
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
const mockNews = [
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

/* eslint-disable @angular-eslint/component-selector */
class NewsInfoComponent {
    constructor() {
        /** 使用Signal變數儲存UserProfile型別的使用者資訊
         * @memberof NewsInfoComponent
         */
        this.news = computed(() => this.newsService.news());
        this.normalNews = computed(() => this.newsService.normalNews());
        this.toDoList = computed(() => this.newsService.toDoList());
        this.checkedNormalNews = computed(() => this.newsService.checkedNormalNews());
        this.checkedToDoList = computed(() => this.newsService.checkedToDoList());
        this.newsService = inject(NewsService);
        this.#jetStreamWsService = inject(JetstreamWsService);
        this.#router = inject(Router);
    }
    #jetStreamWsService;
    #router;
    /** 初始化使用者資訊
     * @memberof NewsInfoComponent
     */
    async ngOnInit() {
        // this.newsService.setNews();
        await this.newsService.connect();
        await this.newsService.subNews();
        await this.newsService.getNewsFromNats();
        console.log("newsService userNews", this.newsService.news);
        console.log("newsInfo news", this.news());
        console.log("公告消息", this.normalNews);
        console.log("待辦工作", this.toDoList);
    }
    /** 跳轉到上一頁
     * @memberof NewsInfoComponent
     */
    onBackClick() {
        window.history.back();
    }
    /** 跳轉到appUrl路徑的位置，並附帶傳送的資訊
     * @param {string} appUrl
     * @param {object} sharedData
     * @memberof NewsInfoComponent
     */
    onNavNewsClick(appUrl, sharedData) {
        alert(`導向到 -------> ${appUrl}token值：${sharedData}`);
        this.#router.navigate([appUrl], { state: sharedData });
    }
    async onChangeStatus(userCode, newsId) {
        const date = new Date();
        console.log("目前時間", date);
        await this.#jetStreamWsService.publish("news.updateStatus", { userCode, newsId, date });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.6", ngImport: i0, type: NewsInfoComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.6", type: NewsInfoComponent, isStandalone: true, selector: "his-news-info", ngImport: i0, template: "<!-- eslint-disable @angular-eslint/template/elements-content -->\n<div class=\"content-container\">\n  <div class=\"top-bar-container\">\n    <p-avatar\n\n        styleClass=\"mr-2\"\n        size=\"xlarge\"\n        shape=\"circle\"\n      ></p-avatar>\n      <div class=\"title\" i18n>\u6B61\u8FCE\u56DE\u4F86</div>\n  </div>\n  <div class=\"toolbar-container\">\n      <div class=\"icon-container\">\n        <button\n          pButton\n          pRipple\n          type=\"button\"\n          icon=\"pi pi-angle-left\"\n          class=\"p-button-rounded p-button-secondary p-button-outlined\"\n          (click)=\"onBackClick()\"\n        ></button>\n        <div><h3 class=\"\" i18n>\u6700\u65B0\u6D88\u606F</h3></div>\n      </div>\n  </div>\n  <div class=\"flex flex-column\">\n    <p-fieldset legend=\"\u5F85\u8FA6\u5DE5\u4F5C\" [toggleable]=\"true\" class=\"first\">\n      <ng-template pTemplate=\"expandicon\">\n        <div >\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"toDoList()\"\n        class=\"news-container\"\n        [customTemplate]=\"customTemplateUnfinish\"\n      ></his-news-list>\n    </p-fieldset>\n\n    <p-fieldset legend=\"\u516C\u544A\u8A0A\u606F\" [toggleable]=\"true\" class=\"second\">\n      <ng-template pTemplate=\"expandicon\">\n        <div>\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"normalNews()\"\n        class=\"news-container\"\n        [customTemplate]=\"customTemplateAnnouncement\"\n      ></his-news-list>\n    </p-fieldset>\n\n    <p-fieldset legend=\"\u5B8C\u6210\u5DE5\u4F5C\" [toggleable]=\"true\" class=\"third\">\n      <ng-template pTemplate=\"expandicon\">\n        <div>\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"checkedToDoList()\"\n        class=\"news-container\"\n        [customTemplate]=\"customTemplateToDoListChecked\"\n      ></his-news-list>\n    </p-fieldset>\n\n    <p-fieldset legend=\"\u5DF2\u8B80\u8A0A\u606F\" [toggleable]=\"true\" class=\"fourth\">\n      <ng-template pTemplate=\"expandicon\">\n        <div>\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"checkedNormalNews()\"\n        class=\"news-container\"\n        [customTemplate]=\"customTemplateAnnouncementChecked\"\n      ></his-news-list>\n    </p-fieldset>\n  </div>\n</div>\n\n<ng-template #customTemplateUnfinish>\n  <p-table\n    [value]=\"toDoList()\"\n    [tableStyle]=\"{ width: '100%' }\"\n  >\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>\n          <button\n            pButton\n            pRipple\n            type=\"button\"\n            label=\"\u5B8C\u6210\"\n            class=\"p-button-outlined\"\n            (click)=\"onChangeStatus(news.userCode, news._id)\"\n\n          ></button>\n        </td>\n        <td>\n          <span class=\"label-m\">{{ news.period.start.toLocaleString() }}</span>\n        </td>\n        <td>\n          <span class=\"label-m\">{{ news.subject }}</span>\n        </td>\n        <td>\n          <span>\n            <p-button #navButton i18n-label label=\"\u8ACB\u9EDE\u9078\u9032\u5165\" styleClass=\"p-button-link\" (click)=\"onNavNewsClick(news.url,news.sharedData)\"></p-button>\n          </span>\n        </td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n\n<ng-template #customTemplateAnnouncement>\n  <p-table\n    [value]=\"normalNews()\"\n    [tableStyle]=\"{ width: '100%' }\"\n  >\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>\n          <button\n            pButton\n            pRipple\n            type=\"button\"\n            label=\"\u5DF2\u8B80\"\n            class=\"p-button-outlined\"\n            (click)=\"onChangeStatus(news.userCode, news._id)\"\n          ></button>\n        </td>\n        <td>{{ news.period.start.toLocaleString() }}</td>\n        <td>\n          <span class=\"label-m\">{{ news.subject }}</span>\n        </td>\n        <td>\n          <span>\n            <p-button #navButton i18n-label label=\"\u8ACB\u9EDE\u9078\u9032\u5165\" styleClass=\"p-button-link\" (click)=\"onNavNewsClick(news.url,news.sharedData)\"></p-button>\n          </span>\n        </td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n\n<ng-template #customTemplateToDoListChecked>\n  <p-table\n    [value]=\"checkedToDoList()\"\n    [tableStyle]=\"{ width: '100%' }\"\n  >\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>{{ news.period.start.toLocaleString() }}</td>\n        <td>\n          <span class=\"label-m\">{{ news.subject }}</span>\n        </td>\n        <td>\n          <span>\n          </span>\n        </td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n\n<ng-template #customTemplateAnnouncementChecked>\n  <p-table\n    [value]=\"checkedNormalNews()\"\n    [tableStyle]=\"{ width: '100%' }\"\n  >\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>{{ news.period.start.toLocaleString() }}</td>\n        <td>\n          <span class=\"label-m\">{{ news.subject }}</span>\n        </td>\n        <td>\n          <span>\n          </span>\n        </td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n", styles: [".top-bar-container{display:flex;flex-direction:row;align-items:center}.icon-container{display:flex;justify-content:space-between;align-items:center;gap:12px}.icon-container h3{font-size:1.5rem;font-style:normal;font-weight:700;line-height:2rem;letter-spacing:.03rem;color:var(--surface-on-surface)}.content-container{padding:32px;height:100%;gap:16px;display:flex;flex-direction:column;background-color:var(--surface-ground)}.flex-column{gap:26px}:host ::ng-deep p-fieldset .p-fieldset-toggleable .p-fieldset-legend{padding:0;margin-left:24px;transition:background-color .2s,color .2s,box-shadow .2s}:host ::ng-deep p-fieldset .p-fieldset-toggleable .p-fieldset-legend a{min-height:34px;padding:var(--spacing-xs) var(--spacing-md)}:host ::ng-deep p-fieldset .p-fieldset-legend>a{flex-direction:row-reverse}:host ::ng-deep p-fieldset .p-fieldset.p-fieldset-toggleable .p-fieldset-legend a .p-fieldset-toggler{margin-right:0;margin-left:.5rem}:host ::ng-deep p-fieldset.first .p-fieldset-toggleable .p-fieldset-legend{background-color:#fee9d1}:host ::ng-deep p-fieldset.first .p-fieldset-toggleable .p-fieldset-legend a{color:var(--surface-on-surface)}:host ::ng-deep p-fieldset.second .p-fieldset-toggleable .p-fieldset-legend{background-color:#414644}:host ::ng-deep p-fieldset.second .p-fieldset-toggleable .p-fieldset-legend a{color:#f6f6f6}:host ::ng-deep p-fieldset.third .p-fieldset-toggleable .p-fieldset-legend{background-color:var(--primary-container)}:host ::ng-deep p-fieldset.third .p-fieldset-toggleable .p-fieldset-legend a{color:var(--primary-main)}:host ::ng-deep .p-datatable{height:100%;background:#fff;font-style:normal;font-weight:400;line-height:20px;letter-spacing:.16px;color:var(--surface-on-surface)}:host ::ng-deep .p-datatable .p-datatable-tbody>tr{width:100%}:host ::ng-deep .p-datatable .p-datatable-tbody>tr:last-child>td{border-bottom:none}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td{padding:8px 0}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:first-child{width:5%;min-width:45px}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:first-child .p-button{min-width:60px}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:nth-child(2){width:10%}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:last-child{width:10%}:host ::ng-deep .p-fieldset{border-radius:12px}:host ::ng-deep .p-fieldset .p-fieldset-content{padding:8px 12px}.title{padding-left:24px;font-size:28px;font-weight:700;line-height:40px;letter-spacing:1.12px;color:var(--primary-main)}.toolbar-container{display:flex;flex-direction:row;width:100%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: NewsListComponent, selector: "his-news-list", inputs: ["news", "customTemplate"], outputs: ["navigationData"] }, { kind: "ngmodule", type: TableModule }, { kind: "component", type: i2.Table, selector: "p-table", inputs: ["frozenColumns", "frozenValue", "style", "styleClass", "tableStyle", "tableStyleClass", "paginator", "pageLinks", "rowsPerPageOptions", "alwaysShowPaginator", "paginatorPosition", "paginatorStyleClass", "paginatorDropdownAppendTo", "paginatorDropdownScrollHeight", "currentPageReportTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showJumpToPageInput", "showFirstLastIcon", "showPageLinks", "defaultSortOrder", "sortMode", "resetPageOnSort", "selectionMode", "selectionPageOnly", "contextMenuSelection", "contextMenuSelectionMode", "dataKey", "metaKeySelection", "rowSelectable", "rowTrackBy", "lazy", "lazyLoadOnInit", "compareSelectionBy", "csvSeparator", "exportFilename", "filters", "globalFilterFields", "filterDelay", "filterLocale", "expandedRowKeys", "editingRowKeys", "rowExpandMode", "scrollable", "scrollDirection", "rowGroupMode", "scrollHeight", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "virtualScrollDelay", "frozenWidth", "responsive", "contextMenu", "resizableColumns", "columnResizeMode", "reorderableColumns", "loading", "loadingIcon", "showLoader", "rowHover", "customSort", "showInitialSortBadge", "autoLayout", "exportFunction", "exportHeader", "stateKey", "stateStorage", "editMode", "groupRowsBy", "groupRowsByOrder", "responsiveLayout", "breakpoint", "paginatorLocale", "value", "columns", "first", "rows", "totalRecords", "sortField", "sortOrder", "multiSortMeta", "selection", "selectAll", "virtualRowHeight"], outputs: ["contextMenuSelectionChange", "selectAllChange", "selectionChange", "onRowSelect", "onRowUnselect", "onPage", "onSort", "onFilter", "onLazyLoad", "onRowExpand", "onRowCollapse", "onContextMenuSelect", "onColResize", "onColReorder", "onRowReorder", "onEditInit", "onEditComplete", "onEditCancel", "onHeaderCheckboxToggle", "sortFunction", "firstChange", "rowsChange", "onStateSave", "onStateRestore"] }, { kind: "directive", type: i3.PrimeTemplate, selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "ngmodule", type: FieldsetModule }, { kind: "component", type: i3$1.Fieldset, selector: "p-fieldset", inputs: ["legend", "toggleable", "collapsed", "style", "styleClass", "transitionOptions"], outputs: ["collapsedChange", "onBeforeToggle", "onAfterToggle"] }, { kind: "ngmodule", type: ButtonModule }, { kind: "directive", type: i4.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }, { kind: "component", type: i4.Button, selector: "p-button", inputs: ["type", "iconPos", "icon", "badge", "label", "disabled", "loading", "loadingIcon", "style", "styleClass", "badgeClass", "ariaLabel"], outputs: ["onClick", "onFocus", "onBlur"] }, { kind: "ngmodule", type: AvatarModule }, { kind: "component", type: i5.Avatar, selector: "p-avatar", inputs: ["label", "icon", "image", "size", "shape", "style", "styleClass", "ariaLabel", "ariaLabelledBy"], outputs: ["onImageError"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.6", ngImport: i0, type: NewsInfoComponent, decorators: [{
            type: Component,
            args: [{ selector: 'his-news-info', standalone: true, imports: [CommonModule, NewsListComponent, TableModule, FieldsetModule, ButtonModule, AvatarModule, RouterOutlet], template: "<!-- eslint-disable @angular-eslint/template/elements-content -->\n<div class=\"content-container\">\n  <div class=\"top-bar-container\">\n    <p-avatar\n\n        styleClass=\"mr-2\"\n        size=\"xlarge\"\n        shape=\"circle\"\n      ></p-avatar>\n      <div class=\"title\" i18n>\u6B61\u8FCE\u56DE\u4F86</div>\n  </div>\n  <div class=\"toolbar-container\">\n      <div class=\"icon-container\">\n        <button\n          pButton\n          pRipple\n          type=\"button\"\n          icon=\"pi pi-angle-left\"\n          class=\"p-button-rounded p-button-secondary p-button-outlined\"\n          (click)=\"onBackClick()\"\n        ></button>\n        <div><h3 class=\"\" i18n>\u6700\u65B0\u6D88\u606F</h3></div>\n      </div>\n  </div>\n  <div class=\"flex flex-column\">\n    <p-fieldset legend=\"\u5F85\u8FA6\u5DE5\u4F5C\" [toggleable]=\"true\" class=\"first\">\n      <ng-template pTemplate=\"expandicon\">\n        <div >\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"toDoList()\"\n        class=\"news-container\"\n        [customTemplate]=\"customTemplateUnfinish\"\n      ></his-news-list>\n    </p-fieldset>\n\n    <p-fieldset legend=\"\u516C\u544A\u8A0A\u606F\" [toggleable]=\"true\" class=\"second\">\n      <ng-template pTemplate=\"expandicon\">\n        <div>\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"normalNews()\"\n        class=\"news-container\"\n        [customTemplate]=\"customTemplateAnnouncement\"\n      ></his-news-list>\n    </p-fieldset>\n\n    <p-fieldset legend=\"\u5B8C\u6210\u5DE5\u4F5C\" [toggleable]=\"true\" class=\"third\">\n      <ng-template pTemplate=\"expandicon\">\n        <div>\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"checkedToDoList()\"\n        class=\"news-container\"\n        [customTemplate]=\"customTemplateToDoListChecked\"\n      ></his-news-list>\n    </p-fieldset>\n\n    <p-fieldset legend=\"\u5DF2\u8B80\u8A0A\u606F\" [toggleable]=\"true\" class=\"fourth\">\n      <ng-template pTemplate=\"expandicon\">\n        <div>\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"checkedNormalNews()\"\n        class=\"news-container\"\n        [customTemplate]=\"customTemplateAnnouncementChecked\"\n      ></his-news-list>\n    </p-fieldset>\n  </div>\n</div>\n\n<ng-template #customTemplateUnfinish>\n  <p-table\n    [value]=\"toDoList()\"\n    [tableStyle]=\"{ width: '100%' }\"\n  >\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>\n          <button\n            pButton\n            pRipple\n            type=\"button\"\n            label=\"\u5B8C\u6210\"\n            class=\"p-button-outlined\"\n            (click)=\"onChangeStatus(news.userCode, news._id)\"\n\n          ></button>\n        </td>\n        <td>\n          <span class=\"label-m\">{{ news.period.start.toLocaleString() }}</span>\n        </td>\n        <td>\n          <span class=\"label-m\">{{ news.subject }}</span>\n        </td>\n        <td>\n          <span>\n            <p-button #navButton i18n-label label=\"\u8ACB\u9EDE\u9078\u9032\u5165\" styleClass=\"p-button-link\" (click)=\"onNavNewsClick(news.url,news.sharedData)\"></p-button>\n          </span>\n        </td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n\n<ng-template #customTemplateAnnouncement>\n  <p-table\n    [value]=\"normalNews()\"\n    [tableStyle]=\"{ width: '100%' }\"\n  >\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>\n          <button\n            pButton\n            pRipple\n            type=\"button\"\n            label=\"\u5DF2\u8B80\"\n            class=\"p-button-outlined\"\n            (click)=\"onChangeStatus(news.userCode, news._id)\"\n          ></button>\n        </td>\n        <td>{{ news.period.start.toLocaleString() }}</td>\n        <td>\n          <span class=\"label-m\">{{ news.subject }}</span>\n        </td>\n        <td>\n          <span>\n            <p-button #navButton i18n-label label=\"\u8ACB\u9EDE\u9078\u9032\u5165\" styleClass=\"p-button-link\" (click)=\"onNavNewsClick(news.url,news.sharedData)\"></p-button>\n          </span>\n        </td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n\n<ng-template #customTemplateToDoListChecked>\n  <p-table\n    [value]=\"checkedToDoList()\"\n    [tableStyle]=\"{ width: '100%' }\"\n  >\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>{{ news.period.start.toLocaleString() }}</td>\n        <td>\n          <span class=\"label-m\">{{ news.subject }}</span>\n        </td>\n        <td>\n          <span>\n          </span>\n        </td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n\n<ng-template #customTemplateAnnouncementChecked>\n  <p-table\n    [value]=\"checkedNormalNews()\"\n    [tableStyle]=\"{ width: '100%' }\"\n  >\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>{{ news.period.start.toLocaleString() }}</td>\n        <td>\n          <span class=\"label-m\">{{ news.subject }}</span>\n        </td>\n        <td>\n          <span>\n          </span>\n        </td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n", styles: [".top-bar-container{display:flex;flex-direction:row;align-items:center}.icon-container{display:flex;justify-content:space-between;align-items:center;gap:12px}.icon-container h3{font-size:1.5rem;font-style:normal;font-weight:700;line-height:2rem;letter-spacing:.03rem;color:var(--surface-on-surface)}.content-container{padding:32px;height:100%;gap:16px;display:flex;flex-direction:column;background-color:var(--surface-ground)}.flex-column{gap:26px}:host ::ng-deep p-fieldset .p-fieldset-toggleable .p-fieldset-legend{padding:0;margin-left:24px;transition:background-color .2s,color .2s,box-shadow .2s}:host ::ng-deep p-fieldset .p-fieldset-toggleable .p-fieldset-legend a{min-height:34px;padding:var(--spacing-xs) var(--spacing-md)}:host ::ng-deep p-fieldset .p-fieldset-legend>a{flex-direction:row-reverse}:host ::ng-deep p-fieldset .p-fieldset.p-fieldset-toggleable .p-fieldset-legend a .p-fieldset-toggler{margin-right:0;margin-left:.5rem}:host ::ng-deep p-fieldset.first .p-fieldset-toggleable .p-fieldset-legend{background-color:#fee9d1}:host ::ng-deep p-fieldset.first .p-fieldset-toggleable .p-fieldset-legend a{color:var(--surface-on-surface)}:host ::ng-deep p-fieldset.second .p-fieldset-toggleable .p-fieldset-legend{background-color:#414644}:host ::ng-deep p-fieldset.second .p-fieldset-toggleable .p-fieldset-legend a{color:#f6f6f6}:host ::ng-deep p-fieldset.third .p-fieldset-toggleable .p-fieldset-legend{background-color:var(--primary-container)}:host ::ng-deep p-fieldset.third .p-fieldset-toggleable .p-fieldset-legend a{color:var(--primary-main)}:host ::ng-deep .p-datatable{height:100%;background:#fff;font-style:normal;font-weight:400;line-height:20px;letter-spacing:.16px;color:var(--surface-on-surface)}:host ::ng-deep .p-datatable .p-datatable-tbody>tr{width:100%}:host ::ng-deep .p-datatable .p-datatable-tbody>tr:last-child>td{border-bottom:none}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td{padding:8px 0}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:first-child{width:5%;min-width:45px}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:first-child .p-button{min-width:60px}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:nth-child(2){width:10%}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:last-child{width:10%}:host ::ng-deep .p-fieldset{border-radius:12px}:host ::ng-deep .p-fieldset .p-fieldset-content{padding:8px 12px}.title{padding-left:24px;font-size:28px;font-weight:700;line-height:40px;letter-spacing:1.12px;color:var(--primary-main)}.toolbar-container{display:flex;flex-direction:row;width:100%}\n"] }]
        }] });

/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-var */
class UserProfileService {
    constructor() {
        /** 使用Signal變數儲存UserProfile型別的使用者資訊
         * @memberof UserProfileService
         */
        this.userAccount = signal({});
        /** 使用Subject變數自nats拿取包含最新消息的使用者資訊
         * @memberof UserProfileService
         */
        this.#userNews = new Subject();
        this.#jetStreamWsService = inject(JetstreamWsService);
    }
    /** 使用Subject變數自nats拿取包含最新消息的使用者資訊
     * @memberof UserProfileService
     */
    #userNews;
    /** 使用ConsumerMessages訂閱最新消息
     * @memberof UserProfileService
     */
    #consumerMessages$;
    #jetStreamWsService;
    /** 更新使用者資訊
     * @param {UserAccount} user
     * @memberof UserProfileService
     */
    getUserAccountFromNats(user) {
        this.userAccount.set(user);
    }
    /** 訂閱最新消息
     * @memberof UserProfileService
     */
    async subNews() {
        this.#userNews = new Subject();
        const jsonCodec = JSONCodec();
        this.#consumerMessages$ = this.#jetStreamWsService.subscribe(SubscribeType.Pull, 'userAccount.getNews.dashboard');
        this.#consumerMessages$
            .pipe(mergeMap(async (messages) => {
            for await (const message of messages) {
                this.#userNews.next(jsonCodec.decode(message.data));
                message.ack();
            }
        }))
            .subscribe(() => { });
        this.#userNews.subscribe((user) => {
            this.userAccount.set(user[0]);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.6", ngImport: i0, type: UserProfileService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.6", ngImport: i0, type: UserProfileService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.6", ngImport: i0, type: UserProfileService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

/*
 * Public API Surface of news-info
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NewsInfoComponent, NewsListComponent, NewsService, UserNews, UserProfile, UserProfileService, mockNews };
//# sourceMappingURL=his-view-news-info.mjs.map
