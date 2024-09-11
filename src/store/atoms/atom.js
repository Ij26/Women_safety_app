import {atom} from 'recoil';

export const LoginCheck= atom({
    key:"LoginCheck",
    default: (localStorage.getItem('userId') ? true : false)
})

export const intervalIdAtom = atom({
    key: "intervalIdAtom",
    default: null,
  });

  export const locationAtom = atom({
    key: "locationAtom",
    default: {
      latitude: null,
      longitude: null
    },
  });

  export const notificationAtom = atom({
    key: 'notificationAtom',
    default: [], 
  });

  export const webSocketAtom = atom({
    key: 'webSocketAtom',
    default: null, // Initial value is null or you can use an empty object
  });

  export const directionAtom= atom({
    key: 'directionAtom',
    default: null
  })