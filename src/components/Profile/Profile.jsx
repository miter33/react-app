import './Profile.module.css';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo 
                userProfile={props.userProfile}
                status={props.status}
                updateUserStatus={props.updateUserStatusThunkCreator}
            />
            <MyPostsContainer />
        </div>
    )
};

export default Profile;