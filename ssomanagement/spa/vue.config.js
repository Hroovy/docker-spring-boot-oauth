module.exports = {
    devServer: {
        port: 3000,
        proxy: 'http://compiler:8080',
    },
    outputDir: '../src/main/resources/static/',
}
