export function transformColumnValues(response: any) {
  response = changeColumnValue("1", "Male", "sex", response);
  response = changeColumnValue("0", "Female", "sex", response);
  response = changeColumnValue("0", "High blood sugar", "fbs", response);
  response = changeColumnValue("1", "Low blood sugar", "fbs", response);
  response = changeColumnValue("0", "Typical Angina", "cp", response);
  response = changeColumnValue("1", "Non Anginal Pain", "cp", response);
  response = changeColumnValue("2", "A Typical Angina", "cp", response);
  response = changeColumnValue("3", "Asymptomatic", "cp", response);

  return response;
}

export function changeColumnValue(
  oldName: any,
  name: any,
  key: string,
  array: any
) {
  // console.log("changing ", oldName, " to ", name);
  return array.map((item: any) => {
    var temp = Object.assign({}, item);
    if (temp[key] === oldName) {
      temp[key] = name;
    }
    return temp;
  });
}
