import * as React from 'react';
import { ListContextType, IList, IListItem } from '../@types/list';
import { ListContext } from '../context/listContext';
import ListItem from '../components/ListItem';
import {
    Outlet,
    Link,
    useLoaderData,
} from "react-router-dom";

const List = () => {
    // const { lists, updateList } = React.useContext(ListContext) as ListContextType;
    const list = useLoaderData() as IList;
    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-grey-darkest font-bold">{list.name}</h1>
                {list.items.map((item: IListItem, idx: number) => (
                    <ListItem key={idx} item={item} />
                ))}
            </div>
        </>
    )
};

export default List