#!/bin/bash

ansible all -m ansible.builtin.meta -a "clear_facts"

ansible-playbook configure_ssh.yml # --ask-vault-pass

ansible-playbook configure_network.yml # --ask-vault-pass

ansible-playbook configure_db.yml # --ask-vault-pass

# ansible-playbook playbooks/prepare_app.yml

ansible-playbook configure_app.yml # --ask-vault-pass