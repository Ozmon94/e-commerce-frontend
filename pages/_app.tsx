import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, createClient } from "urql";
import Nav from "@/components/Nav";
import { StateContext } from "@/lib/context";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from "react-hot-toast";

const client = createClient({
  url: process.env.NEXT_PUBLIC_BACKEND_API
    ? process.env.NEXT_PUBLIC_BACKEND_API
    : "",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <StateContext>
        <Provider value={client}>
          <Toaster />
          <Nav />
          <Component {...pageProps} />
        </Provider>
      </StateContext>
    </UserProvider>
  );
}
