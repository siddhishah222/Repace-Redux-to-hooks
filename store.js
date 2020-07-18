import {useState, useEffect} from 'react';

let globalState={};  //global state is an object
let listeners=[];  // listen to changes in the state
let actions= {} ;  //actions which can be dispatched

export const useStore=(shouldListen=true)=>{
   const setState = useState(globalState)[1];
   
   const dispatch=(actionIdentifier,payload )=>{
    const newState= actions[actionIdentifier](globalState, payload)
    globalState={...globalState, ...newState}
    
    for(const listener of listeners){
        listener(globalState);
    }
  };
 

   useEffect(()=>{
       if(shouldListen){
        listeners.push(setState);
       }

    return()=>{
        listeners=listeners.filter(li=>li !== setState)
    }
   },[setState, shouldListen]);
   
   return[globalState, dispatch];
};

export const initStore=(userActions, initialState)=>{
    if(initialState){
        globalState={...globalState, ...initialState};
    }
    actions={...actions, ...userActions};
    
}

//managing state globally with just React and JS