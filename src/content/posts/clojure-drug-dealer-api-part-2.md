---
title: Learn Clojure by Building a Drug Dealer API - Part 2
subTitle: git commit -am “Add database using HugSQL and Postgres”
tags: clojure api, drug dealer api, learn clojure 
canonicalUrl: https://medium.com/@shivekkhurana/learn-clojure-by-building-a-drug-dealer-api-part-2-de8c47512a71
publishedOn: 2019-09-03
heroImg: https://miro.medium.com/max/2957/1*4vZebt3dYv_HSlHwNGC-1A.png
featured: false
slug: clojure-drug-dealer-part-2
---

*Base Photo by [Jose Antonio Gallego Vázquez](https://unsplash.com/@joseantoniogall?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)*

[You have built a simple app](https://krimlabs.com/clojure-drug-dealer-part-1). Now you want it to be a little more useful. You want to ultimately push it to prod right?In this part, we’d connect to a database and handle CRUD.

## What’s up with the Drug Dealer title?

Drug  Dealer is a better click bait than a medical store. In the language of  the civilized, we are building a medical store system.

---

In the [last part](https://krimlabs.com/clojure-drug-dealer-part-1)  we created a simple app structure to handle a drug store. A drug store  had an inventory, each drug had a price, procurement was via offline  sources and there was a retail window.

I  carefully crafted a situation that had only one domain entity: The  drug. Each drug has a price and availability. Procurement is offline, so  we don’t care. Sale would just reduce the inventory size.

![](https://miro.medium.com/max/1154/1*p8w7hkn6ls81fKCr7H8WFA.jpeg)
*The database we are trying to model*

We will have 5 routes on the drug model.

- GET /drugs — Return a list of all drugs
- GET /drugs/:id — Get details of a drug by id
- POST /drugs — Create a new drug
- PUT /drugs/:id — Update a drug by id
- DELETE /drugs/:id — Delete a drug by id

![](https://miro.medium.com/max/128/1*kT1mZwyxUce_RQ4vfu3sCw.png)
*Source code available at [https://github.com/krimlabs/workshops](https://github.com/krimlabs/workshops) (branch [snapshot/dealer-api-part-2](https://github.com/krimlabs/workshops/tree/snapshot/dealer-api-part-2))*


We first need to create a new namespace to handle interactions with the database. We are going to use [HugSQL](https://www.hugsql.org/) to handle db interactions. There is no db migration setup in this tutorial, but you can easily use a library like [Flyway](https://flywaydb.org/) or [Ragtime](https://github.com/weavejester/ragtime).

## Add HugSQL to dependencies

In your `deps.edn` file add the following:

```
com.layerware/hugsql {:mvn/version "0.4.9"}
org.postgresql/postgresql {:mvn/version "42.1.4"}
```

## Create files to hold SQL queries and functions

HugSQL  works by converting SQL definitions to Clojure functions. It requires  us to define a source file and a Clojure namespace where the functions  will be added.

```
$ mkdir -p src/dealer_api/sql
$ touch src/dealer_api/sql/drugs.sql
$ touch src/dealer_api/sql/drugs.clj
```

## Create a file to hold the Drug routes

We’ll also create a new namespace to hold this model. Let’s call it `dealer-api.drugs`. For this, we need to create a new file `src/dealer_api/drugs.clj`.

```
$ touch src/dealer_api/drugs.clj
```

![](https://miro.medium.com/max/229/1*s1-JdZSaisRvh7q6nnYOOw.png)
*Your directory structure after all files have been created*

## Create initial table structure

Since  we are not using a migration system, you can run the following commands  directly in PSQL. This tutorial assumes that the name of your database  is `dealer_dev`.

```
CREATE TABLE drugs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  availability INT NOT NULL DEFAULT 0,
  price FLOAT
);
```

## Add seed data

Here’s a list of [10 most prescribed drugs from 2017](https://www.beckershospitalreview.com/supply-chain/10-most-popular-prescription-drugs-for-2017.html):
```
INSERT INTO drugs (name, availability, price)
VALUES
  ('Vicodin, Norco, Xodol (hydrocodone, acetaminophen)', 100, 14),
  ('Synthroid, Levoxyl, Unithroid (levothyroxine)', 200, 11),
  ('Delasone, Sterapred (prednisone)', 150, 5),
  ('Amoxil (amoxicillin)', 200, 9),
  ('Neurontin (gabapentin)', 50, 13),
  ('Prinivil, Zestril (lisinopril)', 60, 7),
  ('Lipitor (atorvastatin)', 78, 12),
  ('Glucophage (metformin)', 180, 8),
  ('Zofran (ondansetron)', 40, 17),
  ('Motrin (ibuprofen)', 70, 12);
```

## Create config to handle database connection

Setup `src/dealer_api/config.clj` with a db definition. This will be used when we query the database using HugSQL.

```
$ touch src/dealer_api/config.clj
```

In this config, define the database you want to connect to:
```
(ns dealer-api.config)

(def db
  {:classname "org.postgresql.Driver"
   :subprotocol "postgresql"
   :subname "//localhost:5432/dealer_dev"
   :user "shivekkhurana"
   :password ""})
```

*Note: In the last post, we decided to use SQLite, but are using Postgres here.*

There are multiple ways of handling config in the Clojure universe. It’s a general practice to use `.edn` files and not a `.clj`  file to handle config, but for the sake of simplicity, I’ve skipped it.  

If you are a building a real application, you should look at solutions  like [Aero,](https://github.com/juxt/aero) [Nomad](https://github.com/jarohen/nomad) or [Config](https://github.com/yogthos/config).

## Fix logging noise

By  default, the logging package makes a lot of noise. We can shut it down  by using a logback config. I don’t understand much about how logback  works and I usually end up copying the default. It’s configured with  sensible defaults.

![](https://miro.medium.com/max/4927/1*Mftko2jY23wvC_-njYsMLg.png)

Create a logback.xml file in `/resources/logback.xml` with the [following content](https://github.com/pedestal/pedestal/blob/master/service/dev/logback.xml):

This  tells the logger to not care about debug log and logs from outside our  namespace. Next, we need to tell our project to use this file.By default, SLF4J will look for a `logback.xml` file on the classpath.

We can make it available by adding `resources` to classpath. Update the `:src` key in your `deps.edn` to include resources on the classpath:

```

{:paths ["src" "resources"]
...
}
```

Our logging issues should be gone now!

# Building the GET /drugs route

The request cycle of Pedestal is similar to that of Node’s Express. A  handler is bound to every route, it receives a request and returns a  response.It’s the job of the handler to do anything it wants (like authenticate, connect to a database, etc).In our case, the handler will connect to the database via HugSQL.

## Write the sql query to fetch all drugs

In `src/dealer_api/sql/drugs.sql` add the following query:

```
-- :name drugs :? :*
-- :doc Get all drugs
SELECT * FROM drugs;
```
- `:name` keyword specifies the name of the function
- `:doc` is optional documentation
- `:? :* `signify that this query will return a list of results
- Everything is followed by the actual query

## Convert raw sql to Clojure functions using HugSQL macros

Setup `src/dealer_api/sql/drugs.clj` as follows:

```
(ns dealer-api.sql.drugs
  (:require [hugsql.core :as hugsql]))

  (hugsql/def-db-fns "dealer_api/sql/drugs.sql")
```
`hugsql/def-db-fns` is a macro that converts the SQL definitions to Clojure functions. You can read more about Clojure Macros [here](https://clojure.org/reference/macros) and [here](https://www.braveclojure.com/writing-macros/).

## Create a handler to get all drugs

Setup `src/dealer_api/drugs.clj` as to handle get-all route:
```
(ns dealer-api.drugs
  (:require [dealer-api.sql.drugs :as sql]
            [dealer-api.config :refer [db]]
            [io.pedestal.http :as http]))

(defn all-drugs [_]
  (http/json-response (sql/drugs db)))
```
- Here we created a handler `all-drugs` and used SQL definitions defined using a macro. Observe how we are able to use the `sql/all-drugs` function, although it was defined in a text file. The macro parsed that file and made the actual definitions in the `sql.drugs` namespace.
- `http/json-response` converts an map to a valid response with all the required keys.
- The `_` underscore argument to all-drugs function means that one argument will be passed to this function, but we don’t care about it.

## Assign handler to GET /drugs route

You handler and db interactions are all ready. We just need to bind it to a route. In `dealer-api.core` namespace, add the following require, and binding:
```
(ns dealer-api.core
  (:require [io.pedestal.http :as http]
            [clojure.tools.namespace.repl :refer [refresh]]
            [dealer-api.drugs]))

(def routes
  #{["/hello" :get `respond-hello]
    ["/drugs" :get dealer-api.drugs/all-drugs :route-name :get-drugs]})
```
The `:route-name` parameter lets you do fancy things like creating named routes. Ignoring this topic for a future post, more details here : [http://pedestal.io/reference/routing-quick-reference](http://pedestal.io/reference/routing-quick-reference)

# Test your setup — Power to the REPL

![](https://miro.medium.com/max/1175/1*QprlhMTV_Jw8eWfo2001_w.jpeg)
*An infinite REPL | Ouroboros — A mythical creature that represents infinity in Middle Eastern culture [[source](https://mythologian.net/ouroboros-symbol-of-infinity/)]*

You  can go ahead, open a REPL, and start a server as we did in the last  post. And then go to the browser and check if the routes are working.But the REPL is more powerful. Most aspects of your codebase can be tested without opening the browser. **This is the one thing you should definitely take from this article.**

## Require namespaces you need

In the REPL, require the db config, sql function and route handler (you don’t even need to start the server):
```
$ clj
Clojure 1.10.1
user=> (require '[dealer-api.config :refer [db]])
nil
user=> (require '[dealer-api.sql.drugs :as sd] :reload)
nil
user=> (require '[dealer-api.drugs :as d] :reload)
nil
```

- The `:reload` keyword in the require function reloads the required ns
- You can also use `:reload-all` in to reload all namespaces required by this namespace
- Notice, in the REPL, `require` is a function, unlike `ns` declarations, where it is a keyword.
- Since  you’ll be setting up your REPL each time you come back to this  namespace, it’s considered a good idea to save this setup declaration in  the bottom of your namespace as a comment. This comment is generally  referred to as a **Rich Comment** ([Because it’s rich in context, and it’s heavily used by a person named Rich](https://www.youtube.com/watch?v=Qx0-pViyIDU)).

At the bottom of `dealer-api.drugs` ns, add the following Rich Comment:

```
(comment 
  (do 
    (require '[dealer-api.config :refer [db]])
    (require '[dealer-api.sql.drugs :as sd] :reload)
    (require '[dealer-api.drugs :as d] :reload)))
```

When you have the REPL integrated with your editor, you can directly send this code from your editor to the REPL.

## Verify if db is present and correct ✅

You might have to change the database name, user and password.
```
user=> db
{:classname "org.postgresql.Driver", :subprotocol "postgresql", :subname "//localhost:5432/dealer_dev", :user "shivekkhurana", :password ""}
```

## Verify the sql function ✅

```
user=> sd/drugs
#object[hugsql.core$db\_fn\_STAR\_$y\_\_1922 0x2af6b556 "hugsql.core$db\_fn\_STAR\_$y\_\_1922@2af6b556"]user=> (sd/drugs db)
({:id 1, :name "Vicodin, Norco, Xodol (hydrocodone, acetaminophen)", :availability 100, :price 14.0} {:id 3, :name "Synthroid, Levoxyl, Unithroid (levothyroxine)", :availability 200, :price 11.0} {:id 4, :name "Delasone, Sterapred (prednisone)", :availability 150, :price 5.0} {:id 5, :name "Amoxil (amoxicillin)", :availability 200, :price 9.0} {:id 6, :name "Neurontin (gabapentin)", :availability 50, :price 13.0} {:id 7, :name "Prinivil, Zestril (lisinopril)", :availability 60, :price 7.0} {:id 8, :name "Lipitor (atorvastatin)", :availability 78, :price 12.0} {:id 9, :name "Glucophage (metformin)", :availability 180, :price 8.0} {:id 10, :name "Zofran (ondansetron)", :availability 40, :price 17.0} {:id 11, :name "Motrin (ibuprofen)", :availability 70, :price 12.0})
```
If you find there is an issue in sql query, you can change the file, re-require it and test this function again.

## Verify the handler ✅
```
user=> d/all-drugs
#object[dealer_api.drugs$all\_drugs 0x728c3a0e "dealer_api.drugs$all\_drugs@728c3a0e"]user=> (d/all-drugs {})
{:status 200, :headers {"Content-Type" "application/json;charset=UTF-8"}, :body #object[io.pedestal.http$print\_fn$fn\_\_16848 0x485c8d5e "io.pedestal.http$print\_fn$fn\_\_16848@485c8d5e"]}
```
The handler seems to work correctly, and a json body with the correct status is returned.

 > Again, if you found a problem, don’t close the REPL and restart it. Make the changes, reload the namespace and try again.

## Finally test the route in the browser ✅

When you are happy that all your functions are working, we can start the server and make a sanity check in the browser:
```
user=> (require '[dealer-api.core :refer [go reset]])
nil
user=> (go)
"Server started on localhost:8890"
"Enter (reset) to reload."
:started)
```
Now visit localhost:8890 and you should see the list of drugs being returned.
![](https://miro.medium.com/max/1596/1*X1TZaQzReFaJVO9LuaoyrA.png)
*Our GET /drugs route is working !*

# Part 2 — Conclusion

In this part we:

- Created db and added seed data
- Fixed the logging setup
- Introduced configuration
- Introduced a new route
- Learnt how to test everything in the REPL
