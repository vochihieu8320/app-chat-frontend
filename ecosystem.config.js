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
    {
      name:"ccm-test.hiq.ai",
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_test: {
        "PORT": 3009,
        "HOST": "localhost",
        "NODE_ENV": 'test',
        "DOMAIN_NAME": "https://ccm-test.hiq.ai",
      },
      error_file: 'err.log',
      out_file: 'out.log',
      log_file: 'combined.log',
      time: true
    },
  ],
};


// module.exports = {
//   apps: [
//     {
//       name: 'ccm-test.hiq.ai',
//       script: 'server.js',
//       instances: 1,
//       autorestart: true,
//       watch: false,
//       max_memory_restart: '1G',
//       env: {
//         "PORT": 3001,
//         "HOST": "localhost",
//         "NODE_ENV": 'development',
//       },
//       env_production: {
//         "PORT": 3009,
//         "HOST": "localhost",
//         "NODE_ENV": 'production',
//         "DOMAIN_NAME": "https://ccm-test.hiq.ai",
//       },
//       error_file: 'err.log',
//       out_file: 'out.log',
//       log_file: 'combined.log',
//       time: true
//     },
//   ],
// };
