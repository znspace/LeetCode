# My LeetCode

[![Build Status](https://travis-ci.org/ZNspace/LeetCode.svg?branch=master)](https://travis-ci.org/ZNspace/LeetCode)

## Description
This is the repo of my LeetCode solutions, and currently I just use JavaScript to solve the questions, maybe in the future, I will use other languages I like to get the ALL PASS grade.

## Features

First of all, you need to install all dependencis:

    npm i

### Fetch Problems in Terminal

By executing the command you can browse all the problems in your terminal, and select any one to solve.

    npm run question

### Test Cases

I've used [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) to test the programs, the test cases are defined in the `problems/*/test-cases.js`:

    npm test                    # test all test cases
    npm test [problem number]   # test single problem

## Submissions

This table lists all the submissions in this repo, and there is a command provided to update this part.

    npm run generate-readme


| Sequence | Title        | Difficulty | Submission       |
| -------- | :----------- | :--------: | :--------------- |
| 1        | [Two Sum][1] |    Easy    | [001_two-sum][2] |

[1]: https://leetcode.com/problems/two-sum/
[2]: https://github.com/MrHuxu/leetcode/blob/master/problems/001_two-sum/index.js