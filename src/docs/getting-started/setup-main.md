---
slug: setup-main
---
# Setup Main

## Define Actions
Actions are plain js maps where the key is the name of the action and the value is a function (sync or async).
All actions recieve a `req` and a `res` object. The actions return a value by using the `res.send` function.

These actions can live in different files depending on your domain, however the keys should be unique across all actions.

```
const pingActions = {  
  ping: (req, res) => {  
    const {payload} = req;  
    res.send({msg: 'pong'});  
  }  
}

const hipActions = {
  hip: async (req, res) => {  
    const {payload} = req;
    
    // sleep for 800ms
    await  new  Promise(done  =>  setTimeout(done, 800)); 
    res.send({msg: 'hop'});

    // or res.error({msg: 'failed'})  
  } 
}
```

## Setup Main Handler

The main handler is sets up the Eiphop interface to your actions.
Actions from different domain objects need to be combined to one global map and passed to Eiphop's `setupMainHandler` function.

```
// somewhere inside main.js

import {setupMainHandler} from 'eiphop';
import electron from 'electron';

setupMainHandler(electron, {...hipActions, ...pingActions}, true);
```

setupMainHandler takes three arguments:

1. The electron module to use
2. The actions map to expose (the above example exposes two actions : {ping: function(), hip: function()})
3. Enable logging flag (false by default).
