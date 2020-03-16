import { Pipe, PipeTransform } from '@angular/core';
import { EnDateToThDate, digit, ThDateToEnDate } from '../helper';
import * as moment from 'moment';

@Pipe({
    name: 'dateString',
    pure: false
})
export class DateFormateNot implements PipeTransform {
    transform(value: Date, time: boolean = false): any {
        if (time) {
            const timeStr: string = digit((new Date(value)).getHours()) + ":" + digit((new Date(value)).getMinutes()) + " น.";
            const dateStr: string = moment(new Date(value), "DD/MM/YYYY").format("DD/MM/YYYY").toString();
            return dateStr + " " + timeStr;
        }
        return moment(new Date(value), "DD/MM/YYYY").format("DD/MM/YYYY").toString();
    }
}