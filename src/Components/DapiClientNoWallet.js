export default function dapiClientNoWallet(theNetwork) {
  if (theNetwork === "mainnet") {
    // console.log("mainnet dapiClient");
    //select random number from 1-19 and then add 2 or three to thedapiAddress? 0-18
    let x = Math.floor(Math.random() * 12);
    let dapiAddrs = [
      "198.7.115.43:443",
      "149.28.241.190:443",
      "216.238.75.46:443",
      "134.255.182.186:443",
      // "51.83.234.203:443",
      "185.198.234.25:443",
      "37.60.236.151:443",
      "185.192.96.70:443",
      //"37.27.83.17:443",
      "70.34.206.123:443",
      // "51.83.191.208:443",
      "185.166.217.154:443",
      //"108.160.135.149:443",
      "188.245.90.255:443",
      "95.179.139.125:443",
      "173.199.71.83:443",
      "50.116.28.103:443",
      //"45.76.141.74:443",
      "37.27.67.164:443",
    ];

    return {
      network: "mainnet",
      dapiAddresses: [dapiAddrs[x], dapiAddrs[x + 1], dapiAddrs[x + 2]],
      // dapiAddresses: [
      //   "149.28.241.190:443",
      //   "134.255.182.186:443",
      //   "185.198.234.25:443",
      // ],

      apps: {
        DPNSContract: {
          contractId: "GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec",
        },
        DSOContract: {
          contractId: "D5NcY4hzfqqL4SzYufh4o6AgJFhCt3d6tZNNmRY5cKgF",
        },
        DGTContract: {
          contractId: "HQMcSEbwWe1PVyT5Ku8RZxkeFzWtvkMuNeVJUci2NY64",
        },
        DGMContract: {
          contractId: "54M9G1V36whjqtGgmvZkSx9rXu5iAthznn4iUyq8G1GN",
        },
        DGPContract: {
          contractId: "2xQEL2A6EigkUw8oSumpJxqbTTPuF5KiGjzZoWLpb6Tc",
        },
        DMIOContract: {
          contractId: "HSFUxLZqSgNLwYHDrMemhjgcZuP2yjqJWvzRoqGz6Z4w",
        },
        P2PContract: {
          contractId: "2NZwXdb3wGQzbWQeQZHFAaL4GuQzuzF2v8iQfcKuUC5q",
        },
        DGRContract: {
          contractId: "BWLc5EGfSEAwEcUqSddYa6BDeZ9TgyZEupSqmouWLB5i",
        },
        PODContract: {
          contractId: "37wtDWoftBmXbSeNkmi9EA5CkYWPRRUprCs1KmiJ7tK6",
        },
        RADContract: {
          contractId: "E13iAgrPF8pGdaHPDj3k8rMkACyawtawbjMqkcus15vB",
        },
      },
    };
  } else {
    //THIS IS TESTNET PATH
    //console.log("testnet dapiClient");
    return {
      network: theNetwork,
      // dapiAddresses: [
      //   //'149.28.241.190:443',
      //   '134.255.182.186:443',
      //   '185.198.234.25:443',
      // ],
      apps: {
        DPNSContract: {
          contractId: "GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec",
        },
        DSOContract: {
          contractId: "4kVVrhTJusgrTw4WadjcgQyj9pEiWr3Ee1iad6KG5e9i",
        },
        DGTContract: {
          contractId: "41AYM5iPkok24Vm6eKTEJR7HvcSyhrmYnfBFPvpvr7WV",
        },
        DGMContract: {
          contractId: "CJKuFw9JTBG3WPXdWpWpVF77PVphEkwvqi1zAesCDmzi",
        },
        DGPContract: {
          contractId: "2BbBXHgwNRxFm9u7TqbfYV4ct1cAERGkqd4x7qHHzcP7",
        },
        DMIOContract: {
          contractId: "DftSJ4QDatQo4YNgWdRmYvg4fg2sMsyHSxmanvAKSjRr",
        },
        P2PContract: {
          contractId: "4fykPmcie9iMZpy7VJC2oU6Rjvt7gqr3ttobJUtd8BVL",
        },
        DGRContract: {
          contractId: "HLu6Q3RDpGF5dJSmJjuszRfx9nkdwV2DYoURx3jyXWv6",
        },
        PODContract: {
          contractId: "3tyrgqV4SQ91Nd8wt9RvwWLfHraSFLgaYXmB54zX2kdw",
        },
        RADContract: {
          contractId: "3pRLCdjZx67Y48tFr7W7daLG5p5299XVfHzSbhPQyUjL",
        },
      },
    };
  }
}

//dapiClientNoWallet(this.state.whichNetwork)
