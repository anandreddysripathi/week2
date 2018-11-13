"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var collections_1 = require("@angular/cdk/collections");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var student_data = [
    { id: 1, name: 'Anand', marks: 70 },
    { id: 2, name: 'Rohith', marks: 60 },
    { id: 3, name: 'Dinesh', marks: 80 },
    { id: 4, name: 'Karthik', marks: 83 },
    { id: 5, name: 'Murali', marks: 77 },
    { id: 6, name: 'Vijay', marks: 68 },
    { id: 7, name: 'Vivek', marks: 99 },
    { id: 8, name: 'Kulkarni', marks: 96 },
    { id: 9, name: 'dinesh', marks: 82 },
    { id: 10, name: 'Chadimal', marks: 56 }
];
var DataTableDataSource = /** @class */ (function (_super) {
    __extends(DataTableDataSource, _super);
    function DataTableDataSource(paginator, sort) {
        var _this = _super.call(this) || this;
        _this.paginator = paginator;
        _this.sort = sort;
        _this.data = student_data;
        return _this;
    }
    DataTableDataSource.prototype.connect = function () {
        var _this = this;
        var dataMutations = [
            rxjs_1.of(this.data),
            this.paginator.page,
            this.sort.sortChange
        ];
        this.paginator.length = this.data.length;
        return rxjs_1.merge.apply(void 0, dataMutations).pipe(operators_1.map(function () {
            return _this.getPagedData(_this.getSortedData(_this.data.slice()));
        }));
    };
    DataTableDataSource.prototype.disconnect = function () { };
    DataTableDataSource.prototype.getPagedData = function (data) {
        var startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    };
    DataTableDataSource.prototype.getSortedData = function (data) {
        var _this = this;
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }
        return data.sort(function (a, b) {
            var isAsc = _this.sort.direction === 'asc';
            switch (_this.sort.active) {
                case 'name': return compare(a.name, b.name, isAsc);
                case 'id': return compare(+a.id, +b.id, isAsc);
                case 'marks': return compare(+a.marks,+b.marks, isAsc);
                default: return 0;
            }
        });
    };
    return DataTableDataSource;
}(collections_1.DataSource));
exports.DataTableDataSource = DataTableDataSource;
function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
