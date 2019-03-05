(ns pages.careers.career
  (:require [hx.react :as hx]
            [hx.hooks :refer (<-state)]
            ["react-router-dom" :refer [Link]]))

(hx/defnc Career [{:keys [title location apply-link]}]
  (let [hovered? (<-state false)]
    [Link {:to apply-link
           :class ""}
     [:div {:class "pv2 mv3"
            :on-mouse-enter #(reset! hovered? true)
            :on-mouse-leave #(reset! hovered? false)}
      (when @hovered?
        [:div {:class "fr black-30 pr2 f6"}
         "Apply →"])
      [:div {:class "f3 black-80"} title]
      [:div {:class "black-60"} location]]]))
