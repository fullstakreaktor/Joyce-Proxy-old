module.exports= function (grunt){
    grunt.initConfig({
        concat: {
        },
        uglify: {
        },
        my_src_files: ['../countdown/public/bundle.js'],
        pkg:grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 3004,
                    base: 'public',
                    hostname: 'localhost',
                    keepalive: true,
                    open: true,
                    livereload: true,
                    middleware: function (connect, options, middlewares) {
                      middlewares.unshift(require('grunt-connect-proxy/lib/utils').proxyRequest);
                      return middlewares;
                    }
                },
            proxies: [
                {
                context: '/hero_service',
                host: 'localhost',
                port: 3000,
                rewrite: {
                    '^/hero_service':'/api'
                }
            },
              {
                context: '/about',
                host: 'localhost',
                port: 3001,
                rewrite: {
                    '^/about':'/api'
                }
              },
              {
                context: '/reservations',
                host: 'localhost',
                port: 3003,
                rewrite: {
                    '^/reservations':'/api'
                }
              },
              {
                context: '/reviews',
                host: 'localhost',
                port: 3002,
                rewrite: {
                    '^/reviews':'/api'
                }
              },
            ]
        }
    }
    });
    grunt.loadNpmTasks('grunt-s2-sync');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('server', function (target) {
   grunt.task.run([
       'configureProxies:server',
       'connect:server',
   ]);
});
}
