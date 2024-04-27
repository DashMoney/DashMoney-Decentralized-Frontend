import React from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

class WhyMoney extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="bodytext" id="easyReadText">
          <div style={{ textAlign: "right" }}>
            <Button
              variant="primary"
              size="sm"
              onClick={() => this.props.handleSelectedDapp("Login")}
            >
              <b> Go to Decentralized Frontend</b>
            </Button>
          </div>

          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <h3>
              <b>Why Money?</b>
            </h3>
          </div>
          <p></p>
          <p>Why money, is best answered by understanding what money is.</p>
          <p>
            So I will discuss 2 bad ideas concerning money and correct them by
            explaining what money is. When you understand what money is then you
            will understand why we need money.
          </p>
          <h6 style={{ marginTop: "1.5rem" }}>
            <b>Bad Idea #1</b>
          </h6>
          <p style={{ paddingLeft: "1.2rem", marginBottom: "0rem" }}>
            {" "}
            “If only we let the right person, the most virtuous, generous person
            (or the smartest, brightest group of people) distribute the new
            money(fiat), then we would find success in creating a new better
            system and economy.”
          </p>

          <p style={{ textAlign: "center", margin: "0rem" }}>OR</p>
          <p style={{ paddingLeft: "1.2rem" }}>
            “Spurring Dash into an economy by spending Dash from the Treasury or
            from increasing supply that is what we should do.”
          </p>
          <p style={{ marginTop: "1.5rem" }}>
            This idea is wrong. But why it’s wrong, is not the only thing of
            interest.
          </p>
          <p>
            What is also interesting is why so many arrive at this as an answer
            or solution. And I say so many arrive at, because this idea echos
            another, that has been tossed around in other circles.
          </p>
          <p style={{ paddingLeft: "1.2rem" }}>
            {" "}
            “Socialism would work great, if only we had the right people, a most
            virtuous and good people running it.”
          </p>
          <p>
            {" "}
            These ideas are wrong, because it is categorically a
            misunderstanding of the actual problem. The problem is not who is
            doing or running the economy. The problem is one of information and
            information processing. See Ludwig von Mises on Economic
            Calculation…
          </p>
          <p>
            {" "}
            But when you have this idea of information, of every person’s
            constantly changing, endless list of relative, marginal wants and
            desires. It can be easy for people to dismiss, because they do, all
            the time. The problem of economic calculation.
          </p>
          <p>
            So I give you this simple story to explain why people fall into this
            idea of having the right, virtuous person or group, and fail to see
            it for what it is, a failure of information and economic
            calculation.
          </p>
          <p> So a simple story, because they explain things the best.</p>
          <div
            className="BottomBorder"
            style={{ paddingTop: ".2rem", marginBottom: ".3rem" }}
          ></div>

          <div
            style={{
              textAlign: "center",
              marginTop: "2rem",
              marginBottom: "1.5rem",
            }}
          >
            <h5>“The well in the valley”</h5>
          </div>
          <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
            <p>
              There was once a valley with mountains on each side, that was
              filled with a patchwork of farms and simple homes. It was a simple
              village.
            </p>
            <p>
              {" "}
              The people all collected rainwater for their needs, and the ground
              held all they needed to grow crops and produce feed for their
              livestock. Theirs was a simple life.
            </p>
            <p>
              One day, the villages came together and decided, they needed to do
              something in case they were attacked or there was an emergency.
            </p>
            <p>
              There was a pile of stones in the center of the valley, most
              likely left over from when the fields were cleared. And they
              decided that they should use these stones and build a small keep
              for safety. After building the stone walls, all the people chose
              the most virtuous and righteous man in the village to be in charge
              of the keep.
            </p>
            <p>
              The man-in-charge sorted out the depression in the ground at the
              center of the keep, left from moving the stones used for the
              walls, so it was made tidy and covered, so no one would fall in.
              It was work made difficult by the water that kept collecting at
              the bottom.
            </p>
            <p>
              Then one hot summer day, not any hotter than any normal hot sunny
              day. In the marketplace nearby the keep, someone remembered the
              water in the keep, and went and asked the man-in-charge for some.
            </p>
            <p>
              The man-in-charge, the most virtuous and righteous of all, gave
              the water to those that asked.
            </p>
            <p>
              Then another man, a farmer that lives close to the keep asked, “If
              I were to have some extra water for my animals, I could give an
              animal for the annual harvest festival.” The man-in-charge agreed.
            </p>
            <p>
              Soon harvest time came, people celebrated, and the animal
              purchased with the extra water was cooked and enjoyed by those who
              attended the festival.
            </p>
            <p>
              {" "}
              But at the edges of the valley, farthest from the keep, farmers
              realized that their crops did not produce as well as usual. They
              thought it was just a bad season.
            </p>
            <p>
              The next year came and villagers closest to the well benefited the
              most as the man-in-charge made water deals with other farmers near
              the keep and gave water freely to the people in the marketplace.
              The man-in-charge was celebrated for his accomplishments by all.
            </p>
            <p>
              {" "}
              This year the farmers on the edge of the valley, could not produce
              enough to live on, so they fled to the center of the valley and
              the man-in-charge gave them jobs delivering water, and he helped
              all that came.
            </p>
            <p>
              {" "}
              The next year more people came as their farms failed. Their farms
              weren’t even on the edge of the valley. They would seek work from
              the man-in-charge, and many built make-shift shelters along the
              wall of the keep.
            </p>
            <p>
              The more the man-in-charge helped, the more people came and sought
              help. And no matter how much he helped, there was always more
              need.
            </p>
            <p>
              But the man-in-charge only did good, he provided for all that
              came. Nothing he did was hidden. He was most generous and
              virtuous. All he did was help and provide what was good. He only
              did what was good and right.{" "}
            </p>
            <p>
              But the more water they pulled up, the deeper the next scoop would
              need to be. Soon nothing could be done without the water in the
              keep. Long lines formed everyday. Any that hoarded rain water
              became fearful.
            </p>
            <p>
              The villagers started to have conflicts among themselves. Claims
              of thievery and liars were rampant. Some blamed bad luck, some the
              man-in-charge. All were in need.
            </p>
            <p>
              Then one night, a fire broke out among the numerous shelters on
              the walls of the keep. A rush for the well, a fight, a skirmish,
              and chaos. The walls of the keep collapsed, many died. The walls
              had fallen in on themselves and filled the hole where the water
              was drawn.
            </p>
            <p>
              A long time passed, memories faded. Then there was a valley with
              mountains on each side, that was filled with a patchwork of farms
              and simple homes. It was a simple village and a simple life...
            </p>
          </div>
          <div
            className="BottomBorder"
            style={{ paddingTop: ".2rem", marginBottom: "1rem" }}
          ></div>
          <p></p>
          <p>Water represents money in this story.</p>
          <p>
            The well where the water is drawn is credit or new money(fiat). It
            is produced or acquired at no cost.
          </p>
          <p>
            The villagers closest to the well benefited the most. That is the
            Cantillon effect.
          </p>
          <p>
            Even though the most generous and virtuous was chosen, and he was
            doing good as far as he could see or determine. And just like the
            banks or governments that lend for new businesses or building houses
            or programs, they think they are “doing good”. But like the
            man-in-charge, they don’t/can’t see the entire picture though. They
            can’t see the consequences.
          </p>
          <p>
            People come to this idea: “If we only had the right person in
            charge.” Because just as the man-in-charge cannot see nor know the
            right choice to make, nor can others see the right path, they just
            “know” that what the man-in-charge is doing, is not right, so they
            incorrectly conclude, we must change who is in charge.
          </p>
          <p>
            {" "}
            This “man-in-charge” though, it doesn’t matter who it is. The same
            result will always occur. He simply has no way to know what the
            right thing to do is. And it is incredible hard, to do nothing when
            there is something you “think” is “good” that you can do.
          </p>
          <p>
            {" "}
            The key is understanding that an economy is a multitude of exchanges
            by individual actors, who are basing their actions on prices and the
            individual’s relative, comparative wants and desires. Those
            exchanges benefit both parties to the exchange and this is possible
            only when the Chain of Causality is maintained throughout the
            economy. And every exchange that occurs is one link in the chain of
            causality.
          </p>
          <p>
            When water/money can be created at a below market price then it
            throws the entire system off. And even if the person in charge were
            to just give it all away. It would still throw the entire system
            into chaos. It breaks the chain of causality, it separates causes
            and effects.
          </p>
          <p>
            Because there would be no notion of what causes that water/money to
            have the value that it currently possesses, and so how could anyone
            with the new created water/money know the best way to use it. And
            furthermore, how could they foresee the consequences of what would
            happen, even if they used it for only “good”.
          </p>
          <p style={{ fontStyle: "italic" }}>
            As an aside - Please understand that the market should not be
            confused with a large group of people. Money is able to create the
            network of users(quantum computers) , because it functions through
            the money(specie)-price mechanism. A group of people have no such
            advantage, and it is dangerous to think they might.
          </p>
          <p>
            If you make the logical step that the Dash Treasury system is the
            same as the well in the story, then we are of the same mind. But I
            do make this concession. “No baby is born fully grown.” Before Dash
            can really be money, it needs to be a usable product as money. It
            needs to have its own markets, and we are just not there yet.
          </p>
          <p>
            But just know that when you draw from the well, when you use the
            treasury, you distort Dash as money. You distort Dash’s ability to
            calculate price in the free market through the money-price
            mechanism. Just as surely as when fiat/credit is created in the
            banking system, it distorts the economy.
          </p>
          <div
            className="BottomBorder"
            style={{ paddingTop: ".2rem", marginBottom: "1rem" }}
          ></div>
          <p>
            I will add more detail to this, because I want to make sure I am
            very clear/explicit. What is money?
          </p>
          <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
            <p>
              Money as a concrete, real-life, implementation, consists of these
              2 ideas:
            </p>
            <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
              <p>1) “Peer to peer and final.” (Medium of Exchange)</p>
              <p>
                2) “No money comes about from less than the market price.”
                (e.g., if you want to loan money, it must come from your
                savings.) No one gets to create credit or ‘new money’(fiat).
                <p>
                  Also what I mean by “less than market price” is this: What
                  does it cost to get money or receive money from others? Well
                  it depends on what good or service, you are selling. That is
                  the market price of money. The price of any good or service
                  that is exchanged in the market is the market price of money.
                </p>
              </p>
            </div>
            <p>
              Any deviation from money as described above creates market
              distortions and hinders the ability of money to perform the
              money-price mechanism, and thereby, not give accurate pricing to
              the free market.
            </p>
          </div>
          <div
            className="BottomBorder"
            style={{ paddingTop: ".2rem", marginBottom: "1rem" }}
          ></div>
          <p>
            But as I said, I don’t think Dash is at the point of being money,
            Dash still needs the treasury. Dash needs to build more P2P markets
            and marketplaces that use Dash, and that will build the Dash economy
            going forward.
          </p>
          <p>
            So where is that line? Where is the line between deciding to fund
            from Treasury Funding and letting the market decide?
          </p>
          <p>
            And I say all this so that when success comes to Dash, because I
            believe it will. Perhaps instead of trying to choose winners and
            losers, don’t give anyone money from the treasury and let the free
            market decide.
          </p>
          <p>
            Even if someone has a good idea. How do you know that they are the
            best person to execute the idea?
          </p>
          <p>
            So do not feed anyone. But we do need to get to that point, and we
            are not there yet.
          </p>
          <p>
            Why do I think that Dash is not there, when others say, “You can use
            Dash as “payments” today.”{" "}
          </p>
          <p></p>
          <h6 style={{ marginTop: "1.5rem" }}>
            <b>Bad Idea #2</b>
          </h6>
          <p style={{ paddingLeft: "1.2rem", marginBottom: "0rem" }}>
            “You can use Dash as “payments” today.”
          </p>
          <p></p>
          <p>
            Money is not “payments” that can be interchanged with other forms of
            payments. Money is the Medium of Exchange that people use in the
            market, and it is The Good, a person wants when they sell something.
            Not some conversion mechanism that they use to get some other
            currency.
          </p>
          <p>
            “Do you want to use cash, checks, credit cards, crypto?” The idea of
            “payments” reinforces the idea that money does not change anything
            in the economy which I believe is untrue.
          </p>
          <p>
            That is why I don’t like the word “payments” or the idea of the
            economy as a “vehicle”. The idea of “payments” to me is just
            thinking about money as the wheels of a “vehicle” economy. Just
            change the wheels and the economy runs the exact same.
          </p>
          <p>
            Creating a new economy with a new money(not fiat) is like arriving
            in a new, completely uninhabited continent of mountains, forests,
            rivers, fields and valleys. There are no roads, no houses to stay
            in, no stores to get what you need. These would all need to be
            formed and build. All new forms of businesses for goods and services
            need to be created. We have only scratched the surface with Dash.
          </p>
          <p>
            See with money, you don’t need any marketing or BizDev. Everything
            in the market is priced in the money. That is the best marketing,
            you could possibly get. Not only is it the best marketing, but it’s
            free.
          </p>
          <p>
            I think this vision of Dash as money is bigger than Evan’s
            Evolution. I think its bigger than Satoshi’s Bitcoin. And I can say
            that without arrogance, because it’s not something I did. It’s
            Platform.
          </p>
          <p>
            {" "}
            Now there is nothing perfect in this tangible world. This is true
            even for money. Money in any form will be imperfect.
          </p>
          <p>
            Perfection is perfected through imperfections, who can understand
            His ways.
          </p>
          <p>But I don't want to look back and wonder what if...</p>
          <p>Free the money, free the world.</p>
          <p>Your humble servant,</p>
          <p>DashMoney</p>
          <p>
            {/* I think there
            are too many public masternode owners. It could be too dangerous for
            them. I think the treasury
            may need to be removed. And the block reward just roll on to
            oblivion.  */}
          </p>
        </div>
      </>
    );
  }
}

export default WhyMoney;
