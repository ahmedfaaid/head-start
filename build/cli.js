"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const path_1 = __importDefault(require("path"));
const inquirer_1 = __importDefault(require("inquirer"));
// export function parseArgumentsIntoOptions(rawArgs: any) {
//   const args = arg({
//     '--git': Boolean,
//     '--install': Boolean,
//     '-g': '--git',
//     '-i': '--install'
//   });
//   return {
//     git: args['--git'] || false,
//     projectName: args._[0],
//     runInstall: args['--install'] || false
//   };
// }
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
            default: 'Vanilla'
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
    return Object.assign({}, answers);
}
async function cli() {
    const answers = await promptForQuestions();
    console.log(answers);
}
exports.cli = cli;
