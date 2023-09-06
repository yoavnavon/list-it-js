import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { ListContextType, IList, IListItem } from '../@types/list';
import { ListContext } from '../context/listContext';
import ListItem from '../components/ListItem';
import NewListItem from '../components/NewListItem';
import SubmitButton from '../components/SubmitButton';
import { useNavigate } from "react-router-dom";


const List = () => {
    // const { lists, updateList } = React.useContext(ListContext) as ListContextType;
    const [text, setText] = useState("");
    const [name, setName] = useState("New List");
    const textRef = useRef<HTMLInputElement | null>(null)
    const [items, setItems] = useState<IListItem[]>([]);
    const [itemType, setItemType] = useState("Text");
    const navigate = useNavigate();

    const handle_input = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setText(value)
    }

    const handle_name = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setName(value)
    }

    const handle_item_type = (value: any) => {
        console.log(value)
        setItemType(value)
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
                <NewListItem handle_input={handle_input} handle_add={handle_add} textRef={textRef} handle_item_type={handle_item_type} itemType={itemType}></NewListItem>
                <SubmitButton handle_submit={handle_submit}></SubmitButton>
            </div>
        </>
    )
};

export default List