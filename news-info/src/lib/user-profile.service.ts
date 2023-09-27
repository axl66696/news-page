/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-var */
import { Injectable, inject, signal } from '@angular/core';
import { ConsumerMessages, JSONCodec, JetstreamWsService, SubscribeType } from '@his-base/jetstream-ws';
import { UserAccount } from '@his-viewmodel/appportal/dist'//UserImage沒有export?

import { Observable, Subject, mergeMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  /** 使用Signal變數儲存UserProfile型別的使用者資訊
   * @memberof UserProfileService
   */
  userAccount = signal<UserAccount>({} as UserAccount)

  /** 使用Subject變數自nats拿取包含最新消息的使用者資訊
   * @memberof UserProfileService
   */
  #userNews = new Subject();

  /** 使用ConsumerMessages訂閱最新消息
   * @memberof UserProfileService
   */
  #consumerMessages$!: Observable<ConsumerMessages>;

  #jetStreamWsService = inject(JetstreamWsService);



  /** 更新使用者資訊
   * @param {UserAccount} user
   * @memberof UserProfileService
   */
  getUserAccountFromNats(user:UserAccount): void {
    this.userAccount.set(user)
  }

  /** 訂閱最新消息
   * @memberof UserProfileService
   */
  async subNews() {
    this.#userNews = new Subject();
    const jsonCodec = JSONCodec();

    this.#consumerMessages$ = this.#jetStreamWsService.subscribe(
      SubscribeType.Pull,
      'userAccount.getNews.dashboard'

    );

    this.#consumerMessages$
      .pipe(
        mergeMap(async (messages) => {
          for await (const message of messages) {
            this.#userNews.next(jsonCodec.decode(message.data));
            message.ack();
          }
        })
      )
      .subscribe(() => {});

    this.#userNews.subscribe((user: any) => {
      this.userAccount.set(user[0]);
    });

  }

}


