import { Component, AfterViewInit, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { DatatableService } from '../../../Services/datatable/datatable.service'; 
import { ToastService, TOAST_STATE } from '../../../Services/toast/toast.service'; 
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-scrollloading',
  templateUrl: './scrollloading.component.html',
  styleUrls: ['./scrollloading.component.css']
})
export class ScrollloadingComponent implements OnInit, AfterViewInit, OnDestroy {

	displayedColumns: string[] = ['id', 'title', 'thumbnail', 'brand', 'category', 'description', 'discountPercentage', 'price', 'rating', 'stock'];
	dataSource: any = [];
	pageIndex: number = 0;
	limit: number = 10;
	totalrecord: number = 0;
	constructor(
		private dtService: DatatableService,
		private toastService: ToastService
	){

	}

	fetchDataInTable(): any {
		this.dtService.fetchDatatableDetails(this.pageIndex, this.limit)
		.subscribe (
			result => {
				console.log('result -', result);
				//let data = new MatTableDataSource<any>(result.products).data;
				this.dataSource = [...this.dataSource, ...result.products ];
				this.totalrecord = result.total;
				this.toastService.showToast( TOAST_STATE.success, 'Data fetched successfully!');
			},
			error => {
			},
			() => {
				// No errors, route to new page
			}
		);
	}

	@HostListener("window:scroll", [])
	onScroll(): void {
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			if(this.totalrecord > (this.pageIndex*10)){
				this.pageIndex++;
				this.fetchDataInTable();
			}
		}
	}
	ngOnInit(): void {
		this.fetchDataInTable();
	}

	ngAfterViewInit(): void {

	}

	ngOnDestroy(): void {
	
	}
}

