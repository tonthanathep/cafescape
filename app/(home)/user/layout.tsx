// app/my-page/layout.tsx
import React from "react";

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
