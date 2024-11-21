import Footer from "@/components/layout/footer";
import MobileBottom from "@/components/layout/mobile-bottom";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <MobileBottom />
      {children}
      <Footer />
    </>
  );
}
