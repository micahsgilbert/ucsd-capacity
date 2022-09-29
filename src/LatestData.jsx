import { useState } from 'react'

function LiveItem(props) {
  return <div className={"inline-block bg-indigo-500 h-32 rounded-xl cursor-pointer hover:bg-indigo-600"} onClick={props.onSelected}>
    <div className={"h-20 p-2 bg-indigo-700 flex items-center justify-center rounded-tr-xl rounded-tl-xl"}>
      <h4 className={"bold text-neutral-200 text-center w-full"}>{props.name}</h4>
    </div>
    <div className={"h-12 flex items-center justify-center"}>
      {props.isOpen ? <p className={"text-neutral-100 text-xl font-bold"}>{props.busyness}%</p> : <p className={"text-red-300 text-lg"}>Closed</p>}
    </div>
  </div>
}

function LatestData(props) {
  if (props.data.length > 0) {
    return (
      <div className={"grid gap-2 grid-cols-3 sm:grid-cols-6 md:grid-cols-8"}>
        {props.data.map(location => (
          <LiveItem key={location.name} name={location.name} busyness={location.busyness} isOpen={location.isOpen} onSelected={() => {props.onSelect(location.name)}}/>
        ))}
      </div>
    )
  } else {
    return null
  }
  
}

export default LatestData
