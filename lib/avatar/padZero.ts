const padZero = (str: string): string => {
  const zeros = new Array(2).join('0');
  return (zeros + str).slice(-2);
};

export default padZero;
