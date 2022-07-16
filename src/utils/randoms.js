const randomNum = () => {
  return Math.floor(Math.random() * 1000 + 1);
};

const calcularNums = (cant) => {
  const numbers = {};
  while (cant > 0) {
    const num = randomNum();
    numbers[num]
      ? numbers[num] += 1
      : numbers[num] = 1;

    cant -= 1;
  }
  return numbers;
};

process.on('message', msg => {
  const numeros = calcularNums(msg.cant);
  process.send({ numeros });
});

process.send('listo');
