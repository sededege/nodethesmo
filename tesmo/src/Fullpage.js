import React from "react";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import banner from "./assets/banner.png";
import banner2 from "./assets/banner2.png";
import nft2 from "./assets/2.webp";
import nft3 from "./assets/3.webp";
import rkz from "./assets/rkz.png";
import solar from "./assets/solar.png";
import capture1 from "./assets/capture1.png";
import { Tweet } from "react-twitter-widgets";
import Member from "./Member";
import Header from "./Header";

const Fullpage = () => {
  const ref = React.useRef();
  const parallax = React.useRef();
/*   const [number, setNumber] = React.useState(0); */
/* 
  React.useEffect(() => {
ref.current.scrollTo(number);
  }, []);
 */

  return (
    <div className="text-tesmo bg-tesmo">
      <Header /* setNumber={() => setNumber()} */ />
      <Parallax pages={3}>
        <ParallaxLayer
          id="1"
          speed={0.6}
          offset={0}
          factor={1}
          className="bg-tesmo"
          /*   style={{
            backgroundImage: `url(${banner})`,
            backgroundSize: "cover",
          }} */
        >
          <div className="w-full h-full  bg-tesmo mt-20 p-20 text-center text-[3rem] flex justify-between menu">
            <div className=" w-full items-center ">
              <div className="flex  flex-col items-center mt-10 font-mono">
                <h1 className=" text-white menu">Vision</h1>
                <p className="text-white text-[1.4rem]">
                  Duis do ad elit mollit proident. Adipisicing ea dolor magna ad
                  laborum nisi. Amet fugiat exercitation elit esse cupidatat
                  incididunt velit.
                </p>
                <p className="text-white text-[1.4rem]">
                  Duis do ad elit mollit proident. Adipisicing ea dolor magna ad
                  laborum nisi. Amet fugiat exercitation elit esse cupidatat
                  incididunt velit.
                </p>
                <p className="text-white text-[1.4rem]">
                  Duis do ad elit mollit proident. Adipisicing ea dolor magna ad
                  laborum nisi. Amet fugiat exercitation elit esse cupidatat
                  incididunt velit.
                </p>
              </div>
            </div>
            <div className=" w-full">
              <img src={nft3} className="w-3/4 mx-auto  rounded-lg" alt="nft" />
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          id="2"
          speed={0.9}
          offset={0.9}
          factor={3}
          className="bg-tesmo"
        >
          <div className="w-full h-full bg-tesmo p-20 text-[3rem] menu">
            <h1 className="text-white text-left">Our History</h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="w-full">
                <Tweet
                  tweetId="1624606539620433920"
                  options={{ theme: "dark" }}
                />
              </div>
              {/*  <div className="w-full">
                <Tweet
                  tweetId="1623684472045436928"
                  options={{ theme: "dark" }}
                />
              </div>
              <div className="w-full">
                <Tweet
                  tweetId="1623403156091596800"
                  options={{ theme: "dark" }}
                />
              </div> */}
              <div className="w-full">
                <Tweet
                  tweetId="1624804770539085825"
                  options={{ theme: "dark" }}
                />
              </div>
              <div className="w-full">
                <Tweet
                  tweetId="1624841242055004161"
                  options={{ theme: "dark" }}
                />
              </div>
              <div className="w-full">
                <Tweet
                  tweetId="1624109741151485954"
                  options={{ theme: "dark" }}
                />
              </div>
              <div className="w-full">
                <Tweet
                  tweetId="1624603322194829313"
                  options={{ theme: "dark" }}
                />
              </div>
              <div className="w-full">
                <Tweet
                  tweetId="1624968821181231105"
                  options={{ theme: "dark" }}
                />
              </div>
              <div className="w-full">
                <Tweet
                  tweetId="1624418109409972226"
                  options={{ theme: "dark" }}
                />
              </div>
              <div className="w-full">
                <Tweet
                  tweetId="1624823798003294212"
                  options={{ theme: "dark" }}
                />
              </div>
              <div className="w-full">
                <Tweet
                  tweetId="1624580663855788032"
                  options={{ theme: "dark" }}
                />
              </div>
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          speed={0.5}
          offset={2}
          factor={1}
          className="bg-tesmo"
          onClick={() => ref.current.scrollTo(3)}
          id="3"
        >
          <div className="w-full h-full p-20 text-left text-[3rem] menu">
            <h1 className="text-white">Team</h1>
            <div className="gap-4 grid grid-cols-5 items-center h-full ">
              <Member
                photo="https://pbs.twimg.com/profile_images/1622467149942910976/cMeW5lXm_400x400.jpg"
                name="rkz"
                user="@RGFREESTYLE"
                discord="rkz#4276"
                details="Fullstack React Developer."
                curiosity="I like cats & I am here since Dec, 2021."
              />
              <Member
                photo="https://pbs.twimg.com/profile_images/1622467149942910976/cMeW5lXm_400x400.jpg"
                name="rkz"
                user="@RGFREESTYLE"
                discord="rkz#4276"
                details="Fullstack React Developer."
                curiosity="I like cats & I am here since Dec, 2021."
              />
              <Member
                photo="https://pbs.twimg.com/profile_images/1622467149942910976/cMeW5lXm_400x400.jpg"
                name="rkz"
                user="@RGFREESTYLE"
                discord="rkz#4276"
                details="Fullstack React Developer."
                curiosity="I like cats & I am here since Dec, 2021."
              />
              <Member
                photo="https://pbs.twimg.com/profile_images/1622467149942910976/cMeW5lXm_400x400.jpg"
                name="rkz"
                user="@RGFREESTYLE"
                discord="rkz#4276"
                details="Fullstack React Developer."
                curiosity="I like cats & I am here since Dec, 2021."
              />
              <Member
                photo="https://pbs.twimg.com/profile_images/1622467149942910976/cMeW5lXm_400x400.jpg"
                name="rkz"
                user="@RGFREESTYLE"
                discord="rkz#4276"
                details="Fullstack React Developer."
                curiosity="I like cats & I am here since Dec, 2021."
              />
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default Fullpage;
