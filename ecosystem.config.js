module.exports = {
  apps : [{
    script: './bin/www',
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }],

  deploy : {
    production : {
      "user" : "ubuntu",
      "host" : "localhost",
      "repo" : "https://github.com/biennd279/pug-ast.git",
      "path" : "/app",
      "ref" : "origin/master",
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
