import * as React from "react";
import { Menubar } from "primereact/menubar";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/state/userSlice";
import { useNavigate } from "react-router-dom";
import { PrimeIcons } from "primereact/api";
import { useCartQuery } from "../../store/state/userApiSlice";
import { Sidebar } from "primereact/sidebar";
import SideBar from "./sideBar";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: cartItems } = useCartQuery(1);
  const [visibleRight, setVisibleRight] = React.useState(false);
  React.useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);
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
      label: "Groceries",
      icon: PrimeIcons.SHOPPING_BAG,
      command: () => {
        navigate("/groceries");
      },
    },
  ];

  const start = (
    <img
      alt="logo"
      src="src/assets/header-logo.png"
      width="40"
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
            dispatch(setCredentials(null));
          },
        },
      ],
    },
  ];
  const menuRight = React.useRef(null);
  const end = (
    <div className="flex justify-center items-center gap-6">
      <a className="">About</a>

      <a>Contact</a>
      <a
        className="pi pi-shopping-cart p-overlay-badge"
        style={{ fontSize: "1.4rem" }}
        onClick={() => setVisibleRight(true)}
      >
        <Badge value={cartItems?.length}></Badge>
      </a>
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
        className=""
        onClick={(event) => menuRight.current.toggle(event)}
      />
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
        <SideBar cardList={cartItems} />
      </Sidebar>
    </>
  );
}
