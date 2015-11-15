# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "phusion/ubuntu-14.04-amd64"

  config.vm.network "private_network", ip: "192.168.33.10"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end

  # Only run the provisioning on the first 'vagrant up'
  if Dir.glob("#{File.dirname(__FILE__)}/.vagrant/machines/default/*/id").empty?
    config.vm.provision "shell", path: "initialize.sh" 
  end
end
