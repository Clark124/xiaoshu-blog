import React, { Component } from 'react';

class Carousel extends Component {
    render() {
        return (
            <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                </ol>

                <div className="carousel-inner" role="listbox">
                    <div className="item active">
                        <img src="http://upload.jianshu.io/admin_banners/web_images/3456/96053fe1a85d6f9c7541a122e5bb6e411b71359c.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt="" />
                        <div className="carousel-caption">

                        </div>
                    </div>
                    <div className="item">
                        <img src="http://upload.jianshu.io/admin_banners/web_images/3463/d1a405fed08ae6f99d5f86fee1a715c0721f28f9.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt="" />
                        <div className="carousel-caption">

                        </div>
                    </div>
                    <div className="item">
                        <img src="http://upload.jianshu.io/admin_banners/web_images/3460/29ee58f173d869ce14d103e20868b92a2aa1db46.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt="" />
                        <div className="carousel-caption">

                        </div>
                    </div>
                </div>
                <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}

export default Carousel