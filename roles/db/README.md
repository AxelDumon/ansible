db role
=========

Ce rôle permet d'installer de configurer une base de donnée parmis celles proposées (MongoDB, CouchDB) de façon est-ce qu'elles soient capable de répliquer leurs données.

Requirements
------------

Les paquets suivants doivent être installés :
- gnupg
- curl
- debconf-utils

Role Variables
--------------

### Variables et explications

| Variable | Description |
|---------|-------------|
| `couchdb_package` | Nom du paquet CouchDB à installer. Généralement `couchdb`. |
| `couchdb_version` | Version spécifique de CouchDB à installer. Laisser vide (`""`) pour installer la dernière version disponible. |
| `couchdb_admin_user` | Nom d'utilisateur administrateur créé dans CouchDB. |
| `couchdb_admin_password` | Mot de passe de l’utilisateur administrateur. |
| `couchdb_erl_cookie` | Cookie Erlang utilisé pour la communication interne entre les nœuds CouchDB. |
| `couchdb_bind_address` | Adresse sur laquelle CouchDB écoute (ex. `0.0.0.0` pour toutes les interfaces). |
| `couchdb_mode` | Mode de fonctionnement de CouchDB (`standalone`, `cluster`, etc.). |
| `couchdb_nodes` | Liste des adresses/nœuds CouchDB pour la réplication ou le clustering. Peut contenir des FQDN, IP, ou hostnames. |
| `couchdb_repo_url` | URL du dépôt APT de CouchDB utilisé pour l’installation. |
| `couchdb_key_url` | URL de la clé GPG du dépôt CouchDB. |
| `couchdb_keyring_path` | Chemin où importer la clé GPG du dépôt CouchDB. |
| `couchdb_release_codename` | Nom de code de la distribution Linux (ex. `jammy`, `focal`), automatiquement renseigné via Ansible. |
| `couchdb_service_name` | Nom du service systemd CouchDB. |
| `couchdb_port` | Port HTTP sur lequel CouchDB écoute (par défaut `5984`). |
| `couchdb_wait_timeout` | Délai maximal d'attente (en secondes) pour vérifier si CouchDB est en ligne après installation/démarrage. |
| `couchdb_q` | Nombre de fragments par shard CouchDB (paramètre de configuration interne). |
| `couchdb_n` | Nombre de copies répliquées pour chaque document (durabilité). En standalone : `1`. |
| `couchdb_max_history` | Nombre maximal d'historique de révisions par document. |
| `couchdb_retries_per_request` | Nombre maximal de tentatives avant l’échec d’une requête HTTP interne CouchDB. |
| `couchdb_max_jobs` | Nombre maximum de jobs simultanés dans CouchDB (compactions, tâches background, etc.). |
| `couchdb_interval` | Intervalle (en millisecondes) entre deux vérifications de file de jobs. |
| `couchdb_max_churn` | Nombre limite de jobs à traiter par intervalle. |


Dependencies
------------

A list of other roles hosted on Galaxy should go here, plus any details in regards to parameters that may need to be set for other roles, or variables that are used from other roles.

Example Playbook
----------------

```
---
- name: Test db role
  hosts: all
  become: true
  roles:
    - role: db
      vars:
        db_name: couchdb # or mongodb

```
License
-------

BSD

Author Information
------------------

nom : Axel Dumon
