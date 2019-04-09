(ns pages.careers.description
  (:require [hx.react :as hx]
            ["react-helmet" :refer (Helmet)]
            ["react-router-dom" :refer (Link)]
            [components.nav :refer [Nav]]
            [components.banner :refer [Banner]]))

(hx/defnc Description [{:keys [title body res req job-location]}]
  [:<>
   [Helmet {:title (str title " at Krim Labs")}]
   [Nav]
   [:div {:class "w-90  w-50-ns center mt5 pt4 black-80 lh-copy"}
    [:div {:class "f2"} title]
    [:div {:class "f4 black-60"} job-location]
    [:div {:class "mt3 f4"} body]
    [:div {:class "mt2 f4"}
     "We value work life balance and religiously avoid meetings, bureaucracy and office politics. We are fans of Basecamp and get sh#t done. You can read more about our "
     [Link {:to "/work"} "work"] " and check (our biased) views about our "
     [Link {:to "/careers"} "culture"] "."]
    [:div {:class "mt3"} "We expect you to take on the following responsibilties and meet some basic requirements:"]
    [:div {:class "f4 b mt3"} "Responsibilities"]
    (for [r res]
      [:div {:class "pl1"} r])
    [:div {:class "f4 b mt3"} "Requirements"]
    (for [r req]
      [:div {:class "pl1"} r])
    [:div {:class "mt4 pb6"}
     "To apply, send your CV, Github and a cover letter to "
     [:span {:class "b"} "careers at krimlabs dot com"]
     "."]]])
