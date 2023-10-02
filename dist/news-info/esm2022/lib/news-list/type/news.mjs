export class UserNews {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL25ld3MtaW5mby9zcmMvbGliL25ld3MtbGlzdC90eXBlL25ld3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxPQUFPLFFBQVE7SUFBckI7UUFDRTs7Ozs7O1dBTUc7UUFFTDs7VUFFRTtRQUNGLFFBQUcsR0FBVSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFHakM7O1VBRUU7UUFDRixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBRW5COzs7VUFHRTtRQUNGLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFFdEI7O1VBRUU7UUFDRixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBRWxCOztVQUVFO1FBQ0YsY0FBUyxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7UUFFN0I7O1VBRUU7UUFDRixZQUFPLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUUzQjs7VUFFRTtRQUNGLFdBQU0sR0FBVyxLQUFLLENBQUM7UUFFdkI7O1VBRUU7UUFDRixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBRXJCOztVQUVFO1FBQ0YsUUFBRyxHQUFXLEVBQUUsQ0FBQztRQUVqQjs7VUFFRTtRQUNGLFlBQU8sR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRTNCOzs7V0FHRztRQUNILGNBQVMsR0FBVyxFQUFFLENBQUM7UUFFdkI7O1VBRUU7UUFDRixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBRXhCOztVQUVFO1FBQ0YsZUFBVSxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7SUFFOUIsQ0FBQztDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWluZmVycmFibGUtdHlwZXMgKi9cbnR5cGUgc3RhdHVzID0gXCLlt7LlrozmiJBcIiB8IFwi5LiA6Iis5raI5oGvXCIgfCBcIuacquWujOaIkFwiO1xuZXhwb3J0IGNsYXNzIFVzZXJOZXdzIHtcbiAgLyoqXG4gICAqKiDooajmoLzlkI3nqLHvvJpOZXdzSW5mbyAobmV3cyBpbmZvKVxuICAqKiDooajmoLzoqqrmmI7vvJrmnIDmlrDmtojmga/pgJrnn6Xos4foqIpcbiAgKiog57eo6KiC5Lq65ZOh77ya6Zmz5Yag5a6IXG4gICoqIOagoemWseS6uuWToe+8muWtq+WfueeEtlxuICAqKiDoqK3oqIjml6XmnJ/vvJoyMDIzLjA4LjMwXG4gICoqL1xuXG4vKiog5pyA5paw5raI5oGv57eo6JmfXG4gICAqIEBkZWZhdWx0IGNyeXB0by5yYW5kb21VVUlEKClcbiovXG5faWQ6c3RyaW5nID0gY3J5cHRvLnJhbmRvbVVVSUQoKTtcblxuXG4vKiog5raI5oGv5L6G5rqQYXBwXG4gICogQGRlZmF1bHQgJydcbiovXG5hcHBJZDogc3RyaW5nID0gJyc7XG5cbi8qKiDkvb/nlKjogIXku6PnorxcbiAgKiBAZGVmYXVsdCAnJ1xuICAqIGFsbOS7o+ihqOWFqOmDqOS9v+eUqOiAhVxuKi9cbnVzZXJDb2RlOiBzdHJpbmcgPSAnJztcblxuLyoqIOa2iOaBr+eorumhnlxuICogQGRlZmF1bHQgJydcbiovXG50eXBlOiBzdHJpbmcgPSAnJztcblxuLyoqIOacgOaWsOa2iOaBr+mWi+Wni+aXpeacn1xuICAgKiBAZGVmYXVsdCBuZXcgRGF0ZSgpXG4qL1xuc3RhcnRUaW1lOiBEYXRlID0gbmV3IERhdGUoKTtcblxuLyoqIOacgOaWsOa2iOaBr+aIquatouaXpeacn1xuICogQGRlZmF1bHQgbmV3IERhdGUoKVxuKi9cbmVuZFRpbWU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4vKiog5pyA5paw5raI5oGv5YiG6aGeXG4gKiBAZGVmYXVsdCAn5pyq5a6M5oiQJ1xuKi9cbnN0YXR1czogc3RhdHVzID0gXCLmnKrlrozmiJBcIjtcblxuLyoqIOacgOaWsOa2iOaBr+WFp+WuuVxuICogQGRlZmF1bHQgJycnXG4qL1xuY29udGVudDogc3RyaW5nID0gJyc7XG5cbi8qKiDlpJbpg6jpgKPntZBcbiAqIEBkZWZhdWx0ICcnJ1xuKi9cbnVybDogc3RyaW5nID0gJyc7XG5cbi8qKiDnnIvpgY7mmYLplpNcbiogQGRlZmF1bHQgbmV3IERhdGUoKVxuKi9cbnNhd1RpbWU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4vKiog5YKz6YCB6LOH6KiKXG4gKlxuICogQGRlZmF1bHQgJycnXG4gKi9cbnNoYXJlRGF0YTogb2JqZWN0ID0ge307XG5cbi8qKiDns7vntbHnlbDli5Xkurrlk6FcbiAgKiBAZGVmYXVsdCAnJydcbiovXG5zeXN0ZW1Vc2VyOiBzdHJpbmcgPSAnJztcblxuLyoqIOezu+e1seeVsOWLleaZgumWk1xuICAqIEBkZWZhdWx0IG5ldyBEYXRlKClcbiovXG5zeXN0ZW1UaW1lOiBEYXRlID0gbmV3IERhdGUoKTtcblxufVxuIl19