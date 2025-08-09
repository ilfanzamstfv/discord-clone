import Link from "next/link";
import CloseIcon from "../Icons";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { UserObject } from "@/models/UserObject";

type FormState = {
  serverName: string;
  serverImage: string;
  users: UserObject[];
};

export default function CreateServerForm() {
  const params = useSearchParams();
  const showCreateServerForm = params.get("createServer");
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Data
  const initialState: FormState = {
    serverName: "",
    serverImage: "",
    users: [],
  };
  const [formData, setFormData] = useState<FormState>(initialState);

  useEffect(() => {
    if (showCreateServerForm && dialogRef.current) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showCreateServerForm]);

  return (
    <dialog
      className="absolute m-auto z-10 space-y-4 rounded-xl bg-black border-white"
      ref={dialogRef}
    >
      <div className="w-full flex flex-col items-center justify-between py-8 px-6">
        <h2 className="text-3xl flex font-semibold text-gray-300 gap-6">
          Create Your Server
          <Link href="/">
            <CloseIcon />
          </Link>
        </h2>

        <p className="p-4 text-gray-300 w-md text-center">
          Your server is where you and your friends hang out. Make yours and
          start talking.
        </p>
      </div>
      <form method="dialog" className="flex flex-col space-y-2 px-6">
        <label className="labelTitle text-gray-300" htmlFor="serverName">
          SERVER NAME
        </label>
        <div className="flex items-center bg-gray-300 rounded-md">
          <span className="text-2xl p-2 text-gray-700">#</span>
          <input
            type="text"
            id="serverName"
            name="serverName"
            value={formData.serverName}
            onChange={(e) =>
              setFormData({ ...formData, serverName: e.target.value })
            }
            required
          />
        </div>
      </form>
    </dialog>
  );
}
