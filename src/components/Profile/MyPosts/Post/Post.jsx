import c from './Post.module.css';

const Post = (props) => {
    return (
        <div className={c.item}>
            <img src='https://avatars.mds.yandex.net/i?id=d28115efe89b1ba0e30b74b29b9f81ae-4017487-images-thumbs&n=13&exp=1'/>
            <span>{props.message}</span>
        </div>
    )
};

export default Post;