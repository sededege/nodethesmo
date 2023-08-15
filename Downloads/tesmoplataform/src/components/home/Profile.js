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
import {
  useWallet,
  Keypair,
  useConnection,
} from "@solana/wallet-adapter-react";
import {
  getAllUsuarios,
  updateNfts,
  getUser,
  saveUser,
  updatePoints,
} from "../utils/firebaseFunctions";
// import { Connection } from "@metaplex/js";
import * as web3 from "@solana/web3.js";

import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import logo from "../img/logo.jpg";
import ProgressBar from "./ProgressBar";
import {
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Connection,
} from "@solana/web3.js";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const Profile = () => {
  const nodeurl = 'https://nodethesmo.vercel.app'

  const [{ cartShow, products, dondeestoy }, dispatch] = useStateValue();
  const [scrollValue] = useState(0);
  const [stake, setStake] = useState([]);
  const [select, setSelect] = useState([]);
  const [select2, setSelect2] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [points, setPoints] = useState("");
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
  const { publicKey, sendTransaction } = useWallet();

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
        setCurrUser(res);
      })
      .catch((err) => console.error(err));
  };

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
         */
      }),
    };

    const test = async (b, tokenAddress) => {
      const request = await fetch(b)
        .then((response) => response.json())
        .then((res) => {
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
      currentUser([]);
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
  }, [publicKey]);

  const [logged, setLogged] = useState(false);
  const [usermongo, setUserMongo] = useState("");

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
    setSol(sol);
    console.log(sol * 1000);
    setPoints(sol * 1000);
  };

  const pointer = (sol) => {
    calcPoints(sol);
  };

  const [progress, setProgress] = useState(0);

  const [activeTab, setActiveTab] = useState("signup");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const data = [
    {
      nickname: "Test",
      wallet: "8hsBqcv7ZBNqNpgcQPMGqafipYogi6pvfsScBwuWwWfh",
      points: "1234",
    },
  ];
  const [count2, setCount2] = useState(0);

  const UnitCounter = () => {
    const handleIncrement = () => {
      setCount2(count2 + 100);
    };

    const handleDecrement = () => {
      if (count2 > 0) {
        setCount2(count2 - 100);
      }
    };

    const handleInputChange = (event) => {
      const inputValue = event.target.value;
      const newCount = parseInt(inputValue);
      if (!isNaN(newCount)) {
        setCount2(newCount);
      }
    };

    const updatePoints = async () => {
      try {
        const response = await fetch(`${nodeurl}/updatepoints`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: usermongo._id,
            newValue: usermongo.points + count2, // Update the points value as needed
          }),
        });

       

        const res = await response.json();
        if(res) {
          alert("points update");
          setUserMongo(prevUser => ({
            ...prevUser, // Copy the existing user properties
            points: prevUser.points + count2, // Update only the age property
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <div className="gap-2 flex w-full">
        <button
          className="bg-btn text-white p-2 rounded-lg"
          onClick={() => handleDecrement()}
        >
          -
        </button>
        <input
          className="w-[60px] text-center bg-transparent border-2 border-slate-500 rounded-lg text-white mx-auto"
          type="text"
          value={count2}
          onChange={(e) => handleInputChange(e)}
        />
        <button
          className="bg-btn text-white p-2 rounded-lg"
          onClick={() => handleIncrement()}
        >
          +
        </button>
        <button
       onClick={() => sendSol(count2)} 
         /*  onClick={updatePoints} */
          className="bg-yellow-300 text-tesmo font-semibold hover:bg-tesmo2 border-2 border-yellow-300 hover:border-tesmo2 hover:text-white w-full rounded-lg text-center p-2 cursor-pointer"
        >
          Buy with Sol
        </button>
      </div>
    );
  };

  const connection = new web3.Connection(
    "https://rpc.hellomoon.io/b5ad5dfe-e109-4b7d-945e-b20ba8f7925f",
    "confirmed"
  );

  const sendSol = (count2) => {
    if (!connection || !publicKey) {
      return;
    }
    const transaction = new web3.Transaction();

    const recipientPubKey = new web3.PublicKey(
      "cTkZEfSvm2bkDrxejQemEp7bdQtLgRAUwGqt56Eai1w"
    );

    const sendSolInstruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: recipientPubKey,
      lamports: (LAMPORTS_PER_SOL * count2) / 1000,
      /*       lamports: LAMPORTS_PER_SOL * count2 * data.price,
       */
    });

    transaction.add(sendSolInstruction);
    sendTransaction(transaction, connection)
      .then((res) => {
        // Process the response or do any necessary operations
        updatePoints()
        /*         updaterealtime(id, count2);
         */ // Call another function if the user approves the transaction
      })
      .catch((err) => {
        // Handle any errors that may occur during the transaction process
        console.error("CANCELADO");
      });
  };

  return (
    <>
      {publicKey ? (
        logged ? (
          <div className="flex items-center justify-center h-1/2 ">
            <div className="w-full h-full">
              <img
                src="https://pbs.twimg.com/media/FzJ6TNBXwAUvWqx?format=jpg&name=large"
                className="object-cover h-full rounded-l-lg "
                alt="thesmo"
              />
            </div>
            <div className="bg-tesmo rounded-r-lg justify-center items-center flex flex-col h-full bg-opacity-80 p-4  shadow-md w-full">
              <div className="flex flex-col text-white gap-4 w-full ">
                <div className="flex gap-2 justify-between">
                  <p className="font-bold text-gray-200">Nickname </p>
                  <p>{usermongo.nickname} </p>
                </div>
                <div className="flex gap-2 justify-between">
                  <p className="font-bold text-gray-200">Wallet </p>
                  <p>{usermongo.wallet.slice(0, 14)}... </p>
                </div>
                <div className="flex gap-2 justify-between mb-10">
                  <p className="font-bold text-gray-200">Actual Points </p>
                  <p>{usermongo.points ? usermongo.points : 0} </p>
                </div>
                <div className="flex gap-2 justify-between">
                  <p className="font-bold text-gray-200">Buy Points </p>
                  <p>{count2} </p>
                </div>
                <div className="flex gap-2 justify-between">
                  <p className="font-bold text-gray-200">Total</p>
                  <div className="flex gap-1">
                    <img
                      className="w-4 h-4"
                      src="https://cryptologos.cc/logos/solana-sol-logo.png"
                      alt="sollogo"
                    />
                    <p>{count2 / 1000} </p>
                  </div>
                </div>
                <UnitCounter />

                <Button onClick={() => setLogged(false)}>Log out</Button>
              </div>

              <div className="tab-content"></div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-1/2 ">
            <div className="w-full h-full">
              <img
                src="https://ord-mirror.magiceden.dev/content/82d65806d87a536c21b9f9466de86d5f4022050d31a14a27cb1d552493d3cbbdi0"
                className="object-cover h-full rounded-l-lg "
                alt="thesmo"
              />
            </div>
            <div className="bg-tesmo rounded-r-lg  flex flex-col h-full bg-opacity-80 p-8  shadow-md w-full">
              <div className="flex mb-4 ">
                <div
                  className={`cursor-pointer mr-4 ${
                    activeTab === "login" ? "text-blue-500" : "text-gray-500"
                  }`}
                  onClick={() => handleTabChange("login")}
                >
                  Login
                </div>
                <div
                  className={`cursor-pointer ${
                    activeTab === "signup" ? "text-blue-500" : "text-gray-500"
                  }`}
                  onClick={() => handleTabChange("signup")}
                >
                  Sign Up
                </div>
              </div>
              <div className="tab-content">
                {activeTab === "login" && (
                  <LoginForm
                    setLogged={setLogged}
                    setUserMongo={setUserMongo}
                    nodeurl={nodeurl}
                  />
                )}
                {activeTab === "signup" && (
                  <SignUpForm
                    publicKey={publicKey}
                    setActiveTab={setActiveTab}
                    nodeurl={nodeurl}
                  />
                )}
              </div>
            </div>
          </div>
        )
      ) : (
        <div>
          <WalletMultiButton />
        </div>
      )}
    </>
  );
};

