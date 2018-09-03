const HtmlWebpackPlugin=require("html-webpack-plugin")
const webpack=require("webpack")
const MiniCssExtractPlugin=require("mini-css-extract-plugin")
const isDev=process.env.NODE_ENV==="development"

const  config={
    entry:"./src/index.js",
    output:{
        path:__dirname+"/dist",
        filename:"[name].js"
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:"babel-loader"
            },
            {
                test:/\.vue$/,
                loader:"vue-loader"
            },
            {
                test: /\.scss$/,
                use: [
                  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                  {
                      loader:"css-loader",
                      options:{
                          sourceMap:true
                      }
                  },
                  {
                    loader:"postcss-loader",
                    options:{
                        sourceMap:true
                    }
                },
                {
                    loader:"sass-loader",
                    options:{
                        sourceMap:true
                    }
                }]
            },
            {
                test:/\.(jpg|png|svg|gif|jpeg)$/,
                use:[{
                     loader:"url-loader",
                     options:{
                         limit:1024,
                         name:"[name]-[hash:base64:8].[ext]"
                     }
                }],
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"index.html"
        }),
        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[hash:8].css',
            chunkFilename: isDev ? '[id].css' : '[id].[hash:8].css',
          })
    ]
}
if(isDev){
    config.devServer={
        port:8080,
        host:"0.0.0.0",
        hot:true,
        inline:true
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}else{
    config.plugins.push(
        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV:JSON.stringify("production")
            }
        }),
    )
}
module.exports=config