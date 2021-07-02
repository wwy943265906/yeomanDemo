const Generator = require('yeoman-generator');

// 一个generator必须导出一个类，需要继承自Generator类

module.exports = class extends Generator {
    // 执行命令行的地方
    prompting () {
        // promise
        // 这里需要return
        return this.prompt([
            // 用户输入的交互
            // this.appname这是目录名字
            {
                type: 'input',
                name: 'title',
                message: 'you project names:',
                default: this.appname
            }
        ]).then(answers => {
            console.log(answers);
            this.answers = answers;
        })
    }

    // 默认执行的方法
    writing () {
        // 这个fs是generator的fs，不是node的
        // 
        // this.fs.write(this.destinationPath('temp.txt'), Math.random().toString());

        // templatePath默认找templates下的文件
        const tmp = this.templatePath('index.html');
        const output = this.destinationPath('index.html');

        console.log(this.answers);

        const context = this.answers;

        this.fs.copyTpl(tmp, output, context);
    }
} 