import { useContext } from "react";
import Editor from "./Editor";
import FileNameList from "./FileNameList";
import { PlaygroundContext } from "../../PlaygroundContext";
import { debounce } from "lodash-es";

export default function CodeEditor() {
  // const file = {
  //   name: "guang.tsx",
  //   value: 'import lodash from "lodash";\n\nconst a = <div>guang</div>;',
  //   language: "typescript",
  // };

  const { files, setFiles, selectedFileName, setSelectedFileName } =
    useContext(PlaygroundContext);

  const file = files[selectedFileName];

  function onEditorChange(value?: string) {
    // console.log(...arguments);
    files[file.name].value = value!;

    setFiles({ ...files });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <FileNameList></FileNameList>
      <Editor file={file} onChange={debounce(onEditorChange, 500)}></Editor>
    </div>
  );
}
