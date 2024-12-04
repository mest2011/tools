/* eslint-disable @typescript-eslint/no-explicit-any */
export const extractSummary = (jsonData: any[]) => {
  let summary = "";

  const processChildren = (children: any[]) => {
    children.forEach((child) => {
      if (
        typeof child === "string" &&
        child.toLowerCase().indexOf("clique") === -1
      ) {
        summary += child + " ";
      } else if (typeof child === "object" && child.children) {
        processChildren(child.children);
      }
    });
  };

  jsonData.forEach((node) => {
    if (node.tag === "p" && node.children) {
      processChildren(node.children);
    } else if (node.tag === "ul" && node.children) {
      node.children.forEach((listItem: { children: any[] }) => {
        if (listItem.children) {
          processChildren(listItem.children);
        }
      });
    }
  });

  return summary.trim();
};
