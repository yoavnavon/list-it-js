import * as React from 'react';
import { ListContextType, IList } from '../@types/list';
import { ListContext } from '../context/listContext';
import ListIndexItem from '../components/ListIndexItem';
import {
    Outlet,
    Link,
    useLoaderData,
} from "react-router-dom";

const ListsIndex = () => {
    // const { lists, updateList } = React.useContext(ListContext) as ListContextType;
    const lists = useLoaderData() as IList[];
    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-grey-darkest font-bold">{"Lists"}</h1>
                {lists.map((list: IList) => (
                    <ListIndexItem key={list._id.$oid} list={list} />
                ))}
            </div>
        </>
    );
};

export default ListsIndex