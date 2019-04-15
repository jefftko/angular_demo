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
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { STColumn } from '@delon/abc';
import {APIS} from '../../../../api';
import {ContractService} from '../contract.service';
import {Options} from '../../common/common.code';


@Component({
    selector: 'app-change-detail',
    templateUrl: './change-detail.component.html',
    styleUrls: ['./change-detail.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeDetailComponent implements OnInit {

    form: FormGroup;

    currentId:string;
    okcHeaderId:string;

    //弹出框搜索字段
    searchWords:string = '搜索';
    selectedRowKeys:any = []
    searchSource:any = {}
    searchField:any = []
    searchApi:string = ''
    searchSelected:any ={}
    search:any = {queryName:'',queryWords:''}
    detailIndex:number = 0
    dataSource:any = [] 
    searchFields:any = [
        {'field':'changeNumber','title':'变更申请单编号','type':'0','disabled':true},
        {'field':'changeName','title':'变更简述','type':'0','disabled':true},
        {'field':'contractNumber','title':'合同编号','type':'3','disabled':true,'searchField':[{'field':'contractNumber','title':'合同编号'},{'field':'contractName','title':'合同名称'}],'searchApi':APIS.SEARCH.getContract},
        {'field':'contractName','title':'合同名称','type':'0','disabled':true},
        {'field':'changeAmount','title':'变更金额','type':'0','disabled':true},
        {'field':'oldContractAmount','title':'原合同金额','type':'0','disabled':true},
        {'field':'responsiblePersonName','title':'承办人','type':'3','disabled':true,'searchField':[{'field':'employeeName','title':'员工姓名'},{'field':'employeeNum','title':'员工编号'}],'searchApi':APIS.SEARCH.employee},
        {'field':'estimateTotal','title':'预估总价','type':'0','disabled':true},
        {'field':'creationDate','title':'创建日期','type':'0','disabled':true},
        {'field':'statusDesc','title':'状态','type':'0','disabled':true},
        {'field':'comments','title':'变更描述','type':'4','disabled':true},
    ]

    documentsIndex:number = 0;
    documentsSource:any = {header:{},lines:[], terms: [], attachments: [],clausesList:[]};
    documentsField:any ={lines:
        [            {'field':'lineNum','title':'行号','template':'text','disabled':true},
            {'field':'itemNumber','title':'物料编码','template':'text','disabled':true},
            {'field':'itemDesc','title':'物料名称','template':'text','disabled':true},
            {'field':'taxUnitPrice','title':'含税单价','template':'input','disabled':true},
            {'field':'baseUnitPrice','title':'不含税单价','template':'input','disabled':true},
            {'field':'taxAmount','title':'含税总价','template':'input','disabled':true},
            {'field':'baseAmount','title':'不含税总价','template':'input','disabled':true},
            {'field':'tax','title':'税率','template':'input','disabled':true,'options':[{'value':'','label':''}]},
            {'field':'quantity','title':'数量','template':'input','disabled':false},
            {'field':'itemUom','title':'单位','template':'text','disabled':true},
            {'field':'arrivalDate','title':'交货日期','template':'input','disabled':false},
            {'field':'projectNum','title':'项目编号','template':'modal','disabled':false,'searchField':[{'field':'projectNumber','title':'项目编号'},{'field':'projectName','title':'项目名称'}],'searchApi':APIS.SEARCH.getProject},
            {'field':'projectName','title':'项目名称','template':'input','disabled':true},
            {'field':'taskName','title':'任务','template':'modal','disabled':false,'searchField':[{'field':'taskName','title':'任务名称'},{'field':'taskNumber','title':'任务编号'}],'searchApi':APIS.SEARCH.getTask},
            {'field':'expenditureType','title':'支出类型','template':'modal','disabled':false,'searchField':[{'field':'expenditureType','title':'支出类型'}],'searchApi':APIS.SEARCH.expenditureType},
    ],terms:[
        {'field':'lineNum','title':'序号','template':'text','disabled':true},
        {'field':'clauseTypes','title':'款项类型','template':'select','disabled':false, width:100,options:[{"value":"OTHER","label":"其他"},{"value":"JUSTSETTLEMENT","label":"据实结算"},{"value":"MATERIAIS","label":"物料款"},{"value":"FINAL_ACCOUNT","label":"竣工决算款"},{"value":"ZBJ","label":"质保金"},{"value":"PROGRESS_PAY","label":"进度款"},{"value":"PREPAY","label":"预付款"}]},
        {'field':'paymentWay','title':'付款方式','template':'select','disabled':false, width:100,'options': [{"value":"PERCENTAGE","label":"百分比"},{"value":"AMOUNT","label":"金额"}]},
        {'field':'tax','title':'税率','template':'select','disabled':false,'options':Options.TAX, width:100},
        {'field':'paymentPercent','title':'付款比例(%)','template':'input','disabled':true, width:100},
        {'field':'paymentAmount','title':'付款金额','template':'input','disabled':false, width:100},
        {'field':'norateContractAmount','title':'不含税付款金额','template':'input','disabled':true, width:100},
        {'field':'schedulePaymentDate','title':'计划付款时间','template':'input','disabled':false, width:100},
        {'field':'comments','title':'备注','template':'input','disabled':false, width:100},
        {'field':'termId','title':'删除','template':'button','disabled':false},
    ],
    attachments:[
    {field : 'attachmentName' , title : '附件名称', template : 'text'},
    {field : 'fileName' , title: '文件名', template : 'text'},
    {field : 'createPerson' , title : '上传者', template : 'text'},
    {field : 'creationDate' , title : '上传时间', template : 'text'},
    {field : 'attachmentId' , title : '导出', template : 'button','type':0,'icon':'download','class':'primary'},
    {field : 'attachmentId' , title : '删除', template : 'button','type':1,'icon':'close','class':'danger'},
    ],
    clausesList:[
        {'field':'clauseId','title':'查看条款','template':'button','disabled':false,'icon':'eye','class':'primary'},
        {'field':'lineNum','title':'行号','template':'input','disabled':false},
        {'field':'serialNumber','title':'编号','template':'input','disabled':false},
        {'field':'clauseTitle','title':'条款标题','template':'modal','disabled':false,'searchField':[{'field':'clauseTitle','title':'条款标题'}],'searchApi':APIS.SEARCH.getClauses},
        {'field':'lineNum','title':'删除','template':'button','disabled':false,'icon':'close','class':'danger'},

    ]
    }

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
    fieldStatus:any;
    btnStatus:any[] =[false,false,false,false,false,false,false]
    aprvSource:any ={}
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



    constructor(
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder,
        public msg: NzMessageService,
        private modalSrv: NzModalService,
        private contractService:ContractService,
        private route: ActivatedRoute,
        private router:Router,
    ) {
        this.allMode = 'allPages';
        this.checkBoxesMode = 'onClick'

    }

    ngOnInit() {
        this.currentId = this.route.snapshot.paramMap.get('id');

        this.form = this.fb.group({
            contractNumber: [null, []],
            okcChangeId: [null, []],
            okcHeaderId: [null, []],
            contractName:[null,[]],
            changeName:[null,[]],
            changeNumber:[null,[]],
            changeAmount:[null,[]],
            oldContractAmount:[null,[]],
            responsiblePersonName:[null,[]],
            estimateTotal:[null,[]],
            creationDate:[null,[]],
            statusDesc:[null,[]],
            status:[null,[]],
            comments:[null,[]],
            versionNum:[null,[]],
            orgId:[null,[]],
            "okcVersionNum":[null,[]], 
            "contractAmount": [null,[]], 
            "oldEstimateTotal": [null,[]], 
            "contractType":[null,[]], 
            "contractCategory": [null,[]], 
            "contractIntention": [null,[]], 
            "changeContent": [null,[]], 
            "changeContentDesc": [null,[]], 
            "changeOrg": [null,[]], 
            "responsiblePersonId": [null,[]], 
            "objectVersionNumber": [null,[]],
            "wfItemType": [null,[]], 
            "wfItemKey":[null,[]], 
            "createdBy": [null,[]], 
            "lastUpdateBy":[null,[]], 
            "lastUpdateDate": [null,[]],
            "lastUpdateLogin": [null,[]],
        });
        
        //新建变更亩
        if(this.currentId == '0'){
             this.searchFields[1]['disabled'] = false;
            this.searchFields[6]['disabled'] = false;
           this.searchFields[10]['disabled'] = false;

            this.searchFields[2]['disabled'] = false;
            this.form.controls['statusDesc'].setValue('拟定');
            //this.form.controls['status'].setValue('CREATING');
            let date = new Date();
            this.form.controls['creationDate'].setValue(date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate());
            this.btnStatus =[true,true,true,true,true,false,true]
             this.searchFields.forEach((val)=>{
            if (val['disabled'] == true){
                this.form.controls[val['field']].disable();
            }

        })


        }else{
            this.getData(this.currentId);
        }

       



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
        //校验头信息

        let  message = "";
        let isOK = true;
        if (this.currentId != '0'){
            isOK = false;
            message = '已经更改过了哦!'
        }
        if (this.form.controls['changeName'].value == null) {
            message = message + "变更简述，";
            isOK = false;
        }
        if (this.form.controls['contractNumber'].value== null) {
            message = message + "合同编号，";
            isOK = false;

        }
        if (isOK == false) {
            this.msg.create('warning',message + "必填！")
            return
        }
        this.form.value['okcHeaderId'] = this.okcHeaderId
        this.contractService._post(APIS.CONTRACT.changeStore,this.form.value)
        .then((data: any) => {
            if(data.errcode == 0){
                this.msg.create('success',"保存成功")
                this.getData(data.data['okcChangeId'])
            }else{
            }
            this.cdr.detectChanges();
        })

        //this.getData(this.form.value);
        //this.dataSource.store.load({skip:0,take:12,data:this.form.value});
        //设置底部菜单的禁用
        //this.contractStatus = this.form.controls['contractStatus'].value

    }

    getData(okcChangeId){
        this.contractService._get(APIS.CONTRACT.changeData+'/'+okcChangeId)
        .then((data: any) => {

            this.documentsSource = data.data
            Object.keys(this.documentsSource.header).forEach(key=>{
                if(this.form.controls[key] != undefined){
                this.form.controls[key].setValue(this.documentsSource.header[key])
                }
            })
            this.searchFields[2]['disabled'] =true;

            this.currentId = okcChangeId
            this.okcHeaderId = this.documentsSource.header['okcHeaderId']
            console.log(this.documentsSource['header'])
            this.setDisable(this.documentsSource['header'])
            this.searchFields.forEach((val)=>{
            if (val['disabled'] == true){
                this.form.controls[val['field']].disable();
            }

        })
            this.cdr.detectChanges();


        })

    }
    //弹出层搜索请求
    getSearchData(){
        let params = '?';
        params += 'queryName=' + this.search.queryName;
        params += '&queryWords=' + this.search.queryWords;

        this.contractService._get(this.searchApi + params)
        .then((data: any) => {
            this.searchSource = data.data
            this.cdr.detectChanges();
        })

    }
    //选中测试
    selectionChangedHandler(e){
        console.log(this.selectedRowKeys)
        this.searchSelected = e.selectedRowsData[0];
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
                        if (item.field == 'contractNumber'){
                            this.form.controls['contractName'].setValue(this.searchSelected['contractName']);
                            this.form.controls['okcHeaderId'].setValue(this.searchSelected['okcHeaderId']);
                            console.log(this.searchSelected)
                            this.okcHeaderId = this.searchSelected['okcHeaderId']
                        }

                    }else{
                        data[item.field] = this.selectedRowKeys[0]
                        if(item.field =='projectNum'){
                            data['projectName'] = this.searchSelected['projectName'];
                            console.log(data['projectName'])
                        }
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





    //列表选中处理
    selectionItem(e){
        console.log(e.selectedRowsData[0])
    }

    //签订补充合同
    goSignSup(){
        this.router.navigateByUrl('/contract/create/appendOkc');

    }
    //返回
    goChange(){
        this.router.navigateByUrl('/contract/change');

    }

    //上传附件
    uploadAttach(){
    this.uploadConfig = {
      ...this.uploadConfig,
      visible : true,
      params : {okcHeaderId : this.okcHeaderId}
    }
    }
    showAttach(){
        this.getData(this.currentId);
    }

    //条款处理
    handleClauses(field,data){
        if(field == 'clauseId'){
            if (data['showExtra'])
                data['showExtra'] = false;
            else
                data['showExtra'] = true;
        }else{
            this.delClause(data);
        }
        
    }

    

    //添加条款
addClause(){
    let row = {"lineNum":this.documentsSource.clausesList.length+1,'isNew':true}
    this.documentsSource.clausesList.push(row)
    
}
//删除条款
delClause(data){
    if(data['isNew']){
       let index = this.documentsSource.clausesList.indexOf(data)
       if(index > -1){
           this.documentsSource.clausesList.splice(index,1)
       }
    }else{
         this.contractService._post(APIS.CONTRACT.changeClauseDel,{clauseId:data['clauseId']})
        .then((res: any) => {
            if(res.errcode == 0){
                this.msg.create('success',"保存成功")
                let index = this.documentsSource.clausesList.indexOf(data)
       if(index > -1){
           this.documentsSource.clausesList.splice(index,1)
            this.cdr.detectChanges();
       }

            }else{
                this.msg.create('warning',"保存失败")
            }
        })

    }
}
//添加条件
addTerm(){
     let row = {"lineNum":this.documentsSource.terms.length+1,'isNew':true}
    this.documentsSource.terms.push(row)
}
//删除条件
delTerm(data){
    if(data['isNew']){
       let index = this.documentsSource.terms.indexOf(data)
       if(index > -1){
           this.documentsSource.terms.splice(index,1)
       }
    }else{
         this.contractService._post(APIS.CONTRACT.changeTermDel,{termId:data['termId']})
        .then((res: any) => {
            if(res.errcode == 0){
                this.msg.create('success',"删除成功")
                let index = this.documentsSource.terms.indexOf(data)
                console.log(index)
       if(index > -1){
           this.documentsSource.terms.splice(index,1)
       }
        this.cdr.detectChanges();

            }else{
                this.msg.create('warning',"删除失败")
            }
        })

    }
}

//处理附件

handleAttach(type,data){
    if (type == 0){
         location.href = APIS.CONTRACT.downloadAttach + data['attachmentId'];
    }else{
    this.delAttach(data)
    }

}
//删除附件
delAttach(data){
         this.contractService._post(APIS.CONTRACT.changeAttachDel,{attachmentId:data['attachmentId']})
        .then((res: any) => {
            if(res.errcode == 0){
                this.msg.create('success',"删除成功")
                let index = this.documentsSource.attachments.indexOf(data)
                console.log(index)
       if(index > -1){
           this.documentsSource.attachments.splice(index,1)
       }
        this.cdr.detectChanges();

            }else{
                this.msg.create('warning',"删除失败")
            }
        })

}

//保存
changeSave(){
        this.documentsSource.header['changeName'] = this.form.value['changeName']
    this.documentsSource.header['responsiblePersonName'] = this.form.value['responsiblePersonName']
    this.documentsSource.header['comments'] = this.form.value['comments']
     this.contractService._post(APIS.CONTRACT.changeSave,this.documentsSource)
        .then((data: any) => {
            if(data.errcode == 0){
                this.msg.create('success',"保存成功")
                this.getData(this.currentId)
            }else{
                this.msg.create('warning',"保存失败")
            }
            this.cdr.detectChanges();

})
}
//提交
changeSubmit(){
    this.documentsSource.header['changeName'] = this.form.value['changeName']
    this.documentsSource.header['responsiblePersonName'] = this.form.value['responsiblePersonName']
    this.documentsSource.header['comments'] = this.form.value['comments']
     this.contractService._post(APIS.CONTRACT.changeSubmit,this.documentsSource)
        .then((data: any) => {
            if(data.errcode == 0){
                this.msg.create('success',"提交成功")
                this.getData(this.currentId)
            }else{
                this.msg.create('warning',"提交失败")
            }
            this.cdr.detectChanges();

})
}
//取消
changeCancel(){
 
     this.contractService._post(APIS.CONTRACT.changeCancel,{'okcChangeId':this.currentId})
        .then((data: any) => {
            if(data.errcode == 0){
                this.msg.create('success',"取消成功")
                this.getData(this.currentId)
            }else{
                this.msg.create('warning',"取消失败")
            }
            this.cdr.detectChanges();

})
}

//设置禁用

setDisable(header){
    if(header['status'] == 'CREATING'){
        this.btnStatus =[false,false,false,false,true,false,false]
         this.searchFields[1]['disabled'] = false;
         this.searchFields[6]['disabled'] = false;
         this.searchFields[10]['disabled'] = false;

        
    }else if(header['status'] == 'APPROVALING'){
        this.btnStatus =[false,false,false,false,true,false,false]
        this.setFieldDisabled()
    }else if(header['status'] == 'APPROVED'){
        this.btnStatus =[true,true,true,true,false,false,false]
        this.setFieldDisabled()
    }else if(header['status'] == 'REJECTED'){
        this.btnStatus =[true,true,true,true,true,false,true]
        this.setFieldDisabled()
    }else if(header['status'] == 'EFFECTIVE'){
        this.btnStatus =[false,false,false,false,true,false,false]
        this.setFieldDisabled()
    }else if(header['status'] == 'CANCELLED'){
        this.btnStatus =[true,true,true,true,true,false,true]
        this.setFieldDisabled()
         

    }
}
//设置禁用
setFieldDisabled(){
     this.documentsField.lines.forEach(val=>{
            val['disabled'] = true
        })
         this.documentsField.terms.forEach(val=>{
            val['disabled'] = true
        })
          this.documentsField.clausesList.forEach(val=>{
            val['disabled'] = true
        })
        this.documentsField.clausesList[0]['disabled'] = false
          this.documentsField.attachments.forEach(val=>{
            val['disabled'] = true
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







}
