import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { ListContextType, IList, IListItem } from '../@types/list';
import { ListContext } from '../context/listContext';
import TextItem from '../components/ListItem/TextItem';
import ImageItem from '../components/ListItem/ImageItem';
import TextInput from '../components/NewListItem/TextInput';
import ImageInput from '../components/NewListItem/ImageInput';
import SubmitButton from '../components/SubmitButton';
import { useNavigate } from "react-router-dom";


const List = () => {
    // const { lists, updateList } = React.useContext(ListContext) as ListContextType;
    const [text, setText] = useState("");
    const [name, setName] = useState("New List");
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [items, setItems] = useState<IListItem[]>([]);
    const [itemType, setItemType] = useState("Text");
    const navigate = useNavigate();

    const [image, setImage] = useState<File | string>("");

    const uploadImage = () => {
        const data = new FormData()
        if (image != null) {
            data.append("file", image)
            data.append("upload_preset", "list-it-item")
            data.append("cloud_name", "dyezktdnh")
            console.log("uploading...")
            fetch("https://api.cloudinary.com/v1_1/dyezktdnh/image/upload", {
                method: "post",
                body: data
            })
                .then(resp => resp.json())
                .then(data => {
                    console.log('done')
                    const new_item: IListItem = { text: data.url, item_type: itemType }
                    setItems([...items, new_item])
                    setImage("")
                    if (inputRef.current != null) {
                        inputRef.current.value = ""
                    }
                })
                .catch(err => console.log(err))

        }
    }


    const handle_input = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setText(value)
    }

    const handle_name = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setName(value)
    }

    const handle_item_type = (value: any) => {
        setItemType(value)
    }


    const handle_add = () => {
        const new_item: IListItem = { text, item_type: itemType }
        setItems([...items, new_item])
        setText("")
        if (inputRef.current != null) {
            inputRef.current.value = ""
        }

    }

    // useEffect(() => {
    //     const keyDownHandler = (event: KeyboardEvent) => {

    //         if (event.key === 'Enter') {
    //             console.log(text)
    //             event.preventDefault();

    //             const new_item: IListItem = { text, type: itemType }

    //             setItems([...items, new_item])
    //             handle_add()


    //         }
    //     };

    //     document.addEventListener('keydown', keyDownHandler);

    //     return () => {
    //         document.removeEventListener('keydown', keyDownHandler);
    //     };
    // }, [text]);

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

    const input = (() => {
        if (itemType == 'Text') {
            return <TextInput handle_input={handle_input} handle_add={handle_add} inputRef={inputRef} handle_item_type={handle_item_type} itemType={itemType}></TextInput>
        }
        else if (itemType == "Image") {
            return <ImageInput setImage={setImage} uploadImage={uploadImage} handle_item_type={handle_item_type} itemType={itemType} inputRef={inputRef}></ImageInput>
        }
        return <TextInput handle_input={handle_input} handle_add={handle_add} inputRef={inputRef} handle_item_type={handle_item_type} itemType={itemType}></TextInput>
    })()


    return (
        <>
            <div className="container mx-auto">

                <input
                    type="text"
                    className="text-grey-darkest font-bold text-4xl"
                    onChange={handle_name}
                    value={name}
                />
                {items.map((item: IListItem, idx: number) => {
                    if (item.item_type == "Text") {
                        return <TextItem key={idx} item={item} />
                    }
                    if (item.item_type == 'Image') {
                        return <ImageItem key={idx} item={item} />
                    }
                })
                }
                {input}
                <SubmitButton handle_submit={handle_submit}></SubmitButton>
            </div>
        </>
    )
};

export default List