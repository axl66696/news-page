/* eslint-disable @angular-eslint/component-selector */
import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NewsInfoComponent } from 'news-info';
import { NewsListComponent } from 'news-info';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NewsInfoComponent, NewsListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'news-page';

  #translate: TranslateService = inject(TranslateService);
  /** 多國語系
   *  @memberof AppComponent
   */
  constructor() {
    this.#translate.setDefaultLang(`zh-Hant`);
  }
}
