import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import simpleGit, { SimpleGit } from 'simple-git';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(opt: any) {
  return copy(opt.templateDir, opt.targetDir, {
    clobber: false,
  });
}

async function gitInit(opt: any) {
  const git: SimpleGit = simpleGit({ baseDir: opt.targetDir });
  try {
    await git.init();
  } catch (error) {
    return Promise.reject(new Error('Failed to initialize git repository'));
  }

  return true;
}

export async function createProject(opt: any) {
  if (opt.name === path.basename(process.cwd())) {
    opt = {
      ...opt,
      targetDir: process.cwd(),
    };
  } else {
    opt = {
      ...opt,
      targetDir: `${process.cwd()}/${opt.name}`,
    };
  }

  if (opt.typescript) {
    opt.template = `${opt.template}-typescript`;
  }

  console.log('template', opt.template);

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    '../../templates',
    opt.template
  );
  opt = { ...opt, templateDir };

  console.log('template directory', templateDir);

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (error) {
    console.error('%s Invalid template name', chalk.red.bold('Error'));
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: 'Copying project files',
      task: () => copyTemplateFiles(opt),
    },
    {
      title: 'Initializing git repository',
      task: () => gitInit(opt),
      enabled: () => opt.git === true,
    },
    {
      title: 'Installing dependencies',
      task: () =>
        projectInstall({
          cwd: opt.targetDir,
        }),
      enabled: () => opt.install === true,
    },
  ]);

  await tasks.run();
  console.log('%s Project ready', chalk.green.bold('DONE'));
  return true;
}
