/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useCallback } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { GiTwoCoins } from "react-icons/gi";
import Countdown from "react-countdown";
import { AnimatePresence, motion } from "framer-motion";
import {
  WalletDialogProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-material-ui";
import { useWallet, Keypair, useConnection } from "@solana/wallet-adapter-react";
import {
  getAllUsuarios,
  updateNfts,
  updatePoints,
  getUser,
  saveUser,
} from "../utils/firebaseFunctions";
// import { Connection } from "@metaplex/js";
import * as web3 from "@solana/web3.js";

import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import logo from "../img/logo.jpg";
import ProgressBar from "./ProgressBar";
import { PublicKey, Transaction, SystemProgram, SystemInstruction, TransactionInstruction, sendAndConfirmTransaction, LAMPORTS_PER_SOL, Connection, VersionedTransaction, TransactionMessage } from "@solana/web3.js";

// const connection = "https://rpc.helius.xyz/?api-key=4adfbec4-c143-499a-99b6-55d3638d20a4";
const DESTINATION_WALLET = new PublicKey("pip8vrFDZQtsnDp1G8nAKKuZQcmyzyPymaQxntvB5uB");

const connection = "https://bold-dimensional-cherry.solana-mainnet.discover.quiknode.pro/799639d88b167cf50875c768bf65f2ee3a510afb/";
const connect = new Connection(connection);
const SOLANA_CONNECTION = new Connection(connection);
const Profile = () => {
  
  const [{ cartShow, products, dondeestoy }, dispatch] = useStateValue();
  const [scrollValue] = useState(0);
  const [stake, setStake] = useState([]);
  const [select, setSelect] = useState([]);
  const [select2, setSelect2] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [points, setPoints] = useState('');
  const [claimed, setClaimed] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [nfts2, setNfts2] = useState([]);
  const [allusers, setAllUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [currentuser, setCurrUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [msg, setMsg] = useState(true);
  const [sol, setSol] = useState(null);
  let qtyxhr = 10;
  let supply = 5100;
  const [update, setUpdate] = useState();
  let puntoss = 0;
  let thes = 0;
  let thes2 = 0;
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const { publicKey } = useWallet();

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts =
    products && products.slice(firstPostIndex, lastPostIndex);

  const pointsearn2 = (a) => {
    /* let result = 10 */

    thes = thes + a;
  };


  const currentUser = async () => {
    fetch("http://localhost:3003/api/users")
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          setCurrUser(res)
        })
        .catch((err) => console.error(err));
  }


  const fetchnfts = async () => {
    /* const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer 41d5a889-a8e6-4f4d-9183-4d594ca01992'
      },
      body: JSON.stringify({
          ownerAccount: publicKey && publicKey.toBase58(), 
         ownerAccount: 'DwyWVeKQvRTASoNR7nLYwGFiRcGNkWPiiD9Td2YJj3az',
        helloMoonCollectionId: 'aec8c053152b2f1b7dc01db7e298d571',
        page: num
      })
    }; */

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: "Bearer b5ad5dfe-e109-4b7d-945e-b20ba8f7925f",
      },
      body: JSON.stringify({
                ownerAccount: publicKey && publicKey.toBase58(),
/*          ownerAccount: "cHe9jhHZq6A4FVoAZnucyUM33QP9uTHTEQ64WyVqE3n",
 */      }),
    };

    const test = async (b, tokenAddress) => {
      const request = await fetch(b)
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          setNfts((prev) => [
            ...prev,
            { imageUrl: res.image, name: res.name, tokenAddress: tokenAddress },
          ]);
          setNfts2((prev) => [
            ...prev,
            { imageUrl: res.image, name: res.name, tokenAddress: tokenAddress },
          ]);
        });
    };
    fetch(
      "https://rest-api.hellomoon.io/v0/hello-moon/thesmorphia/owners",
      options
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);

        res.data.map((a) => {
          /* setNfts((prev) => [...prev, a])
        setNfts2((prev) => [...prev, a]) */
          test(a.metadatajson.uri, a.mint);
        });
      })
      .catch((err) => console.error(err));

    /*  const body = {
      method: "qn_fetchNFTs",
      params: {
        wallet: publicKey && publicKey.toBase58(),
             wallet: "FKTA8fh6rhirjgjusihA2ctu6nKYdyWnHE95wqnEG3qq", 
        
     
        page: num,
        perPage: 40,
        omitFields: ['collectionName','traits','creators','provenance','network','chain']

      },
    };

    const options = {
      method: "POST",
      body: JSON.stringify(body),
    };
    const endpoints = [
      "https://evocative-orbital-forest.solana-mainnet.quiknode.pro/3a94816de54b8d84cb4122fc520302b9d204260a/",
      "https://newest-delicate-dust.solana-mainnet.quiknode.pro/cef8f3a8203547eb69213067965a2c7b2a6da64d/",
      "https://billowing-virulent-gas.solana-mainnet.quiknode.pro/cd78f9ac76e21ebc9a89b54ff106a19bff9ebdb9/",
      "https://hidden-autumn-voice.solana-mainnet.quiknode.pro/a519e278a8928f5b2b64469b1839ecbb216c35c5/",
      "https://ancient-crimson-slug.solana-mainnet.quiknode.pro/f92fc31cc8ef023d25c0c6a1e234ed5a539c9c52/",
      "https://evocative-orbital-forest.solana-mainnet.quiknode.pro/3a94816de54b8d84cb4122fc520302b9d204260a/",
      "https://newest-delicate-dust.solana-mainnet.quiknode.pro/cef8f3a8203547eb69213067965a2c7b2a6da64d/",
      "https://billowing-virulent-gas.solana-mainnet.quiknode.pro/cd78f9ac76e21ebc9a89b54ff106a19bff9ebdb9/",
      "https://hidden-autumn-voice.solana-mainnet.quiknode.pro/a519e278a8928f5b2b64469b1839ecbb216c35c5/",
      "https://ancient-crimson-slug.solana-mainnet.quiknode.pro/f92fc31cc8ef023d25c0c6a1e234ed5a539c9c52/",
      "https://evocative-orbital-forest.solana-mainnet.quiknode.pro/3a94816de54b8d84cb4122fc520302b9d204260a/",
      "https://newest-delicate-dust.solana-mainnet.quiknode.pro/cef8f3a8203547eb69213067965a2c7b2a6da64d/",
      "https://billowing-virulent-gas.solana-mainnet.quiknode.pro/cd78f9ac76e21ebc9a89b54ff106a19bff9ebdb9/",
      "https://hidden-autumn-voice.solana-mainnet.quiknode.pro/a519e278a8928f5b2b64469b1839ecbb216c35c5/",
      "https://ancient-crimson-slug.solana-mainnet.quiknode.pro/f92fc31cc8ef023d25c0c6a1e234ed5a539c9c52/",
      "https://evocative-orbital-forest.solana-mainnet.quiknode.pro/3a94816de54b8d84cb4122fc520302b9d204260a/",
      "https://newest-delicate-dust.solana-mainnet.quiknode.pro/cef8f3a8203547eb69213067965a2c7b2a6da64d/",
      "https://billowing-virulent-gas.solana-mainnet.quiknode.pro/cd78f9ac76e21ebc9a89b54ff106a19bff9ebdb9/",
      "https://hidden-autumn-voice.solana-mainnet.quiknode.pro/a519e278a8928f5b2b64469b1839ecbb216c35c5/",
      "https://ancient-crimson-slug.solana-mainnet.quiknode.pro/f92fc31cc8ef023d25c0c6a1e234ed5a539c9c52/",
      "https://evocative-orbital-forest.solana-mainnet.quiknode.pro/3a94816de54b8d84cb4122fc520302b9d204260a/",
      "https://newest-delicate-dust.solana-mainnet.quiknode.pro/cef8f3a8203547eb69213067965a2c7b2a6da64d/",
      "https://billowing-virulent-gas.solana-mainnet.quiknode.pro/cd78f9ac76e21ebc9a89b54ff106a19bff9ebdb9/",
      "https://hidden-autumn-voice.solana-mainnet.quiknode.pro/a519e278a8928f5b2b64469b1839ecbb216c35c5/",
      "https://ancient-crimson-slug.solana-mainnet.quiknode.pro/f92fc31cc8ef023d25c0c6a1e234ed5a539c9c52/",
    ];

    return await fetch(endpoints[num], options)
      .then((res) => res.json())
      .then((res) => {
        return (
          res &&
          res.result &&
          res.result.assets
            .filter(
              (b) =>
                b.collectionAddress ===
                "HNvbqajUp8tYYRRBwm4cqeRQRbahLLTSLdvgi6QzM4cB"
            ) .map((a) => {
              setNfts((prev) => [...prev, a]);
              setNfts2((prev) => [...prev, a]);
            })
        );
      }); */
  };

  const checkuser = async (a) => {
    const res = await getUser(a);
    if (res) {
      return res;
    } else {
      const dataa = {
        id: publicKey && publicKey.toBase58(),
        snapshot: `${Date.now()}`,
        nickname: "test",
        points: 0,
        twitter: null,
        discord: null,
        staked: [],
      };
      saveUser(dataa);

      return await getUser(a);
    }
  };

  useEffect(() => {
    const first = async () => {
      setAllUsers(await getAllUsuarios());
    };
    first();
    const asd = async () => {
      const test2 = await checkuser(publicKey && publicKey.toBase58());
      setUser(test2);
      setStake(test2.staked);
      setNfts([]);
      setNfts2([]);
      fetchnfts();
      currentUser([])
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    };

    /*  allusers &&
      allusers.map((a) => {
        const dataa = {
          id: a.id,
          staked: [],
          snapshot: `${Date.now()}`,
        };
        updateNfts(dataa);
      }); */

    setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 1000);

    publicKey ? asd() : setLoading(false);
  }, [publicKey, claimed]);

  const updatestake = (a) => {
    let result = [];

    a &&
      a.forEach((e) =>
        nfts2.find((f) => f.tokenAddress === e.tokenAddress)
          ? result.push(e)
          : null
      );
    return result;
  };


