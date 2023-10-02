import { UserAccount } from '@his-viewmodel/appportal/dist';
import * as i0 from "@angular/core";
export declare class UserProfileService {
    #private;
    /** 使用Signal變數儲存UserProfile型別的使用者資訊
     * @memberof UserProfileService
     */
    userAccount: import("@angular/core").WritableSignal<UserAccount>;
    /** 更新使用者資訊
     * @param {UserAccount} user
     * @memberof UserProfileService
     */
    getUserAccountFromNats(user: UserAccount): void;
    /** 訂閱最新消息
     * @memberof UserProfileService
     */
    subNews(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserProfileService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserProfileService>;
}
