import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../PlaygroundContext";
import { FileNameItem } from "./FileNameItem";
import styles from "./index.module.scss";
import {
  APP_COMPONENT_FILE_NAME,
  ENTRY_FILE_NAME,
  IMPORT_MAP_FILE_NAME,
} from "../../../files";

export default function FileNameList() {
  const {
    files,
    addFile,
    removeFile,
    updateFileName,
    setSelectedFileName,
    selectedFileName,
  } = useContext(PlaygroundContext);

  const [tabs, setTabs] = useState([""]);
  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  const handleEditComplete = (name: string, prevName: string) => {
    updateFileName(prevName, name);
    setSelectedFileName(name);
    setCreating(false);
  };

  const [creating, setCreating] = useState(false);
  const addTab = () => {
    addFile("Comp" + Math.random().toString().slice(2, 8) + ".tsx");
    setCreating(true);
  };

  const handleRemove = (name: string) => {
    removeFile(name);
    setSelectedFileName(ENTRY_FILE_NAME);
  };

  const readonlyFileNames = [
    ENTRY_FILE_NAME,
    IMPORT_MAP_FILE_NAME,
    APP_COMPONENT_FILE_NAME,
  ];

  return (
    <div className={styles.tabs}>
      {tabs.map((tab, index) => (
        <div onClick={() => setSelectedFileName(tab)} key={tab}>
          <FileNameItem
            key={tab + index}
            value={tab}
            readonly={readonlyFileNames.includes(tab)}
            creating={creating && index === tabs.length - 1}
            actived={selectedFileName === tab}
            onClick={() => setSelectedFileName(tab)}
            onEditComplete={(name: string) => handleEditComplete(name, tab)}
            onRemove={() => {
              handleRemove(tab);
            }}
          ></FileNameItem>
        </div>
      ))}
      <div className={styles.add} onClick={addTab}>
        +
      </div>
    </div>
  );
}
