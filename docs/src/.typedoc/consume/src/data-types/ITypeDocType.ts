export default interface ITypeDocType {
    type: string;
    name?: string;
    types?: Array<ITypeDocType>;
    typeArguments?: Array<ITypeDocType>;
}
