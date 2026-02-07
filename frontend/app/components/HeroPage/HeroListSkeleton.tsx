import { Row, Col, Skeleton } from "antd";

export default function HeroListSkeleton() {
  return (
    <Row gutter={[16, 16]} justify="center" style={{ padding: "46px 16px" }}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Col
          key={index}
          xs={24}
          sm={12}
          md={8}
          style={{ flex: "0 0 20%", maxWidth: "20%" }}
        >
          <Skeleton active avatar paragraph={{ rows: 3 }} />
        </Col>
      ))}
    </Row>
  );
}
