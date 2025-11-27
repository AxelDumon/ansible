app role
=========

Ce rôle permet de déployer l'application contenue dans le dossier "files". Pour cela il va mettre en place tout les outils nécessaire au fonctionnement de l'application.

Requirements
------------

Il est nécessaire que les outils suivants soient installés :
- git
- node
- npm

Role Variables
--------------

Il est possible de changer la version de l'application pour qu'elle utilise une base de données différentes. (Fonctionnalité retiré actuellement, car plus de pull via git)

Les variables utilisés pour configurer l'application sont les suivantes :

```
app_base_port: 3000                  # Explorer(f&b) ;
app_base_ws_port: 8080               # Explorer(f&b) ;
app_base_app_port: 8000              # Explorer(f)   ;
app_delay: 200                       # Explorer(f&b) ; Watcher(f&b)
app_size: 40                         # Explorer(f&b) ; Watcher(f&b)
app_base_mongo_port: 27018           # Explorer(b)   ;
app_api_url: "http://localhost:3001" #               ; Watcher(f)
app_db_name: "v2grid"
app_mongo_replica_set_name: "rs0"
app_version: "master"              # Possible versions : mongodb, couchdb, master
```

Example Playbook
----------------

```
- name: App role test playbook
  hosts: all
  become: true
  become_user: root
  gather_facts: true
  roles:
    - role: app
```

License
-------

BSD

Author Information
------------------

nom : Axel Dumon