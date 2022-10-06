import { useState } from 'react'
import LiveItem from './LiveItem'

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
