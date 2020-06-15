# PSN ID Checker
<img src="https://vignette.wikia.nocookie.net/logopedia/images/7/7e/PlayStation_Network.png/revision/latest?cb=20110901131500" width="256" />

Easy Playstation Network ID availability checker.

## Motivation
From <b>October 10, 2019</b> Sony has enabled PSN users to change their online IDs.

Until now there is no easy way to check if an id is available to be taken. Generally you have to follow [these steps](https://www.playstation.com/en-us/network/onlineid/change) just to check its availability.

There may be some wrappers for PSN API's but they are designed to be only used by developers.

## Installation and running
```bash
git clone https://github.com/ffrm/psn-id-checker.git

cd psn-id-checker

npm install
```

Before running, set `API_URL` environment variable. Then:

```bash
npm run build && npm start
```

### Optional variables

- `GTAG_EVENT_CATEGORY` - Google Analytics event category for event tracking.
- `GTAG_EVENT_ACTION` - Google Analytics event action for event tracking.
<i>Both variables are used for user id search event.</i>

#

Developed by [ffrm](https://github.com/ffrm).
