import { CardItem } from "@/types/card-type";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function ModernCard({
  me,
  card,
  idx,
}: {
  me: any;
  card: CardItem;
  idx: number;
}) {
  return (
    <div
      key={idx}
      className="max-w-md mx-auto backdrop-blur-md bg-white/60 border border-gray-100 rounded-3xl shadow-2xl overflow-hidden mt-6 transition-transform hover:scale-105"
    >
      {/* Header with Pastel Gradient */}
      <div className="h-28 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 relative rounded-t-3xl">
        <div className="absolute inset-0 bg-black/10 rounded-t-3xl"></div>
        <div className="flex justify-center mb-4">
          <Avatar className="w-24 h-24 border-4 border-white shadow-md rounded-full mt-10">
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/6880091?v=4"
              alt="User"
              className="rounded-full object-cover"
            />
            <AvatarFallback>{me.full_name}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Avatar Overlapping Header */}

      {/* Card Content */}
      <div className="p-6 text-center space-y-3">
        <h2 className="text-2xl font-bold text-gray-800">
          {me.full_name || "User Name"}
        </h2>
        <p className="text-gray-500 text-sm">
          {me.email || "email@example.com"}
        </p>

        <div className="border-t border-gray-200 pt-4 mt-4 space-y-1">
          <p className="text-lg font-semibold text-gray-700">
            {card.job || "Job Title"}
          </p>
          <p className="text-gray-600 text-sm">
            {card.bio || "Bio not provided."}
          </p>
          <p className="text-gray-600 text-sm">{card.addres || "PSE School"}</p>
        </div>
      </div>
    </div>
  );
}
