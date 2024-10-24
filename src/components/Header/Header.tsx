import { avatar } from "../../assets";
import { MenuOutlined } from "@ant-design/icons"; // Import the Menu icon
import { useState } from "react";
import { Drawer, Modal } from "antd";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { home, logo, logoutIcon, profileIcon, wardensIcon } from "../../assets";
import { ReactSVG } from "react-svg";
import { signOutUser } from "../../services/firebase";
import { HeaderProps } from "./HeaderProps";

const Header: React.FC<HeaderProps> = ({ user }) => {
  const userInfo = user;
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const signOut = async () => {
    try {
      await signOutUser();
      setIsModalVisible(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error signing out:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  const renderNavItems = () => (
    <ul onClick={toggleDrawer}>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <ReactSVG src={home} />
          <span>My Hostels</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/booking-requests"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <ReactSVG src={wardensIcon} />
          <span>Booking Requests</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <ReactSVG src={profileIcon} />
          <span>My Profile</span>
        </NavLink>
      </li>
      <li>
        <button className={styles.logoutButton} onClick={toggleModal}>
          <ReactSVG src={logoutIcon} />
          <span>Log Out</span>
        </button>
      </li>
    </ul>
  );

  return (
    <>
      <div className={styles.headerContainer}>
        <MenuOutlined className={styles.menuIcon} onClick={toggleDrawer} />
        <div className={styles.leftSide}></div>
        <div className={styles.profile}>
          {!!userInfo?.photoURL ? (
            <img
              src={userInfo.photoURL}
              alt="Warden Profile"
              className={styles.profilePicture}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {!!userInfo?.displayName ? userInfo?.displayName?.charAt(0) : "A"}
            </div>
          )}
          <h6>{userInfo.displayName}</h6>
        </div>
      </div>

      {/* Drawer for Mobile */}
      <Drawer
        title={
          <div className={styles.logo}>
            <Link to={"/"}>
              <img className={styles.logoImg} src={logo} alt="HostelHub" />
            </Link>
          </div>
        }
        width={280}
        placement="left"
        onClose={toggleDrawer}
        open={isDrawerVisible}
        className={styles.drawer}
      >
        <nav>{renderNavItems()}</nav>
      </Drawer>

      <Modal
        title="Are You Sure?"
        open={isModalVisible}
        onCancel={toggleModal}
        footer={null} // Remove default footer
      >
        <div className="modalContent">
          <p className="modalDescription">
            Are you sure you want to logout from the system?
          </p>

          <div className="buttonsGroup">
            <button onClick={toggleModal} className="primary">
              Cancel
            </button>
            <button onClick={signOut} className="info">
              Yes, I'm sure
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
