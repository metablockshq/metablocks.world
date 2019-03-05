(ns pages.about
  (:require [hx.react :as hx]
            [components.nav :refer [Nav]]
            [components.banner :refer [Banner]]))

(hx/defnc About []
  [:<>
   [Nav]
   [Banner
    {:title "About us"
     :illustration-src "/img/illustrations/man-and-woman-handshake.svg"}]


   [:div {:class "w-100 word-wrap w-40-ns center mt4"}
    ]])

