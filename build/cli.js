"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const path_1 = __importDefault(require("path"));
const inquirer_1 = __importDefault(require("inquirer"));
async function promptForQuestions() {
    const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'Project Name',
            default: path_1.default.basename(process.cwd())
        },
        {
            type: 'list',
            name: 'template',
            message: 'Please select a template',
            choices: ['Vanilla', 'Express'],
            default: 'Vanilla',
            filter: (val) => {
                return val.toLowerCase();
            }
        },
        {
            type: 'confirm',
            name: 'typescript',
            message: 'Do you want TypeScript?',
            default: false
        },
        {
            type: 'confirm',
            name: 'git',
            message: 'Initialize git?',
            default: true
        }
    ];
    const answers = await inquirer_1.default.prompt(questions);
    let install;
    if (answers.template !== 'vanilla') {
        install = await inquirer_1.default.prompt({
            type: 'confirm',
            name: 'install',
            message: 'Do you want to install dependencies?',
            default: true
        });
    }
    return Object.assign(Object.assign({}, answers), install);
}
async function cli() {
    const answers = await promptForQuestions();
    console.log(answers);
}
exports.cli = cli;
