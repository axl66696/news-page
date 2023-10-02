/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-var */
import { Injectable, inject, signal } from '@angular/core';
import { JSONCodec, JetstreamWsService, SubscribeType } from '@his-base/jetstream-ws';
import { Subject, mergeMap } from 'rxjs';
import * as i0 from "@angular/core";
export class UserProfileService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9maWxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9uZXdzLWluZm8vc3JjL2xpYi91c2VyLXByb2ZpbGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx5REFBeUQ7QUFDekQsMkJBQTJCO0FBQzNCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQW9CLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUd4RyxPQUFPLEVBQWMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFJckQsTUFBTSxPQUFPLGtCQUFrQjtJQUgvQjtRQUlFOztXQUVHO1FBQ0gsZ0JBQVcsR0FBRyxNQUFNLENBQWMsRUFBaUIsQ0FBQyxDQUFBO1FBRXBEOztXQUVHO1FBQ0gsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFPMUIsd0JBQW1CLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7S0EwQ2xEO0lBcERDOztPQUVHO0lBQ0gsU0FBUyxDQUFpQjtJQUUxQjs7T0FFRztJQUNILGtCQUFrQixDQUFnQztJQUVsRCxtQkFBbUIsQ0FBOEI7SUFJakQ7OztPQUdHO0lBQ0gsc0JBQXNCLENBQUMsSUFBZ0I7UUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLE9BQU87UUFDWCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDL0IsTUFBTSxTQUFTLEdBQUcsU0FBUyxFQUFFLENBQUM7UUFFOUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQzFELGFBQWEsQ0FBQyxJQUFJLEVBQ2xCLCtCQUErQixDQUVoQyxDQUFDO1FBRUYsSUFBSSxDQUFDLGtCQUFrQjthQUNwQixJQUFJLENBQ0gsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUMxQixJQUFJLEtBQUssRUFBRSxNQUFNLE9BQU8sSUFBSSxRQUFRLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUNmO1FBQ0gsQ0FBQyxDQUFDLENBQ0g7YUFDQSxTQUFTLENBQUMsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDLENBQUM7UUFFdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUM7OEdBeERVLGtCQUFrQjtrSEFBbEIsa0JBQWtCLGNBRmpCLE1BQU07OzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb24gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXZhciAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0LCBzaWduYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnN1bWVyTWVzc2FnZXMsIEpTT05Db2RlYywgSmV0c3RyZWFtV3NTZXJ2aWNlLCBTdWJzY3JpYmVUeXBlIH0gZnJvbSAnQGhpcy1iYXNlL2pldHN0cmVhbS13cyc7XG5pbXBvcnQgeyBVc2VyQWNjb3VudCB9IGZyb20gJ0BoaXMtdmlld21vZGVsL2FwcHBvcnRhbC9kaXN0Jy8vVXNlckltYWdl5rKS5pyJZXhwb3J0P1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBtZXJnZU1hcCB9IGZyb20gJ3J4anMnO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVXNlclByb2ZpbGVTZXJ2aWNlIHtcbiAgLyoqIOS9v+eUqFNpZ25hbOiuiuaVuOWEsuWtmFVzZXJQcm9maWxl5Z6L5Yil55qE5L2/55So6ICF6LOH6KiKXG4gICAqIEBtZW1iZXJvZiBVc2VyUHJvZmlsZVNlcnZpY2VcbiAgICovXG4gIHVzZXJBY2NvdW50ID0gc2lnbmFsPFVzZXJBY2NvdW50Pih7fSBhcyBVc2VyQWNjb3VudClcblxuICAvKiog5L2/55SoU3ViamVjdOiuiuaVuOiHqm5hdHPmi7/lj5bljIXlkKvmnIDmlrDmtojmga/nmoTkvb/nlKjogIXos4foqIpcbiAgICogQG1lbWJlcm9mIFVzZXJQcm9maWxlU2VydmljZVxuICAgKi9cbiAgI3VzZXJOZXdzID0gbmV3IFN1YmplY3QoKTtcblxuICAvKiog5L2/55SoQ29uc3VtZXJNZXNzYWdlc+iogumWseacgOaWsOa2iOaBr1xuICAgKiBAbWVtYmVyb2YgVXNlclByb2ZpbGVTZXJ2aWNlXG4gICAqL1xuICAjY29uc3VtZXJNZXNzYWdlcyQhOiBPYnNlcnZhYmxlPENvbnN1bWVyTWVzc2FnZXM+O1xuXG4gICNqZXRTdHJlYW1Xc1NlcnZpY2UgPSBpbmplY3QoSmV0c3RyZWFtV3NTZXJ2aWNlKTtcblxuXG5cbiAgLyoqIOabtOaWsOS9v+eUqOiAheizh+ioilxuICAgKiBAcGFyYW0ge1VzZXJBY2NvdW50fSB1c2VyXG4gICAqIEBtZW1iZXJvZiBVc2VyUHJvZmlsZVNlcnZpY2VcbiAgICovXG4gIGdldFVzZXJBY2NvdW50RnJvbU5hdHModXNlcjpVc2VyQWNjb3VudCk6IHZvaWQge1xuICAgIHRoaXMudXNlckFjY291bnQuc2V0KHVzZXIpXG4gIH1cblxuICAvKiog6KiC6Zax5pyA5paw5raI5oGvXG4gICAqIEBtZW1iZXJvZiBVc2VyUHJvZmlsZVNlcnZpY2VcbiAgICovXG4gIGFzeW5jIHN1Yk5ld3MoKSB7XG4gICAgdGhpcy4jdXNlck5ld3MgPSBuZXcgU3ViamVjdCgpO1xuICAgIGNvbnN0IGpzb25Db2RlYyA9IEpTT05Db2RlYygpO1xuXG4gICAgdGhpcy4jY29uc3VtZXJNZXNzYWdlcyQgPSB0aGlzLiNqZXRTdHJlYW1Xc1NlcnZpY2Uuc3Vic2NyaWJlKFxuICAgICAgU3Vic2NyaWJlVHlwZS5QdWxsLFxuICAgICAgJ3VzZXJBY2NvdW50LmdldE5ld3MuZGFzaGJvYXJkJ1xuXG4gICAgKTtcblxuICAgIHRoaXMuI2NvbnN1bWVyTWVzc2FnZXMkXG4gICAgICAucGlwZShcbiAgICAgICAgbWVyZ2VNYXAoYXN5bmMgKG1lc3NhZ2VzKSA9PiB7XG4gICAgICAgICAgZm9yIGF3YWl0IChjb25zdCBtZXNzYWdlIG9mIG1lc3NhZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLiN1c2VyTmV3cy5uZXh0KGpzb25Db2RlYy5kZWNvZGUobWVzc2FnZS5kYXRhKSk7XG4gICAgICAgICAgICBtZXNzYWdlLmFjaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge30pO1xuXG4gICAgdGhpcy4jdXNlck5ld3Muc3Vic2NyaWJlKCh1c2VyOiBhbnkpID0+IHtcbiAgICAgIHRoaXMudXNlckFjY291bnQuc2V0KHVzZXJbMF0pO1xuICAgIH0pO1xuXG4gIH1cblxufVxuXG5cbiJdfQ==