const sample = `
# Hello World!
This is a live markdown previewer app developed by [**JamCry**](https://github.com/jamcry). This project is a part of the freeCodeCamp Front-end Libraries course.

## Cheatsheet
- Inline \`code\` insertion => Inline \`code\` insertion
- \`\`\`*Your Text*\`\`\` => *Your Text*

- \`\`\`**Your Text**\`\`\` => **Your Text**

- \`\`\`[Your Link](https://linkadress.com)\`\`\` => [Your Link](https://linkadress.com)

For more, search for markdown formatting.

## Try now!
You are ready to try now! Use the input area titled "MARKDOWN" to edit this text.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

`;

export default sample;
