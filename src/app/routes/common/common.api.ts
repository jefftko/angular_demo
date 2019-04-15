// const UrlRoot = 'http://chinagas.micropaas.ies/contract/api';
// const UrlRoot = 'http://172.20.10.5:8008/api';
const UrlRoot = 'api';

export const UrlConfig = {
  Root : UrlRoot,
  Init : UrlRoot + '/contract/create/init',
  Save : UrlRoot + '/contract/create/save',
  InitStep1 : UrlRoot + '/contract/create/init/step1',
  InitStep2 : UrlRoot + '/contract/create/init/step2',
  SaveStep2 : UrlRoot + '/contract/create/save/step2',
  InitStep3 : UrlRoot + '/contract/create/init/step3',
  SaveStep3 : UrlRoot + '/contract/create/save/step3',
  InitStep4 : UrlRoot + '/contract/create/init/step4',
  SaveStep4 : UrlRoot + '/contract/create/save/step4',
  SaveStep4FromTpl : UrlRoot + '/contract/create/save/step4/tpl',
  InitStep5 : UrlRoot + '/contract/create/init/step5',
  SaveStep5 : UrlRoot + '/contract/create/save/step5',
  DeleteStep5 : UrlRoot + '/contract/create/delete/step5',
  ContractAttachmentDownload : '/contract/create/downAttachment?attachmentId=',
  InitStep6 : UrlRoot + '/contract/create/init/step6',
  SaveStep6 : UrlRoot + '/contract/create/save/step6',
  Approve : UrlRoot + '/contract/approve',
  Upload : UrlRoot + '/contract/upload',
  SubmitAttachment : UrlRoot + '/contract/submitAttachment',
  ContractHistory : UrlRoot + '/contract/history',

  /* 模板处理 */
  TplList : UrlRoot + '/template/inquiry',
  TplCreateInit : UrlRoot + '/contract/create/init',
  TplCreateSave : UrlRoot + '/template/create/save',
  TplUpdInitStep1 : UrlRoot + '/template/create/init/step1',
  TplUpdInitStep2 : UrlRoot + '/template/create/init/step2',
  TplSaveStep2 : UrlRoot + '/template/create/save/step2',
  TplUpdInitStep3 : UrlRoot + '/template/create/init/step3',
  TplSaveStep3 : UrlRoot + '/template/create/save/step3',
  TplUpdInitStep4 : UrlRoot + '/template/create/init/step4',
  TplSaveStep4 : UrlRoot + '/template/create/save/step4',
  TplUpdInitStep5 : UrlRoot + '/template/create/init/step5',
  TplApprove : UrlRoot + '/template/approve',
  TplHistory : UrlRoot + '/template/history',
  TplApproveEdit : UrlRoot + '/template/version',

  Routes : {
    TplUpd : '/contract/tpl/update/',
    TplCreate : '/contract/tpl/create',
  }
};
