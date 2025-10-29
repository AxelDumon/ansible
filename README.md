# README.MD

Pour obtenir la configuration de chacun des noeuds :
Cette commande copie la configuration de chacun des noeuds dans un dossiers facts/

```
ansible all -i hosts.ini -m ansible.builtin.setup --tree facts/

# Puis cette commande si vous voulez que ce soit lisible
# le package jq est requis, pour l'installation :
# - Linux (on Ubuntu) : sudo apt install jq
# - Linux (on Fedora) : sudo dnf install jq
# - macOS (via Homebrew) : brew install jq
# - macOS (via MacPorts) : port install jq
# - macOS (via Fink) : fink install jq
# ...
for file in facts/*; do jq . "$file" > "${file}.pretty" && mv "${file}.pretty" "$file"; done
```


Il faut dans un premier temps configurer le serveur ssh de chaque machine pour pouvoir s'y connecter.

```
ansible-playbook playbook.yml
```

Ensuite il faut préparrer l'application en local (compilation, clonnage etc)

```
ansible-playbook playbooks/prepare_app.yml --ask-become-pass
```

Pour que cela fonctionne il faut que le ssh soit configurer et que vous ayez une clé ssh qui vous permet d'accéder au dépot (à faire à la main sur github pour l'instant)

Une fois cela fait, il vous faut lancer le role app qui va copier l'application sur toutes machines et lancer le programme.

```
ansible-playbook role_test.yml
```