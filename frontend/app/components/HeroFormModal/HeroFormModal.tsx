"use client";

import { Modal, Form, Input, Button, DatePicker, Row, Col } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";
import { Hero } from "@/app/types/hero";

interface FormValues {
  name: string;
  nickname: string;
  dateOfBirth: Dayjs;
  universe: string;
  mainPower: string;
  avatarUrl: string;
}

interface Props {
  open: boolean;
  hero?: Hero;
  loading: boolean;
  onCancel: () => void;
  onSubmit: (
    values: Omit<FormValues, "dateOfBirth"> & { dateOfBirth?: Date },
  ) => void;
}

export function HeroFormModal({
  open,
  hero,
  loading,
  onCancel,
  onSubmit,
}: Props) {
  const [form] = Form.useForm<FormValues>();

  useEffect(() => {
    if (!open) return;

    if (hero) {
      form.setFieldsValue({
        ...hero,
        dateOfBirth: hero.dateOfBirth ? dayjs(hero.dateOfBirth) : undefined,
      });
    } else {
      form.resetFields();
    }
  }, [open, hero, form]);

  const handleFinish = (values: FormValues) => {
    onSubmit({
      ...values,
      dateOfBirth: values.dateOfBirth ? values.dateOfBirth.toDate() : undefined,
    });
  };

  return (
    <Modal
      open={open}
      title={hero ? "Editar herói" : "Criar herói"}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="Nome de Guerra"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="dateOfBirth"
              label="Data de nascimento"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="universe"
              label="Universo"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="mainPower"
              label="Habilidade"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="avatarUrl"
              label="Avatar URL"
              rules={[
                { type: "url", message: "URL inválida", required: true },
                {
                  validator: (_, value) => {
                    if (value && value.length > 190) {
                      return Promise.reject(
                        new Error("URL não pode ter mais de 190 caracteres"),
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Salvar
        </Button>
      </Form>
    </Modal>
  );
}
