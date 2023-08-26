import { BuenosAiresNode, Node } from "./nodes.js"
import Map from "./map.js"

export const printMapAsDotDiagram = (map: Map) => {
	console.log("digraph Game {")
	new Set(nodeEdges(map.start)).forEach((line) => console.log(`\t${line}`))
	console.log("}")
}

const nodeEdges = (node: Node): string[] => {
	return node
		.nextNonEmptyDescendants()
		.reduce((previousValue: string[], child: Node) => {
			if (child instanceof BuenosAiresNode) {
				return previousValue
			}
			if (
				!node.isEmpty() &&
				!child.isEmpty() &&
				!previousValue.includes(
					`${node.constructor.name} -> ${child.constructor.name}`,
				)
			) {
				previousValue.push(
					`${node.constructor.name} -> ${child.constructor.name}`,
				)
			}
			return previousValue.concat(nodeEdges(child))
		}, new Array<string>())
}
