import * as React from 'react';
import { IListItem } from '../../@types/list';

type Props = {
    item: IListItem;
};

const ImageItem: React.FC<Props> = ({ item }) => {
    return (
        <div className="mt-8 block max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <img src={item.text} alt="..." className="shadow rounded max-w-full h-auto align-middle border-none" />
        </div>
    );
};
export default ImageItem;