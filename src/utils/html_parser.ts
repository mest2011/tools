/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseDocument } from "htmlparser2";

const htmlToJson = (html: string) => {
  const document = parseDocument(html);

  const processNode = (node: any): any => {
    const { type, name, children, attribs, data } = node;

    if (type === "text") {
      return data.trim(); // Retorna texto puro
    }

    if (type === "tag") {
      return {
        tag: name,
        attributes: attribs || {},
        children: children?.map(processNode).filter(Boolean) || [],
      };
    }

    return null; // Ignorar outros tipos de nós
  };

  return document.children.map(processNode).filter(Boolean);
};

export default htmlToJson;