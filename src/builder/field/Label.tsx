import type { FC, ReactNode } from 'react';
import { Tooltip } from 'antd';
import type { FormField } from '../../common';
import { getFieldDisplayLabel } from './helper';
import CarbonStringText from '~icons/carbon/string-text';
import CarbonStringInteger from '~icons/carbon/string-integer';
import CarbonBoolean from '~icons/carbon/boolean';
import MaterialSymbolsDataArray from '~icons/material-symbols/data-array';
import MaterialSymbolsDataObject from '~icons/material-symbols/data-object';
import MaterialSymbolsLightDateRangeSharp from '~icons/material-symbols-light/date-range-sharp';
import { cs } from '@/util';
import AntDesignQuestionCircleOutlined from '~icons/ant-design/question-circle-outlined';

const Ic: Record<FormField['type'], ReactNode> = {
  string: <CarbonStringText />,
  number: <CarbonStringInteger />,
  bool: <CarbonBoolean />,
  date: <MaterialSymbolsLightDateRangeSharp />,
  array: <MaterialSymbolsDataArray />,
  nest: <MaterialSymbolsDataObject />,
  'nest-array': (
    <>
      <MaterialSymbolsDataArray />
      <MaterialSymbolsDataObject />
    </>
  ),
  placeholder: null,
};
export const FieldLabel: FC<{ className?: string; field: FormField }> = ({ className, field }) => {
  return field.type === 'placeholder' ? (
    <label className={className}>&nbsp;</label>
  ) : (
    <label className={cs('flex items-center gap-2', className)}>
      {Ic[field.type]}
      {field.type === 'array' && Ic[field.itemType]}
      {getFieldDisplayLabel(field)}
      {field.tip && (
        <Tooltip title={field.tip}>
          <AntDesignQuestionCircleOutlined className='cursor-pointer text-xs text-gray-400' />
        </Tooltip>
      )}
    </label>
  );
};
