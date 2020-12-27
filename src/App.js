import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import DataTable from './components/DataTable/DataTable'

function App() {

  const capFilter = [
    {
      name: 'All',
      id: 'all'
    },
    {
      name: 'Top 100',
      id: 'top_100'
    },
    {
      name: 'Bottom 100',
      id: 'bottom_100'
    }
  ]

  const [allData, setAllData] = useState()
  const [onlyLowVol, setOnlyLowVol] = useState(false);
  const [onlyMom, setOnlyMom] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedCap, setSelectedCap] = useState(capFilter[0]);

  const getAllData = useCallback(async () => {
    let data = await query();
    return data.reduce(dataFormatter, {});
  }, [])

  useEffect(() => {
    (async () => {
      const data = await getAllData();
      // setQualityData(data.quality.data.slice(1))
      // setLowVolData(data.low_volatile.data.slice(1))
      console.log(data);
      setAllData(data);
    })();
  }, [getAllData])

  const qualityData = useCallback(() => {
    return allData ? allData.quality.data.slice(1) : []
  }, [allData])

  const lowVolData = useCallback(() => {
    return allData ? allData.low_volatile.data.slice(1) : []
  }, [allData])

  const momData = useCallback(() => {
    return allData ? allData.momentum.data.slice(1) : []
  }, [allData])

  const nifty200Data = useCallback(() => {
    return allData ? allData.nifty_200.data.slice(1) : []
  }, [allData])

  const query = async () => {
    let data = await fetch('https://stocker.jijnasu.in/');
    data = await data.json();
    return data
  }

  const dataFormatter = (accumalator, value) => {
    accumalator[value.name] = value.data;
    return accumalator
  }



  const filtered = useCallback(() => {
    let data = qualityData()
    if (onlyLowVol) {
      data =  data.filter(item => lowVolData().find(lv => lv.symbol === item.symbol))
    }

    if (onlyMom) {
      data =  data.filter(item => momData().find(lv => lv.symbol === item.symbol))
    }
    return data
  }, [lowVolData, momData, onlyLowVol, onlyMom, qualityData])

  const capFiltered = useCallback((data) => {
    switch (selectedCap.id) {
      case 'top_100':
        const top100 = nifty200Data().filter((_, index) => index < 101)
        return data.filter(item => top100.find(lv => lv.symbol === item.symbol))
      case 'bottom_100':
        const top200 = nifty200Data().filter((_, index) => index > 100)
        return data.filter(item => top200.find(lv => lv.symbol === item.symbol))
      default:
        return data;
    }
  }, [nifty200Data, selectedCap.id]);

  const formatted = (data) => {
    return data.map(item => ({
      industry: item.meta.industry,
      symbol: item.meta.symbol,
      name: item.meta.companyName,
      lastPrice: parseFloat(item.lastPrice).toFixed(2)
    }));
  }

  const volChangeHandler = () => {
    setOnlyLowVol(!onlyLowVol)
  }

  const momChangeHandler = () => {
    setOnlyMom(!onlyMom)
  }

  useEffect(() => {
    let data = filtered();
    setTableData(formatted(data));
  }, [capFiltered, onlyLowVol, selectedCap, allData, filtered])

  const capChangeHandler = (e) => {
    setSelectedCap(capFilter.find(item => item.id === e.target.value));
  }

  return (
    <div className="App">
      <div class="container">
        <h1>Stockist</h1>
        <p>Nifty 200 Quality 30</p>
        <div className="filters">
          <label class="filterItem">
            <input type="checkbox" checked={onlyLowVol} onChange={volChangeHandler} />
        Low Volatile
      </label>
          <label class="filterItem">
            <input type="checkbox" checked={onlyMom} onChange={momChangeHandler} />
        Momentum
      </label>
          {/* <select class="filterItem" value={selectedCap.id} onChange={capChangeHandler} >
            {
              capFilter.map(item => (
                <option value={item.id}>{item.name}</option>
              ))
            }
          </select> */}
        </div>
        <div className="data">
          <DataTable data={tableData} />
        </div>
      </div>
    </div>
  );
}

export default App;
