(ns pages.landing
  (:require [clojure.string :refer [lower-case]]
            [hx.react :as hx]
            [hx.hooks :refer [<-state]]
            ["react-helmet" :refer (Helmet)]
            ["react-router-dom" :refer (Link)]
            [components.nav :refer [Nav]]
            [hooks.window-scroll-position :refer [<-window-scroll-position]]
            [utils.colors :refer [colors]]))

(hx/defnc Landing []
  (let [scroll (<-window-scroll-position)
        show-nav? (> (:y @scroll) 480)]
    [:<>
     [Helmet {:title "Krim Labs"}]
     [:div {:class "w-100 w-60-ns center nt3 nt0-ns mt5-ns"}
      [:div {:class "cf b ph2 ph0-ns"}
       [:div {:class "fl w-50"}
        [:img {:src "/img/logo.svg"
               :class "mr2"
               :style {:height 40}}]
        [:span {:class "f3 f2-ns black-80 absolute mt1 mt0-ns"} "Krim."]]
       [:div {:class "fl w-50 tr mt1 mt3-ns z-1"}
        (let [links ["Clients" "Careers"]]
          (for [link links]
            [Link {:to (str "/" (lower-case link)) :class "ml2" :key link}
             link
             (when (= link "Careers") [:span {:class "red"} "°"])]))]]

      [:div {:class "center w-100 cf-ns relative-ns vh-75 vh-50-ns h-100"
             :style {:background-color (:krim-yellow-light colors)}}

       [:div {:class "w-100 w-50-ns fl f4 dt h-100"}
        [:div {:class "dtc v-mid ph5"}
         [:span {:class "o-80"}
          [Link {:to "/name"} "Krim"]
          " is a New Delhi based software company."]
         [:span {:class "o-50"}
          "We build delightful interfaces and solve real world problems using Clojure and JavaScript."]]]

       ;; smaller version for mobile
       [:div {:class "w-100 w-50-ns fl f4 dt h-50 h-100-ns ph5 ph0-ns nt6 nt1-ns db dn-ns"}
        [:img {:src "/img/illustrations/hero-table.svg"
               :class "h-100"}]]

       ;; large version for desktop
       [:div {:class "w-100 w-50-ns h-100 fl f4 dt-ns ph0-ns dn db-ns absolute-ns"
              :style {:bottom -120
                      :height 440
                      :right -20}}
        [:img {:src "/img/illustrations/hero-table.svg"
               :class "h-100"}]]]]
     [:div {:class "bb w-100 dn db-ns"
            :style {:height 16
                    :border-color "#D1C0B6"}}]

     [:div {:class "w-100 w-60-ns center f6 black-50 cf pt2 pb3 ph3 ph0-ns mt4 mt3-ns"}
      [:div {:class "w-100 fl-ns w-50-ns b"}
       "sales at krimlabs dot com"]
      [:div {:class "w-100 fl-ns w-50-ns tl tr-ns mt1 mt0-ns"}
       " B1/638 A, 2nd Floor, Janakpuri, New Delhi- 110058"]]]))
