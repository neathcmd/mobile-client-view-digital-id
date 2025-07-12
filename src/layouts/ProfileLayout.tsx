import { ReactNode } from "react";
import Head from "next/head";
import "@/app/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

interface DefaultLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const DefaultLayout = ({
  children,
  title = "Digital ID",
  description = "Digital ID System",
}: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <main className="flex-1">{children}</main>
        {/* <Footer /> Uncomment if you have a footer */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default DefaultLayout;
