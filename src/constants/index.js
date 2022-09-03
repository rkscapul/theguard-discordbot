const PRESENCE_ACTIVITY = {
  listening: 2,
  playing: 0,
  watching: 3
};

const PRESENCE_STATUS = {
  active: 'active',
  all: 'all',
  inactive: 'inactive,'
};

const DEFAULT_PRESENCES = {
  startup: {
    message: 'admins and pings..',
    activity: {
      type: PRESENCE_ACTIVITY.listening
    }
  },
  default: {
    message: 'in The Inbetween',
    activity: {
      type: PRESENCE_ACTIVITY.playing
    }
  }
};

export {
  DEFAULT_PRESENCES,
  PRESENCE_ACTIVITY,
  PRESENCE_STATUS
};