const getRandomColor = () => {
  const whiteInDecimal = parseInt('FFFFFF', 16);
  const colorCode = Math.floor(Math.random() * whiteInDecimal).toString(16);
  return `#${colorCode}`;
};

export default getRandomColor;
