export default function dapiClientNoWallet(theNetwork) {
  return {
    network: theNetwork,
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

//dapiClientNoWallet(this.state.whichNetwork)
