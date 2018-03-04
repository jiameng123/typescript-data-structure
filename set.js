/*
   集合：不允许值重复的顺序数据结构。
*/
var Set = /** @class */ (function () {
    function Set(items) {
        if (items === void 0) { items = {}; }
        this.items = items;
    }
    //向集合添加一个新的项
    Set.prototype.add = function (value) {
        if (!this.has(value)) {
            this.items[value] = value;
            return true;
        }
        return false;
    };
    //从集合中移除一个值
    Set.prototype.remove = function (value) {
        if (this.has(value)) {
            delete this.items[value];
            return true;
        }
        return false;
    };
    //检查集合中是否存在这个值,返回一个布尔值
    Set.prototype.has = function (value) {
        //hasOwnProperty会忽略原型上的属性
        var strVlaue = value.toString();
        return this.items.hasOwnProperty(strVlaue);
    };
    //清空集合
    Set.prototype.clear = function () {
        this.items = {};
    };
    //返回集合中包含元素的数量
    Set.prototype.size = function () {
        //Object.key方法返回一个包含给定对象所有属性的数组
        return Object.keys(this.items).length;
    };
    //返回集合中所有值的数组
    Set.prototype.values = function () {
        var values = [];
        for (var i = 0, keys = Object.keys(this.items); i < keys.length; i++) {
            values.push(this.items[keys[i]]);
        }
        return values;
    };
    return Set;
}());
//使用set类
var set = new Set();
set.add(1);
set.add(2);
set.add('name');
console.log(set.values()); // 输出 [1, 2, 'name'];
console.log(set.has(1)); // 输出true
console.log(set.size()); //输出3
