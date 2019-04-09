export function getPieChartData(response: any, query = "cp") {
  const groupedData = getPercentage(response, query);
  return getData(groupedData);
}

function getPercentage(input: any, query: string) {
  var result = Object.keys(input).reduce(function(acc: any, key) {
    var column: any = input[key][query];
    if (acc[column]) acc[column]++;
    else acc[column] = 1;
    return acc;
  }, {});
  // convert count to percentage
  Object.keys(result).map(function(key, index) {
    result[key] = Math.round((result[key] / input.length) * 100);
  });

  return result;
}

function getData(groupedData: any) {
  const data: any = [];
  Object.keys(groupedData).forEach(key => {
    const temp = {
      id: key,
      label: key,
      value: groupedData[key]
    };
    data.push(temp);
  });

  return data;
}
