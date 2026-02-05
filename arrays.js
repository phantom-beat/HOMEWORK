// Array de ejemplo inicial para demostraciones
let frutas = ['manzana', 'banana', 'cereza', 'durazno'];
console.log('Array inicial:', frutas);

// ============================================
// 1. Métodos Mutadores (Modifican el array original)
// ============================================

// push(): Agrega elementos al final
frutas.push('fresa');
console.log('Después de push:', frutas);

// pop(): Elimina y retorna el último elemento
let ultima = frutas.pop();
console.log('Después de pop:', frutas, 'Elemento eliminado:', ultima);

// unshift(): Agrega elementos al inicio
frutas.unshift('arándano');
console.log('Después de unshift:', frutas);

// shift(): Elimina y retorna el primer elemento
let primera = frutas.shift();
console.log('Después de shift:', frutas, 'Elemento eliminado:', primera);

// splice(): Elimina/reemplaza elementos
frutas.splice(1, 1, 'kiwi'); // Elimina 1 en posición 1, agrega 'kiwi'
console.log('Después de splice:', frutas);

// reverse(): Invierte el array
frutas.reverse();
console.log('Después de reverse:', frutas);

// sort(): Ordena el array
frutas.sort();
console.log('Después de sort:', frutas);

// fill(): Rellena array con valor
let arrayLleno = new Array(3).fill('hola');
console.log('Fill:', arrayLleno);

// copyWithin(): Copia parte del array dentro de sí mismo
let copia = [1, 2, 3, 4, 5];
copia.copyWithin(0, 3); // Copia desde pos 3 a pos 0
console.log('CopyWithin:', copia);

// ============================================
// 2. Métodos Accesores (No modifican el original, retornan nuevo valor)
// ============================================

// concat(): Une arrays
let verduras = ['zanahoria', 'lechuga'];
let combinado = frutas.concat(verduras);
console.log('Después de concat:', combinado);

// slice(): Extrae una porción
let porcion = frutas.slice(1, 3);
console.log('Slice (1-3):', porcion);

// join(): Convierte array a string
let cadena = frutas.join(', ');
console.log('Join:', cadena);

// indexOf(): Encuentra índice de valor específico
let indiceBanana = frutas.indexOf('banana');
console.log('IndexOf (banana):', indiceBanana);

// lastIndexOf(): Encuentra último índice de valor
frutas.push('banana'); // Duplicar para demo
let ultimoBanana = frutas.lastIndexOf('banana');
console.log('LastIndexOf (banana):', ultimoBanana);

// includes(): Verifica si incluye valor
let tieneCereza = frutas.includes('cereza');
console.log('Includes (cereza):', tieneCereza);

// toString(): Convierte a string
console.log('ToString:', frutas.toString());

// toLocaleString(): Convierte a string localizado
console.log('ToLocaleString:', frutas.toLocaleString());

// flat(): Aplana array anidado
let anidado = [1, [2, [3]]];
let plano = anidado.flat(2); // Profundidad 2
console.log('Flat:', plano);

// flatMap(): Mapea y aplana
let numeros = [1, 2, 3, 4];
let mapeadoPlano = numeros.flatMap((num) => [num, num * 2]);
console.log('FlatMap:', mapeadoPlano);

// ============================================
// 3. Métodos de Iteración (Recorren el array y aplican funciones)
// ============================================

// forEach(): Ejecuta función por cada elemento
frutas.forEach((fruta) => console.log('forEach:', fruta));

// map(): Crea nuevo array transformado
let mayusculas = frutas.map((fruta) => fruta.toUpperCase());
console.log('Map:', mayusculas);

// filter(): Crea nuevo array con elementos que cumplen condición
let largas = frutas.filter((fruta) => fruta.length > 5);
console.log('Filter (longitud >5):', largas);

// reduce(): Reduce array a un valor único
let suma = numeros.reduce((acc, num) => acc + num, 0);
console.log('Reduce (suma):', suma);

// reduceRight(): Reduce de derecha a izquierda
let producto = numeros.reduceRight((acc, num) => acc * num, 1);
console.log('ReduceRight (producto):', producto);

// every(): Verifica si todos cumplen condición
let todosPares = numeros.every((num) => num % 2 === 0);
console.log('Every (todos pares):', todosPares);

// some(): Verifica si al menos uno cumple condición
let algunPar = numeros.some((num) => num % 2 === 0);
console.log('Some (algún par):', algunPar);

// find(): Encuentra primer elemento que cumple
let mayorTres = numeros.find((num) => num > 3);
console.log('Find (>3):', mayorTres);

// findIndex(): Encuentra índice del primer que cumple
let indiceMayorTres = numeros.findIndex((num) => num > 3);
console.log('FindIndex (>3):', indiceMayorTres);

// keys(): Iterador de claves (índices)
for (let key of frutas.keys()) {
  console.log('Keys:', key);
}

// values(): Iterador de valores
for (let value of frutas.values()) {
  console.log('Values:', value);
}

// entries(): Iterador de [índice, valor]
for (let [i, v] of frutas.entries()) {
  console.log('Entries:', i, v);
}

// ============================================
// 4. Métodos Estáticos (Del constructor Array)
// ============================================

// from(): Crea array desde iterable
let desdeString = Array.from('hola');
console.log('From:', desdeString);

// of(): Crea array de argumentos
let deArgs = Array.of(1, 2, 3);
console.log('Of:', deArgs);

// isArray(): Verifica si es array
console.log('IsArray (frutas):', Array.isArray(frutas));

// Nota: Estos son los métodos principales de Array.prototype y Array.
// Algunos como Symbol.iterator están implícitos en bucles for-of.
