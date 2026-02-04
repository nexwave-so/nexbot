# NGINX Setup Guide for nexwave.so

This guide explains how to set up NGINX as a reverse proxy with SSL certificates for the Nexwave platform.

## Prerequisites

1. Domain `nexwave.so` must be pointing to your server's IP address
2. Ports 80 and 443 must be open in your firewall
3. Docker and Docker Compose installed

## Quick Setup

### 1. Start Services

First, start all services including NGINX:

```bash
docker compose up -d --remove-orphans
```

### 2. Obtain SSL Certificates

Run the SSL setup script to obtain Let's Encrypt certificates:

```bash
./scripts/setup-ssl.sh
```

This script will:
- Start NGINX without SSL (to allow certbot challenge)
- Request SSL certificates from Let's Encrypt
- Configure NGINX to use the certificates
- Restart NGINX with SSL enabled

### 3. Verify Setup

After running the setup script, verify that:
- HTTP redirects to HTTPS: `http://nexwave.so` → `https://nexwave.so`
- SSL is working: Check the padlock icon in your browser
- All services are accessible via the domain

## Manual Certificate Setup

If the automated script doesn't work, you can set up certificates manually:

```bash
# Request certificates
docker run --rm \
  -v nexwave_certbot_data:/etc/letsencrypt \
  -v nexwave_certbot_www:/var/www/certbot \
  certbot/certbot \
  certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email fode@alchemexlabs.com \
  --agree-tos \
  --no-eff-email \
  -d nexwave.so \
  -d www.nexwave.so

# Restart NGINX
docker compose restart nginx
```

## Automatic Certificate Renewal

SSL certificates expire every 90 days. Set up automatic renewal:

### Option 1: Add to Crontab

```bash
# Edit crontab
crontab -e

# Add this line (runs daily at 3 AM)
0 3 * * * /var/www/nexwave/scripts/cron-renew-ssl.sh >> /var/log/ssl-renewal.log 2>&1
```

### Option 2: Manual Renewal

Renew certificates manually when needed:

```bash
./scripts/renew-ssl.sh
```

## NGINX Configuration

### File Structure

```
nginx/
├── nginx.conf          # Main NGINX configuration
└── conf.d/
    └── nexwave.conf    # Site-specific configuration
```

### Routing

- **Frontend**: `https://nexwave.so/` → Next.js app (port 3000)
- **API**: `https://nexwave.so/api/*` → FastAPI backend (port 8000)
- **WebSocket**: `https://nexwave.so/ws/*` → FastAPI WebSocket (port 8000)
- **Health**: `https://nexwave.so/health` → API health check

### SSL Configuration

- **Protocols**: TLSv1.2, TLSv1.3
- **Ciphers**: High security ciphers only
- **HSTS**: Enabled (1 year max-age)
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection

## Troubleshooting

### Certificates Not Obtained

1. **Check DNS**: Ensure `nexwave.so` points to your server IP
   ```bash
   nslookup nexwave.so
   ```

2. **Check Ports**: Ensure ports 80 and 443 are open
   ```bash
   sudo ufw status
   # or
   sudo iptables -L
   ```

3. **Check NGINX Logs**:
   ```bash
   docker logs nexwave-nginx
   ```

4. **Check Certbot Logs**:
   ```bash
   docker run --rm -v nexwave_certbot_data:/etc/letsencrypt certbot/certbot certificates
   ```

### NGINX Not Starting

1. **Check Configuration**:
   ```bash
   docker exec nexwave-nginx nginx -t
   ```

2. **Check Logs**:
   ```bash
   docker logs nexwave-nginx
   ```

### Services Not Accessible

1. **Check Container Status**:
   ```bash
   docker compose ps
   ```

2. **Check Network**:
   ```bash
   docker network inspect nexwave_nexwave-network
   ```

3. **Test Internal Connectivity**:
   ```bash
   docker exec nexwave-nginx ping -c 3 frontend
   docker exec nexwave-nginx ping -c 3 api-gateway
   ```

## Testing SSL

Use these tools to verify SSL configuration:

- **SSL Labs**: https://www.ssllabs.com/ssltest/analyze.html?d=nexwave.so
- **SSL Checker**: https://www.sslshopper.com/ssl-checker.html#hostname=nexwave.so

## Maintenance

### Update Certificates Before Expiry

Certificates are valid for 90 days. The renewal script checks expiration and renews if needed.

### View Certificate Info

```bash
docker run --rm -v nexwave_certbot_data:/etc/letsencrypt certbot/certbot certificates
```

### Force Renewal

```bash
docker run --rm \
  -v nexwave_certbot_data:/etc/letsencrypt \
  -v nexwave_certbot_www:/var/www/certbot \
  certbot/certbot \
  renew --force-renewal
```

## Security Best Practices

1. **Keep NGINX Updated**: Regularly update the NGINX Docker image
2. **Monitor Logs**: Check NGINX access and error logs regularly
3. **Firewall Rules**: Only allow necessary ports (80, 443)
4. **Regular Backups**: Backup certificate files and NGINX config
5. **Security Headers**: Already configured in `nexwave.conf`

## Environment Variables

Update `.env` file with:

```bash
# Frontend API URL (use domain in production)
NEXT_PUBLIC_API_URL=https://nexwave.so/api
```

Or set it in docker compose.yml for the frontend service.

