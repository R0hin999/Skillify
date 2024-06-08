export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("hi-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
};
