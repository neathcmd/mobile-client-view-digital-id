// "use client";
// import { useState } from "react";
// import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

// export default function Register() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-100">
//       <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-green-800 mb-2">
//           Sign up
//         </h2>
//         <p className="text-center text-sm text-gray-500 mb-6">
//           Fresh Food Delivered.
//         </p>

//         <form className="space-y-4">
//           <div className="relative">
//             <FiMail className="absolute top-3 left-3 text-green-600" />
//             <input
//               type="email"
//               placeholder="example@gmail.com"
//               className="text-gray-600 w-full pl-10 pr-4 py-2 border rounded-full bg-green-50 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//           </div>
//           <div className="relative">
//             <FiLock className="absolute top-3 left-3 text-green-600" />
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="••••••••"
//               className="text-gray-600 w-full pl-10 pr-10 py-2 border rounded-full bg-green-50 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//             <div
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute top-3 right-3 text-green-600 cursor-pointer"
//             >
//               {showPassword ? <FiEyeOff /> : <FiEye />}
//             </div>
//           </div>
//           <div className="relative">
//             <FiLock className="absolute top-3 left-3 text-green-600" />
//             <input
//               type={showConfirm ? "text" : "password"}
//               placeholder="Confirm password"
//               className="text-gray-600 w-full pl-10 pr-10 py-2 border rounded-full bg-green-50 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//             <div
//               onClick={() => setShowConfirm(!showConfirm)}
//               className="absolute top-3 right-3 text-green-600 cursor-pointer"
//             >
//               {showConfirm ? <FiEyeOff /> : <FiEye />}
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-700 text-white py-2 rounded-full hover:bg-green-800 transition"
//           >
//             Sign up
//           </button>
//         </form>

//         <div className="mt-4 text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <a
//             href="/auth/login"
//             className="text-green-700 font-medium hover:underline"
//           >
//             Log in here!
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const RegisterSchema = z.object({
  full_name: z.string().nonempty({
    message: "Full name is required.",
  }),

  user_name: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "invaild email.",
  }),
  password: z.string().min(4, {
    message: "invalid password.",
  }),
});

const RegisterPage = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      user_name: "",
      full_name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof RegisterSchema>) {
    console.log(data);
  }

  return (
    <div className="mx-auto w-full max-w-md shadow-lg rounded-2xl p-4 mt-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="user_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterPage;
