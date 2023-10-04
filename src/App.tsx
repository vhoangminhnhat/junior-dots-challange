import logo from './logo.svg';
import './App.css';
import _, { isEmpty } from 'lodash'
import React, { useState, type MouseEvent } from 'react';
import { Button, Divider } from 'antd';

interface Dots{
  x: number,
  y: number
}

function App() {
  const [dots, setDots] = useState<Dots[]>([]);
  const [dotsfunc, setDotsFunc] = useState<Dots[]>([])

  const Draw = (e: MouseEvent) => {
    let {clientX, clientY} = e;
    setDots([
      ...dots,
      {
        x: clientX,
        y: clientY
      }
    ])
  };

  const Undo = () => {
    if(!isEmpty(dots)){
      let data: any = dots.pop();
      setDotsFunc([
        ...dotsfunc,
        data
      ]);
    }
    else{
      alert(`You haven't created any dots yet !`);
    }
  };

  const Redo = () => {
    if(!isEmpty(dotsfunc)){
      let data: any = dotsfunc.pop()
      setDots([
        ...dots,
        data
      ])
    }
    else{
      alert(`You've already had all the dots on the screen`)
    }
  }

  return (
   <div className='App'>
      <div id='button-func'>
        <Button onClick={Undo} type='primary'>Undo</Button>
        <Button onClick={Redo} type='dashed'>Redo</Button>
      </div>
      <div id='clickable' onClick={Draw}>
        {dots.map(({x, y}: Dots, i: number ) => (
          <div key={`dots-${i}`} style={{left: x, top: y}} className='dots'/>
        ))}
      </div>
   </div>
  );
}

export default App;
