import { Button } from 'antd';
import { useState, type FC, type ReactNode } from 'react';
import { cs } from '@/util';
import AntDesignDownCircleOutlined from '~icons/ant-design/up-circle-outlined';
export const FieldCard: FC<{
  label: ReactNode;
  children: ReactNode;
  setting?: ReactNode;
  wrapContent?: boolean;
}> = ({ children, label, setting, wrapContent = true }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className='mx-2'>
      <div className='flex w-full items-center justify-between rounded-tl-md rounded-tr-md border border-solid border-border border-b-[rgba(0,0,0,0.05)] bg-blue-50 px-2 py-2'>
        {label}
        <div className='flex items-center'>
          {setting}
          <Button
            type='link'
            className={cs('transition-transform', !expanded && 'rotate-180')}
            onClick={() => {
              setExpanded((v) => !v);
            }}
            icon={<AntDesignDownCircleOutlined />}
          />
        </div>
      </div>
      {expanded && (
        <div
          className={cs(
            'w-full rounded-bl-md rounded-br-md border border-t-0 border-solid border-border py-4',
            wrapContent ? 'flex flex-wrap gap-y-4' : 'flex flex-col gap-y-4',
          )}
        >
          {children}
        </div>
      )}
      {!expanded && (
        <div
          onClick={() => {
            setExpanded(true);
          }}
          className='w-full cursor-pointer rounded-bl-md rounded-br-md border border-t-0 border-solid border-border py-4 text-center text-xs text-gray-50 hover:text-gray-300'
        >
          已折叠，点击展开内容
        </div>
      )}
    </div>
  );
};
