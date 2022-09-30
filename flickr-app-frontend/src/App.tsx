import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import API from "./services";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Masonry from "react-responsive-masonry";
import { RotatingLines } from 'react-loader-spinner'

const App = () => {

    const [images, setImages] = useState<any>([]);
    const [tag, setTag] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getALlImages();
        // eslint-disable-next-line
    }, [])

    /**
     * Get all images from backend
     * @param keyword
     */
    const getALlImages = async (keyword = '') => {
        setLoading(true)
        const {data} = await API.image.getImages(keyword);
        console.log("value", data.value.items);
        setImages(data?.value?.items)
        setLoading(false)
    }

    /**
     * Set tag value
     * @param e
     */
    const onChangeTag = (e: any) => {
        const {value} = e.target;
        setTag(value)
    }

    /**
     * handle filter event
     */
    const handleFilter = async () => {
        await getALlImages(tag)
    }


    return (
        <div>
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-10">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Type tag to search" onChange={onChangeTag}/>
                            </Form.Group>
                        </div>
                        <div className="col-md-2">
                            <Button variant="primary" type="button" onClick={handleFilter}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-container">
                <div className="text-center mt-3 mb-3">
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="50"
                        visible={loading}
                    />
                </div>
                <Masonry
                    columnsCount={3}
                    gutter="7px"
                >
                    {
                        images.map((image: any, index: number) => {
                            return (
                                <div
                                     key={index}>
                                    <img
                                        src={image.media.m}
                                        alt=""
                                        style={{width: "100%", display: "block"}}
                                    />
                                </div>
                            )
                        })
                    }
                </Masonry>

            </div>
        </div>
    );
}

export default App;
