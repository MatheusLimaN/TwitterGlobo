import React, { Fragment } from "react";
import './tweet.css';

const Tweet = (props) => {

    const { tweet, concealable, actions } = props;

    return (
        <div className={`tweet ${!concealable ? '' : tweet ? 'show' : 'hide'}`}>
            {tweet &&
                <Fragment>
                    <img src={tweet.user.profile_image_url}></img>
                    <div className="tweet-text">
                        <span className="tweet-name">{tweet.user.name}:</span>
                        {tweet.text}
                    </div>
                    {actions &&
                        <div className="tweet-actions">
                            {actions}
                        </div>
                    }

                </Fragment>
            }
            {!tweet && !concealable &&
                <span className="tweet-empty">Nenhum tweet selecionado</span>
            }
        </div>
    );
}

export default Tweet;
