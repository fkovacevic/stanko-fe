import { clientsClaim } from 'workbox-core';

import { precacheAndRoute } from 'workbox-precaching';

clientsClaim();

/* eslint-disable no-restricted-globals */

precacheAndRoute(self.__WB_MANIFEST);
