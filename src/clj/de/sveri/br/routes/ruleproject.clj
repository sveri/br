(ns de.sveri.br.routes.ruleproject
  (:require [compojure.core :refer [defroutes GET]]
            [ring.util.response :refer [response]])
  (:import (java.util UUID)))

(def ex-dec-tree {:name     "tree-name"
                  :id       (UUID/randomUUID)
                  :branches [{:id (UUID/randomUUID)
                              :condition {:operator :> :value "5"}}]})

(defn dec-tree [id]
  (response {:name "treename" :loaded true}))

(defn rp-routes [config]
  (routes
    (GET "/rp/decision-tree/:id" [id] (dec-tree id))))
