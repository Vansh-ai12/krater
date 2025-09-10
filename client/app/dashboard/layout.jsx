import SideBar from "../../Components/Sidebar";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function dashboardLayout(props) {
    return (
        <div style={{ display: "flex" }}>
            <SideBar />

   
            <div style={{ 
                flex: 1,
                position: "relative",
                

                  }}>
                {props.children}
            </div>

            <LogoutLink
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg shadow-md font-bold text-xl"
                style={{
                    position: "fixed",
                    top: "10px",
                    right: "20px",
                    zIndex: 1000
                }}
            >
                Logout
            </LogoutLink>
        </div>
    );
}
