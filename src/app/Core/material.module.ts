import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NotFoundComponent } from './not-found-component/not-found-component.component';

@NgModule({
	declarations: [
		NotFoundComponent
  ],
	imports: [
		CommonModule,
		MatButtonModule,
		MatMenuModule,
		MatToolbarModule,
		MatIconModule,
		MatCardModule,
		MatInputModule,
		MatDialogModule,
		MatTableModule,
		MatProgressSpinnerModule,
		MatFormFieldModule,
		BrowserAnimationsModule,
		MatGridListModule,
		MatDividerModule,
		MatProgressBarModule,
		MatSelectModule,
		MatPaginatorModule,
	],
	exports: [
		CommonModule,
		MatButtonModule,
		MatMenuModule,
		MatToolbarModule,
		MatIconModule,
		MatCardModule,
		MatInputModule,
		MatDialogModule,
		MatTableModule,
		MatProgressSpinnerModule,
		MatFormFieldModule,
		BrowserAnimationsModule,
		MatGridListModule,
		MatDividerModule,
		MatProgressBarModule,
		MatSelectModule,
		MatPaginatorModule,
		NotFoundComponent
	]
})
export class MaterialModule { }
