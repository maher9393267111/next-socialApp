import React from "react";
import { Menu } from "semantic-ui-react";

function ProfileMenuTabs({
  activeItem,
  handleItemClick,
  followersLength,
  followingLength,
  ownAccount,
  loggedUserFollowStats
}) {
  return (
    <>
      <Menu pointing secondary>
        <Menu.Item
          name="perfil"
          active={activeItem === "profile"}
          onClick={() => handleItemClick("profile")}
        />

        <Menu.Item
          name={`${followersLength} seguidores`}
          active={activeItem === "followers"}
          onClick={() => handleItemClick("followers")}
        />

        {ownAccount ? (
          <>
            <Menu.Item
              name={`${
                loggedUserFollowStats.following.length > 0
                  ? loggedUserFollowStats.following.length
                  : 0
              } siguiendo`}
              active={activeItem === "following"}
              onClick={() => handleItemClick("following")}
            />

            <Menu.Item
              name="Actualizar Perfil"
              active={activeItem === "updateProfile"}
              onClick={() => handleItemClick("updateProfile")}
            />

            <Menu.Item
              name="Configuración"
              active={activeItem === "settings"}
              onClick={() => handleItemClick("settings")}
            />
          </>
        ) : (
          <Menu.Item
            name={`${followingLength} following`}
            active={activeItem === "following"}
            onClick={() => handleItemClick("following")}
          />
        )}
      </Menu>
    </>
  );
}

export default ProfileMenuTabs;