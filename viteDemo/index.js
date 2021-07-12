const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const app = new Koa();

app.use(async ctx => {
    const { url, query } = ctx.request

    if (url === '/') {
        ctx.type = 'text/html'
        let content = fs.readFileSync('./index.html', 'utf-8');
        content = content.replace("<script ", `
            <script>
                window.process = {
                    env: {
                        NODE_ENV: 'env'
                    }
                }
            </script>
        <script `);

        ctx.body = content;
    } else if (url.endsWith('.js')) {
        const p = path.resolve(__dirname, url.slice(1));
        ctx.type = 'application/javascript';
        let content = fs.readFileSync(p, 'utf-8');
        content = rewriteImport(content);
        ctx.body = content;
    } else if (url.startsWith('/@modules/')) {
        // 第三方库的路径的es入口
        // /@modules/vue => node_modules/vue
        const prefix = path.resolve(__dirname, 'node_modules', url.replace('/@modules/', ''));
        const module = require(prefix + '/package.json').module;
        const p = path.resolve(prefix, module);
        const ret = fs.readFileSync(p, 'utf-8');
        ctx.type = 'application/javascript';
        ctx.body = rewriteImport(ret);
        console.log(module);

    }
})

app.listen(3000, () => {
    console.log('listen 3000')
})

// 修改第三库路径，使得它能发出请求
function rewriteImport(content) {
    return content.replace(/ from ['|"]([^'"]+)['|"]/g, function (s0, s1) {
        console.log(s0, s1);
        if (s1[0] !== "." && s1[1] !== "/") {
            return ` from '/@modules/${s1}'`
        } else {
            return s0;
        }
    })
}

