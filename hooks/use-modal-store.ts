import { Channel, ChannelType, Group  } from "@prisma/client";
import { create } from "zustand";
import { CreateOrder, OrderInfo } from "@/types";
export type ModalType = "createGroup" | "invite" | "editGroup" | "members" | "createChannel" | "leaveGroup" | "deleteGroup" | "deleteChannel" | "editChannel" | "messageFile" | "deleteMessage" | "createOrder" | "viewOrderInfo";

interface ModalData {
  products?: CreateOrder[];
  orderDetails?: OrderInfo;
  group?: Group;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false })
}));
