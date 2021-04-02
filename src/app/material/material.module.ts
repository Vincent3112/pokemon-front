import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    imports: [
        MatTableModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule
    ],
    exports: [
        MatToolbarModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule
    ]
})
export class MaterialModule { }