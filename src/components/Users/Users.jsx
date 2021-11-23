import React from 'react'
import personPhoto from "../../assets/images/person.jpg";
import style from "./Users.module.css";
import axios from "axios";

class Users extends React.Component {
    componentDidMount() {
        if(this.props.users.length === 0)
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                debugger
                this.props.setUsers(response.data.items)
                // [
                // {
                //     id: 1,
                //     fullName: 'Victor',
                //     photoUrl: 'https://avatars.mds.yandex.net/i?id=3044abaf6261d938d075bb96118efe9f-5524072-images-thumbs&n=13&exp=1',
                //     isFollow: true,
                //     status: 'I`m looking for a job',
                //     location: {
                //         country: 'Belarus',
                //         city: 'Minsk'
                //     }
                // },
                // {
                //     id: 2,
                //     fullName: 'Boris',
                //     photoUrl: 'https://img2.goodfon.com/original/1600x1200/2/e0/kris-payn-akter-foto.jpg',
                //     isFollow: false,
                //     status: 'I`m in a charge here',
                //     location: {
                //         country: 'Russia',
                //         city: 'Moscow'
                //     }
                // },
                // {
                //     id: 3,
                //     fullName: 'Michael',
                //     photoUrl: 'https://i.pinimg.com/originals/0f/a2/eb/0fa2ebc49aa4c9f8590e6e259a26f956.jpg',
                //     isFollow: true,
                //     status: 'I`m hiring developers',
                //     location: {
                //         country: 'Ukraine',
                //         city: 'Kiev'
                //     }
                // }
                // ]

            })
    }

    render() {
        return (
            <div>
                {
                    this.props.users.map((user) =>
                        <div key={user.id}>
                        <span>
                            <div>
                                <img src={user.photos.small ? user.photos.small : personPhoto}
                                     className={style.userPhoto}/>
                            </div>
                            <div>
                                {
                                    user.isFollow ?
                                        <button onClick={() => this.props.unfollow(user.id)}>Unfollow</button> :
                                        <button onClick={() => this.props.follow(user.id)}>Follow</button>
                                }
                            </div>
                        </span>
                            <span>
                            <span>
                                <div>
                                    {user.name}
                                </div>
                                <div>
                                    {user.status}
                                </div>
                            </span>
                            <span>
                                <div>
                                    {'user.location.country'}
                                </div>
                                <div>
                                    {'user.location.city'}
                                </div>
                            </span>
                        </span>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Users;