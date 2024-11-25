import { XMLParser } from "fast-xml-parser";

export const xmlToJson = (xml: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");
  const xmlParser = new XMLParser();
  const xmlString = new XMLSerializer().serializeToString(doc);
  const json = xmlParser.parse(xmlString);

  return json;
};
