import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit3 } from "lucide-react";
import { userRequest } from "@/lib/api/get-me-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface FormValues {
  full_name: string;
  user_name: string;
}

interface UpdateUserDialogProps {
  user?: {
    full_name?: string;
    user_name?: string;
  };
}

const UpdateUserDialog = ({ user }: UpdateUserDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormValues>({
    full_name: user?.full_name || "",
    user_name: user?.user_name || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { UPDATE_USER } = userRequest();
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: (payload: FormValues) => UPDATE_USER(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully!");
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update profile");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    updateUserMutation.mutate(formData);
  };

  const handleCancel = () => {
    setFormData({
      full_name: user?.full_name || "",
      user_name: user?.user_name || "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              name="full_name"
              type="text"
              value={formData.full_name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user_name">Username</Label>
            <Input
              id="user_name"
              name="user_name"
              type="text"
              value={formData.user_name}
              onChange={handleInputChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? "Save changeing..." : "Save change"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserDialog;
