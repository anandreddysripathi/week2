import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';


import {DataTableItem} from './datainfo';//here i am importing an interface from datainfo.ts file

const student_data: DataTableItem[] = [
  {id: 1, name: 'Anand',marks:70},
  {id: 2, name: 'Rohith',marks:60},
  {id: 3, name: 'Dinesh',marks:80},
  {id: 4, name: 'Karthik',marks:83},
  {id: 5, name: 'Murali',marks:77},
  {id: 6, name: 'Vijay',marks:68},
  {id: 7, name: 'Vivek',marks:99},
  {id: 8, name: 'Kulkarni',marks:96},
  {id: 9, name: 'dinesh',marks:82},
  {id: 10, name: 'Chadimal',marks:56}
];
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = student_data;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }
  connect(): Observable<DataTableItem[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() {}
  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name,b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'marks':return compare(a.marks,+b.marks,isAsc);
        default: return 0;
      }
    });
  }
}
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
