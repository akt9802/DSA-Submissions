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
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> ans;
        if(root == NULL){
            return ans;
        }
        while(root){
            if(root->left == NULL){
                ans.push_back(root->val);
                root = root->right;
            }else{
                // root left exist
                TreeNode* curr = root->left;
                while(curr->right && curr->right != root){
                    curr = curr->right;
                }
                if(curr->right == NULL){
                    // not traversed
                    curr->right = root;
                    ans.push_back(root->val);
                    root = root->left;
                }
                else{
                    // traversed
                    curr->right = NULL;
                    root = root->right;
                }
            }
        }
        return ans;
    }
};