import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { Popconfirm } from "antd";

export interface FileNameItemProps {
  value: string;
  actived: boolean;
  creating: boolean;
  readonly: boolean;
  onEditComplete: (name: string) => void;
  onRemove: () => void;
  onClick: () => void;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const {
    value,
    actived = false,
    readonly,
    creating,
    onClick,
    onEditComplete,
    onRemove,
  } = props;
  const [name, setName] = useState(value);
  const [editing, setEditing] = useState(creating);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 0);
  };

  useEffect(() => {
    if (creating) {
      inputRef?.current?.focus();
    }
  }, [creating]);

  const handleInputBlur = () => {
    setEditing(false);
    onEditComplete(name);
  };

  return (
    <div
      className={classNames(
        styles["tab-item"],
        actived ? styles.actived : null
      )}
      onClick={onClick}
    >
      {editing ? (
        <input
          ref={inputRef}
          className={styles["tabs-item-input"]}
          value={name}
          onBlur={handleInputBlur}
          onChange={(e) => setName(e.target.value)}
        ></input>
      ) : (
        <>
          <span onDoubleClick={!readonly ? handleDoubleClick : () => {}}>
            {name}
          </span>
          {!readonly ? (
            <Popconfirm
              title="确认删除该文件吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={(e) => {
                e?.stopPropagation();
                onRemove();
              }}
            >
              <span style={{ marginLeft: 5, display: "flex" }}>
                <svg width="12" height="12" viewBox="0 0 24 24">
                  <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
                  <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
            </Popconfirm>
          ) : null}
        </>
      )}
      {/* <span>{name}</span> */}
    </div>
  );
};
