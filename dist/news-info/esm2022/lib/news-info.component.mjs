/* eslint-disable @angular-eslint/component-selector */
import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from './news.service';
import { NewsListComponent } from './news-list/news-list.component';
import { TableModule } from 'primeng/table';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { Router, RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '@his-base/shared';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/table";
import * as i3 from "primeng/api";
import * as i4 from "primeng/fieldset";
import * as i5 from "primeng/button";
import * as i6 from "primeng/avatar";
import * as i7 from "@ngx-translate/core";
export class NewsInfoComponent {
    constructor() {
        /** 使用computed變數儲存各最新消息的資訊
         *  @memberof NewsInfoComponent
         */
        this.news = computed(() => this.newsService.news());
        this.normalNews = computed(() => this.newsService.normalNews());
        this.toDoList = computed(() => this.newsService.toDoList());
        this.checkedNormalNews = computed(() => this.newsService.checkedNormalNews());
        this.checkedToDoList = computed(() => this.newsService.checkedToDoList());
        this.newsService = inject(NewsService);
        this.sharedService = inject(SharedService);
        this.httpClient = inject(HttpClient);
        this.#router = inject(Router);
    }
    #router;
    /** 建立連線、訂閱最新消息、初始化最新消息
     *  @memberof NewsInfoComponent
     */
    async ngOnInit() {
        this.httpClient.get('http://localhost:4321/assets/mockUserCode/mockUserCode.json')
            .subscribe(userCode => {
            this.userCode = userCode;
        });
        await this.newsService.connect();
        await this.newsService.subNews();
        this.newsService.publishUserCode(this.userCode);
    }
    /** 跳轉到上一頁
     *  @memberof NewsInfoComponent
     */
    onBackClick() {
        window.history.back();
    }
    /** 跳轉到appUrl路徑的位置，並使用sharedService傳送資訊
     *  @memberof NewsInfoComponent
     */
    onNavNewsClick(appUrl, sharedData) {
        const key = this.sharedService.setValue(sharedData);
        this.#router.navigate([appUrl], { state: { token: key } });
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.6", ngImport: i0, type: NewsInfoComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.6", type: NewsInfoComponent, isStandalone: true, selector: "his-news-info", ngImport: i0, template: "<!-- eslint-disable @angular-eslint/template/elements-content -->\n<div class=\"content-container\">\n  <div class=\"top-bar-container\">\n    <p-avatar\n\n        styleClass=\"mr-2\"\n        size=\"xlarge\"\n        shape=\"circle\"\n      ></p-avatar>\n      <div class=\"title\" [innerText]=\"'greeting'|translate\"></div>\n  </div>\n  <div class=\"toolbar-container\">\n      <div class=\"icon-container\">\n        <button\n          pButton\n          pRipple\n          type=\"button\"\n          icon=\"pi pi-angle-left\"\n          class=\"p-button-rounded p-button-secondary p-button-outlined\"\n          (click)=\"onBackClick()\"\n        ></button>\n        <div><h3 [innerText]=\"'latestNews'|translate\"></h3></div>\n      </div>\n  </div>\n  <div class=\"flex flex-column\">\n    <p-fieldset [legend]=\"'todolist'|translate\" [toggleable]=\"true\" class=\"first\">\n      <ng-template pTemplate=\"expandicon\">\n        <div >\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"toDoList()\"\n        class=\"news-container\"\n      ></his-news-list>\n    </p-fieldset>\n\n    <p-fieldset [legend]=\"'normalNews'|translate\" [toggleable]=\"true\" class=\"second\">\n      <ng-template pTemplate=\"expandicon\">\n        <div>\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"normalNews()\"\n        class=\"news-container\"\n      ></his-news-list>\n    </p-fieldset>\n\n    <p-fieldset [legend]=\"'checkedToDoList'|translate\" [toggleable]=\"true\" class=\"third\">\n      <ng-template pTemplate=\"expandicon\">\n        <div>\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"checkedToDoList()\"\n        class=\"news-container\"\n      ></his-news-list>\n    </p-fieldset>\n\n    <p-fieldset [legend]=\"'checkedNormalNews'|translate\" [toggleable]=\"true\" class=\"fourth\">\n      <ng-template pTemplate=\"expandicon\">\n        <div>\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"checkedNormalNews()\"\n        class=\"news-container\"\n      ></his-news-list>\n    </p-fieldset>\n  </div>\n</div>\n\n<ng-template #customtemplate>\n  <p-table\n    [value]=\"toDoList()\"\n    [tableStyle]=\"{ width: '100%' }\">\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>\n          <span *ngIf=\"news.execStatus['code'] === '10'\">\n            <button\n              pButton\n              pRipple\n              type=\"button\"\n              [label]=\"'complete' |translate\"\n              class=\"p-button-outlined\"\n              (click)=\"onChangeStatus(news.userCode, news._id)\"\n            ></button>\n          </span>\n        </td>\n        <td>\n          <span class=\"label-m\">{{ news.period.start.toLocaleString() }}</span>\n        </td>\n        <td>\n          <span class=\"label-m\">{{ news.subject }}</span>\n        </td>\n        <td>\n          <span *ngIf=\"news.url\">\n            <p-button #navButton [label]=\"'clickToEnter'|translate\" styleClass=\"p-button-link\" (click)=\"onNavNewsClick(news.url,news.sharedData)\"></p-button>\n          </span>\n        </td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n", styles: [".top-bar-container{display:flex;flex-direction:row;align-items:center}.icon-container{display:flex;justify-content:space-between;align-items:center;gap:12px}.icon-container h3{font-size:1.5rem;font-style:normal;font-weight:700;line-height:2rem;letter-spacing:.03rem;color:var(--surface-on-surface)}.content-container{padding:32px;height:100%;gap:16px;display:flex;flex-direction:column;background-color:var(--surface-ground)}.flex-column{gap:26px}:host ::ng-deep p-fieldset .p-fieldset-toggleable .p-fieldset-legend{padding:0;margin-left:6px;transition:background-color .2s,color .2s,box-shadow .2s}:host ::ng-deep p-fieldset .p-fieldset-toggleable .p-fieldset-legend a{min-height:34px;padding:var(--spacing-xs) var(--spacing-md)}:host ::ng-deep p-fieldset .p-fieldset-legend>a{flex-direction:row-reverse}:host ::ng-deep p-fieldset .p-fieldset.p-fieldset-toggleable .p-fieldset-legend a .p-fieldset-toggler{margin-right:0;margin-left:.5rem}:host ::ng-deep p-fieldset.first .p-fieldset-toggleable .p-fieldset-legend{background-color:var(--tertiary-main)}:host ::ng-deep p-fieldset.first .p-fieldset-toggleable .p-fieldset-legend a{color:var(--white)}:host ::ng-deep p-fieldset.second .p-fieldset-toggleable .p-fieldset-legend{background-color:var(--primary-main)}:host ::ng-deep p-fieldset.second .p-fieldset-toggleable .p-fieldset-legend a{color:#f6f6f6}:host ::ng-deep p-fieldset.third .p-fieldset-toggleable .p-fieldset-legend{background-color:var(--surface-section)}:host ::ng-deep p-fieldset.third .p-fieldset-toggleable .p-fieldset-legend a{color:var(--surface-on-surface)}:host ::ng-deep .p-datatable{height:100%;background:#fff;font-style:normal;font-weight:400;line-height:20px;letter-spacing:.16px;color:var(--surface-on-surface)}:host ::ng-deep .p-datatable .p-datatable-tbody>tr{width:100%}:host ::ng-deep .p-datatable .p-datatable-tbody>tr:last-child>td{border-bottom:none}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td{padding:8px 0}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:first-child{width:5%;min-width:45px}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:first-child .p-button{min-width:60px}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:nth-child(2){width:10%}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:last-child{width:10%}:host ::ng-deep .p-fieldset{border-radius:12px}:host ::ng-deep .p-fieldset .p-fieldset-content{padding:8px 12px}.title{padding-left:24px;font-size:28px;font-weight:700;line-height:40px;letter-spacing:1.12px;color:var(--primary-main)}.toolbar-container{display:flex;flex-direction:row;width:100%}.p-button{color:#fff;background:var(--primary-main);border:0 none;padding:4px 12px;font-size:1rem;transition:background-color .2s,border-color .2s,color .2s,box-shadow .2s,background-size .2s cubic-bezier(.64,.09,.08,1);border-radius:6px}.check-button{width:88px;height:32px;padding:4px,12px,4px,12px;border-radius:20px;border:1px;gap:4px}.news-container{margin-left:6px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: NewsListComponent, selector: "his-news-list", inputs: ["news", "customTemplate"] }, { kind: "ngmodule", type: TableModule }, { kind: "component", type: i2.Table, selector: "p-table", inputs: ["frozenColumns", "frozenValue", "style", "styleClass", "tableStyle", "tableStyleClass", "paginator", "pageLinks", "rowsPerPageOptions", "alwaysShowPaginator", "paginatorPosition", "paginatorStyleClass", "paginatorDropdownAppendTo", "paginatorDropdownScrollHeight", "currentPageReportTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showJumpToPageInput", "showFirstLastIcon", "showPageLinks", "defaultSortOrder", "sortMode", "resetPageOnSort", "selectionMode", "selectionPageOnly", "contextMenuSelection", "contextMenuSelectionMode", "dataKey", "metaKeySelection", "rowSelectable", "rowTrackBy", "lazy", "lazyLoadOnInit", "compareSelectionBy", "csvSeparator", "exportFilename", "filters", "globalFilterFields", "filterDelay", "filterLocale", "expandedRowKeys", "editingRowKeys", "rowExpandMode", "scrollable", "scrollDirection", "rowGroupMode", "scrollHeight", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "virtualScrollDelay", "frozenWidth", "responsive", "contextMenu", "resizableColumns", "columnResizeMode", "reorderableColumns", "loading", "loadingIcon", "showLoader", "rowHover", "customSort", "showInitialSortBadge", "autoLayout", "exportFunction", "exportHeader", "stateKey", "stateStorage", "editMode", "groupRowsBy", "groupRowsByOrder", "responsiveLayout", "breakpoint", "paginatorLocale", "value", "columns", "first", "rows", "totalRecords", "sortField", "sortOrder", "multiSortMeta", "selection", "selectAll", "virtualRowHeight"], outputs: ["contextMenuSelectionChange", "selectAllChange", "selectionChange", "onRowSelect", "onRowUnselect", "onPage", "onSort", "onFilter", "onLazyLoad", "onRowExpand", "onRowCollapse", "onContextMenuSelect", "onColResize", "onColReorder", "onRowReorder", "onEditInit", "onEditComplete", "onEditCancel", "onHeaderCheckboxToggle", "sortFunction", "firstChange", "rowsChange", "onStateSave", "onStateRestore"] }, { kind: "directive", type: i3.PrimeTemplate, selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "ngmodule", type: FieldsetModule }, { kind: "component", type: i4.Fieldset, selector: "p-fieldset", inputs: ["legend", "toggleable", "collapsed", "style", "styleClass", "transitionOptions"], outputs: ["collapsedChange", "onBeforeToggle", "onAfterToggle"] }, { kind: "ngmodule", type: ButtonModule }, { kind: "directive", type: i5.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }, { kind: "component", type: i5.Button, selector: "p-button", inputs: ["type", "iconPos", "icon", "badge", "label", "disabled", "loading", "loadingIcon", "style", "styleClass", "badgeClass", "ariaLabel"], outputs: ["onClick", "onFocus", "onBlur"] }, { kind: "ngmodule", type: AvatarModule }, { kind: "component", type: i6.Avatar, selector: "p-avatar", inputs: ["label", "icon", "image", "size", "shape", "style", "styleClass", "ariaLabel", "ariaLabelledBy"], outputs: ["onImageError"] }, { kind: "ngmodule", type: TranslateModule }, { kind: "pipe", type: i7.TranslatePipe, name: "translate" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.6", ngImport: i0, type: NewsInfoComponent, decorators: [{
            type: Component,
            args: [{ selector: 'his-news-info', standalone: true, imports: [CommonModule, NewsListComponent, TableModule, FieldsetModule, ButtonModule, AvatarModule, RouterOutlet, TranslateModule], template: "<!-- eslint-disable @angular-eslint/template/elements-content -->\n<div class=\"content-container\">\n  <div class=\"top-bar-container\">\n    <p-avatar\n\n        styleClass=\"mr-2\"\n        size=\"xlarge\"\n        shape=\"circle\"\n      ></p-avatar>\n      <div class=\"title\" [innerText]=\"'greeting'|translate\"></div>\n  </div>\n  <div class=\"toolbar-container\">\n      <div class=\"icon-container\">\n        <button\n          pButton\n          pRipple\n          type=\"button\"\n          icon=\"pi pi-angle-left\"\n          class=\"p-button-rounded p-button-secondary p-button-outlined\"\n          (click)=\"onBackClick()\"\n        ></button>\n        <div><h3 [innerText]=\"'latestNews'|translate\"></h3></div>\n      </div>\n  </div>\n  <div class=\"flex flex-column\">\n    <p-fieldset [legend]=\"'todolist'|translate\" [toggleable]=\"true\" class=\"first\">\n      <ng-template pTemplate=\"expandicon\">\n        <div >\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"toDoList()\"\n        class=\"news-container\"\n      ></his-news-list>\n    </p-fieldset>\n\n    <p-fieldset [legend]=\"'normalNews'|translate\" [toggleable]=\"true\" class=\"second\">\n      <ng-template pTemplate=\"expandicon\">\n        <div>\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"normalNews()\"\n        class=\"news-container\"\n      ></his-news-list>\n    </p-fieldset>\n\n    <p-fieldset [legend]=\"'checkedToDoList'|translate\" [toggleable]=\"true\" class=\"third\">\n      <ng-template pTemplate=\"expandicon\">\n        <div>\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"checkedToDoList()\"\n        class=\"news-container\"\n      ></his-news-list>\n    </p-fieldset>\n\n    <p-fieldset [legend]=\"'checkedNormalNews'|translate\" [toggleable]=\"true\" class=\"fourth\">\n      <ng-template pTemplate=\"expandicon\">\n        <div>\n          <span class=\"pi pi-chevron-down\"></span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"collapseicon\">\n        <div>\n          <span class=\"pi pi-chevron-up\"></span>\n        </div>\n      </ng-template>\n      <his-news-list\n        [news]=\"checkedNormalNews()\"\n        class=\"news-container\"\n      ></his-news-list>\n    </p-fieldset>\n  </div>\n</div>\n\n<ng-template #customtemplate>\n  <p-table\n    [value]=\"toDoList()\"\n    [tableStyle]=\"{ width: '100%' }\">\n    <ng-template pTemplate=\"body\" let-news>\n      <tr>\n        <td>\n          <span *ngIf=\"news.execStatus['code'] === '10'\">\n            <button\n              pButton\n              pRipple\n              type=\"button\"\n              [label]=\"'complete' |translate\"\n              class=\"p-button-outlined\"\n              (click)=\"onChangeStatus(news.userCode, news._id)\"\n            ></button>\n          </span>\n        </td>\n        <td>\n          <span class=\"label-m\">{{ news.period.start.toLocaleString() }}</span>\n        </td>\n        <td>\n          <span class=\"label-m\">{{ news.subject }}</span>\n        </td>\n        <td>\n          <span *ngIf=\"news.url\">\n            <p-button #navButton [label]=\"'clickToEnter'|translate\" styleClass=\"p-button-link\" (click)=\"onNavNewsClick(news.url,news.sharedData)\"></p-button>\n          </span>\n        </td>\n      </tr>\n    </ng-template>\n  </p-table>\n</ng-template>\n", styles: [".top-bar-container{display:flex;flex-direction:row;align-items:center}.icon-container{display:flex;justify-content:space-between;align-items:center;gap:12px}.icon-container h3{font-size:1.5rem;font-style:normal;font-weight:700;line-height:2rem;letter-spacing:.03rem;color:var(--surface-on-surface)}.content-container{padding:32px;height:100%;gap:16px;display:flex;flex-direction:column;background-color:var(--surface-ground)}.flex-column{gap:26px}:host ::ng-deep p-fieldset .p-fieldset-toggleable .p-fieldset-legend{padding:0;margin-left:6px;transition:background-color .2s,color .2s,box-shadow .2s}:host ::ng-deep p-fieldset .p-fieldset-toggleable .p-fieldset-legend a{min-height:34px;padding:var(--spacing-xs) var(--spacing-md)}:host ::ng-deep p-fieldset .p-fieldset-legend>a{flex-direction:row-reverse}:host ::ng-deep p-fieldset .p-fieldset.p-fieldset-toggleable .p-fieldset-legend a .p-fieldset-toggler{margin-right:0;margin-left:.5rem}:host ::ng-deep p-fieldset.first .p-fieldset-toggleable .p-fieldset-legend{background-color:var(--tertiary-main)}:host ::ng-deep p-fieldset.first .p-fieldset-toggleable .p-fieldset-legend a{color:var(--white)}:host ::ng-deep p-fieldset.second .p-fieldset-toggleable .p-fieldset-legend{background-color:var(--primary-main)}:host ::ng-deep p-fieldset.second .p-fieldset-toggleable .p-fieldset-legend a{color:#f6f6f6}:host ::ng-deep p-fieldset.third .p-fieldset-toggleable .p-fieldset-legend{background-color:var(--surface-section)}:host ::ng-deep p-fieldset.third .p-fieldset-toggleable .p-fieldset-legend a{color:var(--surface-on-surface)}:host ::ng-deep .p-datatable{height:100%;background:#fff;font-style:normal;font-weight:400;line-height:20px;letter-spacing:.16px;color:var(--surface-on-surface)}:host ::ng-deep .p-datatable .p-datatable-tbody>tr{width:100%}:host ::ng-deep .p-datatable .p-datatable-tbody>tr:last-child>td{border-bottom:none}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td{padding:8px 0}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:first-child{width:5%;min-width:45px}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:first-child .p-button{min-width:60px}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:nth-child(2){width:10%}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td:last-child{width:10%}:host ::ng-deep .p-fieldset{border-radius:12px}:host ::ng-deep .p-fieldset .p-fieldset-content{padding:8px 12px}.title{padding-left:24px;font-size:28px;font-weight:700;line-height:40px;letter-spacing:1.12px;color:var(--primary-main)}.toolbar-container{display:flex;flex-direction:row;width:100%}.p-button{color:#fff;background:var(--primary-main);border:0 none;padding:4px 12px;font-size:1rem;transition:background-color .2s,border-color .2s,color .2s,box-shadow .2s,background-size .2s cubic-bezier(.64,.09,.08,1);border-radius:6px}.check-button{width:88px;height:32px;padding:4px,12px,4px,12px;border-radius:20px;border:1px;gap:4px}.news-container{margin-left:6px}\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3cy1pbmZvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25ld3MtaW5mby9zcmMvbGliL25ld3MtaW5mby5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9uZXdzLWluZm8vc3JjL2xpYi9uZXdzLWluZm8uY29tcG9uZW50Mi5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHVEQUF1RDtBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxRQUFRLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQTtBQUNuRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQWUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7OztBQVVqRCxNQUFNLE9BQU8saUJBQWlCO0lBUDlCO1FBVUU7O1dBRUc7UUFDSCxTQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMvQyxlQUFVLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUMzRCxhQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN2RCxzQkFBaUIsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7UUFDekUsb0JBQWUsR0FBRyxRQUFRLENBQUMsR0FBRSxFQUFFLENBQUEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO1FBT25FLGdCQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xDLGtCQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3RDLGVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDL0IsWUFBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQTRDMUI7SUE1Q0MsT0FBTyxDQUFrQjtJQUV6Qjs7T0FFRztJQUNILEtBQUssQ0FBQyxRQUFRO1FBQ1osSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsNkRBQTZELENBQUM7YUFDbEUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBa0IsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQTtRQUNoQixNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakMsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXO1FBQ1QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxjQUFjLENBQUMsTUFBYSxFQUFFLFVBQWlCO1FBQzdDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxjQUFjLENBQUMsUUFBZSxFQUFFLE1BQWE7UUFDakQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxXQUFXO1FBQ2YsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RDLENBQUM7OEdBOURVLGlCQUFpQjtrR0FBakIsaUJBQWlCLHlFQ3ZCOUIsNDhIQWdJQSxtOEZEN0dZLFlBQVksbUlBQUUsaUJBQWlCLDZGQUFFLFdBQVcsMGlFQUFFLGNBQWMsNFBBQUUsWUFBWSw4WkFBRSxZQUFZLGtPQUFlLGVBQWU7OzJGQUlySCxpQkFBaUI7a0JBUDdCLFNBQVM7K0JBQ0UsZUFBZSxjQUNiLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFDLGVBQWUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEBhbmd1bGFyLWVzbGludC9jb21wb25lbnQtc2VsZWN0b3IgKi9cbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBpbmplY3QsIGNvbXB1dGVkLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZXdzU2VydmljZSB9IGZyb20gJy4vbmV3cy5zZXJ2aWNlJztcbmltcG9ydCB7IE5ld3NMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9uZXdzLWxpc3QvbmV3cy1saXN0LmNvbXBvbmVudCdcbmltcG9ydCB7IFRhYmxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy90YWJsZSc7XG5pbXBvcnQgeyBGaWVsZHNldE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvZmllbGRzZXQnO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9idXR0b24nO1xuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZXJPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQXZhdGFyTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hdmF0YXInO1xuaW1wb3J0IHsgQ29kaW5nIH0gZnJvbSAnQGhpcy1iYXNlL2RhdGF0eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJ0BoaXMtYmFzZS9zaGFyZWQnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2hpcy1uZXdzLWluZm8nLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOZXdzTGlzdENvbXBvbmVudCwgVGFibGVNb2R1bGUsIEZpZWxkc2V0TW9kdWxlLCBCdXR0b25Nb2R1bGUsIEF2YXRhck1vZHVsZSwgUm91dGVyT3V0bGV0LFRyYW5zbGF0ZU1vZHVsZV0sXG4gIHRlbXBsYXRlVXJsOiAnLi9uZXdzLWluZm8uY29tcG9uZW50Mi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmV3cy1pbmZvLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmV3c0luZm9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveXtcblxuXG4gIC8qKiDkvb/nlKhjb21wdXRlZOiuiuaVuOWEsuWtmOWQhOacgOaWsOa2iOaBr+eahOizh+ioilxuICAgKiAgQG1lbWJlcm9mIE5ld3NJbmZvQ29tcG9uZW50XG4gICAqL1xuICBuZXdzID0gY29tcHV0ZWQoKCkgPT4gdGhpcy5uZXdzU2VydmljZS5uZXdzKCkpO1xuICBub3JtYWxOZXdzID0gY29tcHV0ZWQoKCkgPT4gdGhpcy5uZXdzU2VydmljZS5ub3JtYWxOZXdzKCkpO1xuICB0b0RvTGlzdCA9IGNvbXB1dGVkKCgpID0+IHRoaXMubmV3c1NlcnZpY2UudG9Eb0xpc3QoKSk7XG4gIGNoZWNrZWROb3JtYWxOZXdzID0gY29tcHV0ZWQoKCkgPT4gdGhpcy5uZXdzU2VydmljZS5jaGVja2VkTm9ybWFsTmV3cygpKTtcbiAgY2hlY2tlZFRvRG9MaXN0ID0gY29tcHV0ZWQoKCk9PnRoaXMubmV3c1NlcnZpY2UuY2hlY2tlZFRvRG9MaXN0KCkpO1xuXG4gIC8qKiB1c2VyQ29kZea4rOippuizh+aWmVxuICAgKiAgQG1lbWJlcm9mIE5ld3NJbmZvQ29tcG9uZW50XG4gICAqL1xuICB1c2VyQ29kZSE6Q29kaW5nXG5cbiAgbmV3c1NlcnZpY2UgPSBpbmplY3QoTmV3c1NlcnZpY2UpO1xuICBzaGFyZWRTZXJ2aWNlID0gaW5qZWN0KFNoYXJlZFNlcnZpY2UpO1xuICBodHRwQ2xpZW50ID0gaW5qZWN0KEh0dHBDbGllbnQpXG4gICNyb3V0ZXIgPSBpbmplY3QoUm91dGVyKTtcblxuICAvKiog5bu656uL6YCj57ea44CB6KiC6Zax5pyA5paw5raI5oGv44CB5Yid5aeL5YyW5pyA5paw5raI5oGvXG4gICAqICBAbWVtYmVyb2YgTmV3c0luZm9Db21wb25lbnRcbiAgICovXG4gIGFzeW5jIG5nT25Jbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuaHR0cENsaWVudC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6NDMyMS9hc3NldHMvbW9ja1VzZXJDb2RlL21vY2tVc2VyQ29kZS5qc29uJylcbiAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHVzZXJDb2RlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyQ29kZSA9IHVzZXJDb2RlIGFzIENvZGluZztcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgYXdhaXQgdGhpcy5uZXdzU2VydmljZS5jb25uZWN0KCk7XG4gICAgYXdhaXQgdGhpcy5uZXdzU2VydmljZS5zdWJOZXdzKCk7XG4gICAgdGhpcy5uZXdzU2VydmljZS5wdWJsaXNoVXNlckNvZGUodGhpcy51c2VyQ29kZSk7XG4gIH1cblxuICAvKiog6Lez6L2J5Yiw5LiK5LiA6aCBXG4gICAqICBAbWVtYmVyb2YgTmV3c0luZm9Db21wb25lbnRcbiAgICovXG4gIG9uQmFja0NsaWNrKCk6dm9pZCB7XG4gICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICB9XG5cbiAgLyoqIOi3s+i9ieWIsGFwcFVybOi3r+W+keeahOS9jee9ru+8jOS4puS9v+eUqHNoYXJlZFNlcnZpY2XlgrPpgIHos4foqIpcbiAgICogIEBtZW1iZXJvZiBOZXdzSW5mb0NvbXBvbmVudFxuICAgKi9cbiAgb25OYXZOZXdzQ2xpY2soYXBwVXJsOnN0cmluZywgc2hhcmVkRGF0YTpvYmplY3QpOnZvaWR7XG4gICAgY29uc3Qga2V5ID0gdGhpcy5zaGFyZWRTZXJ2aWNlLnNldFZhbHVlKHNoYXJlZERhdGEpXG4gICAgdGhpcy4jcm91dGVyLm5hdmlnYXRlKFthcHBVcmxdLHtzdGF0ZTp7dG9rZW46a2V5fX0pO1xuICB9XG5cbiAgLyoqIOeZvOmAgWDmnIDmlrDmtojmga/ni4DmhYvmlLnngrrlt7LoroAv5bey5a6M5oiQYOWIsG5hdHNcbiAgICogIEBtZW1iZXJvZiBOZXdzSW5mb0NvbXBvbmVudFxuICAgKi9cbiAgYXN5bmMgb25DaGFuZ2VTdGF0dXModXNlckNvZGU6Q29kaW5nLCBuZXdzSWQ6c3RyaW5nKTpQcm9taXNlPHZvaWQ+e1xuICAgIHRoaXMubmV3c1NlcnZpY2UuY2hhbmdlU3RhdHVzKHVzZXJDb2RlLCBuZXdzSWQpO1xuICB9XG5cbiAgLyoqIOa4hemZpOmAo+e3mlxuICAgKiAgQG1lbWJlcm9mIE5ld3NJbmZvQ29wb25lbnRcbiAgICovXG4gIGFzeW5jIG5nT25EZXN0cm95KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMubmV3c1NlcnZpY2UuZGlzY29ubmVjdCgpO1xuICB9XG5cbn1cbiIsIjwhLS0gZXNsaW50LWRpc2FibGUgQGFuZ3VsYXItZXNsaW50L3RlbXBsYXRlL2VsZW1lbnRzLWNvbnRlbnQgLS0+XG48ZGl2IGNsYXNzPVwiY29udGVudC1jb250YWluZXJcIj5cbiAgPGRpdiBjbGFzcz1cInRvcC1iYXItY29udGFpbmVyXCI+XG4gICAgPHAtYXZhdGFyXG5cbiAgICAgICAgc3R5bGVDbGFzcz1cIm1yLTJcIlxuICAgICAgICBzaXplPVwieGxhcmdlXCJcbiAgICAgICAgc2hhcGU9XCJjaXJjbGVcIlxuICAgICAgPjwvcC1hdmF0YXI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIiBbaW5uZXJUZXh0XT1cIidncmVldGluZyd8dHJhbnNsYXRlXCI+PC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwidG9vbGJhci1jb250YWluZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpY29uLWNvbnRhaW5lclwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgcEJ1dHRvblxuICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBpY29uPVwicGkgcGktYW5nbGUtbGVmdFwiXG4gICAgICAgICAgY2xhc3M9XCJwLWJ1dHRvbi1yb3VuZGVkIHAtYnV0dG9uLXNlY29uZGFyeSBwLWJ1dHRvbi1vdXRsaW5lZFwiXG4gICAgICAgICAgKGNsaWNrKT1cIm9uQmFja0NsaWNrKClcIlxuICAgICAgICA+PC9idXR0b24+XG4gICAgICAgIDxkaXY+PGgzIFtpbm5lclRleHRdPVwiJ2xhdGVzdE5ld3MnfHRyYW5zbGF0ZVwiPjwvaDM+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJmbGV4IGZsZXgtY29sdW1uXCI+XG4gICAgPHAtZmllbGRzZXQgW2xlZ2VuZF09XCIndG9kb2xpc3QnfHRyYW5zbGF0ZVwiIFt0b2dnbGVhYmxlXT1cInRydWVcIiBjbGFzcz1cImZpcnN0XCI+XG4gICAgICA8bmctdGVtcGxhdGUgcFRlbXBsYXRlPVwiZXhwYW5kaWNvblwiPlxuICAgICAgICA8ZGl2ID5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tZG93blwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPG5nLXRlbXBsYXRlIHBUZW1wbGF0ZT1cImNvbGxhcHNlaWNvblwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGkgcGktY2hldnJvbi11cFwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPGhpcy1uZXdzLWxpc3RcbiAgICAgICAgW25ld3NdPVwidG9Eb0xpc3QoKVwiXG4gICAgICAgIGNsYXNzPVwibmV3cy1jb250YWluZXJcIlxuICAgICAgPjwvaGlzLW5ld3MtbGlzdD5cbiAgICA8L3AtZmllbGRzZXQ+XG5cbiAgICA8cC1maWVsZHNldCBbbGVnZW5kXT1cIidub3JtYWxOZXdzJ3x0cmFuc2xhdGVcIiBbdG9nZ2xlYWJsZV09XCJ0cnVlXCIgY2xhc3M9XCJzZWNvbmRcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBwVGVtcGxhdGU9XCJleHBhbmRpY29uXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLWRvd25cIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDxuZy10ZW1wbGF0ZSBwVGVtcGxhdGU9XCJjb2xsYXBzZWljb25cIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tdXBcIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDxoaXMtbmV3cy1saXN0XG4gICAgICAgIFtuZXdzXT1cIm5vcm1hbE5ld3MoKVwiXG4gICAgICAgIGNsYXNzPVwibmV3cy1jb250YWluZXJcIlxuICAgICAgPjwvaGlzLW5ld3MtbGlzdD5cbiAgICA8L3AtZmllbGRzZXQ+XG5cbiAgICA8cC1maWVsZHNldCBbbGVnZW5kXT1cIidjaGVja2VkVG9Eb0xpc3QnfHRyYW5zbGF0ZVwiIFt0b2dnbGVhYmxlXT1cInRydWVcIiBjbGFzcz1cInRoaXJkXCI+XG4gICAgICA8bmctdGVtcGxhdGUgcFRlbXBsYXRlPVwiZXhwYW5kaWNvblwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGkgcGktY2hldnJvbi1kb3duXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8bmctdGVtcGxhdGUgcFRlbXBsYXRlPVwiY29sbGFwc2VpY29uXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLXVwXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8aGlzLW5ld3MtbGlzdFxuICAgICAgICBbbmV3c109XCJjaGVja2VkVG9Eb0xpc3QoKVwiXG4gICAgICAgIGNsYXNzPVwibmV3cy1jb250YWluZXJcIlxuICAgICAgPjwvaGlzLW5ld3MtbGlzdD5cbiAgICA8L3AtZmllbGRzZXQ+XG5cbiAgICA8cC1maWVsZHNldCBbbGVnZW5kXT1cIidjaGVja2VkTm9ybWFsTmV3cyd8dHJhbnNsYXRlXCIgW3RvZ2dsZWFibGVdPVwidHJ1ZVwiIGNsYXNzPVwiZm91cnRoXCI+XG4gICAgICA8bmctdGVtcGxhdGUgcFRlbXBsYXRlPVwiZXhwYW5kaWNvblwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGkgcGktY2hldnJvbi1kb3duXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8bmctdGVtcGxhdGUgcFRlbXBsYXRlPVwiY29sbGFwc2VpY29uXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLXVwXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8aGlzLW5ld3MtbGlzdFxuICAgICAgICBbbmV3c109XCJjaGVja2VkTm9ybWFsTmV3cygpXCJcbiAgICAgICAgY2xhc3M9XCJuZXdzLWNvbnRhaW5lclwiXG4gICAgICA+PC9oaXMtbmV3cy1saXN0PlxuICAgIDwvcC1maWVsZHNldD5cbiAgPC9kaXY+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNjdXN0b210ZW1wbGF0ZT5cbiAgPHAtdGFibGVcbiAgICBbdmFsdWVdPVwidG9Eb0xpc3QoKVwiXG4gICAgW3RhYmxlU3R5bGVdPVwieyB3aWR0aDogJzEwMCUnIH1cIj5cbiAgICA8bmctdGVtcGxhdGUgcFRlbXBsYXRlPVwiYm9keVwiIGxldC1uZXdzPlxuICAgICAgPHRyPlxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCJuZXdzLmV4ZWNTdGF0dXNbJ2NvZGUnXSA9PT0gJzEwJ1wiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBwQnV0dG9uXG4gICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIFtsYWJlbF09XCInY29tcGxldGUnIHx0cmFuc2xhdGVcIlxuICAgICAgICAgICAgICBjbGFzcz1cInAtYnV0dG9uLW91dGxpbmVkXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ2hhbmdlU3RhdHVzKG5ld3MudXNlckNvZGUsIG5ld3MuX2lkKVwiXG4gICAgICAgICAgICA+PC9idXR0b24+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L3RkPlxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbC1tXCI+e3sgbmV3cy5wZXJpb2Quc3RhcnQudG9Mb2NhbGVTdHJpbmcoKSB9fTwvc3Bhbj5cbiAgICAgICAgPC90ZD5cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWwtbVwiPnt7IG5ld3Muc3ViamVjdCB9fTwvc3Bhbj5cbiAgICAgICAgPC90ZD5cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwibmV3cy51cmxcIj5cbiAgICAgICAgICAgIDxwLWJ1dHRvbiAjbmF2QnV0dG9uIFtsYWJlbF09XCInY2xpY2tUb0VudGVyJ3x0cmFuc2xhdGVcIiBzdHlsZUNsYXNzPVwicC1idXR0b24tbGlua1wiIChjbGljayk9XCJvbk5hdk5ld3NDbGljayhuZXdzLnVybCxuZXdzLnNoYXJlZERhdGEpXCI+PC9wLWJ1dHRvbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L3RyPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIDwvcC10YWJsZT5cbjwvbmctdGVtcGxhdGU+XG4iXX0=