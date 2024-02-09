import { Avatar, Dropdown } from "flowbite-react";

import { CiLogout, CiUser } from "react-icons/ci";

export const AvatarBox = () => {
  const logout = async () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Dropdown
      label={
        <Avatar
          img="https://avatars.githubusercontent.com/u/84444757?v=4"
          rounded
          status="online"
          statusPosition="bottom-right"
        >
          <div className="space-y-1 font-medium dark:text-white">
            <div className="md:hidden">Fristroop</div>
          </div>
        </Avatar>
      }
      arrowIcon={false}
      inline
    >
      <Dropdown.Header>
        <span className="block text-sm">Halil Aydin</span>
        <span className="block truncate text-sm font-medium">
          aydinthefirst@fristroop.com
        </span>
      </Dropdown.Header>
      <Dropdown.Item href="/profile" icon={CiUser}>
        Profile
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={logout} icon={CiLogout}>
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
};
