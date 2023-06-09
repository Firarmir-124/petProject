import { EventListFull, EventOne, ValidationError, TitleEventsType, OnlineType } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  checkedEvent,
  createEvent,
  fetchEventList,
  fetchEventListFilter,
  fetchEventTitle,
  fetchOneEvent,
  removeEvent,
} from './eventThunk';

interface EventType {
  listOnlineRoom: OnlineType[];
  listOnline: OnlineType[];
  inviteStatus: boolean;
  eventList: EventListFull;
  eventListLoading: boolean;
  eventCreateLoading: boolean;
  eventEditLoading: boolean;
  eventRemoveLoading: boolean;
  eventOne: EventOne | null;
  eventOneLoading: boolean;
  eventError: ValidationError | null;
  snackbar: {
    status: boolean;
    parameter: string;
  };
  modal: boolean;
  cellTable: {
    id: string;
    fullName: string;
    name: string;
    show: boolean;
  }[];
  drawerState: boolean;
  idHashtag: string;
  perPage: number;
  localSettingsLoading: boolean;
  titleEvents: TitleEventsType[];
  titleEventsLoading: boolean;
  selectedEventId: string[];
  checkedEventLoading: boolean | string;
}

const initialState: EventType = {
  listOnline: [],
  inviteStatus: false,
  eventList: {
    length: 0,
    perPage: 8,
    eventList: [],
    pages: 0,
  },
  eventListLoading: false,
  eventCreateLoading: false,
  eventEditLoading: false,
  eventRemoveLoading: false,
  eventOne: null,
  eventOneLoading: false,
  eventError: null,
  snackbar: {
    status: false,
    parameter: '',
  },
  modal: false,
  cellTable: [
    {
      id: '1',
      fullName: 'title',
      name: 'Название',
      show: true,
    },
    {
      id: '2',
      fullName: 'time',
      name: 'Время',
      show: true,
    },
    {
      id: '3',
      name: 'Гости',
      fullName: 'guest',
      show: true,
    },
    {
      id: '4',
      fullName: 'speaker',
      name: 'Спикеры',
      show: true,
    },
    {
      id: '5',
      fullName: 'hashtag',
      name: 'Хэштег',
      show: true,
    },
  ],
  drawerState: false,
  idHashtag: '',
  perPage: 0,
  localSettingsLoading: false,
  titleEvents: [],
  titleEventsLoading: false,
  selectedEventId: [],
  checkedEventLoading: false,
  listOnlineRoom: [],
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    openSnackbar: (state, { payload: obj }: PayloadAction<{ status: boolean; parameter: string }>) => {
      state.snackbar = obj;
    },
    openModal: (state) => {
      state.modal = true;
    },
    closeModal: (state) => {
      state.modal = false;
    },
    toggleShowCellTable: (state, { payload: id }: PayloadAction<string>) => {
      const index = state.cellTable.findIndex((item) => item.id === id);
      state.cellTable[index].show = state.cellTable[index].show !== true;
    },
    openDrawer: (state) => {
      state.drawerState = true;
    },
    closeDrawer: (state) => {
      state.drawerState = false;
    },
    addIdHashtag: (state, { payload: id }: PayloadAction<string>) => {
      state.idHashtag = id;
    },
    createPerPage: (state, { payload: perPage }: PayloadAction<number>) => {
      state.perPage = perPage;
    },
    addInvite: (state, { payload: type }: PayloadAction<boolean>) => {
      state.inviteStatus = type;
    },
    addUserOnline: (state, { payload: type }: PayloadAction<OnlineType[]>) => {
      state.listOnline = type;
    },
    addUserOnlineRoom: (state, { payload: type }: PayloadAction<OnlineType[]>) => {
      state.listOnlineRoom = type;
    },
    addEventId: (state) => {
      state.eventList.eventList.filter((item) => {
        if (item.checked === true) {
          const index = state.selectedEventId.indexOf(item._id);
          if (index === -1) state.selectedEventId.push(item._id);
        } else if (item.checked === false) {
          const index = state.selectedEventId.indexOf(item._id);
          if (index > -1) state.selectedEventId.splice(index, 1);
        }
      });
    },
    resetEventId: (state) => {
      state.selectedEventId = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkedEvent.pending, (state, { meta: { arg: id } }) => {
      state.checkedEventLoading = id.id ? id.id : '';
    });
    builder.addCase(checkedEvent.fulfilled, (state) => {
      state.checkedEventLoading = false;
    });
    builder.addCase(checkedEvent.rejected, (state) => {
      state.checkedEventLoading = false;
    });

    builder.addCase(fetchEventListFilter.fulfilled, (state, { payload: eventList }) => {
      state.eventList = eventList;
    });

    builder.addCase(fetchEventList.pending, (state) => {
      state.eventListLoading = true;
    });
    builder.addCase(fetchEventList.fulfilled, (state, { payload: eventList }) => {
      state.eventListLoading = false;
      state.eventList = eventList;
    });
    builder.addCase(fetchEventList.rejected, (state) => {
      state.eventListLoading = false;
    });

    builder.addCase(fetchEventTitle.pending, (state) => {
      state.titleEventsLoading = true;
    });
    builder.addCase(fetchEventTitle.fulfilled, (state, { payload: titleEvent }) => {
      state.titleEventsLoading = false;
      state.titleEvents = titleEvent;
    });
    builder.addCase(fetchEventTitle.rejected, (state) => {
      state.titleEventsLoading = false;
    });

    builder.addCase(createEvent.pending, (state) => {
      state.eventCreateLoading = true;
    });
    builder.addCase(createEvent.fulfilled, (state) => {
      state.eventCreateLoading = false;
    });
    builder.addCase(createEvent.rejected, (state) => {
      state.eventCreateLoading = false;
    });

    builder.addCase(fetchOneEvent.pending, (state) => {
      state.eventOneLoading = true;
      state.eventOne = null;
    });
    builder.addCase(fetchOneEvent.fulfilled, (state, { payload: eventOne }) => {
      state.eventOneLoading = false;
      state.eventOne = eventOne;
    });
    builder.addCase(fetchOneEvent.rejected, (state) => {
      state.eventOneLoading = false;
    });

    builder.addCase(removeEvent.pending, (state) => {
      state.eventRemoveLoading = true;
    });
    builder.addCase(removeEvent.fulfilled, (state) => {
      state.eventRemoveLoading = false;
    });
    builder.addCase(removeEvent.rejected, (state) => {
      state.eventRemoveLoading = false;
    });
  },
});

