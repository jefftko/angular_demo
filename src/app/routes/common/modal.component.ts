import {
  Component,
  OnInit,
  Input, OnChanges, SimpleChanges, ChangeDetectorRef
} from '@angular/core';
import {_HttpClient} from "@delon/theme";
import {UrlConfig} from "./common.api";

@Component({
  selector: 'modal-page',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit, OnChanges  {

  @Input() config:any;
  searchType:string;
  searchContent:string;
  searchResult:any[] = [];
  page:number = 1;
  total:number = 0;
  empty:any = null;
  loading:boolean = false;

  constructor(private http: _HttpClient,
              private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  handleCancel() {
    this.config.isVisible = false;
  }

  doSearch() {
    this.loading = true;
    let param = {
      pageInfo : {
        skip : this.page,
        take : 5
      }
    };

    if (this.searchType)
      param['searchType'] = this.searchType;
    if (this.searchContent)
      param['searchContent'] = this.searchContent;

    if (this.config.callBackOptions && this.config.callBackOptions.param) {
      Object.assign(param, this.config.callBackOptions.param);
    }

    console.log('[Do Modal Search]', JSON.stringify(param));
    this.http.post(UrlConfig.Root + this.config.url, param)
      .toPromise()
      .then((result: any) => {
        console.log('[Modal Search Result]:', result);
        if (result && !result.errcode) {
          result.data.list.forEach((value, i) => value.index = i);
          this.searchResult = result.data.list;
          this.total = result.data.total;
          this.loading = false;
          this.cdr.detectChanges()
        }
      })
      .catch(error => { throw error });
  }

  doCallBack(index) {
    console.log('[Modal Return Value]:', this.searchResult[index]);
    this.config.isVisible = false;
    if (this.config.callBackOptions && this.config.callBackOptions.index != undefined) {
      this.config.callBack(this.searchResult[index], this.config.callBackOptions, this.config.callBackOptions.index);
    } else {
      this.config.callBack(this.searchResult[index], this.config.callBackOptions);
    }
  }

  onPageChange(page) {
    this.page = page;
    this.doSearch();
    // console.log(page);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.config && this.config.isVisible) {
      console.log('[Modal Changed]:', this.config);
      if (this.config) {
        this.searchType = this.config.options[0].value;
        this.loading = false;
        this.searchContent = null;
        this.searchResult = [];
      }
    }
  }
}
