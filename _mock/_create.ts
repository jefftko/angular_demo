import { MockRequest, MockStatusError } from '@delon/mock';

// region: mock data

const MockResult = {
  ContractCategory : [
    {id : 1, contractCategory : 'JJ.01.01', contractCategoryDesc : '基建工程类.建安工程.缺省', contractCategoryTag : 'SERVICE', contractCategoryTagLabel : '服务'},
    {id : 2, contractCategory : 'JJ.02.02', contractCategoryDesc : '基建工程类.设备监造.缺省', contractCategoryTag : 'SERVICE', contractCategoryTagLabel : '服务'},
    {id : 3, contractCategory : 'JJ.03.01', contractCategoryDesc : '基建工程类.工程监理.缺省', contractCategoryTag : 'SERVICE', contractCategoryTagLabel : '服务'},
    {id : 3, contractCategory : 'JJ.03.01', contractCategoryDesc : '基建工程类.工程监理.缺省', contractCategoryTag : 'SERVICE', contractCategoryTagLabel : '服务'},
    {id : 3, contractCategory : 'JJ.03.01', contractCategoryDesc : '基建工程类.工程监理.缺省', contractCategoryTag : 'SERVICE', contractCategoryTagLabel : '服务'},
    {id : 3, contractCategory : 'JJ.03.01', contractCategoryDesc : '基建工程类.工程监理.缺省', contractCategoryTag : 'SERVICE', contractCategoryTagLabel : '服务'},
    {id : 3, contractCategory : 'JJ.03.01', contractCategoryDesc : '基建工程类.工程监理.缺省', contractCategoryTag : 'SERVICE', contractCategoryTagLabel : '服务'},
    {id : 3, contractCategory : 'JJ.03.01', contractCategoryDesc : '基建工程类.工程监理.缺省', contractCategoryTag : 'SERVICE', contractCategoryTagLabel : '服务'},
    {id : 3, contractCategory : 'JJ.03.01', contractCategoryDesc : '基建工程类.工程监理.缺省', contractCategoryTag : 'SERVICE', contractCategoryTagLabel : '服务'},
    {id : 3, contractCategory : 'JJ.03.01', contractCategoryDesc : '基建工程类.工程监理.缺省', contractCategoryTag : 'SERVICE', contractCategoryTagLabel : '服务'},
    {id : 3, contractCategory : 'JJ.03.01', contractCategoryDesc : '基建工程类.工程监理.缺省', contractCategoryTag : 'SERVICE', contractCategoryTagLabel : '服务'},
    {id : 3, contractCategory : 'JJ.03.01', contractCategoryDesc : '基建工程类.工程监理.缺省', contractCategoryTag : 'SERVICE', contractCategoryTagLabel : '服务'},
    {id : 4, contractCategory : 'JJ.04.01', contractCategoryDesc : '基建工程类.工程施工.缺省', contractCategoryTag : 'SERVICE', contractCategoryTagLabel : '服务'}
  ],
  ContractTypeDesc : [
    {lookUpCode : 'GDDJHT', contractTypeDesc: '单价合同', attribute1 : 'BLANKET', meaningDescription : '主要用于工程服务类，确定采购项的采购单价，不确定采购数量的采购合同。'},
    {lookUpCode : 'ZJHT', contractTypeDesc: '总价合同', attribute1 : 'STANDARD', meaningDescription : '确定物资/服务采购单价和数量的采购合同。'},
    {lookUpCode : 'KJXYHT', contractTypeDesc: '框架协议', attribute1 : 'BLANKET', meaningDescription : '确定采购意向，不确定采购项单价的协议。'},
    {lookUpCode : 'CYCGXY', contractTypeDesc: '长约采购协议', attribute1 : 'BLANKET', meaningDescription : '该协议主要用于物资类协议采购，协议中确定了供应商、采购物资品名、采购单价，但未确定采购数量。如超市寄售协议、主机备件代储协议等。'},
  ],
  Currency : [
    {currencyCode : 'CNY', currencyDesc : '人民币元'},
    {currencyCode : 'EUR', currencyDesc : '欧元'},
    {currencyCode : 'USD', currencyDesc : '美元'},
  ],
  Role : [
    {lookUpCode : 'A', roleName : '甲方', description : ''},
    {lookUpCode : 'B', roleName : '乙方', description : ''},
    {lookUpCode : 'C', roleName : '核算方', description : ''},
    {lookUpCode : 'D', roleName : '丙方', description : ''},
  ],
  ResponsibleDept : [
    {deptCode : '189', deptName : '52000305_物资采购部'},
  ],
  PersonAndDept : [
    {employeeName : 'AC物资顾问', employeeNum : '3', employeeId : '101', deptCode : '189', deptName : '52000305_物资采购部'},
    {employeeName : 'AC项目顾问', employeeNum : '2', employeeId : '81', deptCode : '191', deptName : '52000307_生产技术部'},
    {employeeName : 'qinshizhao', employeeNum : 'qinshizhao', employeeId : '6019', deptCode : '187', deptName : '52000303_综合部'},
    {employeeName : '丁云龙', employeeNum : '77160430', employeeId : '4084', deptCode : '201', deptName : '52000317_发电运行部'},
    {employeeName : 'AC项目顾问', employeeNum : '2', employeeId : '81', deptCode : '191', deptName : '52000307_生产技术部'},
    {employeeName : 'qinshizhao', employeeNum : 'qinshizhao', employeeId : '6019', deptCode : '187', deptName : '52000303_综合部'},
    {employeeName : '丁云龙', employeeNum : '77160430', employeeId : '4084', deptCode : '201', deptName : '52000317_发电运行部'},
    {employeeName : 'AC项目顾问', employeeNum : '2', employeeId : '81', deptCode : '191', deptName : '52000307_生产技术部'},
    {employeeName : 'qinshizhao', employeeNum : 'qinshizhao', employeeId : '6019', deptCode : '187', deptName : '52000303_综合部'},
    {employeeName : '丁云龙', employeeNum : '77160430', employeeId : '4084', deptCode : '201', deptName : '52000317_发电运行部'},
    {employeeName : 'AC项目顾问', employeeNum : '2', employeeId : '81', deptCode : '191', deptName : '52000307_生产技术部'},
    {employeeName : 'qinshizhao', employeeNum : 'qinshizhao', employeeId : '6019', deptCode : '187', deptName : '52000303_综合部'},
    {employeeName : '丁云龙', employeeNum : '77160430', employeeId : '4084', deptCode : '201', deptName : '52000317_发电运行部'},
    {employeeName : 'AC项目顾问', employeeNum : '2', employeeId : '81', deptCode : '191', deptName : '52000307_生产技术部'},
    {employeeName : 'qinshizhao', employeeNum : 'qinshizhao', employeeId : '6019', deptCode : '187', deptName : '52000303_综合部'},
    {employeeName : '丁云龙', employeeNum : '77160430', employeeId : '4084', deptCode : '201', deptName : '52000317_发电运行部'},
    {employeeName : 'AC项目顾问', employeeNum : '2', employeeId : '81', deptCode : '191', deptName : '52000307_生产技术部'},
    {employeeName : 'qinshizhao', employeeNum : 'qinshizhao', employeeId : '6019', deptCode : '187', deptName : '52000303_综合部'},
    {employeeName : '丁云龙', employeeNum : '77160430', employeeId : '4084', deptCode : '201', deptName : '52000317_发电运行部'},
    {employeeName : 'AC项目顾问', employeeNum : '2', employeeId : '81', deptCode : '191', deptName : '52000307_生产技术部'},
    {employeeName : 'qinshizhao', employeeNum : 'qinshizhao', employeeId : '6019', deptCode : '187', deptName : '52000303_综合部'},
    {employeeName : '丁云龙', employeeNum : '77160430', employeeId : '4084', deptCode : '201', deptName : '52000317_发电运行部'},
  ],

  TradeDeptNoRec : [],

  TradeDeptA : [
    {sourceType:'内部单位',unitName:'国家电投集团河南电力有限公司开封发电分公司',sourceId:'82',sourceTable:'HR_OPERATING_UNITS',vendorSiteCode:'工程',contactName:'合同管理员,',primaryPhoneNumber:'0371-22729619',fax:'',bankAccountNum:'41001555527059336699',bankName:'建行开封电力支行',bankAccountName:'',registrationNumber:'91410203556927805N',address:'开封市新曹路以北火电厂老厂区东侧'},
  ],

  TradeDeptB : [
    {sourceType:'供应商',unitName:'河南省电力燃料有限公司',sourceId:'8686',sourceTable:'AP_SUPPLIERS',vendorSiteCode:'平煤集团',contactName:'',primaryPhoneNumber:'',fax:'',bankAccountNum:'',bankName:'',bankAccountName:'',registrationNumber:'',address:'郑州市二七区中原路108号'},
    {sourceType:'供应商',unitName:'河南省电力燃料有限公司',sourceId:'8686',sourceTable:'AP_SUPPLIERS',vendorSiteCode:'平顶山鸿光',contactName:'',primaryPhoneNumber:'',fax:'',bankAccountNum:'',bankName:'',bankAccountName:'',registrationNumber:'',address:'郑州市二七区中原路108号'},
    {sourceType:'供应商',unitName:'河南省电力燃料有限公司',sourceId:'8686',sourceTable:'AP_SUPPLIERS',vendorSiteCode:'开封京宇',contactName:'',primaryPhoneNumber:'',fax:'',bankAccountNum:'',bankName:'',bankAccountName:'',registrationNumber:'',address:'郑州市二七区中原路108号'}
  ],

  RelatedContract : [
    {contract_number:'520003JJ20190022',contract_name:'123',meaning:'单价合同',buy_method:'BIDDING',agent_level:'ZC'},{contract_number:'520003JJ20180004',contract_name:'2018年#2炉水冷壁冷灰斗四角及喉部受热面防磨喷涂',meaning:'单价合同',buy_method:'NEGO',agent_level:'ZC'},{contract_number:'520003SC20180031',contract_name:'4台磨煤机辊套衬板离线堆焊',meaning:'单价合同',buy_method:'NEGO',agent_level:'ZC'},{contract_number:'520003SC20180037',contract_name:'2018阀门修理长约（进口调节阀）',meaning:'单价合同',buy_method:'NEGO',agent_level:'EJ'},{contract_number:'520003SC20180036',contract_name:'2018年阀门修理长约合同-压力等级阀门',meaning:'单价合同',buy_method:'NEGO',agent_level:'EJ'},{contract_number:'520003RL20190010',contract_name:'123',meaning:'单价合同',buy_method:'BIDDING',agent_level:'ZB'},{contract_number:'520003RL20190007',contract_name:'123',meaning:'单价合同',buy_method:'BIDDING',agent_level:'EJ'},{contract_number:'KFFD-20150421',contract_name:'磨煤机辊芯检修',meaning:'单价合同',buy_method:'NEGO',agent_level:'EJ'},{contract_number:'KFFD-2017-06-36',contract_name:'全厂低压电机及潜水泵维修',meaning:'单价合同',buy_method:'NEGO',agent_level:'ZC'},{contract_number:'KFFD-2018-03-15',contract_name:'2017-2019年度防腐保温脚手架施工合同补充协议 ',meaning:'单价合同',buy_method:'GKZDY',agent_level:'EJ'},
  ],

  ShipToLocation : [
    {location_id:'15624',location_code:'SPIC_河南新能源虚拟分公司',location_desc:'郑东新区黄河南路10号'},
    {location_id:'6314',location_code:'SPIC_河南新能源封丘公司',location_desc:'郑州市郑州高新区莲花街55号A座5层'},
    {location_id:'6050',location_code:'新乡市凤泉区宝山东路184号',location_desc:'新乡市凤泉区宝山东路184号'},
    {location_id:'6051',location_code:'平顶山市卫东区矿工路东段',location_desc:'平顶山市卫东区矿工路东段'},
    {location_id:'6052',location_code:'南阳市高新区人民北路1363号',location_desc:'南阳市高新区人民北路1363号'},
    {location_id:'6053',location_code:'郑州经济技术开发区第四大街177号',location_desc:'郑州经济技术开发区第四大街177号'},
    {location_id:'6054',location_code:'郑州市二七区中原路108号',location_desc:'郑州市二七区中原路108号'},
    {location_id:'6055',location_code:'郑州高新区梧桐街100号',location_desc:'郑州高新区梧桐街100号'},
    {location_id:'6056',location_code:'河南省郑州市郑东新区黄河东路10号',location_desc:'河南省郑州市郑东新区黄河东路10号'},
    {location_id:'242',location_code:'中国',location_desc:'河南省郑州市黄河东路'},
  ],

  BillToLocation : [
    {location_id:'15624',location_code:'SPIC_河南新能源虚拟分公司',location_desc:'郑东新区黄河南路10号'},
    {location_id:'6314',location_code:'SPIC_河南新能源封丘公司',location_desc:'郑州市郑州高新区莲花街55号A座5层'},
    {location_id:'6050',location_code:'新乡市凤泉区宝山东路184号',location_desc:'新乡市凤泉区宝山东路184号'},
    {location_id:'6051',location_code:'平顶山市卫东区矿工路东段',location_desc:'平顶山市卫东区矿工路东段'},
    {location_id:'6052',location_code:'南阳市高新区人民北路1363号',location_desc:'南阳市高新区人民北路1363号'},
    {location_id:'6053',location_code:'郑州经济技术开发区第四大街177号',location_desc:'郑州经济技术开发区第四大街177号'},
    {location_id:'6054',location_code:'郑州市二七区中原路108号',location_desc:'郑州市二七区中原路108号'},
    {location_id:'6055',location_code:'郑州高新区梧桐街100号',location_desc:'郑州高新区梧桐街100号'},
    {location_id:'6056',location_code:'河南省郑州市郑东新区黄河东路10号',location_desc:'河南省郑州市郑东新区黄河东路10号'},
    {location_id:'242',location_code:'中国',location_desc:'河南省郑州市黄河东路'},
  ],

  ItemNumber : [
    {inventoryItemId:'82005',segment1:'910000000000002',description:'电煤',attribute1:'',attribute3:'',attribute2:'',itemUom:'t',accountId:'',concatenatedSegments:''},
    {inventoryItemId:'82006',segment1:'910000000000003',description:'电煤运费',attribute1:'',attribute3:'',attribute2:'',itemUom:'元',accountId:'',concatenatedSegments:''},
    {inventoryItemId:'5003',segment1:'910000000000001',description:'服务类',attribute1:'',attribute3:'',attribute2:'',itemUom:'项',accountId:'',concatenatedSegments:''},
  ],

  ItemNumberOth : [
    {inventoryItemId:'25311',segment1:'010104003002254',description:'无缝钢管 Φ60*9.7',attribute1:'Φ60*9.7',attribute3:'TH1',attribute2:'15CrMoG',itemUom:'m',accountId:'',concatenatedSegments:''},
    {inventoryItemId:'25312',segment1:'010104003002255',description:'无缝钢管 Φ33.4*3.8',attribute1:'Φ33.4*3.8',attribute3:'TH2',attribute2:'15CrMoG',itemUom:'m',accountId:'',concatenatedSegments:''},
    {inventoryItemId:'25313',segment1:'010104003002256',description:'无缝钢管 Φ33.4*3.8',attribute1:'Φ33.4*3.8',attribute3:'TH3',attribute2:'20G',itemUom:'m',accountId:'',concatenatedSegments:''},
    {inventoryItemId:'25314',segment1:'010104003002257',description:'无缝钢管 Φ33.4*7.1',attribute1:'Φ33.4*7.1',attribute3:'TH4',attribute2:'SA-213T91',itemUom:'m',accountId:'',concatenatedSegments:''},
    {inventoryItemId:'25315',segment1:'010104003002258',description:'无缝钢管 Φ33.4*3.8',attribute1:'Φ33.4*3.8',attribute3:'TH5',attribute2:'SA-213T91',itemUom:'m',accountId:'',concatenatedSegments:''},
    {inventoryItemId:'25316',segment1:'010104003002259',description:'无缝钢管 Φ33.4*7.1',attribute1:'Φ33.4*7.1',attribute3:'',attribute2:'12Cr1MoVG',itemUom:'m',accountId:'',concatenatedSegments:''},
    {inventoryItemId:'25317',segment1:'010104003002260',description:'无缝钢管 Φ33.4*7.1',attribute1:'Φ33.4*7.1',attribute3:'',attribute2:'20G',itemUom:'m',accountId:'',concatenatedSegments:''},
    {inventoryItemId:'25318',segment1:'010104003002261',description:'无缝钢管 Φ33.4*7.1',attribute1:'Φ33.4*7.1',attribute3:'',attribute2:'15CrMoVG',itemUom:'m',accountId:'',concatenatedSegments:''},
    {inventoryItemId:'25319',segment1:'010104003002262',description:'无缝钢管 Φ89*9',attribute1:'Φ89*9',attribute3:'',attribute2:'12Cr1MoVG',itemUom:'m',accountId:'',concatenatedSegments:''},
    {inventoryItemId:'25320',segment1:'010104003002282',description:'无缝钢管 Φ108*6',attribute1:'Φ108*6',attribute3:'',attribute2:'20G',itemUom:'kg',accountId:'',concatenatedSegments:''},
  ],

  ItemUom : [
    {uomCode:'项'},
    {uomCode:'t'},
    {uomCode:'元'},
  ],

  DelieveLocation : [
    {locationCode:'SPIC_河南新能源虚拟分公司'},
    {locationCode:'SPIC_河南新能源封丘公司'},
    {locationCode:'新乡市凤泉区宝山东路184号'},
    {locationCode:'平顶山市卫东区矿工路东段'},
    {locationCode:'南阳市高新区人民北路1363号'},
    {locationCode:'郑州经济技术开发区第四大街177号'},
    {locationCode:'郑州市二七区中原路108号'},
    {locationCode:'郑州高新区梧桐街100号'},
    {locationCode:'河南省郑州市郑东新区黄河东路10号'},
    {locationCode:'中国'},
  ],

  ProjectCode : [
    {projectnumber:'52000307180411',projectname:'公司资本化运维新建项目',projectid:'677',taskid:'996',taskname:'设备检修',tasknumber:'52000307180411',pa_project_type:'信息项目',department_code:'02',sub_department_code:'Y',pa_attribute8:'',pa_attribute12:''},
    {projectnumber:'52000304181003',projectname:'开封发电分公司家属区“三供一业”采暖改造项目',projectid:'39437',taskid:'',taskname:'',tasknumber:'',pa_project_type:'技改项目',department_code:'02',sub_department_code:'Y',pa_attribute8:'',pa_attribute12:''},
    {projectnumber:'52000306181101',projectname:'KF2018燃料全流程成本优化系统的研究与应用',projectid:'64441',taskid:'',taskname:'',tasknumber:'',pa_project_type:'科技项目',department_code:'02',sub_department_code:'Y',pa_attribute8:'',pa_attribute12:''},
    {projectnumber:'52000305190101',projectname:'KF2019公用系统检修费用',projectid:'90461',taskid:'',taskname:'',tasknumber:'',pa_project_type:'检修项目',department_code:'02',sub_department_code:'',pa_attribute8:'',pa_attribute12:''},
    {projectnumber:'52000305190103',projectname:'KF2019生产建筑物检修费用',projectid:'90465',taskid:'',taskname:'',tasknumber:'',pa_project_type:'检修项目',department_code:'02',sub_department_code:'',pa_attribute8:'',pa_attribute12:''},
    {projectnumber:'52000305190104',projectname:'KF2019#2机组D修费用',projectid:'90467',taskid:'',taskname:'',tasknumber:'',pa_project_type:'检修项目',department_code:'02',sub_department_code:'',pa_attribute8:'',pa_attribute12:''},
    {projectnumber:'52000397190101',projectname:'KF2019日常材料费',projectid:'90451',taskid:'',taskname:'',tasknumber:'',pa_project_type:'日常维护项目',department_code:'02',sub_department_code:'',pa_attribute8:'',pa_attribute12:''},
    {projectnumber:'52000305190105',projectname:'KF2019#1机组C修费用',projectid:'90469',taskid:'',taskname:'',tasknumber:'',pa_project_type:'检修项目',department_code:'02',sub_department_code:'',pa_attribute8:'',pa_attribute12:''},
    {projectnumber:'52000307190101',projectname:'2019年开封发电分公司费用化运维新建项目',projectid:'90489',taskid:'',taskname:'',tasknumber:'',pa_project_type:'信息项目',department_code:'02',sub_department_code:'Y',pa_attribute8:'',pa_attribute12:''},
    {projectnumber:'52000307190201',projectname:'信息项目测试01-自主化',projectid:'100441',taskid:'',taskname:'',tasknumber:'',pa_project_type:'信息项目',department_code:'02',sub_department_code:'Y',pa_attribute8:'',pa_attribute12:''},
  ],

  ContractTpl : [
    {contractNumber:'520001WZ20180003',contractName:'河南公司简易合同危险品合同模板 （货物类) ',okcHeaderId:'7'},
    {contractNumber:'520001SC20180001',contractName:'河南公司技术服务合同模板',okcHeaderId:'9'},
    {contractNumber:'520001WZ20180001',contractName:'河南公司物资类通用模板',okcHeaderId:'4'},
    {contractNumber:'520001WZ20180002',contractName:'河南公司简易货物资模板 （货物类) ',okcHeaderId:'5'},
    {contractNumber:'520001JJ20180001',contractName:'河南公司工程施工合同模板 ',okcHeaderId:'8'},
    {contractNumber:'520003WZ20180006',contractName:'开封发电分公司采购订单模板（3万元以下）',okcHeaderId:'4160'},
  ]
};

