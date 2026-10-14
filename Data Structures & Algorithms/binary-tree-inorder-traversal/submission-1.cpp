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
    vector<int> inorderTraversal(TreeNode* root) {
        // using morris traversal 
        vector<int> ans;
        if(root == NULL){
            return ans;
        }

        while(root){
            if(root->left == NULL){
                ans.push_back(root->val);
                root = root->right;
            }
            else{
                // root left exist 
                
                TreeNode* curr = root->left;
                while(curr->right && curr->right!=root){
                    curr = curr->right;
                }

                // 2 case
                if(curr->right == NULL){
                    curr->right = root;
                    root = root->left;
                }else{
                    // curr->right == root
                    curr->right = NULL;
                    ans.push_back(root->val);
                    root = root->right;
                }
            }
        }
        return ans;
    }
};