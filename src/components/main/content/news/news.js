import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CallAPI from '../../../../CallApi';
import { connect } from 'react-redux';
import './news.css';
import * as actions from '../../../../redux/actions/actions'


function News(props) {
    var { posts, onGetPosts } = props;
    useEffect(() => {
        CallAPI('news/news','GET',null).then(res=>{
            onGetPosts(res.data);
        })
    }, []);
    const blogPost = posts.map((item, index) => {
        return (
            <li key={index}>
                <div className="recent-blog-post">
                    <img src={item.imgUrl} alt="" className="thumImg" />
                    <Link to={`/news/${item.id}`} className="recent-blog-title">{item.title}</Link>
                </div>
            </li>
        )
    })

    const postItem = posts.map((item, index) => {
        return (
            <div className="col-sm-4 " key={index}>
                <Link className="post-item" to={`/news/${item.id}`}>
                    <div className="post-img">
                        <img src={item.imgUrl} alt="" />
                    </div>
                    <h2 className="title-post">{item.title}</h2>
                    <p className="content-post">{item.content}</p>
                </Link>
            </div>
        )
    })
    return (
        <div className="post-news-mast">
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="list-new-post">
                            <span className="widget-title text-center">BÀI VIẾT MỚI</span>
                            <ul>
                                {blogPost}
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="row">
                            {postItem}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetPosts: (posts) => {
            dispatch(actions.getPosts(posts))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(News);
