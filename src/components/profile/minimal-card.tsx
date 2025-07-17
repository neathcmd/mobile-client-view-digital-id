import { CardItem } from "@/types/card-type";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function MinimalCard({
  card,
  me,
  idx,
}: {
  card: CardItem;
  me: any; // You can replace 'any' with your IUser type
  idx: number;
}) {
  return (
    <div
      key={idx}
      className="p-6 bg-gradient-to-br from-purple-600  to-blue-500 rounded-3xl text-white shadow-xl max-w-md mx-auto mt-5"
    >
      <div className="flex justify-center mb-4">
        <Avatar className="w-24 h-24 border-4 border-white shadow-md rounded-full">
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/6880091?v=4"
            alt="User"
            className="rounded-full object-cover"
          />
          <AvatarFallback>{me.full_name}</AvatarFallback>
        </Avatar>
      </div>
      <h2 className="text-2xl font-bold text-center mb-1">
        {me.full_name || "User Name"}
      </h2>
      <p className="text-center opacity-80 mb-2">
        {me.email || "email@example.com"}
      </p>
      <div className="text-center">
        <p className="text-lg font-semibold">{card.job || "Job Title"}</p>
        <p className="mt-1 opacity-80">{card.bio || "Bio not provided."}</p>
      </div>
    </div>
  );
}
