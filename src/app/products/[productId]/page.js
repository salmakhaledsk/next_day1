import { getAllUsers } from "@/app/productFetch/productService";
import { notFound, redirect } from "next/navigation";
import React from "react";

// export const metadata = {
//   title: 'Details',
//   description: 'This is details page',
// }

// export const dynamicParams in url Taskk4
export async function generateMetadata({ params }) {
  let data;
  const u = await params;
  const res = await fetch(`https://fakestoreapi.com/users/${u.productId}`);
  data = await res.json();
  return {
    title: data.username,
  };
}

// ////////7let moshklet dynamic rendering 3lshan el data sabta l ay 7d////////////////////////////////////


export async function generateStaticParams() {
  const users = await getAllUsers();
  const ids = users.map((user) => ({ productId: user.id.toString() }));
  return ids;
}

// //////////////////////////////////////////////////////////////////////
async function Details({ params }) {
  if (!params || !params.productId) {
    notFound(); // Handle the case where params or productId is missing
    return;
  }

  const u = params;
  console.log(u);
  let data;
  try {
    const res = await fetch(`https://fakestoreapi.com/users/${u.productId}`);
    data = await res.json();
    if (!data || !data.username) {
      notFound();
      console.log(data);
    }
  } catch (error) {
    notFound();
  }

  async function Go() {
    "use server";
    redirect("/products");
  }

  return (
    <div>
      details
      <h2>{data.username}</h2>
      <h2>{data.email}</h2>
      <form action={Go}>
        <button className="btn btn-success" type="submit">
          Go Back
        </button>
      </form>
    </div>
  );
}

export default Details;
