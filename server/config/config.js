module.exports ={
    port: process.env.PORT || 8081,
    db: {
        user: process.env.DB_USER || 'ACC',
        password: process.env.DB_PASS || 'password',
        database: process.env.DB_NAME || 'ACCBlog',
        host:   'https://inhousewebtest.site'|| 'http://138.68.18.100' || '127.0.0.1',
        dialect: 'sqlite',
        storage: './AmericanCarClub.sqlite'
    }
};