import React from "react";
import LocalForage from "localforage";

import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import DashBkgd from "./Images/dash_digital-cash_logo_2018_rgb_for_screens.png";

import Spinner from "react-bootstrap/Spinner";
//import Form from "react-bootstrap/Form";
//import Alert from "react-bootstrap/Alert";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TopNav from "./Components/TopNav/TopNav";

import "./App.css";
import LoginForm from "./Components/0-LoginPage/LoginForm";
import AccountLogin from "./Components/0-LoginPage/AccountLogin";

import MessagesPage from "./Components/1-Messages/MessagesPage";

import GroupsPage from "./Components/2-Groups/GroupsPage";
import Group from "./Components/2-Groups/Group";

import WalletPage from "./Components/3-Wallet/WalletPage";

import YourStorePage from "./Components/4-YourStore/YourStorePage";

import NearbyPage from "./Components/5-NearBy/NearbyPage";

import ShoppingPage from "./Components/6-Shopping/ShoppingPage";

import ExchangePage from "./Components/9-P2PExchange/ExchangePage";

import ReviewsPage from "./Components/7-Reviews/ReviewsPage";

import ProofsPage from "./Components/8-ProofOfFunds/ProofsPage";

import TopUpIdentityModal from "./Components/TopUpIdentityModal";
import FrontEndFeeExplaination from "./Components/FrontEndFeeExplaination";

import CreateNewWalletModal from "./Components/0-LoginPage/CreateNewWalletModal";
import RegisterIdentityModal from "./Components/0-LoginPage/RegisterIdentityModal";

import RegisterNameModal from "./Components/0-LoginPage/RegisterNameModal";
import RegisterNameAliasModal from "./Components/0-LoginPage/RegisterNameAliasModal";

import SendFundsModal from "./Components/0-LoginPage/SendFundsModal";
import LogoutModal from "./Components/0-LoginPage/LogoutModal";

import NewSOModal from "./Components/1-Messages/NewSOModal";
import NewDMModal from "./Components/1-Messages/NewDMModal";
import NewThreadModal from "./Components/1-Messages/NewThreadModal";

import CreateGroupModal from "./Components/2-Groups/CreateGroupModal";
import JoinGroupModal from "./Components/2-Groups/JoinGroupModal";
import DeleteGroupModal from "./Components/2-Groups/DeleteGroupModal";

import ConfirmAddrPaymentModal from "./Components/3-Wallet/ConfirmAddrPaymentModal";
import RegisterDGMModal from "./Components/RegisterDGMModal";
import ThreadModal_WALLET from "./Components/3-Wallet/ThreadModal_WALLET";
import WalletTXModal from "./Components/WalletTXModal";

import CreateStoreModal from "./Components/4-YourStore/MerchantModals/CreateStoreModal";
import StoreStatusModal from "./Components/4-YourStore/MerchantModals/StoreStatusModal";
import EditStoreModal from "./Components/4-YourStore/MerchantModals/EditStoreModal";

import CreateItemModal from "./Components/4-YourStore/MerchantModals/CreateItemModal";
import EditItemModal from "./Components/4-YourStore/MerchantModals/EditItemModal";
import MerchantOrderMsgModal from "./Components/4-YourStore/MerchantModals/MerchantOrderMsgModal";

import PostModal from "./Components/5-NearBy/PostModal";
import EventModal from "./Components/5-NearBy/EventModal";
import CreatePostModal from "./Components/5-NearBy/YourPosts/CreatePostModal";
import EditPostModal from "./Components/5-NearBy/YourPosts/EditPostModal";
import EditEventModal from "./Components/5-NearBy/YourPosts/EditEventModal";

import AddItemToCartModal from "./Components/6-Shopping/ShoppingModals/AddItemToCartModal";
import EditCartItemModal from "./Components/6-Shopping/ShoppingModals/EditCartItemModal";
import PlaceOrderModal from "./Components/6-Shopping/ShoppingModals/PlaceOrderModal";
import OrderMessageModal from "./Components/6-Shopping/ShoppingModals/OrderMessageModal";

import CreateOfferModal from "./Components/9-P2PExchange/CreateOfferModal";
import EditOfferModal from "./Components/9-P2PExchange/EditOfferModal";
import OfferModal from "./Components/9-P2PExchange/OfferModal";
import DeleteOfferModal from "./Components/9-P2PExchange/DeleteOfferModal";

import CreateReviewModal from "./Components/7-Reviews/ReviewModals/CreateReviewModal";
import EditReviewModal from "./Components/7-Reviews/ReviewModals/EditReviewModal";
import CreateReplyModal from "./Components/7-Reviews/ReviewModals/CreateReplyModal";
import EditReplyModal from "./Components/7-Reviews/ReviewModals/EditReplyModal";

import CreateProofModal from "./Components/8-ProofOfFunds/YourProofs/CreateProofModal";
import DeleteProofModal from "./Components/8-ProofOfFunds/YourProofs/DeleteProofModal";

//const Dash = require("dash");
import Dash from "dash";

