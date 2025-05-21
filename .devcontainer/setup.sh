#!/bin/sh

set -eux

# Determine SITE_HOST based on Codespaces environment
if [ -n "${CODESPACE_NAME}" ] && [ -n "${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}" ]; then
    SITE_HOST="https://${CODESPACE_NAME}-8080.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
else
    SITE_HOST="http://localhost:8080"
fi

echo "SITE_HOST determined as: ${SITE_HOST}"

# Install dependencies for the seba-users plugin/theme
echo "Navigating to seba-users directory for npm install..."
if [ -d "/workspace/seba-users" ] && [ -f "/workspace/seba-users/package.json" ]; then
    cd /workspace/seba-users
    echo "Running npm install and npm run build:dev in /workspace/seba-users..."
    npm install
    # Check if build:dev script exists, otherwise just run build or skip
    if npm run build:dev --if-present; then
        echo "npm run build:dev completed."
    elif npm run build --if-present; then
        echo "npm run build completed as build:dev was not available."
    else
        echo "No 'build:dev' or 'build' script found in seba-users/package.json. Skipping build."
    fi
    # Return to workspace root or /var/www/html for WordPress installation
    cd /workspace 
else
    echo "Directory /workspace/seba-users or its package.json not found. Skipping npm install for seba-users."
fi


# WordPress installation
# The /var/www/html volume is mounted from the repository root.
# WordPress files will be installed directly into the repository root.
echo "Changing to /var/www/html for WordPress installation..."
cd /var/www/html

# Check if WordPress is already installed to prevent errors on rebuild
if sudo -u vscode wp core is-installed --path="/var/www/html" --quiet; then
    echo "WordPress is already installed. Skipping core installation."
else
    echo "Installing WordPress at $SITE_HOST..."
    # Run wp-cli commands as 'vscode' user, or 'www-data' if available and has perms.
    # For simplicity, running as vscode and relying on sudo for file permissions if needed,
    # or assuming directory permissions are correctly set by the container/mounts.
    # The wordpress image often sets up /var/www/html to be writable by www-data.
    # If wp-cli needs to run as www-data: sudo -u www-data wp ...
    
    # Create wp-config.php if it doesn't exist
    if [ ! -f "wp-config.php" ]; then
        echo "Creating wp-config.php..."
        sudo -u vscode wp config create --dbname="${WORDPRESS_DB_NAME}" --dbuser="${WORDPRESS_DB_USER}" --dbpass="${WORDPRESS_DB_PASSWORD}" --dbhost="${WORDPRESS_DB_HOST}" --force --skip-check --path="/var/www/html"
    else
        echo "wp-config.php already exists."
    fi

    echo "Running WordPress core install..."
    sudo -u vscode wp core install --url="$SITE_HOST" --title="WP Dev via Codespaces" --admin_user="admin" --admin_password="password" --admin_email="admin@example.com" --skip-email --path="/var/www/html"
    
    # Activate the seba-users plugin if it exists
    if [ -d "wp-content/plugins/seba-users" ]; then
        echo "Activating seba-users plugin..."
        sudo -u vscode wp plugin activate seba-users --path="/var/www/html"
    elif [ -d "seba-users" ]; then # If it's in the root and wp-content/plugins got created by wp core install
         # This case assumes 'seba-users' is a plugin and should be in wp-content/plugins
         # If WP was installed to /var/www/html (repo root), then seba-users is at ./seba-users
         # We need to ensure it's recognized as a plugin.
         # A better approach is to ensure seba-users IS ALREADY in wp-content/plugins or linked there.
         # For now, let's assume the volume mount ../:/var/www/html means that when WP creates wp-content/plugins,
         # the seba-users folder from the repo root IS NOT automatically a plugin.
         # The user would need to have seba-users inside a wp-content/plugins directory in their repo,
         # or we copy/link it.
         # Let's assume the repo structure is:
         # / (repo root, mounted to /var/www/html)
         #   seba-users/ (the plugin)
         #   wp-admin/ (created by wp core install)
         #   wp-content/ (created by wp core install)
         #   ...
         # In this case, seba-users is NOT in the right place.
         # The volume mount ../:/var/www/html means /workspace/seba-users is at /var/www/html/seba-users.
         # And WP expects plugins in /var/www/html/wp-content/plugins/
         # We should copy or link it.
        if [ ! -d "wp-content/plugins/seba-users" ]; then
            echo "Moving seba-users plugin to wp-content/plugins/ ..."
            sudo mkdir -p wp-content/plugins
            sudo cp -r /workspace/seba-users wp-content/plugins/
        fi
        echo "Activating seba-users plugin from copied location..."
        sudo -u vscode wp plugin activate seba-users --path="/var/www/html"

    else
        echo "seba-users plugin not found in expected locations."
    fi
fi

# Set ownership of files to vscode to avoid permission issues with editor
# This is important because wp-cli might create files as www-data or root
echo "Updating file ownership to vscode user..."
sudo chown -R vscode:vscode /var/www/html/* /var/www/html/.* || echo "Could not chown all files, continuing."


echo "Setup script complete. WordPress should be accessible at $SITE_HOST"
echo "Admin login: admin / password"
