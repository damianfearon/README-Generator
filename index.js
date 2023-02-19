const inquirer = require('inquirer');
const fs = require('fs');

const licenses = [
  {name: 'Apache 2.0', value: 'apache-2.0'},
  {name: 'GNU GPLv3', value: 'gpl-3.0'},
  {name: 'MIT', value: 'mit'},
  {name: 'BSD 3', value: 'bsd-3'},
  {name: 'None', value: 'none'}
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
    badge: `![License: ${answers.license}](https://img.shields.io/badge/License-${answers.license}-brightgreen.svg)`,
    contributing: answers.contributing,
    tests: answers.tests,
    github: answers.github,
    email: answers.email
  };

  let licenseBadge;
  if (readmeTemplate.license === 'mit') {
      licenseBadge = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
  } else if (readmeTemplate.license === 'apache-2.0') {
      licenseBadge = `[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
  } else if (readmeTemplate.license === 'gpl-3.0') {
      licenseBadge = `[![License: GPL 3.0](https://img.shields.io/badge/License-GPL%203.0-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
  } else if (readmeTemplate.license === 'bsd-3') {
      licenseBadge = `[![License: BSD 3-Clause](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`;
  } else {
      licenseBadge = `![License: None](https://img.shields.io/badge/License-None-red.svg)`;
  }
  
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
  ${readmeTemplate.badge}
  
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
