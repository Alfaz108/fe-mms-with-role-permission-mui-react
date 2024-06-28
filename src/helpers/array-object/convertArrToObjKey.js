const convertListDataToObjKey = (dataParams) => {
  let hashTable = {};
  if (dataParams?.length) {
    for (let index = 0; index < dataParams.length; index++) {
      const { ...others } = dataParams[index];
      if (dataParams[index]._id) {
        hashTable[dataParams[index]._id] = others;
      } else {
        hashTable[dataParams[index].value] = others;
      }
    }
  }
  return hashTable;
};

const convertDropdownDataToObjKey = (dataParams) => {
  let hashTable = {};
  if (dataParams?.length) {
    for (let index = 0; index < dataParams.length; index++) {
      const { label } = dataParams[index];
      hashTable[dataParams[index].value] = label;
    }
  }
  return hashTable;
};

const convertDropdownUserDataToObjKey = (dataParams) => {
  let hashTable = {};
  if (dataParams?.length) {
    for (let index = 0; index < dataParams.length; index++) {
      const { label } = dataParams[index];
      hashTable[dataParams[index].value] = label;
    }
  }
  return hashTable;
};

const convertDropdownDataToObj = (dataParams) => {
  let hashTable = {};
  if (dataParams?.length) {
    for (let index = 0; index < dataParams.length; index++) {
      // eslint-disable-next-line no-unused-vars
      const { value, ...others } = dataParams[index];
      hashTable[dataParams[index].value] = dataParams[index];
    }
  }
  return hashTable;
};

export {
  convertDropdownDataToObj,
  convertDropdownDataToObjKey,
  convertDropdownUserDataToObjKey,
  convertListDataToObjKey,
};
