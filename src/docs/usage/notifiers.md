---
slug: notifiers
---
# Notifiers

`res.send` resolves the request but created by `emit` but sometimes you might need to send intermediate state.

For example, you might need to communicate the progress of a long upload. In casese like these, you can use the `res.notify` method to send data without terminating the cycle. 

## Notify in the main
Use `res.notify` method to send any arbitary data to the `renderer` process.
```
const hipActions = {
  hip: async (req, res) => {  
    const {payload} = req;

	// Notify renderer without terminating connection
    res.notify('Sleeping for 800ms, BRB');

    // sleep for 800ms
    await  new  Promise(done  =>  setTimeout(done, 800)); 
    res.send({msg: 'hop'});

  } 
}
```

## Capture notifications in renderer

Capture the notification data using a callback as the third argument to the `emit` function.

```
// will log "Sleeping for 800ms, BRB"
const onNotification = (data) => console.log(data);

emit('hip', {empty: 'payload'}, onNotification)  
  .then(res => console.log(res)) // will log {msg: 'hop'}  
  .catch(err => console.log(err))  
;
```