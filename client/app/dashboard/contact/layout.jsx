export default function ContactLayout({ children }) {
  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center", 
        alignItems: "center",    
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
}
