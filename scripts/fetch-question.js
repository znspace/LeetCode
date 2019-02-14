const { writeFileSync, mkdirSync, existsSync } = require('fs');
const { prompt } = require('inquirer');
const { info } = require('better-console');

const { DIFFICULTY_MAP, problemPath, clearConsole, formatId, getQuestionsDetails, getQuestionContent, unescapeHTML } = require('./script-utils');

const questionTitle = question => {
  const { id, difficulty, totalAcs, totalSubmitted, title } = question;
  return `${id}\t${DIFFICULTY_MAP[difficulty]}\t${((totalAcs / totalSubmitted) * 100).toString().slice(0, 4)}%\t${title}`;
};

const questionOption = question => {
  let { paidOnly, id, slug } = question;
  if (paidOnly) return { name: questionTitle(question), disabled: 'Paid only' };

  if (existsSync(problemPath(id, slug))) {
    return { name: questionTitle(question), disabled: 'Solved' };
  }
  return questionTitle(question);
};

const mapTitleToQuestion = questions =>
  questions.reduce((pre, curr) => {
    pre[questionTitle(curr)] = curr;
    return pre;
  }, {});

const showQuestionSelection = questions => {
  titleQuestionMap = mapTitleToQuestion(questions);
  return prompt({
    type    : 'list',
    name    : 'title',
    message : 'Which problem do you want to solve?',
    choices : questions.map(questionOption),
  });
};

const actionToQuestion = question => {
  const { id, slug, code, description } = question;
  info(`\n${unescapeHTML(description)}`);
  prompt({
    type    : 'list',
    name    : 'action',
    message : 'Do you want to solve the problem?',
    choices : ['Yes', 'No'],
  }).then(answer => {
    switch (answer.action) {
    case 'Yes':
      createFiles(id, slug, code);
      return;

    case 'No':
      selectAndSolve();
      return;

    default:
      return;
    }
  });
};

const createIndexFile = (submissionName, slug, code) => {
  // const re = /var\ .*\ =\ function/;
  // const funcName = re.exec(code)[0].split(' ')[1];
  const funcName = slug
    .split('-')
    .map((str, i) =>
      i
        ? Array.from(str)
          .map((ch, j) => (j ? ch : ch.toUpperCase()))
          .join('')
        : str
    )
    .join('');

  writeFileSync(
    `./problems/${submissionName}/index.js`,
    `/**
 * Problem: https://leetcode.com/problems/${slug}/description/
 */
` +
      code +
      `
const ${funcName} = () => {

};

module.exports = ${funcName};
`
  );
};

const createTestFile = submissionName => {
  writeFileSync(`./problems/${submissionName}/test-cases.js`, 'module.exports = [];');
};

const createFiles = (id, slug, code) => {
  const submissionName = `${formatId(id)}_${slug}`;
  mkdirSync(`./problems/${submissionName}`);
  createIndexFile(submissionName, slug, code);
  createTestFile(submissionName);

  console.log(`problems/${submissionName}/index.js & problems/${submissionName}/test-cases.js are successfully created!`);
};

let CACHE_QUESTION_DETAILS;
const cacheQuestionDetails = () =>
  new Promise(resolve => {
    if (CACHE_QUESTION_DETAILS !== undefined) {
      resolve(CACHE_QUESTION_DETAILS);
    } else {
      CACHE_QUESTION_DETAILS = getQuestionsDetails();
      resolve(CACHE_QUESTION_DETAILS);
    }
  });

const selectAndSolve = () => {
  clearConsole();
  cacheQuestionDetails()
    .then(questions => showQuestionSelection(questions), err => Promise.reject(err))
    .then(answer => getQuestionContent(titleQuestionMap[answer.title]), err => Promise.reject(err))
    .then(question => actionToQuestion(question));
};

selectAndSolve();