const calcPoints = (sol) => {
    setSol(sol)
    console.log(sol * 1000)
    setPoints(sol * 1000)
}

const pointer = (sol) => {
    calcPoints(sol)
}
 
  const [progress, setProgress] = useState(0);

  
  const instructions = [
    SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: DESTINATION_WALLET,
        lamports: 0.0001 * LAMPORTS_PER_SOL,
    })
  ]
  
  async function createAndSendV0Tx(ix) {
  
   
    // Step 1 - Fetch Latest Blockhash
    let latestBlockhash = await SOLANA_CONNECTION.getLatestBlockhash('confirmed');
    console.log("   ✅ - Fetched latest blockhash. Last Valid Height:", latestBlockhash.lastValidBlockHeight);

    // Step 2 - Generate Transaction Message
    const messageV0 = new TransactionMessage({
        payerKey: publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        ix
    }).compileToV0Message();
    console.log(messageV0)
    console.log("   ✅ - Compiled Transaction Message");
    const transaction = new VersionedTransaction(messageV0);

    // Step 3 - Sign your transaction with the required `Signers`
    transaction.sign([publicKey]);
    console.log("   ✅ - Transaction Signed");

    // Step 4 - Send our v0 transaction to the cluster
    const txid = await SOLANA_CONNECTION.sendTransaction(transaction, { maxRetries: 5 });
    console.log("   ✅ - Transaction sent to network - " + txid);

    // Step 5 - Confirm Transaction 
    const confirmation = await SOLANA_CONNECTION.confirmTransaction({
        signature: txid,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
    })
    if (confirmation.value.err) { throw new Error("   ❌ - Transaction not confirmed.") }
    console.log('🎉 Transaction Succesfully Confirmed!', '\n', `https://explorer.solana.com/tx/${txid}?cluster=devnet`);
}





