import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
export const moment = _rollupMoment || _moment;
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'MMM DD',
  },
  display: {
    dateInput: 'MMM DD', 
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};