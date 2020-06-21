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

  const nifty200Data = useCallback(() => {
    return allData ? allData.nifty_200.data.slice(1) : []
  }, [allData])

  const query = async () => {
    let data = await fetch('https://stocker.jijnasu.in/');
    data = JSON.parse(await data.text());
    return data.map(item => {
      item.data = JSON.parse(item.data);
      return item;
    })
  }

  const dataFormatter = (accumalator, value) => {
    accumalator[value.name] = value.data;
    return accumalator
  }



  const volFiltered = useCallback(() => {
    if (onlyLowVol) {
      return qualityData().filter(item => lowVolData().find(lv => lv.symbol === item.symbol))
    }
    return qualityData()
  }, [lowVolData, onlyLowVol, qualityData])

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

  useEffect(() => {
    let data = volFiltered();
    setTableData(formatted(capFiltered(data)));
  }, [capFiltered, onlyLowVol, selectedCap, volFiltered, allData])

  const capChangeHandler = (e) => {
    setSelectedCap(capFilter.find(item => item.id === e.target.value));
  }

  return (
    <div className="App">
      <h1>Stockist</h1>
      <p>Strategic index based stock filtering</p>
      <div className="filters">
        <label>
          <input type="checkbox" checked={onlyLowVol} onChange={volChangeHandler} />
        Low Volatile
      </label>
        <select value={selectedCap.id} onChange={capChangeHandler} >
          {
            capFilter.map(item => (
              <option value={item.id}>{item.name}</option>
            ))
          }
        </select>
      </div>
      <div className="data">
        <DataTable data={tableData} />
      </div>
    </div>
  );
}

export default App;
