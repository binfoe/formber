import type { FC } from 'react';
import { Button } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import AntDesignLeftOutlined from '~icons/ant-design/left-outlined';
import AntDesignRightOutlined from '~icons/ant-design/right-outlined';
import AntDesignEditOutlined from '~icons/ant-design/edit-outlined';
import AntDesignDeleteOutlined from '~icons/ant-design/delete-outlined';
import AntDesignPlusCircleOutlined from '~icons/ant-design/plus-circle-outlined';

export interface FieldControlProps {
  highlight: boolean;
  onInsert: (position: 'pre' | 'post') => void;
  onSort: (position: 'pre' | 'post') => void;
  onEdit: () => void;
  onDel: () => void;
}
export const FieldControl: FC<FieldControlProps> = ({
  highlight,
  onInsert,
  onSort,
  onEdit,
  onDel,
}) => {
  return (
    <div
      style={{
        display: highlight ? 'flex' : undefined,
      }}
      className='mask absolute left-0 top-0 z-10 hidden h-full w-full items-center justify-between rounded-md bg-black bg-opacity-20'
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
        <Button
          onClick={() => {
            onDel();
          }}
          icon={<AntDesignDeleteOutlined />}
        />
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
