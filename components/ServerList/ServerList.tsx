import { DiscordServer } from "@/models/DiscordServer";
import { v4 as uuid } from "uuid";
import Image from "next/image";

export default function ServerList() {
  const servers: DiscordServer[] = [
    {
      id: uuid(),
      name: "Cinema Weekend",
      image: "/assets/netflix.jpg",
    },
    {
      id: uuid(),
      name: "Coding Community",
      image: "/assets/computer.jpg",
    },
    {
      id: uuid(),
      name: "Gamer Site",
      image: "/assets/ps4.jpg",
    },
  ];
  return (
    <div className="bg-dark-gray h-full flex flex-col items-center">
      {servers.map((server) => (
        <div key={server.id} className="relative group">
          <button className="p-2" onClick={() => console.log(server.name)}>
            {server.image ? (
              <Image
                className="rounded-icon"
                src={server.image}
                width={50}
                height={50}
                alt="Server Icon"
              />
            ) : (
              <span className="rounded-icon bg-gray-600 w-[50px] flex items-center justify-center text-sm">
                {server.name.charAt(0)}
              </span>
            )}
          </button>

          {/* Tooltip */}
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-xm font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
            {server.name}
            {/* Triangle pointer */}
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-0 border-r-4 border-t-transparent border-b-transparent border-r-gray-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
