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
        ListNode* prev = NULL;
        ListNode* front = NULL;
        while(curr != NULL){
            front = curr->next;
            curr->next = prev;
            prev = curr;
            curr = front;
        }
        return prev;
    }
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        ListNode dummy(0);
        dummy.next = head;

        ListNode* before = &dummy;
        for(int i=1;i<left;i++){
            before = before->next;
        }

        ListNode* start = before->next;
        ListNode* after = start;
        for(int i=left;i<right;i++){
            after = after->next;
        }

        ListNode* remaining = after->next;

        // detach the sublist 
        after->next = NULL;
        
        ListNode* reversedHead = reverseList(start);

        before->next = after;
        start->next = remaining;
        return dummy.next;
    }
}; 