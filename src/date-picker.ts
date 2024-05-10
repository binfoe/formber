import { DatePicker as ADatePicker } from 'antd';
import dateFnsGenerateConfig from 'rc-picker/es/generate/dateFns';

export const DatePicker = ADatePicker.generatePicker<Date>(dateFnsGenerateConfig);
