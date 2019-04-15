import {
  Component,
  ChangeDetectionStrategy, OnInit, Input, ChangeDetectorRef, OnChanges, SimpleChanges,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-attach-list',
  templateUrl: './attach-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachListComponent implements OnInit, OnChanges {

  @Input() config:any

 dataField:any[] = [
    {field: 'attachmentId' , title : '附件ID', template:'text'},
    {field : 'attachmentName' , title : '附件名称', template : 'text'},
    {field : 'fileName' , title: '文件名', template : 'text'},
    {field : 'createPerson' , title : '上传者', template : 'text'},
    {field : 'creationDate' , title : '上传时间', template : 'text'},
    {field : 'attachmentId' , title : '下载', template : 'button'},
  ];
  dataSource:any = [] 

  okLoading:boolean;

  constructor( private http: _HttpClient,
              private cdr: ChangeDetectorRef) {}

  ngOnInit() {
      let okcHeaderId = 0;
      if (this.config.params != undefined){
          okcHeaderId = this.config.params['okcHeaderId']
          this.http.post(this.config.url,{'okcHeaderId':okcHeaderId})
        .toPromise()
        .then((data: any) => {
            this.dataSource = data.data;
            this.cdr.detectChanges();
            })

      }

  }


  handleCancel() {
    this.config.visible = false;
  }
  handleBtn(data) {
    location.href = this.config.downloadUrl + data['attachmentId'];
  }

ngOnChanges(changes: SimpleChanges): void {
  }

}
