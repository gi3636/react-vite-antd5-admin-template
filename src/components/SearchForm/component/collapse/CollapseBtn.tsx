import React from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

/**
 * 折叠按钮
 * @param expand
 * @param setExpand
 * @constructor
 */
function CollapseBtn({ expand, setExpand }) {
  return (
    <a
      style={{ fontSize: 12 }}
      onClick={() => {
        setExpand(!expand);
      }}>
      {expand ? (
        <>
          <UpOutlined /> 折叠
        </>
      ) : (
        <>
          <DownOutlined />
          展开
        </>
      )}
    </a>
  );
}

export default CollapseBtn;
