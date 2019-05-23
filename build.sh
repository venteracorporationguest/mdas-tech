#!/usr/bin/env bash

ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook --inventory-file=./ansible/hosts -u ec2-user --private-key=./keys/mdas ./ansible/build.yml
