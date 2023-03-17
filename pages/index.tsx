import Head from "next/head";
import { Inter } from "next/font/google";
import { useQuery } from "urql";
import { PRODUCT_QUERY } from "@/lib/query";
import Product from "@/components/Product";
import { StyledGallery } from "@/styles/StyledGallery";
import { IProduct } from "@/types/product";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;

  // Check for the data coming in

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const products: IProduct[] | undefined = data.products.data;

  return (
    <>
      <Head>
        <title>Styled - HomePage</title>
        <meta
          name="description"
          content="Styled commerce shop with baby cloth"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <StyledGallery>
          {products &&
            products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
        </StyledGallery>
      </main>
    </>
  );
}
