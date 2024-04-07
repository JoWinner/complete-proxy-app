import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import { Group, Member, Profile, Store as Storefront } from "@prisma/client"

export type GroupWithMembersWithProfiles = Group & {
  members: (Member & { profile: Profile })[];
};

export type ProductWithGroupAndMembers = Product & {
  group: GroupWithMembersWithProfiles;
  store?:Storefront ;
};


export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
export interface Store {
  id: string;
  storeName: string;
  username: string;
  logoUrl: string;
  storeMail: string;
  storePhone: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  telegram: string;
  xTwitter: string;
  youtube: string;
  whatsApp: string;
  country: Country;
  profile: Profile;
  // createdAt: Date;
  // updatedAt: Date;
}
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  weight: string | null;
  moq: number;
  isArchived: boolean;
  images: Image[];
  groupId: string;
  group: GroupWithMembersWithProfiles;
}

export interface Image {
  id: string;
  url: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Country{
  id: string;
  name: string;
  profiles: Profile[];
}
 
export type CreateOrder = {
  id: string;
  name: string;
  sellerId: string;
  groupId: string;
  price: string;
  moq: string;
  weight: string;
  images: Image[];
}

export type OrderInfo = {
  id: string;
  productName: string;
  price: string;
  images: Image[];
  quantity: string;
  totalWeight: string;
  totalAmount: string;
  createdAt: string;
  status: string;
  sellerId: string;
  // buyerId: string;
  buyerName: string;
  buyerEmail: string;
  buyerCountry: string;
  buyerProvince: string;
  buyerCity: string;
  buyerPhoneNumber: string;
  buyerZipCode: string;
  buyerStreetAddress: string;
}
