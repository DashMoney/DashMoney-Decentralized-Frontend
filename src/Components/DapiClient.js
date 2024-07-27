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
        contractId: "Dc9k4BvVS9tC4oxkPk4EhvjBgvcEwKwfyi44svR4wKZ6",
      },
      DGTContract: {
        contractId: "GnFsHUGBwEsr8ZgMNuLZ5uKM2mhXxvNb1zZZGCCquEpm",
      },
      DGMContract: {
        contractId: "253AmQmQH3ptoRfMmaeJMguuUDynSBZUoNQ28pusdhx2",
      },
      DGPContract: {
        contractId: "7RVXDR8sqymhtGh1H2oM1bYDoriZVynT5gr6tPByXwh1",
      },
      DMIOContract: {
        contractId: "DzFbV7qLzRw7jhnYkrurnm1R57GWb8cmTuSXG148E7Nc",
      },
      P2PContract: {
        contractId: "Dzn1rVJ3RNWFGPYdKkhGci18Yg9mwAHrJiUuX1urNahC",
      },
      DGRContract: {
        contractId: "EKmLRnb5P5a9hU5HUkdwqXhLAo9Vm8TV92HwN57YvjQE",
      },
      PODContract: {
        contractId: "BcSnoTXMRcGjSQoyfxje2V5uVD19kk41KF2tyex4Vnoj",
      },
      RADContract: {
        contractId: "FG3Tce9LyfPnEKRfQugoPnntRoA78Vvs4GtViEvUACcB",
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
