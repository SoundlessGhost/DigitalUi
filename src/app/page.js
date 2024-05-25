import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductList from "@/components/ProductList";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    icon: <ArrowDownToLine />,
    name: "Instant Delivered",
    description:
      "Get your assets delivered to your email in seconds and download them right away.",
  },
  {
    icon: <CheckCircle />,
    name: "Guaranteed Quality",
    description:
      "Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.",
  },
  {
    icon: <Leaf />,
    name: "For the Planet",
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment",
  },
];

export default function HomePage() {
  return (
    <main>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your marketplace for high-quality{" "}
            <span className="text-blue-600">digital assets</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to Digital Ui. Every asset on our platform is verified by
            our team to ensure our highest quality standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </div>
      </MaxWidthWrapper>

      {/* TODO: products list */}

      <ProductList />

      <section className=" bg-gray-50 border-gray-200 border-t">
        <MaxWidthWrapper className=" py-20 ">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="flex md:flex md:items-start md:text-left 1g:block 1g:text-center'"
              >
                <div className=" text-center flex items-center flex-col">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 p-4">
                    {perk.icon}
                  </div>

                  <div className="mt-3 md:ml-4 md:mt-3 lg:ml-0 lg:mt-4 ">
                    <h3 className="text-base font-bold text-gray-900">
                      {perk.name}
                    </h3>
                  </div>

                  <p className="text-muted-foreground mt-3 text-sm">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </main>
  );
}
