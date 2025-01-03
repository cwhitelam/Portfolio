module.exports = {
    webpack: {
        configure: {
            module: {
                rules: [
                    {
                        test: /\.pdf$/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: '[name].[ext]'
                                }
                            }
                        ]
                    }
                ]
            }
        }
    }
}; 