export async function readFile() {
  // read file and return data
  // supply file path here
  const options = {
    path: "./heart.csv"
  };
  let fileData = {};
  await fetch("http://localhost:5000/api/csvToJson", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(options)
  })
    .then(response => response.json())
    .then(data => {
      fileData = data;
    });
  return fileData;
}
