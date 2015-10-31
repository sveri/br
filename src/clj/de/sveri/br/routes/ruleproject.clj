(ns de.sveri.br.routes.ruleproject
  (:require [compojure.core :refer [routes GET]]
            [ring.util.response :refer [response]]
            [de.sveri.br.layout :as layout])
  (:import (java.util UUID)))

(def ex-dec-tree {:name     "tree-name"
                  :id       (UUID/randomUUID)
                  :branches [{:id (UUID/randomUUID)
                              :condition {:operator :> :value "5"}}]})

(defn dec-tree [id]
  (response {:name "treename" :loaded true :id id}))

(defn dec-tree-page []
  (layout/render "ruleproject/decisiontree.html"))

(defn rp-routes [config]
  (routes
    (GET "/rp/decision-tree" [] (dec-tree-page))
    (GET "/rp/decision-tree/:id" [id] (dec-tree id))))