const InputWithIcon = ({ icon, placeholder, value, onChange, type }) => (
  <div className="flex items-center mb-4">
    {icon}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="ml-2 border rounded py-2 px-3 w-full"
    />
  </div>
);

const Button = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="w-full bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline"
  >
    {children}
  </button>
);

const LoginForm = ({ setLogged, setUserMongo, nodeurl }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(false);
  const [color, setColor] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    try {
      const response = await fetch(`${nodeurl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: username,
          password: password,
        }), // Replace with your actual data
      });

      const res = await response.json();

      if (res === "pass wrong") {
        setMsg("Password wrong.");
        setColor("text-red-500");
        setTimeout(() => {
          setMsg(false);
        }, 2000);
      }
      if (res === "User dont exist") {
        setMsg("User dont exist.");
        setColor("text-red-500");
        setTimeout(() => {
          setMsg(false);
        }, 2000);
      }
      if (typeof res === "object") {
        setUserMongo(res);
        setMsg("Login succesful.");
        setColor("text-green-500");
        setTimeout(() => {
          setMsg(false);
          setLogged(true);
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <form onSubmit={handleLogin} className="form">
      <InputWithIcon
        icon={<FaUser className="text-white" />}
        placeholder="Username"
        value={username}
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputWithIcon
        icon={<FaLock className="text-white" />}
        placeholder="Password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {msg && <p className={`${color} mb-2`}>{msg}</p>}

      <Button type="submit">Login</Button>
    </form>
  );
};

const SignUpForm = ({ publicKey, setActiveTab, nodeurl }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(false);
  const [color, setColor] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    if (password === verifyPassword) {
      console.log("Signing up with:", username, password, email);

      try {
        const response = await fetch(`${nodeurl}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nickname: username,
            password: password,
            email: email,
            wallet: publicKey?.toBase58(),
          }), // Replace with your actual data
        });

        const res = await response.json();
        if (res === "User Exist") {
          setMsg("User is already taken");
          setColor("text-red-500");
          setTimeout(() => {
            setMsg(false);
          }, 2000);
        }
        if (res === "Email Exist") {
          setMsg("Email is already taken");
          setColor("text-red-500");
          setTimeout(() => {
            setMsg(false);
          }, 2000);
        }

        if (res === "Create") {
          setMsg("Account successfully created.");
          setColor("text-green-500");
          setTimeout(() => {
            setMsg(false);
            setActiveTab("login");
          }, 2000);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setMsg("Passwords dont match");
      setColor("text-red-500");
      setTimeout(() => {
        setMsg(false);
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="form">
      <InputWithIcon
        icon={<FaUser className="text-white" />}
        placeholder="Username"
        value={username}
        type="string"
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputWithIcon
        icon={<FaLock className="text-white" />}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputWithIcon
        icon={<FaLock className="text-white" />}
        placeholder="Verify Password"
        type="password"
        value={verifyPassword}
        onChange={(e) => setVerifyPassword(e.target.value)}
      />
      <InputWithIcon
        icon={<FaEnvelope className="text-white" />}
        placeholder="Email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <p className="text-white mb-2">
        Wallet: {publicKey.toBase58().slice(0, 14)}...
      </p>
      {msg && <p className={`${color} mb-2`}>{msg}</p>}

      <Button type="submit">Sign Up</Button>
    </form>
  );
};

export default Profile;
