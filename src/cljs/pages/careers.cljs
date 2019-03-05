(ns pages.careers
  (:require [hx.react :as hx]
            [components.nav :refer [Nav]]
            [components.banner :refer [Banner]]
            [pages.careers.career :refer [Career]]))

(hx/defnc Careers []
  [:<>
   [Nav]
   [Banner
    {:title "Careers"
     :illustration-src "/img/illustrations/jobs-banner.svg"}]

   [:div {:class "w-90 word-wrap w-40-ns center mt4"}
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

