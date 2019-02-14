/**
 * Problem: https://leetcode.com/problems/two-sum/description/
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums, target) => {
  let numMap = {};
  let len = nums.length;

  for (let i = 0; i < len; i++) {
    let key = target - nums[i];
    if (numMap[key] !== undefined) {
      return [numMap[key], i];
    } else {
      numMap[nums[i]] = i;
    }
  }
};

module.exports = twoSum;
