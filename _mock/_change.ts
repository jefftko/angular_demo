
const changeData ={"data":{header:{"disabled":true,"okcChangeId":"40875","versionNum":"0","okcHeaderId":"12048","changeNumber":"WZ-2018-314B01","changeName":"test","contractNumber":"WZ-2018-314","okcVersionNum":"101","contractName":"集中采购（仪表阀）","contractAmount":"2720","oldEstimateTotal":"","contractType":"ZJHT","contractCategory":"WZ.01.01","contractIntention":"BUY","changeAmount":"","changeContent":"","changeContentDesc":"","statusDesc":"取消了","test":'ss',"status":"CREATING","comments":"test","changeOrg":"","responsiblePersonId":"61","responsiblePersonName":"合同管理员","orgId":"82","objectVersionNumber":"0","estimateTotal":"","wfItemType":"","wfItemKey":"","creationDate":"2019-03-19 22:43:23.0","createdBy":"1170","lastUpdateBy":"1170","lastUpdateDate":"2019-03-19 22:43:23.0","lastUpdateLogin":"0"},lines:[{"okcLineId":"31219","okcHeaderId":"12048","lineNum":"1","lineTypeId":"1","lineType":"货物","versionNum":"101","inventoryItemId":"30668","itemNumber":"020403006002218","itemDesc":"进口阀门  进口仪表阀(焊接式) PARKER 8W-U12LB-G-SS-HT(16)  配Φ16*4mm对焊短管","itemGg":"进口仪表阀(焊接式) PARKER 8W-U12LB-G-SS-HT(16)  配Φ16*4mm对焊短管","itemTh":"","itemCz":"","itemUom":"只","quantity":"2","quantityReceived":"2","quantityAccepted":"2","quantityReturn":"","quantityInvoice":"2","unitPrice":"1360","taxUnitPrice":"1360","tax":"16","changeTax":"","baseUnitPrice":"1172.41379300","taxAmount":"2720","baseAmount":"2344.83","arrivalDate":"2018-06-30","startWorkDate":"","completedDate":"","locationCode":"","orgId":"82","comments":"","projectId":"0","projectNum":"","projectName":"","taskId":"0","taskName":"","taskNum":"","expenditureTypeId":"0","expenditureType":"","requisitionHeaderId":"0","requisitionNumber":"","requisitionLineId":"0","requisitionLineNum":"","poHeaderId":"2139","poNumber":"WZ-2018-314","poLineId":"5580","poLineNum":"1","requisitionComments":"","auctionHeaderId":"0","documentNumber":"","auctionLineNum":"","auctionComments":"","accountId":"0","concatenatedSegments":"","itemCharacter":"","itemCharacterDesc":"","brandTrader":"","usedPersonId":"0","usedPersonName":"","shipAlertDay":"0","objectVersionNumber":"1","attributeCategory":"","attribute1":"","attribute2":"","attribute3":"","attribute4":"","attribute5":"","attribute6":"","attribute7":"","attribute8":"","attribute9":"8583","attribute10":"","attribute11":"","attribute12":"","attribute13":"","attribute14":"0","attribute15":"","changeQuantity":"","packDetailId":"0","deptCode":"189","deptName":"52000305_物资采购部","account":"","accountDes":"","childAccount":"","childAccountDes":"缺省","estimateTotal":"","noTaxEstimateTotal":"","creationDate":"2018-07-09 20:09:35.0","createdBy":"1170","lastUpdateBy":"1170","lastUpdateDate":"2018-07-09 20:09:35.0","lastUpdateLogin":"0"}],"terms":[{"termId":"24533","okcHeaderId":"12048","lineNum":"1","versionNum":"101","clauseTypes":"MATERIAIS","clauseTypesDesc":"物料款","paymentWay":"AMOUNT","paymentWayDesc":"金额","paymentPercent":"","paymentAmount":"2720","schedulePaymentDate":"","comments":"","objectVersionNumber":"1","projectId":"0","projectNum":"","projectName":"","taskId":"0","taskName":"","taskNum":"","attributeCategory":"","norateContractAmount":"2344.827586206896551724137931034482758621","tax":"16","attribute1":"","attribute2":"","attribute3":"","attribute4":"","attribute5":"","attribute6":"","attribute7":"","attribute8":"","attribute9":"","attribute10":"","attribute11":"","attribute12":"","attribute13":"","attribute14":"","attribute15":"","contractAmount":"2720","contractStatus":"ND","concChangingFlag":"Y","creationDate":"2018-07-09 20:09:35.0","createdBy":"1170","lastUpdateBy":"1170","lastUpdateDate":"2018-07-09 20:09:35.0","lastUpdateLogin":"0"}],attachments:[{'attachmentId':11,'fileName':'sss'}],clausesList:[]}
    }



export const CHANGE = {
   'POST api/contract/change/store': JSON.parse(JSON.stringify(
       {'errcode':0,'errmsg':'OK','data':{'okcChangeId':40875}}
  )),


  'api/contract/change/getData/:id':JSON.parse(JSON.stringify(
    changeData
  )),
    'POST api/contract/change/term/delete': JSON.parse(JSON.stringify(
       {'errcode':0,'errmsg':'OK','data':{'okcChangeId':40875}}
  )),
  'POST api/contract/change/clause/delete': JSON.parse(JSON.stringify(
       {'errcode':0,'errmsg':'OK','data':{'okcChangeId':40875}}
  )),
  'POST api/contract/change/attach/delete': JSON.parse(JSON.stringify(
       {'errcode':0,'errmsg':'OK','data':{'okcChangeId':40875}}
  )),








};
