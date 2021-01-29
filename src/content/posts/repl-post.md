---
title: Reaching flow state with Clojure's REPL
subTitle: 
tags: clojure, repl, feedback loop, development process
canonicalUrl:  https://www.newline.co/@shivekkhurana/reaching-flow-state-with-clojures-repl--14018b04
publishedOn: 2021-01-29
featured: false
heroImg: /img/content/posts/repl-flow-cover.png
slug: clojure-repl-flow-state
---

*Photo by <a href="https://unsplash.com/@jeremybishop?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Jeremy Bishop</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>*

Did you know that you sleep in multiple phases? At first, you lie down and close your eyes, but it's still easy to be woken up. As sleep progresses it becomes deeper, to the point where you lose your sense of time and start dreaming. This stage is called deep sleep or REM sleep and it's essential for learning, memory, and wellbeing. The catch is - you cannot progress to the REM stage until you have finished the earlier, non-REM stages.

Flow state is akin to deep sleep. When you reach your desk, you are not immediately productive. You read your emails, check Reddit or Hacker News, and then slowly ease into the flow state (at which point you get disturbed by being called for a meeting, of course!). The point is, to work efficiently, we need to progress in stages until we reach flow state.

Any external hindrance breaks the flow and forces us to start again. External distractions can be due to the surrounding environment (kids, meetings, food breaks, angry neighbors) or your tooling (compile time, documentation lookups, unrelated bugs, etc). Library and language developers cannot fix your issues with your angry neighbor, but a lot of effort has been made to improve the tools.

In this post, you will learn how REPL driven development can provide fast feedback and get you into the flow state sooner.

## Hot Reload, Fast Refresh, and Fast compilation

Working with an interpreted language like Python is faster than a compiled language like C++, in part because of the feedback cycle. In the same amount of time, you can test more changes in Python code than C++ code, because you don't need to compile. Eliminating the need to compile is equivalent to eliminating external distractions. You can experiment with more ideas without hurdles, and progress more quickly towards reaching flow state. But this comes at the cost of performance.

Compiled languages have a slow feedback cycle. This leads to efficient performance, but a compromised developer experience.

Languages like Go focus on fast compilation, making the feedback loop short without compromising runtime performance.

Frontend JavaScript has tools like Browserify's Live Reload, React HMR, and Fast Refresh, which compile your program and execute it so you can reach or maintain your flow state. If it takes a long time to compile every change, you'll probably never reach flow state.

## Problems

For compiled or transpiled languages, the code we write and the code that's run is inherently different. For example, you might be writing Typescript, which is converted to ES6 before being executed in the browser. The problem is that the entire representation of the codebase is flushed down each time you make a change. The transpiler is efficient and makes sure to recompile only the files that were changed and depend on the change. But it is still hard to cherrypick the exact function or variable that changed and update just that piece in the runtime.

There is no one-to-one mapping of all functions in the source to compiled code, so we resort to the next best strategy - recompilation (ie. compile the entire module).

The lack of direct mapping leads to a significant loss of power. These mappings exist to an extent in source maps, but source maps treat code as text. Lines are indexed and recorded. A source map can tell that lines 1 to 4 of source code produced lines 14 to 28 of compiled code, but it cannot tell the position or semantics of the function defined on line 4 in the source code.

This lack of mapping is mainly because C-style languages are written like a natural language. Computers are not good at parsing natural languages. Computers are good at parsing data-structures and discrete forms.

## Shoot for the stars

What do we gain if we can somehow get this one-to-one mapping of source and compiled code? An easier path to flow state?\
\
Imagine a language that is not written like English prose, but expressed in terms of data structures.

Imagine if we could somehow connect the source code to the runtime (compiled code), to the extent that we could pinpoint and execute a function `f` defined in source code right from the editor. This is what it would look like:

