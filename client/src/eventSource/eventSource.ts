import { IPlayer } from "../constants"




export const setupEventSource = (handler: (arg: IPlayer)=> void) => {
    const eventSource = new EventSource('http://localhost:8000/')

    eventSource.onmessage = e => {
      const newData =  JSON.parse(e.data)
      handler(newData)
    }

    return eventSource
}
  