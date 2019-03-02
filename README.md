# Candu JS Client
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcandulabs%2Fjs-eventing.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcandulabs%2Fjs-eventing?ref=badge_shield)


Best in-app learning experience.

## Installation

### Node.js
Install it using node or yarn
`npm install --save candu-client`
or with yarn if you prefer
`yarn add candu-client`

## Usage

The SDK is made of three functions:
* Init
* Identify
* Track

`Init` is used to create a singleton object of the client. We discourage re-initializing the client every time, as it risks creating less efficient memory management and race conditions. After initializing the client, you’ll be able to use the `identify`  and `track` functions.

### Initiation

To get started, just run create a new client

```const client = Candu.init('<MY_API_KEY>')```

Because the SDK is a singleton, you’ll need to store a reference to the client object that you have created.

### Identify


Identify is used to record the identity of a client. The Identify call is fundamental to receive the videos that a customer should get, as well as updating his information. You should do an identify call everytime you load a page since this call will download and refresh the result list.

```client.identify(userId[, traits ])```


`userId` is the user identifier that you want to track. This identifier will be stored in order to be used again for the track calls. `traits` is an object containing all the user properties you want to record about the user.


### Tracking an event

Tracking events is easy.

```js
candu.track(eventName [, properties])
```

The function `track` takes the following parameters:

<table>
  <tr>
    <th>Parameter name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>eventName</td>
    <td>
      The name of the event you want to track.
    </td>
  </tr>
  <tr>
    <td>properties</td>
    <td>
      Any additional properties you want to track.
    </td>
  </tr>
</table>


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcandulabs%2Fjs-eventing.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcandulabs%2Fjs-eventing?ref=badge_large)