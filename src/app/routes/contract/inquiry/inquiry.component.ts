import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ViewChild,
    OnInit,
    TemplateRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NzMessageService, NzModalService,NzTabChangeEvent } from 'ng-zorro-antd';
import CustomStore from 'devextreme/data/custom_store';
import { STColumn } from '@delon/abc';
import {APIS} from '../../../../api';
import {ContractService} from '../contract.service';

@Component({
    selector: 'app-inquiry',
    templateUrl: './inquiry.component.html',
    styleUrls: ['./inquiry.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InquiryComponent implements OnInit {
    description:string =''
    searchModal:any;
    selectedRowKeys:any = []

    data = [];
    selectedContract:any = {okHeaderId:null};
    searchMore:boolean = false;
    searchWords:string = '简单搜索';
    //弹出框搜索字段
    searchSelected:any ={}
    searchSource:any = {}
    searchField:any = []
    searchApi:string = ''
    search:any = {queryName:'',queryWords:''}
    dataSource:any = []
    dataField:any = [{'field':'rowNo','title':'序号'},
        {'field':'contractNumber','title':'合同编号'},
    {'field':'contractName','title':'合同名称'},
    {'field':'versionNum','title':'合同版本'},
    {'field':'okcPartyA','title':'合同甲方'},
    {'field':'okcPartyB','title':'合同乙方'},
    {'field':'contractStatusDesc','title':'合同状态'},
    {'field':'contractCategory:','title':'合同分类'},
    {'field':'contractCategoryName','title':'分类'},
    {'field':'contractAmount','title':'合同金额'},
    {'field':'orgName','title':'承办公司'},
    {'field':'responsibleDeptName','title':'承办部门'},
    {'field':'responsiblePersonName','title':'承办人'},
    {'field':'orderType','title':'订单类型'},
    {'field':'lastApprovePersonName','title':'当前审批人'},
    {'field':'creationDate','title':'合同创建日期'},
    {'field':'approveDate','title':'合同审批日期'},
    {'field':'signDate','title':'合同签订日期'},
    {'field':'effectDate','title':'合同生效日期'},
    {'field':'effectSystemDate','title':'系统生效日期'},
    {'field':'authorizedFileNumber','title':'批复文件编号'},
    ]
    searchFields:any = [
        {'field':'contractNumber','title':'合同编号','type':'0'},
        {'field':'contractName','title':'合同名称','type':'0'},
        {'field':'contractCategory','title':'合同分类','type':'3','searchField':[{'field':'contractCategory','title':'分类代码'},{'field':'contractCategoryDesc','title':'分类说明'},{'field':'contractCategoryDes','title':'分类'}],'searchApi':APIS.SEARCH.getCategory},
        {'field':'contractAmountFm','title':'合同金额从','type':'0'},
        {'field':'contractAmountTo','title':'合同金额至','type':'0'},
        {'field':'orgId','title':'承办公司','type':'1','options':[{field:'',label:''}]},
        {'field':'responsibleDeptCode','title':'承办部门','type':'3','searchField':[{'field':'deptName','title':'部门名称'},{'field':'deptCode','title':'部门编码'}],'searchApi':APIS.SEARCH.deptData},
        {'field':'responsiblePersonName','title':'承办人','type':'3','searchField':[{'field':'employeeName','title':'员工姓名'},{'field':'employeeNum','title':'员工编号'}],'searchApi':APIS.SEARCH.employee},
        {'field':'executeDeptCode','title':'执行部门','type':'3','searchField':[{'field':'deptName','title':'部门名称'},{'field':'deptCode','title':'部门编码'}],'searchApi':APIS.SEARCH.deptData},
        {'field':'contractStatus','title':'合同状态','type':'1','options':[{'value':'','label':''},{'value':'SPZ','label':'审批中'},{'value':'YZZ','label':'已中止'},{'value':'DELETE','label':'已作废'},{'value':'YQX','label':'已取消'},{'value':'YPZ','label':'已批准'},{'value':'YJJ','label':'已拒绝'},{'value':'YSX','label':'已生效'},{'value':'ZCZZ','label':'已竣工'},{'value':'YQD','label':'已签订'},{'value':'FZCZZ','label':'已终止'},{'value':'ND','label':'拟定中'},{'value':'ZZGB','label':'最终关闭'},{'value':'CXTQ','label':'需重新提交'}]},
        {'field':'okcPartyA','title':'合同甲方','type':'3','searchField':[{'field':'unitName','title':'单位名称'},{'field':'sourceType','title':'单位类型'}],'searchApi':APIS.SEARCH.okcPartyA},
        {'field':'okcPartyB','title':'合同乙方','type':'3','searchField':[{'field':'unitName','title':'单位名称'},{'field':'sourceType','title':'单位类型'}],'searchApi':APIS.SEARCH.okcPartyB},
        {'field':'majorFlag','title':'重大合同','type':'1','options':[{field:'',label:''},{field:'Y',label:'是'},{field:'N',label:'否'}]},
        {'field':'RLFlag','title':'燃料合同','type':'1','options':[{field:'',label:''},{field:'Y',label:'是'},{field:'N',label:'否'}]},
        {'field':'searchAgentName','title':'采购员','type':'3','searchField':[{'field':'employeeName','title':'员工姓名'},{'field':'employeeNum','title':'员工编号'}],'searchApi':APIS.SEARCH.employee},
    ]
    moreSearchFields:any = [
        {'field':'projectNumber','title':'项目编号','type':3,'searchField':[{'field':'projectNumber','title':'项目编号'},{'field':'projectName','title':'项目名称'}],'searchApi':APIS.SEARCH.getProject},
        {'field':'projectName','title':'项目名称','type':0},
        {'field':'taskName','title':'任务','type':3,'searchField':[{'field':'taskName','title':'任务名称'},{'field':'taskNumber','title':'任务编号'}],'searchApi':APIS.SEARCH.getTask},
        {'field':'contractType','title':'合同类型','type':1,'options':[{field:'',label:''},{field:'GDDJHT',label:'单价合同'},{field:'ZJHT',label:'总价合同'},{field:'KJXYHT',label:'框架协议'},{field:'CYCGXY',label:'长约采购协议'}]},
        {'field':'templateFlag','title':'合同模板','type':1,'options':[{'value':'','label':''},{'value':'Y','label':'是'},{'value':'N','label':'否'}]},
        {'field':'creationDateFm','title':'创建日期从','type':2},
        {'field':'creationDateTo','title':'创建日期至','type':2},
        {'field':'effectDateFm','title':'生效日期从','type':2},
        {'field':'effectDateTo','title':'生效日期至','type':2},
        {'field':'buyMethod','title':'采购方式','type':1,'options':[{field:'',label:''},{field:'BIDDING',label:'公开招标'},{field:'BIDINVIT',label:'邀请招标'},{field:'CONTINUE',label:'续标'},{field:'GKZDY',label:'公开招标转单一来源'},{field:'GKZXJ',label:'公开招标转竟询价'},{field:'INQUIRY',label:'询价采购'},{field:'NEGO',label:'竞争性谈判'},{field:'ONLINE',label:'网上询价'},{field:'POSTANDARD',label:'单一来源采购'},{field:'RELATEDTRANSACTION',label:'关联交易'},{field:'RLRCSG',label:'市场采购'},{field:'RLRCSG',label:'市场采购'},{field:'RLSNZG',label:'省内直供'},{field:'RLSWZK',label:'省外直供'},{field:'XJZDY',label:'竞询转单一来源'}]},
        {'field':'historyFlag','title':'历史版本','type':1,'options':[{'value':'','label':''},{'value':'Y','label':'是'},{'value':'N','label':'否'}],},
        {'field':'orderType','title':'单据类型','options':[{'value':'','label':''},{'value':'order','label':'订单'},{'value':'contract','label':'合同'}],'type':1},
        {'field':'contractIntention','title':'合同意向','type':1,'options':[{field:'',label:''},{field:'BUY',label:'购买'},{field:'SELL',label:'销售'}]},
        {'field':'effectSystemDateFm','title':'系统生效日期从','type':2},
        {'field':'effectSystemDateTo','title':'系统生效日期至','type':2},
        {'field':'searchAuthorizedFileNumber','title':'批复文件编号','type':'0'},
    ]
    form: FormGroup;
    //{{detailSource[4]['okcClase'][0]['clauseContent']}}
    detailSource:any = [{},{'okcCntrt':[]},{'okcLines':[]},{'okcPayct':[]},{'okcClase':[{'clauseContent':''}]},{'okcAthmt':[]},{'okcClear':[]},{'okcPaymt':[]},{'okcAprvl':[]},{'okcChange':[]},{'okcProbm':[]},{'okcBill':[]},{'okcService':[]},{'okcRecord':[]}]

    detailIndex:number = 0
    detailForm:any = [
        {'field':'contractNumber','title':'合同编号','value':''},
        {'field':'contractName','title':'合同名称','value':''},
        {'field':'versionNum','title':'合同版本','value':''},
        {'field':'contractIntention','title':'合同意向','value':''},
        {'field':'contractAmount','title':'合同总额','value':''},
        {'field':'contractAmountNotax','title':'合同不含税额','value':''},
        {'field':'currencyDesc','title':'币种','value':''},
        {'field':'majorFlag','title':'重大合同','value':''},
        {'field':'orgName','title':'承办公司','value':''},
        {'field':'responsibleDeptCode','title':'承办部门','value':''},
        {'field':'executeDeptCode','title':'需求部门','value':''},
        {'field':'signLocation','title':'签订地点','value':''},
        {'field':'responsiblePersonName','title':'承办人','value':''},
        {'field':'projSpecialPersonName','title':'需求人','value':''},
        {'field':'agentName','title':'采购员','value':''},
        {'field':'agentLevelDesc','title':'合同分类','value':''},
        {'field':'contractCategory','title':'采购层级','value':''},
        {'field':'contractCategoryDesc','title':'分类说明','value':''},
        {'field':'contractType','title':'合同类型','value':''},
        {'field':'contractTypeDesc','title':'类型说明','value':''},
        {'field':'creationDate','title':'创建日期','value':''},
        {'field':'relatedContractNumber','title':'相关合同编号','value':''},
        {'field':'authorizedFileNumber','title':'批复文件编号','value':''}]


        detailFields:any = [[{'field':'roleDesc','title':'角色'},{'field':'unitName','title':'单位名称'},{'field':'contactName','title':'联系人'},{'field':'contactPhone','title':'联系电话'},{'field':'fax','title':'传真号'},{'fieldtax':'','title':'税号'},{'field':'locations','title':'单位地址'},{'field':'payeeBanks','title':'收款方开户银行'},{'field':'bankNumber','title':'开户行银行联行号'},{'field':'state','title':'开户行省份'},{'field':'city','title':'开户行城市'},{'field':'','title':'开户名称'},{'field':'bankAccount','title':'银行账号'},{'field':'purchasingType','title':'采购类型'}],
            [{'field':'lineNum','title':'行号'},{'field':'lineType','title':'标的类别'},{'field':'itemNumber','title':'物料编码'},{'field':'itemDesc','title':'物料说明'},{'field':'itemDesc','title':'规格'},{'fielditemTh':'','title':'图号'},{'field':'itemCz','title':'材质'},{'field':'quantity','title':'数量'},{'field':'quantityReceived','title':'已接收数量'},{'field':'quantityAccepted','title':'已入库数量/已确认数量'},{'field':'quantityInvoice','title':'已开票数量'},{'field':'itemUom','title':'单位'},{'field':'taxUnitPrice','title':'含税价'},{'field':'tax','title':'税率(%)'},{'field':'baseUnitPrice','title':'非含税价'},{'field':'taxAmount','title':'含税总价'},{'field':'baseAmount','title':'不含税总价'},{'field':'arrivalDate','title':'到货时间'},{'field':'startWorkDate','title':'开工时间'},{'field':'completedDate','title':'完工时间'},{'field':'locationCode','title':'交货地点'},{'field':'comments','title':'备注'},{'field':'projectNum','title':'项目编号'},{'field':'projectName','title':'项目名称'},{'field':'taskName','title':'任务'},{'field':'expenditureType','title':'支出类型'},{'field':'requisitionNumber','title':'采购计划单号'},{'field':'poNumber','title':'采购订单编号'},{'field':'requisitionLineNum ','title':'计划行号'},{'field':'poLineNum','title':'订单行号'},{'field':'requisitionComments','title':'计划备注'},{'field':'documentNumber ','title':'询价单号'},{'field':'auctionLineNum ','title':'询价单行'},{'field':'auctionComments','title':'报价备注'},{'field':'concatenatedSegments','title':'科目'},{'field':'itemCharacter','title':'物资性质'},{'field':'usedPersonName ','title':'用料人'},{'field':'shipAlertDay','title':'发货提醒'}],
        [{'field':'lineNum','title':'序号'},{'field':'clauseTypesDesc','title':'款项类型'},{'field':'paymentWayDesc','title':'付款方式'},{'field':'paymentPercent','title':'付款比例(%)'},{'field':'paymentAmount','title':'付款金额'},{'field':'schedulePaymentDate','title':'计划付款时间'},{'field':'projectName','title':'项目编号'},{'field':'taskName','title':'项目任务'},{'field':'comments','title':'备注'}],[],
        [{'field':'attachmentId','title':'附件ID'},{'field':'attachmentName','title':'附件名称'},{'field':'fileName','title':'文件名'},{'field':'createPerson','title':'上传者'},{'field':'createDate','title':'上传时间'},{'field':'','title':'导出'}],
        [{'field':'invoiceNum','title':'发票编号'},{'field':'','title':'结算申请时间'},{'field':'','title':'结算申请状态'},{'field':'glDate','title':'挂账日期'},{'field':'invoiceAmount','title':'发票含税金额'},{'field':'amount','title':'不含税总价'},{'field':'totalTaxAmount','title':'税额'},{'field':'','title':'结算比例'}],
        [{'field':'paymentNum','title':'付款编号'},{'field':'payReqDate','title':'付款申请时间'},{'field':'payReqStatus','title':'付款申请状态'},{'field':'invoiceNum','title':'发票编号'},{'field':'amount','title':'已付款金额'},{'field':'checkDate','title':'付款日期'}],
        [{'field':'approveSeq','title':'序号'},{'field':'fromUserName','title':'发件人'},{'field':'approveRoleName','title':'审批角色'},{'field':'toUserName','title':'审批人'},{'field':'countersignFlag','title':'是否会签'},{'field':'action','title':'操作'},{'field':'actionDate','title':'审批时间'},{'field':'comments','title':'审批意见'}],
        [{'field':'changeNumber','title':'变更编号'},{'field':'changeName','title':'变更名称'},{'field':'contractNumber','title':'合同编号'},{'field':'contractName','title':'合同名称'},{'field':'changeAmount','title':'变更金额'},{'field':'changeContentDesc','title':'变更类型'},{'field':'comments','title':'变更状态'},{'field':'comments','title':'变更描述'},{'field':'creationDate','title':'创建日期'}],

        [{'field':'applyNumber','title':'需求计划编号'},{'field':'lineNumber','title':'行号'},{'field':'itemNumber','title':'物料编码'},{'field':'itemDescription','title':'物料说明'},{'field':'demandQuantiry','title':'需求数量'},{'field':'uom','title':'单位'},{'field':'itemCost','title':'参考单价'},{'field':'applyStatusCodeDesc','title':'状态'},{'field':'needDate','title':'需求日期'},{'field':'projectNumber','title':'项目编号'},{'field':'projectName','title':'项目名称'},{'field':'taskNumber','title':'任务编号'},{'field':'','title':'任务名称'},{'field':'expenditureType','title':'支出类型'},{'field':'applyDeparment','title':'需求部门'},{'field':'applierUser','title':'需求人员'},{'field':'reqNumber','title':'采购计划编号'},{'field':'reqLineNum','title':'采购计划行号'},{'field':'quantity','title':'采购计划数量'},{'field':'quotNumber','title':'定价单编号'},{'field':'vendorName','title':'供应商'},{'field':'vendorSiteCode','title':'供应商地点'},{'field':'poLineNum','title':'定价单行号'},{'field':'plaQuantity','title':'数量'},{'field':'taxUnitPrice','title':'含税单价'},{'field':'tax','title':'税率'},{'field':'totalTaxAmount','title':'含税总额'}],
        [{'field':'receivebillNumber','title':'服务接收编号'},{'field':'statusDesc','title':'状态'},{'field':'allShouldContractAmount','title':'结算金额'},{'field':'checkContractAmount','title':'考核金额'},{'field':'awardContractAmount','title':'水费'},{'field':'waterFireAmount','title':'电费'},{'field':'allFactContractAmount','title':'本次实付金额'},{'field':'responsiblePersonName','title':'创建人'},{'field':'creationDate','title':'创建日期'},{'field':'comments','title':'备注'}],
        [{'field':'recordId','title':'备注ID'},{'field':'recordName','title':'备注名称'},{'field':'changeConten','title':'备注类型'},{'field':'comments','title':'备注描述'},{'field':'responsiblePersonName','title':'创建人'},{'field':'creationDate','title':'创建日期'}],

        ]         
        detailTab:any=['okcCntrt','okcLines','okcPayct','okcClase','okcAthmt','okcClear','okcPaymt','okcAprvl','okcChage','okcBill','okcService','okcRecord']






        constructor(
            private cdr: ChangeDetectorRef,
            private fb: FormBuilder,
            public msg: NzMessageService,
            private modalSrv: NzModalService,
            private router: Router,
            private contractService:ContractService
        ) {
                    }

        ngOnInit() {
            //获得承办公司名称
            this.contractService._get(APIS.SEARCH.getOrgId)
            .then((data: any) => {
                let row = []
                console.log(data)
                data.data.forEach(val=>{
                    row.push({'value':val['orgId'],'label':val['orgName']})
                })
                if(row.length != 0){   
                    this.searchFields[5]['options'] = row
                }
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
                RLFlag:[null,[]],
                searchAuthorizedFileNumber:[null,[]],
                searchAgentName:[null,[]],
                projectNumber:[null,[]],
                projectName:[null,[]],
                taskNumber:[null,[]],
                taskName:[null,[]],
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

            this.change({ index: 0, tab: null });

        }

        showMore(){
            if(this.searchMore == true){
                this.searchMore = false;
                this.searchWords = '简单搜索';

            }else{
                this.searchMore = true;
                this.searchWords = '高级搜索';
            }
            console.log(this.dataSource)
        }

        getData(data){
            this.contractService._post(APIS.CONTRACT.query+'/inquiry',data)
            .then((data: any) => {
                this.dataSource = data.data;
                this.cdr.detectChanges();
            })


        }

        _submitForm() {

            for (const i in this.form.controls) {
                this.form.controls[i].markAsDirty();
                this.form.controls[i].updateValueAndValidity();
            }
            if (this.form.invalid) return;
             /*this.dataSource = [];
            this.cdr.detectChanges();*/
            this.getData(this.form.value);
        }

        getSearchData(){
            let params = '?';
            params += 'queryName=' + this.search.queryName;
            params += '&queryWords=' + this.search.queryWords;
            if(this.search.queryName == 'taskNumber'|| this.search.queryName == 'taskName'){
                params += '&projectNumber='+this.form.controls['projectNumber'].value;
            }
            this.contractService._get(this.searchApi + params)
            .then((data: any) => {
                this.searchSource = data.data
            })


        }
         //date selectet
    onChange(e,item){
        console.log(e)
    }


        selectionChangedHandler(e){
            console.log(this.selectedRowKeys)
            this.searchSelected = e.selectedRowsData[0];
            this.searchModal.triggerOk();

        }
        //列表选中处理
        selectionItem(e){

            //console.log(e.selectedRowsData[0])
            this.selectedContract = e.selectedRowsData[0];
            let params = {'okcHeaderId':e.selectedRowsData[0].okcHeaderId,'versionNum':e.selectedRowsData[0].versionNum}
            this.contractService._post(APIS.CONTRACT.getDetail, params)
            .then((data: any) => {
                this.detailSource = data['data'];
                this.detailForm.forEach((v)=>{
                    //v.value = e.selectedRowsData[0][v['field']]
                    v.value = data['data'][0]['Hdrs'][0][v['field']]
                })
                this.cdr.detectChanges();

            })
            return

        }

        reset(){
            this.form.reset();
        }


        add(tpl: TemplateRef<{}>,item) {

            this.searchField = item.searchField;
            //任务弹窗需要判断是否已选业务
            console.log(this.form.controls['projectNumber'].value)
            if (this.searchField[0]['field'] == 'taskName' && this.form.controls['projectNumber'].value== null){
                this.msg.create('warning','还没有选择项目')
                return
            }
            this.search.queryName = this.searchField[0]['field']
            this.searchApi = item.searchApi;
            this.searchSource = [];
            this.searchModal = this.modalSrv.create({
                nzTitle: '搜索',
                nzContent: tpl,
                nzOnOk: () => {
                    if(this.selectedRowKeys.length > 0){
                        this.form.controls[item.field].setValue(this.selectedRowKeys[0]);
                        if (item.field == 'projectNumber'){
                            this.form.controls['projectName'].setValue(this.searchSelected['projectName']);
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

        editContract(){
            console.log(this.selectedContract)
            if(this.selectedContract['okcHeaderId'] == null){
                this.msg.create('warning','请先选择合同')
                return

            }
            if(this.selectedContract['contractStatus'] == 'YPZ'){
                this.contractService._post(APIS.CONTRACT.version,{'okcHeaderId':this.selectedContract['okcHeaderId']})
                .then((data: any) => {
                    if (data.errcode == 0){
                        this.router.navigateByUrl('/contract/update/'+this.selectedContract['okcHeaderId']);
                    }
                })
            }else if(this.selectedContract['contractStatus'] == 'ND'){
                this.router.navigateByUrl('/contract/update/'+this.selectedContract['okcHeaderId']);

            }else{
                this.msg.create('warning','该合同不能修改了')
                return
            }





        }
        


}


