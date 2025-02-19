import { create } from "zustand";
import { persist } from "zustand/middleware";

// type NewNotificationState = {
//   hasNewNotification: boolean;
//   setHasNewNotification: (hasNewNotification: boolean) => void;
// };

// export const useNewNotificationStore = create<NewNotificationState>((set) => ({
//   hasNewNotification: false,
//   setHasNewNotification: (hasNewNotification) => set({ hasNewNotification }),
// }));

interface UnreadState {
  channelUnread: Record<string, number>;
  conversationUnread: Record<string, number>;
  groupUnread: Record<string, number>;
  lastReadTimestamps: Record<string, number>;
}

interface NotificationState extends UnreadState {
  incrementUnread: (
    type: "channel" | "conversation" | "group",
    id: string
  ) => void;
  markAsRead: (type: "channel" | "conversation" | "group", id: string) => void;
  hasUnread: (
    type: "channel" | "conversation" | "group",
    id: string
  ) => boolean;
  getTotalUnread: (
    type: "channel" | "conversation" | "group",
    id: string
  ) => number;
  resetUnread: (type: "channel" | "conversation" | "group", id: string) => void;
}

const initialState: UnreadState = {
  channelUnread: {},
  conversationUnread: {},
  groupUnread: {},
  lastReadTimestamps: {},
};

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      ...initialState,

      incrementUnread: (type, id) =>
        set((state) => {
          const stateKey = `${type}Unread` as keyof UnreadState;
          const unreadState = state[stateKey] as Record<string, number>;

          return {
            [stateKey]: {
              ...unreadState,
              [id]: (unreadState?.[id] || 0) + 1,
            },
          };
        }),

      markAsRead: (type, id) =>
        set((state) => {
          const stateKey = `${type}Unread` as keyof UnreadState;
          const unreadState = state[stateKey] as Record<string, number>;

          return {
            [stateKey]: {
              ...unreadState,
              [id]: 0,
            },
            lastReadTimestamps: {
              ...state.lastReadTimestamps,
              [id]: Date.now(),
            },
          };
        }),

      hasUnread: (type, id) => {
        const state = get();
        const stateKey = `${type}Unread` as keyof UnreadState;
        const unreadState = state[stateKey] as Record<string, number>;
        return (unreadState?.[id] || 0) > 0;
      },

      getTotalUnread: (type, id) => {
        const state = get();
        const stateKey = `${type}Unread` as keyof UnreadState;
        const unreadState = state[stateKey] as Record<string, number>;
        return unreadState?.[id] || 0;
      },

      resetUnread: (type, id) =>
        set((state) => {
          const stateKey = `${type}Unread` as keyof UnreadState;
          const unreadState = state[stateKey] as Record<string, number>;

          return {
            [stateKey]: {
              ...unreadState,
              [id]: 0,
            },
          };
        }),
    }),
    {
      name: "chat-notifications",
      version: 1,
    }
  )
);
