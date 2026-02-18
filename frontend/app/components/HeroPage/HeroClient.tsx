"use client";

import { useState, useEffect } from "react";
import { Pagination, Modal, App } from "antd";
import { Hero } from "@/app/types/hero";
import HeroList from "./HeroList";
import SearchBar from "../SearchBar/page";
import {
  createHero,
  updateHero,
  deleteHero,
  toggleHero,
  getHeroes,
} from "@/app/services/heroes.service";
import { HeroFormModal } from "@/app/components/HeroFormModal/HeroFormModal";
import HeroDetailsModal from "@/app/components/HeroDetailsModal/HeroDetailsModal";
import PageHeader from "@/app/components/PageHeader/page";

interface Props {
  initialData: {
    heroes: Hero[];
    page: number;
    totalPages: number;
  };
}

export default function HeroesClient({ initialData }: Props) {
  const [heroes, setHeroes] = useState(initialData.heroes);
  const [page, setPage] = useState(initialData.page);
  const [totalPages, setTotalPages] = useState(initialData.totalPages);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingHero, setEditingHero] = useState<Hero | undefined>();

  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [activeModal, setActiveModal] = useState<{
    type: "delete" | "toggle" | null;
    hero: Hero | null;
  }>({ type: null, hero: null });

  const { message: messageApi, modal: modalApi } = App.useApp();

  const [modal, modalContextHolder] = Modal.useModal();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const modals = document.querySelectorAll(".ant-modal-root");
      if (modals.length > 1) {
        Modal.destroyAll();
      }
    }
  }, []);

  const fetchPage = async (newPage: number) => {
    setLoading(true);
    try {
      const res = await getHeroes(newPage);
      setHeroes(res.heroes);
      setPage(res.page);
      setTotalPages(res.totalPages);
    } catch {
      messageApi.error("Erro ao carregar heróis");
    } finally {
      setLoading(false);
    }
  };



  const handleSearch = async (search: string) => {
    setLoading(true);
    try {
      const res = await getHeroes(1, search);
      setHeroes(res.heroes);
      setPage(res.page);
      setTotalPages(res.totalPages);
    } catch {
      messageApi.error("Erro ao buscar heróis");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingHero(undefined);
    setModalOpen(true);
  };

  const handleEdit = (hero: Hero) => {
    if (!hero.isActive) {
      messageApi.error("Herói precisa estar ativo para ser editado");
      return;
    }
    setEditingHero(hero);
    setModalOpen(true);
  };

  const handleSubmit = async (payload: any) => {
    setLoading(true);
    try {
      if (editingHero) {
        const res = await updateHero(editingHero.id, payload);
        setHeroes((prev) =>
          prev.map((h) => (h.id === editingHero.id ? res.hero : h)),
        );
        messageApi.success(res.message);
      } else {
        const res = await createHero(payload);
        setHeroes((prev) => [res.hero, ...prev.slice(0, 9)]);
        messageApi.success(res.message);
      }
    } catch (err: any) {
      messageApi.error(err.message || "Erro ao salvar herói");
    } finally {
      setLoading(false);
      setModalOpen(false);
    }
  };

  const handleDelete = (hero: Hero) => {
    if (activeModal.type) {
      Modal.destroyAll();
    }

    setActiveModal({ type: "delete", hero });

    const modalInstance = modal.confirm({
      title: "Excluir herói?",
      content: `Deseja excluir ${hero.name}?`,
      okText: "Excluir",
      okType: "danger",
      async onOk() {
        try {
          const res = await deleteHero(hero.id);
          messageApi.success(res.message);
          setHeroes((prev) => prev.filter((h) => h.id !== hero.id));
          fetchPage(page);
          setActiveModal({ type: null, hero: null });
        } catch (err: any) {
          messageApi.error(err.message || "Erro ao excluir herói");
        }
      },
      onCancel: () => {
        setActiveModal({ type: null, hero: null });
      },
      afterClose: () => {
        setActiveModal({ type: null, hero: null });
      },
    });

    return modalInstance;
  };

  const handleToggle = (hero: Hero) => {
    if (activeModal.type) {
      Modal.destroyAll();
    }

    setActiveModal({ type: "toggle", hero });

    const modalInstance = modal.confirm({
      title: hero.isActive ? "Desativar herói" : "Ativar herói",
      content: `Deseja ${hero.isActive ? "desativar" : "ativar"} ${hero.name}?`,
      okText: "Sim",
      okType: hero.isActive ? "primary" : "danger",
      async onOk() {
        try {
          const res = await toggleHero(hero.id, !hero.isActive);
          messageApi.success(res.message);
          setHeroes((prev) =>
            prev.map((h) =>
              h.id === hero.id ? { ...h, isActive: !h.isActive } : h,
            ),
          );
          fetchPage(page);
          setActiveModal({ type: null, hero: null });
        } catch (err: any) {
          messageApi.error(err.message || `Erro ao atualizar ${hero.name}`);
        }
      },
      onCancel: () => {
        setActiveModal({ type: null, hero: null });
      },
      afterClose: () => {
        setActiveModal({ type: null, hero: null });
      },
    });

    return modalInstance;
  };

  const openDetails = (hero: Hero) => {
    setSelectedHero(hero);
    setDetailsOpen(true);
  };

  return (
    <>
      {modalContextHolder}
      <PageHeader fetchPage={fetchPage} />
      <SearchBar onCreate={handleCreate} onSearch={handleSearch} />
      <HeroList
        heroes={heroes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onOpenDetails={openDetails}
      />
      <div className="flex justify-center md:justify-end items-center mt-4">
        <Pagination
          current={page}
          total={totalPages * 10}
          pageSize={10}
          onChange={fetchPage}
        />
      </div>
      <HeroFormModal
        open={modalOpen}
        hero={editingHero}
        loading={loading}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
      <HeroDetailsModal
        hero={selectedHero}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </>
  );
}
