import * as React from 'react';
import { ListContextType, IList, IListItem } from '../@types/list';
import { ListContext } from '../context/listContext';
import TextItem from '../components/ListItem/TextItem';
import ImageItem from '../components/ListItem/ImageItem';

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
                {list.items.map((item: IListItem, idx: number) => {
                    if (item.item_type == "Text") {
                        return <TextItem key={idx} item={item} />
                    }
                    if (item.item_type == 'Image') {
                        return <ImageItem key={idx} item={item} />
                    }
                }
                )}
            </div>
        </>
    )
};

export default List