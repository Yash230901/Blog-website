import React from 'react'

const Post = () => {
    return (
        <div className='post'>
            <div className="image">
                <img src="https://techcrunch.com/wp-content/uploads/2023/08/duck-hunt-fbi-botnet.jpg?w=1390&crop=1" alt="image" />
            </div>
            <div className="texts">
                <h2>Full house battery backup</h2>
                <p className='info'>
                    <a href="">yash verma</a>
                    <time>2023-01-06 15:45</time>
                </p>
                <p className='summary'>Today at its special launch event</p>
            </div>
        </div>
    )
}

export default Post