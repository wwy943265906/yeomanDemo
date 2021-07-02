#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const ejs = require('ejs');

inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'project name:'
}).then(answer => {
    console.log(answer)

    const tmpDir = path.join(__dirname, 'templates');
    const destDir = process.cwd();

    fs.readdir(tmpDir, (err, files) => {
        if (err) throw err
        files.forEach(file => {
            ejs.renderFile(path.join(tmpDir, file), answer, (err, result) => {
                if (err) throw err
                fs.writeFileSync(path.join(destDir, file), result);
            })
        })
    });



})