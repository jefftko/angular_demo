# 合同资产系统接口文档 v1.0.0


0. [返回格式定义](#请求返回格式定义)
1. [合同主页](#合同主页)
 	1. [图标模块](#图表模块)
 	2. [合同审批模块](#合同审批模块)
 	3. [合同付款模块](#合同付款模块)
2. [合同查询](#合同查询)
   1. [搜索模块](#合同搜索模块)
   2. [查询列表](#查询列表)
   3. [修改合同](#修改合同)
   4. [合同详情](#合同详情)
3. [合同签订生效](#合同签订生效)
   1. [搜索模块](#搜索模块)
   2. [查询列表](#查询签订生效列表)
   3. [更新签订生效状态](#更新签订生效状态)
   4. [查看附件](#查看附件)
4. [合同中止](#合同中止)
 	1. [搜索模块](#中止搜索模块)
 	2. [查询列表](#查询中止合同列表)
 	3. [合同中止/恢复](#合同中止恢复)
 	4. [中止审批历史纪录](#中止审批历史纪录)
 	5. [中止恢复审批历史纪录](#中止恢复审批历史纪录)
 	6. [合同相关单据执行情况](#合同相关单据执行情况)
 	7. [查看附件](#查看附件)
5. [合同更改](#合同更改)
	1. [查询列表](#查询更改记录)
 	

## 请求返回格式定义
  ```
  {errcode:0,errmsg:'OK','data':[]}
  ```
  + code值对应表
  


| code值 | 是否必要 | 
 ---  | ---  |
 0 |成功

## 合同主页
### 图表模块
+ 请求URL

```
/chart

```
+ 请求方式

```
GET
```
+ 请求参数
```无```

+ 返回示例

```
[
{x: '审批中',y: 12,},
  {x: '已中止',y: 21,}
  ]
```

### 合同审批模块
+ 请求URL

```
/dashboard/approve

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
skip | 必须 | 起始index  
take | 必须 | 默认 12条,获取长度
orderby | 非必须 | 排序 ASC /DESC


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  totalCount | 总数
  items | 项目列表
   -- id | 序号
   -- contract_no |'合同编号'
   -- contract_name | '合同名称'
   -- status | 合同状态
   -- approver | 当前审批人
   -- apply_date | 提报日期
   -- inform_date | '通知日期'


+ 返回示例

```
{"totalCount":12,"items":[
                {'id':'1','contract_no':'520012ZH20180010','contract_name':'脱硫其他服务协议-2019年','status':'审批中','approver':'黄峻','apply_date':'2018-12-26 14:13:42','inform_date':'2018-12-28 15:44:09'}]}
```

### 合同付款模块

+ 请求URL

```
/dashboard/payment

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
skip | 必须 | 起始index  
take | 必须 | 默认 12条,获取长度
orderby | 非必须 | 排序 ASC /DESC


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  totalCount | 总数
  items | 项目列表
   -- id | 序号
   -- contract_name | 合同名称
   -- payment_no | 付款编号
   -- payment_apply_time | 付款申请时间
   -- status | '付款申请状态'
   -- 'invoice_no | 发票编号
   -- payment_money | 已付款金额
   -- payment_date | 付款日期

+ 返回示例

```
 {"totalCount":12,"items":[
 {'id':'1','contract_no':'520012ZH20180010','contract_name':'脱硫其他服务协议-2019年','status':'审批中','approver':'黄峻','apply_date':'2018-12-26 14:13:42','inform_date':'2018-12-28 15:44:09'},
 ]}

```
## 合同查询
### 搜索模块
#### 搜索合同
+ 请求URL

```
/search/getContract

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
queryName | 必须 | 搜索字段
queryWords | 必须 | 字段值


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- contractNumber | 合同编号
   -- contractName | 合同名称


+ 返回示例

```
{"items":[
{contractNumber:'50000022189',
contractName:'DCS数字量输入模块  1C31234G1',
headerId:'1821'}

```

#### 搜索合同甲方
+ 请求URL

```
/search/okcPartyA

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
queryName | 必须 | 搜索字段
queryWords | 必须 | 字段值


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- sourceType | 类型
   -- unitName | 名称


+ 返回示例

```
{"items":[{sourceType:'客户',unitName:'平顶山发电分公司'},
{sourceType:'客户',unitName:'郏县奥兰商务宾馆'}]}

```

#### 搜索合同乙方
+ 请求URL

```
/search/okcPartyB

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
queryName | 必须 | 搜索字段
queryWords | 必须 | 字段值


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- sourceType | 类型
   -- unitName | 名称


+ 返回示例

```
{"items":[{sourceType:'客户',unitName:'平顶山发电分公司'},
{sourceType:'客户',unitName:'郏县奥兰商务宾馆'}]}

```
#### 搜索承办部门
+ 请求URL

```
/search/getOrgId

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
queryName | 必须 | 搜索字段
queryWords | 必须 | 字段值


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- deptCode | 部门编码
   -- deptName | 部门名称


+ 返回示例

```
{"items":[{deptCode:'170',deptName:'52000409_人力资源部'},{deptCode:'165',deptName:'52000404_副总工程师'}]}


```
#### 搜索承办人
+ 请求URL

```
/search/employee

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
queryName | 必须 | 搜索字段
queryWords | 必须 | 字段值


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- employeeName | 姓名
   -- employeeNum | 编号


+ 返回示例

```
{"items":[{employeeName:'AC物资顾问',employeeNum:'3'},{employeeName:'丁高兴',employeeNum:'77161212'}]}


```
#### 搜索承办公司
+ 请求URL

```
/search/getOrgId

```
+ 请求方式

```
GET
```
+ 请求参数
```
无
```


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- orgName | 公司名称
   -- orgId | 编号


+ 返回示例

```
{"items":[{orgName:'520004_平顶山发电分公司',orgId:'81'}]}

```
#### 搜索执行部门
+ 请求URL

```
/search/getOrgId

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
queryName | 必须 | 搜索字段
queryWords | 必须 | 字段值


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- deptCode | 部门编码
   -- deptName | 部门名称


+ 返回示例

```
{"items":[{deptCode:'170',deptName:'52000409_人力资源部'},{deptCode:'165',deptName:'52000404_副总工程师'}]}


```

#### 搜索采购员
+ 请求URL

```
/search/employee

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
queryName | 必须 | 搜索字段
queryWords | 必须 | 字段值


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- employeeName | 姓名
   -- employeeNum | 编号


+ 返回示例

```
{"items":[{employeeName:'AC物资顾问',employeeNum:'3'},{employeeName:'丁高兴',employeeNum:'77161212'}]}


```

#### 搜索任务
+ 请求URL

```
/search/getOrgId

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
queryName | 必须 | 搜索字段
queryWords | 必须 | 字段值
projectNumber | 必须 | 项目编号


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- taskNumber | 编号
   -- task Name | 任务名称


+ 返回示例

```
{"items":[{taskName:'信息支出',taskNumber:'1'}]}


```

#### 搜索项目编号
+ 请求URL

```
/search/getOrgId

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
queryName | 必须 | 搜索字段
queryWords | 必须 | 字段值


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- projectNumber | 项目编号
   -- projectName | 项目名称


+ 返回示例

```
{"items":[{projectName:'2018年开封发电分公司资本化运维新建项目',projectNumber:'52000307180411 '}]}



```

###  查询列表
+ 请求URL

```
/contract/query

```
+ 请求方式

```
POST
```
+ 请求参数

| 参数 | 参数说明 |
  --- |---|
  contractNumber |合同编号
  contractName | 合同名称
  contractCategory | 合同分类
  contractCategory | 分类代码
  contractCategoryDesc |分类说明
  contractCategoryDes | 分类
  contractAmountFm | 合同金额从
  contractAmountTo | 合同金额至
  orgId | 承办公司
  responsibleDeptCode | 承办部门
  contractCategory|分类代码	
  contractCategoryDesc | 分类说明
  contractCategoryDes | 分类
  responsiblePersonName | 承办人
  executeDeptCode | 执行部门
  contractStatus| 合同状态
  okcPartyA |合同甲方
  okcPartyB | 合同乙方
  majorFlag | 重大合同  
  searchAuthorizedFileNumber | 批复文件编
  searchAgentName | 采购员
  projectNumber | 项目编号
  projectName | 项目名称
  taskNumber | 任务
  contractType | 合同类型'
  templateFlag | 合同模
  creationDateFm | 创建日期从
  creationDateTo | 创建日期至
  effectDateFm | 生效日期从
  effectDateTo | 生效日期至
  buyMethod | 采购方式
  historyFlag | 历史版本
  orderType | 单据类型
  contractIntention | 合同意向
  effectSystemDateFm | 系统生效日期从
  effectSystemDateTo | 系统生效日期至


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- okcHeaderId | 序号
   -- versionNum | 合同版本
   -- contractNumber | 合同编号
   -- contractName | 合同名称
   -- okcPartyA | 合同甲方
   -- okcPartyB | 合同乙方
   -- contractStatusDesc | 合同状态中文
   -- contractStatus | 合同状态
   -- changeStatus | 
   -- contractCategory | 合同分类
   -- contractCategoryName | 分类
   -- contractAmount | 合同金额
   -- orgName | 承办公司 
   -- responsibleDeptName | 承办部门
   -- responsiblePersonName | 承办人
   -- approveDate | 合同审批日期
   -- signDate | 合同签订日期
   -- effectDate | 合同生效日期
   -- effectSystemDate | 系统生效日期
   -- authorizedFileNumber | 批复文件编号
   -- orderType | 订单类型
   -- lastApprovePersonName | 当前审批人
   -- creationDate | 合同创建日期
   -- createdBy |
   -- lastUpdateBy |
   -- lastUpdateDate |
   -- lastUpdateLogin |
   
   
   
   
   

+ 返回示例

```
 {"items":[
 {templateFlag:"N",okcHeaderId:"11792",versionNum:"0",contractNumber:"520003JJ2019   
 0084",contractName:"13",  
okcPartyA:"国家电投集团河南电力有限公司开封发电分公司",okcPartyB:"中国电能成套设备有限公  
 司",contractStatusDesc:"已生 效",changeStatus:"",contractCategory:"JJ.  02.02",contractCategoryName:"SERVICE",contractAmount:"9000",orgName:"520003_开封发    
 电分公司",responsibleDeptName:"52000305_物资采购部",responsiblePersonName:"合同管理员",approveDate:"2019-02-18   
 12:02:27",signDate:"2019-02-18",effectDate:"2019-02-18",
effectSystemDate:"2019-02-18",authorizedFileNumber:"",orderType:"contract",lastApprovePersonName:"",creationDate:"2019-02-18 
 11:59:54.0",createdBy:"1170",lastUpdateBy:"1170",lastUpdateDate:"2019-02-18 11:59:54.0",lastUpdateLogin:"-1"},{templateFlag:"N",okcHeaderId:"11787",
 versionNum:"1",contractNumber:"520003JJ20190083",contractName:"11",okcPartyA:"国家电投集团河南电力有限公司开封发电分公司",okcPartyB:"中国电能成套设备有限公司",
 contractStatusDesc:"已生效",changeStatus:"变更中",contractCategory:"JJ.
 01.01",contractCategoryName:"SERVICE",contractAmount:"15000",
 orgName:"520003_开封发电分公司",responsibleDeptName:"52000305_物资采购部",responsiblePersonName:"合同管理员",approveDate:"2019-02-18 11:39:14",signDate:"2019-02-18",effectDate:"2019-02-19",  
effectSystemDate:"2019-02-18",authorizedFileNumber:"",orderType:"contract",lastApprovePersonName:"",creationDate:"2019-02-18 11:36:37.0",createdBy:"1170",lastUpdateBy:"1170",lastUpdateDate:"2019-02-18 11:51:39.0",lastUpdateLogin:"-1"},
 ]}

```
### 修改合同 

+ 请求URL

```
/contract/version

```
+ 请求方式

```
POST
```
+ 请求参数

| 参数 | 参数说明 |
--- |---|
okHeaderId | 合同ID


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  errcode | 0
  errmsg | OK


+ 返回示例

```
{"errcode":0,"errmsg":"OK"}

```


### 合同详情
+ 请求URL

```
/contract/getDetail

```
+ 请求方式

```
POST
```
+ 请求参数

| 参数 | 参数说明 |
  --- |---|
  versionNum |合同版本
  okcHeaderId | 合同ID
  


+ 返回参数

返回类型为数组,参考一下返回示例,这是原版的返回格式和字段
每一行数组里包含一个对象，对象里再包含数组
   

+ 返回示例

```json
[
    {
        "Hdrs":[
            {
                "okcHeaderId":"11861",
                "versionNum":"1",
                "contractNumber":"520003SC20180031-01",
                "contractName":"11111",
                "orgId":"82",
                "orgName":"520003_开封发电分公司",
                "contractCategory":"JJ.01.01",
                "contractCategoryDesc":"基建工程类.建安工程.缺省",
                "contractCategoryName":"SERVICE",
                "contractType":"ZJHT",
                "contractTypeDesc":"总价合同",
                "contractTypeAttribute1":"STANDARD",
                "contractTypeMeaning":"确定物资/服务采购单价和数量的采购合同。",
                "contractIntention":"BUY",
                "contractIntentionDesc":"购买",
                "buyMethod":"NEGO",
                "buyMethodDesc":"竞争性谈判",
                "majorFlag":"N",
                "majorFlagName":"否",
                "signLocation":"开封市",
                "globalFlag":"Y",
                "contractStatus":"YSX",
                "contractStatusDesc":"已生效",
                "suspendStatus":"",
                "suspendStatusDesc":"",
                "resumeStatus":"",
                "resumeStatusDesc":"",
                "contractAmount":"1000",
                "contractAmountNotax":"854.7008547",
                "contractOrigAmount":"1000",
                "contractOrigAmountNotax":"854.7",
                "responsiblePersonId":"61",
                "responsiblePersonName":"合同管理员",
                "responsibleDeptCode":"189",
                "responsibleDeptName":"52000305_物资采购部",
                "projSpecialPersonId":"101",
                "projSpecialPersonName":"AC物资顾问",
                "executeDeptCode":"189",
                "executeDeptName":"52000305_物资采购部",
                "agentId":"61",
                "agentName":"合同管理员",
                "comments":"",
                "relatedContractNumber":"520003SC20180031",
                "othersContractNum":"",
                "authorizedFileNumber":"",
                "shipToLocationId":"183",
                "shipToLocationCode":"SPIC_开封发电分公司",
                "billToLocationId":"15624",
                "billToLocationCode":"SPIC_河南新能源虚拟分公司",
                "projectId":"0",
                "projectNumber":"",
                "projectName":"",
                "taskId":"0",
                "taskNumber":"",
                "taskName":"",
                "appendOkcFlag":"N",
                "approveDate":"",
                "documentNum":"0",
                "concChangingFlag":"",
                "contractCategoryTag":"",
                "buyType":"PROJECT",
                "disputeResolution":"ARBITRATION",
                "disputeSettlement":"开封市",
                "estimateTotal":"",
                "floatingProportion":"",
                "agreementExpiryDate":"",
                "warranty":"0",
                "okcPartyA":"国家电投集团河南电力有限公司开封发电分公司",
                "okcPartyB":"中国电力企业联合会科技开发服务中心",
                "projectTypeCode":"",
                "projectType":"",
                "templateFlag":"N",
                "techTermsFlag":"N",
                "signDate":"2019-03-05",
                "effectDate":"2019-03-21",
                "effectSystemDate":"2019-03-05",
                "endDate":"",
                "endNnrmDate":"",
                "cancellDate":"",
                "cancelReson":"",
                "completeDate":"",
                "discontinueDate":"",
                "resumeDate":"",
                "objectVersionNumber":"1",
                "agentLevel":"ZC",
                "agentLevelDesc":"自采",
                "currencyCode":"CNY",
                "currencyDesc":"CNY",
                "lineType":"服务",
                "paProjectType":"",
                "projDepartmentCode":"",
                "projSubDepartmentCode":"",
                "paCategoryAttribute8":"",
                "paCategoryAttribute12":"",
                "orderType":"contract",
                "wfItemType":"CUXHTSP",
                "wfItemKey":"85685",
                "endWfItemType":"",
                "endWfItemKey":"",
                "suspendWfItemType":"",
                "suspendWfItemKey":"",
                "resumeWfItemType":"",
                "resumeWfItemKey":"",
                "finalCloseDate":"",
                "signComments":"",
                "genPoResult":"",
                "concSignPersonId":"101",
                "endComments":"",
                "endStatus":"",
                "isSignAuthorized":"",
                "okcPerformanceTime":"1",
                "changeStatus":"",
                "endStatusDesc":"",
                "concSignPersonName":"AC物资顾问",
                "typesOfDebt":"",
                "loanPeriod":"",
                "contractInterestRate":"",
                "arrangeMode":"",
                "goUpDown":"",
                "range":"",
                "otherChargesRates":"",
                "compositeInterestRate":"",
                "guaranteeType":"",
                "guarantee":"",
                "guaranteeAmount":"",
                "pledge":"",
                "typesOfLoans":"",
                "loanUnit":"",
                "unitOfAccount":"",
                "typesOfEnterprises":"",
                "useItem":"",
                "loanDay":"",
                "dueDate":"",
                "reportSubject":"",
                "debtComments":"",
                "creationDate":"2019-02-28 09:58:24.0",
                "createdBy":"1170",
                "lastUpdateBy":"1170",
                "lastUpdateDate":"2019-03-05 14:26:08.0",
                "lastUpdateLogin":"-1"
            }
        ]
    },
    {
        "okcCntrt":[
            {
                "okcContactId":"21431",
                "okcHeaderId":"11861",
                "roleCode":"A",
                "roleCodeDes":"甲方",
                "sourceId":"82",
                "sourceTable":"HR_OPERATING_UNITS",
                "unitName":"国家电投集团河南电力有限公司开封发电分公司",
                "contactName":"合同管理员,",
                "contactPhone":"0371-22729619",
                "payeeBanks":"建行开封电力支行",
                "bankNumber":"",
                "bankName":"",
                "bankAccount":"41001555527059336699",
                "purchasingType":"开封市新曹路以北火电厂老厂区东侧",
                "fax":"",
                "tax":"91410203556927805N",
                "state":"",
                "city":"",
                "objectVersionNumber":"0",
                "roleDesc":"甲方",
                "deleteFlag":"N",
                "locations":"开封市新曹路以北火电厂老厂区东侧",
                "creationDate":"2019-03-05 11:03:09.0",
                "createdBy":"1170",
                "lastUpdateBy":"1170",
                "lastUpdateDate":"2019-03-05 11:03:09.0",
                "lastUpdateLogin":"0"
            },
            {
                "okcContactId":"21432",
                "okcHeaderId":"11861",
                "roleCode":"B",
                "roleCodeDes":"乙方",
                "sourceId":"8661",
                "sourceTable":"AP_SUPPLIERS",
                "unitName":"中国电力企业联合会科技开发服务中心",
                "contactName":"",
                "contactPhone":"",
                "payeeBanks":"",
                "bankNumber":"",
                "bankName":"",
                "bankAccount":"",
                "purchasingType":"通用",
                "fax":"",
                "tax":"",
                "state":"",
                "city":"",
                "objectVersionNumber":"0",
                "roleDesc":"乙方",
                "deleteFlag":"N",
                "locations":"北京市海淀区复兴路甲1号",
                "creationDate":"2019-03-05 11:03:09.0",
                "createdBy":"1170",
                "lastUpdateBy":"1170",
                "lastUpdateDate":"2019-03-05 11:03:09.0",
                "lastUpdateLogin":"0"
            }
        ]
    },
    {
        "okcLines":[
            {
                "okcLineId":"30990",
                "okcHeaderId":"11861",
                "lineNum":"1",
                "lineTypeId":"1022",
                "lineType":"服务",
                "versionNum":"1",
                "inventoryItemId":"5003",
                "itemNumber":"910000000000001",
                "itemDesc":"服务类",
                "itemGg":"",
                "itemTh":"",
                "itemCz":"",
                "itemUom":"项",
                "quantity":"1",
                "quantityReceived":"",
                "quantityAccepted":"",
                "quantityReturn":"",
                "quantityInvoice":"",
                "unitPrice":"",
                "taxUnitPrice":"1000",
                "tax":"17",
                "changeTax":"",
                "baseUnitPrice":"854.70085470",
                "taxAmount":"1000",
                "baseAmount":"854.7",
                "arrivalDate":"",
                "startWorkDate":"2019-03-05",
                "completedDate":"2019-03-28",
                "locationCode":"",
                "orgId":"82",
                "comments":"",
                "projectId":"677",
                "projectNum":"52000307180411",
                "projectName":"2018年开封发电分公司资本化运维新建项目",
                "taskId":"15684",
                "taskName":"信息支出",
                "taskNum":"1",
                "expenditureTypeId":"10126",
                "expenditureType":"设备费",
                "requisitionHeaderId":"0",
                "requisitionNumber":"",
                "requisitionLineId":"0",
                "requisitionLineNum":"",
                "poHeaderId":"0",
                "poNumber":"",
                "poLineId":"0",
                "poLineNum":"",
                "requisitionComments":"",
                "auctionHeaderId":"0",
                "documentNumber":"",
                "auctionLineNum":"",
                "auctionComments":"",
                "accountId":"0",
                "concatenatedSegments":"",
                "itemCharacter":"",
                "itemCharacterDesc":"",
                "brandTrader":"",
                "usedPersonId":"-1",
                "usedPersonName":"",
                "shipAlertDay":"7",
                "objectVersionNumber":"1",
                "attributeCategory":"",
                "attribute1":"",
                "attribute2":"",
                "attribute3":"",
                "attribute4":"",
                "attribute5":"",
                "attribute6":"",
                "attribute7":"",
                "attribute8":"",
                "attribute9":"",
                "attribute10":"",
                "attribute11":"",
                "attribute12":"",
                "attribute13":"",
                "attribute14":"",
                "attribute15":"",
                "changeQuantity":"",
                "packDetailId":"0",
                "deptCode":"",
                "deptName":"",
                "account":"",
                "accountDes":"",
                "childAccount":"",
                "childAccountDes":"缺省",
                "estimateTotal":"",
                "noTaxEstimateTotal":"",
                "creationDate":"2019-03-05 11:03:40.0",
                "createdBy":"1170",
                "lastUpdateBy":"1170",
                "lastUpdateDate":"2019-03-05 14:26:08.0",
                "lastUpdateLogin":"0"
            }
        ]
    },
    {
        "okcPayct":[
            {
                "termId":"24125",
                "okcHeaderId":"11861",
                "lineNum":"1",
                "versionNum":"101",
                "clauseTypes":"JUSTSETTLEMENT",
                "clauseTypesDesc":"据实结算",
                "paymentWay":"PERCENTAGE",
                "paymentWayDesc":"百分比",
                "paymentPercent":"100",
                "paymentAmount":"1000",
                "schedulePaymentDate":"",
                "comments":"",
                "objectVersionNumber":"0",
                "projectId":"-1",
                "projectNum":"",
                "projectName":"",
                "taskId":"-1",
                "taskName":"",
                "taskNum":"",
                "attributeCategory":"",
                "norateContractAmount":"854.7",
                "tax":"17",
                "attribute1":"",
                "attribute2":"",
                "attribute3":"",
                "attribute4":"",
                "attribute5":"",
                "attribute6":"",
                "attribute7":"",
                "attribute8":"",
                "attribute9":"",
                "attribute10":"",
                "attribute11":"",
                "attribute12":"",
                "attribute13":"",
                "attribute14":"",
                "attribute15":"",
                "contractAmount":"1000",
                "contractStatus":"YSX",
                "concChangingFlag":"",
                "creationDate":"2019-03-05 11:04:15.0",
                "createdBy":"1170",
                "lastUpdateBy":"1170",
                "lastUpdateDate":"2019-03-05 11:04:15.0",
                "lastUpdateLogin":"0"
            }
        ]
    },
    {
        "okcClase":[
            {
                "clauseId":"39320",
                "okcHeaderId":"11861",
                "lineNum":"1",
                "serialNumber":"",
                "clauseTitle":"",
                "clauseContent":"<span> </span><p> <span>测测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span></p><span> </span><span style="font-family:等线;font-size:10.5pt;">测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试试测试测试</span>",
                "objectVersionNumber":"0",
                "attibuteCategory":"",
                "attribute1":"",
                "attribute2":"",
                "attribute3":"",
                "attribute4":"",
                "attribute5":"",
                "attribute6":"",
                "attribute7":"",
                "attribute8":"",
                "attribute9":"",
                "attribute10":"",
                "attribute11":"",
                "attribute12":"",
                "attribute13":"",
                "attribute14":"",
                "attribute15":"",
                "versionNum":"101",
                "needMaintain":"0",
                "updateState":"0",
                "contractStatus":"YSX",
                "concChangingFlag":"",
                "creationDate":"2019-03-05 14:19:29.0",
                "createdBy":"1170",
                "lastUpdateBy":"1170",
                "lastUpdateDate":"2019-03-05 14:19:29.0",
                "lastUpdateLogin":"0"
            }
        ]
    },
    {
        "okcAthmt":[

        ]
    },
    {
        "okcClear":[

        ]
    },
    {
        "okcPaymt":[

        ]
    },
    {
        "okcAprvl":[
            {
                "approveSeq":"0",
                "actionDate":"2019-03-05 14:22:16.0",
                "action":"提交",
                "fromUserName":"合同管理员",
                "toUserNum":"AC_HT",
                "toUserName":"",
                "approveRoleName":"",
                "countersignFlag":"否",
                "statusColor":"",
                "comments":""
            },
            {
                "approveSeq":"1",
                "actionDate":"2019-03-05 14:22:46.0",
                "action":"审批",
                "fromUserName":"合同管理员",
                "toUserNum":"AC_HT",
                "toUserName":"合同管理员",
                "approveRoleName":"经办人",
                "countersignFlag":"否",
                "statusColor":"",
                "comments":"同意，已按合规要求审查。"
            }
        ]
    },
    {
        "okcChage":[
            {
                "okcChangeId":"39319",
                "versionNum":"0",
                "okcHeaderId":"11875",
                "changeNumber":"520003SC20180031-01B01",
                "changeName":"支出类型",
                "contractNumber":"520003SC20180031-01",
                "okcVersionNum":"101",
                "contractName":"11111",
                "contractAmount":"1000",
                "contractType":"ZJHT",
                "contractCategory":"JJ.01.01",
                "contractIntention":"BUY",
                "changeAmount":"",
                "changeContent":"PROJECT",
                "changeContentDesc":"",
                "status":"EFFECTIVE",
                "statusDesc":"已生效",
                "comments":"支出类型",
                "changeOrg":"",
                "responsiblePersonId":"61",
                "responsiblePersonName":"合同管理员",
                "orgId":"82",
                "objectVersionNumber":"0",
                "estimateTotal":"",
                "wfItemType":"CUXHTSP",
                "wfItemKey":"85686",
                "creationDate":"2019-03-05 14:24:30.0",
                "createdBy":"1170",
                "lastUpdateBy":"1170",
                "lastUpdateDate":"2019-03-05 14:24:30.0",
                "lastUpdateLogin":"0"
            }
        ]
    },
    {
        "okcProbm":[

        ]
    },
    {
        "okcBill":[

        ]
    },
    {
        "okcService":[

        ]
    },
    {
        "okcRecord":[

        ]
    }
]

```


## 合同签订生效
### 搜索模块
#### 搜索合同
+ 请求URL

```
/search/getContract

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
queryName | 必须 | 搜索字段
queryWords | 必须 | 字段值


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- contractNumber | 合同编号
   -- contractName | 合同名称


+ 返回示例

```
{"items":[
{contractNumber:'50000022189',
contractName:'DCS数字量输入模块  1C31234G1',
headerId:'1821'}

```

#### 搜索合同甲方
+ 请求URL

```
/search/okcPartyA

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
queryName | 必须 | 搜索字段
queryWords | 必须 | 字段值


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- sourceType | 类型
   -- unitName | 名称


+ 返回示例

```
{"items":[{sourceType:'客户',unitName:'平顶山发电分公司'},
{sourceType:'客户',unitName:'郏县奥兰商务宾馆'}]}

```

#### 搜索合同乙方
+ 请求URL

```
/search/okcPartyB

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
queryName | 必须 | 搜索字段
queryWords | 必须 | 字段值


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- sourceType | 类型
   -- unitName | 名称


+ 返回示例

```
{"items":[{sourceType:'客户',unitName:'平顶山发电分公司'},
{sourceType:'客户',unitName:'郏县奥兰商务宾馆'}]}

```
#### 搜索承办部门
+ 请求URL

```
/search/getOrgId

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
queryName | 必须 | 搜索字段
queryWords | 必须 | 字段值


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- deptCode | 部门编码
   -- deptName | 部门名称


+ 返回示例

```
{"items":[{deptCode:'170',deptName:'52000409_人力资源部'},{deptCode:'165',deptName:'52000404_副总工程师'}]}


```
#### 搜索承办人
+ 请求URL

```
/search/employee

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
queryName | 必须 | 搜索字段
queryWords | 必须 | 字段值


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- employeeName | 姓名
   -- employeeNum | 编号


+ 返回示例

```
{"items":[{employeeName:'AC物资顾问',employeeNum:'3'},{employeeName:'丁高兴',employeeNum:'77161212'}]}


```
#### 搜索承办单位
+ 请求URL

```
/search/getOrgId

```
+ 请求方式

```
GET
```
+ 请求参数
```
无
```


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- orgName | 公司名称
   -- orgId | 编号


+ 返回示例

```
{"items":[{orgName:'520004_平顶山发电分公司',orgId:'81'}]}

```

###  查询签订生效列表
+ 请求URL

```
/contract/query

```
+ 请求方式

```
POST
```
+ 请求参数

| 参数 | 参数说明 |
  --- |---|
  contractNumber |合同编号
  contractName | 合同名称
  contractCategory | 合同分类
  contractCategory | 分类代码
  contractCategoryDesc |分类说明
  contractCategoryDes | 分类
  contractAmountFm | 合同金额从
  contractAmountTo | 合同金额至
  orgId | 承办公司
  responsibleDeptCode | 承办部门
  contractCategory|分类代码	
  contractCategoryDesc | 分类说明
  contractCategoryDes | 分类
  responsiblePersonName | 承办人
  executeDeptCode | 执行部门
  contractStatus| 合同状态
  okcPartyA |合同甲方
  okcPartyB | 合同乙方
  majorFlag | 重大合同  
  searchAuthorizedFileNumber | 批复文件编号
  searchAgentName | 采购员
  projectNumber | 项目编号
  projectName | 项目名称
  taskNumber | 任务
  contractType | 合同类型'
  templateFlag | 合同模
  creationDateFm | 创建日期从
  creationDateTo | 创建日期至
  effectDateFm | 生效日期从
  effectDateTo | 生效日期至
  buyMethod | 采购方式
  historyFlag | 历史版本
  orderType | 单据类型
  contractIntention | 合同意向
  effectSystemDateFm | 系统生效日期从
  effectSystemDateTo | 系统生效日期至


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- okcHeaderId | 序号
   -- versionNum | 合同版本
   -- contractNumber | 合同编号
   -- contractName | 合同名称
   -- okcPartyA | 合同甲方
   -- okcPartyB | 合同乙方
   -- contractStatusDesc | 合同状态中文
   -- contractStatus | 合同状态
   -- changeStatus | 
   -- contractCategory | 合同分类
   -- contractCategoryName | 分类
   -- contractAmount | 合同金额
   -- orgName | 承办公司 
   -- responsibleDeptName | 承办部门
   -- responsiblePersonName | 承办人
   -- approveDate | 合同审批日期
   -- signDate | 合同签订日期
   -- effectDate | 合同生效日期
   -- employeeName | 签订人
   -- isSignAuthorized | 法人代表或签字授权书
   -- agreementExpiryDate | 协议过期日
   -- effectSystemDate | 系统生效日期
   -- authorizedFileNumber | 批复文件编号
   -- orderType | 订单类型
   -- lastApprovePersonName | 当前审批人
   -- creationDate | 合同创建日期
   -- createdBy |
   -- lastUpdateBy |
   -- lastUpdateDate |
   -- lastUpdateLogin |
   -- signComments |备注
   -- genPoResult| 订单编号
   -- okcPerformanceTime | 合同履行期限
   
   
   
   
   

+ 返回示例

```
 {"items":[
 {templateFlag:"N",okcHeaderId:"11792",versionNum:"0",contractNumber:"520003JJ2019   
 0084",contractName:"13",  
okcPartyA:"国家电投集团河南电力有限公司开封发电分公司",okcPartyB:"中国电能成套设备有限公  
 司",contractStatusDesc:"已生 效",changeStatus:"",contractCategory:"JJ.  02.02",contractCategoryName:"SERVICE",contractAmount:"9000",orgName:"520003_开封发    
 电分公司",responsibleDeptName:"52000305_物资采购部",responsiblePersonName:"合同管理员",approveDate:"2019-02-18   
 12:02:27",signDate:"2019-02-18",effectDate:"2019-02-18",
effectSystemDate:"2019-02-18",authorizedFileNumber:"",orderType:"contract",lastApprovePersonName:"",creationDate:"2019-02-18 
 11:59:54.0",createdBy:"1170",lastUpdateBy:"1170",lastUpdateDate:"2019-02-18 11:59:54.0",lastUpdateLogin:"-1"},{templateFlag:"N",okcHeaderId:"11787",
 versionNum:"1",contractNumber:"520003JJ20190083",contractName:"11",okcPartyA:"国家电投集团河南电力有限公司开封发电分公司",okcPartyB:"中国电能成套设备有限公司",
 contractStatusDesc:"已生效",changeStatus:"变更中",contractCategory:"JJ.
 01.01",contractCategoryName:"SERVICE",contractAmount:"15000",
 orgName:"520003_开封发电分公司",responsibleDeptName:"52000305_物资采购部",responsiblePersonName:"合同管理员",approveDate:"2019-02-18 11:39:14",signDate:"2019-02-18",effectDate:"2019-02-19",  
effectSystemDate:"2019-02-18",authorizedFileNumber:"",orderType:"contract",lastApprovePersonName:"",creationDate:"2019-02-18 11:36:37.0",createdBy:"1170",lastUpdateBy:"1170",lastUpdateDate:"2019-02-18 11:51:39.0",lastUpdateLogin:"-1"},
 ]}

```
### 更新签订生效状态
+ 请求URL

```
/contract/sign

```
+ 请求方式

```
POST
```
+ 请求参数

| 参数 | 参数说明 |
--- |---|
array | 数组 |
  -- okcHeaderId | 序号
   -- versionNum | 合同版本
   -- contractNumber | 合同编号
   -- contractName | 合同名称
   -- okcPartyA | 合同甲方
   -- okcPartyB | 合同乙方
   -- contractStatusDesc | 合同状态
   -- changeStatus | 
   -- contractCategory | 合同分类
   -- contractCategoryName | 分类
   -- contractAmount | 合同金额
   -- orgName | 承办公司 
   -- responsibleDeptName | 承办部门
   -- responsiblePersonName | 承办人
   -- approveDate | 合同审批日期
   -- signDate | 合同签订日期
   -- effectDate | 合同生效日期
   -- employeeName | 签订人
   -- isSignAuthorized | 法人代表或签字授权书
   -- agreementExpiryDate | 协议过期日
   -- effectSystemDate | 系统生效日期
   -- authorizedFileNumber | 批复文件编号
   -- orderType | 订单类型
   -- lastApprovePersonName | 当前审批人
   -- creationDate | 合同创建日期
   -- createdBy |
   -- lastUpdateBy |
   -- lastUpdateDate |
   -- lastUpdateLogin |
   -- signComments |备注
   -- genPoResult| 订单编号
   -- okcPerformanceTime | 合同履行期限


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  errcode | 0
  errmsg | OK


+ 返回示例

```
{"errcode":0,"errmsg":"OK"}

```
## 合同中止
### 中止搜索模块
#### 搜索合同
+ 请求URL

```
/search/getContract

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
queryName | 必须 | 搜索字段
queryWords | 必须 | 字段值


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- contractNumber | 合同编号
   -- contractName | 合同名称


+ 返回示例

```
{"items":[
{contractNumber:'50000022189',
contractName:'DCS数字量输入模块  1C31234G1',
headerId:'1821'}

```

#### 搜索合同甲方
+ 请求URL

```
/search/okcPartyA

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
queryName | 必须 | 搜索字段
queryWords | 必须 | 字段值


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- sourceType | 类型
   -- unitName | 名称


+ 返回示例

```
{"items":[{sourceType:'客户',unitName:'平顶山发电分公司'},
{sourceType:'客户',unitName:'郏县奥兰商务宾馆'}]}

```

#### 搜索合同乙方
+ 请求URL

```
/search/okcPartyB

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
queryName | 必须 | 搜索字段
queryWords | 必须 | 字段值


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- sourceType | 类型
   -- unitName | 名称


+ 返回示例

```
{"items":[{sourceType:'客户',unitName:'平顶山发电分公司'},
{sourceType:'客户',unitName:'郏县奥兰商务宾馆'}]}

```
#### 搜索承办部门
+ 请求URL

```
/search/getOrgId

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
queryName | 必须 | 搜索字段
queryWords | 必须 | 字段值


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- deptCode | 部门编码
   -- deptName | 部门名称


+ 返回示例

```
{"items":[{deptCode:'170',deptName:'52000409_人力资源部'},{deptCode:'165',deptName:'52000404_副总工程师'}]}


```
#### 搜索承办人
+ 请求URL

```
/search/employee

```
+ 请求方式

```
GET
```
+ 请求参数


| 请求参数 | 是否必要 | 参数说明 |
 ---  | ---  | --- |
queryName | 必须 | 搜索字段
queryWords | 必须 | 字段值


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- employeeName | 姓名
   -- employeeNum | 编号


+ 返回示例

```
{"items":[{employeeName:'AC物资顾问',employeeNum:'3'},{employeeName:'丁高兴',employeeNum:'77161212'}]}


```
#### 搜索承办单位
+ 请求URL

```
/search/getOrgId

```
+ 请求方式

```
GET
```
+ 请求参数
```
无
```


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- orgName | 公司名称
   -- orgId | 编号


+ 返回示例

```
{"items":[{orgName:'520004_平顶山发电分公司',orgId:'81'}]}

```

### 查询中止合同列表
+ 请求URL

```
/contract/query?querytype=cancel

```
+ 请求方式

```
POST
```
+ 请求参数

| 参数 | 参数说明 |
  --- |---|
  contractNumber |合同编号
  contractName | 合同名称
  contractCategory | 合同分类
  contractCategory | 分类代码
  contractCategoryDesc |分类说明
  contractCategoryDes | 分类
  contractAmountFm | 合同金额从
  contractAmountTo | 合同金额至
  orgId | 承办公司
  responsibleDeptCode | 承办部门
  contractCategory|分类代码	
  contractCategoryDesc | 分类说明
  contractCategoryDes | 分类
  responsiblePersonName | 承办人
  executeDeptCode | 执行部门
  contractStatus| 合同状态
  okcPartyA |合同甲方
  okcPartyB | 合同乙方
  majorFlag | 重大合同  
  searchAuthorizedFileNumber | 批复文件编号
  searchAgentName | 采购员
  projectNumber | 项目编号
  projectName | 项目名称
  taskNumber | 任务
  contractType | 合同类型'
  templateFlag | 合同模
  creationDateFm | 创建日期从
  creationDateTo | 创建日期至
  effectDateFm | 生效日期从
  effectDateTo | 生效日期至
  buyMethod | 采购方式
  historyFlag | 历史版本
  orderType | 单据类型
  contractIntention | 合同意向
  effectSystemDateFm | 系统生效日期从
  effectSystemDateTo | 系统生效日期至


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- okcHeaderId | 序号
   -- versionNum | 合同版本
   -- contractNumber | 合同编号
   -- contractName | 合同名称
   -- okcPartyA | 合同甲方
   -- okcPartyB | 合同乙方
   -- contractStatus | 合同状态
   -- endDate | 中止日期
   -- resumeDate | 恢复日期
   -- contractStatusDesc | 合同状态
   -- changeStatus | 
   -- contractCategory | 合同分类
   -- contractCategoryName | 分类
   -- contractAmount | 合同金额
   -- orgName | 承办公司 
   -- responsibleDeptName | 承办部门
   -- responsiblePersonName | 承办人
   -- approveDate | 合同审批日期
   -- signDate | 合同签订日期
   -- effectDate | 合同生效日期
   -- endStatusDesc | 中止审批状态
   -- resumeStatusDesc | 恢复审批状态
   -- employeeName | 签订人
   -- isSignAuthorized | 法人代表或签字授权书
   -- agreementExpiryDate | 协议过期日
   -- effectSystemDate | 系统生效日期
   -- authorizedFileNumber | 批复文件编号
   -- orderType | 订单类型
   -- lastApprovePersonName | 当前审批人
   -- creationDate | 合同创建日期
   -- createdBy |
   -- lastUpdateBy |
   -- lastUpdateDate |
   -- lastUpdateLogin |
   -- signComments |备注
   -- genPoResult| 订单编号
   -- okcPerformanceTime | 合同履行期限
   
   
   
   
   

+ 返回示例

```
 {"items":[
 {templateFlag:"N",okcHeaderId:"11792",versionNum:"0",contractNumber:"520003JJ2019   
 0084",contractName:"13",  
okcPartyA:"国家电投集团河南电力有限公司开封发电分公司",okcPartyB:"中国电能成套设备有限公  
 司",contractStatusDesc:"已生 效",changeStatus:"",contractCategory:"JJ.  02.02",contractCategoryName:"SERVICE",contractAmount:"9000",orgName:"520003_开封发    
 电分公司",responsibleDeptName:"52000305_物资采购部",responsiblePersonName:"合同管理员",approveDate:"2019-02-18   
 12:02:27",signDate:"2019-02-18",effectDate:"2019-02-18",
effectSystemDate:"2019-02-18",authorizedFileNumber:"",orderType:"contract",lastApprovePersonName:"",creationDate:"2019-02-18 
 11:59:54.0",createdBy:"1170",lastUpdateBy:"1170",lastUpdateDate:"2019-02-18 11:59:54.0",lastUpdateLogin:"-1"},{templateFlag:"N",okcHeaderId:"11787",
 versionNum:"1",contractNumber:"520003JJ20190083",contractName:"11",okcPartyA:"国家电投集团河南电力有限公司开封发电分公司",okcPartyB:"中国电能成套设备有限公司",
 contractStatusDesc:"已生效",changeStatus:"变更中",contractCategory:"JJ.
 01.01",contractCategoryName:"SERVICE",contractAmount:"15000",
 orgName:"520003_开封发电分公司",responsibleDeptName:"52000305_物资采购部",responsiblePersonName:"合同管理员",approveDate:"2019-02-18 11:39:14",signDate:"2019-02-18",effectDate:"2019-02-19",  
effectSystemDate:"2019-02-18",authorizedFileNumber:"",orderType:"contract",lastApprovePersonName:"",creationDate:"2019-02-18 11:36:37.0",createdBy:"1170",lastUpdateBy:"1170",lastUpdateDate:"2019-02-18 11:51:39.0",lastUpdateLogin:"-1"},
 ]}

```
### 合同中止恢复
+ 请求URL

```
/contract/cancel

```
+ 请求方式

```
POST
```
+ 请求参数

| 参数 | 参数说明 |
--- |---|
okcHeaderId | 合同ID
endDate | 中止日期
resumeDate | 恢复日期
contractStatus | 合同状态


+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  errcode | 0
  errmsg | OK


+ 返回示例

```
{"errcode":0,"errmsg":"OK"}

```

### 中止审批历史纪录
### 中止恢复审批历史纪录
+ 请求URL

```
/contract/apprvData

```
+ 请求方式

```
GET
```
+ 请求参数

| 参数 | 参数说明 | 备注 |
--- |---| --- |
objectId | 合同ID
objectType | 审批类型 |  


+ 审批类型说明

| 值 | 说明 |
| --- | --- |
CUX_OKC_HEADERS_ALL_RESUME | 中止审批纪录
CUX_OKC_HEADERS_ALL_SUSPEND | 中止恢复审批纪录

+ 返回参数

| 参数 | 参数说明 |
--- |---| --- |
 approveSeq | 序号
fromUserName | 发件人
approveRoleName | 审批角色
approveSec | 审批人
countersignFlag | 是否会签 
 action | 操作 
 comment | 审批意见 
 actionDate | 审批时间


+ 返回示例

```
{"items":[
    {'approveSeq':'1','fromUserName':'test1','approveRoleName':'sssd','approveSec':'test','countersignFlag':'是','action':'test','comment':'admin','actionDate':'2019-12-22','toUserNum':'test','toUserName':'管理员'},
    {'approveSeq':'2','fromUserName':'test1','approveRoleName':'sssd','approveSec':'test','countersignFlag':'是','action':'test','comment':'admin','actionDate':'2019-12-22','toUserNum':'test','toUserName':'管理员'},
    {'approveSeq':'3','fromUserName':'test1','approveRoleName':'sssd','approveSec':'test','countersignFlag':'是','action':'test','comment':'admin','actionDate':'2019-12-22','toUserNum':'test','toUserName':'管理员'},
    {'approveSeq':'4','fromUserName':'test1','approveRoleName':'sssd','approveSec':'test','countersignFlag':'是','action':'test','comment':'admin','actionDate':'2019-12-22','toUserNum':'test','toUserName':'管理员'},
    {'approveSeq':'5','fromUserName':'test1','approveRoleName':'sssd','approveSec':'test','countersignFlag':'是','action':'test','comment':'admin','actionDate':'2019-12-22','toUserNum':'test','toUserName':'管理员'},
]

```

### 合同相关单据执行情况

+ 请求URL

```
/contract/SignEffectEnd

```
+ 请求方式

```
GET
```
+ 请求参数

| 参数 | 参数说明 |
--- |---| --- |
okcHeaderId| 合同ID
func  | 功能参数值 queryDetail|  


+ 返回参数

| 参数 | 参数说明 |
--- |---| --- |
poReceiveList | 采购订单
--- contractNumber | 合同编号
--- poNumber | 采购订单编号
--- agentName | 采购员
--- totalAmountTax | 订单含税总金额
--- totalAmount | 订单不含税总金额
--- receiveAmount | 订单已接收金额
--- notReceiveAmount | 订单未接收金额
poList | 订单未接收详情信息
--- lineNum | 序号
--- itemNumber | 物资编码
--- itemDesc | 物资说明
--- unitMeasLookupCode | 单位
--- quantity | 订货数量 
--- quantityReceived | 已接收数量
--- unReceivedQty | 未接收数量
poInvoiceList | 发票
--- contractNumber | 合同编号
--- invoiceNum | 发票编号
--- invoiceType | 发票类型
--- invoiceAmount | 发票金额
--- payAmount | 发票已付款金额
--- notPayAmount | 发票未付款金额


+ 返回示例

```
{'items':{poReceiveList: [{'contractNumber':'1','poNumber':'2','agentName':'小强','totalAmountTax':'29.00','totalAmount':'22.99','notReceiveAmount':'223.00'}], poList: [{'lineNum':'1','itemNumber':'2222323','itemDesc':'test','unitMeasLookupCode':'2232','quantity':'11','quantityReceived':'test','unReceivedQty':'22'}], poInvoiceList: [{'contractNumber':'11122','invoiceNum':'223','invoiceType':'增值税','invoiceAmount':'223.09','payAmount':'2323.00','notPayAmount':'123.00'}]}}
```

##附件管理
### 查看附件
+ 请求URL

```
api/contract/getAttachList

```
+ 请求方式

```
POST
```
+ 请求参数

| 参数 | 参数说明 |
--- |---| --- |
okcHeaderId| 合同ID 


+ 返回参数

| 参数 | 参数说明 |
--- |---| --- |
attachmentId | 附件ID
attachmentName | 附件名称
fileName |  文件名
createPerson | 上传者 
creationDate | 上传时间




+ 返回示例

```
{'errcode':0,'errmsg':'OK','data':[{}...]}
```

##合同更改

### 查询更改记录
+ 请求URL

```
/contract/getSearchList

```
+ 请求方式

```
POST
```
+ 请求参数

| 参数 | 参数说明 |
  --- |---|
  contractNumber |合同编号
  contractName | 合同名称
  changeStatus | 变更状态
  changeOrg | 提出单位
  orgId | 承办单位
  responsiblePersonName | 员工编号
  

+ 返回参数

| 参数 | 参数说明 |
  --- |---|
  items | 项目列表
   -- rowNo | 序号
   -- okcHeaderId | 合同ID
   -- changeNumber | 变更申请单编号
   -- changeName | 变更名称
   -- contractNumber | 合同编码
   -- contractName | 合同名称
   -- changeAmount | 变更金额
   -- changeContentDesc | 变更类型
   -- changeContent | 
   -- statusDesc | 变更状态
   -- status | 
   -- comments | 变更描述
   -- creationDate | 创建日期
   
   
   

   
   

+ 返回示例

```
{'data':[{rowNo
:1,"okcChangeId":"39364","versionNum":"0","okcHeaderId":"11908","changeNumber":"WZ-2018-293B01","changeName":"test","contractNumber":"WZ-2018-293","okcVersionNum":"101",
"contractName":"滚动轴承一批",
"contractAmount":"1447","oldEstimateTotal":"","contractType":"ZJHT","contractCategory":"WZ.01.01",
"contractIntention":"BUY","changeAmount":"","changeContent":"QUAITITY","changeContentDesc":"数量","status":"CREATING","statusDesc":"拟定","comments":"test","changeOrg":"","responsiblePersonId":"61","responsiblePersonName":"合同管理员","orgId":"82","objectVersionNumber":"0","estimateTotal":"","wfItemType":"","wfItemKey":"","creationDate":"2019-03-11 11:00:27.0","createdBy":"1170","lastUpdateBy":"1170","lastUpdateDate":"2019-03-11 11:00:27.0","lastUpdateLogin":"0"},{rowNo:2,"okcChangeId":"39362","versionNum":"0","okcHeaderId":"11907","changeNumber":"WZ-2018-299B07","changeName":"test","contractNumber":"WZ-2018-299","okcVersionNum":"303","contractName":"电池一批","contractAmount":"528","oldEstimateTotal":"","contractType":"ZJHT","contractCategory":"WZ.01.01","contractIntention":"BUY","changeAmount":"","changeContent":"CLAUSE","changeContentDesc":"合同条款","status":"CREATING","statusDesc":"拟定","comments":"test","changeOrg":"","responsiblePersonId":"61","responsiblePersonName":"合同管理员","orgId":"82","objectVersionNumber":"0","estimateTotal":"","wfItemType":"","wfItemKey":"","creationDate":"2019-03-11 10:57:45.0","createdBy":"1170","lastUpdateBy":"1170","lastUpdateDate":"2019-03-11 10:57:45.0","lastUpdateLogin":"0"}]}


```




 