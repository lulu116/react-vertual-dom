#### 了解react虚拟dom， diff, patch过程
* 创建虚拟dom树
* 将虚拟dom树转成真实dom树
* 将新产生的虚拟dom树与上一次的虚拟dom树进行比较，产生patch补丁包
* 将补丁包更新到真实dom树
* 将dom挂载到页面某元素下面

虚拟 dom的存在是为了加速浏览器的渲染速度，以最优的情况来操作dom
详情请参考https://blog.csdn.net/lulu_678/article/details/88424401
