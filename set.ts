/* 
   集合：不允许值重复的顺序数据结构。
*/

type SetStructure = string | number;

interface StringObject {

    [value: string]: SetStructure;
}

class Set {
    
    constructor(private items:StringObject = {}) {}

    //向集合添加一个新的项
    add(value: SetStructure):boolean {
        if(!this.has(value)) {
            this.items[value] = value;
            return true;
        }
        return false;
    }

   //从集合中移除一个值
   remove(value: SetStructure):boolean {

       if(this.has(value)) {
            delete this.items[value];
            return true;
       }

       return false;
        
   }

   //检查集合中是否存在这个值,返回一个布尔值
   has(value:SetStructure):boolean {
       //hasOwnProperty会忽略原型上的属性
        const strVlaue = value.toString();
        return this.items.hasOwnProperty(strVlaue);
    }

   //清空集合
   clear(){
       this.items = {};
   }

   //返回集合中包含元素的数量
   size():number{
       //Object.key方法返回一个包含给定对象所有属性的数组
       return Object.keys(this.items).length;
   }

   //返回集合中所有值的数组
   values():Array<SetStructure>{

        const values = [];

        for(let i = 0, keys = Object.keys(this.items); i < keys.length; i++) {

            values.push(this.items[keys[i]]);
        }

        return values;
   }
}

//使用set类
const set = new Set();
set.add(1);
set.add(2);
set.add('name')
console.log(set.values()); // 输出 [1, 2, 'name'];
console.log(set.has(1)) // 输出true
console.log(set.size()) //输出3
