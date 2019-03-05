(ns hooks.window-size
  (:require [hx.hooks :refer [<-state <-effect]]))

(defn get-screen-size []
  (let [inner-width (.-innerWidth js/window)]
    {:inner-height (.-innerHeight js/window)
     :inner-width inner-width
     :outer-height (.-outerHeight js/window)
     :outer-width (.-outerWidth js/window)
     ;; portrait mode tablets or lower
     :is-small-screen? (< inner-width 1000)}))

(defn <-window-size []
  (let [size (<-state (get-screen-size))
        handler #(reset! size (get-screen-size))]
    (<-effect
     (fn []
       (.addEventListener js/window "resize" handler)
       #(.removeEventListener js/window "resize" handler))
     [])
    size))
