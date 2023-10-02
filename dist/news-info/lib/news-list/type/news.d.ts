type status = "已完成" | "一般消息" | "未完成";
export declare class UserNews {
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
    _id: string;
    /** 消息來源app
      * @default ''
    */
    appId: string;
    /** 使用者代碼
      * @default ''
      * all代表全部使用者
    */
    userCode: string;
    /** 消息種類
     * @default ''
    */
    type: string;
    /** 最新消息開始日期
       * @default new Date()
    */
    startTime: Date;
    /** 最新消息截止日期
     * @default new Date()
    */
    endTime: Date;
    /** 最新消息分類
     * @default '未完成'
    */
    status: status;
    /** 最新消息內容
     * @default '''
    */
    content: string;
    /** 外部連結
     * @default '''
    */
    url: string;
    /** 看過時間
    * @default new Date()
    */
    sawTime: Date;
    /** 傳送資訊
     *
     * @default '''
     */
    shareData: object;
    /** 系統異動人員
      * @default '''
    */
    systemUser: string;
    /** 系統異動時間
      * @default new Date()
    */
    systemTime: Date;
}
export {};
