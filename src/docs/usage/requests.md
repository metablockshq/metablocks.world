---
slug: requests
---

# Requests

Use the `emit` function to call actions defined in the main action map. 

This functions returns a Promise, which resolves with the object returned by `res.send` in the `main` process or an error.

```
import {emit} from 'eiphop';

emit('ping', {you: 'can', pass: 'data', to: 'main'})  
  .then(res => console.log(res)) // will log {msg: 'pong'}  
  .catch(err => console.log(err))  
;

emit('hip', {empty: 'payload'})  
  .then(res => console.log(res)) // will log {msg: 'hop'}  
  .catch(err => console.log(err))  
;
```