import React, { useState, useEffect } from "react";
import DragDropFile from "./dragdrop";
import { getUser, resetUserSession } from "./services/AuthService";
import axios from "axios";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useNavigate } from 'react-router-dom';

var list = [];
var reload = true;

const Drive = (props) => {
    const history = useNavigate();

    const user = getUser();
    const name = user !== 'undifined' && user ? user.name : 'User';

    const logoutHandler = () => {
        resetUserSession();
        console.log(props);
        history('/login');
    }

    const refreshCart = () => {
        console.log('refresh!');
        reload = true;
        setCount('Refresh...')
    }
    console.log('start:::::::::::::::::::::::::::::::::::');
    // const [cart, setCart] = useState([]);
    const [count, setCount] = useState('');

    useEffect(() => {
        console.log("render")
    }, [count])

    console.log('reload mode: ', reload);
    if (reload || list.length === 0) {
        getImages(user.username).then(function (response) {
            console.log('response:', response);
            // setCart([response]);

            response.map((item) => (
                list.push(item.ufilename),
                setCount(item.ufilename),
                console.log(item.ufilename)
            ))
        });
        reload = false;

        // setCount(count+1);
    } else {
        console.log('reload: ', reload);
    }

    console.log('final List', list);
    return (
        <div className="driveClass" >

            <div style={{ float: 'right' }}>
                Hello {name}
                <input type="button" value="Logout" onClick={logoutHandler} />
            </div><br /><br />
            
            <input type="text" placeholder="Search..." /><br/><br/>

            <div className="imageslist">
                <input type="button" value="Click to Refresh Drive" onClick={refreshCart} />
                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                    {list.map((item) => (
                        <ImageListItem key={item}>
                            <img
                                src={`https://gifs-techtest.s3.amazonaws.com/${user.username}/${item}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`https://gifs-techtest.s3.amazonaws.com/${user.username}/${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item}
                                loading="lazy"
                            />
                            <button type="button" onclick="/register">Delete</button><br />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
            <DragDropFile />
        </div>
    )
}

const fetchListUrl = 'https://kbtgqlyyz7.execute-api.us-east-2.amazonaws.com/user/fetchfiles'

const getImages = async (uname) => {
    const requestBody = {
        username: uname
    }
    const imagelist = await axios.post(fetchListUrl, requestBody).then(response => {
        console.log('List:', response.data);

        // return (<img src="https://gifs-techtest.s3.amazonaws.com/pinsara_4/1670387308135_giphy.gif" alt="Girl in a jacket" width="500" height="600"></img>)

        // response.data.map(({ item }) => console.log('data row:',item.filename))

        return response.data;
    }).catch(error => {
        console.log('error: ', error);

        if (error.response.status === 401 || error.response.status === 403) {
            console.log(error.response.data.message);
            return;
        } else {
            console.log('Back end server is down! Please try again later');
            return;
        }
    })
    return imagelist;
}

export default Drive;