import {inject, bindable, customElement} from 'aurelia-framework';
import {ReportCard} from 'utility/report-card';

//start-aurelia-decorators
@customElement('title-bar')
@inject(ReportCard)
//end-aurelia-decorators
export class TitleBar {
  //@bindable attributes should have no case, eg. reportcard
  //@bindable functions should be in camelCase, then in html template usage, use camel-case.call
  //start-aurelia-decorators
  @bindable titlekey;
  @bindable cardcount;
  @bindable totalcards;
  //end-aurelia-decorators

  constructor(ReportCard) {
    this.reportcard = ReportCard;
  }

  get x() {
    return this.y;
  }

  attached() {
    var self = this;
    $('#' + this.reportcard.selLanguage).addClass("active");
  }

  switchLang(lang) {
    $('.langLabels').removeClass("active");
    this.reportcard.changeLanguage();
    $('#' + lang).addClass("active");
  }

  logUserAgent() {

  }
}