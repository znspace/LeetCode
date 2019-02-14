/**
 * Problem: https://leetcode.com/problems/add-two-numbers/description/
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

const addTwoNumbers = (l1, l2) => {
  const handle = (node1, node2, value = 0) => {
    if (!node1 && !node2 && 0 == value) return null;
    if (node1) value += node1.val;
    if (node2) value += node2.val;
    const next = handle(node1 ? node1.next : node1, node2 ? node2.next : node2, parseInt(value / 10));
    return { val: value > 9 ? value - 10 : value, next };
  };
  return handle(l1, l2);
};

module.exports = addTwoNumbers;
