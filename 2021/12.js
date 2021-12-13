const { aocService } = require('../service/aocc');

const client = aocService(2021, 12);

const checkIfDuplicateExists = (array) => new Set(array).size !== array.length;

const dfs = (graph, node, currentPath = [], extraCave = false) => {
  const nextPath = [...currentPath, node];
  const allPaths = [];

  if (node === 'end') {
    return [nextPath];
  }

  graph[node].forEach((nextNode) => {
    if (nextNode.toLowerCase() === nextNode) {
      if (!extraCave && currentPath.includes(nextNode)) {
        return;
      }

      if (extraCave) {
        const filteredPath = currentPath
          .filter((innerNode) => innerNode.toLowerCase() === innerNode);

        if (nextNode === 'start') {
          return;
        }

        if (
          checkIfDuplicateExists(filteredPath)
          && filteredPath.includes(nextNode)
        ) {
          return;
        }
      }
    }

    allPaths.push(...dfs(graph, nextNode, nextPath, extraCave));
  });

  return allPaths;
};

const part1 = (data) => {
  const paths = dfs(data, 'start', []);
  console.log(paths.length);
};

const part2 = (data) => {
  const paths = dfs(data, 'start', [], true);
  console.log(paths.length);
};

const main = async () => {
  const input = await client.getInput();

  const graph = {};

  const edges = input.split('\n').map((line) => line.split('-'));

  edges.forEach(([nodeA, nodeB]) => {
    if (graph[nodeA] === undefined) {
      graph[nodeA] = [nodeB];
    } else {
      graph[nodeA].push(nodeB);
    }

    if (graph[nodeB] === undefined) {
      graph[nodeB] = [nodeA];
    } else {
      graph[nodeB].push(nodeA);
    }
  });

  part1(graph);
  part2(graph);
};

if (require.main === module) {
  main();
}
