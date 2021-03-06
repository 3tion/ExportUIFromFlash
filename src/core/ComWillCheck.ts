interface ComWillCheckParser {(data: ComWillCheck, item: FlashItem, params: any[], solution: Solution): void; }

/**
 * 带检测的控件的数据
 * @author 3tion
 */
class ComWillCheck {
    /**
     * 类型标识
     */
    public key: number;
    /**
     * 用于识别控件类型
     */
    public reg: RegExp;
    /**
     * 处理函数
     */
    public parseHandler: ComWillCheckParser;
    /**
     * 控件字典
     * Key      {string}        控件lib中的名字
     * Value    {FlashItem}     控件数据
     */
    public dict: {[index: string]: FlashItem};
    /**
     * 导出名列表
     * Key      {number}        导出名的索引
     * Value    {string}        导出名linkageClassName
     */
    public classNames: string[];
    /**
     * 当前索引
     */
    public idx: number;
    /**
     * 生成控件时的控件类名(控件有此值，面板没有)
     */
    public componentName: string;
    /**
     * Creates an instance of ComWillCheck.
     * 
     * @param {number} key 类型标识
     * @param {RegExp} reg 用于识别控件类型的正则表达式
     * @param {ComWillCheckParser} parseHandler 处理函数
     * @param {string} [componentName] 导出时的控件名称(控件有此值，面板没有)
     */
    constructor(key: number, reg: RegExp, parseHandler: ComWillCheckParser , componentName?: string) {
        this.key = key;
        this.reg = reg;
        this.parseHandler = parseHandler;
        this.dict = {};
        this.classNames = [];
        this.idx = 0;
        this.componentName = componentName;
    }

    /**
     * 检查库中的Item是否可以放入当前控件
     * 
     * @param {FlashItem} item 待检查的Item
     */
    public check(item: FlashItem) {
        let reg = this.reg;
        reg.lastIndex = 0;
        return reg.test(item.linkageClassName);
    }
    /**
     * 将Item放入库中存储
     * 
     * @param {FlashItem} item
     */
    public add(item: FlashItem) {
        this.dict[item.name] = item;
        let idx = this.idx++;
        item.$idx = idx;
        item.$key = this.key;
        this.classNames[idx] = item.linkageClassName;
    }
    /**
     * 遍历当前类型所有的控件
     * 
     * @param {ComWillCheckParser} handler 处理函数
     * @param {Solution} solution
     * @param {any[]} [param] 处理函数的参数
     */
    public forEach(handler: ComWillCheckParser, solution: Solution, param?: any[]) {
        let dict = this.dict;
        for (let name in dict) {
            let item = dict[name];
            handler(this, item, param, solution);
        }
    }
}