import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import CustomStore from 'devextreme/data/custom_store';
import {APIS} from '../../../api';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  paymentSource: any = {}
  approvalSource:any = {}
  pieData: any[]
  total:string
  approvalField:any = [{'field':'id','title':'序号'},
                        {'field':'contract_no','title':'合同编号'},
                        {'field':'contract_name','title':'合同名称'},
                        {'field':'status','title':'合同状态'},
                        {'field':'approver','title':'当前审批人'},
                        {'field':'apply_date','title':'提报日期'},
                        {'field':'inform_date','title':'通知日期'},]
 paymentField:any = [{'field':'id','title':'序号'},
                        {'field':'contract_name','title':'合同名称'},
                        {'field':'payment_no','title':'付款编号'},
                        {'field':'payment_apply_time','title':'付款申请时间'},
                        {'field':'status','title':'付款申请状态'},
                        {'field':'invoice_no','title':'发票编号'},
                        {'field':'payment_money','title':'已付款金额'},
                        {'field':'payment_date','title':'付款日期'},]



  constructor(private http: _HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
      let that = this;

    //合同审批模块
        this.approvalSource.store = new CustomStore({
            load: function (loadOptions: any) {
                let params = '?';
                params += 'skip=' + loadOptions.skip || 0;
                params += '&take=' + loadOptions.take || 12;

                if(loadOptions.sort) {
                    params += '&orderby=' + loadOptions.sort[0].selector;
                    if(loadOptions.sort[0].desc) {
                        params += ' desc';
                    }
                }
                return that.http.get(APIS.DASHBOARD.approve + params)
                    .toPromise()
                    .then((data: any) => {
                        return {
                            data: data.data,
                            totalCount: 12
                        }
                    })
                    .catch(error => { throw 'Data Loading Error' });
            }
        });

    //合同付款模块
        this.paymentSource.store = new CustomStore({
            load: function (loadOptions: any) {
                let params = '?';
                params += 'skip=' + loadOptions.skip || 0;
                params += '&take=' + loadOptions.take || 12;

                if(loadOptions.sort) {
                    params += '&orderby=' + loadOptions.sort[0].selector;
                    if(loadOptions.sort[0].desc) {
                        params += ' desc';
                    }
                }
                return that.http.get(APIS.DASHBOARD.payment + params)
                    .toPromise()
                    .then((data: any) => {
                        return {
                            data: data.data,
                            totalCount:12 
                        }
                    })
                    .catch(error => { throw 'Data Loading Error' });
            }
        });

    this.http.get(APIS.DASHBOARD.chart).subscribe((res: any) => {
        console.log(res)
      this.pieData = res.data;
      this.total = `${res.data.reduce((pre, now) => now.y + pre, 0).toFixed(0)}`;

      this.cdr.detectChanges();
    });
  }

  format(val: number) {
    return `${val.toFixed(0)}`;
  }
}
