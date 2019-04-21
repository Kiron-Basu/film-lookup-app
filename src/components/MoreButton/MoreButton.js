import React from 'react';

const MoreButton = (props) => {
    return (
        <button 
        style={{backgroundColor: 'blue', width: '80px', height: '60px', color: 'white', display: 'block', margin: '0 auto'}}
        onClick={props.moreButtonHandler}
        >
        Load more
        </button>
        );
}

export default MoreButton;