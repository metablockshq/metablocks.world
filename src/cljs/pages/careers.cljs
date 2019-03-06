(ns pages.careers
  (:require [hx.react :as hx]
            ["react-helmet" :refer (Helmet)]
            [components.nav :refer [Nav]]
            [components.banner :refer [Banner]]
            [pages.careers.career :refer [Career]]
            [pages.careers.copy :refer [Copy]]))

(hx/defnc Careers []
  [:<>
   [Helmet {:title "Work at Krim Labs"}]
   [Nav]
   [Banner
    {:title "Careers"
     :illustration-src "/img/illustrations/jobs-banner.svg"}]
   [Copy]
   [:div {:class "w-90 word-wrap w-50-ns ph3 pv1 br3 bg-washed-yellow center mb4"}
    [Career {:title "Senior Clojure Developer"
             :location "New Delhi"
             :apply-link "/"}]

    [Career {:title "Clojure/Javascript Developer"
             :location "New Delhi"
             :apply-link "/"}]

    [Career {:title "Product Designer (Contract)"
             :location "India/Remote"
             :apply-link "/"}]

    [Career {:title "Software Developer (Intern)"
             :location "New Delhi"
             :apply-link "/"}]]])

