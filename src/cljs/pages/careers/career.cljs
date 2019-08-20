(ns pages.careers.career
  (:require [hx.react :as hx]
            [hx.hooks :refer [useState]]
            ["react-router-dom" :refer [Link]]))

(hx/defnc Career [{:keys [id title job-location match]}]
  (let [[hovered? set-hovered?] (useState false)]
    [Link {:to (str (get match "path") "/" (name id))}
     [:div {:class "pv2 mv3"
            :on-mouse-enter #(set-hovered? true)
            :on-mouse-leave #(set-hovered? false)}
      (when hovered?
        [:div {:class "fr black-30 pr2 f6"}
         "Apply →"])
      [:div {:class "f3 black-80"} title]
      [:div {:class "black-60"} job-location]]]))
