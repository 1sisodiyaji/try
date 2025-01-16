import Navigation from "./common/Navigation";
import Footer from "./common/Footer";

export default function MainContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navigation />
      <main className='pt-[25px]'>{children}</main>
      <Footer />
    </div>
  );
}
