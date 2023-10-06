import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, signal, inject, Injectable, computed } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from 'primeng/table';
import { TableModule } from 'primeng/table';
import * as i5 from 'primeng/button';
import { ButtonModule } from 'primeng/button';
import * as i5$1 from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import * as i3 from 'primeng/api';
import { Subject, mergeMap } from 'rxjs';
import { JetstreamWsService, JSONCodec, SubscribeType } from '@his-base/jetstream-ws';
import * as i4 from 'primeng/fieldset';
import { FieldsetModule } from 'primeng/fieldset';
import { Router, RouterOutlet } from '@angular/router';
import * as i6 from 'primeng/avatar';
import { AvatarModule } from 'primeng/avatar';
import * as i1$1 from '@angular/common/http';

/* eslint-disable @angular-eslint/component-selector */
class NewsListComponent {
    constructor() {
        /** 宣告’請點選進入’eventEmitter
         *  @memberof NewsListComponent
         */
        this.navigationData = new EventEmitter;
    }
    /** 發送‘請點選進入’事件，並傳送一個包含appUrl路徑與sharedData資料的物件
     *  @memberof NewsListComponent
     */
    directTo(appUrl, sharedData) {
        this.navigationData.emit({ appUrl: appUrl, sharedData: sharedData });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.6", ngImport: i0, type: NewsListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.6", type: NewsListComponent, isStandalone: true, selector: "his-news-list", inputs: { news: "news", customTemplate: "customTemplate" }, outputs: { navigationData: "navigationData" }, ngImport: i0, template: "<ng-container *ngIf=\"news && news.length < 1; else ShowNews\">\n  <h1 class=\"p-datatable\" [innerText]=\"'noNews'|translate\"></h1>\n</ng-container>\n\n<ng-template #ShowNews>\n  <ng-container [ngTemplateOutlet]=\"customTemplate || defaultTable\"></ng-container>\n\n</ng-template>\n\n<ng-template #defaultTable>\n  <p-table [value]=\"news!\" [tableStyle]=\"{ width: '100%' }\">\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>{{ news.period.start.toLocaleString() }}</td>\n        <td><span class=\"label-m\">{{ news.subject }}</span></td>\n        <td><p-button #navButton [label]=\"'clickToEnter'|translate\" styleClass=\"p-button-link\" (click)=\"directTo(news.url,news.token)\"></p-button></td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: TableModule }, { kind: "component", type: i2.Table, selector: "p-table", inputs: ["frozenColumns", "frozenValue", "style", "styleClass", "tableStyle", "tableStyleClass", "paginator", "pageLinks", "rowsPerPageOptions", "alwaysShowPaginator", "paginatorPosition", "paginatorStyleClass", "paginatorDropdownAppendTo", "paginatorDropdownScrollHeight", "currentPageReportTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showJumpToPageInput", "showFirstLastIcon", "showPageLinks", "defaultSortOrder", "sortMode", "resetPageOnSort", "selectionMode", "selectionPageOnly", "contextMenuSelection", "contextMenuSelectionMode", "dataKey", "metaKeySelection", "rowSelectable", "rowTrackBy", "lazy", "lazyLoadOnInit", "compareSelectionBy", "csvSeparator", "exportFilename", "filters", "globalFilterFields", "filterDelay", "filterLocale", "expandedRowKeys", "editingRowKeys", "rowExpandMode", "scrollable", "scrollDirection", "rowGroupMode", "scrollHeight", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "virtualScrollDelay", "frozenWidth", "responsive", "contextMenu", "resizableColumns", "columnResizeMode", "reorderableColumns", "loading", "loadingIcon", "showLoader", "rowHover", "customSort", "showInitialSortBadge", "autoLayout", "exportFunction", "exportHeader", "stateKey", "stateStorage", "editMode", "groupRowsBy", "groupRowsByOrder", "responsiveLayout", "breakpoint", "paginatorLocale", "value", "columns", "first", "rows", "totalRecords", "sortField", "sortOrder", "multiSortMeta", "selection", "selectAll", "virtualRowHeight"], outputs: ["contextMenuSelectionChange", "selectAllChange", "selectionChange", "onRowSelect", "onRowUnselect", "onPage", "onSort", "onFilter", "onLazyLoad", "onRowExpand", "onRowCollapse", "onContextMenuSelect", "onColResize", "onColReorder", "onRowReorder", "onEditInit", "onEditComplete", "onEditCancel", "onHeaderCheckboxToggle", "sortFunction", "firstChange", "rowsChange", "onStateSave", "onStateRestore"] }, { kind: "directive", type: i3.PrimeTemplate, selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "ngmodule", type: ButtonModule }, { kind: "component", type: i5.Button, selector: "p-button", inputs: ["type", "iconPos", "icon", "badge", "label", "disabled", "loading", "loadingIcon", "style", "styleClass", "badgeClass", "ariaLabel"], outputs: ["onClick", "onFocus", "onBlur"] }, { kind: "ngmodule", type: TranslateModule }, { kind: "pipe", type: i5$1.TranslatePipe, name: "translate" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.6", ngImport: i0, type: NewsListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'his-news-list', standalone: true, imports: [CommonModule, TableModule, ButtonModule, TranslateModule], template: "<ng-container *ngIf=\"news && news.length < 1; else ShowNews\">\n  <h1 class=\"p-datatable\" [innerText]=\"'noNews'|translate\"></h1>\n</ng-container>\n\n<ng-template #ShowNews>\n  <ng-container [ngTemplateOutlet]=\"customTemplate || defaultTable\"></ng-container>\n\n</ng-template>\n\n<ng-template #defaultTable>\n  <p-table [value]=\"news!\" [tableStyle]=\"{ width: '100%' }\">\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>{{ news.period.start.toLocaleString() }}</td>\n        <td><span class=\"label-m\">{{ news.subject }}</span></td>\n        <td><p-button #navButton [label]=\"'clickToEnter'|translate\" styleClass=\"p-button-link\" (click)=\"directTo(news.url,news.token)\"></p-button></td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n" }]
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

