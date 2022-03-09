import React from 'react'; 
import sum from './sum';

export interface ISumFormProps {
  a: number;
  b: number;
}

function SumForm (props: ISumFormProps): JSX.Element {
  return (
    <div data-testid="add-form">
    <p>a: {props.a}</p>
    <p>b: {props.b}</p>
    <p>==========</p>
    <p data-testid="add-sum">{sum(props.a, props.b)}</p>
    </div>
  )
}

export { SumForm }