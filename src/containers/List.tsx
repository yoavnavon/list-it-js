import * as React from 'react';
import { IList, IListItem, Content } from '../@types/list';
import { isTextType, isImageType, isListType } from '../@types/guards';
import { ListContext } from '../context/listContext';
import TextItem from '../components/ListItem/TextItem';
import ImageItem from '../components/ListItem/ImageItem';
import ListItem from '../components/ListItem/ListItem';

import {
    Outlet,
    Link,
    useLoaderData,
} from "react-router-dom";



const List = () => {
    // const {lists, updateList} = React.useContext(ListContext) as ListContextType;
    const list = useLoaderData() as IList;
    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-grey-darkest font-bold">{list.name}</h1>
                {list.items.map((item: IListItem<Content>, idx: number) => {
                    if (isTextType(item)) {
                        return <TextItem key={idx} item={item} />
                    }
                    if (isImageType(item)) {
                        return <ImageItem key={idx} item={item} />
                    }
                    if (isListType(item)) {
                        return <ListItem key={idx} item={item} />
                    }
                }
                )}
            </div>
        </>
    )
};

export default List