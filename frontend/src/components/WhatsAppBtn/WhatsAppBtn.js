import "./WhatsAppBtn.css";
import React, { useState } from "react";
import WhatsAppSvgIcon from "../../../src/utils/SvgIcons/WhatsAppSvgIcon";

const WhatsAppBtn = () => {
  const [toggleWhatsappWidget, settoggleWhatsappWidget] = useState(false);
  const [selectedChatAgent, setselectedChatAgent] = useState({
    id: null,
    name: null,
    mobileNo: null,
    title: null,
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    const message = e.target.userQuery.value;

    const whatsappUrl = `https://wa.me/${
      selectedChatAgent?.mobileNo
    }?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const teamDetails = [
    {
      id: 1,
      name: "Ajay Pratap Singh",
      mobileNo: "917302119565",
      title: "Developer",
    },
  ];

  return (
    <>
      <div className={`chatWidget ${toggleWhatsappWidget ? "active" : null} `}>
        <div>
          <div className="header">
            <div className="header__left">
              <WhatsAppSvgIcon width={40} height={40} />
            </div>

            <div className="header__right">
              <h3>Start a Conversation</h3>
              <p>
                Hi! Click one of our members below to chat <br /> on
                <span> WhatsApp</span>
              </p>
            </div>
          </div>

          {selectedChatAgent?.id === null ? (
            <div className="teamStatus">
              <p className="teamStatus__teamStatus">
                The Team typically replies in a few minutes
              </p>

              {teamDetails &&
                teamDetails.map((data, idx) => (
                  <div
                    className="teamMember"
                    key={idx}
                    onClick={() =>
                      setselectedChatAgent({
                        id: data?.id,
                        name: data?.name,
                        mobileNo: data?.mobileNo,
                        title: data?.title,
                      })
                    }
                  >
                    <div>
                      <img
                        src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                        alt="Avatar Images"
                        className="avatarImage"
                      />
                    </div>

                    <div className="details">
                      <h4>{data?.name}</h4>
                      <p>{data?.title}</p>
                    </div>

                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 48 48"
                      >
                        <g
                          fill="none"
                          fillRule="evenodd"
                          stroke="none"
                          strokeWidth="1"
                        >
                          <g fill="#67C15E" transform="translate(-700 -360)">
                            <path d="M723.993 360C710.763 360 700 370.765 700 384a23.824 23.824 0 004.57 14.067l-2.99 8.917 9.224-2.948A23.81 23.81 0 00724.007 408c13.23 0 23.993-10.766 23.993-24s-10.762-24-23.993-24h-.014zm-6.7 12.19c-.466-1.114-.818-1.156-1.523-1.185a13.55 13.55 0 00-.804-.027c-.918 0-1.877.268-2.455.86-.705.72-2.454 2.398-2.454 5.841s2.51 6.773 2.849 7.239c.353.465 4.895 7.632 11.947 10.553 5.515 2.286 7.152 2.074 8.407 1.806 1.834-.395 4.133-1.75 4.711-3.386.579-1.637.579-3.034.41-3.33-.17-.296-.636-.465-1.34-.818-.706-.353-4.134-2.046-4.783-2.272-.634-.24-1.24-.155-1.72.522-.677.946-1.34 1.905-1.876 2.483-.423.452-1.115.509-1.693.268-.776-.324-2.948-1.086-5.628-3.47-2.074-1.849-3.484-4.148-3.893-4.84-.41-.705-.042-1.114.282-1.495.353-.438.691-.748 1.044-1.157.352-.41.55-.621.776-1.1.24-.466.07-.946-.1-1.3-.168-.352-1.579-3.795-2.157-5.191z"></path>
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                ))}
            </div>
          ) : null}

          {selectedChatAgent?.id !== null ? (
            <div className="typeMessageToAgent">
              <div>
                <div className="d-flex flex-row justify-content-between mb-3">
                  <p className="typeMessageToAgent__title">
                    Your Selected Agent
                  </p>
                  <p
                    className="typeMessageToAgent__title"
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    title="Change Agent"
                    onClick={() =>
                      setselectedChatAgent({
                        id: null,
                        name: null,
                        mobileNo: null,
                        title: null,
                      })
                    }
                  >
                    Change Agent
                  </p>
                </div>

                <div className="teamMember">
                  <div>
                    <img
                      src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                      alt="Avatar Images"
                      className="avatarImage"
                    />
                  </div>

                  <div className="details">
                    <h4> {selectedChatAgent?.name} </h4>
                    <p> {selectedChatAgent?.title} </p>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 48 48"
                    >
                      <g
                        fill="none"
                        fillRule="evenodd"
                        stroke="none"
                        strokeWidth="1"
                      >
                        <g fill="#67C15E" transform="translate(-700 -360)">
                          <path d="M723.993 360C710.763 360 700 370.765 700 384a23.824 23.824 0 004.57 14.067l-2.99 8.917 9.224-2.948A23.81 23.81 0 00724.007 408c13.23 0 23.993-10.766 23.993-24s-10.762-24-23.993-24h-.014zm-6.7 12.19c-.466-1.114-.818-1.156-1.523-1.185a13.55 13.55 0 00-.804-.027c-.918 0-1.877.268-2.455.86-.705.72-2.454 2.398-2.454 5.841s2.51 6.773 2.849 7.239c.353.465 4.895 7.632 11.947 10.553 5.515 2.286 7.152 2.074 8.407 1.806 1.834-.395 4.133-1.75 4.711-3.386.579-1.637.579-3.034.41-3.33-.17-.296-.636-.465-1.34-.818-.706-.353-4.134-2.046-4.783-2.272-.634-.24-1.24-.155-1.72.522-.677.946-1.34 1.905-1.876 2.483-.423.452-1.115.509-1.693.268-.776-.324-2.948-1.086-5.628-3.47-2.074-1.849-3.484-4.148-3.893-4.84-.41-.705-.042-1.114.282-1.495.353-.438.691-.748 1.044-1.157.352-.41.55-.621.776-1.1.24-.466.07-.946-.1-1.3-.168-.352-1.579-3.795-2.157-5.191z"></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              {/* sa */}
              <div className="typeMessageToAgent__inpContainer">
                <form onSubmit={handleSendMessage}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="userQuery"
                      id="userQuery"
                      placeholder="Enter Your Query"
                    />
                  </div>

                  <button type="submit" className="btn btn-sm ">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div
        className="chatWidget__whatsappIcon"
        onClick={() => settoggleWhatsappWidget(!toggleWhatsappWidget)}
      >
        <div className="chatWidget__whatsappIcon__title">
          <span>
            Need Help ? <b>Chat with Us</b>
          </span>
        </div>

        <div className="chatWidget__whatsappIcon__icon">
          {toggleWhatsappWidget ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              stroke="#000"
              strokeWidth="0.01"
              className="icon"
              viewBox="-102.4 -102.4 1228.8 1228.8"
            >
              <g>
                <path
                  fill="#2DB742"
                  d="M511.881 929.554c230.11 0 416.65-186.54 416.65-416.649S741.99 96.256 511.88 96.256 95.232 282.796 95.232 512.906s186.54 416.648 416.65 416.648"
                ></path>
                <path
                  fill="#fff"
                  d="M698.099 376.607l-146.651 146.65 144.98 144.98c5.068 5.069 7.891 11.782 7.946 18.905.057 7.221-2.721 14.006-7.824 19.108.002.003 0 .004-.003.004-4.944 4.944-11.829 7.774-18.907 7.774h-.113c-7.186-.03-13.932-2.835-18.994-7.897l-144.98-144.979-146.652 146.653c-5.506 5.504-12.842 8.556-20.655 8.59h-.124c-7.7 0-15.194-3.083-20.58-8.469l-.003-.002c-5.553-5.554-8.577-12.94-8.517-20.8.06-7.746 3.13-15.05 8.64-20.558l146.652-146.653-144.98-144.98c-5.068-5.068-7.891-11.783-7.946-18.907-.057-7.22 2.722-14.008 7.827-19.11 4.942-4.943 11.827-7.774 18.907-7.774h.113c7.186.031 13.931 2.834 18.993 7.895l144.98 144.981L656.86 335.366c5.506-5.506 12.843-8.556 20.654-8.59h.125c7.7 0 15.196 3.084 20.583 8.47 5.552 5.55 8.578 12.94 8.516 20.798-.06 7.748-3.128 15.05-8.64 20.562m79.434 401.95c-34.516 34.517-74.697 61.611-119.43 80.53-46.29 19.58-95.486 29.508-146.222 29.508-50.736 0-99.932-9.928-146.223-29.508-44.731-18.92-84.913-46.013-119.429-80.529-34.516-34.516-61.61-74.697-80.53-119.43-19.578-46.288-29.506-95.486-29.506-146.22 0-50.737 9.928-99.933 29.507-146.224 18.92-44.731 46.014-84.914 80.53-119.429 34.516-34.516 74.698-61.61 119.43-80.53 46.29-19.58 95.486-29.508 146.222-29.508s99.932 9.929 146.222 29.507c44.733 18.92 84.914 46.014 119.43 80.53 34.516 34.515 61.61 74.699 80.53 119.43 19.58 46.291 29.507 95.487 29.507 146.222 0 50.736-9.927 99.932-29.506 146.222-18.92 44.732-46.015 84.915-80.53 119.431M511.88 96.256c-230.109 0-416.649 186.54-416.649 416.648 0 230.11 186.54 416.651 416.65 416.651S928.53 743.013 928.53 512.905c0-230.109-186.54-416.649-416.649-416.649"
                ></path>
              </g>
            </svg>
          ) : (
            <img
              src="/images/whatsappIcon.png"
              alt="Whatsapp Icon"
              width="50px"
              height="50px"
              title="WhatsApp"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default WhatsAppBtn;
