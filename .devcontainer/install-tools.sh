#!/bin/sh

set -eux

echo "Installing wp-cli..."
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
sudo chmod +x wp-cli.phar
sudo mv wp-cli.phar /usr/local/bin/wp

echo "Installing chromium..."
# Using sudo for apt-get commands
sudo apt-get update
# Added --yes to auto-confirm, and fixed no-install-recommends syntax
sudo apt-get install --yes --no-install-recommends chromium

# Copy the welcome message if it exists
if [ -f ".devcontainer/welcome-message.txt" ]; then
    echo "Copying welcome message..."
    # Ensure the target directory exists
    sudo mkdir -p /usr/local/etc/vscode-dev-containers
    sudo cp ".devcontainer/welcome-message.txt" /usr/local/etc/vscode-dev-containers/first-run-notice.txt
else
    echo "Welcome message not found, skipping copy."
fi

echo "Tools installation complete."
