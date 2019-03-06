(ns components.nav
  (:require [clojure.string :refer [lower-case]]
            [hx.react :as hx]
            ["react-router-dom" :refer (Link)]
            [utils.colors :refer [colors]]))

(hx/defnc Nav []
  [:div {:class "w-100 fixed pa2 pv3 pv4-ns top-0 z-1"
         :style {:background-color (:krim-yellow colors)}}
   [:div {:class "bg-white shadow-5 br2 pv2 pv3-ns w-100 w-50-ns center nb5 cf"}
    [Link {:to "/"}
     [:div {:class "w-30 fl black-80"}
      [:img {:src "/img/logo.svg"
             :style {:height 24}
             :class "ml2 fl"}]
      [:span {:class "b f3 ml1"} "Krim."]]]

    [:div {:class "w-70 tr pr3 b f6 fr mt1"}
     (let [links ["About" "Careers"]]
       (for [link links]
         [Link {:to (str "/" (lower-case link)) :class "ml2" :key link}
          link
          (when (= link "Careers") [:span {:class "red"} "°"])]))]]])
