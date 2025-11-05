#!/bin/bash

instances=("Explo1" "Explo2" "Explo3" "Watch1")

# Addresses will look like this "ip1 ip2 ip3"
addresses=$(incus list -f csv | grep -E "${instances[*]}" | cut -d, -f3 | cut -d\  -f1)

for ip in $addresses; do
    echo "Removing $ip from known_hosts"
    ssh-keygen -f '/home/axel/.ssh/known_hosts' -R "$ip"
done

for instance in "${instances[@]}"; do
    incus delete "$instance" --force
done

for instance in "${instances[@]}"; do
    incus launch images:ubuntu/24.04/cloud "$instance" --config=cloud-init.user-data="$(cat ~/python_test/cloud-config.yaml)"
done

ansible all -m ansible.builtin.meta -a "clear_facts"

ansible-playbook config_ssh.yml # --ask-vault-pass

ansible-playbook network_test.yml # --ask-vault-pass

ansible-playbook bdd_test.yml # --ask-vault-pass

ansible-playbook playbooks/prepare_app.yml

ansible-playbook role_test.yml # --ask-vault-pass