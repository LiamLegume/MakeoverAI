import { ImageOff } from "lucide-react";
import { withAffiliateTag } from "@/lib/affiliateLinks";
import type { Product } from "@/lib/types";
import { Button } from "@/components/Button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasImage = Boolean(product.imageUrl);

  return (
    <article className="premium-card flex h-full flex-col overflow-hidden rounded-soft border border-line bg-white shadow-card">
      <div className="overflow-hidden bg-oat">
        {hasImage ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-36 w-full object-cover transition duration-300 hover:scale-105"
          />
        ) : (
          <div className="grid h-36 place-items-center text-muted">
            <div className="text-center">
              <ImageOff aria-hidden="true" className="mx-auto" size={24} />
              <p className="mt-2 text-xs font-semibold uppercase">Product image</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase text-sage">{product.category}</p>
            <h3 className="mt-1 text-base font-semibold">{product.name}</h3>
          </div>
          <span className="rounded-soft border border-line px-2 py-1 text-xs text-muted">
            {product.priceRange}
          </span>
        </div>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted">{product.reason}</p>
        <p className="mt-3 text-xs text-muted">Price and availability may change.</p>
        <Button
          href={withAffiliateTag(product.affiliateUrl)}
          variant="secondary"
          className="mt-4 w-full"
        >
          View product
        </Button>
      </div>
    </article>
  );
}
