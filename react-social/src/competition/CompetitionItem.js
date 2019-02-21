import React, {Component} from "react";
import './CompetitionItem.css';

class CompetitionItem extends Component {

    render() {
        const {item} = this.props;

        console.log("ITEM: " + item);

        return (

            // <div>
            //     {item.name}
            // </div>


            <div className="wrapper">

                <div className="card radius shadowDepth1">
                    {/*<div className="card__image border-tlr-radius">*/}
                        {/*<img src="http://lorempixel.com/400/200/sports/" alt="image" className="border-tlr-radius" />*/}
                    {/*</div>*/}

                    <div className="card__content card__padding">
                        <div className="card__share">
                            <a id="share" className="share-icon" href="#">Join</a>
                        </div>

                        <div className="card__meta">
                            <a href="#">{item.name}</a>
                            <time>17th March</time>
                        </div>

                        <article className="card__article">
                            <h2><a href="#"></a></h2>

                            <div className="participants card__author">
                                <p>Participants: </p>
                                <div>
                                    <img src="http://lorempixel.com/40/40/sports/" alt="user" />
                                    <div className="card__author-content">
                                        <a href="#">John Doe</a>
                                    </div>
                                </div>

                                <div>
                                    <img src="http://lorempixel.com/40/40/sports/" alt="user" />
                                    <div className="card__author-content">
                                        <a href="#">John Doe</a>
                                    </div>
                                </div>

                                <div>
                                    <img src="http://lorempixel.com/40/40/sports/" alt="user" />
                                    <div className="card__author-content">
                                        <a href="#">John Doe</a>
                                    </div>
                                </div>
                            </div>


                        </article>
                    </div>

                    <div className="card__action">
                        <div className="card__author">
                            <img src="http://lorempixel.com/40/40/sports/" alt="user" />
                                <div className="card__author-content">
                                    Created By <a href="#">John Doe</a>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default (CompetitionItem);




