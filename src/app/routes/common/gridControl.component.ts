import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit, Input, OnChanges, SimpleChanges, ViewChildren, QueryList, ViewChild,
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {FormControl} from "@angular/forms";
import {ModalConfig} from "./modal.config";
import {DatePipe, DecimalPipe} from "@angular/common";
import {ContextService} from "../context.service";
import {DxDataGridComponent} from "devextreme-angular";
import CustomStore from 'devextreme/data/custom_store'
import {Utils} from "./common.utils";

@Component({
  selector: 'app-grid-control',
  templateUrl: './gridControl.component.html',
  styleUrls: ['./gridControl.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers : [DecimalPipe]
})
export class GridControlComponent implements OnInit, OnChanges {

  @Input() template:any[];

  @Input() config:any;

  @ViewChildren('ctrlModel')
  rowFormControls:QueryList<FormControl>;

  @ViewChild(DxDataGridComponent)
  grid:DxDataGridComponent;

  rowCtrls:any[] = [];

  columnMapping:{} = {};

  _pagingData:any = [];

  angDesignTableWidth:number = 0;

  private stopPageChanging:boolean;

  numberFormatter:any = (value) => {
    return this.numberPipe.transform(value);
  };

  constructor(private numberPipe:DecimalPipe,
              private datePipe:DatePipe,
              private ctx:ContextService,
              private cdr: ChangeDetectorRef,
              public http: _HttpClient) {
  }

  ngOnInit() {
    // console.log(this.grid);
    this.template.forEach((value, index) => {
      this.columnMapping[value.name] = index;
      if (value.width) {
          this.angDesignTableWidth += value.width;
      }
    });
    if (this.config && this.config.canDelete) this.angDesignTableWidth += 80;
    if (this.config && this.config.index) this.angDesignTableWidth += 80;
    if (this.angDesignTableWidth < 1300) this.angDesignTableWidth = 1300;
  }

  patchValue(i:number, values:any):GridControlComponent {
    let row = this.rowCtrls[i];
    Object.keys(values).forEach(key => {
      let ctrlIndex = this.columnMapping[key];
      if (ctrlIndex != undefined) {
        let value = values[key];
        if (value != null) {
          if (!Utils.isJson(value)) {
            values[key] = {value : values[key]};
          }
          row[ctrlIndex] = {...row[ctrlIndex], ...values[key]};
        }
      }
    });
    this.cdr.detectChanges();
    return this;
  }

  set store(loadFun:any) {
    this._pagingData = {
      store : new CustomStore({
        load : (loadOptions) => {
          this.stopPageChanging = true;
          return loadFun({pageInfo : {
            skip : (loadOptions.skip / loadOptions.take) + 1,
            sort : loadOptions.sort,
            take : loadOptions.take
          }});
        },
        onLoaded : result => this.data = result['data']

      })
    };
  }

  // defaultLoadOptions: DevExpress.data.LoadOptions = {
  //   // Data processing settings are specified here
  //   skip : 0,
  //   take : 5
  // };

  reload() {
    this.grid.instance.getDataSource().reload();
    // this._pagingData.store.load(this.defaultLoadOptions).then(result => {
    //   this.data = result['data'];
    //   this.grid.instance.endCustomLoading();
    //   this.loading = false;
    // });
  }

  set data(data:any) {
    if (this.rowCtrls.length)
      this.clear();
    if (data) {
      let start = (this.config.tableMode ? 0 : this.grid.instance.pageIndex() * this.grid.instance.pageSize());
      data.forEach((row, i) => {
        row.rowNum = start + i;
        row.index = i;
        this.addRow(row)
      });
    }
  }

  get data():any {
    let values:any[] = [];
    this.rowCtrls.forEach((ctrls, i) => {
      let row = {rowNum : i};
      ctrls.forEach(ctrl => {
        let val = ctrl.value;
        if(Utils.isDate(val)) {
          row[ctrl.name] = this.datePipe.transform(val, 'yyyy-MM-dd HH:mm:ss');
        } else {
          row[ctrl.name] = val;
        }
      });
      values.push(row);
    });
    return values;
  }

  addRow(data:any = null) {
    if (Array.isArray(this._pagingData))
      this._pagingData = [...this._pagingData, ({rowNum : this.rowCtrls.length})];
    this.rowCtrls = [...this.rowCtrls, (this.duplicateRow(this.rowCtrls.length, data))];
    this.cdr.detectChanges();
  }

  onRowRemoveClick(index:number) {
    this.removeRow(index);
    if (this.config.onRemoveRow)
      this.config.onRemoveRow(index);
  }

  removeRow(index:number) {
    this.rowCtrls = this.rowCtrls.filter((value, i) => index != i);
    this._pagingData = this._pagingData.filter((value, i) => index != i);
    this.cdr.detectChanges();
  }

  clear(then:any = null) {
    this.rowCtrls = [];
    this.cdr.detectChanges();
    if (then)
      then();
  }

  private duplicateRow(index:number, data:any = null):any[] {
    let row:any[] = [];
    this.template.forEach(column => row.push(this.duplicateColumn(index, column,
      (data ? data[column.name] : null))));
    return row;
  }

  protected duplicateColumn(index:number, column:any, value:any = null) {
    // console.log(`[Duplicate Column][${index}][Name : ${column.name}][Value : ${value}]`);
    let callBackOptions = {...column.callBackOptions, index : index};
    if (value)
      return {...column, value, callBackOptions};
    else
      return {...column, callBackOptions};
  }

  onModelChange(value:any, ctrl: any, i: number) {
    ctrl.value = value;
    if (ctrl.onChange) {
      // console.log('[Grid Value change]', value, ctrl);
      if (ctrl.callBackOptions) ctrl.callBackOptions = {};
      ctrl.callBackOptions.value = ctrl.value;
      ctrl.onChange(ctrl.callBackOptions, i);
    }
  }

  showModal(ctrl: any, i: number) {
    if (!ctrl.disabled) {
      console.log('[Show Modal]', ctrl);
      this.ctx.modalConfig = {...ModalConfig[ctrl.modalId],
        isVisible : true,
        callBack : ctrl.callBack,
        callBackOptions : {...ctrl.callBackOptions, index : i}
      };
    }
  }

  validate():boolean {
    let valid:boolean = true;
    this.rowFormControls.forEach((item:any) => {
      item.control.markAsDirty();
      item.control.updateValueAndValidity();
      valid = valid && item.valid;
    });
    this.cdr.detectChanges();
    return valid;
  }

  onPageChange(event) {
    setTimeout(() => {
      if (!this.stopPageChanging) {
        this.data = this.grid.instance.getDataSource().items();
      }
      this.stopPageChanging = false;
    }, 200);
  }

  onPageSizeChange(event) {
    // console.log(event);
  }

  onSelectionChange(event) {
    // console.log(event);
  }

  get selectionData():any {
    let rowsData = this.grid.instance.getSelectedRowsData();
    if (rowsData && rowsData.length)
      return this.data[rowsData[0].index];
    return null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('Show Changes!', this.ctrl.name, this.ctrl, changes);
    if (changes && changes.tableIndex) {
      // if (!this.ctrl.callBackOptions) this.ctrl.callBackOptions = {};
      // let callBackOptions = {...this.ctrl.callBackOptions, index : this.tableIndex};
      // this.ctrl = {...this.ctrl, callBackOptions : callBackOptions};
    }
  }
}
