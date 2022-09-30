const app = require('./app')

app.listen(5000,'127.0.0.1', () => {
    console.log(
        `⚡️[server]: Movie API is running at http://127.0.0.1:${5000}`
    );
});
