"use client";

import {
  Card,
  Dropdown,
  Flex,
  Image,
  Typography,
  Switch,
  Tooltip,
  MenuProps,
} from "antd";
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { Hero } from "@/app/types/hero";

const { Title } = Typography;

interface HeroCardProps {
  hero: Hero;
  onEdit: (hero: Hero) => void;
  onDelete: (hero: Hero) => void;
  onToggle: (hero: Hero) => void;
  onOpenDetails: (hero: Hero) => void;
}

export default function HeroCard({
  hero,
  onEdit,
  onDelete,
  onToggle,
  onOpenDetails,
}: HeroCardProps) {
  // Construa os itens do menu fora do JSX principal
  const getMenuItems = (): MenuProps["items"] => {
    const items: MenuProps["items"] = [
      {
        key: "edit",
        icon: (
          <Tooltip title="Editar">
            <EditOutlined />
          </Tooltip>
        ),

        onClick: (e) => {
          e.domEvent.stopPropagation(); // Importante!
          onEdit(hero);
        },
      },
    ];

    if (hero.isActive) {
      items.push({
        key: "delete",
        danger: true,
        icon: (
          <Tooltip title="Excluir">
            <DeleteOutlined />
          </Tooltip>
        ),

        onClick: (e) => {
          e.domEvent.stopPropagation(); // Importante!
          onDelete(hero);
        },
      });
    }

    items.push({
      key: "toggle",
      label: (
        <Flex align="center" gap={8} onClick={(e) => e.stopPropagation()}>
          <Switch
            checked={hero.isActive}
            onChange={() => onToggle(hero)}
            checkedChildren="Ativo"
            unCheckedChildren="Inativo"
          />
        </Flex>
      ),
    });

    return items;
  };

  return (
    <Card
      hoverable
      style={{
        position: "relative",
        padding: 16,
        filter: hero.isActive ? "none" : "grayscale(100%)",
        opacity: hero.isActive ? 1 : 0.6,
        boxShadow: hero.isActive ? "none" : "0 0 0 1px #ccc",
      }}
      styles={{
        body: {
          padding: 16,
        },
      }}
    >
      <Dropdown
        trigger={["click"]}
        placement="bottomRight"
        menu={{
          items: getMenuItems(),
          onClick: (info) => {
            info.domEvent.stopPropagation(); // Previene propagação
          },
        }}
        destroyOnHidden // ← IMPORTANTE: Destrói o popup quando esconder
        autoAdjustOverflow
      >
        <EllipsisOutlined
          style={{
            fontSize: 18,
            cursor: "pointer",
            position: "absolute",
            top: "1rem",
            right: "1rem",
            zIndex: 10,
          }}
          onClick={(e) => e.stopPropagation()}
        />
      </Dropdown>

      <div
        onClick={() => onOpenDetails(hero)}
        style={{
          padding: 16,
          cursor: "pointer",
          filter: hero.isActive ? "none" : "grayscale(100%)",
          opacity: hero.isActive ? 1 : 0.6,
        }}
      >
        <Flex align="center" gap={16} vertical>
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

          <Title level={5} style={{ margin: 0 }}>
            {hero.nickname}
          </Title>
        </Flex>
      </div>
    </Card>
  );
}
