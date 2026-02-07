'use client';
import { Layout } from "antd";

const { Content } = Layout;

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <Content
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "24px",
        width: "100%",
      }}
    >
      {children}
    </Content>
  );
}
