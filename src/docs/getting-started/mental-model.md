---
slug: mental-model
---
# Mental Model

The builtin **[electron IPC model](https://electronjs.org/docs/api/ipc-main)** is based on channels & callbacks. You fire a request and forget about it. When the response arrives, the callback is called. This leads to multiple subscribers and providers. 

With Eiphop, we restrict the number of receivers and providers to one, and create an http like interface to manage multiple requests.
You define actions in the main process and call them from the renderere using the interface defined by Eiphop.

**[This blog post](https://medium.com/@shivekkhurana/introducing-eiphop-an-electron-ipc-wrapper-good-fit-for-react-apps-50de6826a47e)** gives detailed explanation with diagrams and graphics. We recommend reading it to get a strong grasp of Eiphop.