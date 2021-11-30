import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    if (!props.userProfile) {
        return <Preloader/>
    }

    return (
        <div>
            {/*<div>*/}
            {/*    <img src='https://avatars.mds.yandex.net/i?id=ef516ac4f93ccac64b1ab923468c8314-4628472-images-thumbs&n=13&exp=1' />*/}
            {/*</div>*/}
            <div>
                <img src={props.userProfile.photos.large}/>
                {
                    props.personalId === props.userProfile.userId ?
                        <ProfileStatusWithHooks
                            status={props.status}
                            updateUserStatus={props.updateUserStatus}
                        /> :
                        <div>{props.status}</div> 
                }
            </div>
        </div>
    )
};

export default ProfileInfo;