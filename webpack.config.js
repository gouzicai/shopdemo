const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    entry:__dirname + '/js/cart.js',
    output:{
        path:__dirname + '/dist',
        filename:'cart.js'
    },
    mode:'development',
    plugins:[
        new htmlWebpackPlugin({
            template:__dirname+'/cart.html',
            filename:'index.html'
        }),
        new VueLoaderPlugin()
    ],
    module:{
        rules:[
            {test:/\.vue$/,loader:"vue-loader"}
        ]
    }
}