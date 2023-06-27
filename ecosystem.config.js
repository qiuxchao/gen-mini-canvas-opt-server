module.exports = {
  apps: [
    {
      name: 'mini-canvas-d2c',
      script: './dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        // DATABASE
        DB_HOST: 'localhost',
        DB_PORT: '27017',
        DB_USERNAME: 'root',
        DB_PASSWORD: 'root',
        DB_DATABASE: 'mini-canvas-d2c',
        // JWT
        JWT_SECRET: 'qxcmco',
        JWT_TOKEN_AUDIENCE: 'localhost:6923',
        JWT_TOKEN_ISSUER: 'localhost:6923',
        JWT_ACCESS_TOKEN_TTL: '9999999',
      },
    },
  ],
};
