import { useCallback, useEffect, useRef, useState } from 'react';
export function useVisualizer(makeSteps, initial) {
  const [values,setValues]=useState(initial),[stepIndex,setStepIndex]=useState(-1),[playing,setPlaying]=useState(false),[speed,setSpeed]=useState(500),[steps,setSteps]=useState([]);
  const timer=useRef(null); const clear=useCallback(()=>{if(timer.current){clearTimeout(timer.current);timer.current=null;}},[]);
  const reset=useCallback((next=initial)=>{clear();setPlaying(false);setValues(next);setStepIndex(-1);setSteps(makeSteps(next));},[clear,initial,makeSteps]);
  useEffect(()=>{reset(initial);return clear},[makeSteps,initial,reset,clear]);
  const step=useCallback(()=>{
    const next=stepIndex+1;
    if(next>=steps.length){setPlaying(false);return;}
    const s=steps[next];
    setValues(current=>{const nextValues=[...current]; if(s.type==='swap'){const [x,y]=s.indices;[nextValues[x],nextValues[y]]=[nextValues[y],nextValues[x]];} if(s.type==='overwrite')nextValues[s.index]=s.value; return nextValues;});
    setStepIndex(next);
  },[stepIndex,steps]);
  useEffect(()=>{clear();if(playing&&stepIndex<steps.length-1){timer.current=setTimeout(step,speed)}else if(stepIndex>=steps.length-1)setPlaying(false);return clear},[playing,stepIndex,speed,step,clear,steps.length]);
  return {values,stepIndex,steps,playing,setPlaying,step,reset,speed,setSpeed};
}
