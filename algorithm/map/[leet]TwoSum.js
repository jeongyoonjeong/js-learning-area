/*
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

 

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Output: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]

*/

var twoSum = function(nums, target) {
    var map = {};
    
    //nums를 돌면서 target-num 값을 key , idx를 value로 저장 
    for(var i = 0; i < nums.length; i++){
        //차이값 계산
        var diff = target - nums[i];
        // 만약 target-num한 값이 이미 key가 존재한다면, 저장된 idx와 현재 idx를 반환
        if(map[nums[i]] !== undefined){ return [map[nums[i]],i];}
        
        // 차이값을 key로 해서 저장 
        map[diff] = i;
    }
    return [];
};