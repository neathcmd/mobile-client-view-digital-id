"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { cardRequest } from "@/lib/api/card-api";
import { useMutation } from "@tanstack/react-query";
import { CreateCardType } from "@/types/card-type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
  // gender: z
  //   .enum(["male", "female"])
  //   .optional()
  //   .refine((val) => val !== undefined, {
  //     message: "Gender is required",
  //   }),
  // gender: z.enum(["male", "female"]).refine((val) => val !== undefined, {
  //   message: "Gender is required",
  // }),
  gender: z.enum(["male", "female"]).refine((val) => val !== undefined, {
    message: "Gender is required",
  }),
  nationality: z.string().min(1),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  bio: z.string().min(1),
  web_site: z.string().min(1),
  job: z.string().min(1),
  address: z.string().min(1),
  company: z.string().min(1),
  phone: z.string().min(1),
  card_type: z.enum(["Modern", "Minimal", "Corporate"]),
  social: z.array(
    z.object({
      id: z.string().optional(),
      platform: z.string().min(1),
      icon: z.string().optional(),
      url: z.string().url(),
    })
  ),
});

type ProfileFormType = z.infer<typeof formSchema>;

export default function ProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { CREATE_CARD } = cardRequest();

  const form = useForm<ProfileFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "male",
      nationality: "Cambodian",
      dob: "",
      address: "",
      phone: "",
      card_type: "Minimal",
      web_site: "",
      bio: "",
      company: "",
      job: "",
      social: [{ platform: "", icon: "", url: "" }],
    },
  });

  const { control, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "social",
  });

  // const [avatarFile, setAvatarFile] = useState<File | null>(null);
  // const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [socialIcons, setSocialIcons] = useState<Record<number, File | null>>(
    {}
  );
  const [iconPreviews, setIconPreviews] = useState<Record<number, string>>({});

  const isValidImage = (file: File) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    const maxSize = 2 * 1024 * 1024;
    return allowedTypes.includes(file.type) && file.size <= maxSize;
  };

  const createCardMutation = useMutation({
    mutationKey: ["crate_card"],
    mutationFn: (payload: CreateCardType) => CREATE_CARD(payload),
    onSuccess: () => {
      form.reset();
      // setAvatarFile(null);
      // setAvatarPreview(null);
      setSocialIcons({});
      setIconPreviews({});
      router.push("/");
    },
  });

  const onSubmit = async (values: ProfileFormType) => {
    setIsSubmitting(true);

    // Upload new icons only if new files selected
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const updatedSocial = await Promise.all(
      values.social.map(async (item, index) => {
        const file = socialIcons[index];
        if (file) {
          const formData = new FormData();
          formData.append("image", file);
          const res = await fetch(`${BASE_URL}/upload/upload-image`, {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          return { ...item, icon: data.url };
        }

        // 🧠 Keep existing icon preview if no new file
        return {
          ...item,
          icon: iconPreviews[index] || "",
        };
      })
    );

    const finalPayload = {
      ...values,
      // avatar: avatarUrl,
      social: updatedSocial,
    };
    createCardMutation.mutate(finalPayload);

    console.log("Final Payload:", finalPayload);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-sm mx-auto space-y-4">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-2xl mx-auto"
          >
            {/* Form Inputs */}
            <FormField
              control={control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nationality" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="job"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Job" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Company" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="web_site"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Website" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Bio" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="card_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Card Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Modern">Modern</SelectItem>
                      <SelectItem value="Minimal">Minimal</SelectItem>
                      <SelectItem value="Corporate">Corporate</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dynamic Social Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Social Media Links</h3>
              {fields.map((fieldItem, index) => (
                <div
                  key={fieldItem.id}
                  className="border p-4 rounded-md space-y-3 relative"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>

                  {/* Icon Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Icon</label>
                    <div className="flex items-center space-x-4">
                      <label
                        htmlFor={`icon-upload-${index}`}
                        className="cursor-pointer relative group"
                      >
                        <div className="w-12 h-12 rounded-md border bg-gray-100 overflow-hidden flex items-center justify-center">
                          {iconPreviews[index] ? (
                            <Avatar>
                              <AvatarImage
                                src={iconPreviews[index]}
                                alt="@evilrabbit"
                              />
                              <AvatarFallback>ER</AvatarFallback>
                            </Avatar>
                          ) : (
                            <Avatar>
                              <AvatarImage
                                src="https://github.com/evilrabbit.png"
                                alt="@evilrabbit"
                              />
                              <AvatarFallback>ER</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                        {iconPreviews[index] && (
                          <button
                            type="button"
                            onClick={() => {
                              setSocialIcons((prev) => ({
                                ...prev,
                                [index]: null,
                              }));
                              setIconPreviews((prev) => {
                                const updated = { ...prev };
                                delete updated[index];
                                return updated;
                              });
                            }}
                            className="absolute -top-1 -right-1 bg-white text-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs shadow"
                          >
                            ✕
                          </button>
                        )}
                      </label>

                      <Input
                        id={`icon-upload-${index}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file && isValidImage(file)) {
                            setSocialIcons((prev) => ({
                              ...prev,
                              [index]: file,
                            }));
                            setIconPreviews((prev) => ({
                              ...prev,
                              [index]: URL.createObjectURL(file),
                            }));
                          } else {
                            alert("Icon must be an image under 2MB");
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Platform */}
                  <FormField
                    control={control}
                    name={`social.${index}.platform` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="facebook, instagram..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* URL */}
                  <FormField
                    control={control}
                    name={`social.${index}.url` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform Url</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => append({ platform: "", icon: "", url: "" })}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Social Link
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || createCardMutation.isPending}
            >
              {isSubmitting || createCardMutation.isPending
                ? "Creating..."
                : "Create"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