export const eventReducer = eventSlice.reducer;
export const {
  openSnackbar,
  openModal,
  closeModal,
  toggleShowCellTable,
  openDrawer,
  closeDrawer,
  createPerPage,
  addInvite,
  addUserOnline,
  addEventId,
  resetEventId,
  addUserOnlineRoom,
} = eventSlice.actions;

export const selectEventList = (state: RootState) => state.event.eventList;
export const selectCreateEventLoading = (state: RootState) => state.event.eventCreateLoading;
export const selectEditLoading = (state: RootState) => state.event.eventEditLoading;
export const selectRemoveEventLoading = (state: RootState) => state.event.eventRemoveLoading;
export const selectEventOne = (state: RootState) => state.event.eventOne;
export const selectEventOneLoading = (state: RootState) => state.event.eventOneLoading;
export const selectEventError = (state: RootState) => state.event.eventError;
export const selectEventLoading = (state: RootState) => state.event.eventListLoading;
export const selectSnackbarState = (state: RootState) => state.event.snackbar;
export const selectModal = (state: RootState) => state.event.modal;
export const selectCellTable = (state: RootState) => state.event.cellTable;
export const selectDrawerState = (state: RootState) => state.event.drawerState;
export const selectIdHashtag = (state: RootState) => state.event.idHashtag;
export const selectPerPage = (state: RootState) => state.event.perPage;
export const selectSettingsLocalLoading = (state: RootState) => state.event.localSettingsLoading;
export const selectEventTitleLoading = (state: RootState) => state.event.titleEventsLoading;
export const selectEventTitle = (state: RootState) => state.event.titleEvents;
export const selectInviteStatus = (state: RootState) => state.event.inviteStatus;
export const selectListOnline = (state: RootState) => state.event.listOnline;
export const selectSelectedEventId = (state: RootState) => state.event.selectedEventId;
export const selectCheckedEventLoading = (state: RootState) => state.event.checkedEventLoading;
export const selectListOnlineRoomUser = (state: RootState) => state.event.listOnlineRoom;
