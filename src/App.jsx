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

import WalletPage from "./Components/3-Wallet/WalletPage";

import NearbyPage from "./Components/5-NearBy/NearbyPage";

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

import ConfirmAddrPaymentModal from "./Components/3-Wallet/ConfirmAddrPaymentModal";
import RegisterDGMModal from "./Components/RegisterDGMModal";
import ThreadModal_WALLET from "./Components/3-Wallet/ThreadModal_WALLET";

import PostModal from "./Components/5-NearBy/PostModal";
import CreatePostModal from "./Components/5-NearBy/YourPosts/CreatePostModal";
import EditPostModal from "./Components/5-NearBy/YourPosts/EditPostModal";

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

      //##### INITIAL POSTS ######

      InitialNearby1: false,
      InitialNearby2: false,
      InitialNearby3: false,
      InitialNearby4: false,
      InitialNearby5: false,

      InitialOffRentPosts: [],
      InitialOffRentNames: [],

      InitialOffBizPosts: [],
      InitialOffBizNames: [],

      InitialOffOtherPosts: [],
      InitialOffOtherNames: [],

      InitialLookRentPosts: [],
      InitialLookRentNames: [],

      InitialLookOtherPosts: [],
      InitialLookOtherNames: [],
      //^^^^^ INITIAL POSTS ^^^^^

      //##### Search POSTS ######

      SearchNearby1: false,
      SearchNearby2: false,
      SearchNearby3: false,
      SearchNearby4: false,
      SearchNearby5: false,

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

      SearchNearby1: false,
      SearchNearby2: false,

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

      walletId: "",
      mostRecentLogin: false,
      platformLogin: false, //Will this be used? -> check ->
      LocalForageKeys: [],

      skipSynchronizationBeforeHeight: 905000,
      mostRecentBlockHeight: 905000,

      DataContractDSO: "3djpLuabDgYeXY7RhT6by5VuvrLtn8wnNQTF3J4wz4fn",
      DataContractDGM: "4PUQmGdGLLWwTFntgwEDhJWzUKoKqbSKanjVGTi2Fbcj",
      DataContractDGP: "785cZo4ok3DgyCJKsg4NPwuFmdDdcbp1hZKBW5b4SZ97",
      DataContractDMIO: "931HGHM5fMrRegVe3998hHcBAft1p8d9sWynfGnKxkw2",
      DataContractDGR: "5C8ZwmirWwqsMk7EguTf2p2RHa1cD9z3hrR29quE92ug",
      DataContractPOD: "9umPSgjEukfYiygXCMW7zfUVuHTFJSm7VAzbX6rwJgT9",
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
      this.setState({
        mode: "dark",
      });
    else {
      this.setState({
        mode: "primary",
      });
    }
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

        //##### INITIAL POSTS ######

        InitialNearby1: false,
        InitialNearby2: false,
        InitialNearby3: false,
        InitialNearby4: false,
        InitialNearby5: false,

        InitialOffRentPosts: [],
        InitialOffRentNames: [],

        InitialOffBizPosts: [],
        InitialOffBizNames: [],

        InitialOffOtherPosts: [],
        InitialOffOtherNames: [],

        InitialLookRentPosts: [],
        InitialLookRentNames: [],

        InitialLookOtherPosts: [],
        InitialLookOtherNames: [],
        //^^^^^ INITIAL POSTS ^^^^^

        //##### Search POSTS ######

        SearchNearby1: false,
        SearchNearby2: false,
        SearchNearby3: false,
        SearchNearby4: false,
        SearchNearby5: false,

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

        SearchNearby1: false,
        SearchNearby2: false,

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

        walletId: "",
        mostRecentLogin: false,
        platformLogin: false, //Will this be used? -> check ->
        LocalForageKeys: [],

        skipSynchronizationBeforeHeight: 905000,
        mostRecentBlockHeight: 905000,

        DataContractDSO: "3djpLuabDgYeXY7RhT6by5VuvrLtn8wnNQTF3J4wz4fn",
        DataContractDGM: "4PUQmGdGLLWwTFntgwEDhJWzUKoKqbSKanjVGTi2Fbcj",
        DataContractDGP: "785cZo4ok3DgyCJKsg4NPwuFmdDdcbp1hZKBW5b4SZ97",
        DataContractDMIO: "931HGHM5fMrRegVe3998hHcBAft1p8d9sWynfGnKxkw2",
        DataContractDGR: "5C8ZwmirWwqsMk7EguTf2p2RHa1cD9z3hrR29quE92ug",
        DataContractPOD: "9umPSgjEukfYiygXCMW7zfUVuHTFJSm7VAzbX6rwJgT9",
        DataContractDPNS: "GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec",

        expandedTopNav: false,
      },
      () => this.componentDidMount()
    );
  };

  componentDidMount() {
    this.getDSOEveryoneDocs();
    this.getInitialPosts();
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
  } //FIX THIS^^^

  //ACCOUNT LOGIN FUNCTIONS => SIMPLE LOGIN FIRST
  triggerNameLoading = () => {
    this.setState({
      isLoadingName: true,
    });
  };

  triggerAliasLoading = () => {
    this.setState({
      isLoadingAlias: true,
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

    // Orders(Shopping),
    //Buyers side ->

    // AND MyStore or Your Store?? for the TX component
    //Merchant side ->
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
   */

  //MESSAGES FUNCTIONS^^^^^
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
      setInterval(() => this.autoUpdateEveryoneHelper(), 30000);
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

      setInterval(() => this.autoUpdateForYouHelper(), 30000);
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
            //this.state.mostRecentBlockHeight,
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
        "DSOContract.dsomsg", /// I changed .note TO .dsomessage***
        identity,
        docProperties
      );

      console.log(dsoDocument.toJSON());

      console.log("OwnerIdArray of Tags: ", ownerIdArray);

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

      const tagBatch = {
        create: dsoTags, // Document(s) to create
      };

      await platform.documents.broadcast(msgBatch, identity);

      if (ownerIdArray.length !== 0) {
        await platform.documents.broadcast(tagBatch, identity);
      }

      return [dsoDocument];
    };

    submitDocuments()
      .then((d) => {
        //Returns array!!! ->
        // let returnedDoc = d.toJSON();
        // console.log("MSG Documents JSON:\n", returnedDoc);

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
            //this.state.mostRecentBlockHeight,
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

  //check how this is handled
  // // TOP UP
  // doTopUpIdentity = (numOfCredits) => {
  //   this.setState({
  //     isLoadingWallet: true,
  //   });
  //   const clientOpts = {
  //     network: this.state.whichNetwork,
  //     wallet: {
  //       mnemonic: this.state.mnemonic,
  //       adapter: LocalForage.createInstance,
  //       unsafeOptions: {
  //         skipSynchronizationBeforeHeight:
  //           this.state.skipSynchronizationBeforeHeight,
  //       },
  //     },
  //   };
  //   const client = new Dash.Client(clientOpts);

  //   const topupIdentity = async () => {
  //     const identityId = this.state.identity; // Your identity ID
  //     const topUpAmount = numOfCredits; // Number of duffs ie 1000

  //     await client.platform.identities.topUp(identityId, topUpAmount);
  //     return client.platform.identities.get(identityId);
  //   };

  //   topupIdentity()
  //     .then((d) => {
  //       console.log("Identity credit balance: ", d.balance);
  //       this.setState({
  //         identityInfo: d.toJSON(),
  //         identityRaw: d,
  //         isLoadingWallet: false,
  //         accountBalance: this.state.accountBalance - 1000000,
  //       });
  //     })
  //     .catch((e) => {
  //       console.error("Something went wrong:\n", e);
  //       this.setState({
  //         isLoadingWallet: false,
  //         topUpError: true, //Add to State and handle ->
  //       });
  //     })
  //     .finally(() => client.disconnect());
  // };

  //ALSO RECALL THE IDENTITY SO THAT IT WILL UPDATE THE CREDITS

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
    let docArray = this.state.ByYouMsgs;

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

  //MESSAGES FUNCTIONS^^^^

  /**

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
  ///In betweeen
  //GROUP FUNCTIONS^^^^
  /**
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
          console.log("address:\n", n.toJSON());
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
      isLoadingRefresh_Wallet: true,
      isLoadingButtons_Wallet: true,
      Wallet_sendSuccess: false,
      Wallet_sendFailure: false,
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
      this.state.Refresh1 &&
      this.state.Refresh2 &&
      this.state.Refresh3 &&
      this.state.Refresh4 &&
      this.state.Refresh5 &&
      this.state.Refresh6
    ) {
      this.setState({
        ByYouMsgs: this.state.RefreshByYouMsgs,
        ByYouNames: this.state.RefreshByYouNames,
        ByYouThreads: this.state.RefreshByYouThreads,

        ToYouMsgs: this.state.RefreshToYouMsgs,
        ToYouNames: this.state.RefreshToYouNames,
        ToYouThreads: this.state.RefreshToYouThreads,

        identityInfo: this.state.RefreshIdentityInfo,
        identityRaw: this.state.RefreshIdentityRaw,

        isLoadingWallet: false,
        isLoadingRefresh: false,
        isLoadingButtons: false,

        Refresh1: false,
        Refresh2: false,
        Refresh3: false,
        Refresh4: false,
        Refresh5: false,
        Refresh6: false,
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
            Refresh6: true,
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
            RefreshIdentityInfo: idInfo,
            RefreshIdentityRaw: d,
            Refresh5: true,
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
              Refresh1: true,
              Refresh2: true,
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
            RefreshByYouNames: nameDocArray,
            RefreshByYouMsgs: docArray,
            Refresh1: true,
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
              Refresh2: true,
            },
            () => this.checkRefreshRace()
          );
        } else {
          //this.getRefreshByYouThreadsNames(docArray); //Name Retrieval
          this.setState(
            {
              RefreshByYouThreads: docArray,
              Refresh2: true,
            },
            () => this.checkRefreshRace()
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong RefreshByYouThreads:\n", e);
        this.setState({
          RefreshByYouThreadsError: true, //handle error ->
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
              Refresh3: true,
              Refresh4: true,
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
            RefreshToYouNames: nameDocArray,
            RefreshToYouMsgs: docArray,
            Refresh3: true,
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
              Refresh4: true,
            },
            () => this.checkRefreshRace()
          );
        } else {
          this.setState(
            {
              RefreshToYouThreads: docArray,
              Refresh4: true,
            },
            () => this.checkRefreshRace()
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong RefreshToYouThreads:\n", e);
        this.setState({
          RefreshByYouThreadsError: true, //handle error ->
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
      console.log("Called Query DGM Addresses.");

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
            console.log("Addr Doc:\n", returnedDoc);

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
        WALLET_Login1: false,
        WALLET_Login2: false,
        WALLET_Login3: false,
        WALLET_Login4: false,
        // WALLET_Login5: false,
        // WALLET_Login6: false,
        WALLET_Login7: false,
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
      await platform.documents.broadcast(documentBatch, identity);
      return dgmDocument;
    };

    submitNoteDocument()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Document:\n", returnedDoc);

        this.setState({
          dgmDocuments: [returnedDoc],
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

  //WALLET FUNCTIONS^^^^
  /**
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

  //YOUR STORE FUNCTIONS^^^^
  /**
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
    this.setState({
      InitialPullNearBy: false,
    });
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
    this.setState({
      selectedCategoryButton: clickedButton,
    });
  };

  // ^^^^ 5 BUTTONS below form

  handleYourPost = (index) => {
    this.setState(
      {
        selectedYourPost: this.state.yourPostsToDisplay[index],
        //I also need the name <- NOT FOR MY POSTS -> GET IT TOGETHER - nOICE
        selectedYourPostIndex: index, //<- Need this for the editingfunction!!
      },
      () => this.showModal("EditPostModal")
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

  getYourPosts = (theIdentity) => {
    //console.log("Calling getInitialOffRent");

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
    this.getInitialOffRent();
    this.getInitialOffBiz();
    this.getInitialOffOther();
    this.getInitialLookRent();
    this.getInitialLookOther();
  };

  checkInitialRace = () => {
    if (
      this.state.InitialNearby1 &&
      this.state.InitialNearby2 &&
      this.state.InitialNearby3 &&
      this.state.InitialNearby4 &&
      this.state.InitialNearby5
    ) {
      this.setState({
        OffRentPosts: this.state.InitialOffRentPosts,
        OffRentNames: this.state.InitialOffRentNames,

        OffBizPosts: this.state.InitialOffBizPosts,
        OffBizNames: this.state.InitialOffBizNames,

        OffOtherPosts: this.state.InitialOffOtherPosts,
        OffOtherNames: this.state.InitialOffOtherNames,

        LookRentPosts: this.state.InitialLookRentPosts,
        LookRentNames: this.state.InitialLookRentNames,

        LookOtherPosts: this.state.InitialLookOtherPosts,
        LookOtherNames: this.state.InitialLookOtherNames,

        //I DONT NEED ^^ BECAUSE INITIAL SHOULD PULL AUTOMATICALLY!! well actually I do.. I need to push the initials to the display..

        isLoadingNearbyInitial: false,
      });
    }
  };

  getInitialOffRent = () => {
    // console.log("Calling getInitialOffRent");

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
          ["category", "==", "offrent"], // offrent, offbiz, offother, lookrent, lookother
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          // console.log("There are no InitialOffRent");

          this.setState(
            {
              InitialNearby1: true,
            },
            () => this.checkInitialRace()
          );
        } else {
          let docArray = [];
          //console.log("Getting ForyouByyouMsgs");
          for (const n of d) {
            //console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
          this.getInitialOffRentNames(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getInitialOffRentNames = (docArray) => {
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
            InitialOffRentNames: nameDocArray,
            InitialOffRentPosts: docArray,
            InitialNearby1: true,
          },
          () => this.checkInitialRace()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong getting Initial OffRent Names:\n",
          e
        );
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
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
          //console.log("There are no ForyouByyouMsgs");

          this.setState(
            {
              InitialNearby2: true,
            },
            () => this.checkInitialRace()
          );
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

        this.setState(
          {
            InitialOffBizNames: nameDocArray,
            InitialOffBizPosts: docArray,
            InitialNearby2: true,
          },
          () => this.checkInitialRace()
        );
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

  getInitialOffOther = () => {
    //console.log("Calling getInitialOffOther");

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
          ["category", "==", "offother"], // offrent, offbiz, offother, lookrent, lookother
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no InitialOffOther");

          this.setState(
            {
              InitialNearby3: true,
            },
            () => this.checkInitialRace()
          );
        } else {
          let docArray = [];
          //console.log("Getting InitialOffOther");
          for (const n of d) {
            //console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
          this.getInitialOffOtherNames(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getInitialOffOtherNames = (docArray) => {
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

        this.setState(
          {
            InitialOffOtherNames: nameDocArray,
            InitialOffOtherPosts: docArray,
            InitialNearby3: true,
          },
          () => this.checkInitialRace()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong getting Initial OffOther Names:\n",
          e
        );
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  getInitialLookRent = () => {
    //console.log("Calling getInitialLookRent");

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
          ["category", "==", "lookrent"], // offrent, offbiz, offother, lookrent, lookother
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no Initial LookRent Posts");

          this.setState(
            {
              InitialNearby4: true,
            },
            () => this.checkInitialRace()
          );
        } else {
          let docArray = [];
          //console.log("Getting Initial LookRent Posts");
          for (const n of d) {
            //console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
          this.getInitialLookRentNames(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getInitialLookRentNames = (docArray) => {
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

    //console.log("Calling InitialLookRentNames");

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
            InitialLookRentNames: nameDocArray,
            InitialLookRentPosts: docArray,
            InitialNearby4: true,
          },
          () => this.checkInitialRace()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong getting Initial LookRent Names:\n",
          e
        );
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  getInitialLookOther = () => {
    //console.log("Calling getInitialLookOther");

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
          ["category", "==", "lookother"], // offrent, offbiz, offother, lookrent, lookother
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no Initial LookOther Posts");

          this.setState(
            {
              InitialNearby5: true,
            },
            () => this.checkInitialRace()
          );
        } else {
          let docArray = [];
          //console.log("Getting Initial LookOther Posts");
          for (const n of d) {
            //console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
          this.getInitialLookOtherNames(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getInitialLookOtherNames = (docArray) => {
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
        orderBy: [["records.dashUniqueIdentityId", "desc"]],
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
            InitialLookOtherNames: nameDocArray,
            InitialLookOtherPosts: docArray,
            InitialNearby5: true,
          },
          () => this.checkInitialRace()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong getting Initial LookOther Names:\n",
          e
        );
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  //This one will be interesting bc I am goin to construct the query and then pass it to each of the functions this will save about 3 or 4 different

  constructQueryThenSearch = () => {
    this.setState({
      isLoadingNearbySearch: true,
      isLoadingNearbyForm: true,
    });

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

    if (this.state.cityInput !== "") {
      whereArray.push(["city", "==", this.state.cityInput.toLocaleLowerCase()]); //push adds to end!
    }

    if (this.state.countryRegionInput !== "") {
      if (this.state.whichCountryRegion === "Country") {
        whereArray.push([
          "country",
          "==",
          this.state.countryRegionInput.toLocaleLowerCase(),
        ]);
      }
      if (this.state.whichCountryRegion === "Region") {
        whereArray.push([
          "region",
          "==",
          this.state.countryRegionInput.toLocaleLowerCase(),
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

    console.log(queryObject);

    this.getOffRent(queryObject, categoryIndex);
    this.getOffBiz(queryObject, categoryIndex);
    this.getOffOther(queryObject, categoryIndex);
    this.getLookRent(queryObject, categoryIndex);
    this.getLookOther(queryObject, categoryIndex);
  };

  searchNearbyRace = () => {
    if (
      this.state.SearchNearby1 &&
      this.state.SearchNearby2 &&
      this.state.SearchNearby3 &&
      this.state.SearchNearby4 &&
      this.state.SearchNearby5
    ) {
      this.setState({
        SearchNearby1: false,
        SearchNearby2: false,
        SearchNearby3: false,
        SearchNearby4: false,
        SearchNearby5: false,

        isLoadingNearbySearch: false,
        isLoadingNearbyForm: false,
      });
    }
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

          this.setState(
            {
              OffRentPosts: [],
              SearchNearby1: true,
            },
            () => this.searchNearbyRace()
          );
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

        this.setState(
          {
            OffRentNames: nameDocArray,
            OffRentPosts: docArray,
            SearchNearby1: true,
          },
          () => this.searchNearbyRace()
        );
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

          this.setState(
            {
              OffBizPosts: [],
              SearchNearby2: true,
            },
            () => this.searchNearbyRace()
          );
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

        this.setState(
          {
            OffBizNames: nameDocArray,
            OffBizPosts: docArray,
            SearchNearby2: true,
          },
          () => this.searchNearbyRace()
        );
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

          this.setState(
            {
              SearchNearby3: true,
              OffOtherPosts: [],
            },
            () => this.searchNearbyRace()
          );
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

        this.setState(
          {
            OffOtherNames: nameDocArray,
            OffOtherPosts: docArray,
            SearchNearby3: true,
          },
          () => this.searchNearbyRace()
        );
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

          this.setState(
            {
              SearchNearby4: true,
              LookRentPosts: [],
            },
            () => this.searchNearbyRace()
          );
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

        this.setState(
          {
            LookRentNames: nameDocArray,
            LookRentPosts: docArray,
            SearchNearby4: true,
          },
          () => this.searchNearbyRace()
        );
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

          this.setState(
            {
              SearchNearby5: true,
              LookOtherPosts: [],
            },
            () => this.searchNearbyRace()
          );
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

        this.setState(
          {
            LookOtherNames: nameDocArray,
            LookOtherPosts: docArray,
            SearchNearby5: true,
          },
          () => this.searchNearbyRace()
        );
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

      const postProperties = {
        city: postObject.city, //.toLocaleLowerCase() <- done in modal
        region: postObject.region,
        country: postObject.country,

        description: postObject.description,
        category: postObject.category,
        link: postObject.link,

        active: postObject.active,
        dgp: postObject.dgp,
      };
      //console.log('Post to Create: ', postProperties);

      // Create the note document
      const dmioDocument = await platform.documents.create(
        "DMIOContract.dmiopost",
        identity,
        postProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      // return dmioDocument;

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

          active: postObject.active,
          dgp: postObject.dgp,
        };

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

  //NEAR BY FUNCTIONS^^^^
  /**
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

  //SHOPPING FUNCTIONS^^^^
  /**
   *                             #############
   *                            ###
   *                             #############
   *                                        ###
   *                             #############
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

  //REVIEWS FUNCTIONS^^^^

  /**
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
    //console.log("Calling getInitialOffRent");

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
   *
   */

  //PROOF OF FUNDS FUNCTIONS^^^^

  //https://github.com/dashpay/platform/blob/v1.0-dev/packages/js-dash-sdk/src/SDK/Client/Platform/methods/identities/creditTransfer.ts
  // see above ^^^
  sendFrontendFee = () => {
    this.setState({
      isLoadingIdInfo: true,
      isLoadingCreditTransfer: true, // Add to state
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
      const identity = this.state.identityRaw; //YourIdentity
      const recipientId = import.meta.env.VITE_IDENTITY_TO_RECEIVE_FEE; //.env input
      const feeAmount = //1,000,000 duffs * 1000 to credits * .01 for %
        (
          10000000 * import.meta.env.VITE_FEE_AMOUNT_AS_PERCENT_OF_A_TOPUP
        ).toFixed(0);

      console.log(feeAmount);

      //convert %of topup to credits? or duff? GO With Credits
      // Also may need to remove decimals so ...

      //Identifier.from(returnedDoc.msgId,"base64").toJSON();

      // let identityBuffer = await client.platform.identities.get(
      //   this.state.identity
      // );

      //PULL IDENTITY FIRST THEN PLUG INTO THE CREDIT TRANSFER ->

      //384707370
      //10000000
      //

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
        });

        //credit transfer
        // get the identity balance after whatever write function and then set the state.
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingIdInfo: false,
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
                <>
                  <div className="bodytext">
                    <p>
                      This will be a <b>Group Messenger</b> dapp, so you can
                      create and join groups and chat together.
                    </p>
                  </div>
                </>
              ) : (
                <></>
              )}

              {this.state.selectedDapp === "Wallet" ? (
                <>
                  <WalletPage
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
                  <div className="bodytext">
                    <p>
                      Visit{" "}
                      <b>
                        <a
                          rel="noopener noreferrer"
                          target="_blank"
                          href="https://dashgetpaid.com/"
                        >
                          DashGetPaid.com
                        </a>
                      </b>{" "}
                      and use the Merchant Login to experience this
                      functionality.
                    </p>
                  </div>
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
                    constructQueryThenSearch={this.constructQueryThenSearch}
                    selectedCategoryButton={this.state.selectedCategoryButton}
                    handleSelectedCategoryButton={
                      this.handleSelectedCategoryButton
                    }
                    isLoadingNearbySearch={this.state.isLoadingNearbySearch}
                    isLoadingNearbyInitial={this.state.isLoadingNearbyInitial}
                    OffRentPosts={this.state.OffRentPosts}
                    OffBizPosts={this.state.OffBizPosts}
                    OffOtherPosts={this.state.OffOtherPosts}
                    LookRentPosts={this.state.LookRentPosts}
                    LookOtherPosts={this.state.LookOtherPosts}
                    handleSearchedPost={this.handleSearchedPost}
                    OffRentNames={this.state.OffRentNames}
                    OffBizNames={this.state.OffBizNames}
                    OffOtherNames={this.state.OffOtherNames}
                    LookRentNames={this.state.LookRentNames}
                    LookOtherNames={this.state.LookOtherNames}
                    yourPostsToDisplay={this.state.yourPostsToDisplay}
                    handleYourPost={this.handleYourPost}
                    isLoadingYourPosts={this.state.isLoadingYourPosts}
                  />
                </>
              ) : (
                <></>
              )}

              {this.state.selectedDapp === "Shopping" ? (
                <>
                  <div className="bodytext">
                    <p>
                      Visit{" "}
                      <b>
                        <a
                          rel="noopener noreferrer"
                          target="_blank"
                          href="https://dashgetpaid.com/"
                        >
                          DashGetPaid.com
                        </a>
                      </b>{" "}
                      and use the Buyer Login to experience this functionality.
                    </p>
                  </div>
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
            hideModal={this.hideModal}
            sendFrontendFee={this.sendFrontendFee}
            isLoginComplete={isLoginComplete}
            mode={this.state.mode}
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

        {this.state.isModalShowing &&
        this.state.presentModal === "WalletTXModal" ? (
          <WalletTXModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            accountHistory={this.state.accountHistory}
            accountBalance={this.state.accountBalance}
            WALLET_addresses={this.state.WALLET_addresses}
            ByYouMsgs={this.state.WALLET_ByYouMsgs}
            ByYouNames={this.state.WALLET_ByYouNames}
            ToYouMsgs={this.state.WALLET_ToYouMsgs}
            ToYouNames={this.state.WALLET_ToYouNames}
            // LoadingOrders={this.state.LoadingOrders}
            // DGPOrders={this.state.DGPOrders}
            // DGPOrdersNames={this.state.DGPOrdersNames}
            isLoadingAddresses_WALLET={this.state.isLoadingAddresses_WALLET}
            isLoadingMsgs={this.state.isLoadingMsgs_WALLET}
            sortedTuples={sortedTuples} // <= WHAT !!!!!!!

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

        {/*   #############
         *  ###
         *   #############
         *              ###
         *  #############
         */}

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
            closeTopNav={this.closeTopNav}
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
