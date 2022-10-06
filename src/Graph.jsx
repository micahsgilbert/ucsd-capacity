import { useState, useMemo, useEffect } from 'react'
import { Chart } from 'react-charts'
import { getDatabase, get, ref, query, startAt, endAt, orderByChild, onValue} from 'firebase/database'

function Graph(props) {
  const tzOffset = 25200000

  const getHistoricalData = timeframe => {
    setLoading(true)
    const db = getDatabase()

    let startTime = new Date()
    let endTime = new Date()
    let startUTC
    let endUTC

    // getTime has the local timezone data so tzOffset isn't necessary here
    // It's kind of annoying that JS processes dates in milliseconds since UTC epoch so I made the decision to convert it to seconds when stored in the database just in case I want to work with that data with something else that expects seconds since UTC.
    if (timeframe == "today") {
      startTime.setHours(6, 0, 0)
      endTime.setHours(23,59,59)
      startUTC = (startTime.getTime())/1000
      endUTC = (endTime.getTime())/1000
    } else if (timeframe == "yesterday") {
      startTime.setHours(6, 0, 0) 
      endTime.setHours(23,59,59)
      // 86400 seconds in a day
      startUTC = (startTime.getTime())/1000 - 86400
      endUTC = (endTime.getTime())/1000 - 86400
    } else {
      return
    }

    const dbQuery = query(ref(db, "/"+props.location), orderByChild("time"), startAt(startUTC), endAt(endUTC))
    get(dbQuery).then(snapshot => {processDBsnapshot(snapshot, timeframe)})
  }
    
  const processDBsnapshot = (snapshot, timeframe) => {
    if (snapshot.exists()) {
      const rawSnapshotData = Object.values(snapshot.val())
      if (timeframe == "today") {
        setRawTodayData(rawSnapshotData)
      } else {
        setRawYesterdayData(rawSnapshotData)
      }
      setLoading(false)
    }
  }

  const parseData = () => {
    let parsedData =  [{
        label: "Today",
        data: rawTodayData.map(item => ({time: new Date(item.time * 1000 - tzOffset), busyness: item.busyness})) 
    }, {
        label: "Yesterday",
        data: rawYesterdayData.map(item => ({time: new Date((item.time+86400) * 1000 - tzOffset), busyness: item.busyness}))
    }]
    return parsedData
  }

  const [rawTodayData, setRawTodayData] = useState([])
  const [rawYesterdayData, setRawYesterdayData] = useState([])
  const [loading, setLoading] = useState(true)

  const primaryAxis = useMemo(() => ({getValue: datum => datum.time, scaleType: "time"}))
  const secondaryAxes = useMemo(() => ([{getValue: datum => datum.busyness}]))
  const chartData = useMemo(parseData)

  useEffect(() => { getHistoricalData("today")}, [props.location])
  useEffect(() => { getHistoricalData("yesterday")}, [props.location])

  return <div className="w-full h-60 mb-6 bg-slate-200 relative rounded-xl">
    <div className={"absolute top-2 left-2"}>
    </div>
    <button className={"w-6 h-6 text-slate-200 bg-slate-500 hover:bg-slate-600 rounded-xl absolute top-2 right-2"} onClick={props.onClose}>x</button>
    <h3 className={"text-center text-slate-900 text-3xl"}>{props.location}</h3>
    <div className={"h-40"}>
      {loading ? <p className={"w-full h-full text-center"}>Loading...</p> : <Chart options={{data: chartData, primaryAxis, secondaryAxes}} />}
    </div>
  </div>
}

export default Graph