/* eslint-disable @angular-eslint/component-selector */
class NewsInfoComponent {
    #jetStreamWsService;
    #router;
    /** HttpClient引入假userCode
     *  @memberof NewsInfoComponent
     */
    constructor(http) {
        this.http = http;
        /** 使用computed變數儲存各最新消息的資訊
         *  @memberof NewsInfoComponent
         */
        this.news = computed(() => this.newsService.news());
        this.normalNews = computed(() => this.newsService.normalNews());
        this.toDoList = computed(() => this.newsService.toDoList());
        this.checkedNormalNews = computed(() => this.newsService.checkedNormalNews());
        this.checkedToDoList = computed(() => this.newsService.checkedToDoList());
        this.newsService = inject(NewsService);
        this.#jetStreamWsService = inject(JetstreamWsService);
        this.#router = inject(Router);
        http.get('http://localhost:4321/assets/mockUserCode/mockUserCode.json')
            .subscribe(userCode => {
            this.mockUserCode = userCode;
        });
    }
    /** 建立連線、訂閱最新消息、初始化最新消息
     *  @memberof NewsInfoComponent
     */
    async ngOnInit() {
        await this.newsService.connect();
        await this.newsService.subNews();
        this.newsService.publishUserCode(this.mockUserCode);
    }
    /** 跳轉到上一頁
     *  @memberof NewsInfoComponent
     */
    onBackClick() {
        window.history.back();
    }
    /** 跳轉到appUrl路徑的位置，並附帶傳送的資訊
     *  @memberof NewsInfoComponent
     */
    onNavNewsClick(appUrl, sharedData) {
        this.#router.navigate([appUrl], { state: sharedData });
    }
    /** 發送`最新消息狀態改為已讀/已完成`到nats
     *  @memberof NewsInfoComponent
     */
    async onChangeStatus(userCode, newsId) {
        this.newsService.changeStatus(userCode, newsId);
    }
    /** 清除連線
     *  @memberof NewsInfoCoponent
     */
    async ngOnDestroy() {
        await this.newsService.disconnect();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.6", ngImport: i0, type: NewsInfoComponent, deps: [{ token: i1$1.HttpClient }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.6", type: NewsInfoComponent, isStandalone: true, selector: "his-news-info", ngImport: i0, template: "<!-- eslint-disable @angular-eslint/template/elements-content -->\n<div class=\"content-container\">\n  <div class=\"top-bar-container\">\n    <p-avatar\n\n        styleClass=\"mr-2\"\n        size=\"xlarge\"\n        shape=\"circle\"\n      ></p-avatar>\n      <div class=\"title\" [innerText]=\"'greeting'|translate\"></div>\n  </div>\n  <div class=\"toolbar-container\">\n      <div class=\"icon-container\">\n        <button\n          pButton\n          pRipple\n          type=\"button\"\n          icon=\"pi pi-angle-left\"\n          class=\"p-button-rounded p-button-secondary p-button-outlined\"\n          (click)=\"onBackClick()\"\n        ></button>\n        <div><h3 [innerText]=\"'latestNews'|translate\"></h3></div>\n      </div>\n  </div>\n  <div class=\"flex flex-column\">\n    <p-fieldset [legend]=\"'todolist'|translate\" [toggleable]=\"true\" class=\"first\">\n      <ng-template pTemplate=\"expandicon\">\n        <div >\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"toDoList()\"\n        class=\"news-container\"\n        [customTemplate]=\"customTemplateUnfinish\"\n      ></his-news-list>\n    </p-fieldset>\n\n    <p-fieldset [legend]=\"'normalNews'|translate\" [toggleable]=\"true\" class=\"second\">\n      <ng-template pTemplate=\"expandicon\">\n        <div>\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"normalNews()\"\n        class=\"news-container\"\n        [customTemplate]=\"customTemplateAnnouncement\"\n      ></his-news-list>\n    </p-fieldset>\n\n    <p-fieldset [legend]=\"'checkedToDoList'|translate\" [toggleable]=\"true\" class=\"third\">\n      <ng-template pTemplate=\"expandicon\">\n        <div>\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"checkedToDoList()\"\n        class=\"news-container\"\n        [customTemplate]=\"customTemplateToDoListChecked\"\n      ></his-news-list>\n    </p-fieldset>\n\n    <p-fieldset [legend]=\"'checkedNormalNews'|translate\" [toggleable]=\"true\" class=\"fourth\">\n      <ng-template pTemplate=\"expandicon\">\n        <div>\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"checkedNormalNews()\"\n        class=\"news-container\"\n        [customTemplate]=\"customTemplateAnnouncementChecked\"\n      ></his-news-list>\n    </p-fieldset>\n  </div>\n</div>\n\n<ng-template #customTemplateUnfinish>\n  <p-table\n    [value]=\"toDoList()\"\n    [tableStyle]=\"{ width: '100%' }\"\n  >\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>\n          <button\n            pButton\n            pRipple\n            type=\"button\"\n            [label]=\"'complete' |translate\"\n            class=\"p-button-outlined\"\n            (click)=\"onChangeStatus(news.userCode, news._id)\"\n\n          ></button>\n        </td>\n        <td>\n          <span class=\"label-m\">{{ news.period.start.toLocaleString() }}</span>\n        </td>\n        <td>\n          <span class=\"label-m\">{{ news.subject }}</span>\n        </td>\n        <td>\n          <span>\n            <p-button #navButton [label]=\"'clickToEnter'|translate\" styleClass=\"p-button-link\" (click)=\"onNavNewsClick(news.url,news.sharedData)\"></p-button>\n          </span>\n        </td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n\n<ng-template #customTemplateAnnouncement>\n  <p-table\n    [value]=\"normalNews()\"\n    [tableStyle]=\"{ width: '100%' }\"\n  >\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>\n          <button\n            pButton\n            pRipple\n            type=\"button\"\n            [label]=\"'checked'|translate\"\n            class=\"p-button-outlined\"\n            (click)=\"onChangeStatus(news.userCode, news._id)\"\n          ></button>\n        </td>\n        <td>{{ news.period.start.toLocaleString() }}</td>\n        <td>\n          <span class=\"label-m\">{{ news.subject }}</span>\n        </td>\n        <td>\n          <span>\n            <p-button #navButton [label]=\"'clickToEnter'|translate\" styleClass=\"p-button-link\" (click)=\"onNavNewsClick(news.url,news.sharedData)\"></p-button>\n          </span>\n        </td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n\n<ng-template #customTemplateToDoListChecked>\n  <p-table\n    [value]=\"checkedToDoList()\"\n    [tableStyle]=\"{ width: '100%' }\"\n  >\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>{{ news.period.start.toLocaleString() }}</td>\n        <td>\n          <span class=\"label-m\">{{ news.subject }}</span>\n        </td>\n        <td>\n          <span>\n          </span>\n        </td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n\n<ng-template #customTemplateAnnouncementChecked>\n  <p-table\n    [value]=\"checkedNormalNews()\"\n    [tableStyle]=\"{ width: '100%' }\"\n  >\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>{{ news.period.start.toLocaleString() }}</td>\n        <td>\n          <span class=\"label-m\">{{ news.subject }}</span>\n        </td>\n        <td>\n          <span>\n          </span>\n        </td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n", styles: [".top-bar-container{display:flex;flex-direction:row;align-items:center}.icon-container{display:flex;justify-content:space-between;align-items:center;gap:12px}.icon-container h3{font-size:1.5rem;font-style:normal;font-weight:700;line-height:2rem;letter-spacing:.03rem;color:var(--surface-on-surface)}.content-container{padding:32px;height:100%;gap:16px;display:flex;flex-direction:column;background-color:var(--surface-ground)}.flex-column{gap:26px}:host ::ng-deep p-fieldset .p-fieldset-toggleable .p-fieldset-legend{padding:0;margin-left:24px;transition:background-color .2s,color .2s,box-shadow .2s}:host ::ng-deep p-fieldset .p-fieldset-toggleable .p-fieldset-legend a{min-height:34px;padding:var(--spacing-xs) var(--spacing-md)}:host ::ng-deep p-fieldset .p-fieldset-legend>a{flex-direction:row-reverse}:host ::ng-deep p-fieldset .p-fieldset.p-fieldset-toggleable .p-fieldset-legend a .p-fieldset-toggler{margin-right:0;margin-left:.5rem}:host ::ng-deep p-fieldset.first .p-fieldset-toggleable .p-fieldset-legend{background-color:var(--tertiary-main)}:host ::ng-deep p-fieldset.first .p-fieldset-toggleable .p-fieldset-legend a{color:var(--white)}:host ::ng-deep p-fieldset.second .p-fieldset-toggleable .p-fieldset-legend{background-color:var(--primary-main)}:host ::ng-deep p-fieldset.second .p-fieldset-toggleable .p-fieldset-legend a{color:#f6f6f6}:host ::ng-deep p-fieldset.third .p-fieldset-toggleable .p-fieldset-legend{background-color:var(--surface-section)}:host ::ng-deep p-fieldset.third .p-fieldset-toggleable .p-fieldset-legend a{color:var(--surface-on-surface)}:host ::ng-deep .p-datatable{height:100%;background:#fff;font-style:normal;font-weight:400;line-height:20px;letter-spacing:.16px;color:var(--surface-on-surface)}:host ::ng-deep .p-datatable .p-datatable-tbody>tr{width:100%}:host ::ng-deep .p-datatable .p-datatable-tbody>tr:last-child>td{border-bottom:none}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td{padding:8px 0}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:first-child{width:5%;min-width:45px}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:first-child .p-button{min-width:60px}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:nth-child(2){width:10%}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:last-child{width:10%}:host ::ng-deep .p-fieldset{border-radius:12px}:host ::ng-deep .p-fieldset .p-fieldset-content{padding:8px 12px}.title{padding-left:24px;font-size:28px;font-weight:700;line-height:40px;letter-spacing:1.12px;color:var(--primary-main)}.toolbar-container{display:flex;flex-direction:row;width:100%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: NewsListComponent, selector: "his-news-list", inputs: ["news", "customTemplate"], outputs: ["navigationData"] }, { kind: "ngmodule", type: TableModule }, { kind: "component", type: i2.Table, selector: "p-table", inputs: ["frozenColumns", "frozenValue", "style", "styleClass", "tableStyle", "tableStyleClass", "paginator", "pageLinks", "rowsPerPageOptions", "alwaysShowPaginator", "paginatorPosition", "paginatorStyleClass", "paginatorDropdownAppendTo", "paginatorDropdownScrollHeight", "currentPageReportTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showJumpToPageInput", "showFirstLastIcon", "showPageLinks", "defaultSortOrder", "sortMode", "resetPageOnSort", "selectionMode", "selectionPageOnly", "contextMenuSelection", "contextMenuSelectionMode", "dataKey", "metaKeySelection", "rowSelectable", "rowTrackBy", "lazy", "lazyLoadOnInit", "compareSelectionBy", "csvSeparator", "exportFilename", "filters", "globalFilterFields", "filterDelay", "filterLocale", "expandedRowKeys", "editingRowKeys", "rowExpandMode", "scrollable", "scrollDirection", "rowGroupMode", "scrollHeight", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "virtualScrollDelay", "frozenWidth", "responsive", "contextMenu", "resizableColumns", "columnResizeMode", "reorderableColumns", "loading", "loadingIcon", "showLoader", "rowHover", "customSort", "showInitialSortBadge", "autoLayout", "exportFunction", "exportHeader", "stateKey", "stateStorage", "editMode", "groupRowsBy", "groupRowsByOrder", "responsiveLayout", "breakpoint", "paginatorLocale", "value", "columns", "first", "rows", "totalRecords", "sortField", "sortOrder", "multiSortMeta", "selection", "selectAll", "virtualRowHeight"], outputs: ["contextMenuSelectionChange", "selectAllChange", "selectionChange", "onRowSelect", "onRowUnselect", "onPage", "onSort", "onFilter", "onLazyLoad", "onRowExpand", "onRowCollapse", "onContextMenuSelect", "onColResize", "onColReorder", "onRowReorder", "onEditInit", "onEditComplete", "onEditCancel", "onHeaderCheckboxToggle", "sortFunction", "firstChange", "rowsChange", "onStateSave", "onStateRestore"] }, { kind: "directive", type: i3.PrimeTemplate, selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "ngmodule", type: FieldsetModule }, { kind: "component", type: i4.Fieldset, selector: "p-fieldset", inputs: ["legend", "toggleable", "collapsed", "style", "styleClass", "transitionOptions"], outputs: ["collapsedChange", "onBeforeToggle", "onAfterToggle"] }, { kind: "ngmodule", type: ButtonModule }, { kind: "directive", type: i5.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }, { kind: "component", type: i5.Button, selector: "p-button", inputs: ["type", "iconPos", "icon", "badge", "label", "disabled", "loading", "loadingIcon", "style", "styleClass", "badgeClass", "ariaLabel"], outputs: ["onClick", "onFocus", "onBlur"] }, { kind: "ngmodule", type: AvatarModule }, { kind: "component", type: i6.Avatar, selector: "p-avatar", inputs: ["label", "icon", "image", "size", "shape", "style", "styleClass", "ariaLabel", "ariaLabelledBy"], outputs: ["onImageError"] }, { kind: "ngmodule", type: TranslateModule }, { kind: "pipe", type: i5$1.TranslatePipe, name: "translate" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.6", ngImport: i0, type: NewsInfoComponent, decorators: [{
            type: Component,
            args: [{ selector: 'his-news-info', standalone: true, imports: [CommonModule, NewsListComponent, TableModule, FieldsetModule, ButtonModule, AvatarModule, RouterOutlet, TranslateModule], template: "<!-- eslint-disable @angular-eslint/template/elements-content -->\n<div class=\"content-container\">\n  <div class=\"top-bar-container\">\n    <p-avatar\n\n        styleClass=\"mr-2\"\n        size=\"xlarge\"\n        shape=\"circle\"\n      ></p-avatar>\n      <div class=\"title\" [innerText]=\"'greeting'|translate\"></div>\n  </div>\n  <div class=\"toolbar-container\">\n      <div class=\"icon-container\">\n        <button\n          pButton\n          pRipple\n          type=\"button\"\n          icon=\"pi pi-angle-left\"\n          class=\"p-button-rounded p-button-secondary p-button-outlined\"\n          (click)=\"onBackClick()\"\n        ></button>\n        <div><h3 [innerText]=\"'latestNews'|translate\"></h3></div>\n      </div>\n  </div>\n  <div class=\"flex flex-column\">\n    <p-fieldset [legend]=\"'todolist'|translate\" [toggleable]=\"true\" class=\"first\">\n      <ng-template pTemplate=\"expandicon\">\n        <div >\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"toDoList()\"\n        class=\"news-container\"\n        [customTemplate]=\"customTemplateUnfinish\"\n      ></his-news-list>\n    </p-fieldset>\n\n    <p-fieldset [legend]=\"'normalNews'|translate\" [toggleable]=\"true\" class=\"second\">\n      <ng-template pTemplate=\"expandicon\">\n        <div>\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"normalNews()\"\n        class=\"news-container\"\n        [customTemplate]=\"customTemplateAnnouncement\"\n      ></his-news-list>\n    </p-fieldset>\n\n    <p-fieldset [legend]=\"'checkedToDoList'|translate\" [toggleable]=\"true\" class=\"third\">\n      <ng-template pTemplate=\"expandicon\">\n        <div>\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"checkedToDoList()\"\n        class=\"news-container\"\n        [customTemplate]=\"customTemplateToDoListChecked\"\n      ></his-news-list>\n    </p-fieldset>\n\n    <p-fieldset [legend]=\"'checkedNormalNews'|translate\" [toggleable]=\"true\" class=\"fourth\">\n      <ng-template pTemplate=\"expandicon\">\n        <div>\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"checkedNormalNews()\"\n        class=\"news-container\"\n        [customTemplate]=\"customTemplateAnnouncementChecked\"\n      ></his-news-list>\n    </p-fieldset>\n  </div>\n</div>\n\n<ng-template #customTemplateUnfinish>\n  <p-table\n    [value]=\"toDoList()\"\n    [tableStyle]=\"{ width: '100%' }\"\n  >\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>\n          <button\n            pButton\n            pRipple\n            type=\"button\"\n            [label]=\"'complete' |translate\"\n            class=\"p-button-outlined\"\n            (click)=\"onChangeStatus(news.userCode, news._id)\"\n\n          ></button>\n        </td>\n        <td>\n          <span class=\"label-m\">{{ news.period.start.toLocaleString() }}</span>\n        </td>\n        <td>\n          <span class=\"label-m\">{{ news.subject }}</span>\n        </td>\n        <td>\n          <span>\n            <p-button #navButton [label]=\"'clickToEnter'|translate\" styleClass=\"p-button-link\" (click)=\"onNavNewsClick(news.url,news.sharedData)\"></p-button>\n          </span>\n        </td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n\n<ng-template #customTemplateAnnouncement>\n  <p-table\n    [value]=\"normalNews()\"\n    [tableStyle]=\"{ width: '100%' }\"\n  >\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>\n          <button\n            pButton\n            pRipple\n            type=\"button\"\n            [label]=\"'checked'|translate\"\n            class=\"p-button-outlined\"\n            (click)=\"onChangeStatus(news.userCode, news._id)\"\n          ></button>\n        </td>\n        <td>{{ news.period.start.toLocaleString() }}</td>\n        <td>\n          <span class=\"label-m\">{{ news.subject }}</span>\n        </td>\n        <td>\n          <span>\n            <p-button #navButton [label]=\"'clickToEnter'|translate\" styleClass=\"p-button-link\" (click)=\"onNavNewsClick(news.url,news.sharedData)\"></p-button>\n          </span>\n        </td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n\n<ng-template #customTemplateToDoListChecked>\n  <p-table\n    [value]=\"checkedToDoList()\"\n    [tableStyle]=\"{ width: '100%' }\"\n  >\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>{{ news.period.start.toLocaleString() }}</td>\n        <td>\n          <span class=\"label-m\">{{ news.subject }}</span>\n        </td>\n        <td>\n          <span>\n          </span>\n        </td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n\n<ng-template #customTemplateAnnouncementChecked>\n  <p-table\n    [value]=\"checkedNormalNews()\"\n    [tableStyle]=\"{ width: '100%' }\"\n  >\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>{{ news.period.start.toLocaleString() }}</td>\n        <td>\n          <span class=\"label-m\">{{ news.subject }}</span>\n        </td>\n        <td>\n          <span>\n          </span>\n        </td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n", styles: [".top-bar-container{display:flex;flex-direction:row;align-items:center}.icon-container{display:flex;justify-content:space-between;align-items:center;gap:12px}.icon-container h3{font-size:1.5rem;font-style:normal;font-weight:700;line-height:2rem;letter-spacing:.03rem;color:var(--surface-on-surface)}.content-container{padding:32px;height:100%;gap:16px;display:flex;flex-direction:column;background-color:var(--surface-ground)}.flex-column{gap:26px}:host ::ng-deep p-fieldset .p-fieldset-toggleable .p-fieldset-legend{padding:0;margin-left:24px;transition:background-color .2s,color .2s,box-shadow .2s}:host ::ng-deep p-fieldset .p-fieldset-toggleable .p-fieldset-legend a{min-height:34px;padding:var(--spacing-xs) var(--spacing-md)}:host ::ng-deep p-fieldset .p-fieldset-legend>a{flex-direction:row-reverse}:host ::ng-deep p-fieldset .p-fieldset.p-fieldset-toggleable .p-fieldset-legend a .p-fieldset-toggler{margin-right:0;margin-left:.5rem}:host ::ng-deep p-fieldset.first .p-fieldset-toggleable .p-fieldset-legend{background-color:var(--tertiary-main)}:host ::ng-deep p-fieldset.first .p-fieldset-toggleable .p-fieldset-legend a{color:var(--white)}:host ::ng-deep p-fieldset.second .p-fieldset-toggleable .p-fieldset-legend{background-color:var(--primary-main)}:host ::ng-deep p-fieldset.second .p-fieldset-toggleable .p-fieldset-legend a{color:#f6f6f6}:host ::ng-deep p-fieldset.third .p-fieldset-toggleable .p-fieldset-legend{background-color:var(--surface-section)}:host ::ng-deep p-fieldset.third .p-fieldset-toggleable .p-fieldset-legend a{color:var(--surface-on-surface)}:host ::ng-deep .p-datatable{height:100%;background:#fff;font-style:normal;font-weight:400;line-height:20px;letter-spacing:.16px;color:var(--surface-on-surface)}:host ::ng-deep .p-datatable .p-datatable-tbody>tr{width:100%}:host ::ng-deep .p-datatable .p-datatable-tbody>tr:last-child>td{border-bottom:none}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td{padding:8px 0}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:first-child{width:5%;min-width:45px}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:first-child .p-button{min-width:60px}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:nth-child(2){width:10%}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:last-child{width:10%}:host ::ng-deep .p-fieldset{border-radius:12px}:host ::ng-deep .p-fieldset .p-fieldset-content{padding:8px 12px}.title{padding-left:24px;font-size:28px;font-weight:700;line-height:40px;letter-spacing:1.12px;color:var(--primary-main)}.toolbar-container{display:flex;flex-direction:row;width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.HttpClient }]; } });

/*
 * Public API Surface of news-info
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NewsInfoComponent, NewsListComponent, NewsService };
//# sourceMappingURL=his-view-news-info.mjs.map
