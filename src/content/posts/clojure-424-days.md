---
title: What I learned after writing Clojure for 424 days, straight
subTitle: Ok, not every day, but most working days
slug: clojure-424-days
canonicalUrl: https://medium.com/@shivekkhurana/what-i-learned-after-writing-clojure-for-424-days-straight-8884ec471f8e
publishedOn: 2019-05-07
heroImg: https://miro.medium.com/max/6000/1*XEPPU9coPaUidehQiAl63A.jpeg
tags: clojure, clojurescript, clojure 424
featured: true
relatedSlugs: clojure-drug-dealer-part-1, clojure-drug-dealer-part-2, clojure-drug-dealer-part-3
---
*Cover Photo by [CoWomen](https://unsplash.com/photos/7Zy2KV76Mts?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)*

I’ve been working on Clojure projects at Juxt for more than a year now, but have never written about my experiences because:

- Before writing an article, I research the problems the community face on Reddit, HackerNews, GitHub issues, and Google trends.

![Clojure vs Python vs JavaScript Google Trend](https://miro.medium.com/max/1193/1*Uz6FgvBO5-iaDFxIRCs3yw.png)
*Past 12 months Google Trends for Python (Red) vs Clojure (Blue) vs JavaScript (Yellow)*

- Clojure/Script never seemed to be problematic or in demand
- Not many people use Clojure/Script as their first language
- Those who do, do not need any guidance
- As a blogger, there was no incentive for me to write about it

Clojure has fundamentally changed my thought process. It affected how I write JS and how I code in general. So even though there are no evident marketing/ branding benefits in writing about Clojure, I’m still gonna do it.

# What is Clojure & ClojureScript?
Clojure a dialect of LISP that was originally meant to compile to JVM. It was further extended to ClojureScript, a version of Clojure that compiles to JavaScript.


Both Clojure and ClojureScript are production ready and supported by Cognitect. There are a host of community implementations too: [Clojerl](https://github.com/clojerl/clojerl), [Cljperl](https://metacpan.org/pod/CljPerl), [Las3r](https://github.com/aemoncannon/las3r), and [others](https://en.m.wikipedia.org/wiki/Clojure).

# Let’s start with why Clojure sucks

When considering a new addition to the stack, it’s important to consider long term consequences. Clojure is a great language but it comes with its issues. Most of them have a way around.

## It’s hard to find engineers

Not many people code Clojure and this comes up as a regular concern when I talk to someone about it.


This also seems to be the norm for other companies that rely on Clojure. Compared to Node.js or Python, the demand and supply for Clojure resources are minuscule. It’s hard to find Clojure jobs for the same reason.

## It’s closely controlled by Rich Hickey & Cognitect

It’s hard to label this as a pro or con. Rich Hickey is a fantastic thinker and Clojure is an extremely mature language. However, there have been some conflicts in the community, where Cognitect refused to address concerns at the core level. That being said, the norm is to extend the language using libraries. I personally like it that way. Let Rich control Clojure. He’s good at it.

## (It’s (flooded with (parenthesis)))

This XKCD is only accurate if you don’t have an insider perspective.
![XKCD Comic 297](https://miro.medium.com/max/640/1*3AOKcFB_vJM5oTrS7VO1cw.png)
*https://xkcd.com/297/*

It’s true that parenthesis can be a problem sometimes, especially when you are getting started. I used to think that I’d have to type and match all these brackets manually. But that’s not the case. There are tools that help you with structural editing and after a few months, the brackets become invisible.

## It’s has a slow startup time

Clojure runs on the JVM and has a significantly slower startup time compared to Node. Again, this is only a problem from an outsider’s perspective. We have REPL. You start the app only once, and it keeps running in the background. You can interactively include new changes, without having to startup every time.

## It’s has a steep learning curve

Even more so if you are an experienced developer and have never worked with a LISP. The tooling is kinda complex. A majority of Clojure (46%) devs use Emacs which is hard to learn if you started your career with Sublime Text or Atom.

![Clojure Env Survey Stats](https://miro.medium.com/max/658/1*1YWxkJqewP6HD5H9vcBSrA.png)
*The preferred environment for Clojure Dev — State of Clojure 2019 [https://www.surveymonkey.com/results/SM-S9JVNXNQV/]*

There is an old joke that still goes around, “Emacs is a great OS lacking a good text editor”. In my experiences, Emacs is a beast worth taming. Here’s what mine looks like (no tabs and no snappy “Goto anything” feature) still gets everything done.

![My Emacs Setup](https://miro.medium.com/max/1440/1*Ui5BylhZUdOyWdywwxh7Qg.png)
*My Emacs setup — Config at https://github.com/shivekkhurana/emacs.d*

If Emacs is too much for your appetite, there is a Cursive plugin for IntelliJ. You can also use VSCode.

# Why did I start learning Clojure?

My mentor suggested learning any LISP. And Paul Graham, the founder of YCombinator is a LISP Hacker. Did you know that HackerNews is written in a [LISP](http://www.paulgraham.com/lisp.html) dialect called [Arc](http://www.paulgraham.com/arc.html).

The [first version of Reddit](https://github.com/reddit-archive/reddit1.0) was also written in Common LISP.

I was curious as my day job included writing JS and Python and I often found myself stuck at language level features. I’ve always been on a lookout for a better tool. For the past 2 years, I have settled on Clojure and React and I don’t think I’d go any further.


## Why I’d continue working with Clojure (probably forever)

In impressive jargon terms, it’s a functional lisp with built-in support for persistent data structures, async channels, and reactivity. It also has a superb standard library. Everything is built around a lean core.

ClojureScript, the version that targets js uses the google closure library (which is known to be faster than WebPack and sometimes even comparable to vanilla js).

If you come from the JavaScript realm, imagine js but with RxJs, Immutable and Lodash built into the language.

If you are a skeptic, like I was, you have to try it out. Clojure improved me as a developer. It affected the way I write JavaScript and the way I tackle problems in general.

## LISP

Languages like Python focus on readability by making the code look like the English language. LISPs, on the other hand, ignore the English language semantics completely and enforce a structural syntax.

![](https://miro.medium.com/max/1024/1*0yVwRjQBHVholAltngmyDw.png)
*Abstract syntax tree for a mathematical expression from [Ruslan’s Blog](https://ruslanspivak.com/lsbasi-part7/)*

For example, the expression 2*7+3 can be represented in the image.

All LISP code is a list of primitives. Primitive being an element in the set of vector, map, string, number or symbol. The acronym LISP stands for List Processing. Your code is basically a tree with LISP.

The structural code allows for compiler optimizations that are not possible (or extremely hard) with English inspired code.

## Immutability

Immutability means that your variables will never be overwritten. When a change is required, the old variable stays as it is and a fresh copy is generated.

> Rub some immutability on it. You’ll be fine.

> — [Fake Rich Hickey](https://twitter.com/fakerichhickey/status/392960823204663296)

This seemingly simple functionality helps to build complex pipelines. One of the toughest problems in programming (apart from naming and cache management) is handling side effects. Immutable data structures make handling side-effects less error-prone because the thing you are observing will never change. Ever.

## Compiles to JVM and JS (and Graal)
![Compiling](https://miro.medium.com/max/413/1*J-1MC3QGbIuwq4tb-yr-iA.png)
*https://xkcd.com/303/*

You can easily write a Java-based backend and JS based frontend using Clojure. The interop is very straight forward.

Learn once, write anywhere, with a thin abstraction layer. Target all runtimes with one language.

## REPL Driven Development

I didn’t quite realize the power of this feature until it became a part of my daily routine. And you’d probably have to experience it yourself to appreciate the ingenuity and genius of the REPL (or the Read Eval Print Loop).

The REPL basically lets you load parts of your code in an interactive runtime and play with it as if you were using it in your app.

![](https://miro.medium.com/max/1600/1*sAbU5fb4bcj_YKIwX1LAFA.jpeg)
*REPL Illustration from [This is why your read-eval-print-loop is so amazing](https://medium.freecodecamp.org/this-is-why-your-read-eval-print-loop-is-so-amazing-cf0362003983) by IObert*

For example, consider a database function that is tied to a controller that is called through a REST API. Now, your task is to optimize the query. In the real world, you’d make the changes to the DB function, let the code reload automatically (or manually), and then check the results of the REST API.

With a REPL, you can skip all the boring parts and bring the DB function and its dependencies to the REPL and edit it in real time. If you are interested in REPL driven dev, I’d highly recommend that you watch this talk by Stuart Halloway.
## Relatively more succinct and productive

This is a very subjective claim, so take it with a grain of salt, but I find Clojure syntax to be more terse and expressive than all other languages I’ve ever used. This leads to smaller code basis and more productive teams.

## Not typed, but spec’d

There is no native way to enforce types in Clojure, but we have a different way to enforce contracts, called specs. It’s so much more than a Java-like type system and it’s completely optional.

## Clojurists don’t fix something that isn’t broken

It’s perfectly OK to use libraries that are not updated for the past 2 years in production. The community takes stands on its workflows and stick to it for years, unlike “cough cough Javascript, cough cough”.

## Macros

Clojure lets you extend the syntax with first class support for macros. Consider the following example:

```
(if something-is-true
  (do
    (something-else))
```

This can be converted into a `when` macro as follows:

```
;; actual when source(defmacro when
  "Evaluates test. If logical true, evaluates body in an implicit   do."
  {:added "1.0"}
  [test & body]
  (list 'if test (cons 'do body)))
```

and can now be used as:

```
(when something-is-true 
  (something-else))
```

## Rich Hickey

Not sure if it makes sense to mention Rich Hickey as a Clojure feature, but once you get hooked to his talks and presentations, you change.

## In conclusion; TL; DR;

Clojure is a practical LISP. It’s lean and well-designed core helps you write maintainable code. First-class support for Java/JavaScript interop helps leverage existing ecosystems. The problems that you hear around the ecosystem can be tackled easily.

If you’d like to learn more about Clojure, I’d highly recommend the following resources:

- [Rich Hickey’s Talks and Interviews](https://github.com/tallesl/Rich-Hickey-fanclub)
- [JUXT’s Blog](https://juxt.pro/blog/index.html) (PS: JUXT recently released a bitemporal database called [Crux](https://juxt.pro/crux/index.html))
- [Brave Clojure](https://www.braveclojure.com/)
- [Stuart Sierra’s Blog](https://stuartsierra.com/)