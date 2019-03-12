import { setAttr ,render ,Element } from './Element';

let allPatches;
let index = 0;

const ATTRS = "ATTRS";
const TEXT = "TEXT";
const REMOVE = "REMOVE";
const REPLACE = 'REPLACE';

function patch(node,patches){
	allPatches = patches;
	walk(node);
}

function walk(node){
	let currentPatches = allPatches[index++];
	let childNodes = node.childNodes;
	childNodes.forEach((child)=>walk(child));
	if(currentPatches){
		doPatch(node,currentPatches);
	}
}

function doPatch(node,currentPatches){
	currentPatches.forEach(patch=>{
		switch(patch.type){
			case ATTRS:
				for(let key in patch.attrs){
					if(typeof patch.attrs[key]=="undefined"){
						node.removeAttribute(key);
					}else{
					  setAttr(node,key,patch.attrs[key]);
					}

				}
				break;
			case TEXT:
			   console.log(patch.text)
				node.textContent = patch.text;
				break;
			case REPLACE:
				const newNode = (patch.newNode instanceof Element)?
				render(patch.newNode):document.createTextNode(patch.newNode);
				node.parentNode.replaceChild(newNode,node);
				break;
			case REMOVE:
			 	node.parentNode.removeChild(node);
			 	break;
			default:
				break;

		}
	})
}

export default patch;
