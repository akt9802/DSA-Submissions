/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */

class Solution {
public:
    int solve(TreeNode* root,int& ans){
        // base case
        if(root == NULL){
            return 0;
        }

        int leftMax = solve(root->left,ans);
        int rightMax = solve(root->right,ans);

        ans = max(ans,leftMax+rightMax);
        return max(leftMax,rightMax)+1;
    }
    int diameterOfBinaryTree(TreeNode* root) {
        // left and right distance by standing on a particular node
        if(root == NULL){
            return 0;
        }

        int ans=0;
        int temp = solve(root,ans);
        return ans;
    }
};
