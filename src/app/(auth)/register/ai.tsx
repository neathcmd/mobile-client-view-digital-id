// "use client";

// import React, { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// // import { toast } from "sonner";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
// import {
//   Form,
//   FormControl,
//   //   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   INPUT_STYLE,
//   FORM_STYLE,
//   ICON_STYLE,
//   AUTH_HEADER_STYLE,
// } from "@/constants/form-styling";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";

// const RegisterSchema = z.object({
//   full_name: z.string().nonempty({
//     message: "Full name is required",
//   }),

//   user_name: z.string().nonempty({ message: "Username is required" }),

//   email: z
//     .string()
//     .nonempty({ message: "Email is required." })
//     .email({ message: "Please enter a valid email address." }),

//   password: z
//     .string()
//     .nonempty({ message: "Password is required." })
//     .min(4, { message: "Password must be at least 4 characters." }),
//   // .refine((val) => /[A-Z]/.test(val), {
//   //   message: "Password must contain at least one uppercase letter.",
//   // }),
// });

// const RegisterForm = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isPending, setIsPending] = useState(false);
//   const router = useRouter();

//   const form = useForm<z.infer<typeof RegisterSchema>>({
//     resolver: zodResolver(RegisterSchema),
//     defaultValues: {
//       full_name: "",
//       user_name: "",
//       email: "",
//       password: "",
//     },
//   });

//   const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

//   // Registration function
//   const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
//     setIsPending(true);

//     try {
//       // Register user
//       const registerResponse = await fetch(`${BASE_URL}/auth/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });

//       if (!registerResponse.ok) {
//         throw new Error("Registration failed");
//       }

//       const registerData = await registerResponse.json();

//       // Store token if provided
//       if (registerData.token) {
//         localStorage.setItem("token", registerData.token);
//       }

//       // Redirect to profile page
//       router.push("/profile");

//       // Optional: Show success message
//       // toast.success("Account created successfully!");
//     } catch (error) {
//       console.error("Registration error:", error);
//       // toast.error("Registration failed. Please try again.");
//     } finally {
//       setIsPending(false);
//     }
//   };

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
//       <div className="w-full max-w-md">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className={FORM_STYLE}>
//             <div className="text-center mb-8">
//               <h1 className={AUTH_HEADER_STYLE}>Create Account</h1>
//               <p className="text-gray-600 mt-2">
//                 Join us and get started today
//               </p>
//             </div>
//             <FormField
//               control={form.control}
//               name="full_name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Full Name</FormLabel>
//                   <FormControl>
//                     <div className="relative">
//                       <User className={ICON_STYLE} />
//                       <Input
//                         placeholder="Enter your full name"
//                         {...field}
//                         className={INPUT_STYLE}
//                         disabled={isPending}
//                       />
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="user_name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Username</FormLabel>
//                   <FormControl>
//                     <div className="relative">
//                       <User className={ICON_STYLE} />
//                       <Input
//                         placeholder="Choose a username"
//                         {...field}
//                         className={INPUT_STYLE}
//                         disabled={isPending}
//                       />
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <div className="relative">
//                       <Mail className={ICON_STYLE} />
//                       <Input
//                         type="email"
//                         placeholder="Enter your email"
//                         {...field}
//                         className={INPUT_STYLE}
//                         disabled={isPending}
//                       />
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <div className="relative">
//                       <Lock className={ICON_STYLE} />
//                       <Input
//                         type={showPassword ? "text" : "password"}
//                         placeholder="Create a strong password"
//                         {...field}
//                         className={INPUT_STYLE}
//                         disabled={isPending}
//                       />
//                       <button
//                         type="button"
//                         onClick={togglePasswordVisibility}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                         disabled={isPending}
//                       >
//                         {showPassword ? (
//                           <EyeOff className="w-5 h-5" />
//                         ) : (
//                           <Eye className="w-5 h-5" />
//                         )}
//                       </button>
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button type="submit" className="w-full" disabled={isPending}>
//               {isPending ? "Creating Account..." : "Create Account"}
//             </Button>

//             <div className="mt-6 text-center">
//               <p className="text-sm text-gray-600">
//                 Already have an account?{" "}
//                 <Link
//                   href="/login"
//                   className="text-green-700 font-medium hover:text-green-800 hover:underline transition-colors"
//                 >
//                   Sign in here
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;
