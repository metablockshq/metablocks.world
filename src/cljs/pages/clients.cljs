(ns pages.clients
  (:require [hx.react :as hx]
            ["react-helmet" :refer (Helmet)]
            [components.nav :refer [Nav]]
            [components.banner :refer [Banner]]
            [pages.clients.copy :refer [Copy]]))

(hx/defnc Clients []
  [:<>
   [Helmet {:title "Clients - Krim Labs"}]
   [Nav]
   [Banner
    {:title "Clients"
     :illustration-src "/img/illustrations/man-and-woman-handshake.svg"}]

   [Copy]
   [:div {:class "w-100 word-wrap w-40-ns center mt4"}
    ]])