const OK = {
  errcode : 0
};

const StepInitData = {
  step1 : {data : {
      // Row -> 1
      contractNumber : 'CT5022205580099',
      contractName : '测试物资合同',
      contractAmount : '99999',
      // Row -> 2
      contractCategory: "JJ.01.01",
      contractCategoryDesc: "基建工程类.建安工程.缺省",
      contractCategoryTag: "SERVICE",
      contractCategoryTagLabel: "服务",
      'contractType' : 'GDDJHT',
      'contractTypeDesc' : '总价合同',
      contractAmountNotax : '88888',
      // Row -> 3
      'contractIntention' : 'BUY',
      buyMethod : 'BIDDING',
      'versionNum' : '0',
      contractOrigAmount : 9999999,
      // Row -> 4
      'contractStatus' : 'ND',
      'contractStatusDesc' : '拟定',
      'signLocation' : '开封市',
      globalFlag : 'Y',
      contractOrigAmountNotax : '77777777777',
      // Row -> 5
      'orgId' : '82',
      'orgName' : '520003_开封发电分公司',
      'responsiblePersonId' : '61',
      'responsiblePersonNum' : '',
      'responsiblePersonName' : '合同管理员',
      'responsibleDeptCode' : '189',
      'responsibleDeptName' : '52000305_物资采购部',
      'currencyCode' : 'CNY',
      // Row -> 6
      executeDeptCode: "189",
      executeDeptDesc: "52000305_物资采购部",
      projSpecialPersonId: "101",
      projSpecialPersonName: "AC物资顾问",
      projSpecialPersonNum: "3",
      agentId : "177",
      agentName : "AC_采购员",
      agentLevel : "EJ",
      // Row -> 7
      'techTermsFlag' : 'N',
      cancelReson : "",
      appendOkcFlag : "N",
      // Row -> 8
      'majorFlag' : 'N',
      buyType : "SERVICE",
      disputeResolution : "SUE",
      'disputeSettlement' : '开封市',
      // Row -> 9
      'warranty' : '0',
      // Row -> 10
      DJAmount : '',
      // Row -> 11
      comments : '',

      /********* Related ************/
      'shipToLocationCode' : 'SPIC_开封发电分公司',
      'shipToLocationId' : '183',
      'billToLocationCode' : 'SPIC_开封发电分公司',
      'billToLocationId' : '183',
      orderType : 'order',
      creationDate : '2019-02-21',

      tradeAndContact: [
        {
          roleCode: 'A',
          roleName : '甲方',
          sourceId: '82',
          unitName : '甲方某公司',
          sourceTable: 'HR_OPERATING_UNITS',
          contactName: '合同管理员,',
          contactPhone: '0371-22729619',
          payeeBanks: '建行开封电力支行',
          bankNumber: '',
          bankName: '建行开封电力支行',
          bankAccount: '41001555527059336699',
          state: null,
          city: null,
          purchasingType: '工程',
          fax: '',
          tax: '91410203556927805N',
          locations: '开封市新曹路以北火电厂老厂区东侧'
        },
        {
          roleCode: 'B',
          roleName : '乙方',
          sourceId: '8686',
          unitName : '乙方某公司',
          sourceTable: 'AP_SUPPLIERS',
          contactName: '',
          contactPhone: '',
          payeeBanks: '',
          bankNumber: '',
          bankName: '',
          bankAccount: '',
          state: null,
          city: null,
          purchasingType: '平煤集团',
          fax: '',
          tax: '',
          locations: '郑州市二七区中原路108号'
        },
        {
          roleCode: 'C',
          roleName : '丙方',
          unitName : '丙方某公司',
          sourceId: '8686',
          sourceTable: 'AP_SUPPLIERS',
          contactName: '',
          contactPhone: '',
          payeeBanks: '',
          bankNumber: '',
          bankName: '',
          bankAccount: '',
          state: null,
          city: null,
          purchasingType: '平煤集团',
          fax: '',
          tax: '',
          locations: '郑州市二七区中原路108号'
        }]
    }},
  step2 : [],
  step3 : {},
  step4 : [],
  step5 : [],
  step6 : {}
};

