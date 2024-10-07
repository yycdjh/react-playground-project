import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../PlaygroundContext";
import { FileNameItem } from "./FileNameItem";
import styles from "./index.module.scss";

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

  return (
    <div className={styles.tabs}>
      {tabs.map((tab, index) => (
        <div onClick={() => setSelectedFileName(tab)} key={tab}>
          <FileNameItem
            key={tab + index}
            value={tab}
            actived={selectedFileName === tab}
            onClick={() => setSelectedFileName(tab)}
          ></FileNameItem>
        </div>
      ))}
    </div>
  );
}
