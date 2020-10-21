import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CallAPI from '../../../../CallApi';
import { connect } from 'react-redux';
import './news.css';
import * as actions from '../../../../redux/actions/actions';
import MainHeader from '../../header/mainheader';

function NewsDetail(props) {
    var { posts, onGetPosts } = props;
    useEffect(() => {
        CallAPI('news/news', 'GET', null).then(res => {
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
    const onRenderPostDetail = () => {
        var { match, posts } = props;
        var id = match.params.id;
        var element = posts.filter((item, index) => {
            return item.id == id
        })
        console.log(element);

        if (element.length > 0) {
            return (

                <div className="post-detail">
                    <h6>Tin tức</h6>
                    <h1>{element[0].title}</h1>
                    <div className="divider" />
                    <div className="img-post-detail">
                        <img src={element[0].imgUrl} alt="" />
                    </div>
                    <h2 className="title-detail">{element[0].title}</h2>
                    <p className="content-post-detail">{element[0].content}</p>
                    <ul className="social-media">
                        <li>
                            <a href="#" id="fb">
                                <i class="fa fa-facebook" aria-hidden="true"></i>
                                <span>facebook</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" id="tw">
                                <i class="fa fa-twitter" aria-hidden="true"></i>
                                <span>Twitter</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" id="gg">
                                <i class="fa fa-google" aria-hidden="true"></i>
                                <span>Google</span>
                            </a>
                        </li>
                    </ul>
                </div>

            )
        } else {
            return (
                <div></div>
            )
        }
    }
    var postDetail = onRenderPostDetail();

    return (
        <>
        <MainHeader/>
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
                        {postDetail}
                    </div>
                </div>
            </div>
        </div>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);