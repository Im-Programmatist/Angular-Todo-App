import { Component, AfterViewInit, OnInit, OnDestroy, ViewChild, } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DatatableService } from '../../../Services/datatable/datatable.service'; 
import { ToastService, TOAST_STATE } from '../../../Services/toast/toast.service'; 

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements AfterViewInit, OnInit, OnDestroy{

	//displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
	displayedColumns: string[] = ['id', 'title', 'thumbnail', 'brand', 'category', 'description', 'discountPercentage', 'price', 'rating', 'stock'];
	dataSource: any = [];
	page:number = 0;
	limit:number = 10;
	pageSizeOptions:number[] = [];
	page_length:number = 0;
	pageSize:number = 10;
	pageIndex:number = 0;
	pageEvent: PageEvent;
	//dtOptions: DataTables.Settings = {};
	@ViewChild(MatPaginator) paginator: MatPaginator;
	
	constructor(
		private dtService: DatatableService,
		private toastService: ToastService
	){
		//this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
	}

	fetchDatainTable(event?:PageEvent): any {
		this.pageIndex = event?.pageIndex ?? 0; 
		this.dtService.fetchDatatableDetails(this.pageIndex, this.limit)
		.subscribe (
			result => {
				this.page_length = result.total;
				this.pageSizeOptions=[ result.total/2, result.total/4, result.total/5, result.total/10 ];
				this.dataSource = new MatTableDataSource<PeriodicElement>(result.products);
				this.toastService.showToast( TOAST_STATE.success, 'Data fetched successfully!');
			},
			error => {

			},
			() => {
				// No errors, route to new page
			}
		);
	}

	ngOnInit(): void {
		this.fetchDatainTable(null);
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	ngOnDestroy(): void {
	
	}

}

export interface PeriodicElement {
	position: number;
	name: string;
	weight: number;
	symbol: string;
}
  
const ELEMENT_DATA: PeriodicElement[] = [
	{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
	{position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
	{position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
	{position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
	{position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
	{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
	{position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
	{position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
	{position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
	{position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
	{position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
	{position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
	{position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
	{position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
	{position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
	{position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
	{position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
	{position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
	{position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
	{position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];