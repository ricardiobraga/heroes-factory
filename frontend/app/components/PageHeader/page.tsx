"use client";
import Typography from "antd/lib/typography";

type PageHeaderProps = {
  fetchPage: (page: number) => void;
};

export default function PageHeader({ fetchPage }: PageHeaderProps) {
  return (
    <Typography.Title onClick={() => fetchPage(1)} level={1}  style={{ textAlign: "center", color: '#0e2fbb', cursor: "pointer" }}>
      Heróis
    </Typography.Title>
  );
}
