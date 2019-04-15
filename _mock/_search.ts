
const catData ={"totalCount":13,"data":[{'contractCategoryDes':'分类1','contractCategory':'DJSoo1'},
    {'contractCategoryDes':'分类2','contractCategory':'DJSoo2'},
{'contractCategoryDes':'分类3','contractCategory':'DJSoo3'},
{'contractCategoryDes':'分类4','contractCategory':'DJSoo4'},
]}

const expenditureData = {"data":[{expenditureType:'信息类'}]}

const contractData = {"data":[{contractNumber:'50000022189',contractName:'DCS数字量输入模块  1C31234G1',okcHeaderId:'1821'},
    {contractNumber:'50000022182',contractName:'DCS数字量输入模块  1C31234G01',okcHeaderId:'1822'}]}

const okPartyA ={"data":[{sourceType:'客户',unitName:'平顶山发电分公司'},{sourceType:'客户',unitName:'郏县奥兰商务宾馆'}]}    
const okPartyB ={"data":[{sourceType:'客户',unitName:'平顶山发电分公司'},{sourceType:'客户',unitName:'郏县奥兰商务宾馆'}]}
const deptData ={"data":[{deptCode:'170',deptName:'52000409_人力资源部'},{deptCode:'165',deptName:'52000404_副总工程师'}]}
const employeeData ={"data":[{employeeName:'AC物资顾问',employeeNum:'3'},{employeeName:'丁高兴',employeeNum:'77161212'}]}
const orgData = {"data":[{orgName:'520004_平顶山发电分公司',orgId:'81'}]}
const projectData = {"data":[{projectName:'2018年开封发电分公司资本化运维新建项目',projectNumber:'52000307180411 '}]}
const taskData = {"data":[{taskName:'信息支出',taskNumber:'1'}]}
const clausesData = {"data":[{clauseTitle:'某条款'}]}
// endregion

export const SEARCH = {
  'api/search/getContract': JSON.parse(JSON.stringify(
      contractData
  )),
   'api/search/okcPartyB': JSON.parse(JSON.stringify(
      okPartyA
  )),
   'api/search/okcPartyA': JSON.parse(JSON.stringify(
      okPartyB
  )),
   'api/search/deptData': JSON.parse(JSON.stringify(
      deptData
  )),
   'api/search/employee': JSON.parse(JSON.stringify(
      employeeData
  )),
   'api/search/getOrgId': JSON.parse(JSON.stringify(
       orgData
      // {"items":[{orgName:'',orgId:'1'}]}
       //{"items":[]}
  )),
   'api/search/getProject': JSON.parse(JSON.stringify(
      projectData
  )),
  'api/search/getTask': JSON.parse(JSON.stringify(
     taskData
  )),
  'api/search/getClauses':JSON.parse(JSON.stringify(
         clausesData
  )),
  'api/search/expenditureType':JSON.parse(JSON.stringify(
     expenditureData
  )),





};
