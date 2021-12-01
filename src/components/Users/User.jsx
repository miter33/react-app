import React from 'react'
import personPhoto from "../../assets/images/person.jpg";
import style from "./Users.module.css";
import {NavLink} from "react-router-dom";

let User = ({user, followingInProgress, follow, unfollow}) => {
  return (
      <div>
        <span>
          <div>
            <NavLink to={`/profile/${user.id}`}>
            <img
                alt={user.name}
                src={user.photos.small ?? personPhoto}
                className={style.userPhoto}
            />
            </NavLink>
          </div>
          <div>
          {
            user.followed ?
                <button
                    disabled={followingInProgress.some(id => id === user.id)}
                    onClick={() => {
                      unfollow(user.id)
                    }
                    }
                >
                  Unfollow
                </button> :
                <button
                    disabled={followingInProgress.some(id => id === user.id)}
                    onClick={() => {
                      follow(user.id)
                    }}
                >
                  Follow
                </button>
          }
          </div>
        </span>
        <span>
            <span>
              <div>{user.name}</div>
              <div>{user.status}</div>
            </span>
            <span>
              <div>{'user.location.country'}</div>
              <div>{'user.location.city'}</div>
            </span>
            </span>
      </div>
  )
}

export default User;