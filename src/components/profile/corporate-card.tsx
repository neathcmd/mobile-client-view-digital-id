import { CardItem } from "@/types/card-type";
import { IUser } from "@/types/user-type";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
const Corporatecard = ({
  me,
  card,
  idx,
}: {
  me: IUser;
  card: CardItem;
  idx: number;
}) => {
  return (
    <div className="max-w-sm mx-auto space-y-4">
      <div key={idx}>
        <Card className="bg-gradient-to-br from-purple-800/90 to-pink-800/90 border-0 shadow-2xl backdrop-blur-lg">
          <CardContent className="p-0 relative overflow-hidden ">
            <div className="absolute inset-0 ">
              <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute top-1/2 ledt-1/2 w-24 h-24 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full -translate-x-12 -translate-y-12"></div>
            </div>
            <div className="relative z-10 p-6 ">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4 ">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 rotate-12 via-pink-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg">
                    <Avatar className="w-24 h-24  rounded-full ">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="me.data.full_name"
                      />
                      <AvatarFallback className="text-2xl font-bold">
                        {me.data.avatar}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Corporatecard;
