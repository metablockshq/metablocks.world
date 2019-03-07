(ns pages.landing
  (:require [clojure.string :refer [lower-case]]
            [hx.react :as hx]
            [hx.hooks :refer [<-state]]
            ["react-router-dom" :refer (Link)]
            [components.nav :refer [Nav]]
            [hooks.window-scroll-position :refer [<-window-scroll-position]]
            [utils.colors :refer [colors]]))

(hx/defnc Landing []
  (let [scroll (<-window-scroll-position)
        show-nav? (> (:y @scroll) 480)]
    [:<>
     [:div {:class "w-100 w-60-ns center nt3 nt0-ns mt5-ns"}
      [:div {:class "cf b ph2 ph0-ns"}
       [:div {:class "fl w-50"}
        [:img {:src "/img/logo.svg"
               :class "mr2"
               :style {:height 40}}]
        [:span {:class "f3 f2-ns black-80 absolute"} "Krim."]]
       [:div {:class "fl w-50 tr mt1 mt3-ns"}
        (let [links ["Clients" "Careers"]]
          (for [link links]
            [Link {:to (str "/" (lower-case link)) :class "ml2" :key link}
             link
             (when (= link "Careers") [:span {:class "red"} "°"])]))]]

      [:div {:class "center w-100 cf-ns relative"
             :style {:background-color (:krim-yellow-light colors)
                     :height "40vh"}}
       [:div {:class "w-100 w-50-ns fl-ns ph5 pt3 pt5-ns pb2 pb5-ns mt4-ns f4"}
        [:span {:class "o-80"}
         [Link {:to "/name"} "Krim"]
         " is a New Delhi based software company."]
        [:span {:class "o-50"}
         "We build delightful interfaces and solve real world problems using Clojure and JavaScript."]]

       ;; large version for desktop
       [:div {:class (str "dn db-ns tc w-100 w-50-ns fl-ns absolute")
              :style {:bottom -120
                      :right -16}}
        [:img {:src "/img/illustrations/hero-table.svg"
               :class ""
               :style {:height 400}}]]

       ;; smaller version for mobile
       [:div {:class "db dn-ns tc"}
        [:img {:src "/img/illustrations/hero-table.svg"
               :class "mt2"
               :style {:height 80}}]]]]
     [:div {:class "bb w-100 dn db-ns"
            :style {:height 36
                    :border-color "#D1C0B6"}}]

     [:div {:class "w-100 w-60-ns center f6 black-50 cf pt2 ph3 ph0-ns mt4 mt0-ns"}
      [:div {:class "w-100 fl-ns w-50-ns b"}
       "sales@krimlabs.com | +91 8700 79 8503"]
      [:div {:class "w-100 fl-ns w-50-ns tl tr-ns mt1 mt0-ns"}
       " B1/638 A, 2nd Floor, Janakpuri, New Delhi- 110058"]]]))
