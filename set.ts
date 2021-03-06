/* 
   集合：不允许值重复的顺序数据结构。
   集合操作:
    并集：对于给定的两个集合，返回包含两个集合中所有元素的新集合，
    交集：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合，
    差集：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在与第二个集合的元素的新集合，
    子集：验证一个给定集合是否是另一集合的子集。
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

   //并集
   union(ortherSet: Set) {

    /* 
        首先 创建一个Set实例为unionSet，用于保存并集；接下来声明valuse变量来获取当前集合所有值，
        通过循环添加到代表并集的集合中，然后对传入的第二个集合（ortherSet）做同样的事。 
    */
        let unionSet = new Set();

        let values = this.values();
        for(let i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }

        values = ortherSet.values();
        for(let i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }

        return unionSet;
   }
   
   //交集:元素存在于集合A中且存在于B中
   intersection(ortherSet: Set) {
        /* 

            先要创建一个Set实例intersection,用于保存两个集合中得差集，接下来声明一个values变量来获取当前集合的所有值，
            通过循环比较ortherSet集合中是否有存在与当前集合中相同的元素，如果存在，则添加到insersection中

        */

        const intersection = new Set();
        const values = this.values();

        for(let i = 0; i < values.length; i++) {

            if(ortherSet.has(values[i])) {
                intersection.add(values[i]);
            }

        }
        return intersection;
   }

   //差集:元素存在于集合A中且不存在于集合B中
   difference(ortherSet: Set) {
       /* 
            差集的实现方法非常简单，只要把并集的方法intersection中循环判断ortherSet.has(values[i])取反就可以了
       */
        const differenceSet = new Set();
        const values = this.values();

        for(let i = 0; i < values.length; i++) {
            
            if(!ortherSet.has(values[i])) {
                differenceSet.add(values[i]);
            }
        }

        return differenceSet;
   }

   //子集：如果集合A中的每一个元素存在于集合B中，则A是B的子集；
   subset(ortherSet: Set) {
       /* 
            首先判断如果当前集合元素个数大于传入的集合元素个数，则返回false,
            否则循环遍历当前集合，如果有任何一个元素不存在于集合ortherSet中，
            则返回false,否则返回真。
       */
      if(this.size() > ortherSet.size()) {
        
        return false;
      }  else {
            const values = this.values();
            for(let i = 0; i < values.length; i++) {
                
                if(!ortherSet.has(values[i])) {
                    return false;
                }
            }
            return true;  
      }
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

//测试并集
const setA = new Set();
setA.add('hello');
setA.add('Meng');

const setB = new Set();
setB.add('You');
setB.add('So');
setB.add('Cool');

const setAB = setA.union(setB);

console.log(setAB.values()); //["hello", "Meng", "You", "So", "Cool"]

//交集
setA.add(1);
setB.add(1);
const intesectionAB = setA.intersection(setB);
console.log(intesectionAB.values()); // [1]

//差集
const differenceAB = setA.difference(setB);
console.log(differenceAB.values()); //["hello", "Meng"]

//子集 
const child = new Set();
child.add(1);
child.add(2);

const father = new Set();
father.add(1);
father.add(2);
father.add(3);

const subsetAB = child.subset(father);
console.log(subsetAB); // 返回为 true