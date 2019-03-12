// 对比前后两棵树 之前的差别 返回一个补丁对象
function diff(oldTree,newTree){

	let patches = {}; //补丁包
	let index = 0; //当前的节点的标志。因为在深度优先遍历的过程中，每个节点都有一个index。
	walk(oldTree,newTree,index,patches); // 开始进行深度优先遍历
	return patches; //最终返回两棵树的差异
}

//对比属性的不同 props
function diffAttr(oldAttrs,newAttrs){
	let patch = {} //差异化props
	//更新
	for(let attr in oldAttrs){
		if(oldAttrs[attr]!== newAttrs[attr]){
			patch[attr] = newAttrs[attr]
		}
	}
	//新增
	for(let attr in newAttrs){
		if(!oldAttrs.hasOwnProperty(attr)){
			patch[attr] = newAttrs[attr]
		}
	}
	return patch;
}

const ATTRS = "ATTRS";
const TEXT = "TEXT";
const REMOVE = "REMOVE";
const REPLACE = 'REPLACE';
let Index = 0; //针对children 深度优化遍历 当前的节点的标志

//递归遍历子节点的不同
function diffChildren(oldNode,newNode,index,patches){
	debugger
	oldNode.forEach((child,idx)=>{
		walk(child ,newNode[idx],++Index,patches)
	})
}

function isString(node){
	return Object.prototype.toString.call(node)=="[object String]";
}


// 具体的对比方法   对两棵树进行深度优先遍历。
function walk(oldNode,newNode,index,patches){
	let currentPatches = [];

	if(!newNode){ //没有新的节点。删除
		currentPatches.push({type:REMOVE,index});
	}else if(isString(oldNode)&&isString(newNode)){ //判断文本是否变换
		if(oldNode!==newNode){
			currentPatches.push({type:TEXT,text:newNode});
		}
	}else if(oldNode.tagName === newNode.tagName){ //tagName 相同 判断属性
		let attrs = diffAttr(oldNode.props,newNode.props); //patch's props
		//将patch添加到此轮比较的补丁包里
		if(Object.keys(attrs).length>0){
			currentPatches.push({type:ATTRS,attrs})
		}
		//比较children
		diffChildren(oldNode.children,newNode.children,index,patches)
	}else{
		//节点被替换了
		currentPatches.push({type:REPLACE,newNode})
	}
	if(currentPatches.length>0){  //产生补丁包
		patches[index] = currentPatches;
	}
}

export default diff;
