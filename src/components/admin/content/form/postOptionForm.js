import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { storage } from '../../../../firebase/index';


function PostOptionForm(props) {
    const { currentPost } = props;
    const [post, setPost] = useState({
        title: '',
        content: '',
        imgUrl: ''
    });
    const token = JSON.parse(localStorage.getItem('token')).accessToken || null;
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const onHandleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const newP = { ...post, [name]: value };
        setPost(newP);
    }

    function onHandleImgChange(e) {
        if(e.target.files[0]){
            const newP = { ...post, imgUrl: e.target.files[0] }
            setPost(newP)
        }
        
    }

    const onHandleUpload =()=>{
        const uploadTask = storage.ref(`images/${post.imgUrl.name}`).put(post.imgUrl);
        uploadTask.on(
            "state_changed",
            snapshot =>{},
            err=>{
                console.log(err);
            },
            ()=>{
                storage.ref("images").child(post.imgUrl.name).getDownloadURL().then(url=>{
                    console.log(url);    
                    setPost({...post,imgUrl:url})               
                })
            }
        )
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        const currentP = post;
        if (currentP.id) {
            if (token) {
                axios.put(`http://localhost:8081/api/news/update/${currentP.id}`, currentP, config).then(res => {
                    alert("sua thanh cong")
                }).catch(err => {
                    if (err) {
                        alert("sua that bai")
                    }
                })

            } else {
                alert("sua that bai")
            }
        } else {
            if (token) {
                axios.post(`http://localhost:8081/api/news/create`, currentP, config).then(res => {
                    alert("them thanh cong")
                }).catch(err => {
                    console.log(err);
                    if (err) {
                        alert("them that bai")
                    }
                })

            } else {
                alert("them that bai")
            }
        }
        setPost({
            title: '',
            content: '',
            imgUrl: ''
        })
    }

    useEffect(() => {
        if(!currentPost) return;
        setPost(currentPost);
    }, [currentPost]);

    return (
        <div className="text-center">
            < form onSubmit={onHandleSubmit} style={{ width: "60%", margin: "0 auto" }} >
                <div className="box-body">
                    <div className="form-group">
                        <label >Title</label>
                        <input type="text" className="form-control" value={post.title} name="title" onChange={onHandleChange} placeholder="title" />
                    </div>
                    <div className="form-group">
                        <label >content</label>
                        <textarea className="form-control" rows="3" value={post.content} name="content" onChange={onHandleChange} placeholder="Enter ..."></textarea>
                    </div>
                    <div className="form-group">
                        <label >Image</label>
                        <input type="file" name="imgUrl" onChange={onHandleImgChange} />
                        <p className="help-block">Example block-level help text here.</p>
                        <p onClick={onHandleUpload}>Upload</p>
                    </div>
                </div>
                <div className="box-footer">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form >

        </div>
 

    );
}

export default PostOptionForm;