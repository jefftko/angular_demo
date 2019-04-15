// tslint:disable
import * as Mock from 'mockjs';
import { format } from 'date-fns';
import { deepCopy } from '@delon/util';

// region: mock data

const pieData = [
  {
    x: '审批中',
    y: 12,
  },
  {
    x: '已中止',
    y: 21,
  },
    {
    x: '已取消',
    y: 21,
  },
    {
    x: '已批准',
    y: 21,
  },
    {
    x: '已拒绝',
    y: 21,
  },
    {
    x: '已生效',
    y: 21,
  },
    {
    x: '已签订',
    y: 10,
  },
    {
    x: '拟定',
    y: 21,
  },
    {
    x: '需重新提交',
    y: 21,
  },
    {
    x: '非正常终止',
    y: 21,
  },
    {
    x: '已竣工',
    y: 21,
  },
    {
    x: '已作废',
    y: 21,
  },
    {
    x: '最终关闭',
    y: 21,
  },
  ];

// endregion

export const CHARTS = {
  'api/chart': JSON.parse(JSON.stringify(
      {'data':pieData}
  )),

};
