import * as React from 'react';
import { IListItem } from '../@types/list';

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import DropDown from './DropDown';

type Props = {
    handle_input: (event: React.ChangeEvent<HTMLInputElement>) => void
    handle_add: () => void
    handle_item_type: (event: any) => void
    textRef: React.MutableRefObject<HTMLInputElement | null>
    itemType: string
};

function classNames(...classes: any) {
    console.log(classes)
    return classes.join(' ')
    // return classes.filter(Boolean).join(' ')
}

const ListItem: React.FC<Props> = ({ handle_input, handle_add, handle_item_type, textRef, itemType }) => {
    return (
        <div className="mt-8 block max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
            <div className="flex justify-between h-10">
                <input
                    type="text"
                    className="flex-grow w-30 border p-1 mr-5 rounded-lg"
                    onChange={handle_input}
                    ref={textRef}
                />
                <DropDown options={["Text", "Image", "List"]} handle_click={handle_item_type} selected={itemType}></DropDown>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-20"
                    onClick={(_) => handle_add()}
                >
                    {"Add"}
                </button>
            </div>




        </div>
    );
};
export default ListItem;