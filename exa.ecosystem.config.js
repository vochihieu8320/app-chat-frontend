module.exports = {
  apps: [
    {
      name: 'Crowdfunding_CM_FE',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        "PORT": 3001,
        "HOST": "localhost",
        "NODE_ENV": 'development',
      },
      env_production: {
        "PORT": 3007,
        "HOST": "localhost",
        "NODE_ENV": 'production',
        "DOMAIN_NAME": "https://ccm.hiq.ai",
      },
      error_file: 'err.log',
      out_file: 'out.log',
      log_file: 'combined.log',
      time: true
    },
  ],
};
