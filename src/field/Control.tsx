import type { FC } from 'react';
import { Button, Popconfirm } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import AntDesignLeftOutlined from '~icons/ant-design/left-outlined';
import AntDesignRightOutlined from '~icons/ant-design/right-outlined';
import AntDesignEditOutlined from '~icons/ant-design/edit-outlined';
import AntDesignDeleteOutlined from '~icons/ant-design/delete-outlined';
import AntDesignPlusCircleOutlined from '~icons/ant-design/plus-circle-outlined';
import { cs } from '@/util';

export interface FieldControlProps {
  onInsert: (position: 'pre' | 'post') => void;
  onSort: (position: 'pre' | 'post') => void;
  onDel: () => void;
}
export const FieldControl: FC<
  FieldControlProps & {
    onEdit: () => void;
    mode?: 'cover' | 'float';
    visible: boolean;
  }
> = ({ visible, mode = 'cover', onInsert, onSort, onEdit, onDel }) => {
  return (
    <div
      className={cs(
        'mask absolute z-10 items-center justify-between rounded-md bg-black bg-opacity-20',
        visible ? 'flex' : 'hidden',
        mode === 'cover' ? 'left-0 top-0 h-full w-full' : 'left-1/2 top-0 -translate-x-1/2 py-1',
      )}
    >
      <Button
        onClick={() => {
          onInsert('pre');
        }}
        className='relative -translate-x-1/2'
        icon={<AntDesignPlusCircleOutlined />}
      />
      <ButtonGroup>
        <Button
          onClick={() => {
            onSort('pre');
          }}
          icon={<AntDesignLeftOutlined />}
        />
        <Button
          onClick={() => {
            onEdit();
          }}
          icon={<AntDesignEditOutlined />}
        />
        <Popconfirm
          title='确认删除字段？'
          onConfirm={() => {
            onDel();
          }}
        >
          <Button icon={<AntDesignDeleteOutlined />} />
        </Popconfirm>
        <Button
          onClick={() => {
            onSort('pre');
          }}
          icon={<AntDesignRightOutlined />}
        />
      </ButtonGroup>
      <Button
        onClick={() => {
          onInsert('post');
        }}
        className='relative translate-x-1/2'
        icon={<AntDesignPlusCircleOutlined />}
      />
    </div>
  );
};
