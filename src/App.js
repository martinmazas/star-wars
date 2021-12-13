import React, { useEffect, useState } from 'react';
import './App.css';
import VehicleTable from './Components/VehicleTable';
import axios from 'axios';
import BarChart from './Components/BarChart';

const population = new Map();
const maxSum = { 'name': '', 'population': '', 'planets': [], 'people': [] };
const chart = [
  { 'name': 'Tatooine', 'population': 0 },
  { 'name': 'Alderaan', 'population': 0 },
  { 'name': 'Naboo', 'population': 0 },
  { 'name': 'Bespin', 'population': 0 },
  { 'name': 'Endor', 'population': 0 }
]

function App() {
  // pagination parameters
  let pageNum = 1;
  let planetPage = 1;

  const [allVehicles, setAllVehicles] = useState([]);
  const [showButton, setShowButton] = useState(true);

  // Vehicles data preparation
  const appendVehicles = (docs) => {
    const pilots = [];
    docs.pilots.map(pilot => axios.get(pilot).then(p => pilots.push([p.data.name, p.data.homeworld]))); //get name and planet for each pilot
    setAllVehicles(allVehicles => [...allVehicles, [docs.name, pilots, 0]]);
  }

  // Population preparation- save each planet with its population and url in a set
  const appendPopulation = (docs) => {
    if (docs.population === 'unknown') {
      docs.population = 0;
    }
    population.set(docs.url, docs.population);
    chart.map(c => docs.name === c['name'] ? c['population'] = Number(docs.population) : null);
  }

  // api call to get the vehicles that have any pilot.
  const getVehicles = () => {
    axios.get(`https://swapi.dev/api/vehicles/?page=${pageNum}`)
      .then(docs => {
        if (docs.data.next) {
          docs.data.results.map(doc => doc.pilots.length ? appendVehicles(doc) : null);
          pageNum++;
          getVehicles();
        }
        else {
          docs.data.results.map(doc => doc.pilots.length ? appendVehicles(doc) : null);
        }
      })
      .catch(err => console.log(err));
  }

  // get the population for each vehicle
  const getVehiclePopulation = () => {
    allVehicles.map(vehicle =>
      vehicle[1].map(v => vehicle[2] += Number.isNaN(population.get(v[1])) ? 0 : Number(population.get(v[1])))
    );

    // get the vehicle with maximum population and prepare the necessary data
    for (let i = 0; i < allVehicles.length; i++) {
      if (allVehicles[i][2] > maxSum['population']) {
        maxSum['name'] = allVehicles[i][0];
        maxSum['population'] = allVehicles[i][2];
        allVehicles[i][1].map((vehicle) => {
          maxSum['planets'].push(vehicle[1]);
          maxSum['people'].push(vehicle[0]);
          return maxSum;
        })
      }
    }

    setShowButton(false);
  }

  // get planet population
  const getPlanetPopulation = () => {
    axios.get(`https://swapi.dev/api/planets/?page=${planetPage}`)
      .then(docs => {
        if (docs.data.next) {
          docs.data.results.map(doc => appendPopulation(doc));
          planetPage++;
          getPlanetPopulation();
        }
        else {
          appendPopulation(docs.data.results);
        }
      })
      .catch(err => console.log(err));
  }


  useEffect(() => {
    getVehicles();
    getPlanetPopulation();

    // eslint-disable-next-line
  }, []);



  return (
    <div className="App">
      {showButton ? <button onClick={getVehiclePopulation} style={{ visibility: showButton ? 'show' : 'hidden' }}>Click</button> : <VehicleTable maxSum={maxSum} />}
      {!showButton ? <BarChart population={chart} /> : null}
    </div>
  );
}

export default App;
