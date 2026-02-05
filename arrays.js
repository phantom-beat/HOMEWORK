// Array de ejemplo inicial para demostraciones
const frutas = ['manzana', 'banana', 'cereza', 'durazno'];
console.log('Array inicial:', frutas);

// ============================================
// 1. Métodos Mutadores (Modifican el array original)
// ============================================

// push(): Agrega elementos al final
frutas.push('fresa');
console.log('Después de push:', frutas);

// pop(): Elimina y retorna el último elemento
const ultima = frutas.pop();
console.log('Después de pop:', frutas, 'Elemento eliminado:', ultima);

// unshift(): Agrega elementos al inicio
frutas.unshift('arándano');
console.log('Después de unshift:', frutas);

// shift(): Elimina y retorna el primer elemento
const primera = frutas.shift();
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
const arrayLleno = new Array(3).fill('hola');
console.log('Fill:', arrayLleno);

// copyWithin(): Copia parte del array dentro de sí mismo
const copia = [1, 2, 3, 4, 5];
copia.copyWithin(0, 3); // Copia desde pos 3 a pos 0
console.log('CopyWithin:', copia);

// ============================================
// 2. Métodos Accesores (No modifican el original, retornan nuevo valor)
// ============================================

// concat(): Une arrays
const verduras = ['zanahoria', 'lechuga'];
const combinado = frutas.concat(verduras);
console.log('Después de concat:', combinado);

// slice(): Extrae una porción
const porcion = frutas.slice(1, 3);
console.log('Slice (1-3):', porcion);

// join(): Convierte array a string
const cadena = frutas.join(', ');
console.log('Join:', cadena);

// indexOf(): Encuentra índice de valor específico
const indiceBanana = frutas.indexOf('banana');
console.log('IndexOf (banana):', indiceBanana);

// lastIndexOf(): Encuentra último índice de valor
frutas.push('banana'); // Duplicar para demo
const ultimoBanana = frutas.lastIndexOf('banana');
console.log('LastIndexOf (banana):', ultimoBanana);

// includes(): Verifica si incluye valor
const tieneCereza = frutas.includes('cereza');
console.log('Includes (cereza):', tieneCereza);

// toString(): Convierte a string
console.log('ToString:', frutas.toString());

// toLocaleString(): Convierte a string localizado
console.log('ToLocaleString:', frutas.toLocaleString());

// flat(): Aplana array anidado
const anidado = [1, [2, [3]]];
const plano = anidado.flat(2); // Profundidad 2
console.log('Flat:', plano);

// flatMap(): Mapea y aplana
const numeros = [1, 2, 3, 4];
const mapeadoPlano = numeros.flatMap((num) => [num, num * 2]);
console.log('FlatMap:', mapeadoPlano);

// ============================================
// 3. Métodos de Iteración (Recorren el array y aplican funciones)
// ============================================

// forEach(): Ejecuta función por cada elemento
frutas.forEach((fruta) => console.log('forEach:', fruta));

// map(): Crea nuevo array transformado
const mayusculas = frutas.map((fruta) => fruta.toUpperCase());
console.log('Map:', mayusculas);

// filter(): Crea nuevo array con elementos que cumplen condición
const largas = frutas.filter((fruta) => fruta.length > 5);
console.log('Filter (longitud >5):', largas);

// reduce(): Reduce array a un valor único
const suma = numeros.reduce((acc, num) => acc + num, 0);
console.log('Reduce (suma):', suma);

// reduceRight(): Reduce de derecha a izquierda
const producto = numeros.reduceRight((acc, num) => acc * num, 1);
console.log('ReduceRight (producto):', producto);

// every(): Verifica si todos cumplen condición
const todosPares = numeros.every((num) => num % 2 === 0);
console.log('Every (todos pares):', todosPares);

// some(): Verifica si al menos uno cumple condición
const algunPar = numeros.some((num) => num % 2 === 0);
console.log('Some (algún par):', algunPar);

// find(): Encuentra primer elemento que cumple
const mayorTres = numeros.find((num) => num > 3);
console.log('Find (>3):', mayorTres);

// findIndex(): Encuentra índice del primer que cumple
const indiceMayorTres = numeros.findIndex((num) => num > 3);
console.log('FindIndex (>3):', indiceMayorTres);

// keys(): Iterador de claves (índices)
for (const key of frutas.keys()) {
  console.log('Keys:', key);
}

// values(): Iterador de valores
for (const value of frutas.values()) {
  console.log('Values:', value);
}

// entries(): Iterador de [índice, valor]
for (const [i, v] of frutas.entries()) {
  console.log('Entries:', i, v);
}

// ============================================
// 4. Métodos Estáticos (Del constructor Array)
// ============================================

// from(): Crea array desde iterable
const desdeString = Array.from('hola');
console.log('From:', desdeString);

// of(): Crea array de argumentos
const deArgs = Array.of(1, 2, 3);
console.log('Of:', deArgs);

// isArray(): Verifica si es array
console.log('IsArray (frutas):', Array.isArray(frutas));
