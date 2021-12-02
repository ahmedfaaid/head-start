import path from 'path';
import inquirer from 'inquirer';

async function promptForQuestions() {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Project Name',
      default: path.basename(process.cwd())
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

  const answers = await inquirer.prompt(questions);

  return { ...answers };
}

export async function cli() {
  const answers = await promptForQuestions();
  console.log(answers);
}
