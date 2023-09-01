export interface IListItem {
    text: string;
}

export interface ObjectId {
    $oid: string
}

export interface IList {
    _id: ObjectId;
    items: Array<IListItem>;
    name: string;
    description: string;
}


export type ListContextType = {
    lists: IList[];
    saveList: (list: IList) => void;
    updateList: (_id: string) => void;
};