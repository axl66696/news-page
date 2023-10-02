export class UserProfile {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9maWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbmV3cy1pbmZvL3NyYy9saWIvbmV3cy1saXN0L3R5cGUvdXNlci1wcm9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE1BQU0sT0FBTyxXQUFXO0lBd0d0QixZQUFZLElBQTJCO1FBdkd2Qzs7Ozs7O1dBTUc7UUFFSDs7VUFFRTtRQUNGLFVBQUssR0FBVyxFQUFFLENBQUM7UUFFbkI7O1VBRUU7UUFDRixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBRXRCOztVQUVFO1FBQ0YsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUV0Qjs7VUFFRTtRQUNGLFFBQUcsR0FBVyxFQUFFLENBQUM7UUFFakI7O1VBRUU7UUFDRixhQUFRLEdBQWdCLElBQUksQ0FBQztRQUU3Qjs7VUFFRTtRQUNGLGNBQVMsR0FBa0IsSUFBSSxDQUFDO1FBRWhDOztVQUVFO1FBQ0YsVUFBSyxHQUFrQixJQUFJLENBQUM7UUFFNUI7O1VBRUU7UUFDRixpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUUxQjs7VUFFRTtRQUNGLGlCQUFZLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUVoQzs7VUFFRTtRQUNGLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFFdEI7O1VBRUU7UUFDRixjQUFTLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUU3Qjs7VUFFRTtRQUNGLFlBQU8sR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRTNCOztVQUVFO1FBQ0YsV0FBTSxHQUFrQixJQUFJLENBQUM7UUFFN0I7O1VBRUU7UUFDRixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBRXhCOztVQUVFO1FBQ0YsZUFBVSxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7UUFFOUI7O1VBRUU7UUFDRixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUV6Qjs7VUFFRTtRQUNGLG9CQUFlLEdBQWEsRUFBRSxDQUFDO1FBRS9COztVQUVFO1FBQ0YsaUJBQVksR0FBZSxFQUFFLENBQUM7UUFFNUI7O1FBRUE7UUFDQSxhQUFRLEdBQWUsRUFBRSxDQUFDO1FBRzFCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1pbmZlcnJhYmxlLXR5cGVzICovXG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gXCJAaGlzLXZpZXdtb2RlbC9hcHBwb3J0YWwvZGlzdFwiO1xuaW1wb3J0IHsgVXNlck5ld3MgfSBmcm9tIFwiLi9uZXdzXCJcblxuZXhwb3J0IGNsYXNzIFVzZXJQcm9maWxlIHtcbiAgLyoqXG4gICAgKiog6KGo5qC85ZCN56ix77yaTG9naW5JbmZvIChsb2dpbiBpbmZvKVxuICAgICoqIOihqOagvOiqquaYju+8mueZu+WFpeizh+ioilxuICAgICoqIOe3qOioguS6uuWToe+8muWQs+S9qeepjlxuICAgICoqIOagoemWseS6uuWToe+8muWtq+WfueeEtlxuICAgICoqIOioreioiOaXpeacn++8mjIwMjMuMDguMzBcbiAgKiovXG5cbiAgLyoqIOapn+ani+S7o+eivFxuICAgKiBAZGVmYXVsdCAnJydcbiAgKi9cbiAgb3JnTm86IHN0cmluZyA9ICcnO1xuXG4gIC8qKiDkvb/nlKjogIXku6PnorxcbiAgICogQGRlZmF1bHQgJydcbiAgKi9cbiAgdXNlckNvZGU6IHN0cmluZyA9ICcnO1xuXG4gIC8qKiDkvb/nlKjogIXlp5PlkI1cbiAgICogQGRlZmF1bHQgJydcbiAgKi9cbiAgdXNlck5hbWU6IHN0cmluZyA9ICcnO1xuXG4gIC8qKiDmgKfliKVcbiAgICogIEBkZWZhdWx0ICcnXG4gICovXG4gIHNleDogc3RyaW5nID0gJyc7XG5cbiAgLyoqIOWHuueUn+aXpeacn1xuICAgKiBAZGVmYXVsdCBudWxsXG4gICovXG4gIGJpcnRoZGF5OiBEYXRlIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIOS9v+eUqOiAheebuOeJh1xuICAgKiBAZGVmYXVsdCBudWxsXG4gICovXG4gIHVzZXJJbWFnZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIOmbu+WtkOS/oeeusVxuICAgKiAgQGRlZmF1bHQgbnVsbFxuICAqL1xuICBlTWFpbDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIOWvhueivOmbnOa5ilxuICAgKiBAZGVmYXVsdCAnJ1xuICAqL1xuICBwYXNzd29yZEhhc2g6IHN0cmluZyA9ICcnO1xuXG4gIC8qKiDlr4bnorzpgY7mnJ/ml6XmnJ9cbiAgICogQGRlZmF1bHQgbmV3IERhdGUoKVxuICAqL1xuICBwYXNzd29yZERhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gIC8qKiDmjojmrIrpm5zmuYpcbiAgICogQGRlZmF1bHQgJydcbiAgKi9cbiAgYXV0aEhhc2g6IHN0cmluZyA9ICcnO1xuXG4gIC8qKiDplovlp4vml6XmnJ9cbiAgICogQGRlZmF1bHQgbmV3IERhdGUoKVxuICAqL1xuICBzdGFydERhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gIC8qKiDlgZznlKjml6XmnJ9cbiAgICogIEBkZWZhdWx0IG5ldyBEYXRlKClcbiAgKi9cbiAgZW5kRGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgLyoqIOWCmeiou+iqquaYjlxuICAgKiBAZGVmYXVsdCBudWxsXG4gICovXG4gIHJlbWFyazogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIOezu+e1seeVsOWLleS6uuWToVxuICAgKiBAZGVmYXVsdCAnJydcbiAgKi9cbiAgc3lzdGVtVXNlcjogc3RyaW5nID0gJyc7XG5cbiAgLyoqIOezu+e1seeVsOWLleaZgumWk1xuICAgKiBAZGVmYXVsdCBuZXcgRGF0ZSgpXG4gICovXG4gIHN5c3RlbVRpbWU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gIC8qKiDlgIvkurrpoqjmoLzoqK3nva5cbiAgICogQGRlZmF1bHQge31cbiAgKi9cbiAgdHlwZVNldHRpbmc6IG9iamVjdCA9IHt9O1xuXG4gIC8qKiDns7vntbHmrIrpmZBcbiAgICogQGRlZmF1bHQgW11cbiAgKi9cbiAgc3lzdGVtQXV0aG9yaXR5OiBzdHJpbmdbXSA9IFtdO1xuXG4gIC8qKiDkvb/nlKjogIXns7vntbHmiJHnmoTmnIDmhJtcbiAgICogQGRlZmF1bHQgW11cbiAgKi9cbiAgdXNlckZhdm9yaXRlOiBBcHBTdG9yZVtdID0gW107XG5cbiAgICAvKiog5L2/55So6ICF5pyA5paw5raI5oGvXG4gICAqIEBkZWZhdWx0IFtdXG4gICovXG4gICAgdXNlck5ld3M6IFVzZXJOZXdzW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcih0aGF0PzogUGFydGlhbDxVc2VyUHJvZmlsZT4pIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHN0cnVjdHVyZWRDbG9uZSh0aGF0KSk7XG4gIH1cbn1cbiJdfQ==