/**
 * Problem: https://leetcode.com/problems/longest-substring-without-repeating-characters/description/
 */

const longestSubstringWithoutRepeatingCharacters = s => {
  const map = {};
  let num = 0,
    last = -1; // 定义滑动指针坐标
  for (let i = 0, l = s.length; i < l; ++i) {
    if (map[s[i]] > last) {
      // 更新指针位置
      last = map[s[i]];
    }
    if (i - last > num) {
      num = i - last;
    }
    map[s[i]] = i;
  }
  return num;
};

//
// function lengthOfLongestSubstring(s) {
//   const map = {};
//   let left = 0;

//   return s.split('').reduce((max, v, i) => {
//     left = map[v] >= left ? map[v] + 1 : left;
//     map[v] = i;
//     return Math.max(max, i - left + 1);
//   }, 0);
// }

module.exports = longestSubstringWithoutRepeatingCharacters;
