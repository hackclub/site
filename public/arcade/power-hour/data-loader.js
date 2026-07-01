let fetchedDataCache = {};

async function fetchData() {
  return await fetch("/arcade/power-hour/inventory.json").then((d) => d.json());
}

async function fetchedDataLoader() {
  if (Object.keys(fetchedDataCache).length > 0) {
    return fetchedDataCache;
  }
  const data = await fetchData();
  if (data) {
    fetchedDataCache = data;
    return data;
  }
}

let fetchDataJob;
async function fetchedData() {
  if (!fetchDataJob) {
    fetchDataJob = fetchedDataLoader();
  }
  return await fetchDataJob;
}

fetchedData();
