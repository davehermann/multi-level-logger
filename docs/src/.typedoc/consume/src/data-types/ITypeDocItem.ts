import ITypeDocComment from "./ITypeDocComment";
import ITypeDocType from "./ITypeDocType";

export default interface ITypeDocItem {
    id: number;
    name: string;
    kindString: string;
    children?: Array<ITypeDocItem>;
    comment?: ITypeDocComment;
    defaultValue: any;
    signatures?: Array<ITypeDocItem>;
    parameters?: Array<ITypeDocItem>;
    target?: number;
    type?: ITypeDocType;
    [x:string]: any;
}
