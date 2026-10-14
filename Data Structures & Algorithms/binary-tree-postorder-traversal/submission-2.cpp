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
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> ans;
        while(root){
            if(root->right == NULL){
                ans.push_back(root->val);
                root = root->left;
            }
            else{
                // root right exists
                TreeNode* curr = root->right;
                while(curr->left && curr->left!=root){
                    curr = curr->left;
                }
                // 2 cases 
                if(curr->left == NULL){
                    curr->left = root;
                    ans.push_back(root->val);
                    root = root->right;
                }else{
                    // allready traversed 
                    curr->left = NULL;
                    root = root->left;
                }
            }
        }

        int i = 0;
        int j = ans.size()-1;
        while(i<j){
            swap(ans[i],ans[j]);
            i++;
            j--;
        }
        return ans;
    }
};