export const ModalConfig = {

  Default : {
    isVisible :false
  },

  ContractCategory : {
    title : '合同分类',
    url : '/contract/create/modal/ContractCategory',
    options: [
      {"value": "contractCategory", "label": "分类代码", selected : true},
      {"value": "contractCategoryDesc", "label": "分类说明"},
      {"value": "contractCategoryDes", "label": "分类"}
    ],
    results : [
      {name : 'contractCategory', label : '分类代码', width : '30'},
      {name : 'contractCategoryDesc', label : '分类说明', width : '50'},
      {name : 'contractCategoryTag', label : '分类', hide: true},
      {name : 'contractCategoryTagLabel', label : '分类', width : '20'},
    ]
  },
  ContractTypeDesc : {
    title : '合同类型',
    url : '/contract/create/modal/ContractTypeDesc',
    options: [{"value":"meaning","label":"合同类型"},{"value":"description","label":"描述"}],
    results : [
      {name : 'lookUpCode', hide : true},
      {name : 'contractTypeDesc', label : '合同类型', width : '30'},
      {name : 'attribute1', hide: true},
      {name : 'meaningDescription', label : '描述', width : '70'},
    ]
  },
  Currency : {
    title : '币种',
    url : '/contract/create/modal/Currency',
    options: [{"value":"currencyCode","label":"币种代码"},{"value":"currencyDesc","label":"币种说明"}],
    results : [
      {name : 'currencyCode', label : '币种代码', width : '30'},
      {name : 'currencyDesc', label : '币种说明', width : '70'},
    ]
  },
  Role : {
    title : '角色',
    url : '/contract/create/modal/Role',
    options: [{"value":"meaning","label":"角色"},{"value":"description","label":"描述"}],
    results : [
      {name : 'lookUpCode', hide : true},
      {name : 'roleName', label : '角色', width : '30'},
      {name : 'description', label : '描述', width : '70'},
    ]
  },
  ResponsibleDept : {
    title : '部门名称',
    url : '/contract/create/modal/ResponsibleDept',
    options: [{"value":"deptName","label":"部门名称"},{"value":"deptCode","label":"部门编码"}],
    results : [
      {name : 'deptName', label : '部门名称', width : '70'},
      {name : 'deptCode', label : '部门编码', width : '30'},
    ]
  },
  PersonAndDept : {
    title : '员工信息',
    url : '/contract/create/modal/PersonAndDept',
    options: [{"value":"employeeName","label":"员工姓名"},{"value":"employeeNum","label":"员工编号"}],
    results : [
      {name : 'employeeName', label : '员工姓名', width : '70'},
      {name : 'employeeNum', label : '员工编号', width : '30'},
      {name : 'deptCode', hide : true},
      {name : 'deptName', hide : true},
      {name : 'employeeId', hide : true},
    ]
  },

  TradeDept : {
    title : '交易方单位',
    params : ['roleCode'],
    url : '/contract/create/modal/TradeDept',
    options: [{"value":"unitName","label":"单位名称"},{"value":"vendorSiteCode","label":"地点"},{"value":"sourceType","label":"单位类型"}],
    results : [
      {name : 'unitName', label : '单位名称', width : '40'},
      {name : 'address', label : '地点', width : '40'},
      {name : 'sourceType', label : '单位类型', width : '20'},
      {name : 'sourceId', hide : true},
      {name : 'sourceTable', hide : true},
      {name : 'contactName', hide : true},
      {name : 'primaryPhoneNumber', hide : true},
      {name : 'fax', hide : true},
      {name : 'bankAccountNum', hide : true},
      {name : 'bankName', hide : true},
      {name : 'bankAccountName', hide : true},
      {name : 'registrationNumber', hide : true},
      {name : 'vendorSiteCode', hide : true},
    ]
  },

  RelatedContract : {
    title : '相关合同编号',
    url : '/contract/create/modal/RelatedContract',
    options: [{"value":"contractNumber","label":"相关合同编号"},{"value":"contractName","label":"合同名称"},{"value":"meaning","label":"合同类型"}],
    dynamicSearch : true,
    results : [
      {name : 'contractNumber', label : '相关合同编号', width : '40'},
      {name : 'contractName', label : '合同名称', width : '40'},
      {name : 'contractTypeDesc', label : '合同类型', width : '20'},
      {name : 'buy_method', hide : true},
    ]
  },

  ShipToLocation : {
    title : '收货地点',
    url : '/contract/create/modal/ShipToLocation',
    options: [{"value":"location_code","label":"收货地点"},{"value":"location_desc","label":"描述"}],
    results : [
      {name : 'location_code', label : '收货地点', width : '50'},
      {name : 'location_desc', label : '描述', width : '50'},
      {name : 'location_id', hide : true},
    ]
  },

  BillToLocation : {
    title : '收单地点',
    url : '/contract/create/modal/BillToLocation',
    options: [{"value":"location_code","label":"收单地点"},{"value":"location_desc","label":"描述"}],
    results : [
      {name : 'location_code', label : '收单地点', width : '50'},
      {name : 'location_desc', label : '描述', width : '50'},
      {name : 'location_id', hide : true},
    ]
  },

  ItemNumber : {
    title : '物料编码',
    width : 1000,
    url : '/contract/create/modal/ItemNumber',
    params : ['contractCategoryTag'],
    options: [{"value":"segment1","label":"物料编码"},{"value":"description","label":"物料描述"},{"value":"attribute1","label":"规格"},{"value":"attribute3","label":"图号"},{"value":"attribute2","label":"材质"},{"value":"itemUom","label":"主单位"}],
    results : [
      {name : 'segment1', label : '物料编码', width : '30'},
      {name : 'description', label : '物料描述', width : '30'},
      {name : 'attribute1', label : '规格', width : '10'},
      {name : 'attribute3', label : '图号', width : '10'},
      {name : 'attribute2', label : '材质', width : '10'},
      {name : 'itemUom', label : '主单位', width : '10'},
      {name : 'inventoryItemId', hide : true},
      {name : 'accountId', hide : true},
      {name : 'concatenatedSegments', hide : true},
    ]
  },

  ItemUom : {
    title : '单位',
    url : '/contract/create/modal/ItemUom',
    params : ['lineTypeId'],
    options: [{"value":"uomCode","label":"单位"}],
    results : [
      {name : 'uomCode', label : '项', width : '100'},
    ]
  },

  DelieveLocation : {
    title : '交货地点',
    url : '/contract/create/modal/DelieveLocation',
    params : ['lineTypeId'],
    options: [{"value":"locationCode","label":"交货地点"}],
    results : [
      {name : 'locationCode', label : '交货地点', width : '100'},
    ]
  },

  ProjectCode : {
    title : '项目',
    url : '/contract/create/modal/ProjectCode',
    options: [{"value":"projectnumber","label":"项目编号"},{"value":"projectname","label":"项目名称"}],
    results : [
      {name : 'projectnumber', label : '项目编号', width : '30'},
      {name : 'projectname', label : '项目名称', width : '70'},
      {name : 'projectid', hide : true},
      {name : 'taskid', hide : true},
      {name : 'tasknumber', hide : true},
    ]
  },

  ContractTpl : {
    title : '合同',
    url : '/contract/create/modal/getTemplateList',
    options: [{"value":"contractNumber","label":"合同编号"},{"value":"contractName","label":"合同名称"}],
    dynamicSearch : true,
    results : [
      {name : 'contractNumber', label : '合同编号 ', width : '40'},
      {name : 'contractName', label : '合同名称', width : '60'},
      {name : 'projectid', hide : true},
      {name : 'taskid', hide : true},
      {name : 'tasknumber', hide : true},
    ]
  }
};
