/**
 * Problem: https://leetcode.com/problems/palindrome-number/description/
 */

/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = x => {
  if (x < 0 || 0 === x % 10) return false;
  if (x < 10) return true;
  let temp = 0;
  while (x > temp) {
    temp = (x % 10) + temp * 10;
    x = parseInt(x / 10);
  }
  if (x === temp || parseInt(temp / 10) === x) return true;
};

module.exports = isPalindrome;