const handleSubmit = (event) => {
  console.log(sol)

  console.log(instructions)
  createAndSendV0Tx(instructions);

  };


  const handleChange = (event) => {

    const { value } = event.target;
    setSol(value)
    let totpoints = value * 1000
    setPoints(totpoints)

  }


  return (
    <div className="w-full flex overflow-auto h-[80vh] md:px-40 mt-4  ">
      <div className="flex flex-col w-full h-full ">
        {loading ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-screen flex h-screen bg-tesmo z-[8000] left-0 top-0 justify-center items-center flex-col fixed"
              role="status"
            >
              <img src={logo} alt="logo" className="w-20" />
              <svg
                aria-hidden="true"
                className="inline w-24 h-24 text-gray-200 animate-spin dark:text-tesmo fill-tesmo2 absolute"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </motion.div>
          </AnimatePresence>
        ) : (
          <>
            {/* <div className="px-4 md:px-0">
              <div className="w-full  flex items-center flex-col gap-2 mb-4 bg-tesmo bg-opacity-80 rounded-lg px-4 py-2 shadow-purple-700 shadow-lg">
               <h2>Sample</h2>
               </div>
            </div> */}
            <div className="flex justify-center items-center content-center w-full bg-tesmo bg-opacity-80 rounded-lg px-4 py-2 shadow-purple-700 shadow-lg">
              <div className="w-full h-full px-4 md:px-0 flex flex-col md:flex-row gap-10 ">
                <div className="flex flex-col w-full ">
               {currentuser.map((item) => (
                   <div>
                        <div className="flex flex-col w-full ">
                            <img src={item.pfp} className="rounded-2xl w-2/5" />
                        </div>
                            <h2 className="text-gray-100 text-xl">Username: {item.nickname}</h2>
                            <h2 className="text-gray-100 text-xl">Points: {Math.round(item.points)}</h2>
                    </div>
                ))}
                 
                </div>
                <div className="flex flex-col w-full ">
                    <button onClick={handleSubmit} disabled={!publicKey}>
                      Send 1 lamport to a random address!
                    </button>
               <form className="flex flex-col  " onSubmit={handleSubmit}>
                    <label className="text-white font-bold p-2" htmlFor="sol">
                        <h1 className="text-2xl">Load Up Points</h1>
                    </label>
                    <input
                    type="number"
                    id="sol"
                    // onChange={(e) => handleChange(e.target.value)}
                    onChange={handleChange}
                    className="text-white bg-tesmo2 p-2 rounded-lg test-white font-bold"
                    placeholder="Enter SOL Amount"
                    required
                    />
                    <label className="text-white font-bold p-2" htmlFor="sol">
                        <h1 className="text-2xl">{points} Points</h1>
                    </label>
                    <a onClick={handleSubmit}>Send</a>
                    <button className="bg-violet-500 p-2 rounded-lg mt-4 mb-2" type="submit">
                        Lock & Load!!
                    </button>
                </form>

                  
                </div>

             
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
