import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(opt: any) {
  return copy(opt.templateDir, opt.targetDir, {
    clobber: false,
  });
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

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    '../../templates',
    opt.template
  );
  opt = { ...opt, templateDir };

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (error) {
    console.error('%s Invalid template name', chalk.red.bold('Error'));
    process.exit(1);
  }

  console.log('Copy project files');
  await copyTemplateFiles(opt);

  console.log('%s Project ready', chalk.green.bold('DONE'));
  return true;
}
