import LocalForage from "localforage";

export default function dapiClient(
  theNetwork,
  theMnemonic,
  theSkipSynchronizationBeforeHeight
) {
  return {
    network: theNetwork,
    wallet: {
      mnemonic: theMnemonic,
      adapter: LocalForage.createInstance,
      unsafeOptions: {
        skipSynchronizationBeforeHeight: theSkipSynchronizationBeforeHeight,
      },
    },
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

/*
dapiClient(
  this.state.whichNetwork,
  this.state.mnemonic,
  this.state.skipSynchronizationBeforeHeight
)


DataContractDSO: "7pn3AFQEZRY4TWJ8g52E593EpxxaXT64ovNMFFTkWnss",
      DataContractDGT: "ECQ3626MPZRFW3KgZm3iPdxUSjyALpndZmEbXnQWXh1p",
      DataContractDGM: "3E6tRUybFV4MXJfSS4dEHujs8SzWjco4thC9uUM6vKzx",
      DataContractDGP: "2ZRd4pPuVyX2KGEYyxLQFCUUkJZSPDVcqZ7zJzjHafsE",
      DataContractDMIO: "4o4FE66f5uo9pgQbpGx6BRs8YjEKFcE8JRmbPchQEWi2",
      DataContractP2P: "2YKHGWpZEApRoQjXqtqoD7YgVzRtCDvmL8tXvDZ25bzh",
      DataContractDGR: "D26rEM7r19R5nJ4Xjj3FkCK5uwrjsd2tHs6vuRcw3gZg",
      DataContractPOD: "6DY7aEQ9uNVuNUg1FnMPTjkWEWhzyei9RCcvK9msMYs",
      DataContractDPNS: "GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec",
      DataContractRAD: "2ZDicoSHYoXTbX3tbTHZwMyJZFdW6ZfEL8DZVkD8DMUY",

  */

// DataContractDSOTESTNET: "7pn3AFQEZRY4TWJ8g52E593EpxxaXT64ovNMFFTkWnss",
// DataContractDGTTESTNET: "ECQ3626MPZRFW3KgZm3iPdxUSjyALpndZmEbXnQWXh1p",
// DataContractDGMTESTNET: "3E6tRUybFV4MXJfSS4dEHujs8SzWjco4thC9uUM6vKzx",
// DataContractDGPTESTNET: "2ZRd4pPuVyX2KGEYyxLQFCUUkJZSPDVcqZ7zJzjHafsE",
// DataContractDMIOTESTNET: "4o4FE66f5uo9pgQbpGx6BRs8YjEKFcE8JRmbPchQEWi2",
// DataContractP2PTESTNET: "2YKHGWpZEApRoQjXqtqoD7YgVzRtCDvmL8tXvDZ25bzh",
// DataContractDGRTESTNET: "D26rEM7r19R5nJ4Xjj3FkCK5uwrjsd2tHs6vuRcw3gZg",
// DataContractPODTESTNET: "6DY7aEQ9uNVuNUg1FnMPTjkWEWhzyei9RCcvK9msMYs",
// DataContractDPNSTESTNET: "GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec",
// DataContractRADTESTNET: "2ZDicoSHYoXTbX3tbTHZwMyJZFdW6ZfEL8DZVkD8DMUY",
