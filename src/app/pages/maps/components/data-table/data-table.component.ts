import { Component, OnInit, Input } from '@angular/core';
import { products } from './products';
import { DataService } from '../../../../services/data/data.service';
import { SelectAllCheckboxState } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { DataTableService } from './data-table.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() data: any[];
  public mySelection: number[] = [];

  public gridData: any[] = products;
  public filterState: any;
  public selectAllState: SelectAllCheckboxState = 'unchecked';

  constructor(public _dataService: DataService, public _dataTalbeService: DataTableService) {


  }

  ngOnInit() {
  }

  onFilterChange(filter: any) {
    console.log(filter);
    this.filterState = filter;
  }

  onSelectedKeysChange(e) {
    const len = this.mySelection.length;
    if (len === 0) {
        this.selectAllState = 'unchecked';
    } else if (len > 0 && len < this.data.length) {
        this.selectAllState = 'indeterminate';
    } else {
        this.selectAllState = 'checked';
    }

    // console.log(this.mySelection);
    this._dataTalbeService.selectedMarkers.next(this.mySelection);

  }


  public onSelectAllChange(checkedState: SelectAllCheckboxState, ) {
    if (checkedState === 'checked') {
      const newState: State = { filter: this.filterState };
      const newDataState = process(this.data, newState );
      this.mySelection = newDataState.data.map(ele => { return ele.site_id});
      this.selectAllState = 'checked';
    } else {
        this.mySelection = [];
        this.selectAllState = 'unchecked';
    }
    // console.log(this.mySelection);
    this._dataTalbeService.selectedMarkers.next(this.mySelection);
}



}
