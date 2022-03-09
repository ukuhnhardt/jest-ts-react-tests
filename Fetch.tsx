import React, {useState, useReducer} from 'react'
import axios from 'axios'

interface IFetchState {
  error: string | null,
  greeting: string | null
}

interface IFetchProps {
  url: string
}

type Action =
 | { type: 'request' }
 | { type: 'SUCCESS', greeting: string }
 | { type: 'ERROR', error: string };

const initialState = {
  error: null,
  greeting: null,
}

function greetingReducer(state: IFetchState, action: Action): IFetchState {
  switch (action.type) {
    case 'SUCCESS': {
      return {
        error: null,
        greeting: action.greeting,
      }
    }
    case 'ERROR': {
      return {
        error: action.error,
        greeting: null,
      }
    }
    default: {
      return state
    }
  }
}

export default function Fetch(props: IFetchProps) {
  const [{error, greeting}, dispatch] = useReducer(
    greetingReducer,
    initialState,
  )
  const [buttonClicked, setButtonClicked] = useState(false)

  const fetchGreeting = async (url: string) =>
    axios
      .get(url)
      .then(response => {
        const {data} = response
        const {greeting} = data
        dispatch({type: 'SUCCESS', greeting})
        setButtonClicked(true)
      })
      .catch(error => {
        dispatch({type: 'ERROR', error})
      })

      const postGreeting = async (url: string, data: string) =>
      axios
        .post(url, data)
        .then(response => {
          const {data} = response
          const {greeting} = data
          dispatch({type: 'SUCCESS', greeting})
          setButtonClicked(true)
        })
        .catch(error => {
          dispatch({type: 'ERROR', error})
        })
  
  const buttonText = buttonClicked ? 'Ok' : 'Load Greeting'

  return (
    <div>
      <button data-testid="button-get-data" onClick={() => fetchGreeting(props.url)} disabled={buttonClicked}>
        {buttonText}
      </button>
      <button data-testid="button-post-data" onClick={() => postGreeting(props.url, "postTest")} disabled={buttonClicked}>
        {buttonText}
      </button>
      {greeting && <h1>{greeting}</h1>}
      {error && <p role="alert">Oops, failed to fetch!</p>}
    </div>
  )
}