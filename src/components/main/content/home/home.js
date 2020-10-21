import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CallAPI from '../../../../CallApi';
import * as actions from '../../../../redux/actions/actions';
import './home.css';


function Home(props) {
    useEffect(() => {
        CallAPI('news/news', 'GET', null).then(res => {
            onGetPosts(res.data);
        })
    }, []);

    var { posts, onGetPosts } = props;
    var ele = (posts || {}).map((item, index) => {
        return (
            <Link to={`/news/${item.id}`} className="news-item" key={index}>
                <img src={item.imgUrl} alt="" />
                <h3>{item.title}</h3>
                <p>{item.cotent}</p>
            </Link>
        )
    })
    return (
        <div className="body-content">
            {/* <Header/> */}
            <div className="container-fluid">
                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    {/* Indicators */}
                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to={0} className="active" />
                        <li data-target="#myCarousel" data-slide-to={1} />
                        <li data-target="#myCarousel" data-slide-to={2} />
                    </ol>
                    {/* Wrapper for slides */}
                    <div className="carousel-inner">
                        <div className="item active">
                            <img src="https://petnhatrang.com/wp-content/uploads/2020/04/background-cho-alaska-desktop-1.jpg" alt="Los Angeles" style={{ width: '100%' }} />
                        </div>
                        <div className="item">
                            <img src="https://i.pinimg.com/originals/4b/2a/93/4b2a93803314e9e390b272aa147fface.png" alt="Chicago" style={{ width: '100%' }} />
                        </div>
                        <div className="item">
                            <img src="https://dogily.vn/wp-content/uploads/2019/05/giong-cho-husky-1.jpg" alt="New york" style={{ width: '100%' }} />
                        </div>
                    </div>
                    {/* Left and right controls */}
                    <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                        <span className="glyphicon glyphicon-chevron-left" />
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="right carousel-control" href="#myCarousel" data-slide="next">
                        <span className="glyphicon glyphicon-chevron-right" />
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
            <div className="content">
                <div className="introduce">
                    <div className="container text-center">
                        <h2>What are we do?</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque laborum explicabo optio
                        eligendi. Veniam asperiores suscipit ratione molestiae ex corrupti, quos maiores, saepe odit
                    magnam adipisci nostrum animi beatae. Placeat.</p>
                        <div className="row">
                            <div className=" col-sm-3">
                                <div className="avatar-scope">
                                    <img id="ava" src="http://dummyimage.com/250x250.jpg/dddddd/000000" alt="" />
                                </div>
                            </div>
                            <div className=" col-sm-3">
                                <div className="avatar-scope">
                                    <img id="ava" src="http://dummyimage.com/250x250.jpg/dddddd/000000" alt="" />
                                </div>
                            </div>
                            <div className=" col-sm-3">
                                <div className="avatar-scope">
                                    <img id="ava" src="http://dummyimage.com/250x250.jpg/dddddd/000000" alt="" />
                                </div>
                            </div>
                            <div className=" col-sm-3">
                                <div className="avatar-scope">
                                    <img id="ava" src="http://dummyimage.com/250x250.jpg/dddddd/000000" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="line-divine" />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6">
                                <img src="http://dummyimage.com/500x500.jpg/ff4444/ffffff" alt="" />
                            </div>
                            <div className="col-sm-6 text-center">
                                <div className="text">
                                    <h2>Who are we?</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus praesentium
                                    possimus, repellat distinctio, beatae non ducimus quas ratione debitis, tenetur
                          ipsum! Qui, ipsum odit facilis incidunt laboriosam laudantium soluta nisi?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="line-divine" />
                <div className="news">
                    <div className="container text-center">
                        <h2>News</h2>
                        <div className="row slide-news-container">
                            <div className="slide-news">
                                {ele}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="line-divine" />
                <div className="container pd bd-top mt-1">
                    <h2 className="text-center">MY LOCATION</h2>
                    <div className="map-left">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3837.607806029113!2d108.33756931485603!3d15.877197288999799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31420dd394b20f4d%3A0x680a8510f2e53e39!2zOTEgVHLhuqduIFF1YW5nIEto4bqjaSwgQ-G6qW0gQ2jDonUsIEjhu5lpIEFuLCBRdeG6o25nIE5hbQ!5e0!3m2!1svi!2s!4v1589194671074!5m2!1svi!2s" width="100%" height={300} frameBorder={0} style={{ border: 0 }} allowFullScreen aria-hidden="false" tabIndex={0} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
