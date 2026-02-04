export interface CreateHeroDTO {
  name: string;
  nickname: string;
  dateOfBirth: Date;
  universe: string;
  mainPower: string;
  avatarUrl?: string;
}