export function buildTree(nodeList){
	function build(parentId){
		let subNodeList = nodeList.filter(v => v.parentId == parentId)
		let node = nodeList.find(v => v.id == parentId)
		node.children = []
		subNodeList.forEach(v => {
			node.children.push(build(v.id))
		})
		return node
	}
}
