import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { ListContextType, IList, IListItem } from '../@types/list';
import { ListContext } from '../context/listContext';
import ListItem from '../components/ListItem';
import { useNavigate } from "react-router-dom";

const List = () => {
    // const { lists, updateList } = React.useContext(ListContext) as ListContextType;
    const [text, setText] = useState("");
    const [name, setName] = useState("New List");
    const textRef = useRef<HTMLInputElement | null>(null)
    const [items, setItems] = useState<IListItem[]>([]);
    const navigate = useNavigate();

    const handle_input = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setText(value)
    }

    const handle_name = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setName(value)
    }


    const handle_add = () => {
        const new_item: IListItem = { text }
        setItems([...items, new_item])
        setText("")
        if (textRef.current != null) {
            textRef.current.value = ""
        }

    }

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {

            if (event.key === 'Enter') {
                console.log(text)
                event.preventDefault();

                const new_item: IListItem = { text }

                setItems([...items, new_item])
                handle_add()


            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [text]);

    const handle_submit = async () => {
        const resp = await fetch(`http://localhost:8080/list`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                items,
                description: "my descr",
            })

        })
        const data = await resp.json()
        navigate("/");
    }




    return (
        <>
            <div className="container mx-auto">
                <input
                    type="text"
                    className="text-grey-darkest font-bold text-4xl"
                    onChange={handle_name}
                    value={name}
                />
                {items.map((item: IListItem, idx: number) => (
                    <ListItem key={idx} item={item} />
                ))}
                <div className="mt-8 block max-w-none p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                    <div className="flex justify-between h-10">
                        <input
                            type="text"
                            className="flex-grow w-30 border p-1"
                            onChange={handle_input}
                            ref={textRef}
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-20"
                            onClick={(_) => handle_add()}
                        >
                            {"Add"}
                        </button>
                    </div>
                </div>
                <div className="mt-8 block max-w-none p-6 bg-white  justify-center flex">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-30"
                        onClick={handle_submit}
                    >
                        {"Submit"}
                    </button>
                </div>
            </div>
        </>
    )
};

export default List