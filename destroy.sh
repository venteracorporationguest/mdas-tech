#!/usr/bin/env bash

ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook --inventory-file=./ansible/hosts -u centos ./ansible/destroy.yml
