import { useState, useEffect } from 'react'
import LatestData from "./LatestData"
import Graph from "./Graph"

function App(props) {
  const getLatestData = () => {
    fetch("https://waitz.io/live/ucsd").then(req => req.json()).then(data => {
      setLatestData(data["data"])
    })
  }

  const [activeChartLocation, setActiveChartLocation] = useState("")
  const [latestData, setLatestData] = useState({})

  useEffect(getLatestData, [])

  return (
    <div className="App">
    {activeChartLocation && <Graph location={activeChartLocation} onClose={() => {setActiveChartLocation("")}}/>}
    <LatestData data={latestData} onSelect={location => {setActiveChartLocation(location)}} />
    </div>
  )
}

export default App
