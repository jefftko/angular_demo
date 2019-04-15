import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ViewChild,
    OnInit,
    TemplateRef,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NzMessageService, NzModalService,NzTabChangeEvent } from 'ng-zorro-antd';
import CustomStore from 'devextreme/data/custom_store';
import { STColumn } from '@delon/abc';
import {ContractService} from '../contract.service';
import {APIS} from '../../../../api';

@Component({
    selector: 'app-sign',
    templateUrl: './sign.component.html',
    styleUrls: ['./sign.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignComponent implements OnInit {

    searchWords:string = '搜索';
    form: FormGroup;
    searchModal:any;
    //弹出框搜索字段
    selectedRowKeys:any = []
    searchSource:any = {}
    searchField:any = []
    searchApi:string = ''
    search:any = {queryName:'',queryWords:''}
    detailIndex:number = 0
    dataSource:any = [] 
    searchFields:any = [
        {'field':'contractName','title':'合同名称','type':'3','searchField':[{'field':'contractName','title':'合同名称'},{'field':'contractNumber','title':'合同编号'}],'searchApi':APIS.SEARCH.getContract},
        {'field':'contractNumber','title':'合同编号','type':'3','searchField':[{'field':'contractNumber','title':'合同编号'},{'field':'contractName','title':'合同名称'}],'searchApi':APIS.SEARCH.getContract},

        {'field':'okcPartyA','title':'合同甲方','type':'3','searchField':[{'field':'unitName','title':'单位名称'},{'field':'sourceType','title':'单位类型'}],'searchApi':APIS.SEARCH.okcPartyA},
        {'field':'okcPartyB','title':'合同乙方','type':'3','searchField':[{'field':'unitName','title':'单位名称'},{'field':'sourceType','title':'单位类型'}],'searchApi':APIS.SEARCH.okcPartyB},
        {'field':'orgId','title':'承办单位','type':'1','options':[{field:'',label:''}]},
        {'field':'responsibleDeptCode','title':'承办部门','type':'3','searchField':[{'field':'deptName','title':'部门名称'},{'field':'deptCode','title':'部门编码'}],'searchApi':APIS.SEARCH.deptData},

        {'field':'contractAmountFm','title':'合同金额从','type':'0'},
        {'field':'contractAmountTo','title':'合同金额至','type':'0'},
        {'field':'contractStatus','title':'合同状态','type':'1','options':[{'value':'YPZ','label':'已批准'},{'value':'YQD','label':'已签订'},{'value':'YSX','label':'已生效'}]},

        {'field':'responsiblePersonName','title':'承办人','type':'3','searchField':[{'field':'employeeName','title':'员工姓名'},{'field':'employeeNum','title':'员工编号'}],'searchApi':APIS.SEARCH.employee},
        {'field':'searchAuthorizedFileNumber','title':'批复文件编号','type':'0'},
        {'field':'orderType','title':'单据类型','options':[{'value':'','label':''},{'value':'order','label':'订单'},{'value':'contract','label':'合同'}],'type':1},
        {'field':'contractIntention','title':'合同意向','options':[{'value':'','label':''},{'value':'BUY','label':'购买'},{'value':'SELL','label':'销售'}],'type':1},

    ]

    dataField:any = [{'field':'rowNo','title':'序号','template':'text'},
    {'field':'contractNumber','title':'合同编号','template':'text'},
    {'field':'contractName','title':'合同名称','template':'text'},
    {'field':'signDate','title':'合同签订日期','template':'date'},
    {'field':'effectDate','title':'合同生效日期','template':'date'},
    {'field':'employeeName','title':'签订人','type':0,'template':'modal','searchField':[{'field':'employeeName','title':'员工姓名'},{'field':'employeeNum','title':'员工编号'}],'searchApi':APIS.SEARCH.employee},
    {'field':'isSignAuthorized','title':'法人代表或签字授权书','template':'radio'},
    {'field':'okcPerformanceTime','title':'合同履行期限','template':'input'},
    {'field':'agreementExpiryDate','title':'协议过期日','template':'date'},
    {'field':'contractAmount','title':'合同总金额','template':'text'},
    {'field':'signComments','title':'备注','template':'input'},
    {'field':'responsiblePersonName','title':'承办人','template':'text'},
    {'field':'responsibleDeptCode','title':'承办部门','template':'text'},
    {'field':'contractStatusDesc','title':'合同状态','template':'text'},
    {'field':'creationDate','title':'合同创建日期','template':'text'},
    {'field':'genPoResult','title':'订单编号','template':'text'},
    {'field':'okHeaderId','title':'上传附件','template':'button','type':0},
    {'field':'okHeaderId','title':'查看附件','template':'button','type':1},
    ]
    allMode: string;
    checkBoxesMode: string;

uploadConfig:any = {
    'url':APIS.CONTRACT.submitAttachment,
    callBack : (result) => {
    }
  };
attachListConfig:any = {
    'url':APIS.CONTRACT.getAttachList,
    'downloadUrl':APIS.CONTRACT.downloadAttach,
}



    constructor(
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder,
        public msg: NzMessageService,
        private modalSrv: NzModalService,
        private contractService:ContractService,
    ) {
        this.allMode = 'allPages';
        this.checkBoxesMode = 'onClick'

   
    }

    ngOnInit() {
            this.contractService._get(APIS.SEARCH.getOrgId)
        .then((data: any) => {
            let row = []
            data.data.forEach(val=>{
                row.push({'value':val['orgId'],'label':val['orgName']})
            })
            if(row.length != 0)
                this.searchFields[4]['options'] = row
        })

        this.form = this.fb.group({
            contractNumber: [null, []],
            contractName:[null,[]],
            contractCategory:[null,[]],
            contractAmountFm:[null,[]],
            contractAmountTo:[null,[]],
            orgId:[null,[]],
            responsibleDeptCode:[null,[]],
            responsiblePersonName:[null,[]],
            executeDeptCode:[null,[]],
            contractStatus:[null,[]],
            okcPartyA:[null,[]],
            okcPartyB:[null,[]],
            majorFlag:[null,[]],
            searchAuthorizedFileNumber:[null,[]],
            searchAgentName:[null,[]],
            projectNumber:[null,[]],
            projectName:[null,[]],
            taskNumber:[null,[]],
            contractType:[null,[]],
            templateFlag:[null,[]],
            creationDateFm:[null,[]],
            creationDateTo:[null,[]],
            effectDateFm:[null,[]],
            effectDateTo:[null,[]],
            buyMethod:[null,[]],
            historyFlag:[null,[]], 
            orderType:[null,[]],
            contractIntention:[null,[]],
            effectSystemDateFm:[null,[]],
            effectSystemDateTo:[null,[]]
        });


    }
    //表单提交

    _submitForm() {

        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
            this.form.controls[i].updateValueAndValidity();
        }
        if (this.form.invalid) return;
        this.getData(this.form.value);
        //this.dataSource.store.load({skip:0,take:12,data:this.form.value});
    }
    //弹出层搜索请求
    getSearchData(){
        let params = '?';
            params += 'queryName=' + this.search.queryName;
            params += '&queryWords=' + this.search.queryWords;

        this.contractService._get(this.searchApi + params)
        .then((data: any) => {
            this.searchSource = data.data
        })

    }
    //选中测试
    selectionChangedHandler(){
        console.log(this.selectedRowKeys)
         this.searchModal.triggerOk();

    }

    //触发弹窗
    add(tpl: TemplateRef<{}>,item,data) {
        this.searchField = item.searchField;
        this.search.queryName = this.searchField[0]['field']
        this.searchApi = item.searchApi;
        this.searchSource = [];
         this.searchModal = this.modalSrv.create({
            nzTitle: '搜索',
            nzContent: tpl,
            nzOnOk: () => {
                if(this.selectedRowKeys.length > 0){
                    if(item.type == 3){
                    this.form.controls[item.field].setValue(this.selectedRowKeys[0]);
                    }else{
                        data[item.field] = this.selectedRowKeys[0]
                        this.cdr.detectChanges();
                    }
                  
                    this.selectedRowKeys = [];
                }
            }

        });
    }
    //详情
    change(args: NzTabChangeEvent) {
        this.detailIndex = args.index
        // this.detailField = this.detailFields[args.index];
    }
    //修改
    onChange(e,data){
        console.log(e)
        data['isUpdate'] = true
    }
    //提交
    storeContract(){
        let rows =[]
        if(this.dataSource.length == 0){
            this.msg.create('warning','你没有作任何修改')
            return
        }
        this.dataSource.forEach((val)=>{
            if(val['isUpdate']){
                rows.push(val)
            }
        })
        console.log(rows)
        if(rows.length == 0){
        this.msg.create('warning','你没有作任何修改')
        }else{
             this.contractService._post(APIS.CONTRACT.sign,rows)
        .then((data: any) => {
            console.log(data)
            if(data.errcode == 0)
                this.msg.create('success','提交修改成功')
            else
                this.msg.create('warning',data.errmsg)
        })

        }

    }


    //搜索合同列表数据

    getData(data){
        this.contractService._post(APIS.CONTRACT.query+'/sign',data)
        .then((data: any) => {
            this.dataSource = data.data;
            this.dataSource.forEach((v)=>{
                if(v['isSignAuthorized'] == "1")
                    v['isSignAuthorized'] = true
                else
                    v['isSignAuthorized'] = false
                console.log(v['isSignAuthorized'])

            })
            this.cdr.detectChanges();
            })


}

//查看附件
handleBtn(type,data){
    if(type == 0){
    this.uploadConfig = {
      ...this.uploadConfig,
      visible : true,
      params : {okcHeaderId : data['okcHeaderId']}
    };
    }else{
    this.attachListConfig = {
      ...this.attachListConfig,
      visible : true,
      params : {okcHeaderId : data['okcHeaderId']}
    };
    }
    this.cdr.detectChanges();
}

}
