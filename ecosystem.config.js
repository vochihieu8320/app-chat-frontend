module.exports = {
  apps: [
    {
      name:"ccm.hiq.ai",
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        "PORT": 3001,
        "HOST": "localhost",
        "NODE_ENV": 'development',
        "api_url": "http://127.0.0.1:3000"
      },
      env_production: {
        "PORT": 3001,
        "HOST": "localhost",
        "NODE_ENV": 'production',
        "DOMAIN_NAME": "https://ccm.hiq.ai",
        "api_url": "http://127.0.0.1:3000"
      },
      error_file: 'err.log',
      out_file: 'out.log',
      log_file: 'combined.log',
      time: true
    },
    
  ],
};



