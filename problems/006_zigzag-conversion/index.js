/**
 * Problem: https://leetcode.com/problems/zigzag-conversion/description/
 */

const zigzagConversion = (s, numRows) => {
  if (1 == numRows) return s;
  let ret = '';
  let len = s.length;
  let cycleLen = 2 * numRows - 2; // 每几个单位循环一次

  for (let i = 0; i < numRows; i++) {
    // 先遍历行，根据规律拼接每行的单位
    for (let j = 0; j + i < len; j += cycleLen) {
      ret += s.charAt(j + i);
      if (i != 0 && i != numRows - 1 && j + cycleLen - i < len) {
        ret += s.charAt(j + cycleLen - i);
      }
    }
  }

  return ret.toString();
};

module.exports = zigzagConversion;