export const CREATE_DATA = {
  'POST api/contract/create/init' : () => {
    let s = ({data : {
        'contractType': 'GDDJHT',
        'contractTypeDesc': '总价合同',
        // Row -> 3
        'contractIntention': 'BUY',
        'versionNum': '0',
        // Row -> 4
        'contractStatus': 'ND',
        'contractStatusDesc': '拟定',
        'signLocation': '开封市',
        // Row -> 5
        'orgId': '82',
        'orgName': '520003_开封发电分公司',
        'responsiblePersonId': '61',
        'responsiblePersonNum': '',
        'responsiblePersonName': '合同管理员',
        'responsibleDeptCode': '189',
        'responsibleDeptName': '52000305_物资采购部',
        'currencyCode': 'CNY',
        // Row -> 6
        // Row -> 7
        'techTermsFlag': 'N',
        // Row -> 8
        'majorFlag': 'N',
        'disputeSettlement': '开封市',
        // Row -> 9
        'warranty': '0',
        // Row -> 10
        // Row -> 11

        /********* Related ************/
        'shipToLocationCode': 'SPIC_开封发电分公司',
        'shipToLocationId': '183',
        'billToLocationCode': 'SPIC_开封发电分公司',
        'billToLocationId': '183',

      }});
    return s;
  },
  'POST api/contract/create/modal/:modalName' : (req) => {
    console.log('[In Modal Mock]', req.params.modalName);
    let id = req.params.modalName;
    console.log('Modal ID:', id);
    console.log('Param:', req.body);
    if (id == 'TradeDept') {
      if (req.body.roleCode == 'A') {
        id = 'TradeDeptA';
      } else {
        id = 'TradeDeptB';
      }
    }
    if (id == 'ItemNumber') {
      if (req.body.contractCategoryTag != 'SERVICE') {
        id = 'ItemNumberOth';
      } else {
        id = 'ItemNumber';
      }
    }
    return MockResult[id];
  },
  'POST api/contract/create/init/:step' : (req) => {
    console.log('[Mock Request Data]', req.params);
    return {...OK, data : StepInitData[req.params.step]};
  },
  'POST api/contract/create/save' : (req) => {
    console.log('[Mock Request Data]', req.params);
    return OK;
  },
  'POST api/contract/create/save/step4/tpl' : (req) => {
    console.log('[Mock Request Data]', req.params);
    return OK;
  },
  'POST api/contract/upload' : (req) => {
    console.log('[Mock Request Data]', req.params);
    return OK;
  },
  'POST api/contract/submitAttachment' : (req) => {
    console.log('[Mock Request Data]', req.params);
    return OK;
  },
  'POST api/contract/history' : (req) => {
    return {errcode : 0, data : {
        "contractHistory": [
          {
            "contractStatus": "DELETE",
            "createdBy": -1,
            "versionNum": 0,
            "creationDate": "2019-02-22 10:06:10"
          },
          {
            "contractStatus": "ND",
            "createdBy": 188,
            "versionNum": 1,
            "creationDate": "2019-03-06 01:19:20"
          }
        ]
      }};
  },

  'POST api/template/inquiry' : (req) => {
    console.log('[Paging Request]', req.body);
    return {
      errcode : 0,
      data : {
          total : 23,
          list : [
            {
              okcHeaderId : 1,
              contractName : '测试合同',
              contractNumber : '9985555-0002',
              contractCategoryDesc : '这个是一个分类',
              contractTypeDesc : '合同种类',
              contractStatusDesc : '什么鬼描述',
              creationDate : '2019-02-26'
            },
            {
              okcHeaderId : 1,
              contractName : '测试合同',
              contractNumber : '9985555-0002',
              contractCategoryDesc : '这个是一个分类',
              contractTypeDesc : '合同种类',
              contractStatusDesc : '什么鬼描述',
              creationDate : '2019-02-26'
            },
            {
              okcHeaderId : 1,
              contractName : '测试合同',
              contractNumber : '9985555-0002',
              contractCategoryDesc : '这个是一个分类',
              contractTypeDesc : '合同种类',
              contractStatusDesc : '什么鬼描述',
              creationDate : '2019-02-26'
            },
            {
              okcHeaderId : 1,
              contractName : '测试合同',
              contractNumber : '9985555-0002',
              contractCategoryDesc : '这个是一个分类',
              contractTypeDesc : '合同种类',
              contractStatusDesc : '什么鬼描述',
              creationDate : '2019-02-26'
            },
            {
              okcHeaderId : 1,
              contractName : '测试合同',
              contractNumber : '9985555-0002',
              contractCategoryDesc : '这个是一个分类',
              contractTypeDesc : '合同种类',
              contractStatusDesc : '什么鬼描述',
              creationDate : '2019-02-26'
            },
            // {
                //   contractName : '测试合同',
                //   contractNumber : '9985555-0002',
                //   contractCategoryDesc : '这个是一个分类',
                //   contractTypeDesc : '合同种类',
                //   contractStatusDesc : '什么鬼描述',
                //   creationDate : '2019-02-26'
                // },
                // {
                //   contractName : '测试合同',
                //   contractNumber : '9985555-0002',
                //   contractCategoryDesc : '这个是一个分类',
                //   contractTypeDesc : '合同种类',
                //   contractStatusDesc : '什么鬼描述',
                //   creationDate : '2019-02-26'
                // },
                // {
                //   contractName : '测试合同',
                //   contractNumber : '9985555-0002',
                //   contractCategoryDesc : '这个是一个分类',
                //   contractTypeDesc : '合同种类',
                //   contractStatusDesc : '什么鬼描述',
                //   creationDate : '2019-02-26'
                // },
                // {
                //   contractName : '测试合同',
                //   contractNumber : '9985555-0002',
                //   contractCategoryDesc : '这个是一个分类',
                //   contractTypeDesc : '合同种类',
                //   contractStatusDesc : '什么鬼描述',
                //   creationDate : '2019-02-26'
                // },
                // {
                //   contractName : '测试合同',
                //   contractNumber : '9985555-0002',
                //   contractCategoryDesc : '这个是一个分类',
                //   contractTypeDesc : '合同种类',
                //   contractStatusDesc : '什么鬼描述',
                //   creationDate : '2019-02-26'
                // },
                // {
                //   contractName : '测试合同',
                //   contractNumber : '9985555-0002',
                //   contractCategoryDesc : '这个是一个分类',
                //   contractTypeDesc : '合同种类',
                //   contractStatusDesc : '什么鬼描述',
                //   creationDate : '2019-02-26'
                // },
                // {
                //   contractName : '测试合同',
                //   contractNumber : '9985555-0002',
                //   contractCategoryDesc : '这个是一个分类',
                //   contractTypeDesc : '合同种类',
                //   contractStatusDesc : '什么鬼描述',
                //   creationDate : '2019-02-26'
                // },
                // {
                //   contractName : '测试合同',
                //   contractNumber : '9985555-0002',
                //   contractCategoryDesc : '这个是一个分类',
                //   contractTypeDesc : '合同种类',
                //   contractStatusDesc : '什么鬼描述',
                //   creationDate : '2019-02-26'
                // },
          ]
      }
    };
  },
  'POST api/template/create/init' : () => {
    let s = ({data : {
        'contractType': 'GDDJHT',
        'contractTypeDesc': '总价合同',
        // Row -> 3
        'contractIntention': 'BUY',
        'versionNum': '0',
        // Row -> 4
        'contractStatus': 'ND',
        'contractStatusDesc': '拟定',
        'signLocation': '开封市',
        // Row -> 5
        'orgId': '82',
        'orgName': '520003_开封发电分公司',
        'responsiblePersonId': '61',
        'responsiblePersonNum': '',
        'responsiblePersonName': '合同管理员',
        'responsibleDeptCode': '189',
        'responsibleDeptName': '52000305_物资采购部',
        'currencyCode': 'CNY',
        // Row -> 6
        // Row -> 7
        'techTermsFlag': 'N',
        // Row -> 8
        'majorFlag': 'N',
        'disputeSettlement': '开封市',
        // Row -> 9
        'warranty': '0',
        // Row -> 10
        // Row -> 11

        /********* Related ************/
        'shipToLocationCode': 'SPIC_开封发电分公司',
        'shipToLocationId': '183',
        'billToLocationCode': 'SPIC_开封发电分公司',
        'billToLocationId': '183',

      }});
    return s;
  },
  'POST api/template/create/modal/:modalName' : (req) => {
    console.log('[In Modal Mock]', req.params.modalName);
    let id = req.params.modalName;
    console.log('Modal ID:', id);
    console.log('Param:', req.body);
    if (id == 'TradeDept') {
      if (req.body.roleCode == 'A') {
        id = 'TradeDeptA';
      } else {
        id = 'TradeDeptB';
      }
    }
    if (id == 'ItemNumber') {
      if (req.body.contractCategoryTag != 'SERVICE') {
        id = 'ItemNumberOth';
      } else {
        id = 'ItemNumber';
      }
    }
    return MockResult[id];
  },
  'POST api/template/create/init/:step' : (req) => {
    console.log('[Mock Request Data]', req.params);
    return {...OK, data : StepInitData[req.params.step]};
  },
  'POST api/template/create/save' : (req) => {
    console.log('[Mock Request Data]', req.params);
    return OK;
  },
  'POST api/template/create/save/step4/tpl' : (req) => {
    console.log('[Mock Request Data]', req.params);
    return OK;
  },
  'POST api/template/upload' : (req) => {
    console.log('[Mock Request Data]', req.params);
    return OK;
  },
  'POST api/template/submitAttachment' : (req) => {
    console.log('[Mock Request Data]', req.params);
    return OK;
  },
  'POST api/template/history' : (req) => {
    return {errcode : 0, data : {
        "contractHistory": [
          {
            "contractStatus": "DELETE",
            "createdBy": -1,
            "versionNum": 0,
            "creationDate": "2019-02-22 10:06:10"
          },
          {
            "contractStatus": "ND",
            "createdBy": 188,
            "versionNum": 1,
            "creationDate": "2019-03-06 01:19:20"
          }
        ]
      }};
  },
};
