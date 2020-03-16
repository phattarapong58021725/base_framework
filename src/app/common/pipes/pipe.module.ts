import { NgModule } from '@angular/core';
import { DecimalFormatPipe } from './decimal-format.pipe';
import { IsEmptyPipe } from './empty.pipe';
import { IsNaNPipe } from './isnan.pipe';
import { DateStringPipe } from './date-string.pipe';
import { DateFormatePipe } from './date-formate.pipe';
import { DateFormateLocal } from './date-formate-local.pipe';
import { DateFormateNot } from './date-formate-not.pipe';

@NgModule({
    imports: [],
    declarations: [
        DecimalFormatPipe,
        IsEmptyPipe,
        IsNaNPipe,
        DateStringPipe,
        DateFormatePipe,
        DateFormateLocal,
        DateFormateNot
    ],
    exports: [
        DecimalFormatPipe,
        IsEmptyPipe,
        IsNaNPipe,
        DateStringPipe,
        DateFormatePipe,
        DateFormateLocal,
        DateFormateNot
    ],
})
export class PipeModule { }