const {
  Essentials: { Buffer },
  PlatformProtocol: { Identifier },
} = Dash;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      mode: "dark",
      unit: "base", //or 'micro', //or 'hecto', //μ OR hd, no.. hD  hecto-Duff yes

      feeAmountBaseNumber: 10000000 - Math.floor(Math.random() * 5000), //Needs to be determined by env var and needs a random part to vary the input so state transistion already in chain is not triggered.

      //isLoading: true, //For identity and name And not identityInfo that is handle on display component
      //^^^ IS THIS NOW HANDLED BY THE isLoginComplete render variable??

      //ACCOUNT 'LOGIN' PAGE STATE
      isLoadingIdentity: true,
      isLoadingIdInfo: true,
      isLoadingCreditTransfer: false,

      isLoadingName: true,
      isLoadingAlias: true,

      isLoadingWallet: true, //For wallet for topup

      identityError: false,
      idInfoError: false,
      nameError: false,
      aliasError: false,
      //ACCOUNT 'LOGIN' PAGE STATE^^^^^^

      //MESSAGES PAGE
      // isLoading={this.state.isLoading}
      whichMessagesTab: "Everyone",

      isLoadingRefresh: false, //-> WHAT IS THIS CONNECTED TO ? -> a single spinner on MessagesPage , can I get rid of this because I think i had it for the manual updating but there is now auto updateing with messages ? =>
      errorToDisplay: false,

      isLoadingEveryone: true,

      isLoadingForYou: true,

      EveryoneMsgs: [
        {
          $ownerId: "4h5j6j",
          $id: "7ku98rj",
          msg: "Thanks for trying out the dapps! You can even host the front end yourself and earn Dash.",
          sh: "out",
          $createdAt: Date.now() - 1000000,
        },
      ],
      EveryoneNames: [
        {
          $ownerId: "4h5j6j",
          label: "DashMoney",
        },
      ],

      Everyone1: false, //2 threads -> msg names and thread names
      Everyone2: false,

      ForYou1: false, //4 threads -> 2 by 2 path but could have zero on either of the paths?? ->
      ForYou2: false,
      ForYou3: false,
      ForYou4: false,

      ByYouMsgs: [], //MESSAGES
      ByYouNames: [],

      FromTagsMsgs: [],
      FromTagsNames: [],

      //Below is the new Thread state
      EveryoneThreads: [
        {
          $ownerId: "hw7o5fh4w",
          $id: "wg7w54b5l9",
          msg: "Well that sounds interesting. How do I do that?",
          msgId: "7ku98rj",

          $createdAt: Date.now() - 800000,
        },
      ],
      EveryoneThreadsNames: [
        {
          $ownerId: "hw7o5fh4w",
          label: "Alice",
        },
      ],

      ByYouThreads: [],
      ByYouThreadsNames: [],

      FromTagsThreads: [],
      FromTagsThreadsNames: [],

      ThreadMessageId: "",
      //BELOW Most Recent Initial For You
      InitialMessages1: false,
      InitialMessages2: false,
      InitialMessages3: false,
      InitialMessages4: false,

      InitialByYouMsgs: [],
      InitialByYouNames: [],

      InitialFromTagsMsgs: [],
      InitialFromTagsNames: [],

      InitialByYouThreads: [],
      InitialByYouThreadsNames: [],

      InitialFromTagsThreads: [],
      InitialFromTagsThreadsNames: [],

      //ABOVE Most Recent Initial For You
      //BELOW AutoUpdate Arrays
      NewSO1: false,
      NewSO2: false,

      NewSONames: [],
      NewSOMsgs: [],

      NewSOThreadsNames: [],
      NewSOThreads: [],

      NewDM1: false,
      NewDM2: false,
      NewDM3: false,

      //NewDMByYouNames: [], //Not required bc user would make themselves
      //NewDMByYouMsgs: [],

      NewDMByYouThreadsNames: [],
      NewDMByYouThreads: [],

      NewDMFromTagsNames: [],
      NewDMFromTagsMsgs: [],

      NewDMFromTagsThreadsNames: [],
      NewDMFromTagsThreads: [],

      //Above AutoUpdate Arrays^^^^

      // SubmitMessages1: false, <- NOT USED?
      // SubmitMessages2: false, <- NOT USED?

      //DocumentSubmissionSeparatation^^^^

      // handleThread={this.handleThread}
      // pushNewSOtoView={this.pushNewSOtoView}
      // pushNewDMtoView={this.pushNewDMtoView}

      //MESSAGES PAGE STATE^^^^^

      //GROUPS PAGE

      isLoadingGroups: false, //Invite Pull, Active(Msgs) Pull, creating Group, deleting group, accepting invite
      isLoadingGroup: false, // Msgs Pull, Members pull, sending msg,
      //But that is done in Group -> !!???

      isLoadingActiveGroups: true, //Separate spinner for Active so not lumped in with Groups.

      isLoadingGroupInvite: false, //Control and alert in Groups and on GroupPage because that is the only way you will know if an invite was sent. sending invite,

      InitialPullGROUPS: true,

      dgtInvites: [], //Gets selfinvites && ToYouinvites
      //dO THE MAP AND FILTERING ON THE ACTUAL DISPLAY COMPONENT

      dgtInvitesNames: [],

      dgtActiveGroups: [],

      selectedGroup: "",
      isGroupShowing: false,

      GroupsMsgsToAdd: [], //handle in Group so not too difficult, just add together and use set for unique docId ->

      sentGroupMsgError: false, //Thread to Group, all the below
      sentGroupInviteError: false,
      sentGroupInviteSuccess: false,
      sendToNameInvite: "", //For invite

      //GROUPS PAGE STATE^^^^^

      //WALLET PAGE

      WALLET_whichTab: "Your Wallet",

      isLoadingButtons_WALLET: true,
      isLoadingForm_WALLET: false,

      isLoadingRefresh_WALLET: false, // This is not implemented maybe use to consolidate the confirmations, Buttons and Form?? or just add another?? -> So I think that the purpose of the refresh is currently only to keep the msgs viewable while the page reload/finishes the queries ->

      isLoadingMsgs_WALLET: true,

      isLoadingAddresses_WALLET: true, //Addresses of others, not mine

      dgmDocuments: [], //MOVE TO GENERAL BC USED IN MY STORE <=
      //WALLET_Login7 <= use this to control the "Enable Pay to Name" so doesn't show up before its been checked.

      WALLET_sendToName: "",
      WALLET_sendToAddress: "",
      WALLET_amountToSend: 0,
      WALLET_messageToSend: "",
      WALLET_sendToDGMAddressDoc: "",

      WALLET_sendSuccess: false,
      WALLET_sendFailure: false,

      WALLET_nameSuccess: "",
      WALLET_amtSuccess: 0,

      WALLET_sendMsgSuccess: false,
      WALLET_sendMsgFailure: false,

      //*** *** *** *** ***

      WALLET_Login1: false,
      WALLET_Login2: false,
      WALLET_Login3: false,
      WALLET_Login4: false,
      WALLET_Login5: false,
      WALLET_Login6: false,
      WALLET_Login7: false,

      WALLET_ByYouMsgs: [],
      WALLET_ByYouNames: [],
      WALLET_ByYouThreads: [],

      WALLET_ToYouMsgs: [],
      WALLET_ToYouNames: [],
      WALLET_ToYouThreads: [],

      //BELOW Most Recent Initial
      // WALLET_Initial1: false,
      // WALLET_Initial2: false,
      // WALLET_Initial3: false,
      // WALLET_Initial4: false,
      // WALLET_Initial5: false,
      // WALLET_Initial6: false,

      // WALLET_InitialDGMAddr: "",
      // WALLET_InitialIdentityInfo: "",
      // WALLET_InitialIdentityRaw: "",

      // WALLET_InitialByYouMsgs: [],
      // WALLET_InitialByYouNames: [],
      // WALLET_InitialByYouThreads: [],

      // WALLET_InitialToYouMsgs: [],
      // WALLET_InitialToYouNames: [],
      // WALLET_InitialToYouThreads: [],

      //ABOVE Most Recent Initial

      //BELOW Refresh
      WALLET_Refresh1: false,
      WALLET_Refresh2: false,
      WALLET_Refresh3: false,
      WALLET_Refresh4: false,
      WALLET_Refresh5: false,
      WALLET_Refresh6: false,

      WALLET_RefreshIdentityInfo: "",
      WALLET_RefreshIdentityRaw: "",

      WALLET_RefreshByYouMsgs: [],
      WALLET_RefreshByYouNames: [],
      WALLET_RefreshByYouThreads: [],

      WALLET_RefreshToYouMsgs: [],
      WALLET_RefreshToYouNames: [],
      WALLET_RefreshToYouThreads: [],

      //ABOVE Refresh

      //*** *** *** *** ***

      WALLET_ThreadMessageId: "",
      WALLET_messageToWhomName: "",

      //WALLET PAGE STATE^^^^^^

      //YOUR STORE PAGE

      whichTabYOURSTORE: "Orders",

      isLoadingOrdersYOURSTORE: true, // LoadingOrders
      isLoadingStoreYOURSTORE: true, // LoadingStore
      isLoadingItemsYOURSTORE: true, //LoadingItems

      InitialPullYOURSTORE: true,

      //DGMAddress: [], // CHANGE TO THE ONE ALREADY HERE ->
      //dgmDocuments

      DGPStore: [],
      DGPItems: [],
      selectedItem: {},
      selectedItemIndex: 0,

      store1: false, //This is for Your Store as Merchant -> it is never reset
      store2: false,

      DGPOrders: [],
      DGPOrdersNames: [],
      DGPOrdersMsgs: [],

      order1: false, // This if for orders placed to you -> it is reset
      order2: false,

      messageOrderId: "", //YOURSTORE
      messageStoreOwnerName: "", //YOURSTORE ->

      newOrderAvail: false,

      orderMsgError: false,
      storeError: false,
      itemError: false,

      //YOUR STORE PAGE STATE^^^^^^

      //SHOPPING PAGE

      InitialPullSHOPPING: true,

      whichTabSHOPPING: "Find Merchant",

      LoadingOrder: false,

      LoadingMerchant: false,
      LoadingItems: false,

      identityIdMerchant: "",
      merchantStoreName: "staged name",
      merchantStore: [],
      dgmDocumentForMerchant: [],
      merchantItems: [],

      viewStore: false,

      cartItems: [],

      selectedItemSHOPPING: "",

      selectedCartItemIndex: 0,

      merchantNameFormat: false,
      merchantName: "",

      sendPaymentSuccess: false,
      sendOrderSuccess: false,
      sendFailure: false,

      orderError: false,

      //APP.JS BUYER STUFF BELOW

      isLoadingRecentOrders: true,

      recentOrders: [],
      recentOrdersStores: [],
      recentOrdersNames: [],
      recentOrdersDGMAddresses: [],
      recentOrdersItems: [],
      recentOrdersMessages: [],

      recent1: false,
      recent2: false,
      recent3: false,
      recent4: false,
      recent5: false,

      isLoadingActive: false,
      activeOrders: [],
      activeOrdersStores: [],
      activeOrdersNames: [],
      activeOrdersAddresses: [],

      active1: false,
      active2: false,
      active3: false,

      messageOrderIdSHOPPING: "", //SHOPPING ->
      messageStoreOwnerNameSHOPPING: "", //SHOPPING ->

      //SHOPPING PAGE STATE^^^^^^

      //NEAR BY PAGE

      OnPageLoadNEARBY: true,
      InitialPullNearBy: true,

      whichNearbyTab: "Search",
      selectedCategoryButton: "offbiz",

      isLoadingDSODM: false,

      isLoadingNearbyInitial: true,
      isLoadingNearbySearch: false,
      isLoadingNearbyForm: false,

      isLoadingYourPosts: true,

      //Event Groups -> getDGTInvitesForEvents
      dgtInvitesForEvents: [],
      isLoadingGroupEvents: true,

      //##### LOCATION FORM STATE ######
      whichCountryRegion: "Country",

      cityInput: "",
      validCity: true,
      tooLongCityNameError: false,

      countryRegionInput: "",
      validCountryRegion: true,
      tooLongCountryRegionNameError: false,
      //^^^^^ LOCATION FORM STATE ^^^^^

      citySubmitted: "",
      countryRegionSubmitted: "Country",
      whichSubmitted: "offbiz",

      //#####  POSTS TO DISPLAY ######
      OffRentPosts: [],
      OffRentNames: [],

      OffBizPosts: [],
      OffBizNames: [],

      OffOtherPosts: [],
      OffOtherNames: [],
      //EVENTS
      OffEventsPosts: [],
      OffEventsNames: [],

      LookRentPosts: [],
      LookRentNames: [],

      LookOtherPosts: [],
      LookOtherNames: [],
      //^^^^^ POSTS TO DISPLAY ^^^^^

      //##### Search POSTS ######

      OffBizPulled: false,
      OffEventsPulled: false,
      OffRentPulled: false,
      OffTradePulled: false,
      LookRentPulled: false,
      LookTradePulled: false,

      //^^^^^ Search POSTS ^^^^^

      selectedSearchedPost: "",
      selectedSearchedPostNameDoc: "",

      yourPostsToDisplay: [],

      selectedYourPost: "",
      selectedYourPostIndex: "",

      //NEAR BY PAGE STATE^^^^^^

      //EXCHANGE PAGE

      whichExchangeTab: "Search", //Search and Your Reviews

      whichOffersName: "Offers",

      InitialPullExchange: true,

      isLoadingExchangeSearch: false,
      isLoadingExchangeForm: false,

      isLoadingYourOffers: true,

      nameToSearch_EXCHANGE: "",
      nameFormat_EXCHANGE: false,

      isTooLongNameError_EXCHANGE: false, //Pass to form and add ->

      SearchedOffers: [
        {
          $ownerId: "4h5j6j",
          $id: "7ku98rj",
          toMe: "DASH",
          toMeVia: "paytoname",
          toMeHandle: "Alice", //'Alice-007'
          toU: "EUR",
          toUVia: "paypal",
          //toUHandle:"",
          exRate: "3056",
          instruction:
            "***This is just a test offer.***\n\n     Please don't send me anything!",
          minAmt: "100",
          maxAmt: "10000",
          active: true,

          $updatedAt: Date.now() - 1000000,
          $createdAt: Date.now() - 1000000,
        },
      ],
      SearchedOffersNames: [
        {
          $ownerId: "4h5j6j",
          label: "Alice",
        },
      ],

      YourOffers: [],

      offerToEdit: [], //use a function to find and pass to modal ->
      offerToEditIndex: "",

      //##### OFFER FORM STATE ######
      toMeInput: "",
      validtoMe: false,
      //tooLongtoMeError: false,

      toMeInputOTHER: "",
      validtoMeOTHER: false,
      tooLongtoMeErrorOTHER: false,

      toMeViaInput: "Optional",
      validtoMeVia: true,
      // tooLongtoMeViaError: false,

      toMeViaInputOTHER: "",
      validtoMeViaOTHER: false,
      tooLongtoMeViaErrorOTHER: false,

      toMeFinal: false,
      toMe4Doc: "",
      toMeVia4Doc: "",
      //toMeHandle4Doc: "",

      toUInput: "",
      validtoU: false,
      //tooLongtoUError: false,

      toUInputOTHER: "",
      validtoUOTHER: false,
      tooLongtoUErrorOTHER: false,

      toUViaInput: "Optional",
      validtoUVia: true,
      //tooLongtoUViaError: false,

      toUViaInputOTHER: "",
      validtoUViaOTHER: false,
      tooLongtoUViaErrorOTHER: false,

      toUFinal: false,
      toU4Doc: "",
      toUVia4Doc: "",
      //##### OFFER FORM STATE ######

      selectedSearchedOffer: "",
      selectedSearchedOfferNameDoc: "",

      selectedYourOffer: "", //For Edit
      selectedYourOfferIndex: "",

      //EXCHANGE PAGE  STATE^^^^^

      //REVIEWS PAGE
      whichReviewsTab: "Search", //Search and Your Reviews

      isLoadingReviewsSearch: false,
      isLoadingYourReviews: true,

      nameToSearch: "",
      nameFormat: false,

      SearchedNameDoc_EXCHANGE: [],
      SearchedNameOffers_EXCHANGE: [],

      isTooLongNameError: false, //Pass to form and add ->

      YourReviews1: false,
      YourReviews2: false,

      YourReviews: [],
      YourReviewNames: [],

      YourReplies: [],
      //^^ Doesn't need names because they are only your replies.. -> yes

      SearchedNameDoc: {
        $ownerId: "JAdeE9whiXXdxzSrz7Rd1i8aHC3XFh5AvuV7cpxcYYmN",
        label: "BurgerJoint",
      },

      SearchedReviews: [
        {
          $ownerId: "4h5j6j",
          $id: "7ku98rj",
          review: "Good service, would eat here again!",
          rating: 5,
          toId: "fjghtyru",
          $createdAt: Date.now() - 1000000,
        },
      ],

      SearchedReviewNames: [
        {
          $ownerId: "4h5j6j",
          label: "Alice",
        },
      ],

      SearchedReplies: [
        {
          $ownerId: "JAdeE9whiXXdxzSrz7Rd1i8aHC3XFh5AvuV7cpxcYYmN",
          $id: "klsui4312",
          reply: "Thanks Alice",
          reviewId: "7ku98rj",
          $createdAt: Date.now() - 300000,
        },
      ],

      reviewToEdit: [], //use a function to find and pass to modal ->
      reviewToEditIndex: "",

      replyReview: [], //This is for the create reply reviewId
      replyToEdit: [],
      replyingToName: "",

      //REVIEWS PAGE STATE^^^^^^

      //PROOFS PAGE
      whichTab_POD: "Search",

      isLoadingSearch_POD: false,

      isLoadingYourProofs: true,

      nameToSearch_POD: "",
      nameFormat_POD: false,
      isTooLongNameError_POD: false, // <- not connected to anything

      SearchedNameDoc_POD: {
        $ownerId: "4h5j6j",
        label: "Alice",
      },

      SearchedProofs: [
        {
          $ownerId: "4h5j6j",
          $id: "7ku98rj",

          address: "yadAMKzCFruDYg7bsvLVFfjXuVsN4rPqzw",
          message: "Its a me, Mario! I mean Alice lol",
          signature:
            "H2KKtQ1vdvAMeGHATxCa8Scj+xwscwzbIfpGKE20Ff1+PQQ+3vYZCKOoynzZ+SP9Wkv7k7es0XjFsgt4eK/7d0g=",

          $createdAt: Date.now() - 1000000,
        },
      ],

      YourProofs: [],

      selectedYourProof: "",
      selectedYourProofIndex: "",

      //PROOFS PAGE STATE^^^^^^

      selectedDapp: "Login",

      InitialPullReviews: true,
      InitialPullProofs: true,

      presentModal: "",
      isModalShowing: false,
      whichNetwork: "testnet",

      mnemonic: "",
      identity: "",
      identityInfo: "",
      identityRaw: "",
      uniqueName: "",
      aliasList: [],

      accountBalance: "",
      accountHistory: "",
      accountAddress: "",

      //BELOW IS OTHERS ADDRESSES

      WALLET_addresses: [],
      WALLET_addressesNames: [],

      walletId: "",
      mostRecentLogin: false,
      platformLogin: false, //Will this be used? -> check ->
      LocalForageKeys: [],

      skipSynchronizationBeforeHeight: 974000,
      mostRecentBlockHeight: 974000,

      DataContractDSO: "5UFe5yoixK7BPs1FGoAoryP2PCpF2MD3EjGPGeiC5htJ",
      DataContractDGT: "Po1uVkjb7V5WyzqdXvosa7LZ9SvXbyaWUV8jfnPUew3",
      DataContractDGM: "Hiq9SJL3HjGci8XU7mHGhY1wgkVLG7HhijAjVwv6ozau",
      DataContractDGP: "5qkpWiZmfSgnmwusByRVpmLFdRyxuuV8s5KxNxh6bW7n",
      DataContractDMIO: "7YYHis22sL45AhD8FHXopGSqeKLFNtRBvcXCFmVtypi2",
      DataContractP2P: "3KhmjY3vVKU8r5nuzdfifJ49TdS6heasFaFG13vLgX5G",
      DataContractDGR: "8jB2zPwsnhydCXrWk3QMMENhYbgh7M5F28oZhC4AnMFV",
      DataContractPOD: "Hn9LJMPA3mrWUQ7nzKhyT6TiiTzejwVXH8hoV7oV7qqP",
      DataContractDPNS: "GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec",

      expandedTopNav: false,
    };
  }

  closeTopNav = () => {
    this.setState({
      expandedTopNav: false,
    });
  };

  toggleTopNav = () => {
    if (this.state.expandedTopNav) {
      this.setState({
        expandedTopNav: false,
      });
    } else {
      this.setState({
        expandedTopNav: true,
      });
    }
  };

  handleSelectedDapp = (theDapp) => {
    this.setState({
      selectedDapp: theDapp,
      expandedTopNav: false,
    });
  };

  hideModal = () => {
    this.setState({
      isModalShowing: false,
    });
  };

  showModal = (modalName) => {
    this.setState({
      presentModal: modalName,
      isModalShowing: true,
    });
  };

  handleMode = () => {
    if (this.state.mode === "primary")
      this.setState(
        {
          mode: "dark",
        },
        () => this.setFrontendLFmode()
      );
    else {
      this.setState(
        {
          mode: "primary",
        },
        () => this.setFrontendLFmode()
      );
    }
  };

  setFrontendLFmode = () => {
    let DashFrontend = LocalForage.createInstance({
      name: "dash-frontend",
    });
    DashFrontend.setItem("mode", this.state.mode)
      .then((d) => {
        console.log("Return from LF setitem:", d);
      })
      .catch((err) => {
        console.error("Something went wrong setting to localForage:\n", err);
      });
  };

  handleLogout = () => {
    this.setState(
      {
        isLoggedIn: false, //Changed for TopNav constructing
        mode: "dark",

        //isLoading: true, //For identity and name And not identityInfo that is handle on display component
        //^^^ IS THIS NOW HANDLED BY THE isLoginComplete render variable??

        //ACCOUNT 'LOGIN' PAGE
        isLoadingIdentity: true,
        isLoadingIdInfo: true,

        isLoadingName: true,
        isLoadingAlias: true,

        isLoadingWallet: true, //For wallet for topup

        identityError: false,
        idInfoError: false,
        nameError: false,
        aliasError: false,
        //ACCOUNT 'LOGIN' PAGE^^^^^^

        //MESSAGES PAGE
        // isLoading={this.state.isLoading}
        whichMessagesTab: "Everyone",

        isLoadingRefresh: false, //-> WHAT IS THIS CONNECTED TO ? -> a single spinner on MessagesPage , can I get rid of this because I think i had it for the manual updating but there is now auto updateing with messages ? =>
        errorToDisplay: false,

        isLoadingEveryone: true,

        isLoadingForYou: true,

        EveryoneMsgs: [
          {
            $ownerId: "4h5j6j",
            $id: "7ku98rj",
            msg: "Thanks for trying out the dapps! You can even host the front end yourself and earn Dash.",
            sh: "out",
            $createdAt: Date.now() - 1000000,
          },
        ],
        EveryoneNames: [
          {
            $ownerId: "4h5j6j",
            label: "DashMoney",
          },
        ],

        Everyone1: false, //2 threads -> msg names and thread names
        Everyone2: false,

        ForYou1: false, //4 threads -> 2 by 2 path but could have zero on either of the paths?? ->
        ForYou2: false,
        ForYou3: false,
        ForYou4: false,

        ByYouMsgs: [],
        ByYouNames: [],

        FromTagsMsgs: [],
        FromTagsNames: [],

        //Below is the new Thread state
        EveryoneThreads: [
          {
            $ownerId: "hw7o5fh4w",
            $id: "wg7w54b5l9",
            msg: "Well that sounds interesting. How do I do that?",
            msgId: "7ku98rj",

            $createdAt: Date.now() - 800000,
          },
        ],
        EveryoneThreadsNames: [
          {
            $ownerId: "hw7o5fh4w",
            label: "Alice",
          },
        ],

        ByYouThreads: [],
        ByYouThreadsNames: [],

        FromTagsThreads: [],
        FromTagsThreadsNames: [],

        ThreadMessageId: "",
        //BELOW Most Recent Initial For You
        InitialMessages1: false,
        InitialMessages2: false,
        InitialMessages3: false,
        InitialMessages4: false,

        InitialByYouMsgs: [],
        InitialByYouNames: [],

        InitialFromTagsMsgs: [],
        InitialFromTagsNames: [],

        InitialByYouThreads: [],
        InitialByYouThreadsNames: [],

        InitialFromTagsThreads: [],
        InitialFromTagsThreadsNames: [],

        //ABOVE Most Recent Initial For You
        //BELOW AutoUpdate Arrays
        NewSO1: false,
        NewSO2: false,

        NewSONames: [],
        NewSOMsgs: [],

        NewSOThreadsNames: [],
        NewSOThreads: [],

        NewDM1: false,
        NewDM2: false,
        NewDM3: false,

        //NewDMByYouNames: [], //Not required bc user would make themselves
        //NewDMByYouMsgs: [],

        NewDMByYouThreadsNames: [],
        NewDMByYouThreads: [],

        NewDMFromTagsNames: [],
        NewDMFromTagsMsgs: [],

        NewDMFromTagsThreadsNames: [],
        NewDMFromTagsThreads: [],

        //Above AutoUpdate Arrays^^^^

        // SubmitMessages1: false, <- NOT USED?
        // SubmitMessages2: false, <- NOT USED?

        //DocumentSubmissionSeparatation^^^^

        // handleThread={this.handleThread}
        // pushNewSOtoView={this.pushNewSOtoView}
        // pushNewDMtoView={this.pushNewDMtoView}

        //MESSAGES PAGE ^^^^^

        //WALLET PAGE

        WALLET_whichTab: "Your Wallet",

        isLoadingButtons_WALLET: true,
        isLoadingForm_WALLET: false,

        isLoadingRefresh_WALLET: false, // This is not implemented maybe use to consolidate the confirmations, Buttons and Form?? or just add another?? -> So I think that the purpose of the refresh is currently only to keep the msgs viewable while the page reload/finishes the queries ->

        isLoadingMsgs_WALLET: true,

        isLoadingAddresses_WALLET: true,

        dgmDocuments: [], //MOVE TO GENERAL BC USED IN MY STORE <=
        //^^^ these are my dgm addresses

        WALLET_sendToName: "",
        WALLET_sendToAddress: "",
        WALLET_amountToSend: 0,
        WALLET_messageToSend: "",
        WALLET_sendToDGMAddressDoc: "",

        WALLET_sendSuccess: false,
        WALLET_sendFailure: false,

        WALLET_nameSuccess: "",
        WALLET_amtSuccess: 0,

        WALLET_sendMsgSuccess: false,
        WALLET_sendMsgFailure: false,

        //*** *** *** *** ***

        WALLET_Login1: false,
        WALLET_Login2: false,
        WALLET_Login3: false,
        WALLET_Login4: false,
        WALLET_Login5: false,
        WALLET_Login6: false,
        WALLET_Login7: false,

        WALLET_ByYouMsgs: [],
        WALLET_ByYouNames: [],
        WALLET_ByYouThreads: [],

        WALLET_ToYouMsgs: [],
        WALLET_ToYouNames: [],
        WALLET_ToYouThreads: [],

        //BELOW Most Recent Initial
        // WALLET_Initial1: false,
        // WALLET_Initial2: false,
        // WALLET_Initial3: false,
        // WALLET_Initial4: false,
        // WALLET_Initial5: false,
        // WALLET_Initial6: false,

        // WALLET_InitialDGMAddr: "",
        // WALLET_InitialIdentityInfo: "",
        // WALLET_InitialIdentityRaw: "",

        // WALLET_InitialByYouMsgs: [],
        // WALLET_InitialByYouNames: [],
        // WALLET_InitialByYouThreads: [],

        // WALLET_InitialToYouMsgs: [],
        // WALLET_InitialToYouNames: [],
        // WALLET_InitialToYouThreads: [],

        //ABOVE Most Recent Initial

        //BELOW Refresh
        WALLET_Refresh1: false,
        WALLET_Refresh2: false,
        WALLET_Refresh3: false,
        WALLET_Refresh4: false,
        WALLET_Refresh5: false,
        WALLET_Refresh6: false,

        WALLET_RefreshIdentityInfo: "",
        WALLET_RefreshIdentityRaw: "",

        WALLET_RefreshByYouMsgs: [],
        WALLET_RefreshByYouNames: [],
        WALLET_RefreshByYouThreads: [],

        WALLET_RefreshToYouMsgs: [],
        WALLET_RefreshToYouNames: [],
        WALLET_RefreshToYouThreads: [],

        //ABOVE Refresh

        //*** *** *** *** ***

        WALLET_ThreadMessageId: "",
        WALLET_messageToWhomName: "",

        //WALLET PAGE ^^^^^^

        //YOUR STORE PAGE

        whichTabYOURSTORE: "Orders",

        isLoadingOrdersYOURSTORE: true, // LoadingOrders
        isLoadingStoreYOURSTORE: true, // LoadingStore
        isLoadingItemsYOURSTORE: true, //LoadingItems

        //DGMAddress: [], // CHANGE TO THE ONE ALREADY HERE ->
        //dgmDocuments

        DGPStore: [],
        DGPItems: [],
        selectedItem: {},
        selectedItemIndex: 0,

        store1: false, //This is for Your Store as Merchant -> it is never reset
        store2: false,

        DGPOrders: [],
        DGPOrdersNames: [],
        DGPOrdersMsgs: [],

        order1: false, // This if for orders placed to you -> it is reset
        order2: false,

        messageOrderId: "",
        messageStoreOwnerName: "",

        newOrderAvail: false,

        orderMsgError: false,
        storeError: false,
        itemError: false,

        //YOUR STORE PAGE ^^^^
        //SHOPPING PAGE

        InitialPullSHOPPING: true,

        whichTabSHOPPING: "Find Merchant",

        LoadingOrder: false,

        LoadingMerchant: false,
        LoadingItems: false,

        identityIdMerchant: "",
        merchantStoreName: "staged name",
        merchantStore: [],
        dgmDocumentForMerchant: [],
        merchantItems: [],

        viewStore: false,

        cartItems: [],

        selectedItemSHOPPING: "",

        selectedCartItemIndex: 0,

        merchantNameFormat: false,
        merchantName: "",

        sendPaymentSuccess: false,
        sendOrderSuccess: false,
        sendFailure: false,

        orderError: false,

        //APP.JS BUYER STUFF BELOW

        isLoadingRecentOrders: true,

        recentOrders: [],
        recentOrdersStores: [],
        recentOrdersNames: [],
        recentOrdersDGMAddresses: [],
        recentOrdersItems: [],
        recentOrdersMessages: [],

        recent1: false,
        recent2: false,
        recent3: false,
        recent4: false,
        recent5: false,

        isLoadingActive: false,
        activeOrders: [],
        activeOrdersStores: [],
        activeOrdersNames: [],
        activeOrdersAddresses: [],

        active1: false,
        active2: false,
        active3: false,

        messageOrderIdSHOPPING: "", //SHOPPING ->
        messageStoreOwnerNameSHOPPING: "", //SHOPPING ->

        //SHOPPING PAGE ^^^^
        //NEAR BY PAGE

        whichNearbyTab: "Search",
        selectedCategoryButton: "offrent",

        isLoadingDSODM: false,

        isLoadingNearbyInitial: true,
        isLoadingNearbySearch: false,
        isLoadingNearbyForm: false,

        isLoadingYourPosts: true,

        //##### LOCATION FORM STATE ######
        whichCountryRegion: "Country",

        cityInput: "",
        validCity: true,
        tooLongCityNameError: false,

        countryRegionInput: "",
        validCountryRegion: true,
        tooLongCountryRegionNameError: false,
        //^^^^^ LOCATION FORM STATE ^^^^^

        citySubmitted: "",
        countryRegionSubmitted: "Country",
        whichSubmitted: "offbiz",

        //#####  POSTS TO DISPLAY ######
        OffRentPosts: [],
        OffRentNames: [],

        OffBizPosts: [],
        OffBizNames: [],

        OffOtherPosts: [],
        OffOtherNames: [],

        LookRentPosts: [],
        LookRentNames: [],

        LookOtherPosts: [],
        LookOtherNames: [],
        //^^^^^ POSTS TO DISPLAY ^^^^^

        //##### Search POSTS ######

        OffBizPulled: false,
        OffEventsPulled: false,
        OffRentPulled: false,
        OffTradePulled: false,
        LookRentPulled: false,
        LookTradePulled: false,

        //^^^^^ Search POSTS ^^^^^

        selectedSearchedPost: "",
        selectedSearchedPostNameDoc: "",

        yourPostsToDisplay: [],

        //NEAR BY PAGE^^^^^^

        //REVIEWS PAGE
        whichReviewsTab: "Search", //Search and Your Reviews

        isLoadingReviewsSearch: false,
        isLoadingYourReviews: true,

        nameToSearch: "",
        nameFormat: false,

        isTooLongNameError: false, //Pass to form and add ->

        YourReviews1: false,
        YourReviews2: false,

        YourReviews: [],
        YourReviewNames: [],

        YourReplies: [],
        //^^ Doesn't need names because they are only your replies.. -> yes

        SearchedNameDoc: {
          $ownerId: "E98BXqGj6hNENCCnDmvXzCzmTCSgkBzEU3R18tfW1v2x",
          label: "BurgerJoint",
        },

        SearchedReviews: [
          {
            $ownerId: "4h5j6j",
            $id: "7ku98rj",
            review: "Good service, would eat here again!",
            rating: 5,
            toId: "fjghtyru",
            $createdAt: Date.now() - 1000000,
          },
        ],

        SearchedReviewNames: [
          {
            $ownerId: "4h5j6j",
            label: "Alice",
          },
        ],

        SearchedReplies: [
          {
            $ownerId: "E98BXqGj6hNENCCnDmvXzCzmTCSgkBzEU3R18tfW1v2x",
            $id: "klsui4312",
            reply: "Thanks Alice",
            reviewId: "7ku98rj",
            $createdAt: Date.now() - 300000,
          },
        ],

        reviewToEdit: [], //use a function to find and pass to modal ->
        reviewToEditIndex: "",

        replyReview: [], //This is for the create reply reviewId
        replyToEdit: [],
        replyingToName: "",

        //REVIEWS PAGE^^^^^^

        //PROOFS PAGE
        whichTab_POD: "Search",

        isLoadingSearch_POD: false,

        isLoadingYourProofs: true,

        nameToSearch_POD: "",
        nameFormat_POD: false,
        isTooLongNameError_POD: false, // <- not connected to anything

        SearchedNameDoc_POD: {
          $ownerId: "4h5j6j",
          label: "Alice",
        },

        SearchedProofs: [
          {
            $ownerId: "4h5j6j",
            $id: "7ku98rj",

            address: "yadAMKzCFruDYg7bsvLVFfjXuVsN4rPqzw",
            message: "Its a me, Mario! I mean Alice lol",
            signature:
              "H2KKtQ1vdvAMeGHATxCa8Scj+xwscwzbIfpGKE20Ff1+PQQ+3vYZCKOoynzZ+SP9Wkv7k7es0XjFsgt4eK/7d0g=",

            $updatedAt: Date.now() - 1000000,
          },
        ],

        YourProofs: [],

        selectedYourProof: "",
        selectedYourProofIndex: "",

        //PROOFS PAGE^^^^^^

        selectedDapp: "Login",

        InitialPullNearBy: true,
        InitialPullReviews: true,
        InitialPullProofs: true,

        presentModal: "",
        isModalShowing: false,
        whichNetwork: "testnet",

        mnemonic: "",
        identity: "",
        identityInfo: "",
        identityRaw: "",
        uniqueName: "",
        aliasList: [],

        accountBalance: "",
        accountHistory: "",
        accountAddress: "",

        WALLET_addresses: [],
        WALLET_addressesNames: [],

        walletId: "",
        mostRecentLogin: false,
        platformLogin: false, //Will this be used? -> check ->
        LocalForageKeys: [],

        skipSynchronizationBeforeHeight: 974000,
        mostRecentBlockHeight: 974000,

        expandedTopNav: false,
      },
      () => this.componentDidMount()
    );
  };

  componentDidMount() {
    //this.getInitialPosts(); // Move to onDapp select because now that there is a post in all the categories there are names that are pulled and this has doubled the queries and cause slowing ->
    //
    //1) GET WALLETID KEYS For New Wallet Login and Wallet Sync
    //I don't need any of this because the wallet login handles it itself..
    // True^^^ - but using to determine if first time loading so can let know that this may take up to a minute for first time logging in.
    LocalForage.config({
      name: "dashevo-wallet-lib",
    });
    let dashevo = LocalForage.createInstance({
      name: "dashevo-wallet-lib",
    });
    dashevo
      .keys()
      .then((keys) => {
        this.setState({
          LocalForageKeys: keys,
        });
        console.log(keys);
      })
      .catch(function (err) {
        console.log(err);
      });
    //****************************** */
    //2) GET WALLETID KEYS FOR OBTAINING IDENTITY
    //  WHEN I INTRODUCE THIS FEATURE GET THE DGM VERSION IT IS DOING WHAT I WANT <- !!!!!!!!!!!!!!!!!!!!! ->
    // LocalForage.config({
    //   name: "dashmoney-platform-login",
    // });
    // let DashMoneyLF = LocalForage.createInstance({
    //   name: "dashmoney-platform-login",
    // });
    // DashMoneyLF.keys()
    //   .then((keys) => {
    //     this.setState({
    //       DashMoneyLFKeys: keys,
    //     });
    //     console.log(keys);
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });
    //****************************** */
    //3) GET MOST RECENT BLOCK HEIGHT FOR NEW WALLET LOGIN
    // const clientOpts = {
    //   network: this.state.whichNetwork,
    // };
    // const client = new Dash.Client(clientOpts);
    // const getMostRecentBlockHeight = async () => {
    //   const status = await client.getDAPIClient().core.getStatus();
    //   return status;
    // };
    // getMostRecentBlockHeight()
    //   .then((d) => {
    //     let blockHeight = d.chain.blocksCount;
    //     console.log("Most Recent Block Height:\n", blockHeight);
    //     this.setState({
    //       mostRecentBlockHeight: blockHeight - 2500,
    //     });
    //   })
    //   .catch((e) => {
    //     console.error("Something went wrong:\n", e);
    //   })
    //   .finally(() => client.disconnect());
    //FIX THIS^^^
    LocalForage.config({
      name: "dash-frontend",
    });
    let DashFrontend = LocalForage.createInstance({
      name: "dash-frontend",
    });
    DashFrontend.getItem("mode")
      .then((modeVal) => {
        if (modeVal !== null) {
          this.setState({
            mode: modeVal,
          });
        }
        // this.setState({
        //   DashMoneyLFKeys: keys,
        // });
        // console.log(keys);
      })
      .catch(function (err) {
        console.log(err);
      });
    this.getDSOEveryoneDocs(); //WHY NOT MOVE TO ONSELECT LIKE OTHERS ->
  } //FIX THIS^^^

  //ACCOUNT LOGIN FUNCTIONS => SIMPLE LOGIN FIRST
  triggerNameLoading = () => {
    this.setState({
      isLoadingName: true,
    });
  };

  triggerNameNotLoading = () => {
    this.setState({
      isLoadingName: false,
    });
  };

  triggerAliasLoading = () => {
    this.setState({
      isLoadingAlias: true,
    });
  };

  triggerAliasNotLoading = () => {
    this.setState({
      isLoadingAlias: false,
    });
  };

  //TRIGGER THE LOGIN PROCESS ->Simplest no LF setup
  handleAccountLogin = (theMnemonic) => {
    this.getWalletAndIdentitywithMnem(theMnemonic);

    this.setState({
      mnemonic: theMnemonic,
      isLoggedIn: true,
    });
  };

  handleAccountRetry = () => {
    this.getWalletAndIdentitywithMnem(this.state.mnemonic);
  };

  getWalletAndIdentitywithMnem = (theMnemonic) => {
    //gOT FROM DGM
    const client = new Dash.Client({
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: theMnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
    });

    const retrieveIdentityIds = async () => {
      const account = await client.getWalletAccount();

      //console.log(account.getTotalBalance());
      // console.log(account.getUnusedAddress().address);
      //console.log(account.getTransactionHistory());

      this.setState({
        accountBalance: account.getTotalBalance(),
        accountAddress: account.getUnusedAddress().address,
        accountHistory: account.getTransactionHistory(),
      });

      return account.identities.getIdentityIds();
    };

    retrieveIdentityIds()
      .then((d) => {
        //  console.log("Mnemonic identities:\n", d);
        if (d.length === 0) {
          this.setState({
            isLoadingIdentity: false,
            isLoadingWallet: false,

            //These are not called so end loading
            isLoadingIdInfo: false,
            isLoadingAlias: false,
            isLoadingName: false,

            identity: "no identity",
          });
        } else {
          this.setState(
            {
              identity: d[0],
              isLoadingIdentity: false,
              isLoadingWallet: false,
              //maintain Loading bc continuing to other functions
            },
            () => this.conductFullLogin(d[0])
          );
        }
      })
      .catch((e) => {
        console.error(
          "Something went wrong getWalletAndIdentitywithMnem:\n",
          e
        );
        this.setState({
          identityError: true,
          isLoadingIdentity: false,
        });
      })
      .finally(() => client.disconnect());
  };

  conductFullLogin = (theIdentity) => {
    // <= Called from above func..
    // if (!this.state.platformLogin) { //Disconnected bc no platformlogin for now
    //   this.handleLoginAndLFobjectCreate(theIdentity);
    // }

    //THIS SHOULD CALL IDINFO, NAMES, AND ALIASES
    this.getIdentityInfo(theIdentity);
    this.getNamesfromIdentity(theIdentity);
    this.getAliasfromIdentity(theIdentity);
  }; //Many LF, mostRecent and other functions have not been incorporated yet

  getIdentityInfo = (theIdentity) => {
    console.log("Called get identity info");

    const client = new Dash.Client({
      network: this.state.whichNetwork,
    });

    const retrieveIdentity = async () => {
      return client.platform.identities.get(theIdentity); // Your identity ID
    };

    retrieveIdentity()
      .then((d) => {
        if (d !== null) {
          console.log("Identity retrieved:\n", d.toJSON());
          let idInfo = d.toJSON();
          this.setState({
            isLoadingIdInfo: false,
            identityInfo: idInfo,
            identityRaw: d,
          });
        } else {
          console.log("No Identity Info retrieved");
          //If I have an identity then there will be something but if there isn't an identity than this is not called? ->
        }
      })
      .catch((e) => {
        console.error(
          "Something went wrong in retrieving the identityinfo:\n",
          e
        );
        this.setState({
          isLoadingIdInfo: false,
          idInfoError: true, //NEED TO HANDLE SO CAN DISPLAY ->
        });
      })
      .finally(() => client.disconnect());
  };

  handleAliases = (aliasToAdd) => {
    if (!this.state.aliasList.includes(aliasToAdd)) {
      this.setState({
        aliasList: [...this.state.aliasList, aliasToAdd],
      });
    }
    this.setState({
      isLoadingAlias: false,
    });
  };

  handleName = (nameToAdd) => {
    this.setState(
      {
        uniqueName: nameToAdd,
        isLoadingName: false,
      },
      () => this.LOGINCOMPLETEQueryTrigger(this.state.identity)
    );
  };

  getNamesfromIdentity = (theIdentity) => {
    const client = new Dash.Client({ network: this.state.whichNetwork });

    const retrieveNameByRecord = async () => {
      // Retrieve by a name's identity ID
      return client.platform.names.resolveByRecord(
        "dashUniqueIdentityId",
        theIdentity // Your identity ID
      );
    };

    retrieveNameByRecord()
      .then((d) => {
        if (d.length === 0) {
          console.log("There are no Names.");
          this.setState({
            //Should catch the new name and aliases and stop spinner
            isLoadingName: false,
            uniqueName: "no name",
          });
        } else {
          let nameRetrieved = d[0].toJSON();
          console.log("Name retrieved:\n", nameRetrieved);
          this.setState(
            {
              uniqueName: nameRetrieved.label,
              isLoadingName: false,
            },
            () => this.LOGINCOMPLETEQueryTrigger(theIdentity)
          );
        }
      })
      .catch((e) => {
        this.setState({
          isLoadingName: false,
          nameError: true,
        });
        console.error("Something went wrong getting names:\n", e);
        // this.getAliasfromIdentity(theIdentity);
      })
      .finally(() => client.disconnect());
  };

  LOGINCOMPLETEQueryTrigger = (theIdentity) => {
    //After(Identity/Name) -> trigger added to 2 Functions ABOVE
    // ForYou(Messages)
    this.startMessagesQuerySeq(theIdentity);

    // DGM msgs(to&from) && //DGM AddressesFromWallet!
    this.handleLoginQueries_WALLET(theIdentity);
    this.getAddresses_WALLET();
  };

  getAliasfromIdentity = (theIdentity) => {
    const client = new Dash.Client({ network: this.state.whichNetwork });

    const retrieveNameByRecord = async () => {
      // Retrieve by a name's identity ID
      return client.platform.names.resolveByRecord(
        "dashAliasIdentityId",
        theIdentity // Your identity ID
      );
    };

    retrieveNameByRecord()
      .then((d) => {
        if (d.length === 0) {
          console.log("There are no Aliases.");
          this.setState({
            isLoadingAlias: false,
          });
        } else {
          let aliasesRetrieved = d.map((alias) => {
            console.log("Alias: ", alias.toJSON().label);
            return alias.toJSON().label;
          });
          //WHAT AM i DOING THIS FOR AND NOT JUST SETTING IN STATE? ->
          let filteredAliases = aliasesRetrieved.filter(
            (alias) => !this.state.aliasList.includes(alias)
          );

          this.setState({
            isLoadingAlias: false,
            aliasList: [...this.state.aliasList, ...filteredAliases],
          });
        }
      }) //ADD THE ALIASERROR AND HANDLE AS WELL ->
      .catch((e) => console.error("Something went wrong with getAlias:\n", e))
      .finally(() => client.disconnect());
  };

  // ####  ####  WRITE ACTIONS BELOW  #### ####

  registerIdentity = () => {
    //REIMPLEMENT LFOBJ CREATE WHEN GET TO THAT POINT <-

    this.setState({
      isLoadingIdentity: true,
      isLoadingIdInfo: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
    };

    const client = new Dash.Client(clientOpts);

    const createIdentity = async () => {
      return client.platform.identities.register();
    };

    createIdentity()
      .then((d) => {
        console.log("Registered Identity:\n", d.toJSON());
        let idInfo = d.toJSON();
        this.setState({
          identity: idInfo.id,
          identityInfo: idInfo,
          identityRaw: d,
          uniqueName: "no name", //This sets up the next step
          isLoadingIdentity: false,
          isLoadingIdInfo: false,
          accountBalance: this.state.accountBalance - 1000000,
        });

        // if(!this.state.platformLogin){
        //   //CREATE AN OBJECT AND PUT IT IN THERE!!!
        //   let lfObject = {
        //    identity: idInfo.id,
        //  };

        //  let DashMoneyLF = LocalForage.createInstance({
        //    name: "dashmoney-platform-login",
        //  });
        //  //This is where I save to localForage if walletId is not there.
        //  DashMoneyLF.setItem(this.state.walletId, lfObject)
        //    .then((d) => {
        //      //return LocalForage.getItem(walletId);
        //      console.log("Return from LF setitem:", d);
        //    })
        //    .catch((err) => {
        //      console.error("Something went wrong setting to localForage:\n", err);
        //    });
        //  //******************** */
        //  }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingIdentity: false,
          isLoadingIdInfo: false,
          identityError: true,
        });
      })
      .finally(() => client.disconnect());
  };

  doTopUpIdentity = (numOfCredits) => {
    this.setState({
      isLoadingIdInfo: true,
      identityInfo: "",
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const topupIdentity = async () => {
      const identityId = this.state.identity; // Your identity ID
      const topUpAmount = numOfCredits; // Number of duffs ie 1000

      await client.platform.identities.topUp(identityId, topUpAmount);
      return client.platform.identities.get(identityId);
    };

    topupIdentity()
      .then((d) => {
        console.log("Identity credit balance: ", d.balance);
        //Just manually add the topup amount
        this.setState({
          identityInfo: d.toJSON(),
          identityRaw: d,
          isLoadingIdInfo: false,
          accountBalance: this.state.accountBalance - 1000000,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingIdInfo: false,
          //Add error state to handle identityInfo being set to '' or else will be stuck in loading state.. ->
        });
      })
      .finally(() => client.disconnect());
  };
  //Name and Alias purchase is done in the modal.

  //ACCOUNT LOGIN FUNCTIONS^^^

  /**
   *     ###     ###
   *    ## ##    ####
   *   ###  ##  ##  ##
   *  ###    ####    ##
   * ###      ###     ##
   *
   * MESSAGES FUNCTIONS^^^^^
   */

  handleMessagesTab = (eventKey) => {
    if (eventKey === "For you")
      this.setState({
        whichMessagesTab: "For you",
      });
    else {
      this.setState({
        whichMessagesTab: "Everyone",
      });
    }
  };

  handleThread = (msgDocId) => {
    if (!this.state.isLoadingRefresh) {
      this.setState(
        {
          ThreadMessageId: msgDocId,
        },
        () => this.showModal("NewThreadModal")
      );
    }
  };

  handleMessageFailureAlert = () => {
    this.setState({
      errorToDisplay: false,
    });
  };

  updateCreditsAfterTopUp = (identInfo) => {
    this.setState({
      identityInfo: identInfo,
      isLoadingRefresh: false,
    });
  };

  updateIdentityInfo = () => {
    console.log("Called update id info");

    this.setState({
      identityInfo: "",
    });

    const client = new Dash.Client({ network: this.state.whichNetwork });

    const retrieveIdentity = async () => {
      return client.platform.identities.get(this.state.identity); // Your identity ID
    };

    retrieveIdentity()
      .then((d) => {
        //console.log("Identity retrieved:\n", d.toJSON());

        this.setState({
          identityInfo: d.toJSON(),
          identityRaw: d,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  startMessagesQuerySeq = (theIdentity) => {
    this.getDSOForyouByyouDocs(theIdentity);
    this.getDSOForyouFromOthersTags(theIdentity);
    //set the autoupdate here??
  };

  //START - Everyone: Msgs and Threads

  checkEveryoneRace = () => {
    //AutoUpdate Trigger here <=
    if (this.state.Everyone1 && this.state.Everyone2) {
      this.setState({
        isLoadingEveryone: false,
        isLoadingRefresh: false,
      });
      setInterval(() => this.autoUpdateEveryoneHelper(), 50000);
    }
  };

  getDSOEveryoneDocs = () => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO, // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      return client.platform.documents.get("DSOContract.dsomsg", {
        limit: 60,
        where: [
          ["sh", "==", "out"],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        //Should never be 0 so not handling that case.

        let docArray = [];
        console.log("Getting Everyone DSO Docs");
        for (const n of d) {
          //console.log("EveryoneMsgs:\n", n.toJSON());
          docArray = [...docArray, n.toJSON()];
        }

        if (docArray.length !== 0) {
          this.getEveryoneThreads(docArray);
          this.getDSOEveryoneNames(docArray);
          // this.setState({
          //   EveryoneMsgs: docArray,
          // });
          //^^^SET IN STATE IN NAMES TO REDUCE SETSTATE CALLS!!
        }
      })
      .catch((e) => {
        console.error("Something went wrong in getDSOEveryoneDocs:\n", e);
        this.setState({
          isLoadingEveryone: false,
          isLoadingRefresh: false,
        });
      })
      .finally(() => client.disconnect());
  };

  getDSOEveryoneNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    //console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> Then function won't be called
        if (d.length === 0) {
          console.log("No everyone msgs Names retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            EveryoneNames: nameDocArray,
            EveryoneMsgs: docArray,
            Everyone1: true,
          },
          () => this.checkEveryoneRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting Everyone Msgs Names:\n", e);
        this.setState({
          isLoadingEveryone: false,
          isLoadingRefresh: false,
        });
      })
      .finally(() => client.disconnect());
  };

  getEveryoneThreads = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    // This Below is to get unique set of order doc ids
    let arrayOfMsgIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of Msg ids", arrayOfMsgIds);

    let setOfMsgIds = [...new Set(arrayOfMsgIds)];

    arrayOfMsgIds = [...setOfMsgIds];

    //console.log("Array of Msg ids", arrayOfMsgIds);

    const getDocuments = async () => {
      //console.log("Called Get Everyone Threads");

      return client.platform.documents.get("DSOContract.dsothr", {
        where: [["msgId", "in", arrayOfMsgIds]],
        orderBy: [["msgId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        for (const n of d) {
          let returnedDoc = n.toJSON();
          //console.log("Thr:\n", returnedDoc);
          returnedDoc.msgId = Identifier.from(
            returnedDoc.msgId,
            "base64"
          ).toJSON();
          //console.log("newThr:\n", returnedDoc);
          docArray = [...docArray, returnedDoc];
        }

        if (docArray.length === 0) {
          this.setState(
            {
              EveryoneThreads: docArray, //this has nothing
              Everyone2: true,
            },
            () => this.checkEveryoneRace()
          );
        } else {
          this.getEveryoneThreadsNames(docArray); //Name Retrieval
          // this.setState({
          //   EveryoneThreads: docArray,
          // });
          //^^^SET IN STATE IN NAMES TO REDUCE SETSTATE CALLS!!
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  getEveryoneThreadsNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let arrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(arrayOfOwnerIds)];

    arrayOfOwnerIds = [...setOfOwnerIds];

    //console.log("Called Get Everyone Threads Names");
    //console.log(arrayOfOwnerIds);

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());
          nameDocArray = [n.toJSON(), ...nameDocArray];
        }

        this.setState(
          {
            EveryoneThreadsNames: nameDocArray,
            EveryoneThreads: docArray,
            Everyone2: true,
          },
          () => this.checkEveryoneRace()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong getting Everyone Threads Names:\n",
          e
        );
        this.setState({
          EveryoneThreadsNamesError: true, //<- add to state? ->
          isLoadingEveryone: false,
          isLoadingRefresh: false,
        });
      })
      .finally(() => client.disconnect());
  };
  //END - Everyone: Msgs and Threads

  checkForYouRace = () => {
    //AutoUpdate Trigger here <=
    if (
      this.state.ForYou1 &&
      this.state.ForYou2 &&
      this.state.ForYou3 &&
      this.state.ForYou4
    ) {
      this.setState({
        isLoadingForYou: false,
        isLoadingRefresh: false,
      });

      setInterval(() => this.autoUpdateForYouHelper(), 40000);
    }
  };

  //START - ForYou: Msgs and Threads
  getDSOForyouByyouDocs = (theIdentity) => {
    //console.log("Calling dsoForYouFromyouDocs");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO, // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    //DSOForyou Query -> From you (SO and DM)

    const getDocuments = async () => {
      return client.platform.documents.get("DSOContract.dsomsg", {
        limit: 60,
        where: [
          ["$ownerId", "==", theIdentity],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no ForyouByyouMsgs");

          this.setState(
            {
              ForYou1: true,
              ForYou2: true,
            },
            () => this.checkForYouRace()
          );
        } else {
          let docArray = [];

          for (const n of d) {
            //console.log("ByYouMsgs:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
          this.getByYouThreads(docArray);
          this.getForyouByyouNames(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getForyouByyouNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    //console.log("Calling getNamesforyouDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            ByYouNames: nameDocArray,
            ByYouMsgs: docArray,
            ForYou1: true,
          },
          () => this.checkForYouRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting Everyone Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  }; //SENDS TO COMBINE MESSAGES

  getByYouThreads = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    // This Below is to get unique set of ByYou msg doc ids
    let arrayOfMsgIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of ByYouThreads ids", arrayOfMsgIds);

    let setOfMsgIds = [...new Set(arrayOfMsgIds)];

    arrayOfMsgIds = [...setOfMsgIds];

    //console.log("Array of order ids", arrayOfMsgIds);

    const getDocuments = async () => {
      //console.log("Called Get ByYou Threads");

      return client.platform.documents.get("DSOContract.dsothr", {
        where: [["msgId", "in", arrayOfMsgIds]], // check msgId ->
        orderBy: [["msgId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        for (const n of d) {
          let returnedDoc = n.toJSON();
          //console.log("Thr:\n", returnedDoc);
          returnedDoc.msgId = Identifier.from(
            returnedDoc.msgId,
            "base64"
          ).toJSON();
          //console.log("newThr:\n", returnedDoc);
          docArray = [...docArray, returnedDoc];
        }

        if (docArray.length === 0) {
          this.setState(
            {
              ForYou2: true,
            },
            () => this.checkForYouRace()
          );
        } else {
          this.getByYouThreadsNames(docArray); //Name Retrieval
        }
      })
      .catch((e) => {
        console.error("Something went wrong ByYouThreads:\n", e);
        this.setState({
          ByYouThreadsError: true, //handle error ->
          isLoadingForYou: false,
        });
      })
      .finally(() => client.disconnect());
  };

  getByYouThreadsNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let arrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(arrayOfOwnerIds)];

    arrayOfOwnerIds = [...setOfOwnerIds];

    //console.log("Called Get ByYou Threads Names");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];
        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }

        this.setState(
          {
            ByYouThreadsNames: nameDocArray,
            ByYouThreads: docArray,
            ForYou2: true,
          },
          () => this.checkForYouRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting ByYouThreadsNames:\n", e);
        this.setState({
          ByYouThreadsNamesError: true, //<- add to state? ->
        });
      })
      .finally(() => client.disconnect());
  };
  //END - ForYou: Msgs and Threads

  //START - ForYou TAGS: Msgs and Threads
  getDSOForyouFromOthersTags = (theIdentity) => {
    //console.log("Calling dsoForYouOthersTags");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO, // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    //DSOForyou Query -> From other's tags (SO and DM) -> this is forTAGS

    const getTagsFromtoUserIdYourOwnerId = async () => {
      return client.platform.documents.get("DSOContract.dsotag", {
        limit: 60,
        where: [
          ["toId", "==", theIdentity],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getTagsFromtoUserIdYourOwnerId()
      .then((d) => {
        if (d.length !== 0) {
          let docArray = [];

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Thr:\n", returnedDoc);
            returnedDoc.msgId = Identifier.from(
              returnedDoc.msgId,
              "base64"
            ).toJSON();
            //console.log("newThr:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }

          let msgIdArray = docArray.map((doc) => {
            return doc.msgId;
          });

          //console.log(`MessageID Array: ${msgIdArray}`);

          //NEXT GET THE MSGS FROM THE TAGS msgIds************
          this.getDSOmsgsFromTags(msgIdArray);
          //NEXT GET THE MSGS FROM THE TAGS msgIds************
        } else {
          console.log("No Tags for this user.");

          this.setState(
            {
              ForYou3: true,
              ForYou4: true,
            },
            () => this.checkForYouRace()
          );
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getDSOmsgsFromTags = (idsOfMsgsFromTags) => {
    //console.log("Getting MSGs from Tags");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO, // Your contract ID
        },
      },
    };
    let client = new Dash.Client(clientOpts);

    //console.log(`Array of MsgIds: ${arrayOfMSGIds}`);

    const getDocuments = async () => {
      return client.platform.documents.get("DSOContract.dsomsg", {
        where: [["$id", "in", idsOfMsgsFromTags]],
        orderBy: [["$id", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        if (d.length === 0) {
          console.log("There are not FromTagsMsgs");
        } else {
          for (const n of d) {
            //console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
          this.getFromTagsThreads(docArray);
          this.getDSOmsgsFromTagsNames(docArray);

          // this.setState({
          //   FromTagsMsgs: docArray,
          // });
          //SET IN STATE IN NAMES TO REDUCE SETSTATE CALLS!!
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getDSOmsgsFromTagsNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            FromTagsNames: nameDocArray,
            FromTagsMsgs: docArray,
            ForYou3: true,
          },
          () => this.checkForYouRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting ForYou Tags Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  getFromTagsThreads = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    // This Below is to get unique set of ByYou msg doc ids
    let arrayOfMsgIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of ByYouThreads ids", arrayOfMsgIds);

    let setOfMsgIds = [...new Set(arrayOfMsgIds)];

    arrayOfMsgIds = [...setOfMsgIds];

    //console.log("Array of order ids", arrayOfMsgIds);

    const getDocuments = async () => {
      //console.log("Called Get FromTags Threads");

      return client.platform.documents.get("DSOContract.dsothr", {
        where: [["msgId", "in", arrayOfMsgIds]], // check msgId ->
        orderBy: [["msgId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        for (const n of d) {
          let returnedDoc = n.toJSON();
          //console.log("Thr:\n", returnedDoc);
          returnedDoc.msgId = Identifier.from(
            returnedDoc.msgId,
            "base64"
          ).toJSON();
          //console.log("newThr:\n", returnedDoc);
          docArray = [...docArray, returnedDoc];
        }

        if (docArray.length === 0) {
          this.setState(
            {
              ForYou4: true,
            },
            () => this.checkForYouRace()
          );
        } else {
          this.getFromTagsThreadsNames(docArray); //Name Retrieval
        }
      })
      .catch((e) => {
        console.error("Something went wrong ByYouThreads:\n", e);
        this.setState({
          FromTagsThreadsError: true, //handle error ->
          //isLoadingForYou: false,
        });
      })
      .finally(() => client.disconnect());
  };

  getFromTagsThreadsNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DataContractDPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let arrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(arrayOfOwnerIds)];

    arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Called Get FromTags Threads Names");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DataContractDPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];
        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }

        this.setState(
          {
            FromTagsThreadsNames: nameDocArray,
            FromTagsThreads: docArray,
            ForYou4: true,
          },
          () => this.checkForYouRace()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong getting FromTagsThreadsNames:\n",
          e
        );
        this.setState({
          FromTagsThreadsNamesError: true, //<- add to state? ->
        });
      })
      .finally(() => client.disconnect());
  };

  //END - ForYou TAGS: Msgs and Threads

  //   DOCUMENT CREATION
  submitDSODocument = (addedMessage, ownerIdArray) => {
    //  -> sh: out, dir, tip ?

    this.setState({
      isLoadingRefresh: true,
    });

    //console.log(addedMessage);
    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,

        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO, // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    //let dsoMessageAndTags;
    let dsoTags;

    const submitDocuments = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      let docProperties = {};

      /*dsomsg ->
       msg, sh, msgId(for reply)  (only first 2 are required)
*/

      if (addedMessage.sh === "out") {
        docProperties = {
          msg: addedMessage.msg,
          sh: "out",
        };
      } //RIGHT HERE IS WHERE i PUT THE 'dir'
      //and then if 'thr' adds the state to the msgId ->
      else {
        docProperties = {
          msg: addedMessage.msg,
        };
      }

      // Create the note document
      const dsoDocument = await platform.documents.create(
        "DSOContract.dsomsg",
        identity,
        docProperties
      );

      //console.log(dsoDocument.toJSON());

      //console.log("OwnerIdArray of Tags: ", ownerIdArray);

      if (ownerIdArray.length !== 0) {
        let dsotags = await Promise.all(
          ownerIdArray.map(async (ownerId) => {
            //https://stackoverflow.com/questions/40140149/use-async-await-with-array-map

            //dsotag ->  toId, msgId (all required)

            let tagDoc = await platform.documents.create(
              "DSOContract.dsotag",
              identity,
              {
                toId: ownerId,
                msgId: dsoDocument.toJSON().$id,
              }
            );
            return tagDoc;
          })
        );

        dsoTags = dsotags;
      } //else {
      // dsoMessageAndTags = [dsoDocument];
      // }

      //THIS ^^^ IS WHAT IS PASSED TO THE DOCUMENT CREATION

      //############################################################
      //This below disconnects the document sending..***

      //return dsoMessageAndTags;

      //This is to disconnect the Document Creation***

      //############################################################

      // const documentBatch = {
      //   create: dsoMessageAndTags, // [dsoDocument], // Document(s) to create
      // };

      const msgBatch = {
        create: [dsoDocument], // Document(s) to create
      };

      await platform.documents.broadcast(msgBatch, identity);

      // const tagBatch = { //Moved below for individual submission
      //   create: dsoTags, // Document(s) to create
      // };

      if (ownerIdArray.length !== 0) {
        //Does this handle multiple tags -> No need to use a for statement
        //CHECK OUT THE ABOVE THE ISSUE IS THAT i USE THE AWAIT FOR THE DOCUMENT CREATE BUT NEED TO USE FOR THE BROADCAST
        //
        //await platform.documents.broadcast(tagBatch, identity);

        await Promise.all(
          dsoTags.map(async (tagDoc) => {
            //https://stackoverflow.com/questions/40140149/use-async-await-with-array-map

            const tagBatch = {
              create: [tagDoc], // Document(s) to create
            };

            await platform.documents.broadcast(tagBatch, identity);

            //return tagDoc;
          })
        );
      }

      return [dsoDocument];
    };

    submitDocuments()
      .then((d) => {
        //Returns array!!! ->
        // let returnedDoc = d.toJSON();
        // console.log("MSG Documents JSON:\n", returnedDoc);

        //SIMPLIFY JUST RECEIVE MSG BACK ->

        let docArray = [];
        for (const n of d) {
          console.log("Submitted Doc:\n", n.toJSON());
          docArray = [...docArray, n.toJSON()];
        }

        let message = {};

        if (docArray.length === 1) {
          message = {
            $ownerId: docArray[0].$ownerId,
            $id: docArray[0].$id, //$id: returnedDoc.transitions[0].$id,
            sh: addedMessage.sh,
            msg: addedMessage.msg,
            $createdAt: docArray[0].$createdAt,
          };
        } else {
          docArray.forEach((doc) => {
            //OR I could do a find and it would be a bit faster ->
            if (doc.$type === "dsomsg") {
              message = {
                $ownerId: doc.$ownerId,
                $id: doc.$id,
                sh: addedMessage.sh,
                msg: addedMessage.msg,
                $createdAt: doc.$createdAt,
              };
            }
          });
        }

        if (addedMessage.sh === "out") {
          this.setState(
            {
              EveryoneMsgs: [message, ...this.state.EveryoneMsgs],
              ByYouMsgs: [message, ...this.state.ByYouMsgs],
              isLoadingRefresh: false,
            },
            () => this.updateIdentityInfo()
          );
        } else {
          this.setState(
            {
              ByYouMsgs: [message, ...this.state.ByYouMsgs],
              isLoadingRefresh: false,
            },
            () => this.updateIdentityInfo()
          );
        }

        //console.log(submittedDoc);
      })
      .catch((e) => {
        this.setState({
          isLoadingRefresh: false,
          errorToDisplay: true,
        });

        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());

    //THIS BELOW IS THE NAME DOC ADD, SO PROCESSES DURING DOC SUBMISSION ***
    let nameDoc = {
      $ownerId: this.state.identity,
      label: this.state.uniqueName,
    };

    this.setState({
      EveryoneNames: [nameDoc, ...this.state.EveryoneNames],

      ByYouNames: [nameDoc, ...this.state.ByYouNames],

      FromTagsNames: [nameDoc, ...this.state.FromTagsNames],
    });
    //END OF NAME DOC ADD***
  };

  submitDSOThread = (addedMessage, ownerIdArray) => {
    this.setState({
      isLoadingRefresh: true,
    });

    //console.log(addedMessage);
    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO, // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let dsoTags;

    const submitDocuments = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      let docProperties = {};

      //THIS ALL NEED TO BE ADJUST FRO THREADS AND NOT MSGS ->
      //required: [ 'msg', 'msgId', "$createdAt", "$updatedAt"],
      docProperties = {
        msg: addedMessage.msg,
        msgId: this.state.ThreadMessageId,
      };

      // Create the note document
      const dsoDocument = await platform.documents.create(
        "DSOContract.dsothr",
        identity,
        docProperties
      );

      //console.log(dsoDocument.toJSON());

      //console.log('OwnerIdArray of Tags: ',ownerIdArray);

      if (ownerIdArray.length !== 0) {
        let dsotags = await Promise.all(
          ownerIdArray.map(async (ownerId) => {
            //https://stackoverflow.com/questions/40140149/use-async-await-with-array-map

            //dsotag ->  toId, msgId (all required)

            let tagDoc = await platform.documents.create(
              "DSOContract.dsotag",
              identity,
              {
                toId: ownerId,
                msgId: dsoDocument.toJSON().$id,
              }
            );
            return tagDoc;
          })
        );

        dsoTags = dsotags;
      } //else {
      // dsoMessageAndTags = [dsoDocument];
      // }

      //THIS ^^^ IS WHAT IS PASSED TO THE DOCUMENT CREATION

      //############################################################
      //This below disconnects the document sending..***

      //return dsoMessageAndTags;

      //This is to disconnect the Document Creation***

      //############################################################

      const thrBatch = {
        create: [dsoDocument], // Document(s) to create
      };

      const tagBatch = {
        create: dsoTags, // Document(s) to create
      };

      await platform.documents.broadcast(thrBatch, identity);

      if (ownerIdArray.length !== 0) {
        await platform.documents.broadcast(tagBatch, identity);
      }

      return [dsoDocument];
    };

    submitDocuments()
      .then((d) => {
        // let returnedDoc = d;
        // console.log("Thread Documents:\n", returnedDoc);

        let docArray = [];
        for (const n of d) {
          console.log("Thr:\n", n.toJSON());
          docArray = [...docArray, n.toJSON()];
        }

        let newThread = {};

        if (docArray.length === 1) {
          newThread = {
            $ownerId: docArray[0].$ownerId,
            $id: docArray[0].$id, //$id: returnedDoc.transitions[0].$id,
            msgId: this.state.ThreadMessageId,
            msg: addedMessage.msg,
            $createdAt: docArray[0].$createdAt,
          };
        } else {
          docArray.forEach((doc) => {
            if (doc.$type === "dsothr") {
              newThread = {
                $ownerId: doc.$ownerId,
                $id: doc.$id,
                msgId: this.state.ThreadMessageId,
                msg: addedMessage.msg,
                $createdAt: doc.$createdAt,
              };
            }
          });
        }

        this.setState(
          {
            EveryoneThreads: [newThread, ...this.state.EveryoneThreads],

            ByYouThreads: [newThread, ...this.state.ByYouThreads],

            FromTagsThreads: [newThread, ...this.state.FromTagsThreads],

            isLoadingRefresh: false,
          },
          () => this.updateIdentityInfo()
        );
      })
      .catch((e) => {
        this.setState({
          isLoadingRefresh: false,
          errorToDisplay: true,
        });

        console.error("Something went wrong creating new thread:\n", e);
      })
      .finally(() => client.disconnect());

    //THIS BELOW IS THE NAME DOC ADD, SO PROCESSES DURING DOC SUBMISSION ***
    let nameDoc = {
      $ownerId: this.state.identity,
      label: this.state.uniqueName,
    };

    this.setState({
      EveryoneThreadsNames: [nameDoc, ...this.state.EveryoneThreadsNames],

      ByYouThreadsNames: [nameDoc, ...this.state.ByYouThreadsNames],

      FromTagsThreadsNames: [nameDoc, ...this.state.FromTagsThreadsNames],
    });
    //END OF NAME DOC ADD***
  };

  //ALSO RECALL THE IDENTITY SO THAT IT WILL UPDATE THE CREDITS <- ? IS THIS FOR THE ABOVE FUNCTIONS? ->

  //#######################################################################
  // AUTO-UPDATE QUERIES

  compareNewToOld(possibleDocs, oldDocs) {
    let newDocs = [];

    possibleDocs.forEach((possibleDoc) => {
      let oldContains = oldDocs.every(
        (oldDoc) => oldDoc.$id !== possibleDoc.$id
      );

      if (oldContains) {
        newDocs.push(possibleDoc);
      }
    });

    return newDocs;
  }
  // *** AutoUpdate SO and SO threads ***

  autoUpdateEveryoneHelper = () => {
    console.log("AutoUpdate Everyone");

    if (
      !this.state.isLoadingEveryone &&
      !this.state.isLoadingRefresh &&
      !this.state.NewSO1 &&
      !this.state.NewSO2
    ) {
      this.checkForNewSO();
      this.checkForNewSOThreads();
    }
  };

  checkNewSORace = () => {
    if (this.state.NewSO1 && this.state.NewSO2) {
      this.setState({
        NewSO1: false,
        NewSO2: false,
      });
    }
  };

  pushNewSOtoView = () => {
    this.setState({
      EveryoneMsgs: [...this.state.NewSOMsgs, ...this.state.EveryoneMsgs],
      NewSOMsgs: [],

      EveryoneNames: [...this.state.NewSONames, ...this.state.EveryoneNames],
      NewSONames: [],

      EveryoneThreads: [
        ...this.state.NewSOThreads,
        ...this.state.EveryoneThreads,
      ],
      NewSOThreads: [],

      EveryoneThreadsNames: [
        ...this.state.NewSOThreadsNames,
        ...this.state.EveryoneThreadsNames,
      ],
      NewSOThreadsNames: [],
    });
  };

  checkForNewSO = () => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO, // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      return client.platform.documents.get("DSOContract.dsomsg", {
        limit: 60,
        where: [
          ["sh", "==", "out"],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        //Should never be 0 so not handling that case.

        let docArray = [];
        //console.log("Getting Everyone DSO Docs");
        for (const n of d) {
          //console.log("Document:\n", n.toJSON());
          docArray = [...docArray, n.toJSON()];
        }

        // $$$ $$$ $$$ $$$ $$$

        let alreadyHaveArray = [
          ...this.state.EveryoneMsgs,
          ...this.state.NewSOMsgs,
        ];

        docArray = this.compareNewToOld(docArray, alreadyHaveArray);

        // $$$ $$$ $$$ $$$ $$$

        if (docArray.length !== 0) {
          this.handleLoadNewSO(docArray);
        } else {
          this.setState(
            {
              NewSO1: true,
            },
            () => this.checkNewSORace()
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong in checkForNewSO:\n", e);
      })
      .finally(() => client.disconnect());
  };

  handleLoadNewSO = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> Then function won't be called
        if (d.length === 0) {
          console.log("No handleLoadNewSO Names retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            NewSONames: [...nameDocArray, ...this.state.NewSONames],
            NewSOMsgs: [...docArray, ...this.state.NewSOMsgs],
            NewSO1: true,
          },
          () => this.checkNewSORace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong in handleLoadNewSO:\n", e);
      })
      .finally(() => client.disconnect());
  };

  checkForNewSOThreads = () => {
    let docArray = [...this.state.NewSOMsgs, ...this.state.EveryoneMsgs];

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    // This Below is to get unique set of order doc ids
    let arrayOfMsgIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of order ids", arrayOfMsgIds);

    let setOfMsgIds = [...new Set(arrayOfMsgIds)];

    arrayOfMsgIds = [...setOfMsgIds];

    //console.log("Array of order ids", arrayOfMsgIds);

    const getDocuments = async () => {
      //console.log("Called Get Everyone Threads");

      return client.platform.documents.get("DSOContract.dsothr", {
        //<- Check this
        where: [["msgId", "in", arrayOfMsgIds]], // check msgId ->
        orderBy: [["msgId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];
        //THERE ISN'T NECESSARY MESSAGE TO GRAB SO COULD BE ZERO SO STILL NEED TO END LOADING ->

        for (const n of d) {
          let returnedDoc = n.toJSON();
          //console.log("Thr:\n", returnedDoc);
          returnedDoc.msgId = Identifier.from(
            returnedDoc.msgId,
            "base64"
          ).toJSON();
          //console.log("newThr:\n", returnedDoc);
          docArray = [...docArray, returnedDoc];
        }

        let alreadyHaveArray = [
          ...this.state.EveryoneThreads,
          ...this.state.NewSOThreads,
        ];

        docArray = this.compareNewToOld(docArray, alreadyHaveArray);

        if (docArray.length === 0) {
          this.setState(
            {
              NewSO2: true,
            },
            () => this.checkNewSORace()
          );
        } else {
          this.handleLoadNewSoThreads(docArray); //Name Retrieval
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          EveryoneThreadsError: true, //handle error ->
          //isLoadingEveryone: false,
        });
      })
      .finally(() => client.disconnect());
  };

  handleLoadNewSoThreads = (docArray) => {
    //Get the names and trigger button

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DataContractDPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let arrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(arrayOfOwnerIds)];

    arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Called Get Everyone Threads Names");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DataContractDPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];
        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }

        this.setState(
          {
            NewSOThreadsNames: [
              ...nameDocArray,
              ...this.state.NewSOThreadsNames,
            ],
            NewSOThreads: [...docArray, ...this.state.NewSOThreads],
            NewSO2: true,
          },
          () => this.checkNewSORace()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong getting  New SO Threads Names:\n",
          e
        );
        this.setState({
          EveryoneThreadsNamesError: true, //<- add to state? ->
        });
      })
      .finally(() => client.disconnect());
  };

  // *** AutoUpdate DM and DM threads ***
  autoUpdateForYouHelper = () => {
    console.log("AutoUpdate For You");

    if (
      !this.state.isLoadingForYou &&
      !this.state.isLoadingRefresh &&
      !this.state.NewDM1 &&
      !this.state.NewDM2 &&
      !this.state.NewDM3
    ) {
      this.checkByYouDMThreads();
      this.getTagsNewDM();
      this.checkFromTagsDMThreads();
    }
  };

  checkNewDMRace = () => {
    if (this.state.NewDM1 && this.state.NewDM2 && this.state.NewDM3) {
      this.setState({
        NewDM1: false,
        NewDM2: false,
        NewDM3: false,
      });
    }
  };

  pushNewDMtoView = () => {
    this.setState({
      ByYouThreads: [
        ...this.state.NewDMByYouThreads,
        ...this.state.ByYouThreads,
      ],
      NewDMByYouThreads: [],

      ByYouThreadsNames: [
        ...this.state.NewDMByYouThreadsNames,
        ...this.state.ByYouThreadsNames,
      ],
      NewDMByYouThreadsNames: [],

      FromTagsMsgs: [
        ...this.state.NewDMFromTagsMsgs,
        ...this.state.FromTagsMsgs,
      ],
      NewDMFromTagsMsgs: [],

      FromTagsNames: [
        ...this.state.NewDMFromTagsNames,
        ...this.state.FromTagsNames,
      ],
      NewDMFromTagsNames: [],

      FromTagsThreads: [
        ...this.state.NewDMFromTagsThreads,
        ...this.state.FromTagsThreads,
      ],
      NewDMFromTagsThreads: [],

      FromTagsThreadsNames: [
        ...this.state.NewDMFromTagsThreadsNames,
        ...this.state.FromTagsThreadsNames,
      ],
      NewDMFromTagsThreadsNames: [],
    });
  };

  checkByYouDMThreads = () => {
    //let docArray = this.state.ByYouMsgs;
    let docArray = [...this.state.ByYouMsgs];

    if (docArray.length !== 0) {
      const clientOpts = {
        network: this.state.whichNetwork,
        apps: {
          DSOContract: {
            contractId: this.state.DataContractDSO,
          },
        },
      };
      const client = new Dash.Client(clientOpts);

      // This Below is to get unique set of order doc ids
      let arrayOfMsgIds = docArray.map((doc) => {
        return doc.$id;
      });

      //console.log("Array of order ids", arrayOfMsgIds);

      let setOfMsgIds = [...new Set(arrayOfMsgIds)];

      arrayOfMsgIds = [...setOfMsgIds];

      //console.log("Array of order ids", arrayOfMsgIds);

      const getDocuments = async () => {
        //console.log("Called Get ByYouDM Threads");

        return client.platform.documents.get("DSOContract.dsothr", {
          where: [["msgId", "in", arrayOfMsgIds]], // check msgId ->
          orderBy: [["msgId", "asc"]],
        });
      };

      getDocuments()
        .then((d) => {
          let docArray = [];

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Thr:\n", returnedDoc);
            returnedDoc.msgId = Identifier.from(
              returnedDoc.msgId,
              "base64"
            ).toJSON();
            //console.log("newThr:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }

          let alreadyHaveArray = [
            ...this.state.ByYouThreads,
            ...this.state.NewDMByYouThreads,
          ];

          docArray = this.compareNewToOld(docArray, alreadyHaveArray);

          if (docArray.length === 0) {
            this.setState(
              {
                NewDM1: true,
              },
              () => this.checkNewDMRace()
            );
          } else {
            this.handleByYouDMThreads(docArray); //Name Retrieval
          }
        })
        .catch((e) => {
          console.error("Something went wrong:\n", e);
          this.setState({
            ByYouDMThreadsError: true, //handle error ->
            //isLoadingEveryone: false,
          });
        })
        .finally(() => client.disconnect());
    }
  };

  handleByYouDMThreads = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DataContractDPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let arrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(arrayOfOwnerIds)];

    arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Called Get ByYouDMThreads Names");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DataContractDPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];
        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }

        this.setState(
          {
            NewDMByYouThreadsNames: [
              ...nameDocArray,
              ...this.state.NewDMByYouThreadsNames,
            ],
            NewDMByYouThreads: [...docArray, ...this.state.NewDMByYouThreads],
            NewDM1: true,
          },
          () => this.checkNewDMRace()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong getting ByYouDMThreads Names:\n",
          e
        );
        this.setState({
          ByYouDMThreadsNamesError: true, //<- add to state? ->
        });
      })
      .finally(() => client.disconnect());
  };

  getTagsNewDM = () => {
    //console.log("Calling getTagsNewDM");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO, // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    //DSOForyou Query -> From other's tags (SO and DM) -> this is forTAGS

    const getTagsFromtoUserIdYourOwnerId = async () => {
      return client.platform.documents.get("DSOContract.dsotag", {
        limit: 60,
        where: [
          ["toId", "==", this.state.identity],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getTagsFromtoUserIdYourOwnerId()
      .then((d) => {
        if (d.length !== 0) {
          let docArray = [];

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Thr:\n", returnedDoc);
            returnedDoc.msgId = Identifier.from(
              returnedDoc.msgId,
              "base64"
            ).toJSON();
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();
            //console.log("newThr:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }

          let msgIdArray = docArray.map((doc) => {
            return doc.msgId;
          });

          //console.log(`MessageID Array: ${msgIdArray}`);

          //NEXT GET THE MSGS FROM THE TAGS msgIds************

          this.getNewDMMsgsFromTags(msgIdArray);

          //NEXT GET THE MSGS FROM THE TAGS msgIds************
        } else {
          console.log("No Tags for this user.");

          this.setState(
            {
              NewDM2: true,
            },
            () => this.checkNewDMRace()
          );
        }
      })
      .catch((e) => console.error("Something went wrong getTagsNewDM:\n", e))
      .finally(() => client.disconnect());
  };

  getNewDMMsgsFromTags = (idsOfMsgsFromTags) => {
    //console.log("Getting MSGs from Tags");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO, // Your contract ID
        },
      },
    };
    let client = new Dash.Client(clientOpts);

    //console.log(`Array of MsgIds: ${idsOfMsgsFromTags}`);

    const getDocuments = async () => {
      return client.platform.documents.get("DSOContract.dsomsg", {
        where: [["$id", "in", idsOfMsgsFromTags]],
        orderBy: [["$id", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        if (d.length === 0) {
          console.log("There are not getNewDMMsgsFromTags");
        } else {
          for (const n of d) {
            //console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }

          //NEED TO SORT NEW FROM OLD ->

          let alreadyHaveArray = [
            ...this.state.FromTagsMsgs,
            ...this.state.NewDMFromTagsMsgs,
          ];

          docArray = this.compareNewToOld(docArray, alreadyHaveArray);

          if (docArray.length !== 0) {
            this.handleFromTagsNewDM(docArray);
          } else {
            this.setState(
              {
                NewDM2: true,
              },
              () => this.checkNewDMRace()
            );
          }
        }
      })
      .catch((e) =>
        console.error("Something went wrong in getNewDMMsgsFromTags:\n", e)
      )
      .finally(() => client.disconnect());
  };

  handleFromTagsNewDM = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> Then function won't be called
        if (d.length === 0) {
          console.log("No handleLoadNewDM Names retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            NewDMFromTagsNames: [
              ...nameDocArray,
              ...this.state.NewDMFromTagsNames,
            ],
            NewDMFromTagsMsgs: [...docArray, ...this.state.NewDMFromTagsMsgs],
            NewDM2: true,
          },
          () => this.checkNewDMRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong in handleLoadNewSO:\n", e);
      })
      .finally(() => client.disconnect());
  };

  checkFromTagsDMThreads = () => {
    let docArray = [
      ...this.state.FromTagsMsgs,
      ...this.state.NewDMFromTagsMsgs,
    ];

    if (docArray.length !== 0) {
      const clientOpts = {
        network: this.state.whichNetwork,
        apps: {
          DSOContract: {
            contractId: this.state.DataContractDSO,
          },
        },
      };
      const client = new Dash.Client(clientOpts);

      // This Below is to get unique set of order doc ids
      let arrayOfMsgIds = docArray.map((doc) => {
        return doc.$id;
      });

      //console.log("Array of order ids", arrayOfMsgIds);

      let setOfMsgIds = [...new Set(arrayOfMsgIds)];

      arrayOfMsgIds = [...setOfMsgIds];

      //console.log("Array of order ids", arrayOfMsgIds);

      const getDocuments = async () => {
        //console.log("Called Get ByYouDM Threads");

        return client.platform.documents.get("DSOContract.dsothr", {
          //<- Check this
          where: [["msgId", "in", arrayOfMsgIds]], // check msgId ->
          orderBy: [["msgId", "asc"]],
        });
      };

      getDocuments()
        .then((d) => {
          let docArray = [];

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Thr:\n", returnedDoc);
            returnedDoc.msgId = Identifier.from(
              returnedDoc.msgId,
              "base64"
            ).toJSON();
            //console.log("newThr:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }

          let alreadyHaveArray = [
            ...this.state.NewDMFromTagsThreads,
            ...this.state.FromTagsThreads,
          ];

          docArray = this.compareNewToOld(docArray, alreadyHaveArray);

          //Do i also need to compare to the holding array state also??

          if (docArray.length === 0) {
            this.setState(
              {
                NewDM3: true,
              },
              () => this.checkNewDMRace()
            );
          } else {
            this.handleFromTagsDMThreads(docArray); //Name Retrieval
          }
        })
        .catch((e) => {
          console.error("Something went wrong in checkFromTagsDMThreads:\n", e);
          this.setState({
            FromTagsNewDMThreadsError: true, //handle error ->
          });
        })
        .finally(() => client.disconnect());
    } //end of beginning if statement
    else {
      this.setState(
        {
          NewDM3: true,
        },
        () => this.checkNewDMRace()
      );
    }
  };

  handleFromTagsDMThreads = (docArray) => {
    //Get the names and trigger button

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DataContractDPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let arrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(arrayOfOwnerIds)];

    arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Called Get ByYouDMThreads Names");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DataContractDPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];
        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }

        this.setState(
          {
            NewDMFromTagsThreadsNames: [
              ...nameDocArray,
              ...this.state.NewDMFromTagsThreadsNames,
            ],
            NewDMFromTagsThreads: [
              ...docArray,
              ...this.state.NewDMFromTagsThreads,
            ],
            NewDM3: true,
          },
          () => this.checkNewDMRace()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong getting ByYouDMThreads Names:\n",
          e
        );
        this.setState({
          FromTagsNewDMThreadsNamesError: true, //<- add to state? ->
        });
      })
      .finally(() => client.disconnect());
  };
  // AUTO-UPDATE QUERIES ^^^

  /*
   * MESSAGES FUNCTIONS^^^^
   *                                 ###     ###
   *                                ## ##    ####
   *                               ###  ##  ##  ##
   *                              ###    ####    ##
   *                             ###      ###     ##
   *      #############
   *     ####        ###
   *     ###
   *     ###     ########
   *     #####      ####
   *      #############
   */
  //GROUP FUNCTIONS

  //NOT QUITE WHAT i WANT BECAUSE WANT TO PULL EACH PULL.. OR DO I
  // I WNANT THE GROUPS TO APPEAR BUT ALSO i WANT
  pullInitialTriggerGROUPS = () => {
    //DOES THE STATE MAINTAIN AS i PULL NEW? -> and not show loading?
    this.getDGTInvites(this.state.identity); //invites and names.
    //will loading state protect if events pulled first?

    if (this.state.InitialPullGROUPS) {
      this.getActiveGroups();
      this.setState({
        InitialPullGROUPS: false, //ADD
      });
    }
  };

  handleSelectedJoinGroup = (groupName) => {
    this.setState(
      {
        selectedGroup: groupName,
      },
      () => this.showModal("JoinGroupModal")
    );
  };

  hideGroupPage = () => {
    this.setState({
      isGroupShowing: false,
    });
  };

  showGroupPage = (groupName) => {
    this.setState({
      selectedGroup: groupName,
      isGroupShowing: true,
    });
  };
  //BELOW should not require the names, but can I still use the same state?
  //Which invites do I need.. just the ones that I sent my self and not invites from others or that I sent to others.. yeah I think separating is best.

  getDGTInvitesForEvents = () => {
    if (!this.state.isLoadingGroupEvents) {
      this.setState({
        isLoadingGroupEvents: true,
      });
    }

    console.log("Calling DGTInvitesForEvents");
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGTContract: {
          contractId: this.state.DataContractDGT, // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    //DGTInvite Query
    const getDocuments = async () => {
      return client.platform.documents.get("DGTContract.dgtinvite", {
        where: [
          ["toId", "==", this.state.identity],
          //["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("There are no DGTInvites");
          this.setState({
            dgtInvitesForEvents: [],
            isLoadingGroupEvents: false,
          });
        } else {
          let docArray = [];

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Invite:\n", returnedDoc);
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();
            //console.log("newInvite:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }

          this.setState({
            dgtInvitesForEvents: docArray,
            isLoadingGroupEvents: false,
          });
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingGroupEvents: false,
        });
      })

      .finally(() => client.disconnect());
  };

  getDGTInvites = (theIdentity) => {
    this.setState({
      isLoadingGroups: true,
    });
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGTContract: {
          contractId: this.state.DataContractDGT, // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    //DGTInvite Query
    const getDocuments = async () => {
      return client.platform.documents.get("DGTContract.dgtinvite", {
        where: [
          ["toId", "==", theIdentity],
          //["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("There are no DGTInvites");
          this.setState({
            isLoadingGroups: false,
          });
        } else {
          let docArray = [];

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Invite:\n", returnedDoc);
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();
            //console.log("newInvite:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }

          this.getDGTInvitesNames(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))

      .finally(() => client.disconnect());
  };

  getDGTInvitesNames = (docArray) => {
    //console.log("Calling getNamesforDGTInvites");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let arrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(arrayOfOwnerIds)];

    arrayOfOwnerIds = [...setOfOwnerIds];

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }

        this.setState({
          dgtInvitesNames: nameDocArray,
          dgtInvites: docArray,
          isLoadingGroups: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingGroups: false,
        });
      })
      .finally(() => client.disconnect());
  };

  getActiveGroups = () => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGTContract: {
          contractId: this.state.DataContractDGT, // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    //DGTInvite Query
    const getDocuments = async () => {
      return client.platform.documents.get("DGTContract.dgtmsg", {
        limit: 60,
        where: [["$createdAt", "<=", Date.now()]],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no DGTInvites");
          this.setState({
            isLoadingActiveGroups: false,
          });
        } else {
          let docArray = [];

          // for (const n of d) {
          //   let returnedDoc = n.toJSON();
          //   //console.log("Doc:\n", returnedDoc);
          //   returnedDoc.msgId = Identifier.from(
          //     returnedDoc.msgId,
          //     "base64"
          //   ).toJSON();
          //   //console.log("newDoc:\n", returnedDoc);
          //   docArray = [...docArray, returnedDoc];
          // }

          for (const n of d) {
            //console.log("Invite Documents:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
            //DOES ANY PART OF DOCUMENT NEED CONVERTING? LIKE THE TOID? ->
          }

          let arrayOfGroups = docArray.map((doc) => {
            return doc.group;
          });

          let setOfGroups = [...new Set(arrayOfGroups)];

          let arrayOfUniqueGroups = [...setOfGroups];

          let uniqueActiveGroups = arrayOfUniqueGroups.map((grpName) => {
            return docArray.find((doc) => doc.group === grpName);
          });

          this.setState({
            dgtActiveGroups: uniqueActiveGroups,
            isLoadingActiveGroups: false,
          });
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))

      .finally(() => client.disconnect());
  };

  //Dont need to, the names are in the messages..! And just use the createdAt for the time =>

  submitCreateGroup = (newGroup) => {
    //Its just a name.
    this.setState({
      isLoadingGroups: true,
    });

    //Makes sure I dont send 2nd invite to myself

    let document = this.state.dgtInvites.find((invite) => {
      return (
        newGroup === invite.group && invite.$ownerId === this.state.identity
      );
    });

    if (document !== undefined) {
      this.setState({
        isLoadingGroups: false,
      });
    } else {
      //ADD INVITE TO DISPLAY AND CONTINUE TO DISPLAY UNTIL RETURNED

      const clientOpts = {
        network: this.state.whichNetwork,
        wallet: {
          mnemonic: this.state.mnemonic,
          adapter: LocalForage.createInstance,
          unsafeOptions: {
            skipSynchronizationBeforeHeight:
              this.state.skipSynchronizationBeforeHeight,
            //change to what the actual block height
          },
        },
        apps: {
          DGTContract: {
            contractId: this.state.DataContractDGT,
          },
        },
      };
      const client = new Dash.Client(clientOpts);

      const submitInvite = async () => {
        const { platform } = client;

        //const identity = await platform.identities.get(this.state.identity); // Your identity ID
        //const identity = this.state.identityRaw;
        let identity = "";
        if (this.state.identityRaw !== "") {
          identity = this.state.identityRaw;
        } else {
          identity = await platform.identities.get(this.state.identity);
        } // Your identity ID

        const docProperties = {
          group: newGroup,
          //toId: Buffer.from(Identifier.from(this.state.identity)),
          // handle on return or what? did i change it right?
          toId: this.state.identity,
          dgt: "self",
        };

        // Create the note document
        const dgtDocument = await platform.documents.create(
          "DGTContract.dgtinvite",
          identity,
          docProperties
        );

        const documentBatch = {
          create: [dgtDocument], // Document(s) to create
        };
        // Sign and submit the document(s)
        await platform.documents.broadcast(documentBatch, identity);
        return dgtDocument;
      };

      submitInvite()
        .then((d) => {
          let submittedDoc = d.toJSON();

          this.setState({
            dgtInvites: [submittedDoc, ...this.state.dgtInvites],
            dgtInvitesForEvents: [
              submittedDoc,
              ...this.state.dgtInvitesForEvents,
            ],
            isLoadingGroups: false,
          });
        })
        .catch((e) => {
          console.error("Something went wrong:\n", e);
          this.setState({
            isLoadingGroups: false,
            errorGroupsAdd: true, //Needs to add to state and handle
          });
        })
        .finally(() => client.disconnect());
    } // This is the close of the else statment
  };

  deleteGroup = (groupRemove) => {
    this.setState({
      isLoadingGroups: true,
      isGroupShowing: false,
    });

    //create a group to remove array for before display ->
    //Find the groupName of the doc and return the docId -> DONE

    let documentJSON = this.state.dgtInvites.find((invite) => {
      return (
        groupRemove === invite.group && invite.$ownerId === this.state.identity
      );
    });
    console.log(documentJSON);

    //let documentId = document.$id;

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DGTContract: {
          contractId: this.state.DataContractDGT,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const deleteDocument = async () => {
      const { platform } = client;
      const identity = this.state.identityRaw;

      const [document] = await client.platform.documents.get(
        "DGTContract.dgtinvite",
        { where: [["$id", "==", documentJSON.$id]] }
      );

      // Sign and submit the document delete transition
      await platform.documents.broadcast({ delete: [document] }, identity);
      return document;
    };

    deleteDocument()
      .then((d) => {
        console.log("Document deleted:\n", d.toJSON());

        let indexToDelete = this.state.dgtInvites.findIndex((invite) => {
          return invite.$id === d.toJSON().$id && invite.dgt === "self";
        });

        let mutableArray = this.state.dgtInvites;
        mutableArray.splice(indexToDelete, 1);

        this.setState({
          dgtInvites: mutableArray,
          dgtInvitesForEvents: mutableArray,
          isLoadingGroups: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingGroups: false,
          //Add Error alert ->
        });
      })
      .finally(() => client.disconnect());
  };

  joinGroup = (groupName) => {
    //HAHAH
    // IS THIS THE SAME AS SUBMITCREATEGROUP ABOVE???
    this.setState({
      isLoadingGroups: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
          //change to what the actual block height
        },
      },
      apps: {
        DGTContract: {
          contractId: this.state.DataContractDGT,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const submitInvite = async () => {
      const { platform } = client;

      //const identity = await platform.identities.get(this.state.identity); // Your identity ID
      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      const docProperties = {
        group: groupName,
        //toId: Buffer.from(Identifier.from(this.state.identity)),
        // handle on return or what? did i change it right?
        toId: this.state.identity,
        dgt: "self",
      };

      // Create the note document
      const dgtDocument = await platform.documents.create(
        "DGTContract.dgtinvite",
        identity,
        docProperties
      );

      const documentBatch = {
        create: [dgtDocument], // Document(s) to create
      };
      // Sign and submit the document(s)
      await platform.documents.broadcast(documentBatch, identity);
      return dgtDocument;
    };

    submitInvite()
      .then((d) => {
        let submittedDoc = d.toJSON();

        this.setState({
          dgtInvites: [submittedDoc, ...this.state.dgtInvites],
          dgtInvitesForEvents: [
            submittedDoc,
            ...this.state.dgtInvitesForEvents,
          ],
          isLoadingGroups: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingGroups: false,
          errorGroupsAdd: true, //Needs to be more specific
        });
      })
      .finally(() => client.disconnect());
  };

  // BELOW - Moved here from Group.jsx
  // Must also move the **state** here as well ->
  //Just go through the functions and pass the state that is there to app.js ->

  submitDGTmessage = (groupName, msgText) => {
    this.setState({
      isLoadingGroup: true,
    });

    const clientOpts = {
      network: "testnet",
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DGTContract: {
          contractId: this.state.DataContractDGT,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let docProperties = {
      group: groupName,
      message: msgText,
    };

    const submitMsgDocument = async () => {
      const { platform } = client;
      //const identity = this.state.identityRaw; // Your identity ID
      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      // Create the note document
      const dgtDocument = await platform.documents.create(
        "DGTContract.dgtmsg", // <- CHECK THIS
        identity,
        docProperties
      );

      const documentBatch = {
        create: [dgtDocument], // Document(s) to create
      };
      // Sign and submit the document(s)
      await platform.documents.broadcast(documentBatch, identity);
      return dgtDocument;
    };

    submitMsgDocument()
      .then((d) => {
        //console.log(d.toJSON());

        this.setState({
          isLoadingGroup: false,
          GroupsMsgsToAdd: [d.toJSON(), ...this.state.GroupsMsgsToAdd],
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingGroup: false,
          sentGroupMsgError: true,
        });
      })
      .finally(() => client.disconnect());
  };

  submitDGTinvite = (dpnsDoc) => {
    //have to get the id of the name like DGM

    //Invite Sent alert ??? also add loading

    this.setState({
      isLoadingGroupInvite: true,
      // isLoadingGroup: true,
    });

    const clientOpts = {
      network: "testnet",
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DGTContract: {
          contractId: this.state.DataContractDGT,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const submitInviteDocument = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      const docProperties = {
        toId: dpnsDoc.$ownerId,
        group: this.state.selectedGroup,
        dgt: "inv",
      };

      // Create the note document
      const dgtDocument = await platform.documents.create(
        "DGTContract.dgtinvite", // <- CHECK THIS
        identity,
        docProperties
      );

      const documentBatch = {
        create: [dgtDocument], // Document(s) to create
      };
      // Sign and submit the document(s)
      await platform.documents.broadcast(documentBatch, identity);
      return dgtDocument;
    };

    submitInviteDocument()
      .then((d) => {
        console.log(d.toJSON());
        this.setState({
          isLoadingGroupInvite: false,
          sentGroupInviteSuccess: true,
          sendToNameInvite: dpnsDoc.label,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingGroupInvite: false,
          sentGroupInviteError: true,
        });
      })
      .finally(() => client.disconnect());
  };

  /*
  *GROUP FUNCTIONS^^^^
   *                             #############
   *                            ####        ###
   *                            ###
   *                            ###     ########
   *                            #####      ####
   *                             #############
   *##       ###    ###
   * ###    ####   ##
   *  ###  ## ## ###
   *   ## ##  ####
   *    ###   ###
   

   */ //WALLET FUNCTIONS

  handleTab_WALLET = (eventKey) => {
    if (eventKey === "Payments")
      this.setState({
        WALLET_whichTab: "Payments",
      });
    else {
      this.setState({
        WALLET_whichTab: "Your Wallet",
      });
    }
  };

  showAddrConfirmModal_WALLET = (inputAddr, inputNumber) => {
    this.setState(
      {
        WALLET_sendSuccess: false,
        WALLET_sendFailure: false,
        WALLET_sendMsgSuccess: false,
        WALLET_sendMsgFailure: false,
        WALLET_amountToSend: Number((inputNumber * 100000000).toFixed(0)),
        WALLET_sendToAddress: inputAddr,
        WALLET_sendToName: "",
        WALLET_messageToSend: "",
        presentModal: "ConfirmAddrPaymentModal",
        isModalShowing: true,
      } //,
      //() => {
      // console.log(this.state.sendToAddress);
      // console.log(this.state.amountToSend);
      //}
    );
  };

  showConfirmModal_WALLET = (
    inputName,
    inputNumber,
    dgmAddressDoc,
    message
  ) => {
    this.setState(
      {
        WALLET_sendSuccess: false,
        WALLET_sendFailure: false,
        WALLET_sendMsgSuccess: false,
        WALLET_sendMsgFailure: false,
        WALLET_sendToName: inputName,
        WALLET_amountToSend: Number((inputNumber * 100000000).toFixed(0)), //Number(inputNumber).toFixed(3),<- Old way // put in sats!! -> DONE
        WALLET_sendToAddress: dgmAddressDoc.address,
        WALLET_sendToDGMAddressDoc: dgmAddressDoc,
        WALLET_messageToSend: message,
        presentModal: "ConfirmPaymentModal",
        isModalShowing: true,
      } //,() => {
      // console.log(this.state.sendToName);
      // console.log(this.state.amountToSend);
      // console.log(this.state.messageToSend);
      // }
    );
  };

  handleSuccessAlert_WALLET = () => {
    this.setState({
      WALLET_sendSuccess: false,
      WALLET_sendMsgSuccess: false,
    });
  };

  handleFailureAlert_WALLET = () => {
    this.setState({
      WALLET_sendFailure: false,
    });
  };

  handleFailureMsgAlert_WALLET = () => {
    this.setState({
      WALLET_sendMsgFailure: false,
    });
  };

  handleLoginforPostPaymentWallet_WALLET = () => {
    const client = new Dash.Client({
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
    });

    const retrieveWallet = async () => {
      const account = await client.getWalletAccount();

      console.log(account.getTotalBalance());
      console.log(account);

      this.setState({
        accountBalance: account.getTotalBalance(),
        //accountAddress: account.getUnusedAddress().address,
        accountHistory: account.getTransactionHistory(),
      });

      return account;
    };

    retrieveWallet()
      .then((d) => {
        //console.log("Wallet Account:\n", d);
        this.setState({
          isLoadingWallet: false,
          isLoadingButtons_WALLET: false,
          isLoadingRefresh_WALLET: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong getting Wallet:\n", e);
        this.setState({
          isLoadingWallet: false,
          isLoadingButtons_WALLET: false,
          isLoadingRefresh_WALLET: false,
        });
      })
      .finally(() => client.disconnect());
  };

  handleThread_WALLET = (msgDocId, toName) => {
    if (!this.state.isLoadingRefresh_WALLET) {
      this.setState(
        {
          WALLET_ThreadMessageId: msgDocId,
          WALLET_messageToWhomName: toName,
        },
        () => this.showModal("ThreadModal_WALLET")
      );
    }
  };

  queryDGMDocument = (theIdentity) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGMContract: {
          contractId: this.state.DataContractDGM,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      console.log("Called Query DGM Documents.");

      return client.platform.documents.get("DGMContract.dgmaddress", {
        where: [["$ownerId", "==", theIdentity]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];
        for (const n of d) {
          // console.log("address:\n", n.toJSON());
          docArray = [...docArray, n.toJSON()];
        }

        this.setState(
          {
            dgmDocuments: docArray,
            WALLET_Login7: true,
          },
          () => this.checkLoginRace_WALLET()
        );
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  handleRefresh_WALLET = () => {
    this.setState({
      isLoadingWallet: true,
      isLoadingRefresh_WALLET: true,
      isLoadingButtons_WALLET: true,
      isLoadingMsgs_WALLET: true,
      WALLET_sendSuccess: false,
      WALLET_sendFailure: false,
      WALLET_sendMsgSuccess: false,
      WALLET_sendMsgFailure: false,
    });

    this.getRefreshByYou(this.state.identity);
    this.getRefreshToYou(this.state.identity);
    this.getRefreshIdentityInfo(this.state.identity);
    this.refreshWallet_WALLET();
  };

  checkRefreshRace = () => {
    if (
      this.state.WALLET_Refresh1 &&
      this.state.WALLET_Refresh2 &&
      this.state.WALLET_Refresh3 &&
      this.state.WALLET_Refresh4 &&
      this.state.WALLET_Refresh5 &&
      this.state.WALLET_Refresh6
    ) {
      this.setState({
        WALLET_ByYouMsgs: this.state.WALLET_RefreshByYouMsgs,
        WALLET_ByYouNames: this.state.WALLET_RefreshByYouNames,
        WALLET_ByYouThreads: this.state.WALLET_RefreshByYouThreads,

        WALLET_ToYouMsgs: this.state.WALLET_RefreshToYouMsgs,
        WALLET_ToYouNames: this.state.WALLET_RefreshToYouNames,
        WALLET_ToYouThreads: this.state.WALLET_RefreshToYouThreads,

        identityInfo: this.state.WALLET_RefreshIdentityInfo,
        identityRaw: this.state.WALLET_RefreshIdentityRaw,

        isLoadingWallet: false,
        isLoadingRefresh_WALLET: false,
        isLoadingButtons_WALLET: false,
        isLoadingMsgs_WALLET: false,

        WALLET_Refresh1: false,
        WALLET_Refresh2: false,
        WALLET_Refresh3: false,
        WALLET_Refresh4: false,
        WALLET_Refresh5: false,
        WALLET_Refresh6: false,
      });
    }
  };

  refreshWallet_WALLET = () => {
    const client = new Dash.Client({
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
    });

    const retrieveWallet = async () => {
      const account = await client.getWalletAccount();

      this.setState({
        accountBalance: account.getTotalBalance(),
        //accountAddress: account.getUnusedAddress().address,
        accountHistory: account.getTransactionHistory(),
      });

      return account;
    };

    retrieveWallet()
      .then((d) => {
        //console.log("Wallet Account:\n", d);

        this.setState(
          {
            WALLET_Refresh6: true,
          },
          () => this.checkRefreshRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong RefreshWallet:\n", e);
      })
      .finally(() => client.disconnect());
  };

  getRefreshIdentityInfo = (theIdentity) => {
    console.log("Called get Refresh Identity Info");

    const client = new Dash.Client({
      network: this.state.whichNetwork,
    });

    const retrieveIdentity = async () => {
      return client.platform.identities.get(theIdentity); // Your identity ID
    };

    retrieveIdentity()
      .then((d) => {
        console.log("Identity retrieved:\n", d.toJSON());
        let idInfo = d.toJSON();
        this.setState(
          {
            WALLET_RefreshIdentityInfo: idInfo,
            WALLET_RefreshIdentityRaw: d,
            WALLET_Refresh5: true,
          },
          () => this.checkRefreshRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong in getRefreshIdentityInfo:\n", e);
      })
      .finally(() => client.disconnect());
  };

  getRefreshByYou = (theIdentity) => {
    //Add the thread call
    //console.log("Calling getRefreshByYou");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGMContract: {
          contractId: this.state.DataContractDGM, // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      return client.platform.documents.get("DGMContract.dgmmsg", {
        limit: 60,
        where: [
          ["$ownerId", "==", theIdentity],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no ForyouByyouMsgs");

          this.setState(
            {
              WALLET_Refresh1: true,
              WALLET_Refresh2: true,
            },
            () => this.checkRefreshRace()
          );
        } else {
          let docArray = [];
          //console.log("Getting ForyouByyouMsgs");
          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Msg:\n", returnedDoc);
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();
            //console.log("newMsg:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }
          this.getRefreshByYouNames(docArray);
          this.getRefreshByYouThreads(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getRefreshByYouNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL - ToId not the ownerId!!!

    let ownerarrayOfToIds = docArray.map((doc) => {
      return doc.toId;
    });

    let setOfToIds = [...new Set(ownerarrayOfToIds)];

    let arrayOfToIds = [...setOfToIds];

    //console.log("Calling getRefreshByYouNames");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfToIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            WALLET_RefreshByYouNames: nameDocArray,
            WALLET_RefreshByYouMsgs: docArray,
            WALLET_Refresh1: true,
          },
          () => this.checkRefreshRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting RefreshByYou Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  getRefreshByYouThreads = (docArray) => {
    //CHANGE from everyone to foryou ->
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGMContract: {
          contractId: this.state.DataContractDGM,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    // This Below is to get unique set of ByYou msg doc ids
    let arrayOfMsgIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of ByYouThreads ids", arrayOfMsgIds);

    let setOfMsgIds = [...new Set(arrayOfMsgIds)];

    arrayOfMsgIds = [...setOfMsgIds];

    //console.log("Array of order ids", arrayOfMsgIds);

    const getDocuments = async () => {
      //console.log("Called Get RefreshByYou Threads");

      return client.platform.documents.get("DGMContract.dgmthr", {
        where: [["msgId", "in", arrayOfMsgIds]], // check msgId ->
        orderBy: [["msgId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        for (const n of d) {
          let returnedDoc = n.toJSON();
          //console.log("Thr:\n", returnedDoc);
          returnedDoc.msgId = Identifier.from(
            returnedDoc.msgId,
            "base64"
          ).toJSON();
          //console.log("newThr:\n", returnedDoc);
          docArray = [...docArray, returnedDoc];
        }

        if (docArray.length === 0) {
          this.setState(
            {
              WALLET_Refresh2: true,
            },
            () => this.checkRefreshRace()
          );
        } else {
          //this.getRefreshByYouThreadsNames(docArray); //Name Retrieval
          this.setState(
            {
              WALLET_RefreshByYouThreads: docArray,
              WALLET_Refresh2: true,
            },
            () => this.checkRefreshRace()
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong RefreshByYouThreads:\n", e);
        this.setState({
          WALLET_RefreshByYouThreadsError: true, //handle error ->
        });
      })
      .finally(() => client.disconnect());
  };

  getRefreshToYou = (theIdentity) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGMContract: {
          contractId: this.state.DataContractDGM,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      console.log("Called getRefreshToYou");

      return client.platform.documents.get("DGMContract.dgmmsg", {
        where: [
          ["toId", "==", theIdentity],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no ForyouByyouMsgs");

          this.setState(
            {
              WALLET_Refresh3: true,
              WALLET_Refresh4: true,
            },
            () => this.checkRefreshRace()
          );
        } else {
          let docArray = [];
          //console.log("Getting getRefreshToYou");
          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Msg:\n", returnedDoc);
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();
            //console.log("newMsg:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }
          this.getRefreshToYouNames(docArray);
          this.getRefreshToYouThreads(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getRefreshToYouNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    //console.log("Calling getRefreshToYouNames");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //  console.log("INIT TOYOU NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            WALLET_RefreshToYouNames: nameDocArray,
            WALLET_RefreshToYouMsgs: docArray,
            WALLET_Refresh3: true,
          },
          () => this.checkRefreshRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting RefreshByYou Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  getRefreshToYouThreads = (docArray) => {
    //CHANGE from everyone to foryou ->
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGMContract: {
          contractId: this.state.DataContractDGM,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    // This Below is to get unique set of ByYou msg doc ids
    let arrayOfMsgIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of ByYouThreads ids", arrayOfMsgIds);

    let setOfMsgIds = [...new Set(arrayOfMsgIds)];

    arrayOfMsgIds = [...setOfMsgIds];

    //console.log("Array of order ids", arrayOfMsgIds);

    const getDocuments = async () => {
      //console.log("Called Get RefreshByYou Threads");

      return client.platform.documents.get("DGMContract.dgmthr", {
        where: [["msgId", "in", arrayOfMsgIds]], // check msgId ->
        orderBy: [["msgId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        for (const n of d) {
          let returnedDoc = n.toJSON();
          //console.log("Thr:\n", returnedDoc);
          returnedDoc.msgId = Identifier.from(
            returnedDoc.msgId,
            "base64"
          ).toJSON();
          //console.log("newThr:\n", returnedDoc);
          docArray = [...docArray, returnedDoc];
        }

        if (docArray.length === 0) {
          this.setState(
            {
              WALLET_Refresh4: true,
            },
            () => this.checkRefreshRace()
          );
        } else {
          this.setState(
            {
              WALLET_RefreshToYouThreads: docArray,
              WALLET_Refresh4: true,
            },
            () => this.checkRefreshRace()
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong RefreshToYouThreads:\n", e);
        this.setState({
          WALLET_RefreshByYouThreadsError: true, //handle error ->
        });
      })
      .finally(() => client.disconnect());
  };

  handleLoginQueries_WALLET = (theIdentity) => {
    //Add the GET ADDRESSES

    if (this.state.dgmDocuments.length === 0) {
      this.queryDGMDocument(theIdentity);
      // this.setState({
      //   WALLET_Login7: true,
      // });
    }
    this.getByYou_WALLET(theIdentity);
    this.getToYou_WALLET(theIdentity);
  };

  getAddresses_WALLET = () => {
    //Finish BELOW ->
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGMContract: {
          contractId: this.state.DataContractDGM,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      console.log("Called getAddresses.");

      //CREATE A FUNCTION THAT GETS ALL THE ADDRESS FROM WALLET HISTORY ->
      //2 sides -> send to AND received from
      //NO ^^ ONLY SEND TO. CANT BE SURE WHERE RECIEVED IS FROM BUT I ONLY NEED THE SEND TO RESEND THE MSG AND ORDERS!
      //*** BUT  *** THEN CAN USE THE PLATFORM DATA **txId** FOR THE RECEIVED?? <= ??

      // let the component do the sorting for display
      // console.log(this.state.accountHistory);
      let addresses = [];
      this.state.accountHistory.forEach((tx, index) => {
        if (tx.type === "sent") {
          let addressToUse = tx.to.find((addr) => {
            // console.log(addr);
            return addr.addressType === "unknown";
          });
          // console.log(`AddressFromWallet:${addressToUse}`);
          if (addressToUse.address !== "false") {
            addresses.push(addressToUse.address);
          }
        }
      });

      // console.log(addresses);

      //SET UNIQUE!!
      let setOfAddresses = [...new Set(addresses)];

      let arrayOfAddresses = [...setOfAddresses];

      if (addresses !== undefined && addresses.length !== 0) {
        return client.platform.documents.get("DGMContract.dgmaddress", {
          where: [["address", "in", arrayOfAddresses]],
          orderBy: [["address", "asc"]],
        });
      } else {
        return [];
      }
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("There are no Addresses_WALLET");
          this.setState({
            isLoadingAddresses_WALLET: false,
          });
        } else {
          let docArray = [];
          //console.log("Getting Addresses_WALLET");
          for (const n of d) {
            let returnedDoc = n.toJSON();
            // console.log("Addr Doc:\n", returnedDoc);

            docArray = [...docArray, returnedDoc];
          }
          this.getAddressesNames_WALLET(docArray);
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  getAddressesNames_WALLET = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((id) =>
      Buffer.from(Identifier.from(id))
    );

    //console.log("Calling getByYouNames");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        // if (d.length === 0) {
        //   console.log("No DPNS domain documents retrieved.");
        // }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState({
          WALLET_addressesNames: nameDocArray,
          WALLET_addresses: docArray,
          isLoadingAddresses_WALLET: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong getting address Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  addAddress_WALLET = () => {}; //USE TO UPDATE addresses_WALLET once pmt is made! ->

  checkLoginRace_WALLET = () => {
    if (
      this.state.WALLET_Login1 &&
      this.state.WALLET_Login2 &&
      this.state.WALLET_Login3 &&
      this.state.WALLET_Login4 &&
      // this.state.WALLET_Login5 &&
      // this.state.WALLET_Login6 &&
      this.state.WALLET_Login7
    ) {
      this.setState({
        isLoadingMsgs_WALLET: false,
        isLoadingButtons_WALLET: false,
        // WALLET_Login1: false,
        // WALLET_Login2: false,
        // WALLET_Login3: false,
        // WALLET_Login4: false,
        // // WALLET_Login5: false,
        // // WALLET_Login6: false,
        // WALLET_Login7: false,
      });
    }
  };

  getByYou_WALLET = (theIdentity) => {
    //Add the thread call
    //console.log("Calling getByYou");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGMContract: {
          contractId: this.state.DataContractDGM, // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      return client.platform.documents.get("DGMContract.dgmmsg", {
        limit: 60,
        where: [
          ["$ownerId", "==", theIdentity],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no ForyouByyouMsgs");

          this.setState(
            {
              WALLET_Login1: true,
              WALLET_Login2: true,
            },
            () => this.checkLoginRace_WALLET()
          );
        } else {
          let docArray = [];
          //console.log("Getting ForyouByyouMsgs");
          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Msg:\n", returnedDoc);
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();
            //console.log("newMsg:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }
          this.getByYouNames_WALLET(docArray);
          this.getByYouThreads_WALLET(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getByYouNames_WALLET = (docArray) => {
    //Need to get the ToId not the ownerId ->
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL - ToId not the ownerId!!!

    let ownerarrayOfToIds = docArray.map((doc) => {
      return doc.toId;
    });

    let setOfToIds = [...new Set(ownerarrayOfToIds)];

    let arrayOfToIds = [...setOfToIds];

    arrayOfToIds = arrayOfToIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Calling getByYouNames");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfToIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            WALLET_ByYouNames: nameDocArray,
            WALLET_ByYouMsgs: docArray,
            WALLET_Login1: true,
          },
          () => this.checkLoginRace_WALLET()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting ByYou Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  }; //Need to get the ToId not the ownerId ->

  getByYouThreads_WALLET = (docArray) => {
    //CHANGE from everyone to foryou ->
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGMContract: {
          contractId: this.state.DataContractDGM,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    // This Below is to get unique set of ByYou msg doc ids
    let arrayOfMsgIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of ByYouThreads ids", arrayOfMsgIds);

    let setOfMsgIds = [...new Set(arrayOfMsgIds)];

    arrayOfMsgIds = [...setOfMsgIds];

    //console.log("Array of order ids", arrayOfMsgIds);

    const getDocuments = async () => {
      //console.log("Called Get ByYou Threads");

      return client.platform.documents.get("DGMContract.dgmthr", {
        where: [["msgId", "in", arrayOfMsgIds]], // check msgId ->
        orderBy: [["msgId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];
        //THERE ISN'T NECESSARY MESSAGE TO GRAB SO COULD BE ZERO SO STILL NEED TO END LOADING ->

        for (const n of d) {
          let returnedDoc = n.toJSON();
          //console.log("Thr:\n", returnedDoc);
          returnedDoc.msgId = Identifier.from(
            returnedDoc.msgId,
            "base64"
          ).toJSON();
          //console.log("newThr:\n", returnedDoc);
          docArray = [...docArray, returnedDoc];
        }

        if (docArray.length === 0) {
          this.setState(
            {
              WALLET_Login2: true,
            },
            () => this.checkLoginRace_WALLET()
          );
        } else {
          //this.getByYouThreadsNames(docArray); //Name Retrieval
          this.setState(
            {
              WALLET_ByYouThreads: docArray,
              WALLET_Login2: true,
            },
            () => this.checkLoginRace_WALLET()
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong ByYouThreads:\n", e);
      })
      .finally(() => client.disconnect());
  };

  getToYou_WALLET = (theIdentity) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGMContract: {
          contractId: this.state.DataContractDGM,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      console.log("Called getToYou");

      return client.platform.documents.get("DGMContract.dgmmsg", {
        where: [
          ["toId", "==", theIdentity],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no ForyouByyouMsgs");

          this.setState(
            {
              WALLET_Login3: true,
              WALLET_Login4: true,
            },
            () => this.checkLoginRace_WALLET()
          );
        } else {
          let docArray = [];
          //console.log("Getting getToYou");
          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("ToYou Msg:\n", returnedDoc);
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();
            //console.log("newMsg:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }
          this.getToYouNames_WALLET(docArray);
          this.getToYouThreads_WALLET(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getToYouNames_WALLET = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    //console.log("Calling getToYouNames");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            WALLET_ToYouNames: nameDocArray,
            WALLET_ToYouMsgs: docArray,
            WALLET_Login3: true,
          },
          () => this.checkLoginRace_WALLET()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting ByYou_WALLET Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  getToYouThreads_WALLET = (docArray) => {
    //CHANGE from everyone to foryou ->
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGMContract: {
          contractId: this.state.DataContractDGM,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    // This Below is to get unique set of ByYou msg doc ids
    let arrayOfMsgIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of ByYouThreads ids", arrayOfMsgIds);

    let setOfMsgIds = [...new Set(arrayOfMsgIds)];

    arrayOfMsgIds = [...setOfMsgIds];

    //console.log("Array of order ids", arrayOfMsgIds);

    const getDocuments = async () => {
      //console.log("Called Get ByYou Threads");

      return client.platform.documents.get("DGMContract.dgmthr", {
        where: [["msgId", "in", arrayOfMsgIds]], // check msgId ->
        orderBy: [["msgId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];
        //THERE ISN'T NECESSARY MESSAGE TO GRAB SO COULD BE ZERO SO STILL NEED TO END LOADING ->

        for (const n of d) {
          let returnedDoc = n.toJSON();
          //console.log("Thr:\n", returnedDoc);
          returnedDoc.msgId = Identifier.from(
            returnedDoc.msgId,
            "base64"
          ).toJSON();
          //console.log("newThr:\n", returnedDoc);
          docArray = [...docArray, returnedDoc];
        }

        if (docArray.length === 0) {
          this.setState(
            {
              WALLET_Login4: true,
            },
            () => this.checkLoginRace_WALLET()
          );
        } else {
          this.setState(
            {
              WALLET_ToYouThreads: docArray,
              WALLET_Login4: true,
            },
            () => this.checkLoginRace_WALLET()
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong ToYouThreads_WALLET:\n", e);
      })
      .finally(() => client.disconnect());
  };

  //CREATING DOCUMENTS AND MAKING PAYMENTS

  RegisterDGMAddress_WALLET = () => {
    console.log("Called Register DGM Address");
    this.setState({
      isLoadingButtons_WALLET: true,
      isLoadingRefresh_WALLET: true,
    });
    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DGMContract: {
          contractId: this.state.DataContractDGM,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const submitNoteDocument = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      const docProperties = {
        address: this.state.accountAddress,
      };

      // Create the note document
      const dgmDocument = await platform.documents.create(
        "DGMContract.dgmaddress",
        identity,
        docProperties
      );

      const documentBatch = {
        create: [dgmDocument], // Document(s) to create
        replace: [], // Document(s) to update
        delete: [], // Document(s) to delete
      };
      // Sign and submit the document(s)
      await platform.documents.broadcast(documentBatch, identity);
      return dgmDocument;
    };

    submitNoteDocument()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Document:\n", returnedDoc);

        this.setState({
          dgmDocuments: [returnedDoc],
          DGMAddress: [returnedDoc],
          isLoadingButtons_WALLET: false,
          isLoadingRefresh_WALLET: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingButtons_WALLET: false,
          isLoadingRefresh_WALLET: false,
        });
      })
      .finally(() => client.disconnect());
  };
  //FROM: https://dashpay.github.io/platform/Wallet-library/account/createTransaction/

  sendDashtoAddress_WALLET = () => {
    this.setState({
      isLoadingRefresh_WALLET: true,
      isLoadingButtons_WALLET: true,
      isLoadingWallet: true,
      isLoadingForm_WALLET: true,
    });

    const client = new Dash.Client({
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
    });

    const payToRecipient = async () => {
      const account = await client.getWalletAccount();

      let dashAmt = this.state.WALLET_amountToSend;
      console.log("sats sent in TX:", dashAmt);
      console.log(typeof dashAmt);

      // let amt = dashAmt.toFixed(0).toString();
      // console.log(amt);
      // console.log(typeof amt);

      const transaction = account.createTransaction({
        recipient: this.state.WALLET_sendToAddress,
        satoshis: dashAmt, //Must be a string!!
      });
      //return transaction;//Use to disable TX
      return account.broadcastTransaction(transaction);
    };

    payToRecipient()
      .then((d) => {
        console.log("Payment TX:\n", d);

        this.setState(
          {
            isLoadingRefresh_WALLET: false,
            isLoadingWallet: false,
            isLoadingButtons_WALLET: false,
            isLoadingForm_WALLET: false,
            WALLET_sendSuccess: true,
          },
          () => this.handleLoginforPostPaymentWallet_WALLET()
        );
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingRefresh_WALLET: false,
          isLoadingWallet: false,
          isLoadingButtons_WALLET: false,
          isLoadingForm_WALLET: false,
          WALLET_sendFailure: true,
        });
      });
    //.finally(() => client.disconnect()); // <- Caused Error -> YES error dont use
  };

  sendDashtoName_WALLET = () => {
    this.setState({
      isLoadingRefresh_WALLET: true,
      isLoadingButtons_WALLET: true,
      isLoadingWallet: true,
      isLoadingForm_WALLET: true,
    });

    const client = new Dash.Client({
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
    });

    const payToRecipient = async () => {
      const account = await client.getWalletAccount();

      let dashAmt = this.state.WALLET_amountToSend;
      console.log("sats sent in TX:", dashAmt);
      console.log(typeof dashAmt);

      // let amt = dashAmt.toFixed(0).toString();
      // console.log(amt);
      // console.log(typeof amt);

      const transaction = account.createTransaction({
        recipient: this.state.WALLET_sendToAddress,
        satoshis: dashAmt, //Must be a string!!
      });
      //return transaction;//Use to disable TX
      return account.broadcastTransaction(transaction);
    };

    payToRecipient()
      .then((d) => {
        console.log("Payment TX:\n", d);

        this.setState(
          {
            // isLoadingWallet: false,
            // isLoadingButtons: false,
            // isLoadingForm: false,
            WALLET_sendSuccess: true,
          },
          () => this.handlePostPayment_WALLET(d)
        );
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingRefresh_WALLET: false,
          isLoadingWallet: false,
          isLoadingButtons_WALLET: false,
          isLoadingForm_WALLET: false,
          WALLET_sendFailure: true,
        });
      });
    //.finally(() => client.disconnect()); // <- Caused Error in the past, added back seems to fix more recent payment error. -> YES error dont use
  };

  handlePostPayment_WALLET = (txId) => {
    if (this.state.WALLET_messageToSend === "") {
      this.setState(
        {
          isLoadingForm_WALLET: false,
        },
        () => this.handleLoginforPostPaymentWallet_WALLET()
      );
    } else {
      this.submitDGMMessage_WALLET(txId);
    }
  };
  //BELOW  handle the msg fail to send in the below function and change the wording/create an new alert that handles. <= do it =>
  submitDGMMessage_WALLET = (theTXId) => {
    console.log("Called Submit DGM MSG Doc");

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DGMContract: {
          contractId: this.state.DataContractDGM,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let docProperties = {};

    const submitDocument = async () => {
      const { platform } = client;
      // const identity = await platform.identities.get(this.state.identity); // Your identity ID

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      docProperties = {
        msg: this.state.WALLET_messageToSend,
        toId: this.state.WALLET_sendToDGMAddressDoc.$ownerId,
        txId: theTXId,
      };

      //console.log(docProperties);

      // Create the note document
      const dgmDocument = await platform.documents.create(
        "DGMContract.dgmmsg",
        identity,
        docProperties
      );

      console.log(dgmDocument.toJSON());

      //############################################################
      //This below disconnects the document sending..***

      // return dgmDocument;

      //This is to disconnect the Document Creation***

      //############################################################

      const documentBatch = {
        create: [dgmDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return dgmDocument;
    };

    submitDocument()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Msg Document:\n", returnedDoc);

        let newMsg;

        // required:['toId','txId',"$createdAt", "$updatedAt"],

        newMsg = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,
          toId: this.state.WALLET_sendToDGMAddressDoc.$ownerId,
          txId: theTXId,
          msg: this.state.WALLET_messageToSend,
          $createdAt: returnedDoc.$createdAt,
        };

        this.setState(
          {
            WALLET_ByYouMsgs: [newMsg, ...this.state.WALLET_ByYouMsgs],
            isLoadingForm_WALLET: false,
            WALLET_sendMsgSuccess: true,
          },
          () => this.handleLoginforPostPaymentWallet_WALLET()
        );
      })
      .catch((e) => {
        this.setState(
          {
            isLoadingForm_WALLET: false,
            WALLET_sendMsgFailure: true,
          },
          () => this.handleLoginforPostPaymentWallet_WALLET()
        );

        console.error("Something went wrong creating new msg:\n", e);
      })
      .finally(() => client.disconnect());

    //THIS BELOW IS THE NAME DOC ADD, SO PROCESSES DURING DOC SUBMISSION ***

    //NOT ME BUT WHO I AM SENDING TO!! <- Fixed!

    let nameDoc = {
      $ownerId: this.state.WALLET_sendToDGMAddressDoc.$ownerId,
      label: this.state.WALLET_sendToName,
    };

    this.setState({
      WALLET_ByYouNames: [nameDoc, ...this.state.WALLET_ByYouNames],
    });
    //END OF NAME DOC ADD***
  };

  submitDGMThread_WALLET = (addedMessage) => {
    this.setState({
      isLoadingRefresh_WALLET: true,
      isLoadingWallet: true,
      isLoadingButtons_WALLET: true,
      isLoadingForm_WALLET: true,
    });

    //console.log(addedMessage);
    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DGMContract: {
          contractId: this.state.DataContractDGM, // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let docProperties = {};

    const submitDocuments = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      docProperties = {
        msg: addedMessage,
        msgId: this.state.WALLET_ThreadMessageId,
      };

      // Create the note document
      const dgmDocument = await platform.documents.create(
        "DGMContract.dgmthr",
        identity,
        docProperties
      );

      //console.log(dsoDocument.toJSON());

      //############################################################
      //This below disconnects the document sending..***

      // return dgmDocument;

      //This is to disconnect the Document Creation***

      //############################################################

      const documentBatch = {
        create: [dgmDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return dgmDocument;
    };

    submitDocuments()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Thread Documents:\n", returnedDoc);

        let newThread;

        // required: [' 'msg','msgId', "$createdAt", "$updatedAt"],

        newThread = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,
          msgId: this.state.WALLET_ThreadMessageId,
          msg: addedMessage,
          $createdAt: returnedDoc.$createdAt,
        };

        this.setState({
          WALLET_ByYouThreads: [newThread, ...this.state.WALLET_ByYouThreads],

          isLoadingRefresh_WALLET: false,
          isLoadingWallet: false,
          isLoadingButtons_WALLET: false,
          isLoadingForm_WALLET: false,
        });
      })
      .catch((e) => {
        this.setState({
          isLoadingRefresh_WALLET: false,
          isLoadingWallet: false,
          isLoadingButtons_WALLET: false,
          isLoadingForm_WALLET: false,
        });

        console.error("Something went wrong creating new thread:\n", e);
      })
      .finally(() => client.disconnect());
  };

  /*
   *WALLET FUNCTIONS^^^^
   *                            ##       ###    ###
   *                             ###    ####   ##
   *                              ###  ## ## ###
   *                               ## ##  ####
   *                                ###   ###
   *
   *   ###       ###
   *    ###     ###
   *      #######
   *        ###
   *        ###
   *        ###
   */
  //YOUR STORE FUNCTIONS

  pullInitialTriggerYOURSTORE = () => {
    if (this.state.InitialPullYOURSTORE) {
      this.getMerchantDocs();
      this.setState({
        InitialPullYOURSTORE: false,
      });
    } else {
      //Pull just orders only or set up an auto pull..
    }

    //i dont really need an auto pull for shouts -> that stuff is generic but I could use an auto pull for your orders if you have a store..<-
    //getMerchantOrders -> move the state set in to the name function like all the other ones. ->
  };

  handleTabYOURSTORE = (eventKey) => {
    if (eventKey === "Your Store")
      this.setState({
        whichTabYOURSTORE: "Your Store",
      });
    else {
      this.setState({
        whichTabYOURSTORE: "Orders",
      });
    }
  };

  handleSelectedItem = (index) => {
    this.setState(
      {
        selectedItem: this.state.DGPItems[index],
        selectedItemIndex: index,
      },
      () => this.showModal("EditItemModal")
    );
  };

  handleMerchantOrderMsgModalShow = (theOrderId, ownerName) => {
    //probably set state and show modal
    this.setState(
      {
        messageOrderId: theOrderId,
        messageStoreOwnerName: ownerName,
      },
      () => this.showModal("MerchantOrderMsgModal")
    );
  };

  handleMerchantOrderMsgSubmit = (orderMsgComment) => {
    //Submit doc and add to state
    console.log("Called Buyer Order Message: ", orderMsgComment);

    this.setState({
      isLoadingOrdersYOURSTORE: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DGPContract: {
          contractId: this.state.DataContractDGP,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const submitMsgDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const msgProperties = {
        msg: orderMsgComment,
        orderId: this.state.messageOrderId,
      };

      // Create the note document
      const dgpDocument = await platform.documents.create(
        "DGPContract.dgpmsg",
        identity,
        msgProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      //return dgpDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [dgpDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return dgpDocument;
    };

    submitMsgDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Buyer Order Message:\n", returnedDoc);

        let orderMsg = {
          $ownerId: this.state.identity,
          $id: returnedDoc.$id,

          msg: orderMsgComment,
          orderId: this.state.messageOrderId,
        };

        this.setState({
          DGPOrdersMsgs: [orderMsg, ...this.state.DGPOrdersMsgs],
          isLoadingOrdersYOURSTORE: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong with Buyer Order Message:\n", e);
        this.setState({
          ordersMessageError: true, //I should like make that a thing ->
          isLoadingOrdersYOURSTORE: false,
        });
      })
      .finally(() => client.disconnect());
  };

  //PULL THESE ON INITIAL LOAD AND HANDLE IT ALL HERE..
  // Assume Identity is passed down through props. <- OLD DGP
  getMerchantDocs = () => {
    this.getDGPStoreMerchant(); //Store -> call getDGMAddress because if I have a store then I dont need the Address but I guess its nice to check
    //And If I don't have a store then i need to check that there is a DGMAddress so I can create it if I need to.

    this.getDGPItemsMerchant(); //Will have to have store but if I have a store it speeds up the getting the items..

    this.getMerchantOrders();
    this.getDGMAddress();
  };

  checkDGPStoreRace = () => {
    if (this.state.store1 && this.state.store2) {
      this.setState({
        isLoadingStoreYOURSTORE: false,
        // isLoadingOrdersYOURSTORE: false, //<= DO NOT SET HERE, HAS OWN RACE.
      });
    }
  };

  getDGPStoreMerchant = () => {
    //WHat if I just put all the clients in one and pass the client to the function??? ->

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGPContract: {
          contractId: this.state.DataContractDGP,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      console.log("Called Get DGP Store");

      return client.platform.documents.get("DGPContract.dgpstore", {
        where: [["$ownerId", "==", this.state.identity]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        if (d.length === 0) {
          //console.log("No Store");

          this.setState(
            {
              DGPStore: "No Store",
              store1: true,
            },
            () => this.checkDGPStoreRace()
          );
        } else {
          for (const n of d) {
            // console.log("Store:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }

          this.setState(
            {
              DGPStore: docArray,
              store1: true,
            },
            () => this.checkDGPStoreRace()
          );
        } //Ends the else
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          DGPStore: "Store Document Error",
          storeError: true,
          isLoadingStoreYOURSTORE: false,
          isLoadingOrdersYOURSTORE: false,
        });
      })
      .finally(() => client.disconnect()); //Should I remove this??
  };

  //Must COMBINE THIS ONE WITH THE WALLET -> AND i CAN KEEP THE OTHER 'NO ADDRESS WILL NOT BE AN ISSUE -> BUT IT WILL BE A LITTLE CLUNKY ->
  getDGMAddress = () => {
    //Needs adjustments for DGP from DGM ->
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGMContract: {
          contractId: this.state.DataContractDGM,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      console.log("Called Query DGM Documents.");

      return client.platform.documents.get("DGMContract.dgmaddress", {
        where: [["$ownerId", "==", this.state.identity]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        if (d.length === 0) {
          this.setState(
            {
              DGMAddress: "No Address",
              store2: true,
            },
            () => this.checkDGPStoreRace()
          );
        } else {
          for (const n of d) {
            // console.log("DGM Address:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }

          this.setState(
            {
              DGMAddress: docArray,
              store2: true,
            },
            () => this.checkDGPStoreRace()
          );
        } //Ends the else
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          //DGMAddress: "Document Error",
          storeError: true,
          isLoadingStoreYOURSTORE: false,
        });
      })
      .finally(() => client.disconnect());
  };

  getDGPItemsMerchant = () => {
    if (!this.state.isLoadingItemsYOURSTORE) {
      this.setState({
        isLoadingItemsYOURSTORE: true,
      });
    }

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGPContract: {
          contractId: this.state.DataContractDGP,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      console.log("Called Get DGP Items");

      return client.platform.documents.get("DGPContract.dgpitem", {
        where: [["$ownerId", "==", this.state.identity]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];
        //What if there are zero? -> handled where?
        // if zero then I need to call get dgmaddress and continue the loading

        // if (d.length === 0) {
        //   this.setState(
        //     {
        //       DGPItems: "No Items",
        //       isLoadingItemsYOURSTORE: false,
        //     }
        //   );
        // } else {
        for (const n of d) {
          //console.log("Items:\n", n.toJSON());
          docArray = [...docArray, n.toJSON()];
        }
        this.setState(
          {
            DGPItems: docArray,
            isLoadingItemsYOURSTORE: false,
          },
          () => this.sortDGPItemsMerchant()
        );
        // } //Ends the else
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          DGPItems: "Items Document Error",
          itemError: true,
          isLoadingItemsYOURSTORE: false,
        });
      })
      .finally(() => client.disconnect()); //Should I remove this??
  };

  sortDGPItemsMerchant = () => {
    //This needs to handle the what
    // I think I decided that if you change the price it just becomes unverified// so this needs to handle if the DGP item UPDATEDAT is earlieer then when the order was passed then it will not be verified.
  };

  //THIS NEEDS WALLET SO DELAYED AND ALSO PART OF INTERVAL UPDATE..
  // So need wallet to verify but can get orders and names and items because i need all that to compare to the wallet TXs
  getMerchantOrders = () => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGPContract: {
          contractId: this.state.DataContractDGP,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      console.log("Called Get DGP Merchant Orders");

      /**
       *  //This is MERCHANT QUERY
          name: 'toIdandcreatedAt',
          properties: [{ toId: 'asc' }, {$createdAt: 'asc' }],
          unique: false,
        }
       */

      return client.platform.documents.get("DGPContract.dgporder", {
        where: [["toId", "==", this.state.identity]],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];
        //What if there are zero? -> handled where?
        // if zero then I need to call get dgmaddress and continue the loading
        if (d.length === 0) {
          this.setState({
            DGPOrders: "No Orders",
            isLoadingOrdersYOURSTORE: false,
          });
        } else {
          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Msg:\n", returnedDoc);
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();
            returnedDoc.cart = JSON.parse(returnedDoc.cart);
            //console.log("newMsg:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }

          this.setState(
            {
              DGPOrders: docArray,
            },
            () => this.helperForMerchantOrders(docArray)
          );
        } //Ends the else
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          DGPOrders: "Order Document Error",
          ordersError: true,
          isLoadingOrdersYOURSTORE: false,
        });
      })
      .finally(() => client.disconnect());
  };

  helperForMerchantOrders = (theDocArray) => {
    this.getNamesForMerchantOrders(theDocArray);
    this.getMsgsMerchantOrders(theDocArray);
  };

  //###  ####  #####  ####  ###  ##
  checkOrdersRace = () => {
    if (this.state.order1 && this.state.order2) {
      this.setState({
        isLoadingOrdersYOURSTORE: false,
      });
    }
  };

  getNamesForMerchantOrders = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DataContractDPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    // arrayOfOwnerIds = arrayOfOwnerIds.map((item) => //Old way
    //   Buffer.from(Identifier.from(item))
    // );

    //  console.log("Called Get Names for DGP Orders");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DataContractDPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES?
        if (d.length === 0) {
          console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //  console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            DGPOrdersNames: nameDocArray,
            order1: true,
          },
          () => this.checkOrdersRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  getMsgsMerchantOrders = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGPContract: {
          contractId: this.state.DataContractDGP,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    // This Below is to get unique set of order doc ids
    let arrayOfOrderIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of order ids", arrayOfOrderIds);

    let setOfOrderIds = [...new Set(arrayOfOrderIds)];

    arrayOfOrderIds = [...setOfOrderIds];

    // arrayOfOrderIds = arrayOfOrderIds.map((item) =>
    //   Identifier.from(item)
    // );

    //console.log("Array of order ids", arrayOfOrderIds);

    const getDocuments = async () => {
      console.log("Called Get Merchant Orders Msgs");

      return client.platform.documents.get("DGPContract.dgpmsg", {
        where: [["orderId", "in", arrayOfOrderIds]],
        orderBy: [["orderId", "asc"]], //IDK why it works with this and not $createdAt -> unless I added the $createdAt after the registering -> hmmmm -> idk it doesn't matter at least for awhile ->
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        if (d.length === 0) {
          //console.log('No Messages for orders');
          this.setState(
            {
              order2: true,
            },
            () => this.checkOrdersRace()
          );
        } else {
          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Msg:\n", returnedDoc);
            returnedDoc.orderId = Identifier.from(
              returnedDoc.orderId,
              "base64"
            ).toJSON();
            //console.log("newMsg:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }

          this.setState(
            {
              DGPOrdersMsgs: docArray,
              order2: true,
            },
            () => this.checkOrdersRace()
          );
        } //This closes the if statement
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          ordersMessagesError: true, //ADD to state ->
          isLoadingOrdersYOURSTORE: false,
        });
      })
      .finally(() => client.disconnect());
  };

  //DOCUMENT CREATION BELOW ********************************************

  createDGPStore = (storeObject) => {
    console.log("Called Create DGP Store");

    this.setState({
      isLoadingOrdersYOURSTORE: true,
      isLoadingStoreYOURSTORE: true,
      isLoadingButtons_WALLET: true, //ADDED TO ENSURE DONT CALL TWICE
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DGMContract: {
          contractId: this.state.DataContractDGM,
        },
        DGPContract: {
          contractId: this.state.DataContractDGP,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    //let docsToCreate = []; // MOVE OUT SO CAN USE IN RETURN LOGIC

    let DGPStoreDoc = [];

    let DGMAddrDoc = [];

    const submitStoreDocs = async () => {
      const { platform } = client;
      // const identity = await platform.identities.get(this.state.identity); // Your identity ID

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      const storeDocProperties = {
        description: storeObject.description,
        public: storeObject.public,
        open: storeObject.open,

        //NEW PROPERTIES - STILL NEED TO BE IMPLEMENTED
        payLater: false,
        acceptCredits: false,
        acceptDash: true,
      };

      const dgpDocument = await platform.documents.create(
        "DGPContract.dgpstore",
        identity,
        storeDocProperties
      );

      DGPStoreDoc.push(dgpDocument);

      if (this.state.DGMAddress === "No Address") {
        const docProperties = {
          address: this.state.accountAddress,
        };
        // Create the address document
        const dgmDocument = await platform.documents.create(
          "DGMContract.dgmaddress",
          identity,
          docProperties
        );

        DGMAddrDoc.push(dgmDocument);
      }

      //############################################################
      //This below disconnects the document sending..***

      // return docsToCreate;

      //This is to disconnect the Document Creation***
      //############################################################

      //CAN I SUBMIT DOCS TO 2 DIFFERENT DATA CONTRACTS? -> TEST ->
      let addrBatch;

      const storeBatch = {
        create: DGPStoreDoc, // Document(s) to create
      };

      if (DGMAddrDoc.length !== 0) {
        addrBatch = {
          create: DGMAddrDoc, // Document(s) to create
        };
      }

      await platform.documents.broadcast(storeBatch, identity);

      if (DGMAddrDoc.length !== 0) {
        await platform.documents.broadcast(addrBatch, identity);
      }

      if (DGMAddrDoc.length !== 0) {
        return [...DGPStoreDoc, ...DGMAddrDoc];
      } else {
        return [DGPStoreDoc];
      }
    };

    submitStoreDocs()
      .then((d) => {
        //handle if nothing returned?? ->
        //INTERESTING -> IF ONLY ONE ITEM THEN IT DOESN'T RETURN AN ARRAY!! -> NO IT IS NEVER ANY ARRAY -> THE DOCUMENT SIMPLY HAS TRANSITIONS AND THAT THIS THE ARRAY!!!!! <-

        // let returnedDoc = d.toJSON();
        // console.log("Store Documents JSON:\n", returnedDoc);

        let docArray = [];
        for (const n of d) {
          console.log("Submitted Doc:\n", n.toJSON());
          docArray = [...docArray, n.toJSON()];
        }

        let store;
        let address;

        //Single Document will be the Store
        if (docArray.length === 1) {
          store = {
            $ownerId: docArray[0].$ownerId,
            $id: docArray[0].$id,
            description: storeObject.description,
            public: storeObject.public,
            open: storeObject.open,
          };

          this.setState({
            DGPStore: [store],
            isLoadingOrdersYOURSTORE: false,
            isLoadingStoreYOURSTORE: false,
            isLoadingButtons_WALLET: false, //ADDED TO ENSURE DONT CALL TWICE
          });
        } else {
          //Have to handle that may come back in any order.
          //Still may do some assuming

          store = {
            $ownerId: docArray[0].$ownerId,
            $id: docArray[0].$id,
            description: storeObject.description,
            public: storeObject.public,
            open: storeObject.open,
          };

          address = {
            $ownerId: docArray[1].$ownerId,
            $id: docArray[1].$id,
            address: this.state.accountAddress,
          };

          //   if(returnedDoc.transitions[1].$type === 'dgmaddress'){
          //     address ={
          //      $ownerId: returnedDoc.ownerId,
          //      $id: returnedDoc.transitions[1].$id,
          //      address: this.state.accountAddress,
          //    }
          //  } else {
          //    store = {
          //      $ownerId: returnedDoc.ownerId,
          //      $id: returnedDoc.transitions[1].$id,
          //      description: storeObject.description,
          //      public: storeObject.public,
          //      open: storeObject.open,
          //    }
          //  }

          this.setState({
            DGMAddress: [address],
            dgmDocuments: [address],
            DGPStore: [store],
            isLoadingOrdersYOURSTORE: false,
            isLoadingStoreYOURSTORE: false,
            isLoadingButtons_WALLET: false, //ADDED TO ENSURE DONT CALL TWICE
          });
        }
      })
      .catch((e) => {
        console.error("Something went wrong during store creation:\n", e);
        this.setState({
          storeError: true,
          isLoadingOrdersYOURSTORE: false,
          isLoadingStoreYOURSTORE: false,
          isLoadingButtons_WALLET: false, //ADDED TO ENSURE DONT CALL TWICE
        });
      })
      .finally(() => client.disconnect());
  };

  //******************************************************* */

  editDGPStore = (storeObject) => {
    //For open/close and change description
    console.log("Called Edit DGP Store");

    this.setState({
      isLoadingStoreYOURSTORE: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DGPContract: {
          contractId: this.state.DataContractDGP,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const editStoreDocs = async () => {
      const { platform } = client;
      // const identity = await platform.identities.get(this.state.identity); // Your identity ID

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      /************************************** */
      //LEFTOVER FROM ORIGINAL CREATED IMPLEMENTATION
      // const storeDocProperties = {
      //   description: storeObject.description,
      //   open: storeObject.open,
      // };

      // const dgpDocument = await platform.documents.create(
      //   "DGPContract.dgpstore",
      //   identity,
      //   storeDocProperties
      // );
      //************************************************** */

      //https://dashplatform.readme.io/docs/tutorial-update-documents

      //Retrieve the existing document

      const [document] = await client.platform.documents.get(
        "DGPContract.dgpstore",
        { where: [["$id", "==", this.state.DGPStore[0].$id]] }
      );

      // Update document
      if (this.state.DGPStore[0].description !== storeObject.description) {
        document.set("description", storeObject.description);
      }

      if (this.state.DGPStore[0].public !== storeObject.public) {
        document.set("public", storeObject.public);
      }
      //CAN I ONLY UPDATE ONE DOCUMENT AT A TIME??

      if (this.state.DGPStore[0].open !== storeObject.open) {
        document.set("open", storeObject.open);
      }

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document sending..***

      //return dgpDocument;

      //This is to disconnect the Document Creation***
      //############################################################
    };

    editStoreDocs()
      .then((d) => {
        //I don't think I want the returned doc. bc they are the real doc and I will just post the supplied docs above. <- DONE  -> TEST ->
        let returnedDoc = d.toJSON();
        console.log("Store Documents:\n", d.toJSON());

        //NEED TO MAKE CUSTOM DOCS LIKE INSTEAD OF JUST PLUGGING IN THE RETURNED DOC BECAUSE THE RETURNED DOC IS A DOC WITH TRANSITIONS -> AWESOME LOOK ABOVE I JUST NEED TO GET THE $ID CORRECT BECAUSE THE EDIT PULLS THE ACTUAL DOC AND JUST NEED TO BE ABLE TO GET IT!! ->

        let store = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,
          description: storeObject.description,
          public: storeObject.public,
          open: storeObject.open,
        };

        this.setState({
          DGPStore: [store],
          isLoadingStoreYOURSTORE: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong during store edit:\n", e);
        this.setState({
          storeError: true,
          isLoadingStoreYOURSTORE: false,
        });
      })
      .finally(() => client.disconnect());
  };

  RegisterDGMAddress = () => {
    //IS THIS DOING ANYTHING? -> REMOVE-> ? ->
    //This by itself just in case I need to fix it...
    console.log("Called Register DGM Address");
    this.setState({
      isLoadingConfirmation: true,
      isLoadingButtons: true,
      isLoadingButtons_WALLET: true, //ADDED TO ENSURE DONT CALL TWICE
    });
    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DGMContract: {
          contractId: this.state.DataContractDGM,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const submitNoteDocument = async () => {
      const { platform } = client;
      const identity = await platform.identities.get(this.state.identity); // Your identity ID

      const docProperties = {
        address: this.state.accountAddress,
      };

      // Create the note document
      const dgmDocument = await platform.documents.create(
        "DGMContract.dgmaddress", /// I changed .note TO .dgmaddress***
        identity,
        docProperties
      );

      const documentBatch = {
        create: [dgmDocument], // Document(s) to create
        replace: [], // Document(s) to update
        delete: [], // Document(s) to delete
      };
      // Sign and submit the document(s)
      return platform.documents.broadcast(documentBatch, identity);
    };

    submitNoteDocument()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Document:\n", returnedDoc);

        this.setState({
          dgmDocuments: [returnedDoc],
          isLoadingConfirmation: false,
          isLoadingButtons: false,
          isLoadingButtons_WALLET: false, //ADDED TO ENSURE DONT CALL TWICE
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          dgmDocuments: "Document Error",
          isLoadingConfirmation: false,
          isLoadingButtons: false,
          isLoadingButtons_WALLET: false, //ADDED TO ENSURE DONT CALL TWICE
        });
      })
      .finally(() => client.disconnect());
  };

  createDGPItem = (itemObject) => {
    console.log("Called Create DGP Item");

    this.setState({
      isLoadingItemsYOURSTORE: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DGPContract: {
          contractId: this.state.DataContractDGP,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    //Do the docs creations below. mimic dso msg and tags

    const submitItemDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const itemProperties = {
        name: itemObject.name,
        price: itemObject.price,
        description: itemObject.description,
        category: itemObject.category,
        avail: itemObject.avail,
      };
      //console.log('Item to Create: ', itemProperties);

      // Create the note document
      const dgpDocument = await platform.documents.create(
        "DGPContract.dgpitem",
        identity,
        itemProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      // return dgpDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [dgpDocument], // Document(s) to create
      };

      //console.log(documentBatch);

      await platform.documents.broadcast(documentBatch, identity);
      return dgpDocument;
    };

    submitItemDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Document:\n", returnedDoc);

        let item = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,
          name: itemObject.name,
          price: itemObject.price,
          category: itemObject.category,
          description: itemObject.description,
          avail: itemObject.avail,
        };

        this.setState({
          DGPItems: [item, ...this.state.DGPItems],
          isLoadingItemsYOURSTORE: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong with Item creation:\n", e);
        this.setState({
          itemError: true,
          isLoadingItemsYOURSTORE: false,
        });
      })
      .finally(() => client.disconnect());
  };

  editDGPItem = (itemObject) => {
    console.log("Called Edit DGP Item");

    this.setState({
      isLoadingItemsYOURSTORE: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DGPContract: {
          contractId: this.state.DataContractDGP,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    //Do the docs creations below. mimic dso msg and tags

    const submitItemDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      // const itemProps = {
      //     name: itemObject.name,
      //     price:   itemObject.price,
      //     description: itemObject.description,
      //     avail: itemObject.avail
      // };
      // console.log('Item to Edit: ', itemProps);

      const [document] = await client.platform.documents.get(
        "DGPContract.dgpitem",
        {
          where: [
            [
              "$id",
              "==",
              this.state.DGPItems[this.state.selectedItemIndex].$id,
            ],
          ],
        }
      );

      if (
        this.state.DGPItems[this.state.selectedItemIndex].name !==
        itemObject.name
      ) {
        document.set("name", itemObject.name);
      }

      if (
        this.state.DGPItems[this.state.selectedItemIndex].category !==
        itemObject.category
      ) {
        document.set("category", itemObject.category);
      }

      if (
        this.state.DGPItems[this.state.selectedItemIndex].price !==
        itemObject.price
      ) {
        document.set("price", itemObject.price);
      }

      if (
        this.state.DGPItems[this.state.selectedItemIndex].description !==
        itemObject.description
      ) {
        document.set("description", itemObject.description);
      }

      if (
        this.state.DGPItems[this.state.selectedItemIndex].avail !==
        itemObject.avail
      ) {
        document.set("avail", itemObject.avail);
      }

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    submitItemDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Edited Item Doc:\n", returnedDoc);

        //I don't think I want the returned doc. bc they are the real doc and I will just post the supplied docs above. -> TEST

        let item = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,
          $createdAt: returnedDoc.$createdAt,

          name: itemObject.name,
          price: itemObject.price,
          category: itemObject.category,
          description: itemObject.description,
          avail: itemObject.avail,
        };

        let editedItems = this.state.DGPItems; //[itemObject];

        editedItems.splice(this.state.selectedItemIndex, 1, item);

        this.setState(
          {
            DGPItems: editedItems,
            isLoadingItemsYOURSTORE: false,
          },
          () => console.log(this.state.DGPItems)
        );
      })
      .catch((e) => {
        console.error("Something went wrong with Item creation:\n", e);
        this.setState({
          itemError: true,
          isLoadingItemsYOURSTORE: false,
        });
      })
      .finally(() => client.disconnect());
  };

  //##################

  checkForNewOrders = () => {
    if (
      this.state.DGPStore !== "No Store" &&
      !this.state.isLoadingWallet &&
      !this.state.isLoadingOrdersYOURSTORE
    ) {
      const clientOpts = {
        network: this.state.whichNetwork,
        apps: {
          DGPContract: {
            contractId: this.state.DataContractDGP,
          },
        },
      };
      const client = new Dash.Client(clientOpts);

      const getDocuments = async () => {
        console.log("Called Check For New Orders");

        return client.platform.documents.get("DGPContract.dgporder", {
          where: [["toId", "==", this.state.identity]],
          orderBy: [["$createdAt", "desc"]],
        });
      };

      getDocuments()
        .then((d) => {
          let docArray = [];

          for (const n of d) {
            // console.log("New Orders:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }

          if (this.state.DGPOrders === "No Orders") {
            if (docArray.length !== 0) {
              this.setState({
                newOrders: docArray,
                newOrderAvail: true,
              });
            }
          } else if (docArray.length !== this.state.DGPOrders.length) {
            this.setState({
              newOrders: docArray,
              newOrderAvail: true,
            });
          }
        })
        .catch((e) => {
          console.error("Something went wrong:\n", e);
          this.setState({
            newOrdersError: true, // ADD to State and handle
          });
        })
        .finally(() => client.disconnect());
    } //closes opening if statement
  };

  handleLoadNewOrder = () => {
    this.setState(
      {
        DGPOrders: this.state.newOrders,
        newOrderAvail: false,
        isLoadingOrdersYOURSTORE: true,
        order1: false,
        order2: false,
      },
      () => this.helperForMerchantOrders(this.state.newOrders)
    );

    this.getWalletForNewOrder();
  };

  //ADDED BELOW FOR THE FUNC ABOVE ^^
  getWalletForNewOrder = () => {
    //For Merchant to Load New Orders. But also Buyer for wallet reload after purchase

    this.setState({
      isLoadingWallet: true,
    });

    const client = new Dash.Client({
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
    });

    const retrieveIdentityIds = async () => {
      const account = await client.getWalletAccount();

      this.setState({
        accountBalance: account.getTotalBalance(),
        accountHistory: account.getTransactionHistory(),
      });

      return true;
    };

    retrieveIdentityIds()
      .then((d) => {
        console.log("Wallet Reloaded:\n", d);
        this.setState({
          isLoadingWallet: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong reloading Wallet:\n", e);
        this.setState({
          isLoadingWallet: false,
          walletReloadError: true, //Add this to state and handle ->
        });
      })
      .finally(() => client.disconnect());
  };

  /*
   *YOUR STORE FUNCTIONS^^^^
   *                              ###       ###
   *                               ###     ###
   *                                 #######
   *                                   ###
   *                                   ###
   *                                   ###
   *
   *           ###   ###
   *          ####   ##
   *         ## ## ###
   *        ##  ####
   *      ###   ###
   */
  //NEAR BY FUNCTIONS

  handleNearbyTab = (eventKey) => {
    if (eventKey === "Search")
      this.setState({
        whichNearbyTab: "Search",
      });
    else {
      this.setState({
        whichNearbyTab: "Your Posts",
      });
    }
  };

  pullInitialTriggerNEARBY = () => {
    this.getYourPosts(this.state.identity);
    this.getDGTInvitesForEvents(); //Use InitialPullNearBy As control
    this.setState({
      InitialPullNearBy: false,
    });
  };

  pullOnPageLoadTriggerNEARBY = () => {
    if (this.state.OnPageLoadNEARBY) {
      this.getInitialPosts();
      this.setState({
        OnPageLoadNEARBY: false,
      });
    }
  };

  // FORM FUNCTIONS
  triggerCountryButton = () => {
    this.setState({
      whichCountryRegion: "Country",
    });
  };

  triggerRegionButton = () => {
    this.setState({
      whichCountryRegion: "Region",
    });
  };

  handleNearbyOnChangeValidation = (event) => {
    this.setState({
      nameAvail: false,
      identityIdReceipient: "", //Test if this clears the error msg after failed send ->
      dgmDocumentsForReceipient: [],
      isError: false,
    });

    if (event.target.id === "formCityName") {
      this.cityNameValidate(event.target.value);
    }

    if (event.target.id === "formCountryRegionName") {
      this.countryRegionNameValidate(event.target.value);
    }
  };

  cityNameValidate = (cityName) => {
    let regex = /^.{0,32}$/;
    let valid = regex.test(cityName);

    if (valid) {
      this.setState({
        cityInput: cityName,
        tooLongCityNameError: false,
        validCity: true,
      });
    } else {
      if (cityName.length > 32) {
        this.setState({
          cityInput: cityName,
          tooLongCityNameError: true,
          validCity: false,
        });
      } else {
        this.setState({
          cityInput: cityName,
          validCity: false,
        });
      }
    }
  };

  countryRegionNameValidate = (countryRegionName) => {
    let regex = /^.{0,32}$/;
    let valid = regex.test(countryRegionName);

    if (valid) {
      this.setState({
        countryRegionInput: countryRegionName,
        tooLongCountryRegionNameError: false,
        validCountryRegion: true,
      });
    } else {
      if (countryRegionName.length > 32) {
        this.setState({
          countryRegionInput: countryRegionName,
          tooLongCountryRegionNameError: true,
          validCountryRegion: false,
        });
      } else {
        this.setState({
          countryRegionInput: countryRegionName,
          validCountryRegion: false,
        });
      }
    }
  };

  // ^^^^ FORM FUNCTIONS

  // 5 BUTTONS below form
  handleSelectedCategoryButton = (clickedButton) => {
    //What are the clickedButton input? -> "lookrent" 'offbiz' 'offevents' offother lookother -> DONE
    //

    this.setState(
      {
        selectedCategoryButton: clickedButton,
      },
      () => this.checkIfPulledAlready()
    );
  };

  // ^^^^ 5 BUTTONS below form

  handleYourPost = (index) => {
    this.setState(
      {
        selectedYourPost: this.state.yourPostsToDisplay[index],
        //I also need the name <- NOT FOR MY POSTS
        selectedYourPostIndex: index, //<- Need this for the editingfunction!!
      },
      () => this.showModal("EditPostModal")
    );
  };

  handleYourEvent = (index) => {
    this.setState(
      {
        selectedYourPost: this.state.yourPostsToDisplay[index],
        //I also need the name <- NOT FOR MY POSTS
        selectedYourPostIndex: index, //<- Need this for the editingfunction!!
      },
      () => this.showModal("EditEventModal")
    );
  };

  handleSearchedPost = (post, nameDoc) => {
    this.setState(
      {
        selectedSearchedPost: post,
        selectedSearchedPostNameDoc: nameDoc,
      },
      () => this.showModal("PostModal")
    );
  };

  handleSearchedEvent = (event, nameDoc) => {
    this.setState(
      {
        selectedSearchedPost: event,
        selectedSearchedPostNameDoc: nameDoc,
      },
      () => this.showModal("EventModal")
    );
  };

  getYourPosts = (theIdentity) => {
    //console.log("Calling getYourPosts");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DMIOContract: {
          contractId: this.state.DataContractDMIO,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      return client.platform.documents.get("DMIOContract.dmiopost", {
        where: [
          ["$ownerId", "==", theIdentity], // offrent, offbiz, offother, lookrent, lookother
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("There are no Your Posts");

          this.setState({
            isLoadingYourPosts: false,
          });
        } else {
          let docArray = [];
          //console.log("GettingYour Posts");
          for (const n of d) {
            console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }

          this.setState({
            yourPostsToDisplay: docArray,
            isLoadingYourPosts: false,
          });
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getInitialPosts = () => {
    this.getInitialOffBiz();
  };

  getInitialOffBiz = () => {
    //console.log("Calling getInitialOffBiz");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DMIOContract: {
          contractId: this.state.DataContractDMIO,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      return client.platform.documents.get("DMIOContract.dmiopost", {
        where: [
          ["category", "==", "offbiz"], // offrent, offbiz, offother, lookrent, lookother
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no OffBiz Posts");

          this.setState({
            isLoadingNearbyInitial: false,
            OffBizPulled: true,
          });
        } else {
          let docArray = [];
          //console.log("Getting ForyouByyouMsgs");
          for (const n of d) {
            //console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
          this.getInitialOffBizNames(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getInitialOffBizNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState({
          OffBizPosts: docArray,
          OffBizNames: nameDocArray,
          isLoadingNearbyInitial: false,
          OffBizPulled: true,
        });
      })
      .catch((e) => {
        console.error(
          "Something went wrong getting Initial OffBiz Names:\n",
          e
        );
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  // BELOW IF FOR WHEN HIT "SUBMIT" <=
  //
  submittedStateAndCategoryTHENConstruct = () => {
    //THIS IS CALLED DIRECTLY FROM LOCATION FORM AND USES THE STATE FROM ONCHANGE. SO THIS MAKES MY CONVERSION A BIT MORE TRICKY
    //I JUST NEED TO ADD SOME STATE THAT SAVES THE ONCHANGE UPON SUBMISSION AND RESETS THE PULLED STATES..

    this.setState(
      {
        citySubmitted: this.state.cityInput,
        countryRegionSubmitted: this.state.countryRegionInput,
        whichSubmitted: this.state.whichCountryRegion,
        //Submitted ^^^
        OffBizPulled: false,
        OffEventsPulled: false,
        OffRentPulled: false,
        OffTradePulled: false,
        LookRentPulled: false,
        LookTradePulled: false,
        //Pulled States^^^

        OffRentPosts: [],
        OffRentNames: [],

        OffBizPosts: [],
        OffBizNames: [],

        OffOtherPosts: [],
        OffOtherNames: [],
        //EVENTS
        OffEventsPosts: [],
        OffEventsNames: [],

        LookRentPosts: [],
        LookRentNames: [],

        LookOtherPosts: [],
        LookOtherNames: [],
        //CLEAR ^^^ THE STATES.

        isLoadingNearbySearch: true,
        isLoadingNearbyForm: true,
      },
      () => this.constructQueryThenSearch()
    );
  };
  //BELOW IS FOR WHEN HIT CATEGORY BUTTON =>
  checkIfPulledAlready = () => {
    switch (this.state.selectedCategoryButton) {
      case "offbiz":
        if (!this.state.OffBizPulled) {
          this.constructQueryThenSearch();
        }
        break;
      case "offevents":
        if (!this.state.OffEventsPulled) {
          this.constructQueryThenSearch();
        }
        break;
      case "offrent":
        if (!this.state.OffRentPulled) {
          this.constructQueryThenSearch();
        }
        break;
      case "offother":
        if (!this.state.OffTradePulled) {
          this.constructQueryThenSearch();
        }
        break;
      case "lookrent":
        if (!this.state.LookRentPulled) {
          this.constructQueryThenSearch();
        }
        break;
      case "lookother":
        if (!this.state.LookTradePulled) {
          this.constructQueryThenSearch();
        }
        break;
      default:
        console.log("No case that matches!");
    }
  };

  //This one will be interesting bc I am goin to construct the query and then pass it to each of the functions this will save about 3 or 4 different

  constructQueryThenSearch = () => {
    //IF THE PULLED IS ALREADY DONE DONT PULL AGAIN -> THIS NEED TO CHECK THE PULL STATE BASED ON THE BUTTON
    if (!this.state.isLoadingNearbySearch && !this.state.isLoadingNearbyForm) {
      this.setState({
        isLoadingNearbySearch: true,
        isLoadingNearbyForm: true,
      });
    }
    //So what are the parts and I assume I will pull from state for the parameters
    /* NEED TO DO 5 QUERIES FOR EACH SEARCH (need to normalize/lowercase)
  SO ITS AN OBJECT!!! 
  { 
    where: [
      ['city', '==', ****City***],
      ['country', '==', ****Country***], OR  ['region', '==', ****Region***],
      ['category', '==', 'offrent'],
      ["$createdAt", "<=",  Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
  }*/

    /**
   * //##### LOCATION FORM STATE ######
      whichCountryRegion: "Country",

      cityInput: "",
      validCity: false,
      tooLongCityNameError: false,

      countryRegionInput: "",
      validCountryRegion: false,
      tooLongCountryRegionNameError: false,
      //^^^^^ LOCATION FORM STATE ^^^^^
   */

    //1) CREATE THE where ARRAY ->
    //2) tHEN TACK ON THE CONSTANT STUFF ->
    //3) CUSTOMIZE THE CATEGORY IN EACH FUNCTION ->

    //How to search if all blank-> it is handled automatically ??

    //Do i want to add the category here and then change in each or just add the rest in each?? -> just change in each that is pretty easy. <- how then?
    //I got a way, dont fill in 3rd spot, use find with length === 2 and then push the specific query!! <- I like it => done

    let whereArray = [];

    if (this.state.citySubmitted !== "") {
      whereArray.push([
        "city",
        "==",
        this.state.citySubmitted.toLocaleLowerCase(),
      ]); //push adds to end!
    }

    if (this.state.countryRegionSubmitted !== "") {
      if (this.state.whichSubmitted === "Country") {
        whereArray.push([
          "country",
          "==",
          this.state.countryRegionSubmitted.toLocaleLowerCase(),
        ]);
      }
      if (this.state.whichSubmitted === "Region") {
        whereArray.push([
          "region",
          "==",
          this.state.countryRegionSubmitted.toLocaleLowerCase(),
        ]);
      }
    }

    let categoryIndex = whereArray.length;

    whereArray.push(["category", "=="]);

    whereArray.push(["$createdAt", "<=", Date.now()]);

    let queryObject = {
      where: whereArray,
      orderBy: [["$createdAt", "desc"]],
    };

    // console.log(queryObject);

    switch (this.state.selectedCategoryButton) {
      case "offbiz":
        this.getOffBiz(queryObject, categoryIndex);
        break;
      case "offevents":
        this.getOffEvents(queryObject, categoryIndex);
        break;
      case "offrent":
        this.getOffRent(queryObject, categoryIndex);
        break;
      case "offother":
        this.getOffOther(queryObject, categoryIndex);
        break;
      case "lookrent":
        this.getLookRent(queryObject, categoryIndex);
        break;
      case "lookother":
        this.getLookOther(queryObject, categoryIndex);
        break;
      default:
        console.log("No case that matches!");
    }

    // this.getOffRent(queryObject, categoryIndex);
    // this.getOffBiz(queryObject, categoryIndex);
    // this.getOffOther(queryObject, categoryIndex);
    // this.getOffEvents(queryObject, categoryIndex);
    // this.getLookRent(queryObject, categoryIndex);
    // this.getLookOther(queryObject, categoryIndex);
  };

  getOffRent = (queryObj, cateIndex) => {
    let queryOffRent = JSON.parse(JSON.stringify(queryObj));

    queryOffRent.where[cateIndex].push("offrent");

    //This passed in parameter won't affect the other functions right?? => NO shallow and needs deep object copying..... => DONE

    //console.log("Calling getOffRent");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DMIOContract: {
          contractId: this.state.DataContractDMIO,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      return client.platform.documents.get(
        "DMIOContract.dmiopost",
        queryOffRent
      );
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no getOffRent Posts");

          this.setState({
            OffRentPosts: [],
            OffRentPulled: true,
            isLoadingNearbySearch: false,
            isLoadingNearbyForm: false,
          });
        } else {
          let docArray = [];
          //console.log("Getting getOffRent Posts");
          for (const n of d) {
            //console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
          this.getOffRentNames(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getOffRentNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState({
          OffRentNames: nameDocArray,
          OffRentPosts: docArray,
          OffRentPulled: true,
          isLoadingNearbySearch: false,
          isLoadingNearbyForm: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong getting OffRent Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  getOffBiz = (queryObj, cateIndex) => {
    //console.log("Calling getOffBiz");
    let queryOffBiz = JSON.parse(JSON.stringify(queryObj));
    queryOffBiz.where[cateIndex].push("offbiz");

    console.log(queryObj);

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DMIOContract: {
          contractId: this.state.DataContractDMIO,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      return client.platform.documents.get(
        "DMIOContract.dmiopost",
        queryOffBiz
        // {
        //   where: [
        //     ["category", "==", "offbiz"], // offrent, offbiz, offother, lookrent, lookother
        //     ["$createdAt", "<=", Date.now()],
        //   ],
        //   orderBy: [["$createdAt", "desc"]],
        // }
      );
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no getOffBiz");

          this.setState({
            OffBizPosts: [],
            OffBizPulled: true,
            isLoadingNearbySearch: false,
            isLoadingNearbyForm: false,
          });
        } else {
          let docArray = [];
          //console.log("Getting getOffBiz");
          for (const n of d) {
            //console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
          this.getOffBizNames(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getOffBizNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Calling getOffBizNames");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState({
          OffBizNames: nameDocArray,
          OffBizPosts: docArray,
          OffBizPulled: true,
          isLoadingNearbySearch: false,
          isLoadingNearbyForm: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong getting OffBiz Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  getOffOther = (queryObj, cateIndex) => {
    //console.log("Calling getOffOther");
    let queryOffOther = JSON.parse(JSON.stringify(queryObj));

    queryOffOther.where[cateIndex].push("offother");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DMIOContract: {
          contractId: this.state.DataContractDMIO,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      return client.platform.documents.get(
        "DMIOContract.dmiopost",
        queryOffOther
      );
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no OffOther");

          this.setState({
            OffTradePulled: true,
            OffOtherPosts: [],
            isLoadingNearbySearch: false,
            isLoadingNearbyForm: false,
          });
        } else {
          let docArray = [];
          //console.log("Getting OffOther");
          for (const n of d) {
            //console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
          this.getOffOtherNames(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong getOffOther:\n", e))
      .finally(() => client.disconnect());
  };

  getOffOtherNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Calling getNamesOffOthers");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState({
          OffOtherNames: nameDocArray,
          OffOtherPosts: docArray,
          OffTradePulled: true,
          isLoadingNearbySearch: false,
          isLoadingNearbyForm: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong getting OffOther Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  getOffEvents = (queryObj, cateIndex) => {
    //console.log("Calling getOffEvents");
    let queryOffEvents = JSON.parse(JSON.stringify(queryObj));

    queryOffEvents.where[cateIndex].push("events");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DMIOContract: {
          contractId: this.state.DataContractDMIO,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      return client.platform.documents.get(
        "DMIOContract.dmiopost",
        queryOffEvents
      );
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no OffEvents");

          this.setState({
            OffEventsPulled: true,
            OffEventsPosts: [],
            isLoadingNearbySearch: false,
            isLoadingNearbyForm: false,
          });
        } else {
          let docArray = [];
          //console.log("Getting OffEvents");
          for (const n of d) {
            console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
          this.getOffEventsNames(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong getOffEvents:\n", e))
      .finally(() => client.disconnect());
  };

  getOffEventsNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Calling getNamesOffEvents");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState({
          OffEventsNames: nameDocArray,
          OffEventsPosts: docArray, //<- RECONNECT  //[],
          OffEventsPulled: true,
          isLoadingNearbySearch: false,
          isLoadingNearbyForm: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong getting OffOther Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  getLookRent = (queryObj, cateIndex) => {
    //console.log("Calling getLookRent");
    let queryLookRent = JSON.parse(JSON.stringify(queryObj));

    queryLookRent.where[cateIndex].push("lookrent");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DMIOContract: {
          contractId: this.state.DataContractDMIO,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      return client.platform.documents.get(
        "DMIOContract.dmiopost",
        queryLookRent
      );
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no LookRent Posts");

          this.setState({
            LookRentPulled: true,
            LookRentPosts: [],
            isLoadingNearbySearch: false,
            isLoadingNearbyForm: false,
          });
        } else {
          let docArray = [];
          //console.log("Getting LookRent Posts");
          for (const n of d) {
            //console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
          this.getLookRentNames(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getLookRentNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Calling LookRentNames");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState({
          LookRentNames: nameDocArray,
          LookRentPosts: docArray,
          LookRentPulled: true,
          isLoadingNearbySearch: false,
          isLoadingNearbyForm: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong getting LookRent Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  getLookOther = (queryObj, cateIndex) => {
    //console.log("Calling getLookOther");

    let queryLookOther = JSON.parse(JSON.stringify(queryObj));

    queryLookOther.where[cateIndex].push("lookother");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DMIOContract: {
          contractId: this.state.DataContractDMIO,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      return client.platform.documents.get(
        "DMIOContract.dmiopost",
        queryLookOther
      );
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no LookOther Posts");

          this.setState({
            LookTradePulled: true,
            LookOtherPosts: [],
            isLoadingNearbySearch: false,
            isLoadingNearbyForm: false,
          });
        } else {
          let docArray = [];
          //console.log("Getting LookOther Posts");
          for (const n of d) {
            //console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
          this.getLookOtherNames(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getLookOtherNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState({
          LookOtherNames: nameDocArray,
          LookOtherPosts: docArray,
          LookTradePulled: true,
          isLoadingNearbySearch: false,
          isLoadingNearbyForm: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong getting LookOther Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  //$$  $$   $$$  $$  $  $$  $$$  $$$  $$  $$

  createYourPost = (postObject) => {
    console.log("Called Create Post");

    this.setState({
      isLoadingYourPosts: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DMIOContract: {
          contractId: this.state.DataContractDMIO,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const submitPostDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }
      let postProperties;
      if (postObject.category !== "events") {
        postProperties = {
          city: postObject.city, //.toLocaleLowerCase() <- done in modal
          region: postObject.region,
          country: postObject.country,

          description: postObject.description,
          category: postObject.category,

          link: postObject.link,
          address: postObject.address,

          active: postObject.active,
          dgp: postObject.dgp,
        };
      } else {
        postProperties = {
          city: postObject.city, //.toLocaleLowerCase() <- done in modal
          region: postObject.region,
          country: postObject.country,

          description: postObject.description,
          category: postObject.category,
          link: postObject.link,

          active: postObject.active,
          dgp: false, // postObject.dgp,
          //EVENTS
          group: postObject.group,
          address: postObject.address,
          date: postObject.date,
          time: postObject.time,
        };
      }
      console.log("Post to Create: ", postProperties);

      // Create the note document
      const dmioDocument = await platform.documents.create(
        "DMIOContract.dmiopost",
        identity,
        postProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      //return dmioDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [dmioDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return dmioDocument;
    };

    submitPostDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Document:\n", returnedDoc);

        let post;
        if (postObject.category !== "events") {
          post = {
            $ownerId: returnedDoc.$ownerId,
            $id: returnedDoc.$id,
            $createdAt: returnedDoc.$createdAt,

            city: postObject.city,
            region: postObject.region,
            country: postObject.country,

            description: postObject.description,
            category: postObject.category,
            link: postObject.link,
            address: postObject.addressInput,

            active: postObject.active,
            dgp: postObject.dgp,
          };
        } else {
          post = {
            $ownerId: returnedDoc.$ownerId,
            $id: returnedDoc.$id,
            $createdAt: returnedDoc.$createdAt,

            city: postObject.city, //.toLocaleLowerCase() <- done in modal
            region: postObject.region,
            country: postObject.country,

            description: postObject.description,
            category: postObject.category,
            link: postObject.link,

            active: postObject.active,
            dgp: false, // postObject.dgp,
            //EVENTS
            group: postObject.group,
            address: postObject.address,
            date: postObject.date,
            time: postObject.time,
          };
        }

        this.setState({
          yourPostsToDisplay: [post, ...this.state.yourPostsToDisplay],
          isLoadingYourPosts: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong with post creation:\n", e);
        this.setState({
          yourPostError: true,
          isLoadingYourPosts: false,
        });
      })
      .finally(() => client.disconnect());
  };

  editYourPost = (postObject) => {
    console.log("Called Edit Post");

    this.setState({
      isLoadingYourPosts: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DMIOContract: {
          contractId: this.state.DataContractDMIO,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const submitPostDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const [document] = await client.platform.documents.get(
        "DMIOContract.dmiopost",
        {
          where: [
            [
              "$id",
              "==",
              this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
                .$id,
            ],
          ],
        }
      );
      /**
 * city: postObject.city, 
      region: postObject.region,
      country: postObject.country,

      description: postObject.description,
      category: postObject.category,

      link: postObject.link,
      address:postObject.address,
      
      active: postObject.active,
      dgp: postObject.dgp,
 */

      if (
        this.state.yourPostsToDisplay[this.state.selectedYourPostIndex].city !==
        postObject.city
      ) {
        document.set("city", postObject.city);
      }

      if (
        this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
          .region !== postObject.region
      ) {
        document.set("region", postObject.region);
      }

      if (
        this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
          .country !== postObject.country
      ) {
        document.set("country", postObject.country);
      }

      if (
        this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
          .category !== postObject.category
      ) {
        document.set("category", postObject.category);
      }

      if (
        this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
          .description !== postObject.description
      ) {
        document.set("description", postObject.description);
      }

      if (
        this.state.yourPostsToDisplay[this.state.selectedYourPostIndex].link !==
        postObject.link
      ) {
        document.set("link", postObject.link);
      }

      if (
        this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
          .address !== postObject.address
      ) {
        document.set("address", postObject.address);
      }

      // if ( //THIS FAILS -> I DON'T THINK YOU CAN ADD .. <=
      //   this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
      //     .address === undefined
      // ) {
      //   document.set("address", postObject.address);
      // }

      if (
        this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
          .active !== postObject.active
      ) {
        document.set("active", postObject.active);
      }

      if (
        this.state.yourPostsToDisplay[this.state.selectedYourPostIndex].dgp !==
        postObject.dgp
      ) {
        document.set("dgp", postObject.dgp);
      }

      //TEST ->
      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    submitPostDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Edited Post Doc:\n", returnedDoc);

        let post = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,
          $createdAt: returnedDoc.$createdAt,

          city: postObject.city,
          region: postObject.region,
          country: postObject.country,

          description: postObject.description,
          category: postObject.category,

          link: postObject.link,
          address: postObject.address,

          active: postObject.active,
          dgp: postObject.dgp,
        };

        let editedPosts = this.state.yourPostsToDisplay;

        editedPosts.splice(this.state.selectedYourPostIndex, 1, post);

        this.setState(
          {
            yourPostsToDisplay: editedPosts,
            isLoadingYourPosts: false,
          }
          //,() => console.log(this.state.yourPostsToDisplay)
        );
      })
      .catch((e) => {
        console.error("Something went wrong with Post creation:\n", e);
        this.setState({
          postError: true,
          isLoadingYourPosts: false,
        });
      })
      .finally(() => client.disconnect());
  };

  editYourEvent = (postObject) => {
    console.log("Called Edit Event");

    this.setState({
      isLoadingYourPosts: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DMIOContract: {
          contractId: this.state.DataContractDMIO,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const submitPostDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const [document] = await client.platform.documents.get(
        "DMIOContract.dmiopost",
        {
          where: [
            [
              "$id",
              "==",
              this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
                .$id,
            ],
          ],
        }
      );

      if (
        this.state.yourPostsToDisplay[this.state.selectedYourPostIndex].city !==
        postObject.city
      ) {
        document.set("city", postObject.city);
      }

      if (
        this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
          .region !== postObject.region
      ) {
        document.set("region", postObject.region);
      }

      if (
        this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
          .country !== postObject.country
      ) {
        document.set("country", postObject.country);
      }

      if (
        this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
          .category !== postObject.category
      ) {
        document.set("category", postObject.category);
      }

      if (
        this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
          .description !== postObject.description
      ) {
        document.set("description", postObject.description);
      }
      //Group Date Address Time
      if (
        this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
          .group !== undefined
      ) {
        if (
          this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
            .group !== postObject.group
        ) {
          document.set("group", postObject.group);
        }
      }
      if (
        this.state.yourPostsToDisplay[this.state.selectedYourPostIndex].date !==
        undefined
      ) {
        if (
          this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
            .date !== postObject.date
        ) {
          document.set("date", postObject.date);
        }
      }

      if (
        this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
          .address !== undefined
      ) {
        if (
          this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
            .address !== postObject.address
        ) {
          document.set("address", postObject.address);
        }
      }

      if (
        this.state.yourPostsToDisplay[this.state.selectedYourPostIndex].time !==
        undefined
      ) {
        if (
          this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
            .time !== postObject.time
        ) {
          document.set("time", postObject.time);
        }
      }

      if (
        this.state.yourPostsToDisplay[this.state.selectedYourPostIndex].link !==
        undefined
      ) {
        if (
          this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
            .link !== postObject.link
        ) {
          document.set("link", postObject.link);
        }
      }

      // if (
      //   this.state.yourPostsToDisplay[this.state.selectedYourPostIndex].dgp !==
      //   undefined
      // ) {
      //   if (
      //     this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
      //       .dgp !== postObject.dgp
      //   ) {
      //     document.set("dgp", postObject.dgp);
      //   }
      // }

      if (
        this.state.yourPostsToDisplay[this.state.selectedYourPostIndex]
          .active !== postObject.active
      ) {
        document.set("active", postObject.active);
      }

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    submitPostDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Edited Post Doc:\n", returnedDoc);

        let post = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,
          $createdAt: returnedDoc.$createdAt,

          city: postObject.city,
          region: postObject.region,
          country: postObject.country,

          description: postObject.description,
          category: postObject.category,
          link: postObject.link,

          group: postObject.group,
          date: postObject.date,

          address: postObject.address,
          time: postObject.time,

          active: postObject.active,
          dgp: false,
        };

        let editedPosts = this.state.yourPostsToDisplay;

        editedPosts.splice(this.state.selectedYourPostIndex, 1, post);

        this.setState(
          {
            yourPostsToDisplay: editedPosts,
            isLoadingYourPosts: false,
          }
          //,() => console.log(this.state.yourPostsToDisplay)
        );
      })
      .catch((e) => {
        console.error("Something went wrong with Post creation:\n", e);
        this.setState({
          postError: true,
          isLoadingYourPosts: false,
        });
      })
      .finally(() => client.disconnect());
  };

  /*
   *NEAR BY FUNCTIONS^^^^
   *                                               ###   ###
   *                                              ####   ##
   *                                             ## ## ###
   *                                            ##  ####
   *                                           ###   ###
   *   #############
   *  ###
   *   #############
   *              ###
   *  #############
   *
   */
  //SHOPPING FUNCTIONS

  //FROM DGP -> BUYERPAGES.JS

  pullInitialTriggerSHOPPING = () => {
    if (this.state.InitialPullSHOPPING) {
      this.getRecentOrders(this.state.identity);
      this.getActiveOrders();
      this.setState({
        InitialPullSHOPPING: false,
      });
    } else {
      //Pull just orders only or set up an auto pull..
    }
  };

  handleTabSHOPPING = (eventKey) => {
    if (eventKey === "Your Orders")
      this.setState({
        whichTabSHOPPING: "Your Orders",
      });
    else {
      this.setState({
        whichTabSHOPPING: "Find Merchant",
      });
    }
  };

  handleViewStore = () => {
    this.setState({
      viewStore: true,
    });
  };

  toggleViewStore = () => {
    this.setState({
      viewStore: false,
    });
  };

  handleAddToCartModal = (theItem) => {
    if (theItem.avail) {
      this.setState(
        {
          selectedItemSHOPPING: theItem,
        },
        () => this.showModal("AddItemToCartModal")
      );
    }
  };

  handleEditItemModal = (theIndex) => {
    this.setState(
      {
        selectedCartItemIndex: theIndex,
      },
      () => this.showModal("EditCartItemModal")
    );
  };

  addToCart = (theQuantity) => {
    let cartObjects = this.state.cartItems.map((tuple) => {
      return tuple[0];
    });

    if (cartObjects.includes(this.state.selectedItemSHOPPING)) {
      this.state.cartItems.forEach((tuple, index) => {
        if (tuple[0] === this.state.selectedItemSHOPPING) {
          let newCartItems = this.state.cartItems;

          newCartItems.splice(index, 1, [tuple[0], tuple[1] + theQuantity]);

          this.setState(
            {
              cartItems: newCartItems,
            },
            () => console.log(this.state.cartItems)
          );
        }
      });
    } else {
      this.setState(
        {
          cartItems: [
            [this.state.selectedItemSHOPPING, theQuantity],
            ...this.state.cartItems,
          ],
        },
        () => console.log(this.state.cartItems)
      );
    }
  };

  editCart = (itemChange) => {
    if (itemChange === "remove from cart") {
      let newCartItems = this.state.cartItems;

      newCartItems.splice(this.state.selectedCartItemIndex, 1);

      this.setState({
        cartItems: newCartItems,
      });
    } else {
      let newCartItems = this.state.cartItems;

      newCartItems.splice(this.state.selectedCartItemIndex, 1, itemChange);

      this.setState({
        cartItems: newCartItems,
      });
    }
  };

  //************* FIND MERCHANT HANDLING ************* */

  handleSelectRecentOrActive = (
    storeIdentity,
    storeName,
    theStore,
    theDGMAddress
  ) => {
    if (theStore.open) {
      this.setState(
        {
          identityIdMerchant: storeIdentity,
          merchantName: storeName,
          merchantStoreName: storeName,
          merchantStore: [theStore],
          dgmDocumentForMerchant: [theDGMAddress],
          viewStore: true,
          LoadingItems: true,
          cartItems: [],
        },
        () => this.getDGPItems(storeIdentity)
      );
    }
  };

  searchName = () => {
    const client = new Dash.Client(this.state.whichNetwork);

    let nameToRetrieve = this.state.merchantName;

    console.log(nameToRetrieve);

    const retrieveName = async () => {
      // Retrieve by full name (e.g., myname.dash)

      return client.platform.names.resolve(`${nameToRetrieve}.dash`);
    };

    retrieveName()
      .then((d) => {
        if (d === null) {
          console.log("No DPNS Document for this Name.");
          this.setState({
            identityIdMerchant: "No Name",
            LoadingMerchant: false,
          });
        } else {
          let nameDoc = d.toJSON();
          console.log("NameDoc retrieved:\n", nameDoc);

          this.setState(
            {
              identityIdMerchant: nameDoc.$ownerId,
              merchantStoreName: nameDoc.label,
            },
            () => this.helperMerchantQueries(nameDoc.$ownerId)
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          identityIdMerchant: "Error",
          LoadingMerchant: false,
        });
      })
      .finally(() => client.disconnect());
  };

  helperMerchantQueries = (theIdentity) => {
    this.getDGPStore(theIdentity);
    this.queryDGMDocumentSHOPPING(theIdentity);
    this.getDGPItems(theIdentity);
  };

  getDGPStore = (theIdentity) => {
    //Issue -> there should only be one possible return not a list ->
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGPContract: {
          contractId: this.state.DataContractDGP,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      console.log("Called Get DGP Store");

      return client.platform.documents.get("DGPContract.dgpstore", {
        where: [["$ownerId", "==", theIdentity]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        if (d.length === 0) {
          this.setState({
            merchantStore: "No Store",
          });
        } else {
          for (const n of d) {
            //console.log("Store:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
          this.setState({
            merchantStore: docArray,
            LoadingStore: false,
          });
        } //Ends the else
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          DGPStore: "Store Document Error",
          storeError: true,
          LoadingStore: false,
        });
      })
      .finally(() => client.disconnect());
  };

  queryDGMDocumentSHOPPING = (theIdentity) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGMContract: {
          contractId: this.state.DataContractDGM,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      console.log("Querying Merchant's DGM Documents.");
      //console.log(theIdentity);

      return client.platform.documents.get("DGMContract.dgmaddress", {
        where: [["$ownerId", "==", theIdentity]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];
        for (const n of d) {
          // console.log("DGM Address:\n", n.toJSON());
          docArray = [...docArray, n.toJSON()];
        }

        if (docArray.length === 0) {
          this.setState({
            dgmDocumentForMerchant: "No DGM Doc for Merchant.",
            LoadingMerchant: false,
          });
        } else {
          this.setState({
            dgmDocumentForMerchant: docArray,
            LoadingMerchant: false,
          });
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          dgmDocumentForMerchant: "Document Error", // ADD alert to handle ->
          LoadingMerchant: false,
        });
      })
      .finally(() => client.disconnect());
  };

  getDGPItems = (theIdentity) => {
    if (!this.state.LoadingItems) {
      this.setState({
        LoadingItems: true,
      });
    }

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGPContract: {
          contractId: this.state.DataContractDGP,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      console.log("Called Get DGP Items");

      return client.platform.documents.get("DGPContract.dgpitem", {
        where: [["$ownerId", "==", theIdentity]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        for (const n of d) {
          //console.log("Item:\n", n.toJSON());
          docArray = [...docArray, n.toJSON()];
        }

        if (docArray.length === 0) {
          this.setState({
            LoadingItems: false,
          });
        } else {
          this.setState({
            merchantItems: docArray,
            LoadingItems: false,
          });
        } //Ends the else
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          itemError: true,
          LoadingItems: false,
        });
      })
      .finally(() => client.disconnect());
  };

  //************* PLACE ORDER HANDLING ************* */

  placeOrder = (orderComment) => {
    this.setState({
      LoadingOrder: true,
    });

    const client = new Dash.Client({
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
    });

    let theTotal = 0;
    this.state.cartItems.forEach((tuple) => {
      theTotal += tuple[1] * tuple[0].price;
    });

    const payToRecipient = async () => {
      const account = await client.getWalletAccount();

      console.log("sats sent in TX:", theTotal);

      const transaction = account.createTransaction({
        recipient: this.state.dgmDocumentForMerchant[0].address,
        satoshis: theTotal, //Must be a string!!
      });

      //return transaction;  //Use to disable TX <- !!!

      return account.broadcastTransaction(transaction);
    };

    payToRecipient()
      .then((d) => {
        console.log("Payment TX:\n", d);

        //this.submitDGPOrderDoc(d,orderComment);

        this.setState(
          {
            sendPaymentSuccess: true,
          },
          () => this.submitDGPOrderDoc(d, orderComment)
        );
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          LoadingOrder: false,
          sendFailure: true,
        });
      });
    //.finally(() => client.disconnect()); //TEST -> messed up DGM may be causing problem here as well
  };

  submitDGPOrderDoc = (theTXid, theOrderComment) => {
    console.log("Called Submit DGP Order Doc");

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DGPContract: {
          contractId: this.state.DataContractDGP,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const submitNoteDocument = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      // ### ###  ### ###  ### ###   ###   ####

      // let cartItemsForDocCreation = this.state.cartItems.map((tuple) => {
      //   return [Buffer.from(Identifier.from(tuple[0].$id)), tuple[1]];
      // }); // ^^ OLD WAY

      let cartItemsForDocCreation = this.state.cartItems.map((tuple) => {
        return [tuple[0].$id, tuple[1]];
      });
      //The cart has the itemDoc!!!!! => Fixed it ^^^

      cartItemsForDocCreation = JSON.stringify(cartItemsForDocCreation);

      console.log("cart items for doc creation", cartItemsForDocCreation);

      // ### ###  ### ###  ### ###   ###   ####

      let docProperties;

      if (theOrderComment === "") {
        docProperties = {
          cart: cartItemsForDocCreation,
          toId: this.state.identityIdMerchant,
          txId: theTXid,
        };
      } else {
        docProperties = {
          comment: theOrderComment,
          cart: cartItemsForDocCreation,
          toId: this.state.identityIdMerchant,
          txId: theTXid,
        };
      }
      //console.log("docProperties", docProperties);

      // Create the note document
      const dgpDocument = await platform.documents.create(
        "DGPContract.dgporder",
        identity,
        docProperties
      );

      console.log("dgpDocument JSON", dgpDocument.toJSON());

      //############################################################
      //This below disconnects the document sending..***

      //return dgpDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [dgpDocument], // Document(s) to create
      };

      //console.log(documentBatch);

      await platform.documents.broadcast(documentBatch, identity);
      return dgpDocument;
    };

    submitNoteDocument()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Document:\n", returnedDoc);

        let order = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,

          cart: JSON.parse(returnedDoc.cart),
          //Identifier.from(returnedDoc.cart[0], 'base64').toJSON() //OLD WAY

          comment: returnedDoc.comment,
          toId: this.state.identityIdMerchant, //jUST USE INSTEAD OF RETURN BECAUSE BASE64
          txId: returnedDoc.txId,
        };

        console.log("Order:\n", order);

        let name = {
          $ownerId: this.state.identityIdMerchant,
          label: this.state.merchantStoreName,
        };

        this.handleAddingNewOrder(
          order,
          name,
          this.state.merchantStore[0],
          this.state.merchantItems,
          this.state.dgmDocumentForMerchant[0]
        );

        this.setState({
          viewStore: false,

          sendPaymentSuccess: false,
          sendOrderSuccess: true,

          LoadingOrder: false,

          identityIdMerchant: "",
          merchantStoreName: "staged name",
          merchantStore: [],
          dgmDocumentForMerchant: [],
          merchantItems: [],
          cartItems: [],
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          orderError: "Order Error",
          LoadingOrder: false,
        });
      })
      .finally(() => client.disconnect());

    // Added BELOW to go retrieve the wallet after purchase so the wallet balance will update. Trying to maximize the time for order document creation but also load wallet at the same time. ->
    this.getWalletForNewOrder();
  };

  //************* FORM HANDLING ************* */

  onChangeSHOPPING = (event) => {
    //console.log(event.target.value);

    this.setState({
      LoadingMerchant: false,
    });

    //console.log(`id = ${event.target.id}`);

    if (event.target.id === "validationCustomName") {
      this.nameValidateSHOPPING(event.target.value);
    }
  };

  nameValidateSHOPPING = (nameInput) => {
    let regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$/;
    let valid = regex.test(nameInput);

    if (valid) {
      this.setState({
        merchantName: nameInput,
        merchantNameFormat: true,
      });
    } else {
      this.setState({
        merchantName: nameInput,
        merchantNameFormat: false,
      });
    }
  };

  handleSubmitClickSHOPPING = () => {
    this.setState({
      LoadingMerchant: true,
      viewStore: false,
      //formEventTarget: event.target,

      identityIdMerchant: "",
      merchantStore: [],
      dgmDocumentForMerchant: [],
      merchantItems: [],
      cartItems: [],
    });

    this.searchName();
  };

  //FROM DGP -> APP.JS
  handleOrderMessageModalShow = (theOrderId, ownerName) => {
    this.setState(
      {
        messageOrderIdSHOPPING: theOrderId,
        messageStoreOwnerNameSHOPPING: ownerName,
      },
      () => this.showModal("OrderMessageModal")
    );
  };

  handleOrderMessageSubmit = (orderMsgComment) => {
    console.log("Called Buyer Order Message: ", orderMsgComment);

    this.setState({
      isLoadingRecentOrders: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DGPContract: {
          contractId: this.state.DataContractDGP,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const submitMsgDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const msgProperties = {
        msg: orderMsgComment,
        orderId: this.state.messageOrderIdSHOPPING,
      };

      // Create the note document
      const dgpDocument = await platform.documents.create(
        "DGPContract.dgpmsg",
        identity,
        msgProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      // return dgpDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [dgpDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return dgpDocument;
    };

    submitMsgDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Buyer Order Message:\n", returnedDoc);

        let orderMsg = {
          $ownerId: this.state.identity,
          $id: returnedDoc.$id,
          msg: orderMsgComment,
          orderId: this.state.messageOrderIdSHOPPING,
        };

        this.setState({
          recentOrdersMessages: [orderMsg, ...this.state.recentOrdersMessages],
          isLoadingRecentOrders: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong with Buyer Order Message:\n", e);
        this.setState({
          ordersMessageError: true, //I should like make that a thing ->
          isLoadingRecentOrders: false,
        });
      })
      .finally(() => client.disconnect());
  };

  handleAddingNewOrder = (
    theOrder,
    theName,
    theStore,
    theItems,
    theAddress
  ) => {
    this.setState({
      recentOrders: [theOrder, ...this.state.recentOrders],
      recentOrdersStores: [theStore, ...this.state.recentOrdersStores],
      recentOrdersNames: [theName, ...this.state.recentOrdersNames],
      recentOrdersDGMAddresses: [
        theAddress,
        ...this.state.recentOrdersDGMAddresses,
      ],
      recentOrdersItems: [...theItems, ...this.state.recentOrdersItems],
    });
  };
  /**
   * Already added the BELOW FUNC, above for MY STORE IS USING. SO DELETE ->
   */
  // getWalletForNewOrder = () => {
  //   //For Merchant to Load New Orders. But also Buyer for wallet reload after purchase

  //   this.setState({
  //     isLoadingWallet: true,
  //   });

  //   const client = new Dash.Client({
  //     network: this.state.whichNetwork,
  //     wallet: {
  //       mnemonic: this.state.mnemonic,
  //       adapter: LocalForage.createInstance,
  //       unsafeOptions: {
  //         skipSynchronizationBeforeHeight:
  //           this.state.skipSynchronizationBeforeHeight,
  //       },
  //     },
  //   });

  //   const retrieveIdentityIds = async () => {
  //     const account = await client.getWalletAccount();

  //     this.setState({
  //       accountBalance: account.getTotalBalance(),
  //       accountHistory: account.getTransactionHistory(),
  //     });

  //     return true;
  //   };

  //   retrieveIdentityIds()
  //     .then((d) => {
  //       console.log("Wallet Reloaded:\n", d);
  //       this.setState({
  //         isLoadingWallet: false,
  //       });
  //     })
  //     .catch((e) => {
  //       console.error("Something went wrong reloading Wallet:\n", e);
  //       this.setState({
  //         isLoadingWallet: false,
  //         walletReloadError: true, //Add this to state and handle ->
  //       });
  //     })
  //     .finally(() => client.disconnect());
  // };

  //$$  $$   $$$  $$  $  $$  $$$  $$$  $$  $$
  //

  /*
  * isLoadingRecentOrders: false,
      recentOrders: [],  
      recentOrdersStores: [],
      recentOrdersNames:[], 
      recentOrdersDGMAddresses:[],
  */

  // TRIGGER -> this.getRecentOrders(theIdentity);

  getRecentOrders = (theIdentity) => {
    this.setState({
      isLoadingRecentOrders: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGPContract: {
          contractId: this.state.DataContractDGP,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      console.log("Called Get DGP Recent Orders");

      return client.platform.documents.get("DGPContract.dgporder", {
        where: [["$ownerId", "==", theIdentity]],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        if (d.length === 0) {
          this.setState(
            {
              //recentOrders: "No Orders",
              recentOrders: [],
              isLoadingRecentOrders: false,
            }
            //,() => this.getNamesForDGTOrders()
          );
        } else {
          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Order:\n", returnedDoc);
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();
            //  returnedDoc.cart[0] = Identifier.from(returnedDoc.cart[0], 'base64').toJSON();
            returnedDoc.cart = JSON.parse(returnedDoc.cart);
            //console.log("newOrder:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }

          this.setState(
            {
              recentOrders: docArray,
            },
            () => this.helperRecentOrders(docArray)
          );
        } //Ends the else
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          recentOrdersError: true, //I dont think this is in state ->
          isLoadingRecentOrders: false,
        });
      })
      .finally(() => client.disconnect());
  };

  helperRecentOrders = (theDocArray) => {
    //REFACTOR JUST MOVE THE GETTING THE UNIQUE MERCHANT iDS OUT OF EACH AND JUST SEND AS THE PARAMETER -> getRecentOrdersItems needs the docs to get the cart to get the items -> refactor later ->
    this.getRecentOrdersNames(theDocArray);
    this.getRecentOrdersStores(theDocArray);
    this.getRecentOrdersDGMAddresses(theDocArray);
    this.getRecentOrdersItems(theDocArray);
    this.getRecentOrdersMsgs(theDocArray);
  };

  checkRecentOrdersRace = () => {
    if (
      this.state.recent1 &&
      this.state.recent2 &&
      this.state.recent3 &&
      this.state.recent4 &&
      this.state.recent5
    ) {
      this.setState({
        isLoadingRecentOrders: false,
      });
    }
  };

  getRecentOrdersNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DataContractDPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let arrayOfToIds = docArray.map((doc) => {
      return doc.toId;
    });

    let setOfToIds = [...new Set(arrayOfToIds)];

    arrayOfToIds = [...setOfToIds];

    arrayOfToIds = arrayOfToIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    console.log("Called Get Recent Order Names");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DataContractDPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfToIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        if (d.length === 0) {
          // console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];
        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }

        this.setState(
          {
            recentOrdersNames: nameDocArray,
            recent1: true,
          },
          () => this.checkRecentOrdersRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting recent order names:\n", e);
        this.setState({
          recentOrdersNamesError: true, //<- add to state? ->
          isLoadingRecentOrders: false,
        });
      })
      .finally(() => client.disconnect());
  };

  getRecentOrdersStores = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGPContract: {
          contractId: this.state.DataContractDGP,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    // This Below is to get unique set of merchant ids
    let arrayOfToIds = docArray.map((doc) => {
      return doc.toId;
    });

    let setOfToIds = [...new Set(arrayOfToIds)];

    arrayOfToIds = [...setOfToIds];

    arrayOfToIds = arrayOfToIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    const getDocuments = async () => {
      console.log("Called Get Recent Orders Stores");

      return client.platform.documents.get("DGPContract.dgpstore", {
        where: [["$ownerId", "in", arrayOfToIds]],
        orderBy: [["$ownerId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        for (const n of d) {
          //console.log("Store:\n", n.toJSON());
          docArray = [...docArray, n.toJSON()];
        }

        this.setState(
          {
            recentOrdersStores: docArray,
            recent2: true,
          },
          () => this.checkRecentOrdersRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          recentOrdersStoresError: true,
        });
      })
      .finally(() => client.disconnect());
  };

  getRecentOrdersDGMAddresses = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGMContract: {
          contractId: this.state.DataContractDGM,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    // This Below is to get unique set of merchant ids
    let arrayOfToIds = docArray.map((doc) => {
      return doc.toId;
    });

    let setOfToIds = [...new Set(arrayOfToIds)];

    arrayOfToIds = [...setOfToIds];

    arrayOfToIds = arrayOfToIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    const getDocuments = async () => {
      console.log("Querying Merchant's DGM Documents.");

      return client.platform.documents.get("DGMContract.dgmaddress", {
        where: [["$ownerId", "in", arrayOfToIds]],
        orderBy: [["$ownerId", "asc"]], //CHANGE TO CREATEDAT ->
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];
        for (const n of d) {
          // console.log("DGM Address:\n", n.toJSON());
          docArray = [...docArray, n.toJSON()];
        }

        this.setState(
          {
            recentOrdersDGMAddresses: docArray,
            recent3: true,
          },
          () => this.checkRecentOrdersRace()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong getting Recent Orders Addresses:\n",
          e
        );
        this.setState({
          recentOrdersDGMAddressesError: true, // ADD alert to handle ->
        });
      })
      .finally(() => client.disconnect());
  };

  getRecentOrdersItems = (docArray) => {
    let arrayOfItemIds = [];

    docArray.forEach((doc) => {
      let itemArray = [];

      doc.cart.forEach((cartItem) => {
        itemArray.push(cartItem[0]);
      });

      arrayOfItemIds = [...itemArray, ...arrayOfItemIds];
    });

    // console.log("Array of Order Items", arrayOfItemIds);

    //This makes sure that it is unique.
    let setOfItemIds = [...new Set(arrayOfItemIds)];

    arrayOfItemIds = [...setOfItemIds];

    //   arrayOfItemIds = arrayOfItemIds.map((item) =>{ //UNNECESSARY => REMOVE
    //     return Identifier.from(item, 'base64').toJSON()
    // });
    // console.log("Array of item ids", arrayOfItemIds);

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGPContract: {
          contractId: this.state.DataContractDGP,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      console.log("Called Get DGP Order Items");

      return client.platform.documents.get("DGPContract.dgpitem", {
        where: [["$id", "in", arrayOfItemIds]],
        orderBy: [["$id", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        for (const n of d) {
          //console.log("Items:\n", n.toJSON());
          docArray = [...docArray, n.toJSON()];
        }

        this.setState(
          {
            recentOrdersItems: docArray,
            recent4: true,
          },
          () => this.checkRecentOrdersRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          orderItemsError: true, //PROBABLY NEED TO ADD THIS TO THE STATE -> DO IT ->
          LoadingItems: false,
        });
      })
      .finally(() => client.disconnect());
  };

  getRecentOrdersMsgs = (docArray) => {
    //THERE IS AN ERROR WHERE IF I DONT RETURN ANYTHING IT THROWS AN INVALID QUERY MISSING ORDERBY BUT ITS JUST THAT IT DOESN'T HAVE ANYTHING TO RETURN!! -> REPORT AFTER V0.25 IF STILL THERE -> Well it doesn't like timeStamp -> see below.

    //TEST -> Change to createdAT and see what happens ->

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGPContract: {
          contractId: this.state.DataContractDGP,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    // This Below is to get unique set of order doc ids
    let arrayOfOrderIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of order ids", arrayOfOrderIds);

    let setOfOrderIds = [...new Set(arrayOfOrderIds)];

    arrayOfOrderIds = [...setOfOrderIds];

    //console.log("Array of order ids", arrayOfOrderIds);

    const getDocuments = async () => {
      console.log("Called Get Recent Orders Msgs");

      return client.platform.documents.get("DGPContract.dgpmsg", {
        where: [["orderId", "in", arrayOfOrderIds]],
        orderBy: [["orderId", "asc"]],
        //TEST ^^^ Why is the orderId and not createdAt? Bc its to get msgs not orders oh
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];
        for (const n of d) {
          let returnedDoc = n.toJSON();
          //console.log("Msg:\n", returnedDoc);
          returnedDoc.orderId = Identifier.from(
            returnedDoc.orderId,
            "base64"
          ).toJSON();

          //console.log("newMsg:\n", returnedDoc);
          docArray = [...docArray, returnedDoc];
        }

        this.setState(
          {
            recentOrdersMessages: docArray,
            recent5: true,
          },
          () => this.checkRecentOrdersRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          recentOrdersMessagesError: true,
        });
      })
      .finally(() => client.disconnect());
  };

  //$$  $$   $$$  $$  $  $$  $$$  $$$  $$  $$
  /**
      * isLoadingActive: false,
          activeOrders: [], 
          activeOrdersStores: [],
          activeOrdersNames: [],
          activeOrdersAddresses:[],
      */

  // TRIGGER -> this.getActiveOrders();

  checkActiveOrdersRace = () => {
    if (this.state.active1 && this.state.active2 && this.state.active3) {
      this.setState({
        isLoadingActive: false,
      });
    }
  };

  getActiveOrders = () => {
    /**This is Active QUERY
                    name: 'createdAt',
                    properties: [{$createdAt: 'asc' }],
                    unique: false,
                  }
                 */
    this.setState({
      isLoadingActive: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGPContract: {
          contractId: this.state.DataContractDGP,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      console.log("Called Get Active Orders");

      return client.platform.documents.get("DGPContract.dgporder", {
        where: [["$createdAt", "<=", Date.now()]],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];
        if (d.length === 0) {
          this.setState(
            {
              // activeOrders: "No Orders",
              isLoadingActive: false,
            }
            //,() => this.getNamesForDGTOrders()
          );
        } else {
          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Order:\n", returnedDoc);
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();
            //  returnedDoc.cart[0] = Identifier.from(returnedDoc.cart[0], 'base64').toJSON();
            returnedDoc.cart = JSON.parse(returnedDoc.cart);
            // console.log("newOrder:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }

          this.setState(
            {
              activeOrders: docArray,
            },
            () => this.helperActive(docArray)
          );
        } //Ends the else
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          activeOrdersError: true, //I dont think this is in state ->
          isLoadingActive: false,
        });
      })
      .finally(() => client.disconnect());
  };

  helperActive = (theDocArray) => {
    //REFACTOR JUST MOVE THE GETTING THE UNIQUE MERCHANT iDS OUT OF EACH AND JUST SEND AS THE PARAMETER ->
    this.getActiveNames(theDocArray);
    this.getActiveStores(theDocArray);
    this.getActiveAddresses(theDocArray);
  };

  getActiveNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DataContractDPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let arrayOfToIds = docArray.map((doc) => {
      return doc.toId;
    });

    let setOfToIds = [...new Set(arrayOfToIds)];

    arrayOfToIds = [...setOfToIds];

    arrayOfToIds = arrayOfToIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //  console.log("Called Get Names for DGP Merchants");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DataContractDPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfToIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        if (d.length === 0) {
          // console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];
        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }

        this.setState(
          {
            activeOrdersNames: nameDocArray,
            active1: true,
          },
          () => this.checkActiveOrdersRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting recent order names:\n", e);
        this.setState({
          activeNamesError: true, //<- add to state? ->
          isLoadingActive: false,
        });
      })
      .finally(() => client.disconnect());
  };

  getActiveStores = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGPContract: {
          contractId: this.state.DataContractDGP,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    // This Below is to get unique set of merchant ids
    let arrayOfToIds = docArray.map((doc) => {
      return doc.toId;
    });

    let setOfToIds = [...new Set(arrayOfToIds)];

    arrayOfToIds = [...setOfToIds];

    arrayOfToIds = arrayOfToIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    const getDocuments = async () => {
      console.log("Called Get Active Orders Stores");

      return client.platform.documents.get("DGPContract.dgpstore", {
        where: [["$ownerId", "in", arrayOfToIds]],
        orderBy: [["$ownerId", "asc"]], // DOESN'T MATTER BC IS A GROUP OF THEM. SO IF THEY HAVE MULTIPLE THEN i HAVE AN ISSUE..
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        for (const n of d) {
          //console.log("Store:\n", n.toJSON());
          docArray = [...docArray, n.toJSON()];
        }

        this.setState(
          {
            activeOrdersStores: docArray,
            active2: true,
          },
          () => this.checkActiveOrdersRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          activeStoresError: true,
          isLoadingActive: false,
        });
      })
      .finally(() => client.disconnect());
  };

  getActiveAddresses = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGMContract: {
          contractId: this.state.DataContractDGM,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    // This Below is to get unique set of merchant ids
    let arrayOfToIds = docArray.map((doc) => {
      return doc.toId;
    });

    let setOfToIds = [...new Set(arrayOfToIds)];

    arrayOfToIds = [...setOfToIds];

    arrayOfToIds = arrayOfToIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    const getDocuments = async () => {
      console.log("Querying Active DGM Documents.");

      return client.platform.documents.get("DGMContract.dgmaddress", {
        where: [["$ownerId", "in", arrayOfToIds]],
        orderBy: [["$ownerId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];
        for (const n of d) {
          // console.log("DGM Address:\n", n.toJSON());
          docArray = [...docArray, n.toJSON()];
        }

        this.setState(
          {
            activeOrdersAddresses: docArray,
            active3: true,
          },
          () => this.checkActiveOrdersRace()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong getting Recent Orders DGM Addresses:\n",
          e
        );
        this.setState({
          activeOrdersAddressesError: true, // ADD alert to handle ->
          isLoadingActive: false,
        });
      })
      .finally(() => client.disconnect());
  };

  /*
   *SHOPPING FUNCTIONS^^^^
   *                             #############
   *                            ###
   *                             #############
   *                                        ###
   *                             #############
   *
   *
   *      ################
   *      ###
   *      ################
   *      ###
   *      ################
   */
  //EXCHANGE FUNCTIONS
  handleExchangeTab = (eventKey) => {
    if (eventKey === "Search")
      this.setState({
        whichExchangeTab: "Search",
      });
    else {
      this.setState({
        whichExchangeTab: "Your Offers",
      });
    }
  };

  pullInitialTriggerEXCHANGE = () => {
    this.getYourOffers(this.state.identity);
    this.setState({
      InitialPullExchange: false,
    });
  };

  handleYourOffer = (index) => {
    this.setState(
      {
        selectedYourOffer: this.state.YourOffers[index],
        //I also need the name <- NOT FOR MY POSTS
        selectedYourOfferIndex: index, //<- Need this for the editingfunction!!
      },
      () => this.showModal("EditOfferModal")
    );
  };

  handleDeleteYourOffer = (index) => {
    this.setState(
      {
        selectedYourOffer: this.state.YourOffers[index],
        //I also need the name <- NOT FOR MY POSTS
        selectedYourOfferIndex: index, //<- Need this for the editingfunction!!
      },
      () => this.showModal("DeleteOfferModal")
    );
  };

  handleSearchedOffer = (offer, nameDoc) => {
    this.setState(
      {
        selectedSearchedOffer: offer,
        selectedSearchedOfferNameDoc: nameDoc,
      },
      () => this.showModal("OfferModal")
    );
  };

  triggerOffersButton = () => {
    this.setState({
      whichOffersName: "Offers",
    });
  };

  triggerNameButton = () => {
    this.setState({
      whichOffersName: "Name",
    });
  };

  handleExchangeNameSearchOnChangeValidation = (event) => {
    this.setState({
      isTooLongNameError_EXCHANGE: false,
    });

    if (event.target.id === "validationCustomName") {
      this.nameValidate_EXCHANGE(event.target.value);
    }
  };

  nameValidate_EXCHANGE = (nameInput) => {
    let regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$/;
    let valid = regex.test(nameInput);

    if (valid) {
      this.setState({
        nameToSearch_EXCHANGE: nameInput,
        nameFormat_EXCHANGE: true,
      });
    } else {
      //isTooLongNameError => Add if statement here =>
      this.setState({
        nameToSearch_EXCHANGE: nameInput,
        nameFormat_EXCHANGE: false,
      });
    }
  };

  searchName_EXCHANGE = () => {
    //add spinner start -> connect ->
    // clear previous results ->

    this.setState({
      isLoadingExchangeSearch: true,
      SearchedNameOffers_EXCHANGE: [],
    });

    const client = new Dash.Client(this.state.whichNetwork);

    const retrieveName = async () => {
      // Retrieve by full name (e.g., myname.dash)
      console.log(this.state.nameToSearch_EXCHANGE);
      return client.platform.names.resolve(
        `${this.state.nameToSearch_EXCHANGE}.dash`
      );
    };

    retrieveName()
      .then((d) => {
        if (d === null) {
          console.log("No DPNS Document for this Name.");
          this.setState({
            SearchedNameDoc_EXCHANGE: [],
            isLoadingExchangeSearch: false,
          });
        } else {
          let nameDoc = d.toJSON();
          console.log("Name retrieved:\n", nameDoc);

          this.setState(
            {
              //MOVE THIS TO THE NEXT FUNCTION -> namedoc NOT identityId
              SearchedNameDoc_EXCHANGE: [nameDoc],
            },
            () => this.getOffersFromNameSearch(nameDoc.$ownerId)
          );
        }
      })
      .catch((e) => {
        this.setState({
          SearchedNameDoc_EXCHANGE: [],
          isLoadingExchangeSearch: false,
        });
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  getOffersFromNameSearch = (theIdentity) => {
    //Issue -> there should only be one possible return not a list ->
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        P2PContract: {
          contractId: this.state.DataContractP2P,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      console.log("Called Get P2P offers from NameSearch");

      return client.platform.documents.get("P2PContract.offer", {
        where: [["$ownerId", "==", theIdentity]],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        if (d.length === 0) {
          this.setState({
            SearchedNameOffers_EXCHANGE: [],
            isLoadingExchangeSearch: false,
            isLoadingExchangeForm: false,
          });
        } else {
          for (const n of d) {
            //console.log("Store:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
          this.setState({
            SearchedNameOffers_EXCHANGE: docArray,
            isLoadingExchangeSearch: false,
            isLoadingExchangeForm: false,
          });
        } //Ends the else
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingExchangeSearch: false,
          isLoadingExchangeForm: false,
        });
      })
      .finally(() => client.disconnect());
  };

  clearExchangeOffersForm = () => {
    this.setState({
      toMeInput: "",
      validtoMe: false,
      //tooLongtoMeError: false,

      toMeInputOTHER: "",
      validtoMeOTHER: false,
      tooLongtoMeErrorOTHER: false,

      toMeViaInput: "",
      validtoMeVia: false,
      // tooLongtoMeViaError: false,

      toMeViaInputOTHER: "",
      validtoMeViaOTHER: false,
      tooLongtoMeViaErrorOTHER: false,

      toMeFinal: false,
      toMe4Doc: "",
      toMeVia4Doc: "",
      //toMeHandle4Doc: "",

      toUInput: "",
      validtoU: false,
      //tooLongtoUError: false,

      toUInputOTHER: "",
      validtoUOTHER: false,
      tooLongtoUErrorOTHER: false,

      toUViaInput: "",
      validtoUVia: false,
      //tooLongtoUViaError: false,

      toUViaInputOTHER: "",
      validtoUViaOTHER: false,
      tooLongtoUViaErrorOTHER: false,

      toUFinal: false,
      toU4Doc: "",
      toUVia4Doc: "",
    });
  };

  //Called after state is set.
  verifyOrigi = () => {
    //set false unless hits a success full case
    // this.setState({
    //   toMeFinal: false,
    // },()=>this.verifyOrigi());

    // toMeFinal: false,
    // toMe4Doc: "",
    // toMeVia4Doc: "",
    //
    // 1) Dash <- (PaytoName, Address) THERE IS ONLY DASH
    if (this.state.toMeInput === "Dash") {
      this.setState({
        toMeFinal: true,
        toMe4Doc: "Dash",
        toMeVia4Doc: "Wallet",
      });
    }
    //
    //THIS IS FOR THE USD AND EUR
    if (this.state.toMeInput !== "" && this.state.toMeInput !== "Other") {
      // 2) USD AND EUR(Inside) -> Velle, Venmo, PayPal
      if (
        this.state.toMeViaInput !== "" &&
        this.state.toMeViaInput !== "Other"
      ) {
        this.setState({
          toMeFinal: true,
          toMe4Doc: this.state.toMeInput,
          toMeVia4Doc: this.state.toMeViaInput,
        });
      }
      //
      // 3) USD AND EUR(Inside) -> Other
      if (this.state.toMeViaInput === "Other" && this.state.validtoMeViaOTHER) {
        this.setState({
          toMeFinal: true,
          toMe4Doc: this.state.toMeInput,
          toMeVia4Doc: this.state.toMeViaInputOTHER,
        });
      }
    }
    //
    //THIS IS FOR THE Other ->
    if (this.state.toMeInput === "Other" && this.state.validtoMeOTHER) {
      // 4) Other(Inside) -> Velle, Venmo, PayPal
      if (
        this.state.toMeViaInput !== "" &&
        this.state.toMeViaInput !== "Other"
      ) {
        this.setState({
          toMeFinal: true,
          toMe4Doc: this.state.toMeInputOTHER,
          toMeVia4Doc: this.state.toMeViaInput,
        });
      }
      // 6) Other(Inside) -> Other
      if (this.state.toMeViaInput === "Other" && this.state.validtoMeViaOTHER) {
        this.setState({
          toMeFinal: true,
          toMe4Doc: this.state.toMeInputOTHER,
          toMeVia4Doc: this.state.toMeViaInputOTHER,
        });
      }
    }
  };

  verifyRecip = () => {
    // 1) Dash <- (PaytoName, Address) THERE IS ONLY DASH
    if (this.state.toUInput === "Dash") {
      this.setState({
        toUFinal: true,
        toU4Doc: "Dash",
        toUVia4Doc: "Wallet", //DONT SEARCH WITH , JUST USE TO TRIGGER
      });
    }

    //
    //THIS IS FOR THE USD AND EUR
    if (this.state.toUInput !== "" && this.state.toUInput !== "Other") {
      // 2) USD AND EUR(Inside) -> Velle, Venmo, PayPal
      if (this.state.toUViaInput !== "" && this.state.toUViaInput !== "Other") {
        this.setState({
          toUFinal: true,
          toU4Doc: this.state.toUInput,
          toUVia4Doc: this.state.toUViaInput,
        });
      }
      //
      // 3) USD AND EUR(Inside) -> Other
      if (this.state.toUViaInput === "Other" && this.state.validtoUViaOTHER) {
        this.setState({
          toUFinal: true,
          toU4Doc: this.state.toUInput,
          toUVia4Doc: this.state.toUViaInputOTHER,
        });
      }
    }

    //
    //THIS IS FOR THE Other ->
    if (this.state.toUInput === "Other" && this.state.validtoUOTHER) {
      // 4) Other(Inside) -> Velle, Venmo, PayPal
      if (this.state.toUViaInput !== "" && this.state.toUViaInput !== "Other") {
        this.setState({
          toUFinal: true,
          toU4Doc: this.state.toUInputOTHER,
          toUVia4Doc: this.state.toUViaInput,
        });
      }
      // 5) Other(Inside) -> Other
      if (this.state.toUViaInput === "Other" && this.state.validtoUViaOTHER) {
        this.setState({
          toUFinal: true,
          toU4Doc: this.state.toUInputOTHER,
          toUVia4Doc: this.state.toUViaInputOTHER,
        });
      }
    }
  };

  handleExchangeOffersSearchOnChangeValidation = (event) => {
    // console.log(event.target.value);
    //console.log(`id = ${event.target.id}`);

    if (event.target.id === "formtoMe") {
      event.preventDefault();
      event.stopPropagation();
      //Set invalid to reset the forms below
      this.setState(
        {
          validtoMe: false,
        },
        () => this.toMeValidate(event.target.value)
      );
    }

    if (event.target.id === "formtoMeOTHER") {
      event.preventDefault();
      event.stopPropagation();
      this.toMeValidateOTHER(event.target.value);
    }

    if (event.target.id === "formtoMeVia") {
      event.preventDefault();
      event.stopPropagation();
      this.toMeViaValidate(event.target.value);
    }

    // if (event.target.id === "formtoMeViaDash") {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   this.toMeViaDashValidate(event.target.value);
    // }

    if (event.target.id === "formtoMeViaOTHER") {
      event.preventDefault();
      event.stopPropagation();
      this.toMeViaValidateOTHER(event.target.value);
    }

    if (event.target.id === "formtoU") {
      event.preventDefault();
      event.stopPropagation();
      this.setState(
        {
          validtoU: false,
        },
        () => this.toUValidate(event.target.value)
      );
    }

    if (event.target.id === "formtoUOTHER") {
      event.preventDefault();
      event.stopPropagation();
      this.toUValidateOTHER(event.target.value);
    }

    if (event.target.id === "formtoUVia") {
      event.preventDefault();
      event.stopPropagation();
      this.toUViaValidate(event.target.value);
    }

    // if (event.target.id === "formtoUViaDash") {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   this.toUViaDashValidate(event.target.value);
    // }

    if (event.target.id === "formtoUViaOTHER") {
      event.preventDefault();
      event.stopPropagation();
      this.toUViaValidateOTHER(event.target.value);
    }
  };
  // toMe ***
  toMeValidate = (toMe) => {
    let regex = /^\S.{0,32}\S$/;
    let valid = regex.test(toMe);

    if (valid) {
      this.setState(
        {
          toMeInput: toMe,
          validtoMe: true,
          tooLongtoMeError: false,

          toMeFinal: false,

          //Must reset other inputs if change above one.
          toMeViaInput: "Optional",
          validtoMeVia: false,

          toMeViaInputOTHER: "",
          validtoMeViaOTHER: false,
          //
        },
        () => this.verifyOrigi()
      );
    } else {
      if (toMe.length > 34) {
        this.setState({
          toMeInput: toMe,
          tooLongtoMeError: true,
          validtoMe: false,
          toMeFinal: false,
        });
      } else {
        this.setState({
          toMeInput: toMe,
          validtoMe: false,
          toMeFinal: false,
        });
      }
    }
  };

  toMeValidateOTHER = (toMe) => {
    let regex = /^\S.{0,32}\S$/;
    let valid = regex.test(toMe);

    if (valid) {
      this.setState(
        {
          toMeInputOTHER: toMe,
          tooLongtoMeErrorOTHER: false,
          validtoMeOTHER: true,
          ////set false unless hits a success full case
          toMeFinal: false,
        },
        () => this.verifyOrigi()
      );
    } else {
      if (toMe.length > 34) {
        this.setState({
          toMeInputOTHER: toMe,
          tooLongtoMeErrorOTHER: true,
          validtoMeOTHER: false,
          toMeFinal: false,
        });
      } else {
        this.setState({
          toMeInputOTHER: toMe,
          validtoMeOTHER: false,
          toMeFinal: false,
        });
      }
    }
  };
  //toMeVia ***
  toMeViaValidate = (toMeVia) => {
    let regex = /^\S.{0,32}\S$/;
    let valid = regex.test(toMeVia);

    if (valid) {
      this.setState(
        {
          toMeViaInput: toMeVia,
          tooLongtoMeViaError: false,
          validtoMeVia: true,
          //Must reset other inputs if change above one.
          toMeViaInputOTHER: "",
          tooLongtoMeViaErrorOTHER: false,
          validtoMeViaOTHER: false,
          ////set false unless hits a success full case
          toMeFinal: false,
        },
        () => this.verifyOrigi()
      );
    } else {
      if (toMeVia.length > 34) {
        this.setState({
          toMeViaInput: toMeVia,
          tooLongtoMeViaError: true,
          validtoMeVia: false,
          toMeFinal: false,
        });
      } else {
        this.setState({
          toMeViaInput: toMeVia,
          validtoMeVia: false,
          toMeFinal: false,
        });
      }
    }
  };

  // toMeViaDashValidate = (toMeVia) => {
  //   let regex = /^\S.{1,32}\S$/;
  //   let valid = regex.test(toMeVia);

  //   if (valid) {
  //     this.setState(
  //       {
  //         toMeViaInput: toMeVia,
  //         tooLongtoMeViaError: false,
  //         validtoMeVia: true,
  //         ////set false unless hits a success full case
  //         toMeFinal: false,
  //       },
  //       () => this.verifyOrigi()
  //     );
  //   } else {
  //     if (toMeVia.length > 34) {
  //       this.setState({
  //         toMeViaInput: toMeVia,
  //         tooLongtoMeViaError: true,
  //         validtoMeVia: false,
  //         toMeFinal: false,
  //       });
  //     } else {
  //       this.setState({
  //         toMeViaInput: toMeVia,
  //         validtoMeVia: false,
  //         toMeFinal: false,
  //       });
  //     }
  //   }
  // };

  toMeViaValidateOTHER = (toMeVia) => {
    let regex = /^\S.{1,32}\S$/;
    let valid = regex.test(toMeVia);

    if (valid) {
      this.setState(
        {
          toMeViaInputOTHER: toMeVia,
          tooLongtoMeViaErrorOTHER: false,
          validtoMeViaOTHER: true,
          ////set false unless hits a success full case
          toMeFinal: false,
        },
        () => this.verifyOrigi()
      );
    } else {
      if (toMeVia.length > 34) {
        this.setState({
          toMeViaInputOTHER: toMeVia,
          tooLongtoMeViaErrorOTHER: true,
          validtoMeViaOTHER: false,
          toMeFinal: false,
        });
      } else {
        this.setState({
          toMeViaInputOTHER: toMeVia,
          validtoMeViaOTHER: false,
          toMeFinal: false,
        });
      }
    }
  };
  //
  //
  // toU ***
  toUValidate = (toU) => {
    let regex = /^\S.{0,32}\S$/;
    let valid = regex.test(toU);

    if (valid) {
      this.setState(
        {
          toUInput: toU,
          tooLongtoUError: false,
          validtoU: true,

          toUFinal: false,

          //Must reset other inputs if change above one.
          toUViaInput: "Optional",
          validtoUVia: false,

          toUViaInputOTHER: "",
          validtoUViaOTHER: false,
        },
        () => this.verifyRecip()
      );
    } else {
      if (toU.length > 34) {
        this.setState({
          toUInput: toU,
          tooLongtoUError: true,
          validtoU: false,
          toUFinal: false,
        });
      } else {
        this.setState({
          toUInput: toU,
          validtoU: false,
          toUFinal: false,
        });
      }
    }
  };

  toUValidateOTHER = (toU) => {
    let regex = /^\S.{0,32}\S$/;
    let valid = regex.test(toU);

    if (valid) {
      this.setState(
        {
          toUInputOTHER: toU,
          tooLongtoUErrorOTHER: false,
          validtoUOTHER: true,
          ////set false unless hits a success full case
          toUFinal: false,
        },
        () => this.verifyRecip()
      );
    } else {
      if (toU.length > 34) {
        this.setState({
          toUInputOTHER: toU,
          tooLongtoUErrorOTHER: true,
          validtoUOTHER: false,
          toUFinal: false,
        });
      } else {
        this.setState({
          toUInputOTHER: toU,
          validtoUOTHER: false,
          toUFinal: false,
        });
      }
    }
  };
  //toUVia ***
  toUViaValidate = (toUVia) => {
    let regex = /^\S.{0,32}\S$/;
    let valid = regex.test(toUVia);

    if (valid) {
      this.setState(
        {
          toUViaInput: toUVia,
          tooLongtoUViaError: false,
          validtoUVia: true,

          //Must reset other inputs if change above one.
          toUViaInputOTHER: "",
          tooLongtoUViaErrorOTHER: false,
          validtoUViaOTHER: false,
          ////set false unless hits a success full case
          toUFinal: false,
        },
        () => this.verifyRecip()
      );
    } else {
      if (toUVia.length > 34) {
        this.setState({
          toUViaInput: toUVia,
          tooLongtoUViaError: true,
          validtoUVia: false,
          toUFinal: false,
        });
      } else {
        this.setState({
          toUViaInput: toUVia,
          validtoUVia: false,
          toUFinal: false,
        });
      }
    }
  };

  // toUViaDashValidate = (toUVia) => {
  //   let regex = /^\S.{0,32}\S$/;
  //   let valid = regex.test(toUVia);

  //   if (valid) {
  //     this.setState(
  //       {
  //         toUViaInput: toUVia,
  //         tooLongtoUViaError: false,
  //         validtoUVia: true,
  //         ////set false unless hits a success full case
  //         toUFinal: false,
  //       },
  //       () => this.verifyRecip()
  //     );
  //   } else {
  //     if (toUVia.length > 34) {
  //       this.setState({
  //         toUViaInput: toUVia,
  //         tooLongtoUViaError: true,
  //         validtoUVia: false,
  //         toUFinal: false,
  //       });
  //     } else {
  //       this.setState({
  //         toUViaInput: toUVia,
  //         validtoUVia: false,
  //         toUFinal: false,
  //       });
  //     }
  //   }
  // };

  toUViaValidateOTHER = (toUVia) => {
    let regex = /^\S.{0,32}\S$/;
    let valid = regex.test(toUVia);

    if (valid) {
      this.setState(
        {
          toUViaInputOTHER: toUVia,
          tooLongtoUViaErrorOTHER: false,
          validtoUViaOTHER: true,
          ////set false unless hits a success full case
          toUFinal: false,
        },
        () => this.verifyRecip()
      );
    } else {
      if (toUVia.length > 34) {
        this.setState({
          toUViaInputOTHER: toUVia,
          tooLongtoUViaErrorOTHER: true,
          validtoUViaOTHER: false,
          toUFinal: false,
        });
      } else {
        this.setState({
          toUViaInputOTHER: toUVia,
          validtoUViaOTHER: false,
          toUFinal: false,
        });
      }
    }
  };

  getYourOffers = (theIdentity) => {
    //console.log("Calling getYourOffers");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        P2PContract: {
          contractId: this.state.DataContractP2P,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      return client.platform.documents.get("P2PContract.offer", {
        where: [
          ["$ownerId", "==", theIdentity],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("There are no Your Offers");

          this.setState({
            isLoadingYourOffers: false,
          });
        } else {
          let docArray = [];
          //console.log("GettingYour Offers");
          for (const n of d) {
            console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }

          this.setState({
            YourOffers: docArray,
            isLoadingYourOffers: false,
          });
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };
  //
  //CHANGE BELOW -> CONNECT TO QUERY ->
  //
  constructQueryThenSearch_EXCHANGE = () => {
    //IF THE PULLED IS ALREADY DONE DONT PULL AGAIN -> THIS NEED TO CHECK THE PULL STATE BASED ON THE BUTTON
    if (
      !this.state.isLoadingExchangeSearch &&
      !this.state.isLoadingExchangeForm
    ) {
      this.setState({
        isLoadingExchangeSearch: true,
        isLoadingExchangeForm: true,
      });
    }
    //So what are the parts and I assume I will pull from state for the parameters
    /* NEED TO DO 5 QUERIES FOR EACH SEARCH (need to normalize/lowercase)
  SO ITS AN OBJECT!!! 

    /* { 
    where: [
      ['toMe', '==', ****toMe4Doc***],
      ['toMeVia', '==', ****toMeVia4Doc***], //OPTIONAL
      ['toU', '==', ****toU4Doc***],
      ['toUVia', '==', ****toUVia4Doc***], //OPTIONAL
      ["$updatedAt", "<=",  Date.now()],
        ],
        orderBy: [["$updatedAt", "desc"]],
  }*/

    //1) CREATE THE where ARRAY ->
    //2) tHEN TACK ON THE CONSTANT STUFF ->
    //3) CUSTOMIZE THE CATEGORY IN EACH FUNCTION ->

    //How to search if all blank-> it is handled automatically ??

    //Do i want to add the category here and then change in each or just add the rest in each?? -> just change in each that is pretty easy. <- how then?
    //I got a way, dont fill in 3rd spot, use find with length === 2 and then push the specific query!! <- I like it => done

    let whereArray = [];

    whereArray.push(["toMe", "==", this.state.toMe4Doc.toLocaleUpperCase()]); //push adds to end!

    if (
      this.state.toMe4Doc !== "Dash" &&
      this.state.toMeVia4Doc !== "Optional"
    ) {
      whereArray.push([
        "toMeVia",
        "==",
        this.state.toMeVia4Doc.toLocaleLowerCase(),
      ]); //push adds to end!
    }

    if (this.state.toU4Doc !== "") {
      whereArray.push(["toU", "==", this.state.toU4Doc.toLocaleUpperCase()]); //push adds to end!
    }

    if (this.state.toU4Doc !== "Dash" && this.state.toUVia4Doc !== "Optional") {
      whereArray.push([
        "toUVia",
        "==",
        this.state.toUVia4Doc.toLocaleLowerCase(),
      ]); //push adds to end!
    }

    //let categoryIndex = whereArray.length;

    whereArray.push(["$updatedAt", "<=", Date.now()]);

    let queryObject = {
      where: whereArray,
      orderBy: [["$updatedAt", "desc"]],
    };

    console.log(queryObject);

    this.getOffers(queryObject);

    // this.getOffRent(queryObject, categoryIndex);
  };

  getOffers = (queryObj) => {
    //let queryOffRent = JSON.parse(JSON.stringify(queryObj));

    //queryOffRent.where[cateIndex].push("offrent");

    //This passed in parameter won't affect the other functions right?? => NO shallow and needs deep object copying..... => DONE

    //console.log("Calling getOffers");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        P2PContract: {
          contractId: this.state.DataContractP2P,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      return client.platform.documents.get("P2PContract.offer", queryObj);
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no EXCHANGE POSTS");

          this.setState({
            SearchedOffers: [],
            isLoadingExchangeSearch: false,
            isLoadingExchangeForm: false,
          });
        } else {
          let docArray = [];
          //console.log("Getting getOffRent Posts");
          for (const n of d) {
            //console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
          this.getOffersNames(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getOffersNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState({
          SearchedOffersNames: nameDocArray,
          SearchedOffers: docArray,
          isLoadingExchangeSearch: false,
          isLoadingExchangeForm: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong getting Exchange Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  //
  // CONNECT TO PLATFORM ->
  //
  createYourOffer = (offerObject) => {
    console.log("Called Create Offer");

    this.setState({
      isLoadingYourOffers: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        P2PContract: {
          contractId: this.state.DataContractP2P,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const submitOfferDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }
      let offerProperties;
      //I think like NEARBY, just normalize everything this simplifies the query and make the display of all offers uniform... <= so no normalize nothing is special..
      offerProperties = {
        toMe: offerObject.toMe, //.toLocaleUpperCase() <- done in modal
        toMeVia: offerObject.toMeVia, //.toLocaleLowerCase() <- done in modal
        toMeHandle: offerObject.toMeHandle,
        toU: offerObject.toU, //.toLocaleUpperCase() <- done in modal
        toUVia: offerObject.toUVia, //.toLocaleLowerCase() <- done in modal
        //toUHandle -> Not Data Contract
        exRate: offerObject.exRate,
        instruction: offerObject.instruction,
        minAmt: offerObject.minAmt,
        maxAmt: offerObject.maxAmt,
        active: offerObject.active,
        myStore: false,
      };

      //console.log('Offer to Create: ', offerProperties);

      // Create the note document
      const p2pDocument = await platform.documents.create(
        "P2PContract.offer",
        identity,
        offerProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      //return p2pDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [p2pDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return p2pDocument;
    };

    submitOfferDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Document:\n", returnedDoc);

        let offer = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,
          $createdAt: returnedDoc.$createdAt,
          $updatedAt: returnedDoc.$updatedAt,

          toMe: offerObject.toMe, //.toLocaleLowerCase() <- done in modal
          toMeVia: offerObject.toMeVia, //.toLocaleLowerCase() <- done in modal
          toMeHandle: offerObject.toMeHandle,
          toU: offerObject.toU, //.toLocaleLowerCase() <- done in modal
          toUVia: offerObject.toUVia, //.toLocaleLowerCase() <- done in modal

          //toUHandle -> Not Data Contract
          exRate: offerObject.exRate,
          instruction: offerObject.instruction,
          minAmt: offerObject.minAmt,
          maxAmt: offerObject.maxAmt,
          active: offerObject.active,
          myStore: false,
        };

        this.setState({
          YourOffers: [offer, ...this.state.YourOffers],
          isLoadingYourOffers: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong with offer creation:\n", e);
        this.setState({
          yourOfferError: true,
          isLoadingYourOffers: false,
        });
      })
      .finally(() => client.disconnect());
  };

  editYourOffer = (offerObject) => {
    //  console.log("Called Edit Offer");

    this.setState({
      isLoadingYourOffers: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        P2PContract: {
          contractId: this.state.DataContractP2P,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const submitPostDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const [document] = await client.platform.documents.get(
        "P2PContract.offer",
        {
          where: [
            [
              "$id",
              "==",
              this.state.YourOffers[this.state.selectedYourOfferIndex].$id,
            ],
          ],
        }
      );
      /**
       *  toMe: offerObject.toMe, //.toLocaleUpperCase() <- done in modal
          toMeVia: offerObject.toMeVia, //.toLocaleLowerCase() <- done in modal
          toMeHandle: offerObject.toMeHandle,
          toU: offerObject.toU, //.toLocaleUpperCase() <- done in modal
          toUVia: offerObject.toUVia, //.toLocaleLowerCase() <- done in modal

          //toUHandle -> Not Data Contract
          exRate: offerObject.exRate,
          instruction: offerObject.instruction,
          minAmt: offerObject.minAmt,
          maxAmt: offerObject.maxAmt,
          active: offerObject.active,
       */

      // if (
      //   this.state.YourOffers[this.state.selectedYourOfferIndex].toMe !==
      //   offerObject.toMe
      // ) {
      //   document.set("toMe", offerObject.toMe);
      // }

      // if (
      //   this.state.YourOffers[this.state.selectedYourOfferIndex].toMeVia !==
      //   offerObject.toMeVia
      // ) {
      //   document.set("toMeVia", offerObject.toMeVia);
      // }

      // if (
      //   this.state.YourOffers[this.state.selectedYourOfferIndex].toMeHandle !==
      //   offerObject.toMeHandle
      // ) {
      //   document.set("toMeHandle", offerObject.toMeHandle);
      // }

      // if (
      //   this.state.YourOffers[this.state.selectedYourOfferIndex].toU !==
      //   offerObject.toU
      // ) {
      //   document.set("toU", offerObject.toU);
      // }

      // if (
      //   this.state.YourOffers[this.state.selectedYourOfferIndex].toUVia !==
      //   offerObject.toUVia
      // ) {
      //   document.set("toUVia", offerObject.toUVia);
      // }

      if (
        this.state.YourOffers[this.state.selectedYourOfferIndex].exRate !==
        offerObject.exRate
      ) {
        document.set("exRate", offerObject.exRate);
      }

      if (
        this.state.YourOffers[this.state.selectedYourOfferIndex].instruction !==
        offerObject.instruction
      ) {
        document.set("instruction", offerObject.instruction);
      }

      if (
        this.state.YourOffers[this.state.selectedYourOfferIndex].minAmt !==
        offerObject.minAmt
      ) {
        document.set("minAmt", offerObject.minAmt);
      }

      if (
        this.state.YourOffers[this.state.selectedYourOfferIndex].maxAmt !==
        offerObject.maxAmt
      ) {
        document.set("maxAmt", offerObject.maxAmt);
      }

      if (
        this.state.YourOffers[this.state.selectedYourOfferIndex].active !==
        offerObject.active
      ) {
        document.set("active", offerObject.active);
      }

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    submitPostDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Edited Offer Doc:\n", returnedDoc);

        let offer = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,
          $createdAt: returnedDoc.$createdAt,
          $updatedAt: returnedDoc.$updatedAt,

          toMe: returnedDoc.toMe, //.toLocaleLowerCase() <- done in modal
          toMeVia: returnedDoc.toMeVia, //.toLocaleLowerCase() <- done in modal
          toMeHandle: returnedDoc.toMeHandle,
          toU: returnedDoc.toU, //.toLocaleLowerCase() <- done in modal
          toUVia: returnedDoc.toUVia, //.toLocaleLowerCase() <- done in modal

          //toUHandle -> Not Data Contract
          exRate: offerObject.exRate,
          instruction: offerObject.instruction,
          minAmt: offerObject.minAmt,
          maxAmt: offerObject.maxAmt,
          active: offerObject.active,
          myStore: false,
        };

        let editedOffers = this.state.YourOffers;

        editedOffers.splice(this.state.selectedYourOfferIndex, 1, offer);

        this.setState(
          {
            YourOffers: editedOffers,
            isLoadingYourOffers: false,
          }
          //,() => console.log(this.state.YourOffers)
        );
      })
      .catch((e) => {
        console.error("Something went wrong with Offer creation:\n", e);
        this.setState({
          offerError: true,
          isLoadingYourOffers: false,
        });
      })
      .finally(() => client.disconnect());
  };

  deleteYourOffer = () => {
    console.log("Called Delete Offer");

    this.setState({
      isLoadingYourOffers: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        P2PContract: {
          contractId: this.state.DataContractP2P,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const deleteNoteDocument = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const documentId = this.state.selectedYourOffer.$id;

      // Retrieve the existing document

      //JUST PUT IN THE DOCUMENT THAT i ALREADY HAVE... => Done
      // Wrong ^^^ Can not use because changed to JSON

      const [document] = await client.platform.documents.get(
        "P2PContract.offer",
        { where: [["$id", "==", documentId]] }
      );
      //const document = this.state.selectedYourProof;

      // Sign and submit the document delete transition
      await platform.documents.broadcast({ delete: [document] }, identity);
      return document;
    };

    deleteNoteDocument()
      .then((d) => {
        console.log("Document deleted:\n", d.toJSON());

        let editedOffers = this.state.YourOffers;

        editedOffers.splice(this.state.selectedYourOfferIndex, 1);

        this.setState({
          YourOffers: editedOffers,
          isLoadingYourOffers: false,
        });
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  /*
   *EXCHANGE FUNCTIONS^^^^
   *                                 ################
   *                                 ###
   *                                 ################
   *                                 ###
   *                                 ################
   *
   *
   *   ################
   *   ###          ####
   *   ################
   *   ###          ####
   *   ###           ####
   */

  //REVIEWS FUNCTIONS
  handleReviewsTab = (eventKey) => {
    if (eventKey === "Search")
      this.setState({
        whichReviewsTab: "Search",
      });
    else {
      this.setState({
        whichReviewsTab: "Your Reviews",
      });
    }
  };

  handleReviewsOnChangeValidation = (event) => {
    // this.setState({
    //   isTooLongNameError:false,
    // });

    if (event.target.id === "validationCustomName") {
      this.nameValidate(event.target.value);
    }
  };

  nameValidate = (nameInput) => {
    let regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$/;
    let valid = regex.test(nameInput);

    if (valid) {
      this.setState({
        nameToSearch: nameInput,
        nameFormat: true,
      });
    } else {
      //isTooLongNameError => Add if statement here =>
      this.setState({
        nameToSearch: nameInput,
        nameFormat: false,
      });
    }
  };

  searchName_REVIEW = () => {
    //add spinner start -> connect ->
    // clear previous results ->

    this.setState({
      isLoadingReviewsSearch: true,
      SearchedReviews: [],
    });

    const client = new Dash.Client(this.state.whichNetwork);

    const retrieveName = async () => {
      // Retrieve by full name (e.g., myname.dash)
      console.log(this.state.nameToSearch);
      return client.platform.names.resolve(`${this.state.nameToSearch}.dash`);
    };

    retrieveName()
      .then((d) => {
        if (d === null) {
          console.log("No DPNS Document for this Name.");
          this.setState({
            SearchedNameDoc: "No NameDoc", //Handle if name fails ->
            isLoadingReviewsSearch: false,
          });
        } else {
          let nameDoc = d.toJSON();
          console.log("Name retrieved:\n", nameDoc);

          this.startSearch_REVIEW(nameDoc.$ownerId);

          this.setState({
            SearchedNameDoc: nameDoc,
          });
        }
      })
      .catch((e) => {
        this.setState({
          SearchedNameDoc: "No NameDoc",
          isLoadingReviewsSearch: false,
        });
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  handleEditReview = (review, index) => {
    this.setState(
      {
        reviewToEdit: review,
        reviewToEditIndex: index,
      },
      () => this.showModal("EditReviewModal")
    );
  };

  //PUT THE QUERY SEARCHES HERE
  startSearch_REVIEW = (identityToSearch) => {
    //Called from name doc pulled ->
    this.getSearchReviews(identityToSearch);
  };

  searchReviewsRace = () => {
    if (this.state.SearchReviews1 && this.state.SearchReviews2) {
      this.setState({
        SearchReviews1: false,
        SearchReviews2: false,
        //DONT HAVE TO ADD STATE TO PUSH TO DISPLAY BECAUSE THE REVIEWS AND NAMES PUSHED TOGETHER AND THEN THREADS APPEAR <- SO DO I WANT TO QUERY NAME FIRST THEN?
        isLoadingReviewsSearch: false,
      });
    }
  };

  getSearchReviews = (theIdentity) => {
    //console.log("Calling getSearchReviews");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGRContract: {
          contractId: this.state.DataContractDGR,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      return client.platform.documents.get("DGRContract.dgrreview", {
        where: [
          ["toId", "==", theIdentity],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no SearchReviews");

          this.setState(
            {
              SearchReviews1: true,
              SearchReviews2: true,
              SearchedReviews: [],
            },
            () => this.searchReviewsRace()
          );
        } else {
          let docArray = [];
          //console.log("Getting Search Reviews");

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Review:\n", returnedDoc);
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();
            //console.log("newReview:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }
          this.getSearchReviewNames(docArray);
          this.getSearchReplies(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getSearchReviewNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    // Start of Setting Unique reviews
    let arrayOfReviews = arrayOfOwnerIds.map((id) => {
      return docArray.find((doc) => id === doc.$ownerId);
    });
    // End of Setting Unique reviews

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            SearchedReviewNames: nameDocArray,
            SearchedReviews: arrayOfReviews, //This is a unique set of reviews only single review per reviewer
            SearchReviews1: true,
          },
          () => this.searchReviewsRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting Search Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  getSearchReplies = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGRContract: {
          contractId: this.state.DataContractDGR,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    // This Below is to get unique set of ByYou review doc ids
    let arrayOfReviewIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of ByYouThreads ids", arrayOfReviewIds);

    let setOfReviewIds = [...new Set(arrayOfReviewIds)];

    arrayOfReviewIds = [...setOfReviewIds];

    //console.log("Array of order ids", arrayOfReviewIds);

    const getDocuments = async () => {
      //console.log("Called Get Search Replies");

      return client.platform.documents.get("DGRContract.dgrreply", {
        where: [["reviewId", "in", arrayOfReviewIds]], // check reviewId ->
        orderBy: [["reviewId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        for (const n of d) {
          let returnedDoc = n.toJSON();
          //console.log("Thr:\n", returnedDoc);
          returnedDoc.reviewId = Identifier.from(
            returnedDoc.reviewId,
            "base64"
          ).toJSON();
          //console.log("newThr:\n", returnedDoc);
          docArray = [...docArray, returnedDoc];
        }

        this.setState(
          {
            SearchReviews2: true,
            SearchedReplies: docArray,
          },
          () => this.searchReviewsRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong Search Replies:\n", e);
      })
      .finally(() => client.disconnect());
  };

  pullInitialTriggerREVIEWS = () => {
    this.getYourReviews(this.state.identity);
    this.setState({
      InitialPullReviews: false,
    });
  };

  yourReviewsRace = () => {
    if (this.state.YourReviews1 && this.state.YourReviews2) {
      this.setState({
        YourReviews1: false,
        YourReviews2: false,

        isLoadingYourReviews: false,
      });
    }
  };

  getYourReviews = (theIdentity) => {
    //console.log("Calling getYourReviews");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGRContract: {
          contractId: this.state.DataContractDGR,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      return client.platform.documents.get("DGRContract.dgrreview", {
        where: [
          ["toId", "==", theIdentity],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no YourReviews");

          this.setState(
            {
              YourReviews1: true,
              YourReviews2: true,
            },
            () => this.yourReviewsRace()
          );
        } else {
          let docArray = [];
          //console.log("Getting YourReviews Reviews");

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Review:\n", returnedDoc);
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();
            //console.log("newReview:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }
          this.getYourReviewNames(docArray);
          this.getYourReplies(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getYourReviewNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            YourReviewNames: nameDocArray,
            YourReviews: docArray,
            YourReviews1: true,
          },
          () => this.yourReviewsRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting YourReview Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  getYourReplies = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DGRContract: {
          contractId: this.state.DataContractDGR,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    // This Below is to get unique set of ByYou review doc ids
    let arrayOfReviewIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of ByYouThreads ids", arrayOfReviewIds);

    let setOfReviewIds = [...new Set(arrayOfReviewIds)];

    arrayOfReviewIds = [...setOfReviewIds];

    //console.log("Array of order ids", arrayOfReviewIds);

    const getDocuments = async () => {
      //console.log("Called Get Search Replies");

      return client.platform.documents.get("DGRContract.dgrreply", {
        where: [["reviewId", "in", arrayOfReviewIds]], // check reviewId ->
        orderBy: [["reviewId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        for (const n of d) {
          let returnedDoc = n.toJSON();
          //console.log("Thr:\n", returnedDoc);
          returnedDoc.reviewId = Identifier.from(
            returnedDoc.reviewId,
            "base64"
          ).toJSON();
          //console.log("newThr:\n", returnedDoc);
          docArray = [...docArray, returnedDoc];
        }

        this.setState(
          {
            YourReviews2: true,
            YourReplies: docArray,
          },
          () => this.yourReviewsRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong Search Replies:\n", e);
      })
      .finally(() => client.disconnect());
  };

  handleYourReply = (reviewDoc, revieweeLabel) => {
    //First search and see if there is already a reply for the review
    let replyDoc = this.state.YourReplies.find((doc) => {
      return doc.reviewId === reviewDoc.$id;
    });

    if (replyDoc !== undefined) {
      this.setState(
        {
          replyReview: reviewDoc,
          replyToEdit: replyDoc,
          replyingToName: revieweeLabel,
        },
        () => this.showModal("EditReplyModal")
      );
    } else {
      this.setState(
        {
          replyReview: reviewDoc,
          replyToEdit: [],
          replyingToName: revieweeLabel,
        },
        () => this.showModal("CreateReplyModal")
      );
    }
  };

  createReview = (reviewObject) => {
    console.log("Called Create Review");

    this.setState({
      isLoadingReviewsSearch: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DGRContract: {
          contractId: this.state.DataContractDGR,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const submitReviewDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const reviewProperties = {
        toId: this.state.SearchedNameDoc.$ownerId,
        review: reviewObject.review,
        rating: reviewObject.rating,
      };
      //console.log('Review to Create: ', reviewProperties);

      // Create the note document
      const dgrDocument = await platform.documents.create(
        "DGRContract.dgrreview",
        identity,
        reviewProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      // return dgrDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [dgrDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return dgrDocument;
    };

    submitReviewDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Document:\n", returnedDoc);

        let review = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,

          review: reviewObject.review,
          rating: reviewObject.rating,

          $createdAt: returnedDoc.$createdAt,
        };

        this.setState({
          SearchedReviews: [review, ...this.state.SearchedReviews],
          isLoadingReviewsSearch: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong with review creation:\n", e);
      })
      .finally(() => client.disconnect());

    //THIS BELOW IS THE NAME DOC ADD, SO PROCESSES DURING DOC SUBMISSION ***
    let nameDoc = {
      $ownerId: this.state.identity,
      label: this.state.uniqueName,
    };

    this.setState({
      SearchedReviewNames: [nameDoc, ...this.state.SearchedReviewNames],
    });
    //END OF NAME DOC ADD***
  };

  editReview = (reviewObject) => {
    console.log("Called Edit Review");

    this.setState({
      isLoadingReviewsSearch: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DGRContract: {
          contractId: this.state.DataContractDGR,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const submitReviewDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const [document] = await client.platform.documents.get(
        "DGRContract.dgrreview",
        {
          where: [["$id", "==", this.state.reviewToEdit.$id]],
        }
      );

      if (this.state.reviewToEdit.review !== reviewObject.review) {
        document.set("review", reviewObject.review);
      }

      if (this.state.reviewToEdit.rating !== reviewObject.rating) {
        document.set("review", reviewObject.rating);
      }

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    submitReviewDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Edited Review Doc:\n", returnedDoc);

        let review = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,

          review: reviewObject.review,
          rating: reviewObject.rating,

          $createdAt: returnedDoc.$createdAt,
        };

        let editedReviews = this.state.SearchedReviews;

        editedReviews.splice(this.state.reviewToEditIndex, 1, review);

        this.setState({
          SearchedReviews: editedReviews,
          isLoadingReviewsSearch: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong with review edit:\n", e);
      })
      .finally(() => client.disconnect());
  };

  createReply = (replyObject) => {
    console.log("Called Create Reply");

    this.setState({
      isLoadingYourReviews: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DGRContract: {
          contractId: this.state.DataContractDGR,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const submitReviewDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const replyProperties = {
        reviewId: this.state.replyReview.$id,
        reply: replyObject.reply,
      };
      //console.log('Reply to Create: ', replyProperties);

      // Create the note document
      const dgrDocument = await platform.documents.create(
        "DGRContract.dgrreply",
        identity,
        replyProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      // return dgrDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [dgrDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return dgrDocument;
    };

    submitReviewDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Document:\n", returnedDoc);

        let reply = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,
          $createdAt: returnedDoc.$createdAt,

          reviewId: this.state.replyReview.$id,
          reply: replyObject.reply,
        };

        this.setState({
          YourReplies: [reply, ...this.state.YourReplies],
          isLoadingYourReviews: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong with reply creation:\n", e);
      })
      .finally(() => client.disconnect());
  };

  editReply = (replyObject) => {
    console.log("Called Edit Reply");

    this.setState({
      isLoadingYourReviews: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        DGRContract: {
          contractId: this.state.DataContractDGR,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const submitReplyDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const [document] = await client.platform.documents.get(
        "DGRContract.dgrreply",
        {
          where: [["$id", "==", this.state.replyToEdit.$id]],
        }
      );

      if (this.state.replyToEdit.reply !== replyObject.reply) {
        document.set("reply", replyObject.reply);
      }

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    submitReplyDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Edited Reply Doc:\n", returnedDoc);

        let editedReply = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,
          $createdAt: returnedDoc.$createdAt,

          reviewId: this.state.replyReview.$id,
          reply: replyObject.reply,
        };

        let indexOfReply = this.state.YourReplies.findIndex((reply) => {
          return reply.$id === editedReply.$id;
        });

        let editedReplies = this.state.YourReplies;

        editedReplies.splice(indexOfReply, 1, editedReply);

        this.setState({
          YourReplies: editedReplies,
          isLoadingYourReviews: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong with reply creation:\n", e);
      })
      .finally(() => client.disconnect());
  };

  /*
  * REVIEWS FUNCTIONS^^^^
   *                                         ################
   *                                         ###          ####
   *                                         ################
   *                                         ###          ####
   *                                         ###           ####
   *
        ################
   *    ###          ###
   *    ################
   *    ###          
   *    ### 
   */

  //PROOF OF FUNDS FUNCTIONS

  handleTab_POD = (eventKey) => {
    if (eventKey === "Search")
      this.setState({
        whichTab_POD: "Search",
      });
    else {
      this.setState({
        whichTab_POD: "Your Proofs",
      });
    }
  };

  handleDeleteYourProof = (index) => {
    this.setState(
      {
        selectedYourProof: this.state.YourProofs[index],

        selectedYourProofIndex: index,
      },
      () => this.showModal("DeleteProofModal")
    );
  };

  // FORM Functions
  handleOnChangeValidation_POD = (event) => {
    this.setState({
      isError: false,
    });

    if (event.target.id === "validationCustomName") {
      this.nameValidate_POD(event.target.value);
    }
  };

  nameValidate_POD = (nameInput) => {
    let regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$/;
    let valid = regex.test(nameInput);

    if (valid) {
      this.setState({
        nameToSearch_POD: nameInput,
        nameFormat_POD: true,
      });
    } else {
      this.setState({
        nameToSearch_POD: nameInput,
        nameFormat_POD: false,
      });
    }
  };

  searchName_POD = () => {
    this.setState({
      isLoadingSearch_POD: true,
      SearchedNameDoc_POD: "",
      SearchedProofs: [],
    });

    const client = new Dash.Client(this.state.whichNetwork);

    const retrieveName = async () => {
      // Retrieve by full name (e.g., myname.dash)
      return client.platform.names.resolve(
        `${this.state.nameToSearch_POD}.dash`
      );
    };

    retrieveName()
      .then((d) => {
        if (d === null) {
          console.log("No DPNS Document for this Name.");
          this.setState({
            SearchedNameDoc_POD: "No NameDoc", //Handle if name fails ->
            isLoadingSearch_POD: false,
          });
        } else {
          let nameDoc = d.toJSON();
          console.log("Name retrieved:\n", nameDoc);

          this.searchForProofs(nameDoc.$ownerId);

          this.setState({
            SearchedNameDoc_POD: nameDoc,
          });
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingSearch_POD: false,
        });
      })
      .finally(() => client.disconnect());
  };
  // FORM Functions ^^^

  // Trigger -> this.getYourProofs(theIdentity);

  searchForProofs = (theIdentity) => {
    //console.log("Calling getSearchProofs");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        PODContract: {
          contractId: this.state.DataContractPOD,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      return client.platform.documents.get("PODContract.podproof", {
        where: [
          ["$ownerId", "==", theIdentity],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no SearchProofs");

          this.setState({
            //SearchedProofs: [],
            isLoadingSearch_POD: false,
          });
        } else {
          let docArray = [];
          //console.log("Getting Search Proofs");

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Review:\n", returnedDoc);
            // returnedDoc.toId = Identifier.from( //NOT FOR POD PROOFS
            //   returnedDoc.toId,
            //   "base64"
            // ).toJSON();
            //console.log("newReview:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }
          this.setState({
            SearchedProofs: docArray,
            isLoadingSearch_POD: false,
          });
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  pullInitialTriggerPROOFS = () => {
    this.getYourProofs(this.state.identity);
    this.setState({
      InitialPullProofs: false,
    });
  };

  getYourProofs = (theIdentity) => {
    //console.log("Calling getYourProofs");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        PODContract: {
          contractId: this.state.DataContractPOD,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      return client.platform.documents.get("PODContract.podproof", {
        where: [
          ["$ownerId", "==", theIdentity],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("There are no Your Proofs");

          this.setState({
            isLoadingYourProofs: false,
          });
        } else {
          let docArray = [];
          //console.log("GettingYour Proofs");
          for (const n of d) {
            console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }

          this.setState({
            YourProofs: docArray,
            isLoadingYourProofs: false,
          });
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  //$$  $$   $$$  $$  $  $$  $$$  $$$  $$  $$

  createYourProof = (proofObject) => {
    console.log("Called Create Proof");

    this.setState({
      isLoadingYourProofs: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        PODContract: {
          contractId: this.state.DataContractPOD,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const submitProofDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const proofProperties = {
        address: proofObject.address,
        message: proofObject.message,
        signature: proofObject.signature,
      };
      //console.log('Proof to Create: ', proofProperties);

      // Create the note document
      const podDocument = await platform.documents.create(
        "PODContract.podproof",
        identity,
        proofProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      // return podDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [podDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return podDocument;
    };

    submitProofDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Document:\n", returnedDoc);

        let proof = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,
          $updatedAt: returnedDoc.$updatedAt,

          address: proofObject.address,
          message: proofObject.message,
          signature: proofObject.signature,
        };

        this.setState({
          YourProofs: [proof, ...this.state.YourProofs],
          isLoadingYourProofs: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong with proof creation:\n", e);
        this.setState({
          isLoadingYourProofs: false,
        });
      })
      .finally(() => client.disconnect());
  };

  deleteYourProof = () => {
    console.log("Called Delete Proof");

    this.setState({
      isLoadingYourProofs: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        PODContract: {
          contractId: this.state.DataContractPOD,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const deleteNoteDocument = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const documentId = this.state.selectedYourProof.$id;

      // Retrieve the existing document

      //JUST PUT IN THE DOCUMENT THAT i ALREADY HAVE... => Done
      // Wrong ^^^ Can not use because changed to JSON

      const [document] = await client.platform.documents.get(
        "PODContract.podproof",
        { where: [["$id", "==", documentId]] }
      );
      //const document = this.state.selectedYourProof;

      // Sign and submit the document delete transition
      await platform.documents.broadcast({ delete: [document] }, identity);
      return document;
    };

    deleteNoteDocument()
      .then((d) => {
        console.log("Document deleted:\n", d.toJSON());

        let editedProofs = this.state.YourProofs;

        editedProofs.splice(this.state.selectedYourProofIndex, 1);

        this.setState({
          YourProofs: editedProofs,
          isLoadingYourProofs: false,
        });
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  /**

                                             ################
   *                                         ###          ###
   *                                         ################
   *                                         ###          
   *                                         ###           
   * PROOF OF FUNDS FUNCTIONS^^^^
   */

  //https://github.com/dashpay/platform/blob/v1.0-dev/packages/js-dash-sdk/src/SDK/Client/Platform/methods/identities/creditTransfer.ts
  // see above ^^^
  sendFrontendFee = () => {
    this.setState({
      isLoadingIdInfo: true, //wHAT DOES THIS DO? -> because does not control the identity state that is with identityInfo

      isLoadingCreditTransfer: true, // Add to state

      identityInfo: "", //bC THIS IS WHAT CONTROLS THE TOPUP CREDITS AND WILL THAT MESS WITH THE FUNCTION BELOW ?
    });
    console.log(this.state.identityInfo.balance);
    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const identityCreditTransfer = async () => {
      //const identity = this.state.identityRaw; //YourIdentity

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      // const identityId = 'identity ID of the sender goes here';
      //const identity = await client.platform.identities.get(identityId);

      const recipientId = import.meta.env.VITE_IDENTITY_TO_RECEIVE_FEE; //.env input

      //add to state the variable : feeAmountBaseNumber = 10000000 and the subtract 1 from each time..
      // SUBTRACT IN THE STATE SET AFTER TRANSITION.

      //BUT WILL THE -1 CHANGE THE TRANSFER AMOUNT AFTER THE TOFIXED(0) SO THAT IT IS CHANGED IN THE STATE TRANSITION? I THINK YES..

      const feeAmount = //100,000,000 duffs in a Dash * 1000 duffs to credits * .01 for % // Not .01 for % but .01 for TopUp(fixed amount) // actually, So TopUp and % are included in the calculation
        // 100,000,000 duffs in a dash * 1000 credits in a duff = 100,000,000,000
        // .01 topup is amt in dash -> 1,000,000,000
        // .01 change to % -> 10,000,000
        (
          this.state.feeAmountBaseNumber *
          import.meta.env.VITE_FEE_AMOUNT_AS_PERCENT_OF_A_TOPUP
        ) //1 <=
          .toFixed(0);

      console.log(feeAmount);

      // fee amount need to augment just a little.. I think it is using the logic just like the core so need to be different.
      //So like have a fee amount in state aand subtract 1 from it each time.. <= ****

      await client.platform.identities.creditTransfer(
        identity,
        //Identifier.from(this.state.identity),
        recipientId,
        //Number(feeAmount)
        feeAmount
      );
      return client.platform.identities.get(this.state.identity);
    };

    identityCreditTransfer()
      .then((d) => {
        console.log(
          "Identity credit balance after credit transfer: ",
          d.balance
        );
        this.setState({
          identityInfo: d.toJSON(),
          identityRaw: d,
          isLoadingIdInfo: false,
          isLoadingCreditTransfer: false,
          feeAmountBaseNumber: this.state.feeAmountBaseNumber - 1,
        });

        //credit transfer
        // get the identity balance after whatever write function and then set the state.
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          identityInfo: this.state.identityRaw.toJSON(), //Test <-
          isLoadingIdInfo: false,
          isLoadingCreditTransfer: false,
          feeAmountBaseNumber: this.state.feeAmountBaseNumber - 20,
        });
      })
      .finally(() => client.disconnect());
  };

  render() {
    this.state.mode === "primary"
      ? (document.body.style.backgroundColor = "rgb(280,280,280)")
      : (document.body.style.backgroundColor = "rgb(20,20,20)");

    this.state.mode === "primary"
      ? (document.body.style.color = "black")
      : (document.body.style.color = "white");

    let isLoginComplete =
      this.state.uniqueName !== "" && this.state.uniqueName !== "no name";

    return (
      <>
        <TopNav
          handleMode={this.handleMode}
          mode={this.state.mode}
          showModal={this.showModal}
          whichNetwork={this.state.whichNetwork}
          isLoggedIn={this.state.isLoggedIn}
          toggleTopNav={this.toggleTopNav}
          expandedTopNav={this.state.expandedTopNav}
          selectedDapp={this.state.selectedDapp}
          handleSelectedDapp={this.handleSelectedDapp}
          uniqueName={this.state.uniqueName}
          identityInfo={this.state.identityInfo}
        />

        <Image fluid="true" id="dash-bkgd" src={DashBkgd} alt="Dash Logo" />

        <Container className="g-0">
          <Row className="justify-content-md-center">
            <Col md={9} lg={8} xl={7} xxl={6}>
              {this.state.selectedDapp === "Login" ? (
                <>
                  {!this.state.isLoggedIn ? (
                    <>
                      <LoginForm
                        handleAccountLogin={this.handleAccountLogin}
                        LocalForageKeys={this.state.LocalForageKeys}
                        showModal={this.showModal}
                        mode={this.state.mode}
                      />
                    </>
                  ) : (
                    <>
                      <AccountLogin
                        isLoginComplete={isLoginComplete}
                        mnemonic={this.state.mnemonic}
                        handleAccountRetry={this.handleAccountRetry}
                        showModal={this.showModal}
                        toggleTopNav={this.toggleTopNav}
                        isLoadingIdentity={this.state.isLoadingIdentity}
                        isLoadingIdInfo={this.state.isLoadingIdInfo}
                        isLoadingName={this.state.isLoadingName}
                        isLoadingAlias={this.state.isLoadingAlias}
                        isLoadingWallet={this.state.isLoadingWallet}
                        identity={this.state.identity}
                        identityRaw={this.state.identityRaw}
                        identityInfo={this.state.identityInfo}
                        uniqueName={this.state.uniqueName}
                        aliasList={this.state.aliasList}
                        accountBalance={this.state.accountBalance}
                        mode={this.state.mode}
                      />
                    </>
                  )}
                </>
              ) : (
                <></>
              )}

              {this.state.selectedDapp === "Messages" ? (
                <>
                  {/* DONT HANDLE THE LOGIN SEPARATED PARTS HERE DO THAT IN THE COMPONENT AND PASS THE **ISLOGINCOMPLETE** THROUGH PROPS */}
                  <MessagesPage
                    isLoginComplete={isLoginComplete}
                    //isLoading={this.state.isLoading}
                    isLoadingRefresh={this.state.isLoadingRefresh}
                    isLoadingEveryone={this.state.isLoadingEveryone}
                    isLoadingForYou={this.state.isLoadingForYou}
                    errorToDisplay={this.state.errorToDisplay}
                    handleMessageFailureAlert={this.handleMessageFailureAlert}
                    identity={this.state.identity}
                    identityInfo={this.state.identityInfo}
                    uniqueName={this.state.uniqueName}
                    EveryoneMsgs={this.state.EveryoneMsgs}
                    EveryoneNames={this.state.EveryoneNames}
                    ByYouMsgs={this.state.ByYouMsgs}
                    ByYouNames={this.state.ByYouNames}
                    FromTagsMsgs={this.state.FromTagsMsgs}
                    FromTagsNames={this.state.FromTagsNames}
                    EveryoneThreads={this.state.EveryoneThreads}
                    EveryoneThreadsNames={this.state.EveryoneThreadsNames}
                    ByYouThreads={this.state.ByYouThreads}
                    ByYouThreadsNames={this.state.ByYouThreadsNames}
                    FromTagsThreads={this.state.FromTagsThreads}
                    FromTagsThreadsNames={this.state.FromTagsThreadsNames}
                    NewSOMsgs={this.state.NewSOMsgs}
                    NewSOThreads={this.state.NewSOThreads}
                    NewDMByYouThreads={this.state.NewDMByYouThreads}
                    NewDMFromTagsMsgs={this.state.NewDMFromTagsMsgs}
                    NewDMFromTagsThreads={this.state.NewDMFromTagsThreads}
                    mode={this.state.mode}
                    whichMessagesTab={this.state.whichMessagesTab}
                    handleMessagesTab={this.handleMessagesTab}
                    showModal={this.showModal}
                    handleThread={this.handleThread}
                    pushNewSOtoView={this.pushNewSOtoView}
                    pushNewDMtoView={this.pushNewDMtoView}
                  />
                </>
              ) : (
                <></>
              )}
              {this.state.selectedDapp === "Groups" ? (
                //SO THIS WILL BE A 2 PAGE SETUP INSTEAD OF ONE AND ITS NOT A BAD IDEA i SUPPOSE SO THAT WHEN YOU CLICK OFF ITS NOT LOST... ->
                <>
                  {this.state.isGroupShowing ? (
                    <>
                      <Group
                        //isGroupShowing: true,
                        uniqueName={this.state.uniqueName}
                        identityRaw={this.state.identityRaw}
                        isLoadingGroup={this.state.isLoadingGroup}
                        //IS THIS DOING ANYTHING?? -> msg submission and invite sending ->
                        isLoadingGroupInvite={this.state.isLoadingGroupInvite}
                        submitDGTmessage={this.submitDGTmessage}
                        GroupsMsgsToAdd={this.state.GroupsMsgsToAdd}
                        submitDGTinvite={this.submitDGTinvite}
                        showModal={this.showModal}
                        selectedGroup={this.state.selectedGroup}
                        whichNetwork={this.state.whichNetwork}
                        mode={this.state.mode}
                        hideGroupPage={this.hideGroupPage}
                        sentGroupInviteError={this.state.sentGroupInviteError}
                        sentGroupInviteSuccess={
                          this.state.sentGroupInviteSuccess
                        }
                        sendToNameInvite={this.state.sendToNameInvite}
                        DataContractDGT={this.state.DataContractDGT}
                        DataContractDPNS={this.state.DataContractDPNS}
                      />
                    </>
                  ) : (
                    <GroupsPage
                      isLoginComplete={isLoginComplete}
                      pullInitialTriggerGROUPS={this.pullInitialTriggerGROUPS}
                      InitialPullGROUPS={this.state.InitialPullGROUPS}
                      identityInfo={this.state.identityInfo}
                      uniqueName={this.state.uniqueName}
                      showModal={this.showModal}
                      identity={this.state.identity}
                      showGroupPage={this.showGroupPage}
                      handleSelectedJoinGroup={this.handleSelectedJoinGroup}
                      mode={this.state.mode}
                      isLoadingGroups={this.state.isLoadingGroups}
                      isLoadingGroup={this.state.isLoadingGroup}
                      isLoadingActiveGroups={this.state.isLoadingActiveGroups}
                      isLoadingGroupInvite={this.state.isLoadingGroupInvite}
                      dgtInvites={this.state.dgtInvites}
                      dgtInvitesNames={this.state.dgtInvitesNames}
                      dgtActiveGroups={this.state.dgtActiveGroups}
                      selectedGroup={this.state.selectedGroup} //Do these go here AND where is the modal that displays this?
                      isGroupShowing={this.state.isGroupShowing}
                      GroupsMsgsToAdd={this.state.GroupsMsgsToAdd} //handle in Group so not too difficult, just add together and use set for unique docId ->
                      sentGroupMsgError={this.state.sentGroupMsgError} //Thread to Group, all the below
                      sentGroupInviteError={this.state.sentGroupInviteError}
                      sentGroupInviteSuccess={this.state.sentGroupInviteSuccess}
                      sendToNameInvite={this.state.sendToNameInvite} //For invite
                    />
                  )}
                </>
              ) : (
                <></>
              )}

              {this.state.selectedDapp === "Wallet" ? (
                <>
                  <WalletPage
                    WALLET_Login7={this.state.WALLET_Login7} //This is for the enable pay to name control
                    isLoginComplete={isLoginComplete}
                    WALLET_whichTab={this.state.WALLET_whichTab}
                    handleTab_WALLET={this.handleTab_WALLET}
                    showModal={this.showModal}
                    WALLET_messageToSend={this.state.WALLET_messageToSend}
                    sendDashtoName={this.sendDashtoName_WALLET}
                    isModalShowing={this.state.isModalShowing}
                    presentModal={this.state.presentModal}
                    hideModal={this.hideModal}
                    closeTopNav={this.closeTopNav}
                    WALLET_sendFailure={this.state.WALLET_sendFailure}
                    WALLET_sendSuccess={this.state.WALLET_sendSuccess}
                    WALLET_sendMsgSuccess={this.state.WALLET_sendMsgSuccess}
                    WALLET_sendMsgFailure={this.state.WALLET_sendMsgFailure}
                    handleFailureAlert_WALLET={this.handleFailureAlert_WALLET}
                    handleSuccessAlert_WALLET={this.handleSuccessAlert_WALLET}
                    handleFailureMsgAlert_WALLET={
                      this.handleFailureMsgAlert_WALLET
                    }
                    WALLET_amountToSend={this.state.WALLET_amountToSend}
                    WALLET_sendToName={this.state.WALLET_sendToName}
                    WALLET_sendToAddress={this.state.WALLET_sendToAddress}
                    mnemonic={this.state.mnemonic}
                    whichNetwork={this.state.whichNetwork}
                    skipSynchronizationBeforeHeight={
                      this.state.skipSynchronizationBeforeHeight
                    }
                    dgmDocuments={this.state.dgmDocuments}
                    isLoadingRefresh_WALLET={this.state.isLoadingRefresh_WALLET}
                    isLoadingButtons_WALLET={this.state.isLoadingButtons_WALLET}
                    isLoadingWallet={this.state.isLoadingWallet}
                    isLoadingForm_WALLET={this.state.isLoadingForm_WALLET}
                    mode={this.state.mode}
                    accountBalance={this.state.accountBalance}
                    accountHistory={this.state.accountHistory} //ADD THIS TO THE LOGIN PROCESS =>
                    accountAddress={this.state.accountAddress} //ADD THIS TO THE LOGIN PROCESS =>
                    identity={this.state.identity}
                    identityInfo={this.state.identityInfo}
                    uniqueName={this.state.uniqueName}
                    showConfirmModal={this.showConfirmModal_WALLET}
                    showAddrConfirmModal={this.showAddrConfirmModal_WALLET}
                    handleThread_WALLET={this.handleThread_WALLET}
                    WALLET_ByYouMsgs={this.state.WALLET_ByYouMsgs}
                    WALLET_ByYouNames={this.state.WALLET_ByYouNames}
                    WALLET_ByYouThreads={this.state.WALLET_ByYouThreads}
                    WALLET_ToYouMsgs={this.state.WALLET_ToYouMsgs}
                    WALLET_ToYouNames={this.state.WALLET_ToYouNames}
                    WALLET_ToYouThreads={this.state.WALLET_ToYouThreads}
                    isLoadingMsgs_WALLET={this.state.isLoadingMsgs_WALLET}
                    DataContractDGM={this.state.DataContractDGM}
                    DataContractDPNS={this.state.DataContractDPNS}
                    handleRefresh_WALLET={this.handleRefresh_WALLET}
                  />
                </>
              ) : (
                <></>
              )}

              {this.state.selectedDapp === "My Store" ? (
                <>
                  <YourStorePage
                    isLoginComplete={isLoginComplete}
                    identity={this.state.identity}
                    identityInfo={this.state.identityInfo}
                    uniqueName={this.state.uniqueName}
                    showModal={this.showModal}
                    mode={this.state.mode}
                    whichTabYOURSTORE={this.state.whichTabYOURSTORE}
                    handleTabYOURSTORE={this.handleTabYOURSTORE}
                    pullInitialTriggerYOURSTORE={
                      this.pullInitialTriggerYOURSTORE
                    }
                    InitialPullYOURSTORE={this.state.InitialPullYOURSTORE}
                    //handleRefresh_WALLET={this.handleRefresh_WALLET}
                    // //USE THIS ^^ ONE INSTEAD OF THE OTHER ONE?

                    isLoadingStoreYOURSTORE={this.state.isLoadingStoreYOURSTORE}
                    isLoadingItemsYOURSTORE={this.state.isLoadingItemsYOURSTORE}
                    DGPStore={this.state.DGPStore}
                    DGMAddress={this.state.DGMAddress}
                    //IS THIS SINGLE OR ARRAY??

                    DGPItems={this.state.DGPItems}
                    handleSelectedItem={this.handleSelectedItem}
                    //ORDERS tab BELOW -> CHANGE ALL ->
                    isLoadingWallet={this.state.isLoadingWallet}
                    isLoadingOrdersYOURSTORE={
                      this.state.isLoadingOrdersYOURSTORE
                    }
                    accountBalance={this.state.accountBalance}
                    accountHistory={this.state.accountHistory}
                    DGPOrders={this.state.DGPOrders}
                    DGPOrdersNames={this.state.DGPOrdersNames}
                    DGPOrdersMsgs={this.state.DGPOrdersMsgs}
                    newOrderAvail={this.state.newOrderAvail}
                    handleLoadNewOrder={this.handleLoadNewOrder}
                    handleMerchantOrderMsgModalShow={
                      this.handleMerchantOrderMsgModalShow
                    }
                  />
                </>
              ) : (
                <></>
              )}

              {this.state.selectedDapp === "Near By" ? (
                <>
                  <NearbyPage
                    isLoginComplete={isLoginComplete}
                    InitialPullNearBy={this.state.InitialPullNearBy}
                    pullInitialTriggerNEARBY={this.pullInitialTriggerNEARBY}
                    pullOnPageLoadTriggerNEARBY={
                      this.pullOnPageLoadTriggerNEARBY
                    }
                    OnPageLoadNEARBY={this.state.OnPageLoadNEARBY}
                    whichNearbyTab={this.state.whichNearbyTab}
                    handleNearbyTab={this.handleNearbyTab}
                    identityInfo={this.state.identityInfo}
                    uniqueName={this.state.uniqueName}
                    showModal={this.showModal}
                    whichCountryRegion={this.state.whichCountryRegion}
                    mode={this.state.mode}
                    cityInput={this.state.cityInput}
                    validCity={this.state.validCity}
                    tooLongCityNameError={this.state.tooLongCityNameError}
                    countryRegionInput={this.state.countryRegionInput}
                    validCountryRegion={this.state.validCountryRegion}
                    tooLongCountryRegionNameError={
                      this.state.tooLongCountryRegionNameError
                    }
                    isLoadingNearbyForm={this.state.isLoadingNearbyForm}
                    triggerCountryButton={this.triggerCountryButton}
                    triggerRegionButton={this.triggerRegionButton}
                    handleNearbyOnChangeValidation={
                      this.handleNearbyOnChangeValidation
                    }
                    submittedStateAndCategoryTHENConstruct={
                      this.submittedStateAndCategoryTHENConstruct
                    }
                    selectedCategoryButton={this.state.selectedCategoryButton}
                    handleSelectedCategoryButton={
                      this.handleSelectedCategoryButton
                    }
                    isLoadingNearbySearch={this.state.isLoadingNearbySearch}
                    isLoadingNearbyInitial={this.state.isLoadingNearbyInitial}
                    OffBizPulled={this.state.OffBizPulled}
                    OffEventsPulled={this.state.OffEventsPulled}
                    OffRentPulled={this.state.OffRentPulled}
                    OffTradePulled={this.state.OffTradePulled}
                    LookRentPulled={this.state.LookRentPulled}
                    LookTradePulled={this.state.LookTradePulled}
                    OffRentPosts={this.state.OffRentPosts}
                    OffBizPosts={this.state.OffBizPosts}
                    OffOtherPosts={this.state.OffOtherPosts}
                    OffEventsPosts={this.state.OffEventsPosts}
                    LookRentPosts={this.state.LookRentPosts}
                    LookOtherPosts={this.state.LookOtherPosts}
                    handleSearchedPost={this.handleSearchedPost}
                    handleSearchedEvent={this.handleSearchedEvent}
                    OffRentNames={this.state.OffRentNames}
                    OffBizNames={this.state.OffBizNames}
                    OffOtherNames={this.state.OffOtherNames}
                    OffEventsNames={this.state.OffEventsNames}
                    LookRentNames={this.state.LookRentNames}
                    LookOtherNames={this.state.LookOtherNames}
                    yourPostsToDisplay={this.state.yourPostsToDisplay}
                    handleYourPost={this.handleYourPost}
                    handleYourEvent={this.handleYourEvent}
                    isLoadingYourPosts={this.state.isLoadingYourPosts}
                  />
                </>
              ) : (
                <></>
              )}

              {this.state.selectedDapp === "Shopping" ? (
                <>
                  <ShoppingPage
                    pullInitialTriggerSHOPPING={this.pullInitialTriggerSHOPPING}
                    InitialPullSHOPPING={this.state.InitialPullSHOPPING}
                    isLoadingWallet={this.state.isLoadingWallet}
                    isLoadingRecentOrders={this.state.isLoadingRecentOrders}
                    identity={this.state.identity}
                    identityInfo={this.state.identityInfo}
                    identityRaw={this.state.identityRaw}
                    uniqueName={this.state.uniqueName}
                    recentOrders={this.state.recentOrders}
                    recentOrdersStores={this.state.recentOrdersStores}
                    recentOrdersNames={this.state.recentOrdersNames}
                    recentOrdersDGMAddresses={
                      this.state.recentOrdersDGMAddresses
                    }
                    recentOrdersItems={this.state.recentOrdersItems}
                    recentOrdersMessages={this.state.recentOrdersMessages}
                    handleOrderMessageModalShow={
                      this.handleOrderMessageModalShow
                    }
                    accountBalance={this.state.accountBalance}
                    accountHistory={this.state.accountHistory}
                    showModal={this.showModal}
                    mode={this.state.mode}
                    handleTabSHOPPING={this.handleTabSHOPPING}
                    whichTabSHOPPING={this.state.whichTabSHOPPING}
                    handleSubmitClickSHOPPING={this.handleSubmitClickSHOPPING}
                    onChangeSHOPPING={this.onChangeSHOPPING}
                    toggleViewStore={this.toggleViewStore}
                    merchantName={this.state.merchantName}
                    viewStore={this.state.viewStore}
                    merchantStoreName={this.state.merchantStoreName}
                    merchantNameFormat={this.state.merchantNameFormat}
                    LoadingMerchant={this.state.LoadingMerchant}
                    isLoginComplete={isLoginComplete}
                    isLoadingActive={this.state.isLoadingActive}
                    handleAddingNewOrder={this.handleAddingNewOrder}
                    mnemonic={this.state.mnemonic}
                    activeOrders={this.state.activeOrders}
                    activeOrdersStores={this.state.activeOrdersStores}
                    activeOrdersNames={this.state.activeOrdersNames}
                    activeOrdersAddresses={this.state.activeOrdersAddresses}
                    getWalletForNewOrder={this.getWalletForNewOrder}
                    whichNetwork={this.state.whichNetwork}
                    handleEditItemModal={this.handleEditItemModal}
                    handleSelectRecentOrActive={this.handleSelectRecentOrActive}
                    LoadingItems={this.state.LoadingItems}
                    LoadingOrder={this.state.LoadingOrder}
                    merchantStore={this.state.merchantStore}
                    dgmDocumentForMerchant={this.state.dgmDocumentForMerchant}
                    merchantItems={this.state.merchantItems}
                    handleViewStore={this.handleViewStore}
                    cartItems={this.state.cartItems}
                    handleAddToCartModal={this.handleAddToCartModal}
                  />
                </>
              ) : (
                <></>
              )}

              {this.state.selectedDapp === "P2P Exchange" ? (
                <>
                  <ExchangePage
                    isLoginComplete={isLoginComplete}
                    InitialPullExchange={this.state.InitialPullExchange}
                    pullInitialTriggerEXCHANGE={this.pullInitialTriggerEXCHANGE}
                    whichExchangeTab={this.state.whichExchangeTab}
                    handleExchangeTab={this.handleExchangeTab}
                    whichOffersName={this.state.whichOffersName}
                    triggerOffersButton={this.triggerOffersButton}
                    triggerNameButton={this.triggerNameButton}
                    identity={this.state.identity}
                    identityInfo={this.state.identityInfo}
                    uniqueName={this.state.uniqueName}
                    showModal={this.showModal}
                    mode={this.state.mode}
                    isLoadingExchangeSearch={this.state.isLoadingExchangeSearch}
                    SearchedOffers={this.state.SearchedOffers}
                    SearchedOffersNames={this.state.SearchedOffersNames}
                    isLoadingYourOffers={this.state.isLoadingYourOffers}
                    nameToSearch_EXCHANGE={this.state.nameToSearch_EXCHANGE}
                    nameFormat_EXCHANGE={this.state.nameFormat_EXCHANGE}
                    isTooLongNameError_EXCHANGE={
                      this.state.isTooLongNameError_EXCHANGE
                    }
                    searchName_EXCHANGE={this.searchName_EXCHANGE}
                    SearchedNameDoc_EXCHANGE={
                      this.state.SearchedNameDoc_EXCHANGE
                    }
                    SearchedNameOffers_EXCHANGE={
                      this.state.SearchedNameOffers_EXCHANGE
                    }
                    handleExchangeNameSearchOnChangeValidation={
                      this.handleExchangeNameSearchOnChangeValidation
                    }
                    YourOffers={this.state.YourOffers}
                    offerToEdit={this.state.offerToEdit}
                    offerToEditIndex={this.state.offerToEditIndex}
                    clearExchangeOffersForm={this.clearExchangeOffersForm}
                    handleExchangeOffersSearchOnChangeValidation={
                      this.handleExchangeOffersSearchOnChangeValidation
                    }
                    toMeInput={this.state.toMeInput}
                    validtoMe={this.state.validtoMe}
                    toMeInputOTHER={this.state.toMeInputOTHER}
                    validtoMeOTHER={this.state.validtoMeOTHER}
                    tooLongtoMeErrorOTHER={this.state.tooLongtoMeErrorOTHER}
                    toMeViaInput={this.state.toMeViaInput}
                    validtoMeVia={this.state.validtoMeVia}
                    toMeViaInputOTHER={this.state.toMeViaInputOTHER}
                    validtoMeViaOTHER={this.state.validtoMeViaOTHER}
                    tooLongtoMeViaErrorOTHER={
                      this.state.tooLongtoMeViaErrorOTHER
                    }
                    toMeFinal={this.state.toMeFinal}
                    toMe4Doc={this.state.toMe4Doc}
                    toMeVia4Doc={this.state.toMeVia4Doc}
                    toUInput={this.state.toUInput}
                    validtoU={this.state.validtoU}
                    toUInputOTHER={this.state.toUInputOTHER}
                    validtoUOTHER={this.state.validtoUOTHER}
                    tooLongtoUErrorOTHER={this.state.tooLongtoUErrorOTHER}
                    toUViaInput={this.state.toUViaInput}
                    validtoUVia={this.state.validtoUVia}
                    toUViaInputOTHER={this.state.toUViaInputOTHER}
                    validtoUViaOTHER={this.state.validtoUViaOTHER}
                    tooLongtoUViaErrorOTHER={this.state.tooLongtoUViaErrorOTHER}
                    toUFinal={this.state.toUFinal}
                    toU4Doc={this.state.toU4Doc}
                    toUVia4Doc={this.state.toUVia4Doc}
                    constructQueryThenSearch_EXCHANGE={
                      this.constructQueryThenSearch_EXCHANGE
                    }
                    selectedSearchedOffer={this.state.selectedSearchedOffer}
                    selectedSearchedOfferNameDoc={
                      this.state.selectedSearchedOfferNameDoc
                    }
                    handleSearchedOffer={this.handleSearchedOffer}
                    handleYourOffer={this.handleYourOffer}
                    handleDeleteYourOffer={this.handleDeleteYourOffer}
                  />
                </>
              ) : (
                <></>
              )}

              {this.state.selectedDapp === "Reviews" ? (
                <>
                  <ReviewsPage
                    isLoginComplete={isLoginComplete}
                    InitialPullReviews={this.state.InitialPullReviews}
                    pullInitialTriggerREVIEWS={this.pullInitialTriggerREVIEWS}
                    whichReviewsTab={this.state.whichReviewsTab}
                    handleReviewsTab={this.handleReviewsTab}
                    identityInfo={this.state.identityInfo}
                    uniqueName={this.state.uniqueName}
                    showModal={this.showModal}
                    mode={this.state.mode}
                    nameToSearch={this.state.nameToSearch}
                    nameFormat={this.state.nameFormat}
                    SearchedNameDoc={this.state.SearchedNameDoc}
                    searchName={this.searchName_REVIEW}
                    handleReviewsOnChangeValidation={
                      this.handleReviewsOnChangeValidation
                    }
                    SearchedReviews={this.state.SearchedReviews}
                    isLoadingReviewsSearch={this.state.isLoadingReviewsSearch}
                    identity={this.state.identity}
                    handleEditReview={this.handleEditReview}
                    SearchedReviewNames={this.state.SearchedReviewNames}
                    SearchedReplies={this.state.SearchedReplies}
                    YourReviews={this.state.YourReviews}
                    YourReviewNames={this.state.YourReviewNames}
                    YourReplies={this.state.YourReplies}
                    handleYourReply={this.handleYourReply}
                    isLoadingYourReviews={this.state.isLoadingYourReviews}
                  />
                </>
              ) : (
                <></>
              )}

              {this.state.selectedDapp === "Proof of Funds" ? (
                <>
                  <ProofsPage
                    isLoginComplete={isLoginComplete}
                    InitialPullProofs={this.state.InitialPullProofs}
                    pullInitialTriggerPROOFS={this.pullInitialTriggerPROOFS}
                    identityInfo={this.state.identityInfo}
                    uniqueName={this.state.uniqueName}
                    showModal={this.showModal}
                    mode={this.state.mode}
                    identity={this.state.identity}
                    isLoadingSearch_POD={this.state.isLoadingSearch_POD}
                    isLoadingYourProofs={this.state.isLoadingYourProofs}
                    whichTab_POD={this.state.whichTab_POD}
                    handleTab_POD={this.handleTab_POD}
                    nameToSearch_POD={this.state.nameToSearch_POD}
                    nameFormat_POD={this.state.nameFormat_POD}
                    SearchedNameDoc_POD={this.state.SearchedNameDoc_POD}
                    searchName_POD={this.searchName_POD}
                    handleOnChangeValidation_POD={
                      this.handleOnChangeValidation_POD
                    }
                    SearchedProofs={this.state.SearchedProofs}
                    YourProofs={this.state.YourProofs}
                    handleDeleteYourProof={this.handleDeleteYourProof}
                  />
                </>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Container>

        {/* #####    BELOW ARE THE MODALS    #####    */}

        {this.state.isModalShowing &&
        this.state.presentModal === "LogoutModal" ? (
          <LogoutModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            handleLogout={this.handleLogout}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "CreateNewWalletModal" ? (
          <CreateNewWalletModal
            isModalShowing={this.state.isModalShowing}
            whichNetwork={this.state.whichNetwork}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "SendFundsModal" ? (
          <SendFundsModal
            isModalShowing={this.state.isModalShowing}
            accountAddress={this.state.accountAddress}
            whichNetwork={this.state.whichNetwork}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "FrontEndFeeExplaination" ? (
          <FrontEndFeeExplaination
            isModalShowing={this.state.isModalShowing}
            isLoadingCreditTransfer={this.state.isLoadingCreditTransfer}
            hideModal={this.hideModal}
            sendFrontendFee={this.sendFrontendFee}
            isLoginComplete={isLoginComplete}
            mode={this.state.mode}
            identityInfo={this.state.identityInfo}
            uniqueName={this.state.uniqueName}
            showModal={this.state.showModal}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "RegisterIdentityModal" ? (
          <RegisterIdentityModal
            isModalShowing={this.state.isModalShowing}
            registerIdentity={this.registerIdentity}
            hideModal={this.hideModal}
            mode={this.state.mode}
            skipSynchronizationBeforeHeight={
              this.state.skipSynchronizationBeforeHeight
            }
            whichNetwork={this.state.whichNetwork}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "TopUpIdentityModal" ? (
          <TopUpIdentityModal
            accountBalance={this.state.accountBalance}
            isLoadingWallet={this.state.isLoadingWallet}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            doTopUpIdentity={this.doTopUpIdentity}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {/* {this.state.isModalShowing &&
        this.state.presentModal === "SearchForNameModal" ? (
          <SearchForNameModal
            showModal={this.showModal}
            whichNetwork={this.state.whichNetwork}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )} */}

        {this.state.isModalShowing &&
        this.state.presentModal === "RegisterNameModal" ? (
          <RegisterNameModal
            triggerNameLoading={this.triggerNameLoading}
            triggerNameNotLoading={this.triggerNameNotLoading}
            handleName={this.handleName}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            identity={this.state.identity}
            identityRaw={this.state.identityRaw}
            mnemonic={this.state.mnemonic}
            whichNetwork={this.state.whichNetwork}
            skipSynchronizationBeforeHeight={
              this.state.skipSynchronizationBeforeHeight
            }
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "RegisterNameAliasModal" ? (
          <RegisterNameAliasModal
            triggerAliasLoading={this.triggerAliasLoading}
            triggerAliasNotLoading={this.triggerAliasNotLoading}
            handleAliases={this.handleAliases}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            identity={this.state.identity}
            identityRaw={this.state.identityRaw}
            mnemonic={this.state.mnemonic}
            whichNetwork={this.state.whichNetwork}
            skipSynchronizationBeforeHeight={
              this.state.skipSynchronizationBeforeHeight
            }
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {/* /**
         *     ###     ###
         *    ## ##    ####
         *   ###  ##  ##  ##
         *  ###    ####    ##
         * ###      ###     ##
         */}
        {this.state.isModalShowing &&
        this.state.presentModal === "NewSOModal" ? (
          <NewSOModal
            whichNetwork={this.state.whichNetwork}
            DataContractDPNS={this.state.DataContractDPNS}
            uniqueName={this.state.uniqueName}
            submitDSODocument={this.submitDSODocument}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeExpandedNavs={this.closeExpandedNavs}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "NewDMModal" ? (
          <NewDMModal
            whichNetwork={this.state.whichNetwork}
            DataContractDPNS={this.state.DataContractDPNS}
            uniqueName={this.state.uniqueName}
            submitDSODocument={this.submitDSODocument}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeExpandedNavs={this.closeExpandedNavs}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "NewThreadModal" ? (
          <NewThreadModal
            whichNetwork={this.state.whichNetwork}
            DataContractDPNS={this.state.DataContractDPNS}
            uniqueName={this.state.uniqueName}
            submitDSOThread={this.submitDSOThread}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeExpandedNavs={this.closeExpandedNavs}
          />
        ) : (
          <></>
        )}
        {/* 

*      #############
*     ####        ###
*     ###
*     ###     ########
*     #####      ####
*      ############# */}

        {this.state.isModalShowing &&
        this.state.presentModal === "CreateGroupModal" ? (
          <CreateGroupModal
            submitCreateGroup={this.submitCreateGroup}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "DeleteGroupModal" ? (
          <DeleteGroupModal
            selectedGroup={this.state.selectedGroup}
            deleteGroup={this.deleteGroup}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "JoinGroupModal" ? (
          <JoinGroupModal
            submitCreateGroup={this.submitCreateGroup}
            whichNetwork={this.state.whichNetwork}
            DataContractDGT={this.state.DataContractDGT}
            DataContractDPNS={this.state.DataContractDPNS}
            selectedGroup={this.state.selectedGroup}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

        {/* ##      ###    ###
         *   ###    ####   ##
         *    ###  ## ## ###
         *     ## ##  ####
         *      ###   ### */}

        {this.state.isModalShowing &&
        this.state.presentModal === "ConfirmAddrPaymentModal" ? (
          <ConfirmAddrPaymentModal
            sendToAddress={this.state.WALLET_sendToAddress}
            amountToSend={this.state.WALLET_amountToSend}
            sendDashtoAddress={this.sendDashtoAddress_WALLET}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "RegisterDGMModal" ? (
          <RegisterDGMModal
            RegisterDGMAddress={this.RegisterDGMAddress_WALLET}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "ThreadModal_WALLET" ? (
          <ThreadModal_WALLET
            uniqueName={this.state.uniqueName}
            submitDGMThread={this.submitDGMThread_WALLET}
            messageToWhomName={this.state.WALLET_messageToWhomName}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {/* {this.state.isModalShowing &&
        this.state.presentModal === "WalletTXModal" ? (
          <WalletTXModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            accountHistory={this.props.accountHistory}
            accountBalance={this.props.accountBalance}
            LoadingOrders={this.state.LoadingOrders}
            DGPOrders={this.state.DGPOrders}
            DGPOrdersNames={this.state.DGPOrdersNames}
          />
        ) : (
          <></>
        )} */}
        {/* THIS ^^^^ WAS THE MY STORE ONE */}

        {this.state.isModalShowing &&
        this.state.presentModal === "WalletTXModal" ? (
          <WalletTXModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            accountHistory={this.state.accountHistory}
            accountBalance={this.state.accountBalance}
            WALLET_addresses={this.state.WALLET_addresses}
            WALLET_addressesNames={this.state.WALLET_addressesNames}
            ByYouMsgs={this.state.WALLET_ByYouMsgs}
            ByYouNames={this.state.WALLET_ByYouNames}
            ToYouMsgs={this.state.WALLET_ToYouMsgs}
            ToYouNames={this.state.WALLET_ToYouNames}
            //My Store
            LoadingOrders={this.state.isLoadingOrdersYOURSTORE}
            DGPOrders={this.state.DGPOrders}
            DGPOrdersNames={this.state.DGPOrdersNames}
            //My Store^^
            isLoadingAddresses_WALLET={this.state.isLoadingAddresses_WALLET}
            isLoadingMsgs={this.state.isLoadingMsgs_WALLET}
            //MyStore and Shopping use TXId to connect name to Tx but does the address pull already accomplish this for shopping <= yes
            //Shopping
            /*
              isLoadingRecentOrders: true,
              recentOrders: [],
              recentOrdersStores: [],
              recentOrdersNames: [],
              recentOrdersDGMAddresses: [],
              recentOrdersItems: [],
              recentOrdersMessages: [],
             */
            //Shopping^^
            //sortedTuples={sortedTuples} // <= this is made in the WalletTXModal -> yes
            // So this should only be gotten too after wallet and msgs are loaded.. ->
          />
        ) : (
          <></>
        )}

        {/*  ###       ###
         *    ###     ###
         *      #######
         *        ###
         *        ###
         *        ### */}

        {this.state.isModalShowing &&
        this.state.presentModal === "CreateStoreModal" ? (
          <CreateStoreModal
            isModalShowing={this.state.isModalShowing}
            DGMAddress={this.state.DGMAddress}
            isLoadingWallet={this.state.isLoadingWallet}
            isLoadingStoreYOURSTORE={this.state.isLoadingStoreYOURSTORE}
            hideModal={this.hideModal}
            mode={this.state.mode}
            createDGPStore={this.createDGPStore}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "EditStoreModal" ? (
          <EditStoreModal
            isModalShowing={this.state.isModalShowing}
            DGPStore={this.state.DGPStore}
            hideModal={this.hideModal}
            mode={this.state.mode}
            editDGPStore={this.editDGPStore}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "StoreStatusModal" ? (
          <StoreStatusModal
            isModalShowing={this.state.isModalShowing}
            showModal={this.showModal}
            DGPStore={this.state.DGPStore}
            hideModal={this.hideModal}
            mode={this.state.mode}
            editDGPStore={this.editDGPStore}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "CreateItemModal" ? (
          <CreateItemModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            createDGPItem={this.createDGPItem}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "EditItemModal" ? (
          <EditItemModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            selectedItem={this.state.selectedItem}
            editDGPItem={this.editDGPItem}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "MerchantOrderMsgModal" ? (
          <MerchantOrderMsgModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            messageStoreOwnerName={this.state.messageStoreOwnerName}
            handleMerchantOrderMsgSubmit={this.handleMerchantOrderMsgSubmit}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {/*   #############
         *  ###
         *   #############
         *              ###
         *  #############
         */}

        {this.state.isModalShowing &&
        this.state.presentModal === "AddItemToCartModal" ? (
          <AddItemToCartModal
            isModalShowing={this.state.isModalShowing}
            selectedItem={this.state.selectedItemSHOPPING}
            addToCart={this.addToCart}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "EditCartItemModal" ? (
          <EditCartItemModal
            isModalShowing={this.state.isModalShowing}
            selectedCartItemIndex={this.state.selectedCartItemIndex}
            cartItems={this.state.cartItems}
            editCart={this.editCart}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "PlaceOrderModal" ? (
          <PlaceOrderModal
            isLoadingWallet={this.state.isLoadingWallet}
            accountBalance={this.state.accountBalance}
            merchantStoreName={this.state.merchantStoreName}
            isModalShowing={this.state.isModalShowing}
            cartItems={this.state.cartItems}
            placeOrder={this.placeOrder}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "OrderMessageModal" ? (
          <OrderMessageModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            messageStoreOwnerName={this.state.messageStoreOwnerNameSHOPPING}
            handleOrderMessageSubmit={this.handleOrderMessageSubmit}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {/* *         ###   ###
         *          ####   ##
         *         ## ## ###
         *        ##  ####
         *      ###   ### */}

        {this.state.isModalShowing &&
        this.state.presentModal === "CreatePostModal" ? (
          <CreatePostModal
            isModalShowing={this.state.isModalShowing}
            createYourPost={this.createYourPost}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "EditPostModal" ? (
          <EditPostModal
            selectedYourPost={this.state.selectedYourPost}
            editYourPost={this.editYourPost}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "EditEventModal" ? (
          <EditEventModal
            selectedYourPost={this.state.selectedYourPost}
            editYourEvent={this.editYourEvent}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "PostModal" ? (
          <PostModal
            //MUST ALSO ADD THINGS NEEDED FOR THE DSO DM =>

            //submitDSODM
            // isLoadingDSODM
            // an array of sent msgs
            // no edit ability -> go to DSO for that... or do later

            selectedSearchedPost={this.state.selectedSearchedPost}
            selectedSearchedPostNameDoc={this.state.selectedSearchedPostNameDoc}
            whichNetwork={this.state.whichNetwork}
            DataContractDGR={this.state.DataContractDGR}
            DataContractDPNS={this.state.DataContractDPNS}
            DataContractDGP={this.state.DataContractDGP}
            isLoggedIn={this.state.isLoggedIn}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "EventModal" ? (
          <EventModal
            selectedSearchedEvent={this.state.selectedSearchedPost}
            selectedSearchedEventNameDoc={
              this.state.selectedSearchedPostNameDoc
            }
            //isLoggedIn={this.state.isLoggedIn}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            isLoginComplete={isLoginComplete}
            dgtInvitesForEvents={this.state.dgtInvitesForEvents}
            isLoadingGroups={this.state.isLoadingGroups}
            isLoadingGroupEvents={this.state.isLoadingGroupEvents}
            handleSelectedJoinGroup={this.handleSelectedJoinGroup}
          />
        ) : (
          <></>
        )}
        {/* *   ################
         *      ###
         *      ################
         *      ###
         *      ################            */}

        {this.state.isModalShowing &&
        this.state.presentModal === "CreateOfferModal" ? (
          <CreateOfferModal
            isModalShowing={this.state.isModalShowing}
            createYourOffer={this.createYourOffer}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "EditOfferModal" ? (
          <EditOfferModal
            selectedYourOffer={this.state.selectedYourOffer}
            editYourOffer={this.editYourOffer}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "OfferModal" ? (
          <OfferModal
            selectedSearchedOffer={this.state.selectedSearchedOffer}
            selectedSearchedOfferNameDoc={
              this.state.selectedSearchedOfferNameDoc
            }
            whichNetwork={this.state.whichNetwork}
            DataContractDGR={this.state.DataContractDGR}
            DataContractDPNS={this.state.DataContractDPNS}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "DeleteOfferModal" ? (
          <DeleteOfferModal
            selectedYourOffer={this.state.selectedYourOffer}
            uniqueName={this.state.uniqueName}
            deleteYourOffer={this.deleteYourOffer}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

        {/* *   ################
         *      ###          ####
         *      ################
         *      ###          ####
         *      ###           #### */}

        {this.state.isModalShowing &&
        this.state.presentModal === "CreateReviewModal" ? (
          <CreateReviewModal
            isModalShowing={this.state.isModalShowing}
            createReview={this.createReview}
            SearchedNameDoc={this.state.SearchedNameDoc}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "EditReviewModal" ? (
          <EditReviewModal
            reviewToEdit={this.state.reviewToEdit}
            SearchedNameDoc={this.state.SearchedNameDoc}
            editReview={this.editReview}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "CreateReplyModal" ? (
          <CreateReplyModal
            replyReview={this.state.replyReview}
            replyingToName={this.state.replyingToName}
            createReply={this.createReply}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "EditReplyModal" ? (
          <EditReplyModal
            replyReview={this.state.replyReview}
            replyToEdit={this.state.replyToEdit}
            replyingToName={this.state.replyingToName}
            editReply={this.editReply}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {/*  ################
         *   ###          ###
         *   ################
         *   ###
         *   ###
         */}

        {this.state.isModalShowing &&
        this.state.presentModal === "CreateProofModal" ? (
          <CreateProofModal
            isModalShowing={this.state.isModalShowing}
            createYourProof={this.createYourProof}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "DeleteProofModal" ? (
          <DeleteProofModal
            selectedYourProof={this.state.selectedYourProof}
            uniqueName={this.state.uniqueName}
            deleteYourProof={this.deleteYourProof}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default App;
