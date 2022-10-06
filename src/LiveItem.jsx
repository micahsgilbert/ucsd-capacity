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

export default LiveItem
