(ns de.sveri.br.schemas
  (:require [schema.core :as s #?@(:cljs [:include-macros true]) :refer [defschema]]))

(declare branch)

(defschema node {(s/required-key :name) s/Str
                 (s/required-key :id) s/Uuid
                 (s/required-key :branches) [branch]})

(defschema branch {(s/required-key :name) s/Str
                   (s/required-key :id) s/Uuid
                   (s/required-key :node) node})

(defschema decision-tree {(s/required-key :name) s/Str
                          (s/required-key :id) s/Uuid
                          (s/required-key :branches) [branch]})