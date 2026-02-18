
import type { Hero } from "../types/hero";

export type HeroesResponse = {
  heroes: Hero[];
  page: number;
  perPage: number;
  totalPages: number;
}

export async function getHeroes(
    page = 1,
    search?: string
): Promise<HeroesResponse> {
    const params = new URLSearchParams({
        page: String(page),
    });

    if (search) params.append("search", search);

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/heroes?${params.toString()}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.message || "Erro ao buscar heróis");
    }

    return res.json();
}

export async function createHero(hero: Hero): Promise<{ hero: Hero, success: boolean, message: string }> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/heroes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hero),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.message || 'Erro ao criar herói');
    }

    const data = await res.json();
    return data;
}

export async function updateHero(id: string, hero: Hero): Promise<{ hero: Hero, success: boolean, message: string }> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/heroes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hero),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.message || 'Erro ao atualizar herói');
    }

    const data = await res.json();
    return data;
}

export async function deleteHero(id: string): Promise<{ success: boolean, message: string }> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/heroes/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.message || 'Erro ao excluir herói');
    }

    if (res.status === 204) {
        return { success: true, message: 'Herói excluído com sucesso!' };
    }

    const data = await res.json();
    return data;
}

export async function toggleHero(id: string, isActive: boolean): Promise<{ sucess: boolean, message: string }> {
    console.log("URL", `${process.env.NEXT_PUBLIC_API_URL}/heroes/${id}/status`);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/heroes/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive }),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.message || 'Erro ao atualizar herói');
    }

    const data = await res.json();
    return data;
}

