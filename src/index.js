import { VNode,normalizeChildren } from './VNode';
export {createElm} from './VNode';
export {patch} from './patch';

export function createElement( tag, props, ...children ) {
	if(children){
		children = normalizeChildren(children);
	}
	return new VNode(tag,props,children);
}
    


// patch(element,element_1)