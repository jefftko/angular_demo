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
import {ContractService} from '../contract.service';
import {APIS} from '../../../../api';

@Component({
    selector: 'app-change',
    templateUrl: './change.component.html',
    styleUrls: ['./change.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeComponent implements OnInit {

    searchWords:string = '搜索';
    form: FormGroup;
    searchModal:any;
    selectedRows: any[] =[];
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
        {'field':'changeStatus','title':'变更状态','type':'1','options':[{'value':'','label':''},{'value':'APPROVALING','label':'审批中'},{'value':'CANCELLED','label':'已取消'},{'value':'APPROVED','label':'已批准'},{'value':'REJECTED','label':'已拒绝'},{'value':'EFFECTIVE','label':'已生效'},{'value':'CREATING','label':'拟定'}]},
        {'field':'changeOrg','title':'提出单位','type':'1','options':[{'value':'','label':''},{'value':'A','label':'甲方'},{'value':'B','label':'乙方'},{'value':'C','label':'核算方'},{'value':'D','label':'丙方'}]},
        {'field':'orgId','title':'承办单位','type':'1','options':[{field:'',label:''}]},
          {'field':'responsiblePersonName','title':'承办人','type':'3','searchField':[{'field':'employeeName','title':'员工姓名'},{'field':'employeeNum','title':'员工编号'}],'searchApi':APIS.SEARCH.employee},



    ]

    dataField:any = [
    {'field':'okcChangeId','title':'','template':'checkbox'},
    {'field':'rowNo','title':'序号','template':'text'},
    {'field':'changeNumber','title':'变更申请单编号','template':'link'},
    {'field':'changeName','title':'变更名称','template':'text'},
    {'field':'contractNumber','title':'合同编码','template':'text'},
    {'field':'contractName','title':'合同名称','template':'text'},
    {'field':'changeAmount','title':'变更金额','template':'text'},
    {'field':'changeContentDesc','title':'变更类型','template':'text'},
    {'field':'statusDesc','title':'变更状态','template':'text'},
    {'field':'comments','title':'变更描述','template':'text'},
    {'field':'creationDate','title':'创建日期','template':'text'},
    ]
    allMode: string;
    checkBoxesMode: string;


    constructor(
        private cdr: ChangeDetectorRef,     
        private fb: FormBuilder,
        public msg: NzMessageService,
        private modalSrv: NzModalService,
        private contractService:ContractService,
        private router:Router,
    ) {
        this.allMode = 'allPages';
        this.checkBoxesMode = 'onClick'

    
    }

    ngOnInit() {
        this.form = this.fb.group({
            contractNumber: [null, []],
            contractName:[null,[]],
            changeStatus:[null,[]],
            changeOrg:[null,[]],
            orgId:[null,[]],
            responsiblePersonName:[null,[]]
        });

        this.contractService._get(APIS.SEARCH.getOrgId).then((data:any)=>{
              let row = []
            if (data['data'] != undefined){
            data.data.forEach(val=>{
                row.push({'value':val['orgId'],'label':val['orgName']})
            })
            if(row.length != 0)
                this.searchFields[4]['options'] = row
            }

        })

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
    //去详情页
    onListSelection(e){
        console.log(e)
        console.log(e.selectedRowsData)
        console.log(this.selectedRows)
        console.log(e.selectedRowsData[0]['status'])

    }
    //用户触发checkbox
    updateItemsChecked(data){
        let index = this.selectedRows.indexOf(data['okcChangeId'])
        if( index == -1){
            this.selectedRows.push(data['okcChangeId']);
        }else{
            this.selectedRows.splice(index,1)
        }
        console.log(this.selectedRows)


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
    }
   


    //搜索变更列表数据

    getData(data){
        this.contractService._post(APIS.CONTRACT.getSearchList,data)
        .then((data: any) => {
            this.dataSource = data.data;
            this.cdr.detectChanges();
            })


}

goDetail(id){
    this.router.navigateByUrl('/contract/change-detail/'+id);
}
//列表选中
changeDetail(data){
    console.log(data)
    this.goDetail(data['okcChangeId'])
}
//生效
changeActive(){
     this.contractService._post(APIS.CONTRACT.changeActive,{data:this.selectedRows})
        .then((data: any) => {
             this.msg.create('success',"生效成功")
             this.getData(this.form.value);

            })
}



  onCellPrepared(e: any) {
      console.log(e)
 
  }



}
