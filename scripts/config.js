const { resolve } = require('path');

const DEFAULT_CONFIG = {
  // usually you don't wanna change those
  sys : {
    categories : ['algorithms', 'database', 'shell'],
    langs      : ['bash', 'c', 'cpp', 'csharp', 'golang', 'java', 'javascript', 'kotlin', 'mysql', 'python', 'python3', 'ruby', 'rust', 'scala', 'swift'],
    urls       : {
      base            : 'https://leetcode.com',
      graphql         : 'https://leetcode.com/graphql',
      login           : 'https://leetcode.com/accounts/login/',
      problems        : 'https://leetcode.com/api/problems/$category/',
      problem         : 'https://leetcode.com/problems/$slug/description/',
      test            : 'https://leetcode.com/problems/$slug/interpret_solution/',
      session         : 'https://leetcode.com/session/',
      submit          : 'https://leetcode.com/problems/$slug/submit/',
      submissions     : 'https://leetcode.com/api/submissions/$slug',
      submission      : 'https://leetcode.com/submissions/detail/$id/',
      verify          : 'https://leetcode.com/submissions/detail/$id/check/',
      favorites       : 'https://leetcode.com/list/api/questions',
      favorite_delete : 'https://leetcode.com/list/api/questions/$hash/$id',
      plugin          : 'https://github.com/skygragon/leetcode-cli-plugins/raw/master/plugins/$name.js',
    },
  },
};

const PROBLEMS_PATH = resolve(__dirname, '..', 'problems');
const README_BASE_PATH = resolve(__dirname, 'readme-base.txt');
const README_PATH = resolve(__dirname, '..', 'README.md');

module.exports = {
  DEFAULT_CONFIG,
  PROBLEMS_PATH,
  README_BASE_PATH,
  README_PATH,
};
