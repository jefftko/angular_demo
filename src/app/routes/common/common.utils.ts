export const Utils = {
  getValueFrom : (keys:string[], from:any) => {
    let target:any = {};
    let outputLog:string = '';
    keys.forEach(value => {
      target[value] = from[value]
      outputLog += `${value} \t ${target[value]}\n`;
    });
    console.log(outputLog);
    console.log('*************************************************************');
    return target;
  },

  isJson : (obj) => (typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length),

  isDate : (obj) => obj != null && typeof(obj) == "object" && obj.getYear
};
