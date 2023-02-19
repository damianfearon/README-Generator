const inquirer = require('inquirer');
const fs = require('fs');

const licenses = [
  {name: 'Apache 2.0', value: 'apache-2.0'},
  {name: 'GNU GPLv3', value: 'gpl-3.0'},
  {name: 'MIT', value: 'mit'}

  ];




inquirer.prompt([
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please provide a brief description of your project:'
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Please provide installation instructions for your project:'
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Please provide usage instructions for your project:'
  },
  {
    type: 'list',
    name: 'license',
    message: 'Which license would you like to use for your project?',
    choices: licenses
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Please provide guidelines for contributing to your project:'
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Please provide instructions for running tests for your project:'
  },
  {
    type: 'input',
    name: 'github',
    message: 'What is your GitHub username?'
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address?'
  }
]).then((answers) => {
  const readmeTemplate = {
    title: answers.title,
    description: answers.description,
    installation: answers.installation,
    usage: answers.usage,
    license: answers.license,
    contributing: answers.contributing,
    tests: answers.tests,
    github: answers.github,
    email: answers.email
  };

  const licenseBadge = `[![License: ${readmeTemplate.license.toUpperCase()}](https://img.shields.io/badge/License-${readmeTemplate.license}-yellow.svg)](https://opensource.org/licenses/${readmeTemplate.license})`;


  const readmeContent = `
# ${readmeTemplate.title}

## Description
${readmeTemplate.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${readmeTemplate.installation}

## Usage
${readmeTemplate.usage}

## License
This project is licensed under the ${readmeTemplate.license} license.

## Contributing
${readmeTemplate.contributing}

## Tests
${readmeTemplate.tests}

## Questions
If you have any questions, please contact ${readmeTemplate.github} at ${readmeTemplate.email}.

`;

  fs.writeFile('README.md', readmeContent, (err) => {
    if (err) throw err;
    console.log('README file created!');
  });
});
