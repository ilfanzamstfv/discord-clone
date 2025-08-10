import { UserObject } from "@/models/UserObject";
import Image from "next/image";
import { PersonIcon } from "./Icons";

export default function UserRow({
  user,
  userChanged,
}: {
  user: UserObject;
  userChanged: (user: UserObject, checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-start w-70 my-2">
      <input
        type="checkbox"
        id={user.id}
        name={user.id}
        className="w-4 h-4 cursor-pointer"
        onChange={(event) => {
          userChanged(user, event.target.checked);
        }}
      />
      <label className="w-50 flex items-center" htmlFor="users">
        {user.image && (
          <Image
            src={user.image}
            width={40}
            height={40}
            alt={user.name}
            className="w-8 h-8 rounded-full mr-4"
          />
        )}
        {!user.image && <PersonIcon className="w-8 h-8" />}
        <p>
          <span className="block text-gray-200">
            {user.name} <br />
            {user.lastOnline && (
              <span className="text-sm text-gray-400">
                Last online: {user.lastOnline.split("T")[0]}
              </span>
            )}
          </span>
        </p>
      </label>
    </div>
  );
}
