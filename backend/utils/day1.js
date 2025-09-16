// backend/utils/day1.js

export function groupByYear(launches) {
  const result = {};

  for (const launch of launches){ //walk through each launch
    const {year, id} = launch; //extract the year and ID
    if (!result[year]){ //if the year dne, create an empty array for it 
      result[year] = [];
    }
    result[year].push(id); //push the ID
  }
  return result; 
}

export async function getTopLaunches() {

  try{
    const url = "https://api.spacexdata.com/v5/launches"; //fetch spaceX data

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);

    const launches = await response.json(); // launches fetched

    //filter the top 5
    const topFive = launches.filter(l => l.success).slice(0, 5);
    return topFive;
  } catch (err){
    console.error("Failed to fetch launches:", err);
    return [];
  }
}

