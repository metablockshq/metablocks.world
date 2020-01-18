---
slug: setup-renderer
---

# Setup Renderer

To call functions defined in the `main` process, we need to setup the `renderer` to call functions and capture the return value. 
In your renderer’s index.js file, setup the listener as follows:

```
import {setupFrontendListener} from 'eiphop';

// listen to ipc responses  
const electron = window.electron; // or require('electron')
setupFrontendListener(electron);
```

`setupFrontendListener` takes only an electron module. There is no support for logging on frontend (we realised it’s easier to console log manually in renderer).

Now your channels are ready. All you need to do is to send requests and expect responses.