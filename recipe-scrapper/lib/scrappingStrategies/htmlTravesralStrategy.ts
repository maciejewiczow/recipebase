import { NodeType, Node } from 'node-html-parser';
import { Strategy } from './strategy';
import { names as unitNames } from 'utils/unitNames.json';
import { Ingredient } from 'recipe';
import { parseIngredient } from 'utils/parseIngredient';

const traverseDOM = (document: Node, visitor: (node: Node) => any) => {
    visitor(document);

    for (const child of document.childNodes)
        traverseDOM(child, visitor);
};

const nodeDepth = (node: Node): number => {
    let current = node;

    let depth = 0;
    for (; current.parentNode; depth++)
        current = current.parentNode;

    return depth;
};

const lowestCommonAncestor = (aParam: Node, bParam: Node): Node => {
    let a = aParam;
    let b = bParam;

    let aDepth = nodeDepth(a);
    let bDepth = nodeDepth(b);

    while (aDepth !== bDepth) {
        if (aDepth > bDepth) {
            a = a.parentNode;
            aDepth--;
        } else {
            b = b.parentNode;
            bDepth--;
        }
    }

    while (a !== b) {
        a = a.parentNode;
        b = b.parentNode;
    }

    return a;
};

export const htmlTraversalStrategy: Strategy = document => {
    let firstIngredientNode: Node | undefined;
    let bestIngredientScore = 0;
    let firstInstructionNode: Node | undefined;
    let bestInstructionScore = 0;

    traverseDOM(document, node => {
        if (node.nodeType !== NodeType.TEXT_NODE)
            return;

        if (node.innerText.trim().length === 0)
            return;

        const text = node.innerText.trim();
        const ingredientScore = calculateIngredientScore(text);

        if (ingredientScore > bestIngredientScore) {
            firstIngredientNode = node;
            bestIngredientScore = ingredientScore;
        }

        const instructionScore = calculateInstructionScore(text);

        if (instructionScore > bestInstructionScore) {
            firstInstructionNode = node;
            bestInstructionScore = instructionScore;
        }
    });

    if (!firstInstructionNode || !firstIngredientNode)
        return {};

    const lca = lowestCommonAncestor(firstInstructionNode, firstIngredientNode);

    const contents = lca.innerText.split('\n').map(t => t.trim()).filter(x => x.length > 0);
    const instructions: string[] = [];
    const ingredients: Ingredient[] = [];

    for (const candidate of contents) {
        if (calculateIngredientScore(candidate) > 40)
            ingredients.push(parseIngredient(candidate));
        else if (calculateInstructionScore(candidate) > 10)
            instructions.push(candidate);
    }

    return { ingredients, steps: instructions };
};

function calculateInstructionScore(text: string) {
    let instructionScore = 0;

    if (text.match(/^[A-ZĘÓĄŚŁŻŹĆŃ]/))
        instructionScore += 10;

    if (text.length > 100)
        instructionScore += 10;

    if (text.match(/\.$/))
        instructionScore += 15;

    return instructionScore;
}

function calculateIngredientScore(text: string) {
    let ingredientScore = 0;

    if (text.match(/^\d/))
        ingredientScore += 30;

    if (text.split('.').length < 3)
        ingredientScore += 30;

    if (unitNames.find(unit => text.includes(unit + ' ')))
        ingredientScore += 30;

    return ingredientScore;
}

