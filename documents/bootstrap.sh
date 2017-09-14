#!/usr/bin/env bash

echo " ";
echo " ";
echo "######### STARTING";
echo "pwd : ";
pwd;
echo "user: ";
whoami;

# echo " ";
# echo " ";
# echo "######### adding node.js repository";
# echo " ";
# add-apt-repository -y ppa:chris-lea/node.js

echo " ";
echo " ";
echo "######### update aptitudes package list";
echo " ";
apt-get update

echo " ";
echo " ";
echo "######### install vim curl lynx nmap ruby";
echo " ";
apt-get install -y vim curl lynx nmap ruby;

echo " ";
echo " ";
echo "######### install git-core nodejs npm";
echo " ";
apt-get install -y git-core nodejs npm

echo " ";
echo " ";
echo "######### setting symbolic link to node";
echo " ";
ln -s /usr/bin/nodejs /usr/bin/node

echo " ";
echo " ";
echo "######### installing sass";
echo " ";
gem install sass;


echo " ";
echo " ";
echo "######### updating npm";
echo " ";
npm update -g npm

echo "######### installing bower";
echo " ";
npm install -g bower

echo " ";
echo " ";
echo "######### installing grunt";
echo " ";
npm install -g grunt-cli

echo " ";
echo " ";
echo "######### switching to user vagrant";
echo " ";
su vagrant;

echo " ";
echo " ";
echo "######### going into working dir";
echo " ";
cd /vagrant/www
echo "pwd : ";
pwd;
echo "user: ";
whoami;

echo " ";
echo " ";
echo "######### cloning repository";
echo " ";
git clone https://github.com/HerrL/Frontend-Test.git .

echo " ";
echo " ";
echo "######### installing node_modules";
echo " ";
npm install --save-dev

echo " ";
echo " ";
echo "######### calling grunt default";
echo " ";
grunt


echo " ";
echo " ";
echo "########################################################";
echo " ";
echo " if no relevant errors occurred, it's now";
echo " ";
echo " ==============";
echo " READY FOR PUNK";
echo " /\\/^--==--°\\/\\";
echo " ";
echo " start the DEV-server by logging into the vagrant box with";
echo "      $> vagrant ssh";
echo " and cd to working directory with";
echo "      $> cd /vagrant/www/";
echo " there call";
echo "      $> grunt server";
echo " ";
echo " ";
echo "########################################################";
echo " ";
