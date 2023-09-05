import { BuenosAiresNode, Node } from "./nodes.js"
import GameBoard from "./gameBoard.js"

export const printMapAsDotDiagram = () => {
	console.log("digraph Game {")
	new Set(nodeEdges(GameBoard.START)).forEach((line) => console.log(`\t${line}`))
	console.log("}")
}

export const ordinal = (number: number): string => {
	return `${number}${number === 1 ? "st" : number === 2 ? "nd" : number === 3 ? "rd" : "th"}`
}

export function getAllCombinations<T>(arr: T[]): T[][] {
	const results: T[][] = []

	function generateCombinations(current: T[], start: number, length: number) {
		if (length === 0) {
			results.push([...current])
			return
		}

		for (let i = start; i < arr.length; i++) {
			current.push(arr[i])
			generateCombinations(current, i + 1, length - 1)
			current.pop()
		}
	}

	for (let len = 1; len <= arr.length; len++) {
		generateCombinations([], 0, len)
	}

	return results
}

const nodeEdges = (node: Node): string[] => {
	return node.nextNonEmptyDescendants().reduce((previousValue: string[], child: Node) => {
		if (child instanceof BuenosAiresNode) {
			return previousValue
		}
		if (!node.isEmpty() && !child.isEmpty() && !previousValue.includes(`${node.constructor.name} -> ${child.constructor.name}`)) {
			previousValue.push(`${node.constructor.name} -> ${child.constructor.name}`)
		}
		return previousValue.concat(nodeEdges(child))
	}, new Array<string>())
}
