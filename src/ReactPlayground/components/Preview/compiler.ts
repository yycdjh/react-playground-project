import { transform } from "@babel/standalone";
import { Files } from "../../PlaygroundContext";
import { ENTRY_FILE_NAME } from "../../files";
import { PluginObj } from "@babel/core";

export const babelTransform = (
  filename: string,
  code: string,
  files: Files
) => {
  let result = "";
  try {
    result = transform(code, {
      presets: ["react", "typescript"],
      filename,
      plugins: [customResolver(files)],
      retainLines: true,
    }).code!;
  } catch (e) {
    console.log("编译出错", e);
  }

  return result;
};

function customResolver(files: Files): PluginObj {
  return {
    visitor: {
      ImportDeclaration(path) {
        path.node.source.value = "23333";
      },
    },
  };
}

export const compile = (files: Files) => {
  const main = files[ENTRY_FILE_NAME];
  return babelTransform(ENTRY_FILE_NAME, main.value, files);
};
