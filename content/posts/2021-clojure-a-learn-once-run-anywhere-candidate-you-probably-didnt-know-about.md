---
publishedOn: 2021-01-21T09:59:32.113Z
title: Clojure - A "Learn once, run anywhere" candidate you probably didn't know about
canonicalUrl: https://www.newline.co/@shivekkhurana/clojure-a-learn-once-run-anywhere-candidate-you-probably-didnt-know-about--9d1444c7
featured: false
heroImg: https://s3.amazonaws.com/assets.fullstack.io/n/20210105093343642_98%20EAMES%20CHAIR%20%282%29.jpg
slug: clj-learn-once-run-anywhere
tags:
  - clojure
  - clojurescript
  - learn-clojure
relatedSlugs:
  - repl-post
  - clojure-424-days
  - clojure-core-async-to-sustain-12k
author: shivekkhurana
---
# What is Clojure?

Clojure is a functional LISP dialect written by Rich Hickey. It is recommended by [Paul Graham](https://twitter.com/paulg/status/1240218967865778177?lang=en) and [Uncle Bob Martin ](https://blog.cleancoder.com/uncle-bob/2019/08/22/WhyClojure.html)as the go-to modern LISP. It is used by [hundreds of companies](https://clojure.org/community/companies), and often reaches the first page of Hacker News (for example, [here](https://news.ycombinator.com/item?id=22458827), [here](https://news.ycombinator.com/item?id=23418699), and [here](https://news.ycombinator.com/item?id=22458827)).

# What's so special about Clojure?

Clojure is a usable, yet purist, language. It is not as strict as Haskell or Ocaml, nor as forgiving as JavaScript or Python. It stays true to the functional aspect and stresses the importance of building simple systems.

It doesn't run on a VM itself but is hosted on the VMs of existing languages. There are three official ports of Clojure:

* Clojure - Runs on JVM

* ClojureScript - Runs on Node, Browser, IO, and other JS runtimes

* ClojureCLR - Runs on .NET runtime

In addition to the official ports, there are many community-led efforts to run Clojure on top of Go, Rust, Bash, C++, and Erlang. This hosted nature lets developers tap into existing ecosystems and extend existing codebases written in one of the host languages using Clojure.

Clojure also makes mixing host code and Clojure code trivial. You can easily cross the Clojure bridge and write code in the host language. Although Clojure comes with its own compilers and developer tools, it is essentially a meta-language hosted on mature VMs.

This property puts Clojure in a different realm compared to other LISPs. LISPs have never been "mainstream" and one of the reasons behind this is the lack of community. If nobody uses LISP, there will be no packages for LISP, which makes it hard to attract new developers.

Clojure bypasses the community problem by tapping into existing communities. I don't mean to say that the Clojure community is not strong - it's quite the opposite. The Clojure community is rich and welcoming, and the ability to tap into other eco-systems is just a bonus.

# Why Clojure?

### **Expressiveness**

LISPs are syntax-free. Compared to C-style languages, there are fewer constructs to remember, and the rich standard library makes data manipulation easy. Most code written in Clojure is almost always more expressive than its C-style counterparts.

Clojure is a homo-iconic language. This means that the code is written using data structures. This leads to a terse and concise expression.

![](https://s3.amazonaws.com/assets.fullstack.io/n/20210105093510245_1_A_rADLtjZ50rf4dIWqiRsQ.png)
*Image from [Jacek Schae](https://medium.com/@jacekschae)'s article on [Medium](https://medium.com/@jacekschae/learn-how-to-build-functional-front-ends-with-clojurescript-and-react-733fa260dd6b)*

### REPL

Clojure, like all LISPs, comes with a super-powerful REPL. The REPL is a bridge between source code and runtime. It provides multiple features like code-completion and inline eval. The REPL leads to lightning-fast feedback which ultimately leads to greater productivity. This aspect of Clojure is so unique that I wrote an entire post about it.

Read More: [Reaching flow state with Clojure's REPL](https://www.newline.co/@shivekkhurana/reaching-flow-state-with-clojures-repl--14018b04)

### Transparent inter-operation

Clojure runs on top of other languages and [lets you talk to the host directly](https://clojure.org/reference/java_interop). You can install and use host packages using popular package managers like Maven and NPM.

You can also bypass Clojure and write code close to the metal using the host language's features, such as Promises in JavaScript or Classes in Java. Clojure makes sure to not hide the host. It doesn't pretend that the host doesn't exist - it's actually common to write Clojure code at the host level for performance gains.

### Concurrency

Clojure implements the [CSP model](https://en.wikipedia.org/wiki/Communicating_sequential_processes) of concurrency management which is similar to that of Go and Erlang. Clojure's creator Rich [gave a talk](https://www.youtube.com/watch?v=drmNlZVkUeE) about how this implementation came to be. It's a must-watch if you'd like to understand the benefits of CSP over Promises (ie. the actor model).

Instead of callbacks, where process-A calls process-B on completion, the CSP model introduces queues. In this way, process-A becomes independent of process-B and just puts its results in a queue. Then process-B can dequeue and proceed without interacting with process-A.

### First-class Immutability and Laziness

All Clojure data-structures are immutable and lazy. This might be hard to understand at first, especially if you have a background in JS. But once you get used to the idea, your code will become local and you will be forced to push side-effects to the edges of the system.

This might not make sense until you experience it for yourself.

### Stable eco-system and strong community

Since the language has next to no syntax, the backward-compatibility is gold. It's fairly common to see heavily relied on libraries that are not updated for years. Okay, years might be an exaggeration, but definitely months. This doesn't mean that the project is abandoned. In most cases, it means that the project has reached equilibrium and can be relied on safely.

Technologies like [Datomic](https://www.datomic.com) and [Integrant](https://github.com/weavejester/integrant) are so advanced, it's as if they are from the future. The Slack and Reddit groups are active and helpful.

# Why is Clojure niche?

Every coin has two sides, you just need to pick the side that serves your purpose. Clojure also has some "down" sides.

### Dynamic nature and lack of types

This is perhaps the most debated aspect of Clojure, to the extent that there is a famous open-source initiative called [Typedclojure](https://typedclojure.org), that brings static analysis to Clojure.

The community and the language authors acknowledge the value of types, but also believe that Haskell-like typing is not the best way. A famous library called [core.spec](https://github.com/clojure/core.specs.alpha) has been in development for many years now. It implements typing in a different way and can be used optionally. You can [check out this talk](https://www.youtube.com/watch?v=oyLBGkS5ICk) by Rich to gain more insights into why spec is a better option.

However, this might be a deal-breaker, especially when companies like Microsoft are pouring $$$$ into marketing Typescript as the language we need.

### Dev tooling and Setup

Clojure development aims to provide fast feedback, but this means tighter integration with the editor. Historically, Emacs has been the choice for most LISPers, but this is changing with packages like [Calva for VS Code](https://marketplace.visualstudio.com/items?itemName=betterthantomorrow.calva), [Cursive for IntelliJ](https://cursive-ide.com), and [Conjure for Vim](https://github.com/Olical/conjure).

Despite the packages available, knowledge regarding how to use the tools efficiently is not widespread.

### LISP Syntax

When you see LISP code for the first time, chances are that your brain rejects it. You might wonder why parentheses are in the wrong place and why is everything so cluttered.

This problem goes away over time, to the extent that you start seeing code as a tree data structure. It's commonly heard among LISP programmers that brackets become invisible.

But until then, you need to live with them and the worse part is you need to include them while writing code, ensuring that you didn't miss a closing bracket.

While it seems like a big deal, handling brackets and parentheses in practice is a non-issue. Packages like Paredit and Rainbow Params make it really easy to manage LISP code. The downside is that you need to devote time to learn how these packages work.

### Mental Model

Clojure is a functional language, and in this sense, all functional languages are hard to pick up. Trivial tasks like defining a variable might seem hard, especially if you come from a C-style language.

This is not a downside if you are already familiar with functional techniques.

### Fewer job opportunities

Compared to JS and Python, far fewer companies use Clojure. This is a fact, however, things are changing and job opportunities with Clojure are increasing. However, they still fall short of opportunities with other languages.

Many Clojurists tend to introduce Clojure to their companies, or sometimes work with other languages full-time. Writing a functional language changes how you approach problems and the concepts can be transported to other languages too.

### Simple vs Easy

If you have even the slightest interest in learning Clojure, you should hear the following reasoning from Rich Hickey directly:

but if you want my half-baked, less accurate description, then read the next paragraph.

Simple and easy are used interchangeably, but signify two very different concepts. Simple means not layered, or braided like a knot, the opposite of complex. Whereas easy signifies nearness, something in reach, the opposite of hard.

`npm install complexity` is easy. You can just issue a command and solve a complex use case. But this is not simple. You don't necessarily know the dark magic your libraries do in the background. Relying on easy solutions can lead to complexity in the future. Relying on simple solutions addresses the complexity that will arrive in the future.

Clojure tries to make simple easy. But this is not as competitive as easy. You need to put in more work upfront to reap the benefits later. This is in sharp contrast with other popular models, where you can get everything working almost immediately, without considering the complexity introduced. The problem with this approach is that when things get out of hand, the whole system has to be re-written using Typescript. Again.

# Is Clojure for you?

Clojure will help you grow as a developer. Your style of writing JS, Python, etc will change. It will help you reason for and question your choices. And will probably lead to better decision making.

You'll love and hate Rich Hickey, the Clojure BDFL (Benevolent Dictator for Life). But his talks will change you and help you grow.

That being said, if you are looking for an answer to "Is Clojure for me" in an article on the internet, then Clojure probably isn't for you. If you are happy and comfortable writing in your current language there is no point switching, but if you do feel limited and restricted, you might want to give it a go.

# Conclusion

I started working with Clojure in 2016, after almost 8 years of Python and JavaScript (PHP, Ruby, Java, etc). I was lucky to find a job at a company that worked exclusively with Clojure and learned from the best.

There were many obstacles in the way, many tools that I had to learn, and many concepts that had to be re-learned. I have compiled my learnings from this journey into a course on Clojure for React developers.

This course is the distilled version of my experience where we will walk through building a complete frontend application (Clojure semantics, tooling, UI, Auth, Routing, State Management, and API integration) from scratch.

If you liked this article, you can check out our course *[the newline Guide to Clojure for React Developers.](https://www.newline.co/courses/tinycanva-clojure-for-react-developers)* 