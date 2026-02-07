"use client";

import { Modal, Descriptions, Avatar, Image } from "antd";
import type { Hero } from "@/app/types/hero";
import dayjs from "dayjs";

interface Props {
  hero: Hero | null;
  open: boolean;
  onClose: () => void;
}

export default function HeroDetailsModal({ hero, open, onClose }: Props) {
  if (!hero) return null;

  return (
    <Modal open={open} onCancel={onClose} footer={null} title={hero.nickname}>
      <Image
        src={hero.avatarUrl ?? "/avatar-placeholder.webp"}
        alt={hero.name}
        width={96}
        height={96}
        preview={false}
        fallback="/avatar-placeholder.webp"
        style={{
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />

      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="Nome">{hero.name}</Descriptions.Item>

        <Descriptions.Item label="Data de nascimento">
           {hero.dateOfBirth ? dayjs(hero.dateOfBirth).format("DD/MM/YYYY") : "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Universo">{hero.universe}</Descriptions.Item>

        <Descriptions.Item label="Poder principal">{hero.mainPower}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}
