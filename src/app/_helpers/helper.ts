import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';

@Injectable()

export class Helper  {

    constructor(private datePipe: DatePipe, private snackBar: MatSnackBar) { }

    formatDate(date: string) {
        return this.datePipe.transform(date, "yyyy-MM-dd");
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}