![Executing inside Clojure Repl](https://s3.amazonaws.com/assets.fullstack.io/n/20201219081714648_repl-demo.gif?medium)
*Figure 1: Executing functions in the REPL*

In the GIF above, we have ClojureScript source code in a text editor, connected to a runtime (browser). We can execute functions as we write them. No refresh, no recompilation, no interpreter.

Just one function, picked up, compiled, and executed right inside your editor. And the best part is, this system has been stable and in production since 2015 (perhaps even earlier than that).

## What is REPL and REPL driven development

To understand the REPL and REPL driven development, we must first introduce Clojure. Clojure is a dialect of LISP (short for List Processing). LISP code is written in the form of trees, unlike C-style code which is written like natural English language.

Consider a function that takes a Hash Map like `{:a "b" :c "d"}` and returns a query string like `"a=b&c=d"`:

```
(defn map->query-string [m]
	(reduce
		(fn [acc [k v]]
			(str acc "&" k "=" v))
			"" m))
```

This code can be represented in the form of a tree as follows:

![Clojure code is a tree](https://s3.amazonaws.com/assets.fullstack.io/n/20201219082406554_tree.svg)
*Figure 2: Tree representation of LISP code*

Because of the discrete data structure form, the compiler can easily create a one-to-one mapping of functions in source (CLJS) code to output in compiled (JS) code, and can also execute a selected part of the source in runtime.

Like in **Figure 1** above, the code `(+ 3 4)` is written in ClojureScript, compiled to JavaScript, and executed, and the results are returned to the editor.

The REPL is the hidden agent that facilitates this source to runtime bridge. It takes source code, executes instructions in runtime, and brings the results right back to the point of definition, ie. the editor:

![Scope of Clojure's REPL](https://s3.amazonaws.com/assets.fullstack.io/n/20201219082703461_repl-scope.png)
*Figure 3: Scope of the REPL*

1\. Your source code lives in your editor\
2\. The Shadow (compiler) converts this code to browser ready JavaScript\
3\. The REPL then sends execution instructions to the compiled code\
4\. This is then executed in the runtime (Node or Browser) and the result is returned to the editor

REPL driven development leads to lightning-fast feedback. You just write pure functions and execute them as you are typing them. No need to leave the editor, no need to hot reload, no need to interact with the UI.

In this talk at JSFOO Bangalore, I showcased REPL driven development (Start at \[4:39\] to get to the juice):

This talk explains how the REPL fits in with common frontend tasks, like building forms and handling state.

## What can you do with the REPL?

According to the official Clojure docs, [the REPL is a user interface to your program](https://clojure.org/guides/repl/guidelines_for_repl_aided_development). Think of it as a way to execute parts of your code with immediate feedback. This makes it a powerful development tool. You already saw how functions can be executed in the REPL in ***Figure 1.***

### Inspect third-party libraries

Since the REPL can execute any source code, you can use it to check the methods a third party library exposes.

![](https://s3.amazonaws.com/assets.fullstack.io/n/20201219170955642_lib-optimized.gif?medium)
*Figure 4: Inspecting methods exposed in the React package*

### Inspect state

A large part of UI development involves interacting with state. The REPL can be used to read the data structure storing your state.

![](https://s3.amazonaws.com/assets.fullstack.io/n/20201219171220458_state-optimized.gif?medium)
*Figure 5: Inspecting app state in real-time*

### Fill forms

Form states are generally saved using one-way binding(like in React) or two-way binding (like in Vue). Since the object that stores the state is defined somewhere in the code, you can use the REPL to fill forms by changing interactions with the object.

> I highly recommend checking the 📹 video from the JSFoo conference (above) to see the form filling in action. It seems like magic!

### Execute UI flows

If you are building a multi-step process like checkout or signup, filling the initial steps might become tedious as your flow grows. You can define the steps in your source code, and execute it in the REPL. The UI will respond respectively.

![Clojure REPL with React Native](https://s3.amazonaws.com/assets.fullstack.io/n/20201220073216472_My%20Movie-half.gif?medium)
*Figure 6: Simulating UI events on a React Native app*

In the GIF above, we have a Status App (A free, libre, open-source | GitHub.com/status-im/status-react) messenger running on an Android device, and a REPL connected to it. We can simulate events in the REPL, essentially letting us develop complex flows, without even touching the device. If you are a mobile developer, imagine the time saved if you never needed to take your hands off the keyboard to interact with the app. And the feedback is fire 🔥.

Flows like this can be saved as a comment alongside your source code and committed to git. This acts like documentation of what the developer was thinking while they developed this flow.

## Works on every Clojure runtime

Clojure is a hosted language that can compile to JavaScript, Java, and .NET. JavaScript can be used to build mobile apps with React Native and Desktop apps with Electron.

This means that you can run the REPL on every imaginable platform. Clojure is the closest we are to the "Learn once, run anywhere" philosophy.

## Fast feedback = more chances to achieve flow

Once you get used to developing in the REPL, reaching flow state becomes more achievable. The entire act of transpilation, seeing the UI, clicking buttons, checking console changes, and executing functions all happens in the REPL.\
This method brings you close to the runtime and lets you inspect the internals of your application with ease.

## How is this different from Shell?

The Shell (like the Python or Node shell) is a rudimentary version of the REPL. It's different in the sense that it cannot reload pieces of code like Clojure's REPL. This is partly because of how Clojure and LISP-like languages are written.

It is also different because no stable tooling exists to connect the Shell to the editor. I would go as far as saying that Clojure is the only stable language with a fully-featured REPL plugin for all major editors.

## Conclusion

I first learned about the REPL after 8 years of building full-stack applications. My mind was blown and I wondered why this wasn't the norm. Why didn't more people talk about it? Why was I not able to find it?

Clojure is not as well-known as JavaScript. On top of that, when you get started, all you see is ugly syntax, with brackets in the wrong place. The concepts that this article showcases might be a bit overwhelming at first.

I was lucky to get a job working with experienced Clojure developers at mission-critical systems. I bundled my experience into Tinycanva - A frontend ClojureScript course for React developers. In this course, we'll set up Clojure from scratch, learn about the eco-system and developer tools, and build a Canva clone with a Firebase backend.

If you like the idea of fast feedback and flow state, check out our course *[the newline Guide to Clojure for React Developers](https://www.newline.co/courses/tinycanva-clojure-for-react-developers)*.

