import * as React from "react";
import { Menubar } from "primereact/menubar";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { setCredentials, logOut } from "../../store/state/userSlice";
import { useNavigate } from "react-router-dom";
import { PrimeIcons } from "primereact/api";
import { useCartQuery } from "../../store/state/userApiSlice";
import { Sidebar } from "primereact/sidebar";
import SideBar from "./sideBar";
import useAuth from "../../hooks/useAuth";

import headerLogo from "../../assets/shopy-logo.svg";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const { data: cartItems, refetch } = useCartQuery(user?.id, { skip: !token || !user?.id });
  const [visibleRight, setVisibleRight] = React.useState(false);
  React.useEffect(() => {
    if (!token) {
      // Cart will be skipped when logged out due to skip condition
    }
  }, [token]);
  const [products, setProducts] = React.useState([]);

  const itemRenderer = (item) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && (
        <Badge className="ml-auto" severity="success" value={item.badge} />
      )}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </a>
  );
  const items = [
    {
      key: "home",
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        navigate("/home");
      },
    },
    {
      key: "groceries",
      label: "Products",
      icon: PrimeIcons.SHOPPING_BAG,
      command: () => {
        navigate("/groceries");
      },
    },
  ];
  const start = (
    <img
      alt="logo"
      src={headerLogo}
      width="45"
      height="45"
      className="mr-2"
    ></img>
  );
  const items2 = [
    {
      key: "profile",
      label: "Profile",
      items: [
        {
          key: "settings",
          label: "Settings",
          icon: "pi pi-cog",
        },
        {
          key: "logout",
          label: "Logout",
          icon: "pi pi-sign-out",
          command: () => {
            console.log("i clicked on logout");
            dispatch(logOut());
          },
        },
      ],
    },
  ];
  const menuRight = React.useRef(null);
  const end = (
    <div className="flex justify-center items-center gap-6">
      <a onClick={() => navigate("/contact")} className="cursor-pointer font-medium hover:text-blue-500 transition-colors">Contact</a>
      <a
        className="pi pi-shopping-cart p-overlay-badge cursor-pointer hover:text-blue-500 transition-colors"
        style={{ fontSize: "1.4rem" }}
        onClick={() => setVisibleRight(true)}
      >
        {token && cartItems?.length > 0 && <Badge value={cartItems.length}></Badge>}
      </a>
      {token ? (
        <>
            <Menu
                model={items2}
                popup
                ref={menuRight}
                id="popup_menu_right"
                popupAlignment="right"
            />
            <Avatar
                image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                shape="circle"
                className="cursor-pointer"
                onClick={(event) => menuRight.current.toggle(event)}
            />
        </>
      ) : (
         <Button 
           label="Sign In" 
           onClick={() => navigate("/login")} 
           size="small"
           className="p-button-sm px-4 py-2 text-sm"
         />
      )}
    </div>
  );

  return (
    <>
      <div className="card">
        <Menubar model={items} start={start} end={end} />
      </div>
      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
        className="h-screen "
      >
        <SideBar cardList={cartItems || []} />
      </Sidebar>
    </>
  );
}
