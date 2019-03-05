(ns hooks.window-scroll-position
  (:require [hx.hooks :refer [<-state <-effect]])
  (:import [goog.async Throttle Debouncer]))

(defn disposable->function [disposable listener interval]
  (let [disposable-instance (disposable. listener interval)]
    (fn [& args]
      (.apply (.-fire disposable-instance) disposable-instance (to-array args)))))

(defn throttle [listener interval]
  (disposable->function Throttle listener interval))

(defn debounce [listener interval]
  (disposable->function Debouncer listener interval))

(defn get-position []
  {:x (.-pageXOffset js/window)
   :y (.-pageYOffset js/window)})

(defn <-window-scroll-position []
  (let [position (<-state (get-position))
        handler (throttle #(reset! position (get-position)) 120)]
    (<-effect
     (fn []
       (.addEventListener js/window "scroll" handler)
       #(.removeEventListener js/window "scroll" handler))
     [])
    position))
