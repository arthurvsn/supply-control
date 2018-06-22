import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()

export class Helper  {

    constructor(private datePipe: DatePipe) { }

    formatDate(date: string) {
        return this.datePipe.transform(date, "yyyy-MM-dd");
    }
}