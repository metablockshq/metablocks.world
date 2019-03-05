(ns components.banner
  (:require [hx.react :as hx]))

(hx/defnc Banner [{:keys [title illustration-src]}]
  [:<>
   [:div {:class "w-90 ph2 ph0-ns w-60-ns center relative h-50 mt5"}
    [:div {:class "b tc pt2 pb6 black-80 banner-title"} title]
    [:div {:class "tc absolute bottom-0 w-100"}
     [:img {:src illustration-src}]]]
   [:div {:class "bb nt2"
          :style {:border-color "#D1C0B6"}}]])
