// returns false if string value is not in map
const parseBool = (str: string): boolean => {
  const boolMap = new Map<string, boolean>([
    ["true", true],
    ["false", false],
    ["yes", true],
    ["no", false],
    ["1", true],
    ["0", false],
  ]);
  const result = boolMap.get(str.toLowerCase());
  if (result !== undefined) return result;
  else return false;
};

export { parseBool };
