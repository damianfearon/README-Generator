// function to generate markdown for README
function generateDescription(description) {
  return `
## Description
${description}
`;
}

function generateMarkdown(data) {
return `# ${data.title}
${data.description !== '' ? generateDescription(data.description) : ''}
## License
${data.license}
`;
}

module.exports = generateMarkdown;