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
import { STColumn } from '@delon/abc';
import {APIS} from '../../../../api';
import {ContractService} from '../contract.service';

@Component({
    selector: 'app-end',
    templateUrl: './end.component.html',
    styleUrls: ['./end.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndComponent implements OnInit {

    form: FormGroup;
    contractStatusDesc:any = {'SPZ':'审批中','YZZ':'已中止','DELETE':'已作废','YQX':'已取消','YPZ':'已批准','YJJ':'已拒绝','YSX':'已生效','ZCZZ':'已竣工','YQD':'已签订','FZCZZ':'已终止','ND':'拟定中','ZZGB':'最终关闭','CXTQ':'需重新提交'};

    //弹出框搜索字段
    searchWords:string = '搜索';
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
        {'field':'orgId','title':'承办单位','type':'1','options':[{value:'',label:''}]},
        {'field':'responsibleDeptCode','title':'承办部门','type':'3','searchField':[{'field':'deptName','title':'部门名称'},{'field':'deptCode','title':'部门编码'}],'searchApi':APIS.SEARCH.deptData},

        {'field':'contractAmountFm','title':'合同金额从','type':'0'},
        {'field':'contractAmountTo','title':'合同金额至','type':'0'},
        {'field':'contractStatus','title':'合同状态','type':'1','options':[{'value':'FZCZZ','label':'已终止'},{'value':'YSX','label':'已生效'},{'value':'YZZ','label':'已中止'},{'value':'ZCZZ','label':'已竣工'},{'value':'ZZGB','label':'最终关闭'}]},

        {'field':'responsiblePersonName','title':'承办人','type':'3','searchField':[{'field':'employeeName','title':'员工姓名'},{'field':'employeeNum','title':'员工编号'}],'searchApi':APIS.SEARCH.employee},
        {'field':'searchAuthorizedFileNumber','title':'批复文件编号','type':'0'},
        {'field':'approvalingStatus','title':'审批状态','type':'1','options':[{'value':'','label':''},{'value':'APPROVALING','label':'审批中'}]},




    ]

    dataField:any = [{'field':'rowNo','title':'序号','template':'text'},
        {'field':'contractNumber','title':'合同编号','template':'text'},
    {'field':'contractName','title':'合同名称','template':'text'},
    {'field':'completeDate','title':'合同竣工日期','template':'date','disabled':['YZZ','FZCZZ','ZCZZ','ZZGB']},
    {'field':'finalCloseDate','title':'最终关闭日期','template':'date','disabled':['YZZ','YSX','FZCZZ','ZZGB']},
    {'field':'endDate','title':'合同终止日期','template':'date','disabled':['YZZ','FZCZZ','ZCZZ','ZZGB']},
    {'field':'endComments','title':'提交意见','template':'input','disabled':['YZZ','FZCZZ','ZCZZ','ZZGB']},
    {'field':'contractStatusDesc','title':'合同状态','template':'text'},
    {'field':'responsibleDeptCode','title':'承办部门','template':'text'},
    {'field':'responsiblePersonName','title':'承办人','template':'text'},
    {'field':'creationDate','title':'合同创建日期','template':'text'},
    {'field':'signDate','title':'合同签订日期','template':'text'},
    {'field':'effectDate','title':'合同生效日期','template':'text'},
    {'field':'endStatusDesc','title':'中止审批状态','template':'text'},
      {'field':'okHeaderId','title':'上传附件','template':'button','type':0},
    {'field':'okHeaderId','title':'查看附件','template':'button','type':1},

    ]
    documentsIndex:number = 0;
    documentsSource:any = {poReceiveList: [], poList: [], poInvoiceList: []};
    documentsField:any ={poReceiveList:
        [            {'field':'contractNumber','title':'合同编号'},
            {'field':'poNumber','title':'采购订单编号'},
            {'field':'agentName','title':'采购员'},
            {'field':'totalAmountTax','title':'订单含税总金额'},
            {'field':'totalAmount','title':'订单不含税总金额'},
            {'field':'receiveAmount','title':'订单已接收金额'},
            {'field':'notReceiveAmount','title':'订单未接收金额'},
    ],poList:[
        {'field':'lineNum','title':'序号'},
        {'field':'itemNumber','title':'物资编码'},
        {'field':'itemDesc','title':'物资说明'},
        {'field':'unitMeasLookupCode','title':'单位'},
        {'field':'quantity','title':'订货数量'},
        {'field':'quantityReceived','title':'已接收数量'},
        {'field':'unReceivedQty','title':'未接收数量'},
    ],poInvoiceList:[
        {'field':'contractNumber','title':'合同编号'},
        {'field':'invoiceNum','title':'发票编号'},
        {'field':'invoiceType','title':'发票类型'},
        {'field':'invoiceAmount','title':'发票金额'},
        {'field':'payAmount','title':'发票已付款金额'},
        {'field':'notPayAmount','title':'发票未付款金额'},

    ]
    }
    //url:http://ebs001.spichn.com.cn:8001/OA_HTML/cuxAprvHistory.jsp?objectId=11548&objectType=CUX_OKC_HEADERS_ALL_SUSPEND
    //http://ebs001.spichn.com.cn:8001/OA_HTML/cuxAprvHistory.jsp?objectId=11548&objectType=CUX_OKC_HEADERS_ALL_RESUME
    aprvPubType:string = 'CUX_OKC_HEADERS_ALL_SUSPEND';
    aprvObjectId:any = '';
    aprvPubField:any = [
        {'field':'approveSeq','title':'序号'},
        {'field':'fromUserName','title':'发件人'},
        {'field':'approveRoleName','title':'审批角色'},
        {'field':'approveSec','title':'审批人'},
        {'field':'countersignFlag','title':'是否会签'},
        {'field':'action','title':'操作'},
        {'field':'comment','title':'审批意见'},
        {'field':'actionDate','title':'审批时间'},
    ]
    aprvSource:any ={}
    allMode: string;
    checkBoxesMode: string;
    contractStatus:string = 'YSX';
    selectedItem:any = {};
    searchModal:any;

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
        private contractService:ContractService
    ) {
        this.allMode = 'allPages';
        this.checkBoxesMode = 'onClick'

    }

    ngOnInit() {

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
            effectSystemDateTo:[null,[]],
            approvalingStatus:[null,[]]
        });

        //设置search模块下拉默认值
        this.contractService._get(APIS.SEARCH.getOrgId)
        .then((data: any) => {
            let row = []
            data.data.forEach(val=>{
                row.push({'value':val['orgId'],'label':val['orgName']})
            })
            if(row.length != 0)
                this.searchFields[4]['options'] = row

            this.searchFields.forEach((val:any)=>{
                if (val['type'] == 1){
                    if(val.field == 'contractStatus'){
                        this.form.controls[val.field].setValue(val.options[1]['value'])
                    }else{
                        this.form.controls[val.field].setValue(val.options[0].value)
                    }
                }
            })
        })
       /*  this.searchFields.forEach(val=>{
                if (val.type == 1){
                    if(val.field == 'contractStatus'){
                        console.log(val.options)
                        this.form.controls[val.field].setValue(val.options[1]['value'])
                    }else{
                        this.form.controls[val.field].setValue(val.options[0].value)
                    }
                    this.cdr.detectChanges();

                }
            })*/




    }
    //表单提交

    _submitForm() {

        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
            this.form.controls[i].updateValueAndValidity();
        }
        if (this.form.invalid) return;
        /* this.dataSource = [];
        this.cdr.detectChanges();*/
        this.getData(this.form.value);
        //this.dataSource.store.load({skip:0,take:12,data:this.form.value});
        //设置底部菜单的禁用
        this.contractStatus = this.form.controls['contractStatus'].value
        
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
    onChange(e,item){
        console.log('change');
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
        this.documentsIndex = args.index
        // this.detailField = this.detailFields[args.index];
    }




    //搜索合同列表数据

    getData(data){
        this.contractService._post(APIS.CONTRACT.query+'/end',data)
        .then((data: any) => {
            this.dataSource = data.data;
            this.cdr.detectChanges();
        })


    }
    //列表选中处理
    selectionItem(e){
        console.log(e.selectedRowsData[0])
        this.aprvObjectId = e.selectedRowsData[0].okcHeaderId
        this.selectedItem = e.selectedRowsData[0];
        let params = '?';
        params += 'func=queryDetail';
        params += '&okcHeaderId=' + e.selectedRowsData[0].okcHeaderId;
             /* this.documentsSource = {poReceiveList: [{'contractNumber':'1','poNumber':'2','agentName':'小强','totalAmountTax':'29.00','totalAmount':'22.99','notReceiveAmount':'223.00'}], poList: [{'lineNum':'1','itemNumber':'2222323','itemDesc':'test','unitMeasLookupCode':'2232','quantity':'11','quantityReceived':'test','unReceivedQty':'22'}], poInvoiceList: [{'contractNumber':'11122','invoiceNum':'223','invoiceType':'增值税','invoiceAmount':'223.09','payAmount':'2323.00','notPayAmount':'123.00'}]};*/
            this.cdr.detectChanges();
       this.contractService._get(APIS.CONTRACT.signEffectEnd+params)
        .then((data: any) => {
            this.documentsSource = data.data
            this.cdr.detectChanges();

        })
        return
    }
    //合同异常中止,合同竣工,最终关闭
    setStatus(type){
        console.log(this.selectedItem)
        if(this.selectedItem.okcHeaderId == undefined){
            this.msg.create('warning','您还没有选中合同')
            return
        }
        console.log(this.selectedItem.contractStatus)
        if(this.selectedItem.contractStatus == undefined){
            this.msg.create('warning','找不到合同状态')
            return
        }
     if(type == 'FZCZZ' && (this.selectedItem.endDate == '' || this.selectedItem.endDate == undefined)){
         this.msg.create('warning','合同异常中止日期不能为空')
        return
    }
     if(type == 'ZCZZ' && (this.selectedItem.completeDate == '' || this.selectedItem.completeDate == undefined)){
         this.msg.create('warning','合同竣工日期不能为空')
        return
    }
     if(type == 'ZZGB' && (this.selectedItem.finalCloseDate == '' || this.selectedItem.finalCloseDate == undefined)){
         this.msg.create('warning','合同最终关闭日期不能为空')
        return
    }
       //this.selectedItem.contractStatus = type;
      // this.selectedItem.contractStatusDesc = this.contractStatusDesc[type];
       
        this.contractService._post(APIS.CONTRACT.end,this.selectedItem)
        .then((data: any) => {
            console.log(data)
            if(data.errcode == 0){
                this.msg.create('success','提交修改成功')
            } else{
                this.msg.create('warning',data.errmsg)
            }
        })




    }

    //合规审查
    checkRule(){
        this.msg.create('warning','没有合规审查')
    }
    //审批列表获取
    openApprv(tpl: TemplateRef<{}>,item) {
        this.aprvPubType = item.type;
        //objectId=11548&objectType=CUX_OKC_HEADERS_ALL_RESUME
        let params = '?';
        params += 'objectId=' + this.aprvObjectId;
        params += '&objectType=' + item.type;
        this.contractService._get(APIS.CONTRACT.apprvData + params)
        .then((data: any) => {
            this.aprvSource = data.data
            this.cdr.detectChanges();

        })


        this.aprvSource = [];
        this.modalSrv.create({
            nzTitle: item.title,
            nzWidth:880,
            nzContent: tpl,
        });
    }


    //toUserName + ' ('+ data[i].toUserNum + ')' +
    calculateCellValue(data) {
        return data.toUserName+'('+data.toUserNum+')';
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
