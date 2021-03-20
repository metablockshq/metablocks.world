---
publishedOn: null
title: A time machine inside your database
subTitle: null
canonicalUrl: null
featured: false
heroImg: null
slug: null
tags:
  - growth
  - life-lessons
author: shivekkhurana
---
Immutable constructs provided by Clojure (or any other language) are just runtime guarantees.
But most applications sit on top of some form of database, like Postgres, which is nothing but an extremely efficient, mutable store.

This talk is about why databases evolved to be so, and what an immutable database would look like.
What would its benefits and drawbacks be, and why you should care.

We’ll dissect immutability, technically and historically and build the case for an immutable data store.
We’ll then look at real world cases where immutable datastores saved the day.

The talk will roughly be structured as follows:

- Why should you care about immutability
- What is runtime immutability
- Data storage engined and Place Oriented Paradigm (PLOP)
- Imagining an immutable database
- Time travelling
- Event Sourcing Paradigm
- Triplet Stores
- Datalog with Datomic & Crux
- Real world example
- Domains immutable databases are particularly suited to
- Implementing immutable databases in your app today
- Conclusion and takeways


This talk is aimed at mid-to-senior level developers with some experience with:

- Functional Programming
- Reactive Streams
- Event Sourcing
- Data Processing Pipelines
- Database Modelling and Management

Although no specific language is required, but ability to read and write Clojure or another LISP won’t hurt. 
