// Creation de la donnée
const artists = [
    { id: "1", name: "Alice", genre: "Rock", stage: "" },
    { id: "2", name: "Bob", genre: "Jazz", stage: "" },
    { id: "3", name: "Charlie", genre: "Pop", stage: "" },
    { id: "4", name: "David", genre: "Hip-Hop", stage: "" },
    { id: "5", name: "Eve", genre: "Electronic", stage: "" },
    { id: "6", name: "Frank", genre: "Rock", stage: "" },
    { id: "7", name: "Grace", genre: "Jazz", stage: "" },
    { id: "8", name: "Hank", genre: "Pop", stage: "" },
    { id: "9", name: "Ivy", genre: "Hip-Hop", stage: "" },
    { id: "10", name: "Jack", genre: "Electronic", stage: "" }
];
  
const stages = [
    { id: "A", name: "Main Stage", genres: ["Rock", "Pop"] },
    { id: "B", name: "Jazz Corner", genres: ["Jazz"] },
    { id: "C", name: "Hip-Hop Arena", genres: ["Hip-Hop"] },
    { id: "D", name: "Electronic Dome", genres: ["Electronic"] }
];


//Version de base
function findArtistIndexOld(artists, name) {
for (let i = 0; i < artists.length; i++) {
    if (artists[i].name === name) {
    return artists[i].id;
    }
}
return -1;
}


//Version imaginer sur ma copie papier
function findArtistIndexNew(artists, name) {

    let left = 0, right = artists.length - 1;
  
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      
      if (artists[mid].name === name) {
        return artists[mid].id;
      } else if (artists[mid].name < name) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  
    return -1;
}

//version générer par chat GPT
function findArtistIndex(artists, name) {
    const artistMap = Object.fromEntries(artists.map(artist => [artist.name, artist.id]));
    return artistMap[name] || -1;
}

//Version de base
function assignStagesOld(artists, stages) {
    for (let stage of stages) {
      for (let artist of artists) {
        if (stage.genres.includes(artist.genre)) {
          artist.stage = stage.id;
          break;
        }
      }
    }
  }


//Version imaginer sur ma copie papier
function assignStagesNew(artists, stages) {
    // Création d'une map associant chaque genre à un stage
    const stageMap = new Map();
    
    for (let stage of stages) {
        if (Array.isArray(stage.genres)) { // Vérifie que genres est bien un tableau
            for (let genre of stage.genres) {
                stageMap.set(genre, stage.id);
            }
        }
    }
    
    // Assignation des artistes aux scènes correspondantes
    for (let artist of artists) {
        if (stageMap.has(artist.genre)) {
            artist.stage = stageMap.get(artist.genre);
        }
    }
}

// Monitoring de l'execution de l'algo
//Utilisation de Jack (pire situation)
const start = performance.now();
const result = findArtistIndexOld(artists, "Jack");
const end = performance.now();

const start2 = performance.now();
const result2 = findArtistIndexNew(artists, "Jack");
const end2 = performance.now();

const start3 = performance.now();
const result3 = findArtistIndex(artists, "Jack");
const end3 = performance.now();
console.log(`Result Old : ${result} Elapsed time ${end - start} ms \nResult New : ${result2} Elapsed time ${end2 - start2} ms\nResult Chat GPT : ${result3} Elapsed time ${end3 - start3} ms`);

const start4 = performance.now();
const result4 = assignStagesNew(artists, "Jack");
const end4 = performance.now();

console.log(`Result : ${artists} Elapsed time ${end4 - start4} ms `);

function benchmark(name, algorithms, iterations, testArgs) {
    console.log(`\nRunning Benchmark: ${name}`);
    
    let results = [];
    
    for (let [algoName, algoFunction] of Object.entries(algorithms)) {
        let totalTime = 0;
        
        for (let i = 0; i < iterations; i++) {
            const start = performance.now();
            algoFunction(...testArgs);
            const end = performance.now();
            totalTime += (end - start);
        }
        
        let avgTime = totalTime / iterations;
        results.push({ name: algoName, time: avgTime });
        console.log(`${algoName} - Average Time: ${avgTime.toFixed(4)} ms`);
    }
    
    results.sort((a, b) => a.time - b.time);
    console.log(`\nFastest: ${results[0].name} - ${results[0].time.toFixed(4)} ms`);
    console.log(`Slowest: ${results[results.length - 1].name} - ${results[results.length - 1].time.toFixed(4)} ms`);
}

function containsDuplicate(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] === array[j]) {
                return true;
            }
        }
    }
    return false;
}

function containsDuplicateSet(array) {
    return new Set(array).size !== array.length;
}

function findCommonElements(array1, array2) {
    let commonElements = [];
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
            if (array1[i] === array2[j]) {
                commonElements.push(array1[i]);
            }
        }
    }
    return commonElements;
}

function findCommonElementsSet(array1, array2) {
    const set1 = new Set(array1);
    return array2.filter(item => set1.has(item));
}

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function fibonacciIterative(n) {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        let temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

const testArray1 = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
const testArray2 = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
const testN = 20;

benchmark("Contains Duplicate", { "Nested Loop": containsDuplicate, "Set Method": containsDuplicateSet }, 1000, [testArray1]);
benchmark("Find Common Elements", { "Nested Loop": findCommonElements, "Set Method": findCommonElementsSet }, 1000, [testArray1, testArray2]);
benchmark("Fibonacci Calculation", { "Recursive": fibonacci, "Iterative": fibonacciIterative }, 100, [testN]);
