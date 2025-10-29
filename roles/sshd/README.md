# sshd

[![Ansible 
version](https://img.shields.io/badge/ansible-%3E%3D2.10-black.svg?style=flat-square&logo=an
sible)](https://github.com/ansible/ansible)

⭐ Star us on GitHub — it motivates us a lot!

your role description

**Platforms Supported**:

None.

## ⚠️ Requirements

Ansible >= 2.1.

### Ansible role dependencies

None.

## ⚡ Installation

### Install with Ansible Galaxy

```shell
ansible-galaxy install sshd
```

### Install with git

If you do not want a global installation, clone it into your `roles_path`.

```bash
git clone   sshd
```

But I often add it as a submodule in a given `playbook_dir` repository.

```bash
git submodule add  roles/sshd
```

As the role is not managed by Ansible Galaxy, you do not have to specify the
github user account.

### ✏️ Example Playbook

Basic usage is:

```yaml
- hosts: all
  roles:
    - role: sshd
```

## ⚙️ Role Variables

Variables are divided in three types.

The **default vars** section shows you which variables you may
override in your ansible inventory. As a matter of fact, all variables should
be defined there for explicitness, ease of documentation as well as overall
role manageability.

The **context variables** are shown in section below hint you
on how runtime context may affects role execution.

### Default variables
Role default variables from `defaults/main.yml`.


### Context variables

Those variables from `vars/*.{yml,json}` are loaded dynamically during task
runtime using the `include_vars` module.

Variables loaded from `vars/almalinux.yml`.

| Variable Name | Value |
|---------------|-------|
| sshd_service | sshd |

Variables loaded from `vars/default.yml`.

| Variable Name | Value |
|---------------|-------|
| sshd_service | {{ lookup('env', 'SSHD_SERVICE')  \| default('sshd', true) }} |
| sshd_user | {{ lookup('env', 'USER')  \| default('root', true) }} |
| sshd_port | 22 |

Variables loaded from `vars/debian.yml`.

| Variable Name | Value |
|---------------|-------|
| sshd_service | ssh |
| sshd_user | {{ lookup('env', 'USER')  \| default('root', true) }} |



## Author Information

your company (optional)
Role 'sshd' ...done

