---
heroImg: https://miro.medium.com/max/4928/1*ZigE5BeEaXIfx2_FnP4UWg.png
slug: clojure-drug-dealer-part-1
publishedOn: 2019-08-27
title: Learn Clojure by Building a Drug Dealer API - Part 1
canonicalUrl: https://medium.com/@shivekkhurana/learn-clojure-by-building-a-drug-dealer-api-part-1-83bd4adb9946
featured: false
tags:
  - clojure-api
  - drug-dealer-api
  - learn-clojure
relatedSlugs:
  - clojure-424-days
  - clojure-drug-dealer-part-2
  - clojure-drug-dealer-part-3
author: shivekkhurana
---
*Base Photo by [Jose Antonio Gallego Vázquez](https://unsplash.com/@joseantoniogall?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)*

Over the last 2 years, Clojure has become my primary language. It compiles to Java & JavaScript and has a [few other advantages that I learnt over time](https://krimlabs.com/clojure-424-days/).One  of the disadvantage was the steep upfront learning curve. If you are  just getting started with Clojure, this (and a series of future posts)  might help you.For today, we’ll be building a Drug Dealer API. Imagine a drug store near you (don’t let the word dealer delude you):

* it has an inventory
* each drug has a price and a stock
* drugs are sold on a retail window and
* are procured via offline sources

This article assumes that you are comfortable developing APIs in some other language.Jargon  terms are used without explanation. If you have ever developed and API  with Node, Spring, Java, Python, RoR or literally any other  framework/language, you are good to go.

![GitHUb logo](https://miro.medium.com/max/128/1*kT1mZwyxUce_RQ4vfu3sCw.png?original)
*Source at https://github.com/krimlabs/workshops (branch [snapshot/dealer-api-part-2](https://github.com/krimlabs/workshops/tree/snapshot/dealer-api-part-1)).*

For  this exercise, our back-end consists of a database, configuration, a  router and controllers. Clojure community doesn’t promote the idea of  ORMs (for good).

![Example API Diagram](https://miro.medium.com/max/1154/1*MvUpZZztcp4kYWtr70IHew.jpeg?large "A standard API")

There are a few batteries included frameworks like [Luminous](http://www.luminusweb.net/), [Fulcro](https://fulcro.fulcrologic.com/docs.html), [Archane](http://docs.arachne-framework.org/), [Duct](https://github.com/duct-framework/duct) and [Edge](https://github.com/juxt/edge).  You should definitely check all of them out and pick the one you like,  but for the purpose of this tutorial, we’ll use Pedestal for handling  HTTP and HugSQL to interact with an SQLite Database. This stack is simple to get started with and enough to grow into a production ready system.

## Install java and Clojure

Clojure’s official website has a nice guide, <https://clojure.org/guides/getting_started>

## Setup project structure

Clojure  has 3 build systems: Leiningen, Boot and deps.edn. Deps is the built in  implementation, Lein and Boot are third-party libraries.You can think of them as node’s package.json. They help you specify dependencies and tasks. 

### Create a folder to hold the API

```bash
cd ~/where/ever/you/keep/your/stuff
mkdir dealer_api
```

### Create deps.edn, resources and src folders

* `deps.edn` will help with dependency management
* `resources` folder holds static resources (images, sql files, config)
* `src` folder, well you know what’s that for

```bash
cd dealer_api
touch deps.edn
mkdir -p src/dealer_api
mkdir resources
```

You might wonder why I created a `src/dealer_api` folder. It’s just a convention in Clojure `namespaces`.

### Add dependencies to deps.edn

An  edn file is like a json file, except it has support for more data types  than strings, and you type in Clojure maps and not JavaScript objects.  Here’s what our deps.edn file should look like.

```clojure
{:paths ["src"]
 :deps
 {io.pedestal/pedestal.service {:mvn/version "0.5.7"}
  io.pedestal/pedestal.jetty {:mvn/version "0.5.7"}
  com.layerware/hugsql {:mvn/version "0.4.9"}
  org.clojure/tools.namespace {:mvn/version "0.2.11"}
  org.clojure/tools.logging {:mvn/version "0.3.1"}
  ch.qos.logback/logback-classic {:mvn/version "1.1.3"}}
 :mvn/repos
 {"central" {:url "[https://repo1.maven.org/maven2/](https://repo1.maven.org/maven2/)"}
  "clojars" {:url "[https://clojars.org/repo](https://clojars.org/repo)"}}}
```

* The `:paths` config is telling Clojure where to look for source code. The colon indicates it’s a keyword.
* Unlike JSON, Clojure maps don’t need a comma or semi-colon
* `:deps` key tells which dependencies to fetch
* We  are adding Maven versions to each dependancy, i.e. fetching Java libs.  Truth be told, Clojure is just Java (and ClojureScript is just  JavaScript).
* `:mvn/repos`  configures where we should be looking for the required deps. You can  add private repos here. You can also pull deps directly from github.
* More info on `deps.edn` at <https://clojure.org/reference/deps_and_cli>
* pedestal.service  and pedestal.jetty are used for routing and as a server. Hugsql helps  convert sql files to Clojure functions. Other 3 dependencies help with  logging and reloading code.

### Check your progress by downloading dependencies

In the root folder, issue the `clj` command. This will download all the required dependencies and start a prompt called REPL.If  you have ever played GTA Vice City, then think of REPL as a cheat code,  that most other languages do not have. Your terminal should look  something as follows:

```bash
$ clj
Downloading: io/pedestal/pedestal.jetty/0.5.7/pedestal.jetty-0.5.7.pom from https://clojars.org/repo/
...
...
Downloading: org/eclipse/jetty/jetty-alpn-server/9.4.18.v20190429/jetty-alpn-server-9.4.18.v20190429.jar from https://repo1.maven.org/maven2/
Clojure 1.9.0
user=>
```

## Setup your editor

> LISPs are notoriously hard to write.
>
> — Every Noob Ever

Clojure (and other LISPS) have a different syntax from most mainstream languages. `sum(1, 2)` becomes `(sum 1 2)`  . The bracket is moved outside the function, leading your code to be  just a collection of vectors (aka a tree). Now this is hard to write,  because as your programs grow, bracket matching can become a pain.

That’s where [Paredit](https://www.emacswiki.org/emacs/ParEdit) and [Parinfer](http://shaunlebron.github.io/parinfer/) come into picture. The purpose of these tools is to match your brackets for you. Automagically.Parinfer  is like an Apple’s iPhone. Everything will work seamlessly out of the  box. Paredit is like a flagship Android phone. 

You’ll have to spend some  time getting used to it.I’d recommend using Parinfer when you are getting started, or Paredit if you are brave. I started with Paredit, not because I’m brave, but because:

* I didn’t know Parinfer existed
* I was comfortable with Paredit, when I discovered Parinfer, and couldn’t go back

Parinfer  is available for atom, vscode and probably all the other text editors  that cool kids use. You can also use Cursive Mode for IntelliJ. I don’t  know much about that, so will not refer to Cursive specific steps going  further.

## Create your first route

In the `src/dealer_api` directory, create a file called `core.clj`.

```clojure
;; src/dealer_api/core.clj(**ns** dealer-api.core
(:require [io.pedestal.http :as http]))(**defn** respond-hello [request]
{:status 200
 :body "Hello World"})(**def** routes
  #{["/hello" :get \`respond-hello]})(**defn** server []
  (-> {::http/routes routes
       ::http/port 8890
       ::http/type :jetty}
      http/create-server
      http/start))
```

* `ns` stands for namespace
* `defn` is a function that can be used to define a new function, the last form in the `defn` vector is the return value of the function (in this case a map).
* `respond-hello` is a function that takes a request and returns a 200 OK
* `def` is a function to define immutable variables
* `->` is the thread first macro. It helps with readability of deeply nested functions. The above function `server` can also be written without thread first macro as:

```clojure
(defn server [] 
  (http/start (http/create-server {::http/routes routes
                                   ::http/port 8890
                                   ::http/type :jetty})))
```

* Words with a colon prefix (ex `:jetty`)are called keywords, they are like Ruby’s keywords
* Words with double colon prefix are (ex: `::http/routes`) are namespaced keywords, i.e. are automatically appended with the namespace. In this case `::http/routes` is same as `:dealer-api.core.http/routes`.

## Run the REPL (and your app)

We have enough code for our server to start working. Go to the project’s root and start the repl using `clj` command:

```bash
$ clj
```

If everything works, you should be in a prompt called a REPL. Here you can import your namespace and start the server :

```clojure
user=> (require '[dealer-api.core :as core])
nil
user=> (core/server)
```

If your code is correct, `core/server` function will freeze the REPL. At this point, you can go to <http://localhost:8890/hello> and your should see what you expect to see.

## Fix your DX

If  you make a change to your API, you would not notice any change in the  browser. Also, the REPL doesn’t give any indication that the server is  running successfully. Let’s fix that.

### Create an atom to hold your running server instance

Clojure data structures are immutable. They never change. Except using a special structure called `atom`. Our strategy to not freeze the REPL is to save the running instance of the server in an `atom` and return from the start function.We will get rid of the server function and require the refresh function:

```clojure
(ns dealer-api.core
  (:require [io.pedestal.http :as http]
            [clojure.tools.namespace.repl :refer [refresh]]))
```

We’ll also create a `reset` function that can be called to reload changes:

```clojure
(def service-map
  {::http/routes routes
   ::http/type   :jetty
   ::http/port   8890});; For interactive development
(defonce server (atom nil))(defn go []
  (reset! server
          (http/start (http/create-server
                       (assoc service-map
                              ::http/join? false))))
  (prn "Server started on localhost:8890")
  (prn "Enter (reset) to reload.")
  :started)(defn halt []
  (http/stop [@server](http://twitter.com/server)))(defn reset []
  (halt)
  (refresh :after 'dealer-api.core/go))
```

## Test new DX

Now close the repl using Ctrl+C. This is probably the last time you’ll shut it down. Now start it again using `$ clj`.Next import the required functions: `go` and `reset`

```clojure
$ clj
Clojure 1.9.0
user=> (require '[dealer-api.core :refer [go reset]])
nil
user=> (go)
;; You'll see a ton of logs followed by"Server started on localhost:8890"
"Enter (reset) to reload."
:started
```

Now go back to localhost:8890/hello and you should see your message. Change your message and reset the code as follows:

```clojure
user=> (go)
;; You'll see a ton of logs followed by"Server started on localhost:8890"
"Enter (reset) to reload."
:started
user=> (reset)
```

Again, go back to the browser, refresh and you’ll see the new changes.This  DX is workable going forward. A REPL is always working in the  background. You make changes and reset. 

What we did here is not ideal.  Most production projects tend to have a dedicated namespace for handling  resets, but then again, this is not a prod project. This is only a  get-your-feet-wet project.

## Hmm, why did I have to do so much to get reset ?

### Also it doesn’t have live reload like node does.

You have a valid point. Watch [Simple Made Easy](https://www.infoq.com/presentations/Simple-Made-Easy/) by Rich Hickey and probably you’ll be able to satiate your curiosity.

## Part 1, Conclusion

* We setup our editor to write LISP using Paredit or Parinfer
* We wrote and EDN file, the json equivalent in the Clojure world
* We setup a simple project using deps.edn
* We setup a simple API using Pedestal
* Saw how we can reload code using a REPL using clj command line
