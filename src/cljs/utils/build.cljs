(ns utils.build
  (:require [clojure.string :refer [lower-case includes?]]))

(def is-snap? (includes? (lower-case (. js/navigator -userAgent)) "reactsnap"))

(def is-dev? (get (js->clj js/CLOSURE_DEFINES) "main.IS_DEV"))
