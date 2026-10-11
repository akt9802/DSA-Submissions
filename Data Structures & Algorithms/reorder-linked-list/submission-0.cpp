/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */

class Solution {
public:
    ListNode* reverseList(ListNode* head){
        ListNode* curr = head;
        ListNode* front = NULL;
        ListNode* prev = NULL;
        while(curr != NULL){
            front = curr->next;
            curr->next = prev;
            prev = curr;
            curr = front;
        }
        return prev;
    }
    void reorderList(ListNode* head) {
        // think of reversing linked list 
        
        ListNode* slow = head;
        ListNode* fast = head;
        while(fast!=NULL && fast->next!=NULL){
            slow = slow->next;
            fast = fast->next->next;
        }

        ListNode* second = slow->next;
        slow->next = NULL;

        ListNode* l1 = head;
        ListNode* l2 = reverseList(second);

        ListNode dummy(0);
        ListNode* mover = &dummy;

        while(l1!=NULL || l2!=NULL){
            if(l1 != NULL){
                mover->next = l1;
                l1 = l1->next;
                mover= mover->next; 
            }
            if(l2 != NULL){
                mover->next = l2;
                l2 = l2->next;
                mover = mover->next;
            }
        }    
    }
};
