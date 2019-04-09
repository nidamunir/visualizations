export function getSankeyData(response: any) {
  // get unique values in each column
  const genderValues = uniqueValuesOfColumn(response, "sex");
  const bloodSugarValues = uniqueValuesOfColumn(response, "fbs");
  const chestPainValues = uniqueValuesOfColumn(response, "cp");

  const uniqueValuesOfAllColumns = [
    ...genderValues.values,
    ...bloodSugarValues.values,
    ...chestPainValues.values
  ];
  // get nodes
  const nodes = calculateNodes(uniqueValuesOfAllColumns);

  // get links
  // provide source, target, and data (to calculate percentage)
  const links1 = calculateLinks(genderValues, bloodSugarValues, response);
  const links2 = calculateLinks(bloodSugarValues, chestPainValues, response);

  // combine nodes and links and return them
  const data = {
    nodes,
    links: [...links1, ...links2]
  };

  return data;
}

function uniqueValuesOfColumn(input: any, key: string) {
  const values = input
    .map((item: any) => item[key])
    .filter(
      (value: any, index: any, self: any) => self.indexOf(value) === index
    );
  // return object with column name and unique values in each columns
  // key = column name
  const uniqueValuesWithKeys: any = { key, values };

  return uniqueValuesWithKeys;
}

function calculateLinks(src: any, tar: any, response: any) {
  const totalRecords = response.length;

  const links: any = [];
  src.values.map((s: any) => {
    tar.values.map((t: any) => {
      links.push({
        source: s,
        target: t,
        value: Math.round(
          (response.filter((res: any) => {
            return res[src.key] == s && res[tar.key] == t;
          }).length /
            totalRecords) *
            100
        )
      });
    });
  });
  return links;
  // console.log('Links', links);
}
function calculateNodes(values: Array<string>) {
  const nodes: any = [];
  values.map((nodeName: string) => nodes.push({ id: nodeName }));
  return nodes;
}
