const superagent = require('superagent');
const { error } = require('better-console');
const { load } = require('cheerio');

const { resolve } = require('path');

const LEETCODE_URL = 'https://leetcode.com/problems/';
const ALGORITHM_URL = 'https://leetcode.com/api/problems/algorithms/';

const README_PATH = resolve(__dirname, '..', 'README.md');
const DIFFICULTY_MAP = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };

const formatId = id => {
  id = id.toString();
  while (id.length < 3) id = '0' + id;
  return id;
};

const problemPath = (id, slug) => resolve(__dirname, `../algorithms/javascript/${formatId(id)}_${slug}`);

const clearConsole = () => process.stdout.write('win32' === process.platform ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');

const parseQuestionDetails = chunk =>
  JSON.parse(chunk).stat_status_pairs.map(pair => {
    const { stat, paid_only: paidOnly, difficulty } = pair;
    const { question__article__slug, question__title_slug, frontend_question_id, question__title: title, total_acs: totalAcs, total_submitted: totalSubmitted } = stat;
    const { level } = difficulty;
    return {
      paidOnly,
      title,
      totalAcs,
      totalSubmitted,
      id         : frontend_question_id,
      difficulty : level,
      slug       : question__title_slug || question__article__slug,
    };
  });

const getInfosFromPagedata = chunk => {
  const $ = load(chunk);

  return {
    code        : '',
    /*
     * pageData.codeDefinition.find(definition => 'javascript' === definition.value).defaultCode,
     * it won't work anymore since leetcode now use graphql to load code
     * definition dynamically and all the requests need to be authenticated
     */
    description : $('meta[name=description]')[0].attribs['content'],
  };
};
const getQuestionsDetails = async () => {
  try {
    const res = await superagent.get(ALGORITHM_URL).type('application/json');
    return parseQuestionDetails(res.text);
  } catch (err) {
    error(err);
  }
};

const getQuestionContent = async question => {
  try {
    const { id, slug } = question;
    const res = await superagent.get(`${LEETCODE_URL}${slug}`).type('application/json');
    return { id, slug, ...getInfosFromPagedata(res.text) };
  } catch (err) {
    error(err);
  }
};

const HTML_TRANSLATE_RE = /&(nbsp|amp|#39|quot|lt|gt);/g;
const HTML_TRANSLATES = {
  nbsp  : ' ',
  amp   : '&',
  '#39' : '\'',
  quot  : '"',
  lt    : '<',
  gt    : '>',
};

const unescapeHTML = text => {
  return text.replace(HTML_TRANSLATE_RE, (match, type) => {
    return HTML_TRANSLATES[type];
  });
};

module.exports = {
  LEETCODE_URL,
  ALGORITHM_URL,
  README_PATH,
  DIFFICULTY_MAP,

  problemPath,
  clearConsole,
  getQuestionsDetails,
  getQuestionContent,
  unescapeHTML,
};
